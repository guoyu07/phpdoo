CREATE TABLE category
(
  category_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_title VARCHAR(64) NOT NULL DEFAULT '', -- 分类名称
  `sort` INT NOT NULL DEFAULT 0, -- 排序
  parent_id INT UNSIGNED NOT NULL DEFAULT 0,-- 父分类ID，0表示顶级分类
  PRIMARY KEY (category_id)
) CHARSET=UTF8;

INSERT INTO category VALUES
    (1,'未分类',0,0),
    (2,'PHP',0,0),
    (3,'PHP框架',0,2),
    (4,'核心语法',0,2),
    (5,'前端',0,0),
    (6,'javascript',0,5),
    (7,'react',0,5),
    (8,'react native',0,7)
    ;


-- 话题表
drop table if exists topic;
create table topic
(
	topic_id int unsigned not null auto_increment,
	topic_title varchar(64) not null default '', -- 话题标题
	topic_desc varchar(255) not null default '', -- 话题描述
	topic_img varchar(255) not null default '', -- 话题缩略图
	primary key(topic_id)
) charset=utf8;

-- 问题表
drop table if exists question;
create table question
(
	question_id int unsigned not null auto_increment,
	category_id int unsigned not null default 0, -- 所属分类ID
	question_content varchar(255) not null default '', -- 问题内容
	question_detail text, -- 问题描述
	add_time int not null default 0, -- 添加时间
	update_time int not null default 0, -- 更新时间
	user_id int unsigned not null default 0, -- 发布问题的用户ID
	view_count int unsigned not null default 0, -- 浏览次数
	primary key (question_id)
) charset=utf8;

-- 话题 问题 关联表
drop table if exists topic_question;
create table topic_question
(
	tq_id int unsigned not null auto_increment,
	topic_id int unsigned not null default 0,
	question_id int unsigned not null default 0,
	primary key (tq_id)
) charset=utf8;

-- 用户表
CREATE TABLE `user` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(30) NOT NULL COMMENT '用户名',
	`password` varchar(32) NOT NULL COMMENT '密码',
	`salt` VARCHAR(16) NOT NULL COMMENT '盐',
	`email` varchar(30) NOT NULL COMMENT '邮箱',
	`role_id` tinyint(2) DEFAULT '0' COMMENT '角色类型ID',
	`token` varchar(50) NOT NULL COMMENT '帐号激活码',
	`token_exptime` int(10) NOT NULL COMMENT '激活码有效期',
	`status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0-未激活,1-已激活',
	`regtime` int(10) NOT NULL COMMENT '注册时间',
	`lastlogin` int(10) COMMENT '最后登陆时间',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
-- 角色表
CREATE TABLE `role` (
	`id` TINYINT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '角色id',
	`title` VARCHAR(32) NOT NULL COMMENT '角色说明'
) charset=utf8;
create TABLE answer (
	answer_id int UNSIGNED NOT NULL AUTO_INCREMENT,
	question_id int unsigned not null DEFAULT 0,
	answer_content text,
	user_id int unsigned not NULL DEFAULT 0,
	add_time int not NULL DEFAULT 0,
	PRIMARY KEY (answer_id)
) CHARSET=utf8;



