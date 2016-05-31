<?php
namespace Core;

class Router extends DefaultRouter
{
	function __construct()
	{
		if (!defined('FRAMEWORK_START')) {
			define('FRAMEWORK_START',microtime(true));
		}
	}
	public static function execTime()
	{
		return round(microtime(true) - FRAMEWORK_START,4);			
	}
}