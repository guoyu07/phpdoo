<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/22
 * Time: 下午9:37
 */
namespace Controller;

use Core\Controller;
use Core\Response;
use Core\Template;
use Helper\Encrypt;
use Helper\Escape;
use Helper\Session;
use Model\User;

class Account extends Controller
{
    public function set()
    {

    }
    public function logout()
    {
        @Session::pull('user');
        Template::load('Misc/Redirect.twig',array(
            'data'=>array(
                'text'=>'您已退出！',
                'link'=>Response::generateUrl(''),
                'timeout'=>3,
            )
        ));
    }
    public function manager()
    {

    }
    public function register()
    {
        Template::load('Register.twig');
    }
    public function login()
    {
        Template::load('Login.twig',array(
            'from_url'=>$_SERVER['HTTP_REFERER']
        ));
    }
    public function loginCheck()
    {
        if (Session::pull('captcha') != @$_REQUEST['captcha']) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'验证码错误',
                    'link'=>Response::generateUrl('account/login'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return false;
        }

        $username = @$_REQUEST['username'];
        $password = @$_REQUEST['password'];
        $referer_url = @$_REQUEST['referer_url'];

        if (!$username && !$password) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'参数错误',
                    'link'=>Response::generateUrl('account/login'),
                    'timeout'=>3,
                )
            ));
        }
        $user = User::findUserByUserNameAndPassword($username,$password);

        if (@$user[0]) {
            Session::set('user',$user[0]);

            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'登陆成功',
                    'link'=>$referer_url ? $referer_url : Response::generateUrl(''),
                    'timeout'=>3,
                )
            ));
        } else {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'账号或密码错误',
                    'link'=>Response::generateUrl('account/login'),
                    'timeout'=>3,
                )
            ));
        }
    }
    public function registerUser()
    {
        if (Session::pull('captcha') != @$_REQUEST['captcha']) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'验证码错误',
                    'link'=>Response::generateUrl('account/register'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return false;
        }



        $user_parrent = '/^[a-zA-Z\x{4e00}-\x{9fa5}][_\w\d\x{4e00}-\x{9fa5}]{3,19}$/u';
        $email_parrent = '/^[\w-_]+@([\w-_]+\.)+\1*[\w-_]+$/';


        $nickname = @$_REQUEST['nickname'];
        $user = @$_REQUEST['username'];
        $password = @$_REQUEST['password'];
        $email = @$_REQUEST['email'];

        if (0 == preg_match('/^[_\w\d\x{4e00}-\x{9fa5}]{0,19}$/u', $nickname)) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'昵称长度不能超过14位',
                    'link'=>Response::generateUrl('account/register'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return false;
        }

        if (0 === preg_match($user_parrent,$user,$matchs)) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'用户名格式错误',
                    'link'=>Response::generateUrl('account/register'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return false;
        }

        if (0 == preg_match($email_parrent,$email,$matchs)) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'邮件地址格式错误',
                    'link'=>Response::generateUrl('account/register'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return false;
        }

        // 密码验证处理
        $vcode = 0;
        if (preg_match('/[A-Z]/',$password,$matchs)) {
            $vcode++;
        }
        if (preg_match('/[a-z]/',$password,$matchs)) {
            $vcode++;
        }
        if (preg_match('/[\d]/',$password,$matchs)) {
            $vcode++;
        }
        if (preg_match('/[~!@#$%^&*()_+]/',$password,$matchs)) {
            $vcode++;
        }

        if ($vcode < 3) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'密码不满足复杂度要求',
                    'link'=>Response::generateUrl('account/register'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return false;
        }

        $salt = substr(md5(microtime()),0,16);
        $token = md5(uniqid(TOKEN_PREFIX,true));
        $data = array(
            'username'=>Escape::perform($user,Escape::TEXT),
            'password'=>md5($password . md5($salt)),
            'nickname'=>Escape::perform($nickname,Escape::TEXT),
            'email'=>Escape::perform($email,Escape::TEXT),
            'token'=>$token,
            'token_exptime'=>time() + 60*60*24, // 24小时内
            'salt' => $salt,
            'status'=>0,
            'regtime'=>time()
        );

        $res = User::registerUser($data);

        if (!$res) {
            Template::load('Misc/Redirect.twig',array(
                'data'=>array(
                    'text'=>'注册失败',
                    'link'=>Response::generateUrl('account/register'),
                    'timeout'=>3,   //3s后跳转
                )
            ));
            return false;
        }

        // 激活邮件内容
        $activeURL = Response::generateUrl('account/active') .'?token=' . Encrypt::encode(urlencode($token));
        $emailMsg = <<<EMAIL
        title: 激活邮件
        activeURL: <a href='$activeURL'>点击激活您的账户</a>
EMAIL;
        // 调用邮件发送函数
        file_put_contents(APP_PATH.'Cache/'.uniqid().'.txt',$emailMsg);


        Template::load('Misc/Redirect.twig',array(
            'data'=>array(
                'text'=>'恭喜，注册成功，请登陆邮箱获取连接以激活您的账户',
                'link'=>Response::generateUrl('index'),
                'timeout'=>10,   //3s后跳转
            )
        ));
    }
    public function active()
    {
        $token = @$_GET['token'];
        $isActive = false;
        if ($token) {
            $token = Encrypt::decode(urldecode($token));
            if ($token) {
                $res = User::activeUser($token);
                if ($res) {
                    $isActive = true;
                }
            }
        }

        Template::load('Misc/Redirect.twig',array(
            'data'=>array(
                'text'=>$isActive ? '激活成功！请登陆' : '激活失败,激活码错误或激活码超时,或该账户已被激活',
                'link'=>$isActive ? Response::generateUrl('account/login') :  Response::generateUrl('index'),
                'timeout'=>5,   //3s后跳转
            )
        ));
    }
}