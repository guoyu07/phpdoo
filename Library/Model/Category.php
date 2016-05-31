<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 16/5/16
 * Time: 下午6:02
 */
namespace Model;

use Core\Database as DB;
use Core\Model as BaseModel;

class Category extends BaseModel
{
    public static function findAll()
    {
        $statement = DB::sql("select category.*,count(question.question_id) as count from category left join question on category.category_id=question.category_id group by category.category_id ORDER BY `sort`,`category_id` DESC");
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }
    public static function findById($category_id)
    {
        $category_id = intval($category_id);
        $statement = DB::sql("select * from category WHERE category_id = $category_id;");
        $statement->execute();
        $data = $statement->fetchAll(DB::FETCH_ASSOC);

        return count($data)==1 ? $data[0] : $data;
    }
    public static function add(array $data)
    {

        $parent_id = intval(@$data['parent_id']);
        $category_title = @$data['category_title'];

        $data['parent_id'] = intval(@$data['parent_id']);
        $data['sort'] =intval(@$data['sort']);

        if (empty($category_title) || !is_string($category_title)) {
            self::$error_info = '参数错误！';
            return false;
        }

        $statement = DB::sql("select count(*) from category where `category_title`='$category_title' AND `parent_id`='$parent_id';");
        $statement->execute();
        $res = $statement->fetchColumn();

        if ($res) {
            self::$error_info = '同级分类下不能有名称相同的两个分类！';
            return false;
        }
        return DB::insert($data,'category');
    }
    public static function update($data,$category_id)
    {
        $sets = '';
        foreach ($data as $key=>$v) {
            $sets .= '`' . $key . "`='" . $v . "',";
        }
        $sets = rtrim($sets,',');
        $target_parent_id = $data['parent_id'];


        $sql = "UPDATE `category` SET {$sets}
                WHERE `category_id` != '$target_parent_id'
                AND `category_id` = '$category_id'
                AND 1>(SELECT COUNT(*) FROM (SELECT `category_id` FROM `category` WHERE `parent_id`={$category_id} AND `category_id`={$target_parent_id}) as ctable)
                ";
        return DB::getInstance()->exec($sql);
    }
    public static function deleteById($category_id)
    {
        if (preg_match('/^\d+$/',$category_id)) {
            $sql = "DELETE FROM category
                    WHERE category_id=$category_id
                    AND 1>(SELECT COUNT(*) FROM (SELECT `category_id` FROM `category` WHERE `parent_id`={$category_id}) AS ctab)
                    ";
            $res = DB::getInstance()->exec($sql);
            if(!$res) self::$error_info = '未删除任何数据,删除的分类下若有数据，则无法删除';
            return $res;
        }
        return false;
    }
}