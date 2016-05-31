<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/17
 * Time: 下午3:35
 */

namespace Core;

use Core\IDecorator;

class Decorator
{
    public static $decorators = array();
    public static function registerDecorator(IDecorator $decorator)
    {
        $className = get_class($decorator);
        foreach (self::$decorators as $existDecorator) {
            if (get_class($existDecorator) == $className) {
                return;
            }
        }
        self::$decorators[] = $decorator;
    }
    public static function removeDecorator(IDecorator $decorator)
    {
        $className = get_class($decorator);
        foreach (self::$decorators as $existDecoratorKey=>$existDecoratorValue) {
            if (get_class($existDecoratorValue) == $className ) {
                unset(self::$decorators[$existDecoratorKey]);
                return;
            }
        }
    }
    public static function preRouter()
    {
        foreach (self::$decorators as $decorator) {
          $decorator->preRouter();
        }
    }
    public static function afterRouter($className, $method)
    {
        foreach (self::$decorators as $decorator) {
            $decorator->afterRouter($className, $method);
        }
    }
    public static function preRender()
    {
        foreach (self::$decorators as $decorator) {
            $decorator->preRender();
        }
    }
    public static function afterRender()
    {
        foreach (self::$decorators as $decorator) {
            $decorator->afterRender();
        }
    }
}