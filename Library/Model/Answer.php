<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/28
 * Time: 下午9:26
 */

namespace Model;

use Core\Model;
use Core\Database as DB;

class Answer extends Model
{
    public static function insert($data)
    {
        return DB::insert($data,'answer');
    }

    public static function findByQuestionId($id)
    {
        $statement = DB::sql("select a.*,u.username from answer as a left join user as u on u.id=a.user_id WHERE a.`question_id`=$id");
        $statement->execute();
        return $statement->fetchAll();
    }

    public static function spiderToDB(array $data)
    {
        $sql = 'INSERT INTO `answer`
                (`question_id`,`answer_content`,`user_id`,`add_time`)
                VALUES ';
        $values = '';
        foreach ($data as $row) {
            $values .= '(' .
                "'".$row['question_id']."',".
                "'".$row['answer_content']."',".
                "'".$row['user_id']."',".
                "'".$row['add_time']."'"
                .'),';
        }

        $sql .= rtrim($values,',');

        return DB::getInstance()->exec($sql);
    }
}