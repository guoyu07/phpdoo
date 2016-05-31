<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 16/5/16
 * Time: 下午5:59
 */
namespace Core;

use Helper\Session;
use ReflectionObject;

class Controller
{
    public function __construct()
    {
        Session::init();
    }
    public function getClassName()
    {
        $reflection = new ReflectionObject($this);
        return $reflection;
    }
}