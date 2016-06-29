<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 16/5/15
 * Time: 下午10:22
 */
namespace Core;

use TwigExtension\GenerateUrl;
use TwigExtension\NullToZeroNumber;
use TwigExtension\RegexMatchRequestUrl;
use TwigExtension\TimeAgo;

class Template
{
    private static $instance;
    private static $context = array();
    private static $assignContext = array();
    private static $loader;
    private static $twig;
    private static $template;
    private function __construct($templatePath,$options = array())
    {
        if (defined('TEMPLATE_NAME')) {
            $templatePath .= TEMPLATE_NAME;
        }
        if (!is_dir($templatePath)) {
            new Error('Template Dir is not found!',404);
        }
        self::$loader = new \Twig_Loader_Filesystem($templatePath);
        self::$twig = new \Twig_Environment(self::$loader,$options);

        self::$twig->addGlobal('web_root_path',HTTP_ROOT_PATH);
        self::$twig->addGlobal('request_url',Request::getRequestUrl());
        self::$twig->addExtension(new TimeAgo());
        self::$twig->addExtension(new GenerateUrl());
        self::$twig->addExtension(new NullToZeroNumber());
        self::$twig->addExtension(new RegexMatchRequestUrl());
    }
    public static function initialize($templatePath,$options = array())
    {
        if (!(self::$instance instanceof self)) {
            self::$instance = new self($templatePath,$options);
        }
    }
    public static function load($templateName,array $data = array())
    {
        self::$template = self::$twig->loadTemplate($templateName);
        if (is_array($data)) {
            self::$context = $data;

        }
    }
    public static function assign($context)
    {
        if (is_array($context)) {
            self::$assignContext = array_merge(self::$assignContext,$context);
        }
    }
    public static function setContext($context)
    {
        self::$context = $context;
    }
    public static function getContext()
    {
        return self::$context;
    }
    public static function render()
    {
        if (self::$template) {
            echo self::$template->render(array_merge(self::$context,self::$assignContext));
        }
    }
}