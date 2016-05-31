<?php
/**
 * Created by hare.
 * Email: 688977@qq.com
 * Date: 16/5/31
 * Time: 下午5:29
 */

namespace TwigExtension;

use Core\Request;

class RegexMatchRequestUrl extends \Twig_Extension
{
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('RegexMatchRequestUrl',function($regex){
                return @preg_match($regex,Request::getRequestUrl()) ? true : false;
            })
        );
    }

    public function getName()
    {
        return 'RegexMatchRequestUrl';
    }
}