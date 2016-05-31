<?php
class PdoMysql{
	public static $config = array();
	public static $link = null;	//保存连接标识符
	public static $pconnect = false;//是否开启长连接
	public static $dbVersion = null;//数据库版本
	public static $connected = false;	//连接是否成功
	public static $PDOStatment = null; //保存PDOStatment对象
	public static $queryStr = null;	//保存最后执行的操作
	public static $error = null; //错误信息
	public static $lastInsertID = null; //插入数据库中最后的ID
	public static $numRows = 0;	//受影响的行数
	/**
	 * 构造函数
	 * @param string $dbConfig [数据库配置信息，可选]
	 */
	public function __construct($dbConfig='')
	{
		if(!class_exists("PDO")){
			self::throw_exception('不支持PDO，请先开启');
		}
		if(!is_array($dbConfig))
		{
			$dbConfig = array(
				'hostname'=>DB_HOST,
				'username'=>DB_USER,
				'password'=>DB_PWD,
				'database'=>DB_NAME,
				'hostport'=>DB_PORT,
				'dbms'=>DB_TYPE,
				'dsn'=>DB_TYPE.':host='.DB_HOST.';dbname='.DB_NAME.';charset='.DB_CHARSET
			);
		}
		if(empty($dbConfig['hostname'])) self::throw_exception('没有定义数据库配置，请先定义');
		self::$config = $dbConfig;

		if(empty(self::$config['params'])) self::$config['params'] = array();
		
		if(!isset(self::$link)){
			$configs = self::$config;
			if(self::$pconnect){
				//开启长连接
				$configs['params'][constant(PDO::ATTR_PERSISTENT)] = true;
			}
			try{
				self::$link = new PDO($configs['dsn'],$configs['username'],$configs['password']);
			}catch(PDOExction $e){
				self::throw_exception($e->getMessage());
			}
			if(!self::$link)
			{
				self::throw_exception('PDO连接错误');
				return false;
			}
			// self::$link->exec('SET NAMES '.DB_CHARSET);
			self::$dbVersion = self::$link->getAttribute(constant("PDO::ATTR_SERVER_VERSION"));
			self::$connected = true;
			unset($configs);
		}
	}
	/**
	 * 提到所有记录
	 * @param  [type] $sql [sql语句]
	 * @return [type]      [二维数组数据]
	 */
	public static function fetchAll($sql=null)
	{
		if($sql!=null){
			self::query($sql);
		}
		$result = self::$PDOStatment->fetchAll(constant('PDO::FETCH_ASSOC'));
		return $result;
	}
	/**
	 * 返回结果集中的一条
	 * @param  [type] $sql [description]
	 * @return [type]      [description]
	 */
	public static function fetchRow($sql=null)
	{
		self::query($sql);
		$result = self::$PDOStatment->fetch(constant('PDO::FETCH_ASSOC'));
		return $result;
	}
	/**
	 * 执行增删改操作，返回受影响的条数
	 * @param  [type] $sql [description]
	 * @return [type]      [description]
	 */
	public static function execute($sql = null)
	{
		$link  = self::$link;
		if(!$link) return false;
		self::$queryStr = $sql;
		if(!empty(self::$PDOStatment)) self::free();
		$result = $link->exec(self::$queryStr);
		self::haveErrorThrowException();
		if($result)
		{
			self::$lastInsertID = $link->lastInsertID();
			self::$numRows = $result;
			return self::$numRows;
		}else{
			return false;
		}
	}
	/**
	 * 根据主键查询
	 * @param  [type] $tabName [description]
	 * @param  [type] $priID   [description]
	 * @param  string $fields  [description]
	 * @return [type]          [description]
	 */
	public static function findById($tabName,$priID,$fields='*')
	{
		$sql = 'select %s from %s where id=%d';
		return self::fetchRow(sprintf($sql,self::parseFilds($fields),$tabName,$priID));
	}
	public static function find($tables,$where=null,$fields="*",$group=null,$having=null,$order=null,$limit=null)
	{
		$sql = 'SELECT '.self::parseFilds($fields).' FROM '. $tables
		.self::parseWhere($where)
		.self::parseGroup($group)
		.self::parseHaving($having)
		.self::parseOrder($order)
		.self::parseLimit($limit);

		$dataAll = self::fetchAll($sql);
		return count($dataAll)==1?$dataAll[0]:$dataAll;
	}
	/**
	 * array(
	 * 'user'=>'imooc',
	 * 'password'=>'imooc',
	 * 'email'=>'imooc@imooc.com',
	 * 'token'=>'123abc'
	 * )
	 * insert into user(username,password,email,token) values(....)
	 */
	public static function add($data,$table)
	{
		$keys = array_keys($data);
		array_walk($keys,array('PdoMysql','addSpecilChar'));
		$fieldsStr = join(',',$keys);
		$values = "'".join("','",array_values($data))."'";
		$sql = "INSERT {$table} ($fieldsStr) VALUES($values)";

		return self::execute($sql);
	}
	/**
	 * Array(
	'name'=>'zzz',
	'mobile'=>'18911111123',
	'regtime'=>'current_date()',
	'serial_no'=>mt_rand(999,99999)
	);
	 * [update description]
	 * @param  [type] $data  [description]
	 * @param  [type] $table [description]
	 * @param  [type] $where [description]
	 * @param  [type] $order [description]
	 * @param  [type] $limit [description]
	 * @return [type]        [description]
	 *
	 * update tableName set name=zzz,mobile=188888888 WHERE id<38 order by 'name' limit 0,1
	 */
	public static function update($data,$table,$where=null,$order=null,$limit=null)
	{
		$sets='';
		foreach ($data as $key => $value) {
			$sets .= $key."='".$value."',";
		}
		$sets = rtrim($sets,',');
		$sql = "UPDATE {$table} set {$sets} "
		.self::parseWhere($where)
		.self::parseOrder($order)
		.self::parseLimit($limit)
		;
		return self::execute($sql);
	}
	public static function delete($table,$where=null,$order=null,$limit=0)
	{
		$sql = "DELETE FROM {$table} "
		.self::parseWhere($where)
		.self::parseOrder($order)
		.self::parseLimit($limit)
		;
		return self::execute($sql);
	}
	/**
	 * 得到最后SQL语句
	 * 
	 * @return [type] [description]
	 */
	public static function getLastSql()
	{
		$link = self::$link;
		if(!$link) return false;
		return self::queryStr;
	}
	public static function getLastInsertId()
	{
		$link = self::$link;
		if(!$link) return false;
		return self::$lastInsertID;
	}
	public static function getDBVersion()
	{
		$link = self::$link;
		if(!$link) return false;
		return self::$dbVersion;
	}
	public static function showTables()
	{
		$tables = Array();
		if(self::query("SHOW TABLES")){
			$result = self::fetchAll();
			foreach ($result as $key => $value) {
				$tables[$key] = current($value);
			}
		}
		return $tables;
	}
	/**
	 * 解析where
	 * @param  [type] $where [description]
	 * @return [type]        [description]
	 */
	public static function parseWhere($where)
	{
		$whereStr = '';
		if(is_string($where) && !empty($where)){
			$whereStr = ' WHERE '.$where;
		}
		return $whereStr;
	}
	/**
	 * 解析分组
	 * @param  [type] $group [description]
	 * @return [type]        [description]
	 */
	public static function parseGroup($group)
	{
		$groupStr = '';
		if(is_array($group)){
			$groupStr = ' GROUP BY ' . implode(',',$group);
		}elseif(is_string($group)&&!empty($group)){
			$groupStr = ' GROUP BY '.$group;
		}
		return $groupStr;
	}
	/**
	 * having
	 * @param  [type] $having [description]
	 * @return [type]         [description]
	 */
	public static function parseHaving($having)
	{
		$havingStr = '';
		if(is_string($having)&&!empty($having)){
			$havingStr = ' HAVING '.$having;
		}
		return $havingStr;
	}
	/**
	 * 解析排序
	 * @param  [type] $order [description]
	 * @return [type]        [description]
	 */
	public static function parseOrder($order)
	{
		$orderStr = '';
		if(is_array($order))
		{
			$orderStr = ' ORDER BY '. join(',',$order);
		}elseif(is_string($order) && !empty($order)){
			$orderStr = ' ORDER BY '.$order;
		}
		return $orderStr;
	}
	/**
	 * LIMIT解析
	 * @param  [type] $limit [description]
	 * @return [type]        [description]
	 */
	public static function parseLimit($limit)
	{
		$limitStr = '';
		if(is_array($limit))
		{
			if(count($limit)>1)
			{
				$limitStr = ' LIMIT '.$limit[0].','.$limit[1];
			}else{
				$limitStr = ' LIMIT '.$limit[0];
			}
		}elseif(is_string($limit)&&!empty($limit)){
			$limitStr = ' LIMIT '.$limit;
		}
		return $limitStr;
	}
	/**
	 * 解析查询字段
	 * @param  [type] $fields [description]
	 * @return [type]         [description]
	 */
	public static function parseFilds($fields)
	{
		if(!is_array($fields))
		{
			$fields = explode(',',$fields);
		}
		array_walk($fields,array('PdoMysql','addSpecilChar'));
		$fieldsStr=implode(',',$fields);
		return $fieldsStr;
	}
	/**
	 * sql条件格式化 abc->`abc`,tab.cloum->`tab`.`cloum`
	 * @param [type] &$value [description]
	 */
	public function addSpecilChar(&$value)
	{
		if($value === "*") return $value;
        preg_match('/^\`(.*)\`$/',$value,$preg);
        if(count($preg)>0){return $value;};
        preg_match('/(.*)\.$/',$value,$preg);
        if(count($preg)>0){return '`'.$value.'`';};
        preg_match('/^\.(.*)/',$value,$preg);
        if(count($preg)>0){return '`'.$value.'`';};

        $arr = explode('.',$value);
        $res = Array();
        foreach ($arr as $key => $v) {
            if($v=='') break;
            preg_match('/^\`(.*)\`$/', $v,$preg);
            if(count($preg)>0){
                $res[] = $v;
            }else{
                $res[] = '`'.$v.'`';
            }
        }
        $value = implode('.',$res);
        $res = null;
        $arr = null;
        $preg = null;
        return $value;
	}
	/**
	 * 释放结果集
	 * @return [type] [description]
	 */
	public function free()
	{
		self::$PDOStatment = null;
	}
	/**
	 * 获取结果集
	 * @param  string $sql [description]
	 * @return [type]      [description]
	 */
	public static function query($sql='')
	{
		$link = self::$link;
		if(!$link) return false;
		if(!empty(self::$PDOStatment)) self::free();
		self::$queryStr = $sql;
		self::$PDOStatment = $link->prepare(self::$queryStr);
		$res = self::$PDOStatment->execute();
		self::haveErrorThrowException();
		return $res;
	}
	public static function haveErrorThrowException()
	{
		$obj = empty(self::$PDOStatment) ? self::$link : self::$PDOStatment;
		$arrError = $obj->errorInfo();
		if($arrError[0]!='00000'){
			self::$error = 'SQLSTATE: '.$arrError[0].'<br/>SQL ERROR: '.$arrError[2].'<br/>Error: '.self::$queryStr;
			self::throw_exception(self::$error);
			return false;
		}
		if(self::$queryStr=='')
		{
			self::throw_exception('没有可执行的SQL语句');
		}
		return false;
	}
	/**
	 * 自定义错误处理函数
	 * @param  [type] $errorMsg [错误描述]
	 * @return [type]           [html文本]
	 */
	public static function throw_exception($errorMsg)
	{
		echo '<div style="width:80%;background-clolr:#ABCDEF;color:red;font-size:1.2rem;">
				'.$errorMsg.'
			</div>';
	}
	/**
	 * 关闭数据库
	 * @return [type] [description]
	 */
	public static function close()
	{
		self::$link = null;
	}
}

