<?php
/**
 * KK-Framework
 * Author: kookxiang <r18@ikk.me>
 */
namespace Core;

use Core\Template;

class DefaultRouter
{
    protected $foundController = false;

    public function handleRequest()
    {
        $requestPath = Request::getRequestPath();
        $requestPath = ltrim($requestPath, '/');
        // 替换后缀
        $requestPath = preg_replace('/' . ( @FILE_SUFFIX ? FILE_SUFFIX : '.html' ) .'$/i','',$requestPath);

        if (!$requestPath) {
            $requestPath = 'Index';
        }

        Decorator::preRouter($requestPath);
        $this->findController($requestPath);
        if (!$this->foundController) {
            $this->findController('Index/' . $requestPath);  //重试是否在Index.php中
        }

        if (!$this->foundController) {
            throw new Error($requestPath.' The request URL is not exists<br>', 404);
        }
    }

    protected function findController($requestPath, $subDir = '')
    {
        if($this->foundController) return true;
//        $requestPath = rtrim($requestPath,'/');
        @list($controller, $method) = explode('/', $requestPath, 2);

        $controller = ucfirst($controller);
        if (is_dir(LIBRARY_PATH . "Controller/{$subDir}{$controller}")) {
            if (!$method) {
                $method = 'Index';
            }
            if (!$this->foundController) {  //如果找到，则不继续
                $this->findController($method, $subDir . $controller . '/');
            }
        } elseif (file_exists(LIBRARY_PATH . "Controller/{$subDir}{$controller}.php")) {
            if (!$method) {
                $method = 'index';
            } else {
                $method = lcfirst($method);
            }

            $className = str_replace('/', '\\', "Controller/{$subDir}{$controller}");

            $controller = new $className();
            if (method_exists($controller, $method)) {
                 Decorator::afterRouter($className, $method);
                $context = $controller->$method();
                if ($context) {
                    Template::setContext($context);
                }
                Decorator::preRender();
                Template::render();
                Decorator::afterRender();
                $this->foundController = true;
            }
        }
    }
}
