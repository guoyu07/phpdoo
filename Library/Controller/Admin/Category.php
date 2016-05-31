<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 16/5/16
 * Time: 下午5:59
 */
namespace Controller\Admin;

use Core\Controller;
use Core\Template;
use Helper\Action;
use Core\Response;
use Model\Category as CategoryModel;

/**
 * Class Category
 * @package Controller\Admin
 * @table Category
 * @Authorization
 * @Admin
 */
class Category extends Controller
{
    /**
     * 展示分类
     */
    public function index()
    {
        $category = CategoryModel::findAll();
        $tree = array();
        $data = array();
        Action::categoryTree($category,$tree);

        foreach ($tree as $row) {
            $str = '';
            if($row['parent_id'] != 0)
            {
                $str = '&nbsp;&nbsp;&nbsp;|';
            }
            $deep = $row['deep'];
            while ($deep>0) {
                $str .= '--';
                $deep--;
            }
            $row['category_title'] = $str . $row['category_title'];
            $data[] = $row;
        }
        Template::load('Admin/Category.twig',array(
            'data'=>$data
        ));
    }

    /**
     * 接受添加分类数据
     */
    public function add()
    {
        $parent_id = @$_REQUEST['parent_id'];
        $category_title = @$_REQUEST['title'];
        $sort = @$_REQUEST['sort'];

        $data = array(
            'parent_id'=>$parent_id,
            'category_title'=>$category_title,
            'sort'=>$sort,
        );
        $res = CategoryModel::add($data);

        if($res) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'恭喜，分类添加成功！',
                    'link'=>Response::generateUrl('admin/category'),
                    'timeout'=>2,
                )
            ));
        }else{
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>CategoryModel::$error_info,
                    'link'=>Response::generateUrl('admin/category'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
        }
    }

    /**
     * 修改分类
     */
    public function edit(){
        $category_id = @$_REQUEST['category_id'];
        if(intval($category_id)==0 && is_int($category_id)===false)
        {
            Template::load('Misc/Error.twig',array(
                'data'=>array(
                    'error_info'=>'分类ID错误！',
                    'code'=>404
                )
            ));
            Template::render();
            exit();
        }

        $data = CategoryModel::findAll();
        $current_data = '';
        foreach($data as $row) {
            if ($row['category_id'] == $category_id) {
                $current_data = $row;
            }
        }
        $tree = array();
        $res = array();
        Action::categoryTree($data,$tree);

        foreach ($tree as $row) {
            $str = '';
            if($row['parent_id'] != 0)
            {
                $str = '&nbsp;&nbsp;&nbsp;|';
            }
            $deep = $row['deep'];
            while ($deep>0) {
                $str .= '--';
                $deep--;
            }
            $row['category_title'] = $str . $row['category_title'];
            $res[] = $row;
        }

        Template::load('Admin/Category_edit.twig',array(
            'data'=>$res,
            'current_data'=>$current_data,
        ));
    }

    /**
     * 修改分类存放
     */
    public static function save()
    {
        $category_id = @$_REQUEST['category_id'];
        $parent_id = @$_REQUEST['parent_id'];
        $category_title = @$_REQUEST['title'];
        $sort = @$_REQUEST['sort'];

        $data = array(
            'parent_id' => $parent_id,
            'category_title' => $category_title,
            'sort' => $sort,
        );

        if ( $parent_id == $category_id ) {
           $res = false;
        }else{
            $res = CategoryModel::update($data,$category_id);
        }
        if ($res) {
            $data = array(
                'data'=>array(
                    'text'=>'恭喜，分类修改成功！',
                    'link'=>Response::generateUrl('admin/category'),
                    'timeout'=>2,
                )
            );
        } else {
            $data = array(
                'data'=>array(
                    'text'=>CategoryModel::$error_info ? CategoryModel::$error_info : '数据未修改！',
                    'link'=>Response::generateUrl('admin/category'),
                    'timeout'=>3,   //3s后跳转
                )
            );
        }
        Template::load('Misc/Redirect.twig',$data);
    }
    /**
     * 删除分类
     */
    public static function delete()
    {
        $category_id = $_REQUEST['category_id'];
        if (!preg_match('/^\d+$/',$category_id)) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'参数错误',
                    'link'=>Response::generateUrl('admin/category'),
                    'timeout'=>3,
                )
            ));
            return;
        }
        $res = CategoryModel::deleteById($category_id);
        if ($res) {
            $data = array(
                'text'=>'您已成功删除了ID为'.$category_id.'的分类！',
                'link'=>Response::generateUrl('admin/category'),
                'timeout'=>3,
            );
        } else {
            $data = array(
                'text'=>CategoryModel::$error_info ? CategoryModel::$error_info : '数据删除失败！',
                'link'=>Response::generateUrl('admin/category'),
                'timeout'=>3,
            );
        }
        Template::load('Misc/Redirect.twig',array(
            'data'=>$data
        ));
    }
}