// $config = require 'config.php';
// $pdo = new PdoMysql($config);
// $sql = "select * from user";
// print_r($pdo->fetchRow($sql));
// 
// $sql = 'insert into user values(null,\'aaa\',18911111111,current_date,1111)';
// $res = $pdo->execute($sql);


// $sql = "delete from user";
// $res = $pdo->execute($sql);

// $tabName = 'user';
// $priID = '25';
// $fields=Array("name","mobile");
// $fields="*";
// $res = $pdo->findById($tabName,$priID,$fields);

// $where = "id>1";

// var_dump($res);
// echo $pdo::$lastInsertID;

// $tables='user';
// $where = 'id>=0';
// $fields ='id,`name`,serial_no';
// $group = 'name';
// $having = 'serial_no>3000';
// $order = 'name DESC';
// $limit = Array('0'=>'3');
// $res = $pdo->find($tables,$where,$fields,$group,$having,$order,$limit);
// print_r( $res );
// $data = Array(
// 	'id'=>null,
// 	'name'=>'zzz',
// 	'mobile'=>'18911111123',
// 	'regtime'=>'current_date()',
// 	'serial_no'=>mt_rand(999,99999)
// 	);
// // $res = $pdo->update($data,'user','id=20','id desc',array(1,5));

// // $res = $pdo->delete('user','id<28','id desc','1');
// // var_dump($res);
// // 
// print_r($pdo->showTables());


