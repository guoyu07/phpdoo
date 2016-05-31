<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/26
 * Time: 下午7:11
 */

namespace Controller\Admin;

use Model\User as UserModel;

use Core\Controller;
use Core\Template;


/**
 * Class User
 * @package Controller\Admin
 *
 * @Authorization
 * @Admin
 */
class User extends Controller
{
    public function index()
    {
        $users = UserModel::findList();
        Template::load('Admin/User.twig',array(
            'users'=>$users,
        ));
    }
}