<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/20
 * Time: 下午4:18
 */
namespace Controller\Admin;

use Core\Response;
use Core\Template;
use Helper\GDImage;
use Helper\Upload;
use Model\Topic as TopicModel;


/**
 * Class Topic
 * @package Controller\Admin
 * @Authorization
 * @Admin
 */
class Topic
{
    public function index()
    {

        $data = TopicModel::findAll();
        Template::load('Admin/Topic.twig',array(
            'data'=>$data,
        ));
    }

    public function edit()
    {

    }
    public function add()
    {
        Template::load('Admin/Topic_add.twig');
    }
    /**
     * 接受新建话题参数，并入库
     */
    public function save()
    {
        $file = @$_FILES['topic_image'];
        $topic_title = @$_REQUEST['topic_title'];
        $topic_description = @$_REQUEST['topic_description'];

        if ($file['error']!=0) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'文件上传错误',
                    'link'=>Response::generateUrl('admin/topic/add'),
                    'timeout'=>3,
                )
            ));
            return false;
        }
        if (!$topic_description || !$topic_title) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'参数错误',
                    'link'=>Response::generateUrl('admin/topic/add'),
                    'timeout'=>3,
                )
            ));
            return false;
        }

        // 上传文件
        $image_file = Upload::uploadFile($file,Upload::UseExistingFile);

        if (!$image_file) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'文件上传失败：' . Upload::getLastError(),
                    'link'=>Response::generateUrl('admin/topic/add'),
                    'timeout'=>5,
                )
            ));
            return false;
        }

        // 缩略图处理
        $thumbnail_image = GDImage::resize(UPLOAD_FILE_PATH . $image_file,THUMBNAIL_FILE_PATH,100,100);

        if (!$thumbnail_image) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'文件上传失败：' . GDImage::getLastError(),
                    'link'=>Response::generateUrl('admin/topic/add'),
                    'timeout'=>5,
                )
            ));
            return false;
        }

        $data = array(
            'topic_title'=>$topic_title,
            'topic_desc'=>$topic_description,
            'topic_img'=>$thumbnail_image,
            'add_time'=>time(),
        );

        $res = TopicModel::add($data);

        if (!$res) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'添加话题失败' . TopicModel::$error_info,
                    'link'=>Response::generateUrl('admin/topic/add'),
                    'timeout'=>5,
                )
            ));
            return false;
        }

        Template::load('Misc/Redirect.twig',array(
            'data'=>array(
                'text'=>'恭喜，添加话题成功' ,
                'link'=>Response::generateUrl('admin/topic'),
                'timeout'=>5,
            )
        ));
    }
}