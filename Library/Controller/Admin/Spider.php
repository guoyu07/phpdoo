<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/23
 * Time: 下午5:10
 */
namespace Controller\Admin;

use Core\Response;
use Core\Template;
use Helper\Action;
use Model\Answer;
use Model\Question as QuestionModel;
use Model\Category as CategoryModel;
use Model\Topic as TopicModel;
use Model\TopicQuestion as TopicQuestionModel;
use Model\Answer as AnswerModel;

/**
 * Class Spider
 * @package Controller\Admin
 * @Authorization
 * @Admin
 */
class Spider
{
    public function index()
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


        $topics = TopicModel::findAll();

        Template::load('Admin/Spider.twig',array(
            'category'=>$category,
            'topics'=>$topics
        ));
    }
    public function free()
    {
//        $url = "http://localhost/debug/html/free.html";
        $url = 'https://freecodecamp.cn/baoniu';

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
        $response = curl_exec($curl);

        $pattern ='#<td class="col-xs-2 hidden-xs"><a[^(">)]*?href="/challenges/([^>]*?)\#\?solution=([^(">)]*?)"[^>]*?>View solution</a></td>#';
        preg_match_all($pattern,$response,$matchs);

        $title = $matchs[1];
        $content = $matchs[2];

        foreach($content as $key=>$val) {
            $content[$key] = addslashes(urldecode($val));
        }


        $data = array();
        foreach ($content as $key => $val) {
            $data[]=array(
                'category_id'=>9,
                'question_content'=>$title[$key],
                'question_detail'=>$val,
                'add_time'=>time(),
                'update_time'=>time(),
                'user_id'=>1,
                'view_count'=>0,
            );
        }
        if (count($data)>0) {
            $res = QuestionModel::spiderToDB($data);
        } else {
            $res['count'] = -1;
        }

        if (@intval($res['count'])>0) {
            Template::load('Misc/Redirect.twig', array(
                'data' => array(
                    'text' => '恭喜,您已成功插入 ' . $res['count'] . ' 条数据！',
                    'link' => Response::generateUrl('admin/spider'),
                    'timeout' => 3,
                )
            ));
        }
    }
    public function start()
    {
//        flush();
//        // 向浏览器输出足够多的内容，让浏览器开始渲染展示
//        echo str_repeat(' ',1024);  //1K
//        echo '开始抓取中……';
//        flush();

        $url = @$_POST['url'];
        $category_id = intval(@$_POST['category_id']);
        if (!$url) {
            $url = "https://www.zhihu.com/search?type=content&q=php";
        }


        $curl = curl_init($url);

        curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
//        curl_setopt($curl,CURLOPT_HEADER,true);

        $response = curl_exec($curl);



        $pattern = '#<a[^>]*?class="js-title-link"[^>]*?>(.*?)</a>.*?<script type="text" class="content">(.*?)</script>#s';
        preg_match_all($pattern,$response,$matchs);


        $questions = $matchs[1];
        $answer = $matchs[2];
//var_dump($matchs);exit;
        $data = array();
        foreach ($questions as $key => $question) {
            $data[]=array(
                'category_id'=>$category_id?$category_id:1,
                'question_content'=>addslashes(str_replace(array('<em>','</em>'),'',$question)),
                'question_detail'=>'',
                'add_time'=>time(),
                'update_time'=>time(),
                'user_id'=>1,
                'view_count'=>0,
            );
        }
        if (count($data)>0) {
            $res = QuestionModel::spiderToDB($data);
        } else {
            $res['count'] = -1;
        }

        if (@intval($res['count'])>0) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'恭喜,您已成功插入 '.$res['count'].' 条数据！',
                    'link'=>Response::generateUrl('admin/spider'),
                    'timeout'=>3,
                )
            ));

            $answerData = array();
            for ($i=$res['firstid'],$j=0; $i < ($res['firstid']+$res['count']); $i++,$j++) {
                $answerData[] = array(
                    'question_id'=>$i,
                    'answer_content'=>addslashes($answer[$j]),
                    'user_id'=>1,
                    'add_time'=>time()
                );
            }

            AnswerModel::spiderToDB($answerData);

            $topic = @$_POST['topic'];
            if (count($topic)>0) {
                for ($i = $res['firstid'];$i < $res['firstid']+$res['count']; $i++) {
                    TopicQuestionModel::add($topic,$i);
                }
            }
        } else {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'抱歉：' . max(0,$res['count']) == 0 ? '抓取数据失败！' : '插入数据库失败！',
                    'link'=>Response::generateUrl('admin/spider'),
                    'timeout'=>5,
                )
            ));
        }
        curl_close($curl);
    }
}