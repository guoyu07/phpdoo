<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/22
 * Time: 下午8:56
 */
namespace Helper;

class Session
{
    private static $sessionStarted = false;

    public static function init()
    {
        if (self::$sessionStarted == false) {
            session_start();
            self::$sessionStarted = true;
        }
    }

    public static function exists($key)
    {
        return isset($_SESSION[SESSION_PREFIX . $key]);
    }

    public static function set($key, $value = false)
    {
        if (is_array($key) && $value === false) {
            foreach ($key as $name => $val) {
                $_SESSION[SESSION_PREFIX . $name] = $val;
            }
        } else {
            $_SESSION[SESSION_PREFIX . $key] = $value;
        }
    }

    public static function pull($key)
    {
        if (isset($_SESSION[SESSION_PREFIX . $key])) {
            $value = $_SESSION[SESSION_PREFIX . $key];
            unset($_SESSION[SESSION_PREFIX . $key]);
            return $value;
        }
        return null;
    }

    public static function get($key, $secondkey = false)
    {
        if ($secondkey == true) {
            if (isset($_SESSION[SESSION_PREFIX . $key][$secondkey])) {
                return $_SESSION[SESSION_PREFIX . $key][$secondkey];
            }
        } else {
            if (isset($_SESSION[SESSION_PREFIX . $key])) {
                return $_SESSION[SESSION_PREFIX . $key];
            }
        }
        return false;
    }

    public static function id()
    {
        return session_id();
    }

    public static function regenerate()
    {
        session_regenerate_id(true);
        return session_id();
    }

    public static function display()
    {
        return $_SESSION;
    }

    public static function destory($key = '', $prefix = false)
    {
        if (self::$sessionStarted == true) {
            if ($key == '' && $prefix == false) {
                session_unset();
                session_destroy();
            } elseif ($prefix == true) {
                foreach ($_SESSION as $key => $value) {
                    if (strpos($key, SESSION_PREFIX) === 0) {
                        unset($_SESSION[$key]);
                    }
                }
            } else {
                unset($_SESSION[SESSION_PREFIX . $key]);
            }
        }
    }


}