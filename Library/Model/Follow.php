<?php
/**
 * Created by hare.
 * Email: 688977@qq.com
 * Date: 16/5/30
 * Time: 下午6:14
 */

namespace Model;

use Core\Model;
use Core\Database as DB;
class Follow extends Model
{
    public static function findTopicByUserId($id)
    {

    }
    public static function findUserByTopicId($id)
    {
        $statement = DB::sql('select f.*,u.username from follow as f left join user as u on u.id=f.user_id where f.topic_id=:id');
        $statement->bindValue(':id',$id);
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }
}