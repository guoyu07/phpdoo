<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/28
 * Time: 下午8:54
 */

namespace TwigExtension;

class TimeAgo extends \Twig_Extension
{
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('timeago', array($this, 'get_timeago')),
        );
    }
    function get_timeago( $ptime )
    {
        $estimate_time = time() - $ptime;

        if( $estimate_time < 1 )
        {
            return 'less than 1 second ago';
        }

        $condition = array(
            12 * 30 * 24 * 60 * 60  =>  '年',
            30 * 24 * 60 * 60       =>  '个月',
            24 * 60 * 60            =>  '天',
            60 * 60                 =>  '小时',
            60                      =>  '分钟',
            1                       =>  '秒'
        );

        foreach( $condition as $secs => $str )
        {
            $d = $estimate_time / $secs;

            if( $d >= 1 )
            {
                $r = round( $d );
                return $r . '' . $str . ( $r > 1 ? '' : '' ) . '前';
            }
        }
    }
    public function getName()
    {
        return 'timeago';
    }
}