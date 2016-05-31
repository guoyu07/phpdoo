<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/21
 * Time: 下午6:40
 */
namespace Model;

use Core\Model as BaseModel;
use Core\Database as DB;

class Topic extends BaseModel
{
    public static function findAll()
    {
        $statement = DB::sql('select t.*,count(tq.tq_id) questions from topic as t left join topic_question as tq on t.topic_id=tq.topic_id group by t.topic_id;');
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }

    public static function findByUserFollow($user_id)
    {
        $statement = DB::sql('select f.user_id,t.* from follow as f left join topic as t on t.topic_id=f.topic_id where f.user_id=:id AND f.topic_id IS NOT NULL');
        $statement->bindValue(":id",$user_id);
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }
    /**
     * @param int $day 几天内
     */
    public static function findByDay(int $day)
    {
        $statment = DB::sql("select * from topic where add_time > unix_timestamp()-60*60*24*:day");
        $statment->bindValue(":day",$day);
        $statment->execute();
        return $statment->fetchAll(DB::FETCH_ASSOC);
    }

    public static function findByToday()
    {
        $statment = DB::sql('select t.* from question as q left join topic_question as tq on tq.question_id=q.question_id left join topic as t on tq.topic_id=t.topic_id  where q.add_time>unix_timestamp()-60*60*24 group by t.topic_title ORDER BY q.add_time DESC');
        $statment->execute();
        return $statment->fetchAll(DB::FETCH_ASSOC);
    }
    public static function findAllCount()
    {
        $statement = DB::sql('
            select
            allDays.topic_title,
            allDays.topic_id,
            allDays.topic_img,
            allDays.allDays,
            thirtyDaysAgo.thirtyDaysAgo,
            sevenDaysAgo.sevenDaysAgo
            from
            (
            select t.topic_img,t.topic_id,t.topic_title,count(q.add_time) as allDays from topic as t left join topic_question as tq on t.topic_id=tq.topic_id left join question as q on tq.question_id=q.question_id group by topic_title
            ) AS allDays
            left join
            (
            select t.topic_id,t.topic_title,count(q.add_time) as sevenDaysAgo from topic as t left join topic_question as tq on t.topic_id=tq.topic_id left join question as q on tq.question_id=q.question_id where (q.add_time>UNIX_TIMESTAMP()-3600*24*7) group by topic_title
            ) AS sevenDaysAgo
            on allDays.topic_title=sevenDaysAgo.topic_title
            left join
            (
            select t.topic_id,t.topic_title,count(q.add_time) as thirtyDaysAgo from topic as t left join topic_question as tq on t.topic_id=tq.topic_id left join question as q on tq.question_id=q.question_id where (q.add_time>UNIX_TIMESTAMP()-3600*24*30) group by topic_title
            ) AS thirtyDaysAgo
            on allDays.topic_title=thirtyDaysAgo.topic_title
        ');
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }
    public static function findByHot($length='5')
    {
        $statement = DB::sql("select t.*, count(q.question_id) as questionCount, f.followCount  from topic as t  left join topic_question as tq  on t.topic_id=tq.topic_id  left join question as q  on tq.question_id=q.question_id  left join (select count(*) as followCount,f.topic_id from follow as f where f.topic_id is not null group by f.topic_id) as f  on f.topic_id=t.topic_id  group by t.topic_id  order by questionCount DESC LIMIT 0,$length");
//        $statement->bindValue(":datalength",$length);
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }

    public static function findById($id)
    {
        $statement = DB::sql("select t.*,count(tq.tq_id) questions from topic as t left join topic_question as tq on t.topic_id=tq.topic_id WHERE t.topic_id=:id group by t.topic_id;");
        $statement->bindValue(":id",$id);
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }

    public static function add(array $data)
    {
        if(!@$data['topic_id']){
            $data['topic_id'] = null;
        }
        if (empty($data['topic_desc']) || !is_string($data['topic_title'])) {
            self::$error_info = '参数错误！';
            return false;
        }
        $title = $data['topic_title'];
        $sql = "select count(*) from `topic` where `topic_title`=:title";
        $statement = DB::sql($sql);
        $statement->bindValue(":title",$title);
        $statement->execute();
        $res = $statement->fetchColumn();
        if ($res) {
            self::$error_info = '已存在此名称的话题！';
            return false;
        }

        return DB::insert($data,'topic');
    }
}