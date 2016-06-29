<?php
if (!defined('ROOT_PATH')) {
    exit('This file could not be access directly.');
}
/**
 * 定义模板目录
 */
define('TEMPLATE_NAME','default');

define('SITE_NAME','Framework');

define('UPLOAD_FILE_PATH', APP_PATH . 'Uploads/');

define('ALLOW_UPLOAD_FILE_SIZE',1024*1024*1024*2);

define('THUMBNAIL_FILE_PATH',WEBROOT_PATH . 'Uploads/');

define('SESSION_PREFIX','FRAMEWORK');

define('TOKEN_PREFIX','TOKEN_');

define('FILE_SUFFIX',".html");

define('ENCRYPT_KEY','KLFjoi2897f9dsafuj89Y)&FOIDS&(^U#@32knfda');


/**
 * 初始化URL根目录
 */
Core\Request::autoDetectBaseURL();

/**
 * 模板初始化
 */
Core\Template::initialize(TEMPLATE_PATH
//    , array('cache'=>APP_PATH.'Cache',)   //开启缓存
);

/**
 * 数据库初始化
 */
Core\Database::initialize('mysql:host=localhost;dbname=imooc;charset=utf8','root','root');
