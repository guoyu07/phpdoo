<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/28
 * Time: 下午11:42
 */
namespace Helper;

use Core\Database;

class PageData
{
    protected $recordPrePage = 10;
    protected $query;
    protected $countQuery;
    protected $currentPage = 1;
    protected $context = array();

    /**
     * @param string $tableName  表名
     * @param string $extras SQL语句额外参数,如where条件group by ...
     * @param array $column 查询的字段
     */
    public function __construct($tableName,$extras='',$column = array('*'))
    {
        array_walk($column,array('Core\Database','columnSpecial'));
        $columns = implode(',',$column);
        // 统计数据数量的sql语句去掉group by

        $totalSql = "SELECT COUNT(*) FROM `{$tableName}` {$extras}";
        if (preg_match('/group by/',$extras)) {
            $totalSql = "SELECT COUNT(*) FROM (SELECT COUNT(*) FROM `{$tableName}` {$extras}) AS COLLECTION";
        }
//        echo "SELECT {$columns} FROM `{$tableName}` {$extras}";exit;
        $this->countQuery = Database::getInstance()->prepare($totalSql);
        $this->query = Database::getInstance()
            ->prepare("SELECT {$columns} FROM `{$tableName}` {$extras} LIMIT :pageDataStart,:pageDataLength");
        if (@$_GET['page']) {
           $this->setPage($_GET['page']);
        }


    }

    public function setPage($currentPage)
    {
        $this->currentPage = max(1,intval($currentPage));
    }

    /**
     * @param int $recordPrePage
     */
    public function setRecordPrePage(int $recordPrePage)
    {
        $this->recordPrePage = $recordPrePage;
    }
    public function execute()
    {
        $this->countQuery->execute();
        $totalItem = $this->countQuery->fetchColumn();
        $totalRecord = max(ceil($totalItem / $this->recordPrePage), 1);

        $this->currentPage = min($this->currentPage, $totalRecord);
        $this->query->bindValue(':pageDataStart', ($this->currentPage - 1)
            * $this->recordPrePage, Database::PARAM_INT);
        $this->query->bindValue(':pageDataLength', $this->recordPrePage, Database::PARAM_INT);
        $this->query->execute();
        $data = $this->query->fetchAll(Database::FETCH_ASSOC);

        return $this->context = array(
            'data' => $data,
            'totalPage' => $totalRecord,
            'currentPage' => $this->currentPage,
            'pageSize' => $this->recordPrePage,
            'totalItem' => $totalItem
        );
    }

    public function getContext()
    {
        return $this->context;
    }
}