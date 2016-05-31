<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 16/5/16
 * Time: 上午10:52
 */

namespace Helper;

class Option
{
    public static function getConfig($key)
    {
        if (!file_exists(APP_PATH.'Config.php')) {return false;}
        $str = file_get_contents(APP_PATH . 'Config.php');
        preg_match("/define\\(['\"]".preg_quote($key)."['\"],['\"](.*)['\"]\\)/",$str,$matchs);
        if($matchs)
        {
            return $matchs[1];
        }
        return false;
    }
    public static function setConfig($key,$value)
    {
        if (!file_exists(APP_PATH."Config.php")) {return false;}
        $str = file_get_contents(APP_PATH."Config.php",'rw');
        $res = preg_replace(
            "/define\\('".preg_quote($key)."','(.*)'\\);/",
           "define('".preg_quote($key)."','".preg_quote( preg_quote($value))."');",
            $str
        );
        file_put_contents(APP_PATH."Config.php",$res);
    }
}