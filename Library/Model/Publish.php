<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/25
 * Time: 下午3:17
 */

namespace Model;

use Core\Database as DB;
use Core\Model as BaseModel;

class Publish extends BaseModel
{
    public static function add($data)
    {
        return DB::insert($data,'question');
    }
}