<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 16/5/17
 * Time: 上午8:43
 */
namespace Helper;

class Action
{
    public static function categoryTree(array $data,&$tree,$pid=0,$deep=0)
    {
        foreach ($data as $row)
        {
            if ($row['parent_id'] == $pid) {
                $row['deep'] = $deep;
                $tree[] = $row;
                self::categoryTree($data,$tree,$row['category_id'],$deep+1);
            }
        }
    }
}