<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/19
 * Time: 上午11:54
 */
namespace Core;

class Response
{
    public static function redirect($target)
    {
        $target = self::generateUrl($target);
        header('Location:' . $target);
        exit();
    }
    public static function generateUrl($target = '')
    {
        if (strpos($target,'//') !== false) {
            return $target;
        }
        if (file_exists(ROOT_PATH . $target)) {
            return BASE_URL . $target;
        }
        if (defined('USE_REWRITE') && USE_REWRITE) {
            return BASE_URL . $target;
        }
        return BASE_URL . '' . $target;
        return BASE_URL . 'index.php/' . $target;
    }
}