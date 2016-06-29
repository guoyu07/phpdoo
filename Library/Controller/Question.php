<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/28
 * Time: 下午7:59
 */

namespace Controller;


use Core\Controller;
use Core\Response;
use Core\Template;
use Helper\Action;
use Helper\Session;
use Model\Answer;
use Model\Question as QuestinModel;
use Model\Category as CategoryModel;
use Model\Publish as PublishModel;
use Model\Topic;
use Model\TopicQuestion as TopicQuestionModel;
use Model\TopicQuestion;

class Question extends Controller
{
//    public function index()
//    {
//        Template::load('Question.twig');
//    }
    /**
     * 添加验证
     * @Authorization
     */
    public function add()
    {
        $data = CategoryModel::findAll();
        $tree = array();
        $category = array();
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
            $category[] = $row;
        }

        $topic = Topic::findAll();

        Template::load('Question_add.twig',array(
            'category'=>$category,
            'topic'=>$topic,
        ));
    }
    /**
     * 添加验证
     * @Authorization
     */
    public function post()
    {
        $category_id = @$_REQUEST['category_id'];
        $question_content = trim(@$_REQUEST['question_content']);
        $question_detail = addslashes(trim(@$_REQUEST['question_detail']));
        $topic = @$_REQUEST['topic'];

        if (!$category_id || !$question_content || !$question_detail) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'参数错误，请填写正确的参数',
                    'link'=>Response::generateUrl('publish'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return false;
        }

        $data = array(
            'category_id'=>$category_id,
            'question_content'=>$question_content,
            'question_detail'=>$question_detail,
            'add_time'=>time(),
            'update_time'=>time(),
            'user_id'=>Session::get('user')['id'],
            'view_count'=>0
        );
        $lastQuestionId = PublishModel::add($data);

        if ($lastQuestionId !== false) {
            TopicQuestionModel::add($topic,$lastQuestionId);

            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'添加成功',
//                    'link'=>Response::generateUrl('/question/detail?question_id=' . $lastQuestionId),
                    'link'=>Response::generateUrl('question/add'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return;
        }
        Template::load('Misc/Redirect.twig',array(
            'data'=>array(
                'text'=>'添加失败' . TopicQuestionModel::$error_info,
                'link'=>Response::generateUrl('publish'),
                'timeout'=>3,   //3s后跳转
            )
        ));
    }
    /**
     * 添加验证
     * @Authorization
     */
    public function edit()
    {
        $data = CategoryModel::findAll();
        $tree = array();
        $category = array();
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
            $category[] = $row;
        }

        $topic = Topic::findAll();
        $question_id = max(1,@$_GET['question_id']);
        $question = QuestinModel::findById($question_id);

        $topic_questions_by_question_id = TopicQuestion::findByQuestionId($question_id);

        Template::load('Question_edit.twig',array(
            'category'=>$category,
            'topic'=>$topic,
            'question'=>$question[0],
            'topic_questions_by_question_id'=>$topic_questions_by_question_id,
        ));
    }
    public function detail()
    {
        $question_id = max(1,intval(@$_GET['question_id']));
        $question_detail = QuestinModel::findById($question_id);

        $answers = Answer::findByQuestionId($question_detail[0]['question_id']);
        Template::load('Question_detail.twig',array(
            'question_detail'  => $question_detail[0],
            'answers'   => $answers,
        ));
    }
}