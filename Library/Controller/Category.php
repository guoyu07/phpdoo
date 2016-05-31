<?php
/**
 * Created by hare.
 * Email: 688977@qq.com
 * Date: 16/5/30
 * Time: 下午4:58
 */

namespace Controller;

use Core\Controller;
use Core\Template;

use JasonGrimes\Paginator;
use Model\Topic as TopicModel;
use Model\Question as QuestionModel;
use Model\Category as CategoryModel;
use Model\User as UserModel;

class Category extends Controller
{
    public function index()
    {

    }
    public function lists()
    {
        $category_id = max(1, @$_GET['category_id']);
        $pageData = QuestionModel::fetchPageDataByCategoryId($category_id);
        $categorys = CategoryModel::findAll();

        $hotTopics = TopicModel::findByHot();
        $hotUsers = UserModel::findHotUsers(3);

        $paginator = new Paginator(
            $pageData['totalItem'],
            $pageData['pageSize'],
            $pageData['currentPage'],
            '?page=(:num)&category_id=' . $category_id
        );
        $paginator->setNextText('下一页');
        $paginator->setPreviousText('上一页');
        $paginator->setMaxPagesToShow($pageData['pageSize']);



        Template::load('Category_lists.twig',array(
            'hostUsers' => $hotUsers,
            'categoryid'=> $category_id,
            'categorys'	=> $categorys,
            'hotTopics'	=> $hotTopics,
            'pageData'	=> $pageData,
            'paginator' => $paginator->toHtml(),
        ));
    }
}