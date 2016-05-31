<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/22
 * Time: 下午9:15
 */
namespace Controller;

use Core\Controller;
use Gregwar\Captcha\CaptchaBuilder;
use Helper\CaptchaChinese;
use Helper\Session;

class Captcha extends Controller
{
    public function index()
    {
        $captcha = new CaptchaBuilder();
        $captcha->build(100,40);

        Session::set('captcha',$captcha->getPhrase());

        header('Cache-Control: no-cache no-store must-revalidate');
        header("Expires:".gmdate('D,d M Y H:i:s',time()-1).' GMT');
        header('Content-type: image/jpeg');
        $captcha->output();
    }
    public function chinese()
    {
        $captcha = new CaptchaChinese(CaptchaChinese::VERIFY_ALL_CHAR);
        $captcha->build();
        Session::set('captcha',$captcha->getPhrase());
        $captcha->output();
    }
}