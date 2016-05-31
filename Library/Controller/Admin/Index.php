<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/26
 * Time: 下午7:09
 */

namespace Controller\Admin;

use Core\Controller;
use Core\Template;

/**
 * Class Index
 * @package Controller\Admin
 * @Authorization
 * @Admin
 */
class Index extends Controller
{
    public function index()
    {

        Template::load('Admin/Index.twig');
    }
}