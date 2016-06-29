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

	public function test()
	{
		function f($n, $arr) { //$n是目标数字，$arr是数字组成的数组
			if (empty($arr)) return false; //如果数组没有元素，返回
			if (in_array($n, $arr)) return [$n];//如果期望的值已经存在，直接返回这个值
			foreach($arr as $k => $v) { //遍历数组
				if ($v > $n) continue; //比指定数还大，过
				$copy = $arr; //复制数组
				unset($copy[$k]); //去掉复制数组中已经被选中的数字
				$next = f($n - $v, $copy); //递归计算
				if(! empty($next)) {
					return array_merge([$v], $next); //合并结果集
				}
			}
			return false;//没找到啊
		}
		$arr = [99.1, 92.2, 60, 50, 49.5, 45.7, 25.1, 20, 7.4, 13, 10, 7, 2.1, 2, 1];
		$data = f(100, $arr);
		print_r($data);//Array ( [0] => 60 [1] => 20 [2] => 13 [3] => 7 )
//		$data = f(105, $arr);
//		print_r($data);//Array ( [0] => 60 [1] => 20 [2] => 13 [3] => 10 [4] => 2 )
//
//		print_r(f(120, $arr));
//
//		$arr = [99.1, 92.2, 60, 50, 49.5, 45.7, 25.1, 20, 7.4, 13, 10, 7, 2.1, 2, 1];
//		unset($arr[1]);
//		print_r($arr);
	}

	public function z()
	{

	}
}