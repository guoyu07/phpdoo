<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/20
 * Time: 下午4:15
 */
namespace Controller\Admin;

use Core\Controller;
use Core\Template;
use JasonGrimes\Paginator;
use Model\Question as QuestionModel;

/**
 * Class Question
 * @package Controller\Admin
 * @Authorization
 * @Admin
 */
class Question extends Controller
{
    public function index()
    {

        $pageData = QuestionModel::fetchPageData(8);
        $paginator = new Paginator(
            $pageData['totalItem'],
            $pageData['pageSize'],
            $pageData['currentPage'],
            '?page=(:num)'
        );
        $paginator->setNextText('下一页');
        $paginator->setPreviousText('上一页');
        $paginator->setMaxPagesToShow(5);

        Template::load('Admin/Question.twig',array(
            'pageData'	=> $pageData,
            'paginator' => $paginator->toHtml(),
        ));
    }
}