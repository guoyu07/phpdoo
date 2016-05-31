<?php
namespace Core;

class Request{
	public static function autoDetectBaseURL()
	{
		if (!defined('BASE_URL')) {
			$protocol = self::isSecureRequest() ? 'https' : 'http';
			$host = $_SERVER['SERVER_NAME'];
			$subFolder = str_replace('index.php','',$_SERVER['SCRIPT_NAME']);
			define('BASE_URL',"{$protocol}://{$host}{$subFolder}");
			return BASE_URL;
		}
	}

	public static function isSecureRequest()
	{
		if (!defined('IS_HTTPS_REQUEST')) {
			define('IS_HTTPS_REQUEST', (@$_SERVER['HTTPS'] && @$_SERVER['HTTPS'] != 'off'));
		}
		return IS_HTTPS_REQUEST;
	}

	public static function getRequestPath()
    {
		if (@$_SERVER['PATH_INFO']) {
			$path = trim($_SERVER['PATH_INFO'], '/');
		} else {
			list($path) = explode('?',$_SERVER['REQUEST_URI']);
			$folder = str_replace('/index.php','',$_SERVER['PHP_SELF']);
			$path = str_replace($folder,'',$path);
		}
		return $path;
    }
	public static function getRequestUrl()
	{
		if (@$_SERVER['PATH_INFO']) {
			$path = trim($_SERVER['PATH_INFO'], '/');
		} else {
			list($path) = explode('?',$_SERVER['REQUEST_URI']);
			$folder = str_replace('/index.php','',$_SERVER['PHP_SELF']);
			$path = str_replace($folder,'',$path);
		}
		return trim(BASE_URL,'/') . $path;
	}
}