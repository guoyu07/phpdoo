<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/25
 * Time: 下午8:23
 */
namespace Model;



use Core\Database as DB;
use Core\Model as BaseModel;

class TopicQuestion extends BaseModel
{
    public static function add($data,$question_id)
    {
        if (!is_array($data)) return false;
        $sql_data = '';
        foreach ($data as $topcid) {
            $sql_data .= "($topcid,$question_id),";
        }
        $sql_data = rtrim($sql_data,',');
        $sql = "insert into `topic_question` (`topic_id`,`question_id`) VALUES $sql_data";

        return DB::getInstance()->exec($sql);
    }
    public static function findByQuestionId($id)
    {
        $statement = DB::sql('select * from topic_question where question_id = :id');
        $statement->bindValue(":id",$id);
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }
}