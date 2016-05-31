<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/26
 * Time: 下午7:42
 */

namespace Controller\Admin;


use Core\Controller;
use Core\Template;


/**
 * Class Role
 * @package Controller\Admin
 * @Authorization
 * @Admin
 */
class Role extends Controller
{
    public function index()
    {
        $roles = \Model\Role::findAll();
        Template::load('Admin/Role.twig',array(
            'roles'=>$roles,
        ));
    }
}