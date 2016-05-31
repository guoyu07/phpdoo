<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/26
 * Time: 下午7:45
 */

namespace Model;

use Core\Database;
use Core\Model as BaseModel;

class Role extends BaseModel
{
    public static function findAll()
    {
        $statment = Database::sql("select * from `role`");
        $statment->execute();
        return $statment->fetchAll(Database::FETCH_ASSOC);
    }
}