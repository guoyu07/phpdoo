<?php
namespace Core;

class Database extends \PDO
{
	private static $instance;

	public static function initialize($dsn,$username=null,$password=null,$options=array())
	{
		if(self::$instance)
		{
			throw new Error('Cannot re-initialize database');
		}
		self::$instance = new self($dsn,$username,$password,$options);
		self::$instance->setAttribute(self::ATTR_ERRMODE,self::ERRMODE_EXCEPTION);

		$currentSqlMode = self::getInstance()->query('SELECT @GLOBAL.SQL_MODE')->fetchColumn();
		if(strpos($currentSqlMode,'STRICT_TRANS_TABLES')){
			$currentSqlMode = explode(',',$currentSqlMode);
			$strictTansTable = array_search('STRICT_TRANS_TABLES',$currentSqlMode);
			unset($currentSqlMode[$strictTansTable]);
			$statement = self::$instance->prepare('SET SESSION sql_mode = :sql_mode');
			$statement->bindValue(':sql_mode',implode(',',$currentSqlMode));
			$statement->execute();
		}
	}
	public static function sql($sql,array $driver_options = array())
	{
		return self::getInstance()->prepare($sql,$driver_options);
	}
	/**
	 * @param $data
	 * @param $table
	 *
	 * $data = array(
	 * 	k1=>v1,
	 * 	k2=>v2,
	 * 	k3=>v3,
	 *  ....
	 * )
	 */
	public static function insert($data,$table)
	{
		$keys = array_keys($data);
		array_walk($keys,array('self','columnSpecial'));
		$keys = ''.join(',',$keys);
		$values = array();
		foreach ($data as $v) {
			$values[] = "'" . $v . "'";
		}
		$values = ''.join(',',$values);

		$sql = "INSERT INTO {$table} ($keys) VALUES ($values);";
		$res = self::getInstance()->exec($sql);
		if ($res) {
			return self::getInstance()->lastInsertID();
		}
		return false;
	}
	public static function columnSpecial(&$value)
	{
		if($value === "*") return $value;
		preg_match('/^\`(.*)\`$/',$value,$preg);
		if(count($preg)>0){return $value;};
		preg_match('/(.*)\.$/',$value,$preg);
		if(count($preg)>0){return '`'.$value.'`';};
		preg_match('/^\.(.*)/',$value,$preg);
		if(count($preg)>0){return '`'.$value.'`';};

		preg_match('/(.*?)\((.*?)\)/', $value, $preg);
		if(count($preg)>0){
			if (!empty($preg[1]) && !empty($preg[2])) {
				// AS别名
				$aliasName = explode('.',$preg[2])[0] . 'Count';
				$aliasName = $aliasName == '*Count' ? "count" : $aliasName;
//				echo $preg[1] .'('. self::columnSpecial($preg[2]) . ') as ' . $aliasName;
//				exit;
				return $value = $preg[1] .'('. self::columnSpecial($preg[2]) . ') as ' . $aliasName;
			} else {
				return $value;
			}
		};

		$arr = explode('.',$value);
		$res = Array();
		foreach ($arr as $key => $v) {
			if($v=='') break;
			preg_match('/^\`(.*)\`$/', $v,$preg);
			if (count($preg)>0) {
				$res[] = $v;
			} else if($v != '*') {
				$res[] = '`'.$v.'`';
			} else {
				$res[] = $v;
			}
		}
		$value = implode('.',$res);
		$res = null;
		$arr = null;
		$preg = null;
		return $value;

	}
	public static function getInstance()
	{
		return self::$instance;
	}
	public static function __callStatic($name,$arguments)
	{
		if($name{0} == '_')
		{
			$name = substr($name,1);
		}
		if(method_exists(self::$instance,$name))
		{
			call_user_func_array(array(self::$instace,$name), $arguments);
		}
	}
	public static function select(array $filter)
	{
		$sql = "SELECT {$filter['filter']} FROM {$filter['table']} ";
		if (@$filter['where']) {
			$sql .= ' WHERE '.$filter['where'];
		}

		if (@$filter['group']) {
			$sql .= ' GROUP BY '.$filter['group'];
		}

		if (@$filter['having']) {
			$sql .= ' HAVING '.$filter['having'];
		}

		if (@$filter['order']) {
			$sql .= ' ORDER BY '.$filter['order'];
		}

		if (@$filter['limit']) {
			$sql .= ' LIMIT '.$filter['limit'];
		}

		$statement = self::sql($sql);
		$statement->execute();
		return $statement->fetchAll();
	}
}