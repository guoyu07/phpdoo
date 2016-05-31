<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/17
 * Time: 下午7:52
 */
namespace Core;

interface IDecorator
{
    public function preRouter();
    public function afterRouter(&$class,&$method);
    public function preRender();
    public function afterRender();
}