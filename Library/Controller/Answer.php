<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/29
 * Time: 下午8:22
 */

namespace Controller;

use Core\Controller;
use Core\Response;
use Core\Template;
use Helper\Session;

class Answer extends Controller
{
    /**
     * @Authorization
     */
    public function add()
    {
        $isOK = false;
        $question_id = @$_POST['question_id'];
        $answer_content = @$_POST['answer_content'];

        if ($question_id>0 && !empty($answer_content)) {
            $user_id = Session::get('user')['id'];
            $data = array(
                'question_id' => $question_id,
                'user_id' => $user_id,
                'answer_content' => $answer_content,
                'add_time' => time(),
            );

            $res = \Model\Answer::insert($data);

            if ($res) {
                $isOK = true;
            }
        }

        if ($isOK) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'发表成功',
                    'link'=>$_SERVER['HTTP_REFERER'] ? $_SERVER['HTTP_REFERER'] :Response::generateUrl(),
                    'timeout'=>1,   //3s后跳转
                )
            ));
        } else {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'发表回答失败',
                    'link'=>$_SERVER['HTTP_REFERER'] ? $_SERVER['HTTP_REFERER'] :Response::generateUrl(),
                    'timeout'=>3,   //3s后跳转
                )
            ));
        }
    }
}