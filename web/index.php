<?php
ob_start('ob_gzhandler');

define('ROOT_PATH', dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR);
define('APP_PATH', ROOT_PATH.'APP/');
define('LIBRARY_PATH',ROOT_PATH.'Library/');
define('TEMPLATE_PATH',ROOT_PATH.'Template/');
define('WEBROOT_PATH',ROOT_PATH .'web/');
define('HTTP_ROOT_PATH',str_replace('index.php','',$_SERVER['SCRIPT_NAME']));
ini_set('display_errors','on');

require ROOT_PATH . 'vendor/autoload.php';
Core\Error::registerHandler();

require APP_PATH . 'Config.php';


\Core\Decorator::registerDecorator(new \Helper\Authentication());


//echo \Core\Request::getRequestUrl() ,   '<br>';
//                         #^http://k.baoniu.net/topic[/]?[w]*$#i
//echo 'res:',@preg_match('#^http://k.baoniu.net/topic[/]?[\w]*$#',\Core\Request::getRequestUrl());

$router = new Core\Router();
$router->handleRequest();



