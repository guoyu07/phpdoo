<?php
namespace Controller;

use Core\Controller;
use Core\Database;
use Core\Template;
use JasonGrimes\Paginator;
use Model\Category as CategoryModel;
use Model\Question as QuestionModel;
use Model\Topic as TopicModel;
use Model\User as UserModel;


/**
 * Class Index
 * @package Controller
 */
class Index extends Controller
{
	/**
	 * 默认首页！
	 */
	public function index()
	{
		$pageData = QuestionModel::fetchPageData();
		$categorys = CategoryModel::findAll();

		$hotTopics = TopicModel::findByHot();
		$hotUsers = UserModel::findHotUsers(3);

		$paginator = new Paginator(
			$pageData['totalItem'],
			$pageData['pageSize'],
			$pageData['currentPage'],
			'?page=(:num)'
		);
		$paginator->setNextText('下一页');
		$paginator->setPreviousText('上一页');
		$paginator->setMaxPagesToShow(5);


		Template::load('index.twig',array(
			'hostUsers' => $hotUsers,
			'categorys'	=> $categorys,
			'hotTopics'	=> $hotTopics,
			'pageData'	=> $pageData,
			'paginator' => $paginator->toHtml(),
		));
	}
}