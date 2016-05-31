<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/26
 * Time: 下午7:55
 */

namespace Controller;

use Core\Controller;
use Core\Template;
use Helper\Session;
use JasonGrimes\Paginator;
use Model\Answer as AnswerModel;
use Model\Follow;
use Model\Question;
use Model\Topic as TopicModel;

class Topic extends Controller
{
    public function index()
    {
        $topics = TopicModel::findAllCount();
        $topicTodayData = TopicModel::findByToday();
        $topicNewData = TopicModel::findByDay(7);   // 7天内添加的话题

        $follow_topics = '';
        if (Session::get('user')) {
            $follow_topics = TopicModel::findByUserFollow(Session::get('user')['id']);
        }

        Template::load('Topic.twig',array(
            'topics'=>$topics,  // 话题标题及30天，7天，全部 数量
            'topicTodayData'=>$topicTodayData,
            'follow_topics'=>$follow_topics,
            'topicNewData'=>$topicNewData,
        ));
    }
    public function lists()
    {
        $topic_id = max(1,@intval($_GET['topic_id']));
        $topic = TopicModel::findById($topic_id);
        $questions = Question::findByTopicId($topic_id);
        $followUsers = Follow::findUserByTopicId($topic_id);

        $paginator = new Paginator(
            $questions['totalItem'],
            $questions['pageSize'],
            $questions['currentPage'],
            '?page=(:num)&topic_id=' . $topic_id
        );
        $paginator->setNextText('下一页');
        $paginator->setPreviousText('上一页');
        $paginator->setMaxPagesToShow(5);

        Template::load('Topic_lists.twig',array(
            'topic'=>$topic[0],
            'followUsers'=>$followUsers,
            'questions' =>$questions,
            'paginator' => $paginator->toHtml(),
        ));
    }
}