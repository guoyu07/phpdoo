<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/30
 * Time: 下午4:13
 */
namespace TwigExtension;

class NullToZeroNumber extends \Twig_Extension
{
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('nullToZeroNumber',function($var){
                if (!$var) {
                    return 0;
                }
              return $var;
            })
        );
    }
    public function getName()
    {
        return 'nullToZeroNumber';
    }
}