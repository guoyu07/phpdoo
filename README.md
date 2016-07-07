# phpdoo

自定义MVC框架，twig模板引擎，并在此基础上做一个小项目，学习为主,并不完善

主要用于熟悉面向对向、设计模式（装饰器、工厂、单例）、反射权限设置、以及复杂SQL联合查询、正则分析、CURL数据抓取等功能

# 安装依赖
composer install

# 安装数据，数据库连接配置在App/Config.php
php phinx migrate -e production
