<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/26
 * Time: 下午8:34
 */
namespace Helper;

use Core\IDecorator;
use Core\Response;
use Core\Template;
use ReflectionObject;
use ReflectionMethod;

class Authentication implements IDecorator
{
    protected $black = false;
    public function __construct()
    {
        Session::init();
    }
    public function preRender()
    {

    }
    public function afterRender()
    {

    }
    public function preRouter()
    {

    }
    public function afterRouter(&$className,&$method)
    {
        $user = Session::get('user');

        $reflection = new ReflectionMethod($className,$method);
        $docComment = $reflection->getDocComment();

        if (strpos($docComment,'@Authorization') !== false && !$user) {
            $this->black = true;
        }

        $reflection = new ReflectionObject(new $className);
        $docCommentClass = $reflection->getDocComment();

        if (strpos($docCommentClass,'@Authorization') !== false && !$user) {
            $this->black = true;
        }

        if (strpos($docComment,'@Admin') !== false || strpos($docCommentClass,'@Admin') !== false) {
            //需要验证管理员
            if (!@$user['isAdmin']) {
                Template::load('Misc/Redirect.twig',array(
                    'data'=>array(
                        'text'=>'您不是管理员,请以管理员账户登陆后再操作！',
                        'link'=>Response::generateUrl('account/login'),
                        'timeout'=>3,
                    )
                ));
                Template::render();
                exit();
            }
        }

        if ($this->black) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'您尚未登陆,请登陆后再操作！',
                    'link'=>Response::generateUrl('account/login'),
                    'timeout'=>3,
                )
            ));
            Template::render();
            exit();
        }

        if ($user) {
            Template::assign(['session_user'=>$user]);
        }
    }
}