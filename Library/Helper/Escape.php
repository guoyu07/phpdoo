<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/29
 * Time: 下午1:19
 */
namespace Helper;

use Core\Error;

class Escape
{
    const NONE = 0;
    const TEXT = 1;
    const TEXT_RECURSIVE = 2;

    public static function perform($variable,$escapeType = self::TEXT_RECURSIVE)
    {
        switch ($escapeType) {
            case self::NONE:
                return $variable;
            case self::TEXT:
                return is_string($variable) ? htmlspecialchars($variable) : $variable;
            case self::TEXT_RECURSIVE:
                if (is_array($variable)) {
                    foreach ($variable as $key => $value) {
                        $variable[$key] = self::perform($value);
                    }
                }
            return $variable;
            default:
                throw new Error("Unknow escape type: {$escapeType}");
        }
    }
}