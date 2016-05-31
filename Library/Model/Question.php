<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/25
 * Time: 下午9:02
 */
namespace Model;

use Core\Model as BaseModel;
use Core\Database as DB;
use Helper\PageData;

class Question extends BaseModel
{
    public static function findAll()
    {
        $sql = "select q.*,u.username,count(a.answer_id) as answers,c.category_title from question as q left join user as u on u.id=q.user_id left join answer as a on q.question_id=a.question_id left join category as c on q.category_id=c.category_id  group by q.question_id;";
        $statement = DB::sql($sql);
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);

    }

    /**
     * @param string $orderby  多个条件以,号隔开
     * @return array
     */
    public static function fetchPageData($page_size = 5)
    {
//        $s="select q.question_id as qid,
//            f.followCount,count(a.answer_id) as answerCount,
//            a.question_id as aqid,q.question_content,
//            c.category_title
//            from question as q
//            left join category as c on q.category_id=c.category_id
//            left join answer as a on a.question_id=q.question_id
//            left join (
//              select count(*) as followCount,f.question_id from follow as f
//              where f.question_id is not null
//              group by f.question_id
//              ) as f
//            on f.question_id=q.question_id
//            where q.question_id is not null group by qid";

        $tableName = 'question';
        $extras = "left join user on question.user_id=user.id
                   left join answer on question.question_id = answer.question_id
                   left join category on question.category_id=category.category_id
                   left join (select count(*) as followCount,f.question_id from follow as f where f.question_id is not null group by f.question_id) as f on f.question_id=question.question_id
                   group by question.question_id
                   order by question.add_time desc
                   ";
        $column = array('question.*','user.username','user.nickname','count(answer.answer_id)','f.followCount','category.category_title');
        $pageDataObj = new PageData($tableName,$extras,$column);
        $pageDataObj->setRecordPrePage($page_size);
        $pageData = $pageDataObj->execute();

        return $pageData;
    }
    public static function fetchPageDataByCategoryId($id)
    {
        $tableName = 'question';
        $extras = "left join user on question.user_id=user.id
                   left join answer on question.question_id = answer.question_id
                   left join category on question.category_id=category.category_id
                   left join (select count(*) as followCount,f.question_id from follow as f where f.question_id is not null group by f.question_id) as f on f.question_id=question.question_id
                   where question.category_id = $id
                   group by question.question_id
                   order by question.add_time desc
                   ";
        $column = array('question.*','user.username','user.nickname','count(answer.answer_id)','f.followCount','category.category_title');
        $pageDataObj = new PageData($tableName,$extras,$column);
        $pageDataObj->setRecordPrePage(5);
        $pageData = $pageDataObj->execute();

        return $pageData;
    }
    public static function findById($id)
    {
        $statement = DB::sql("select q.*,a.add_time as lastAnswerTime,u.username,count(f.question_id) as followCount,c.category_title from question as q left join user as u on u.id=q.user_id left join follow as f on q.question_id=f.question_id left join category as c on c.category_id=q.category_id left join (select a.question_id,a.add_time from answer as a where a.question_id=:id order by add_time desc limit 1) as a on a.question_id=q.question_id  where q.question_id=:id group by q.question_id");
        $statement->bindValue(":id",$id);
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }
    public static function findByFilter(array $filter)
    {
        if (!@$filter['filter']) $filter['filter'] = '*';
        if (!@$filter['table']) $filter['table'] = 'question';

        return DB::select($filter);
    }
    public static function findByTopicId($id)
    {
        $tableName = 'topic_question';
        $extras = "left join question on topic_question.question_id=question.question_id
                   left join user on question.user_id=user.id
                   left join answer on question.question_id = answer.question_id
                   left join category on question.category_id=category.category_id
                   left join (select count(*) as followCount,f.question_id from follow as f where f.question_id is not null group by f.question_id) as f on f.question_id=question.question_id
                   where topic_question.topic_id=$id
                   group by question.question_id
                   order by question.add_time desc
                   ";
        $column = array('question.*','topic_question.*','user.username','user.nickname','count(answer.answer_id)','f.followCount','category.category_title');
        $pageDataObj = new PageData($tableName,$extras,$column);
        $pageDataObj->setRecordPrePage(5);
        $pageData = $pageDataObj->execute();

        return $pageData;
    }
    public static function spiderToDB(array $data)
    {
        $sql = 'INSERT INTO `question`
                (`category_id`,`question_content`,`question_detail`,`add_time`,`update_time`,`user_id`,`view_count`)
                VALUES ';
        $values = '';
        foreach ($data as $row) {
            $values .= '(' .
                "'".$row['category_id']."',".
                "'".$row['question_content']."',".
                "'".$row['question_detail']."',".
                "'".$row['add_time']."',".
                "'".$row['update_time']."',".
                "'".$row['user_id']."',".
                "'".$row['view_count']."'"
            .'),';
        }

        $sql .= rtrim($values,',');

        $rowsnumber = DB::getInstance()->exec($sql);

        return ['firstid'=>DB::getInstance()->lastInsertID(),'count'=>$rowsnumber];
    }
}