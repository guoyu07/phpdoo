/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	(function webpackMissingModule() { throw new Error("Cannot find module \"/Applications/XAMPP/xamppfiles/htdocs/debug/web/Resource/Default/js/areas.js\""); }());
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	module.exports = __webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var document_title = document.title;

	$(document).ready(function ()
	{
	    // fix form bug...
	    $("form[action='']").attr('action', window.location.href);

	    // 验证码
	    $('img#captcha').attr('src', G_BASE_URL + '/account/captcha/');

	    // 输入框自动增高
	    $('.autosize').autosize();

	    //响应式导航条效果
	    $('.aw-top-nav .navbar-toggle').click(function()
	    {
	        if ($(this).parents('.aw-top-nav').find('.navbar-collapse').hasClass('active'))
	        {
	            $(this).parents('.aw-top-nav').find('.navbar-collapse').removeClass('active');
	        }
	        else
	        {
	            $(this).parents('.aw-top-nav').find('.navbar-collapse').addClass('active');
	        }
	    });

	    //检测通知
	    if (typeof (G_NOTIFICATION_INTERVAL) != 'undefined')
	    {
	        AWS.Message.check_notifications();
	        AWS.G.notification_timer = setInterval('AWS.Message.check_notifications()', G_NOTIFICATION_INTERVAL);
	    }

	    //文章列表样式调整
	    if ($('.aw-common-list').length)
	    {
	        $.each($('.aw-common-list .aw-item.article'), function (i, e)
	        {
	            if ($(this).find('.all-content img').length >= 1)
	            {
	                $(this).find('.markitup-box').prepend($(this).find('.all-content img').eq(0).addClass('pull-left inline-img'))
	            }
	        });
	    }

	    $('a[rel=lightbox]:visible').fancybox(
	    {
	        openEffect: 'none',
	        closeEffect: 'none',
	        prevEffect: 'none',
	        nextEffect: 'none',
	        centerOnScroll : true,
	        closeBtn: false,
	        helpers:
	        {
	            buttons:
	            {
	                position: 'bottom'
	            }
	        },
	        afterLoad: function ()
	        {
	            this.title = '第 ' + (this.index + 1) + ' 张, 共 ' + this.group.length + ' 张' + (this.title ? ' - ' + this.title : '');
	        }
	    });

	    if (window.location.hash.indexOf('#!') != -1)
	    {
	        if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)
	        {
	            $.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});
	        }
	    }

	    /*用户头像提示box*/
	    AWS.show_card_box('.aw-user-name, .aw-user-img', 'user');

	    AWS.show_card_box('.topic-tag, .aw-topic-name, .aw-topic-img', 'topic');

	    //文章页添加评论, 话题添加 绑定事件
	    AWS.Init.init_article_comment_box('.aw-article-content .aw-article-comment');

	    AWS.Init.init_topic_edit_box('.aw-edit-topic');

	    //话题编辑下拉菜单click事件
	    $(document).on('click', '.aw-edit-topic-box .aw-dropdown-list li', function ()
	    {
	        $(this).parents('.aw-edit-topic-box').find('#aw_edit_topic_title').val($(this).text());
	        $(this).parents('.aw-edit-topic-box').find('.add').click();
	        $(this).parents('.aw-edit-topic-box').find('.aw-dropdown').hide();
	    });

	    //话题删除按钮
	    $(document).on('click', '.topic-tag .close',  function()
	    {
	        var data_type = $(this).parents('.aw-topic-bar').attr('data-type'),
	            data_id = $(this).parents('.aw-topic-bar').attr('data-id'),
	            data_url = '',
	            topic_id = $(this).parents('.topic-tag').attr('data-id');

	        switch (data_type)
	        {
	            case 'question':
	                data_url = G_BASE_URL + '/topic/ajax/remove_topic_relation/';
	                break;

	            case 'topic':
	                data_url = G_BASE_URL + '/topic/ajax/remove_related_topic/related_id-' + $(this).parents('.topic-tag').attr('data-id') + '__topic_id-' + data_id;
	                break;

	            case 'favorite':
	                data_url = G_BASE_URL + '/favorite/ajax/remove_favorite_tag/';
	                break

	            case 'article':
	                data_url = G_BASE_URL + '/topic/ajax/remove_topic_relation/';
	                break;
	        }

	        if ($(this).parents('.aw-topic-bar').attr('data-url'))
	        {
	            data_url = $(this).parents('.aw-topic-bar').attr('data-url');
	        }

	        if (data_type == 'topic')
	        {
	            $.get(data_url);
	        }
	        else if (data_type == 'favorite')
	        {
	            $.post(data_url, 
	            {
	                'item_type': data_type,
	                'topic_id': topic_id,
	                'item_id' : data_id,
	                'tags' : $.trim($(this).parents('.topic-tag').text())
	            }, function (result)
	            {
	            }, 'json');
	        }
	        else
	        {
	            $.post(data_url, 
	            {
	                'type': data_type,
	                'topic_id': topic_id,
	                'item_id' : data_id
	            }, function (result)
	            {
	                $('#aw-ajax-box').empty();
	            }, 'json');
	        }

	        $(this).parents('.topic-tag').remove();

	        return false;
	    });

	    //小卡片mouseover
	    $(document).on('mouseover', '#aw-card-tips', function ()
	    {
	        clearTimeout(AWS.G.card_box_hide_timer);

	        $(this).show();
	    });

	    //小卡片mouseout
	    $(document).on('mouseout', '#aw-card-tips', function ()
	    {
	        $(this).hide();
	    });

	    //用户小卡片关注更新缓存
	    $(document).on('click', '.aw-card-tips-user .follow', function ()
	    {
	        var uid = $(this).parents('.aw-card-tips').find('.name').attr('data-id');

	        $.each(AWS.G.cashUserData, function (i, a)
	        {
	            if (a.match('data-id="' + uid + '"'))
	            {
	                if (AWS.G.cashUserData.length == 1)
	                {
	                    AWS.G.cashUserData = [];
	                }
	                else
	                {
	                    AWS.G.cashUserData[i] = '';
	                }
	            }
	        });
	    });

	    //话题小卡片关注更新缓存
	    $(document).on('click', '.aw-card-tips-topic .follow', function ()
	    {
	        var topic_id = $(this).parents('.aw-card-tips').find('.name').attr('data-id');

	        $.each(AWS.G.cashTopicData, function (i, a)
	        {
	            if (a.match('data-id="' + topic_id + '"'))
	            {
	                if (AWS.G.cashTopicData.length == 1)
	                {
	                    AWS.G.cashTopicData = [];
	                }
	                else
	                {
	                    AWS.G.cashTopicData[i] = '';
	                }
	            }
	        });
	    });

	    /*icon tooltips提示*/
	    $(document).on('mouseover', '.follow, .voter, .aw-icon-thank-tips, .invite-list-user', function ()
	    {
	        $(this).tooltip('show');
	    });

	    //搜索下拉
	    AWS.Dropdown.bind_dropdown_list('#aw-search-query', 'search');

	    //编辑器@人
	    AWS.at_user_lists('#wmd-input, .aw-article-replay-box #comment_editor', 5);

	    //ie浏览器下input,textarea兼容
	    if (document.all)
	    {
	        AWS.check_placeholder($('input, textarea'));

	        // 每隔1s轮询检测placeholder
	        setInterval(function()
	        {
	            AWS.check_placeholder($('input[data-placeholder!="true"], textarea[data-placeholder!="true"]'));
	        }, 1000);
	    }

	    if ($('.aw-back-top').length)
	    {
	        $(window).scroll(function ()
	        {
	            if ($(window).scrollTop() > ($(window).height() / 2))
	            {
	                $('.aw-back-top').fadeIn();
	            }
	            else
	            {
	                $('.aw-back-top').fadeOut();
	            }
	        });
	    }
	});

	$(window).on('hashchange', function() {
	    if (window.location.hash.indexOf('#!') != -1)
	    {
	        if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)
	        {
	            $.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});
	        }
	    }
	});


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	var AW_TEMPLATE = {
		'loadingBox':
			'<div id="aw-loading" class="hide">'+
				'<div id="aw-loading-box"></div>'+
			'</div>',

		'loadingMiniBox':
			'<div id="aw-loading-mini-box"></div>',

		'userCard':
				'<div id="aw-card-tips" class="aw-card-tips aw-card-tips-user">'+
					'<div class="aw-mod">'+
						'<div class="mod-head">'+
							'<a href="{{url}}" class="img">'+
								'<img src="{{avatar_file}}" alt="" />'+
							'</a>'+
							'<p class="title clearfix">'+
								'<a href="{{url}}" class="name pull-left" data-id="{{uid}}">{{user_name}}</a>'+
								'<i class="{{verified_enterprise}} pull-left" title="{{verified_title}}"></i>'+
							'</p>'+
							'<p class="aw-user-center-follow-meta">'+
								'<span>' + _t('威望') + ': <em class="aw-text-color-green">{{reputation}}</em></span>'+
								'<span>' + _t('赞同') + ': <em class="aw-text-color-orange">{{agree_count}}</em></span>'+
							'</p>'+
						'</div>'+
						'<div class="mod-body">'+
							'<p>{{signature}}</p>'+
						'</div>'+
						'<div class="mod-footer clearfix">'+
							'<span>'+
								'<a class="text-color-999" onclick="AWS.dialog(\'inbox\', \'{{user_name}}\');"><i class="icon icon-inbox"></i> ' + _t('私信') + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<a  class="text-color-999" onclick="AWS.dialog(\'publish\', {category_enable:{{category_enable}}, ask_user_id:{{uid}}, ask_user_name:{{ask_name}} });"><i class="icon icon-at"></i> ' + _t('问Ta') + '</a>'+
							'</span>'+
							'<a class="btn btn-normal btn-success follow {{focus}} pull-right" onclick="AWS.User.follow($(this), \'user\', {{uid}});"><span>{{focusTxt}}</span> <em>|</em> <b>{{fansCount}}</b></a>'+
						'</div>'+
					'</div>'+
				'</div>',

		'topicCard' :
				'<div id="aw-card-tips" class="aw-card-tips aw-card-tips-topic">'+
					'<div class="aw-mod">'+
						'<div class="mod-head">'+
							'<a href="{{url}}" class="img">'+
								'<img src="{{topic_pic}}" alt="" title=""/>'+
							'</a>'+
							'<p class="title">'+
								'<a href="{{url}}" class="name" data-id="{{topic_id}}">{{topic_title}}</a>'+
							'</p>'+
							'<p class="desc">'+
								'{{topic_description}}'+
							'</p>'+
						'</div>'+
						'<div class="mod-footer">'+
							'<span>'+ _t('讨论数') + ': {{discuss_count}}</span>'+
							'<a class="btn btn-normal btn-success follow {{focus}} pull-right" onclick="AWS.User.follow($(this), \'topic\', {{topic_id}});"><span>{{focusTxt}}</span> <em>|</em> <b>{{focus_count}}</b></a>'+
						'</div>'+
					'</div>'+
				'</div>',

		'alertBox' :
				'<div class="modal fade alert-box aw-tips-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
							'</div>'+
							'<div class="modal-body">'+
								'<p>{{message}}</p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

		'editCommentBox' :
					'<div class="modal fade alert-box aw-edit-comment-box aw-editor-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('编辑回复') + '</h3>'+
							'</div>'+
							'<form action="' + G_BASE_URL + '/question/ajax/update_answer/answer_id-{{answer_id}}" method="post" onsubmit="return false" id="answer_edit">'+
							'<div class="modal-body">'+
								'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
								'<input type="hidden" name="attach_access_key" value="{{attach_access_key}}" />'+
								'<textarea name="answer_content" id="editor_reply" class="form-control" rows="10"></textarea>'+
								'<div class="aw-file-upload-box">'+
									'<div class="aw-upload-box">'+
										'<a class="btn btn-default">上传附件</a>'+
										'<div class="upload-container"></div>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="modal-footer">'+
								'<span><input id="aw-do-delete" type="checkbox" value="1" name="do_delete" /><label for="aw-do-delete">' + _t('删除回复') + '</label></span>'+
								'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#answer_edit\'), AWS.ajax_processer, \'ajax_post_alert\');return false;">' + _t('确定') + '</button>'+
							'</div>'+
							'</form>'+
						'</div>'+
					'</div>'+
				'</div>',

		'articleCommentBox' :
			'<div class="aw-article-replay-box clearfix">'+
				'<form action="'+ G_BASE_URL +'/article/ajax/save_comment/" onsubmit="return false;" method="post">'+
					'<div class="mod-body">'+
						'<input type="hidden" name="at_uid" value="{{at_uid}}">'+
						'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
						'<input type="hidden" name="article_id" value="{{article_id}}" />'+
						'<textarea placeholder="' + _t('写下你的评论...') + '" class="form-control" id="comment_editor" name="message" rows="2"></textarea>'+
					'</div>'+
					'<div class="mod-footer">'+
						'<a href="javascript:;" onclick="AWS.ajax_post($(this).parents(\'form\'));" class="btn btn-normal btn-success pull-right btn-submit">' + _t('回复') + '</a>'+
					'</div>'+
				'</form>'+
			'</div>',

		'favoriteBox' :
			'<div class="modal hide fade alert-box aw-favorite-box">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('收藏') + '</h3>'+
						'</div>'+
						'<form id="favorite_form" action="' + G_BASE_URL + '/favorite/ajax/update_favorite_tag/" method="post" onsubmit="return false;">'+
							'<input type="hidden" name="item_id" value="{{item_id}}" />'+
							'<input type="hidden" name="item_type" value="{{item_type}}" />'+
							'<input type="text" name="tags" id="add_favorite_tags" class="hide" />'+
							'<div class="mod aw-favorite-tag-list">'+
								'<div class="modal-body">'+
									'<div class="mod-body"><ul></ul></div>'+
									'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<a class="pull-left" onclick="$(\'.aw-favorite-box .aw-favorite-tag-list\').hide();$(\'.aw-favorite-box .aw-favorite-tag-add\').show();">' + _t('创建标签') + '</a>'+
									'<a href="javascript:;"  data-dismiss="modal" aria-hidden="true" class="btn btn-large btn-gray" onclick="return false;">' + _t('关闭') + '</a>'+
								'</div>'+
							'</div>'+
							'<div class="mod aw-favorite-tag-add hide">'+
								'<div class="modal-body">'+
									'<input type="text" class="form-control add-input" placeholder="' + _t('标签名字') + '" />'+
								'</div>'+
								'<div class="modal-footer">'+
									'<a class="text-color-999" onclick="$(\'.aw-favorite-box .aw-favorite-tag-list\').show();$(\'.aw-favorite-box .aw-favorite-tag-add\').hide();" style="margin-right:10px;">' + _t('取消') + '</a>'+
									'<a href="javascript:;" class="btn btn-large btn-success" onclick="AWS.User.add_favorite_tag()">' + _t('确认创建') + '</a>'+
								'</div>'+
							'</div>'+
						'</form>'+
					'</div>'+
				'</div>'+
			'</div>',

		'questionRedirect' :
			'<div class="modal fade alert-box aw-question-redirect-box">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('问题重定向至') + '</h3>'+
						'</div>'+
						'<div class="modal-body">'+
							'<p>' + _t('将问题重定向至') + '</p>'+
							'<div class="aw-question-drodpwon">'+
								'<input id="question-input" class="form-control" type="text" data-id="{{data_id}}" placeholder="' + _t('搜索问题或问题 ID') + '" />'+
								'<div class="aw-dropdown"><p class="title">' + _t('没有找到相关结果') + '</p><ul class="aw-dropdown-list"></ul></div>'+
							'</div>'+
							'<p class="clearfix"><a href="javascript:;" class="btn btn-large btn-success pull-right" onclick="$(\'.alert-box\').modal(\'hide\');">' + _t('放弃操作') + '</a></p>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',

		'publishBox' :
				'<div class="modal fade alert-box aw-publish-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('发起问题') + '</h3>'+
							'</div>'+
							'<div class="modal-body">'+
								'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
								'<form action="' + G_BASE_URL + '/publish/ajax/publish_question/" method="post" id="quick_publish" onsubmit="return false">'+
									'<input type="hidden" id="quick_publish_category_id" name="category_id" value="{{category_id}}" />'+
									'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
									'<input type="hidden" name="ask_user_id" value="{{ask_user_id}}" />'+
									'<div>'+
										'<textarea class="form-control" placeholder="' + _t('写下你的问题') + '..." rows="1" name="question_content" id="quick_publish_question_content" onkeydown="if (event.keyCode == 13) { return false; }"></textarea>'+
										'<div class="aw-publish-suggest-question hide">'+
											'<p class="text-color-999">你的问题可能已经有答案</p>'+
											'<ul class="aw-dropdown-list">'+
											'</ul>'+
										'</div>'+
									'</div>'+
									'<textarea name="question_detail" class="form-control" rows="4" placeholder="' + _t('问题背景、条件等详细信息') + '..."></textarea>'+
									'<div class="aw-publish-title">'+
										'<div class="dropdown" id="quick_publish_category_chooser">'+
											'<div class="dropdown-toggle" data-toggle="dropdown">'+
												'<span id="aw-topic-tags-select" class="aw-hide-txt">' + _t('选择分类') + '</span>'+
												'<a><i class="icon icon-down"></i></a>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="aw-topic-bar" data-type="publish">'+
										'<div class="tag-bar clearfix">'+
											'<span class="aw-edit-topic"><i class="icon icon-edit"></i>' + _t('编辑话题') + '</span>'+
										'</div>'+
									'</div>'+
									'<div class="clearfix hide" id="quick_publish_captcha">'+
										'<input type="text" class="pull-left form-control" name="seccode_verify" placeholder="' + _t('验证码') + '" />'+
										'<img id="qp_captcha" class="pull-left" onclick="this.src = \'' +G_BASE_URL + '/account/captcha/\' + Math.floor(Math.random() * 10000);" src="" />'+
									'</div>'+
								'</form>'+
							'</div>'+
							'<div class="modal-footer">'+
								'<span class="pull-right">'+
									'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
									'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');">' + _t('发起') + '</button>'+
								'</span>'+
								'<a href="javascript:;" tabindex="-1" onclick="$(\'form#quick_publish\').attr(\'action\', \'' + G_BASE_URL + '/publish/\');$.each($(\'#quick_publish textarea\'), function (i, e){if ($(this).val() == $(this).attr(\'placeholder\')){$(this).val(\'\');}});document.getElementById(\'quick_publish\').submit();" class="pull-left">' + _t('高级模式') + '</a>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

		'inbox' :
				'<div class="modal fade alert-box aw-inbox">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('新私信') + '</h3>'+
							'</div>'+
							'<div class="modal-body">'+
								'<div class="alert alert-danger hide error_message"> <i class="icon icon-delete"></i> <em></em></div>'+
								'<form action="' + G_BASE_URL + '/inbox/ajax/send/" method="post" id="quick_publish" onsubmit="return false">'+
									'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
									'<input id="invite-input" class="form-control" type="text" placeholder="' + _t('搜索用户') + '" name="recipient" value="{{recipient}}" />'+
									'<div class="aw-dropdown">'+
										'<p class="title">' + _t('没有找到相关结果') + '</p>'+
										'<ul class="aw-dropdown-list">'+
										'</ul>'+
									'</div>'+
									'<textarea class="form-control" name="message" rows="3" placeholder="' + _t('私信内容...') + '"></textarea>'+
								'</form>'+
							'</div>'+
							'<div class="modal-footer">'+
								'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
								'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');">' + _t('发送') + '</button>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

		'editTopicBox' :
			'<div class="aw-edit-topic-box form-inline">'+
				'<input type="text" class="form-control" id="aw_edit_topic_title" autocomplete="off"  placeholder="' + _t('创建或搜索添加新话题') + '...">'+
				'<a class="btn btn-normal btn-success add">' + _t('添加') + '</a>'+
				'<a class="btn btn-normal btn-gray close-edit">' + _t('取消') + '</a>'+
				'<div class="aw-dropdown">'+
					'<p class="title">' + _t('没有找到相关结果') + '</p>'+
					'<ul class="aw-dropdown-list">'+
					'</ul>'+
				'</div>'+
			'</div>',

		'ajaxData' :
			'<div class="modal fade alert-box aw-topic-edit-note-box aw-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">{{title}}</h3>'+
						'</div>'+
						'<div class="modal-body">'+
							'{{data}}'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',

		'commentBox' :
				'<div class="aw-comment-box" id="{{comment_form_id}}">'+
					'<div class="aw-comment-list"><p align="center" class="aw-padding10"><i class="aw-loading"></i></p></div>'+
					'<form action="{{comment_form_action}}" method="post" onsubmit="return false">'+
						'<div class="aw-comment-box-main">'+
							'<textarea class="aw-comment-txt form-control" rows="2" name="message" placeholder="' + _t('评论一下') + '..."></textarea>'+
							'<div class="aw-comment-box-btn">'+
								'<span class="pull-right">'+
									'<a href="javascript:;" class="btn btn-mini btn-success" onclick="AWS.User.save_comment($(this));">' + _t('评论') + '</a>'+
									'<a href="javascript:;" class="btn btn-mini btn-gray close-comment-box">' + _t('取消') + '</a>'+
								'</span>'+
							'</div>'+
						'</div>'+
					'</form>'+
				'</div>',

		'commentBoxClose' :
				'<div class="aw-comment-box" id="{{comment_form_id}}">'+
					'<div class="aw-comment-list"><p align="center" class="aw-padding10"><i class="aw-loading"></i></p></div>'+
				'</div>',

		'dropdownList' :
			'<div aria-labelledby="dropdownMenu" role="menu" class="aw-dropdown">'+
				'<ul class="aw-dropdown-list">'+
				'{{#items}}'+
					'<li><a data-value="{{id}}">{{title}}</a></li>'+
				'{{/items}}'+
				'</ul>'+
			'</div>',

		'reportBox' :
				'<div class="modal fade alert-box aw-share-box aw-share-box-message aw-report-box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('举报问题') + '</h3>'+
							'</div>'+
							'<form id="quick_publish" method="post" action="' + G_BASE_URL + '/question/ajax/save_report/">'+
								'<input type="hidden" name="type" value="{{item_type}}" />'+
								'<input type="hidden" name="target_id" value="{{item_id}}" />'+
								'<div class="modal-body">'+
									'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
									'<textarea class="form-control" name="reason" rows="5" placeholder="' + _t('请填写举报理由') + '..."></textarea>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
									'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');return false;">' + _t('提交') + '</button>'+
								'</div>'+
							'</form>'+
						'</div>'+
					'</div>'+
				'</div>',

		'recommend' :
			'<div class="modal fade alert-box aw-recommend-box">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('推荐到帮助中心') + '</h3>'+
						'</div>'+
						'<form id="help_form" action="' + G_BASE_URL + '/help/ajax/add_data/" method="post" onsubmit="return false;">'+
						'<input type="hidden" name="item_id" value="{{item_id}}" />'+
						'<input type="hidden" name="item_type" value="{{question}}" />'+
						'<input type="hidden" name="item_type" value="{{article}}" />'+
						'<div class="mod">'+
						'<div class="modal-body clearfix">'+
							'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
							'<div class="mod-body">'+
								'<ul></ul>'+
							'</div>'+
						'</div>'+
						'</div>'+
						'<div class="modal-footer">'+
							'<button href="javascript:;"  data-dismiss="modal" aria-hidden="true" class="btn btn-normal btn-gray">' + _t('关闭') + '</button>'+
						'</div>'+
						'</form>'+
					'</div>'+
				'</div>'+
			'</div>',

		'searchDropdownListQuestions' :
			'<li class="{{active}} question clearfix"><i class="icon icon-bestbg pull-left"></i><a class="aw-hide-txt pull-left" href="{{url}}">{{content}} </a><span class="pull-right text-color-999">{{discuss_count}} ' + _t('个回复') + '</span></li>',
		'searchDropdownListTopics' :
			'<li class="topic clearfix"><span class="topic-tag" data-id="{{topic_id}}"><a href="{{url}}" class="text">{{name}}</a></span> <span class="pull-right text-color-999">{{discuss_count}} ' + _t('个讨论') + '</span></li>',
		'searchDropdownListUsers' :
			'<li class="user clearfix"><a href="{{url}}"><img src="{{img}}" />{{name}}<span class="aw-hide-txt">{{intro}}</span></a></li>',
		'searchDropdownListArticles' :
			'<li class="question clearfix"><a class="aw-hide-txt pull-left" href="{{url}}">{{content}} </a><span class="pull-right text-color-999">{{comments}} ' + _t('条评论') + '</span></li>',
		'inviteDropdownList' :
			'<li class="user"><a data-url="{{url}}" data-id="{{uid}}" data-actions="{{action}}" data-value="{{name}}"><img class="img" src="{{img}}" />{{name}}</a></li>',
		'editTopicDorpdownList' :
			'<li class="question"><a>{{name}}</a></li>',
		'questionRedirectList' :
			'<li class="question"><a class="aw-hide-txt" onclick="AWS.ajax_request({{url}})">{{name}}</a></li>',
		'questionDropdownList' :
			'<li class="question" data-id="{{id}}"><a class="aw-hide-txt" href="{{url}}">{{name}}</a></li>',

		'inviteUserList' :
			'<li>'+
				'<a class="pull-right btn btn-mini btn-default" onclick="disinvite_user($(this),{{uid}});$(this).parent().detach();">' + _t('取消邀请') + '</a>'+
				'<a class="aw-user-name" data-id="{{uid}}">'+
					'<img src="{{img}}" alt="" />'+
				'</a>'+
				'<span class="aw-text-color-666">{{name}}</span>'+
			'</li>',

		'educateInsert' :
				'<td class="e1" data-txt="{{school}}">{{school}}</td>'+
				'<td class="e2" data-txt="{{departments}}">{{departments}}</td>'+
				'<td class="e3" data-txt="{{year}}">{{year}} ' + _t('年') + '</td>'+
				'<td><a class="delete-educate">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="edit-educate">' + _t('编辑') + '</a></td>',

		'educateEdit' :
				'<td><input type="text" value="{{school}}" class="school form-control"></td>'+
				'<td><input type="text" value="{{departments}}" class="departments form-control"></td>'+
				'<td><select class="year edityear">'+
					'</select> ' + _t('年') + '</td>'+
				'<td><a class="delete-educate">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="add-educate">' + _t('保存') + '</a></td>',

		'workInsert' :
				'<td class="w1" data-txt="{{company}}">{{company}}</td>'+
				'<td class="w2" data-txt="{{jobid}}">{{work}}</td>'+
				'<td class="w3" data-s-val="{{syear}}" data-e-val="{{eyear}}">{{syear}} ' + _t('年') + ' ' + _t('至') + ' {{eyear}}</td>'+
				'<td><a class="delete-work">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="edit-work">' + _t('编辑') + '</a></td>',

		'workEidt' :
				'<td><input type="text" value="{{company}}" class="company form-control"></td>'+
				'<td>'+
					'<select class="work editwork">'+
					'</select>'+
				'</td>'+
				'<td><select class="syear editsyear">'+
					'</select>&nbsp;&nbsp;' + _t('年') + ' &nbsp;&nbsp; ' + _t('至') + '&nbsp;&nbsp;&nbsp;&nbsp;'+
					'<select class="eyear editeyear">'+
					'</select> ' + _t('年') +
				'</td>'+
				'<td><a class="delete-work">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="add-work">' + _t('保存') + '</a></td>',

		'alertImg' :
			'<div class="modal fade alert-box aw-tips-box aw-alert-img-box">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
						'</div>'+
						'<div class="modal-body">'+
							'<p class="hide {{hide}}">{{message}}</p>'+
							'<img src="{{url}}" />'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',

		'confirmBox' :
			'<div class="modal fade alert-box aw-confirm-box">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
							'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
						'</div>'+
						'<div class="modal-body">'+
							'{{message}}'+
						'</div>'+
						'<div class="modal-footer">'+
							'<a class="btn btn-gray" data-dismiss="modal" aria-hidden="true">取消</a>'+
							'<a class="btn btn-success yes">确定</a>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',

		// Modify by wecenter
		'ProjectForm' :
			'<div class="mod aw-project-return-form hide">'+
				'<form action="" method="" name="">'+
					'<div class="mod-body">'+
						'<dl class="clearfix">'+
							'<dt><strong>*</strong>回报标题:</dt>'+
							'<dd><input type="text" class="form-control form-normal title"/><label class="label label-danger hide">回报标题与支持额度至少填写一个</label></dd>'+
							'</dl>'+
						'<dl>'+
						'<dt><strong>*</strong>支持额度:</dt>'+
							'<dd><input type="text" class="form-control form-normal amount" name="" /> <label class="label label-danger hide">额度不能为空</label></dd>'+
						'</dl>'+
						'<dl class="clearfix">'+
							'<dt><strong>*</strong>回报内容:</dt>'+
							'<dd>'+
								'<textarea rows="5" class="form-control content"></textarea> <label class="label label-danger hide">回报内容不能为空</label>'+
							'</dd>'+
						'</dl>'+
						'<dl>'+
							'<dt><strong>*</strong>限定名额:</dt>'+
							'<dd>'+
									'<label>'+
										'<input type="radio" name="limit-num" class="limit-num-no" value="false" checked="checked" /> 否 '+
									'</label>'+
									'<label>'+
										'<input type="radio" name="limit-num" class="limit-num-yes" value="true"/> 是 '+
									'</label>'+
									'<label class="count hide">'+
										'<span class="pull-left">名额数量:</span>'+
										'<input type="text" class="form-control form-xs pull-left people-amount" name="" />'+
									'</label>'+
								'</dd>'+
							'</dl>'+
							'<dl>'+
								'<dt></dt>'+
								'<dd>'+
									'<a href="javascript:;" class="btn btn-primary btn-green save">保存</a>'+
									'<a href="javascript:;" class="btn btn-default cancel">取消</a>'+
								'</dd>'+
							'</dl>'+
						'</div>'+
					'</form>'+
				'</div>',
		// Modify by wecenter
		'activityBox' :
				'<div class="modal fade alert-box aw-topic-edit-note-box aw-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
								'<div class="kn-box vmod aw-publish-contact">'+
									'<label class="label label-danger hide"></label>'+
									'<div class="mod-head">'+
										'<p>'+
											'提示：提交审核后点名时间将在 3 个工作日内完成审核，请留意站内通知以及你的邮箱'+
										'</p>'+
									'</div>'+
									'<div class="mod-body">'+
										'<dl>'+
											'<dt><strong>*</strong>姓名:</dt>'+
											'<dd>'+
												'<input type="text" id="publish-name" class="form-control form-normal" name="contact[name]" value="{{contact_name}}" />'+
											'</dd>'+
										'</dl>'+
										'<dl>'+
											'<dt><strong>*</strong>手机:</dt>'+
											'<dd>'+
												'<input type="text" id="publish-tel" class="form-control form-normal" name="contact[mobile]" value="{{contact_tel}}" />'+
											'</dd>'+
										'</dl>'+
										'<dl>'+
											'<dt><strong>*</strong>QQ:</dt>'+
											'<dd>'+
												'<input type="text" id="publish-qq" class="form-control form-normal" name="contact[qq]" value="{{contact_qq}}" />'+
											'</dd>'+
										'</dl>'+
									'</div>'+
									'<div class="mod-footer">'+
									'<a class="btn btn-normal btn-success" >'+ '提交审核 '+ '</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>',

			'projectEventForm' :
			'<div class="modal fade alert-box aw-topic-edit-note-box aw-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="formBox">'+
								'<div class="title">'+
									'<h3>活动报名 <i class="icon icon-delete pull-right" data-dismiss="modal" aria-hidden="true"></i></h3>'+
								'</div>'+

								'<div class="main ">'+
									'<form class="form-horizontal" action="' + G_BASE_URL + '/project/ajax/add_product_order/" onsubmit="return false" role="form" id="projectEventForm" method="post">'+
									'<input type="hidden" name="project_id" value="{{project_id}}">'+
									 ' <div class="form-group">'+
									    '<label class="col-sm-4 control-label">真实姓名:</label>'+
									   ' <div class="col-sm-7">'+
									     ' <input type="text" class="form-control" name="name" value="{{contact_name}}" placeholder="' + _t('请务必实名') + '" >'+
									   ' </div>'+
									  '</div>'+
									 ' <div class="form-group">'+
									  '  <label  class="col-sm-4 control-label">手机:</label>'+
									    '<div class="col-sm-7">'+
									      '<input type="text" class="form-control" name="mobile" value="{{contact_tel}}" >'+
									   ' </div>'+
									 ' </div>'+
									 ' <div class="form-group">'+
									   ' <label  class="col-sm-4 control-label">邮箱:</label>'+
									   ' <div class="col-sm-7">'+
									      '<input type="text" class="form-control" name="email" value="{{contact_email}}" >'+
									    '</div>'+
									 ' </div>'+
									 ' <div class="form-group">'+
									   ' <label  class="col-sm-4 control-label">地址:</label>'+
									   ' <div class="col-sm-7">'+
									      '<input type="text" class="form-control" name="address" value="{{contact_address}}" placeholder="' + _t('完整收件地址') + '" >'+
									    '</div>'+
									 ' </div>'+
								'</form>'+
								'</div>'+
								'<div class="footer pull-right">'+
									'<a onclick="AWS.ajax_post($(\'#projectEventForm\'));">确定</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

			'projectStockForm' :
			'<div class="modal fade alert-box aw-topic-edit-note-box aw-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="formBox">'+
								'<div class="title">'+
									'<h3>预约投资 <i class="icon icon-delete pull-right" data-dismiss="modal" aria-hidden="true"></i></h3>'+
								'</div>'+

								'<div class="main ">'+
									'<form class="form-horizontal" action="' + G_BASE_URL + '/project/ajax/add_product_order/" onsubmit="return false" role="form" id="projectEventForm" method="post">'+
									'<input type="hidden" name="project_id" value="{{project_id}}">'+
									 ' <div class="form-group">'+
									    '<label  class="col-sm-4 control-label">预计投资:</label>'+
									   ' <div class="col-sm-7">'+
									     ' <input  type="text" class="form-control" name="amount" value="{{contact_money}}">'+
									    '</div>'+
									' </div>'+
									 ' <div class="form-group">'+
									    '<label class="col-sm-4 control-label">真实姓名:</label>'+
									   ' <div class="col-sm-7">'+
									     ' <input type="text" class="form-control" name="name" value="{{contact_name}}">'+
									   ' </div>'+
									  '</div>'+
									 ' <div class="form-group">'+
									  '  <label  class="col-sm-4 control-label">手机:</label>'+
									    '<div class="col-sm-7">'+
									      '<input type="text" class="form-control" name="mobile" value="{{contact_tel}}">'+
									   ' </div>'+
									 ' </div>'+
									 ' <div class="form-group">'+
									   ' <label  class="col-sm-4 control-label">邮箱:</label>'+
									   ' <div class="col-sm-7">'+
									      '<input type="text" class="form-control" name="email" value="{{contact_email}}" >'+
									    '</div>'+
									 ' </div>'+
								'</form>'+
								'</div>'+
								'<div class="footer pull-right">'+
									'<a onclick="ajax_post($(\'#projectEventForm\'));">确定</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	var AWS =
	{
		//全局loading
		loading: function (type)
		{
			if (!$('#aw-loading').length)
			{
				$('#aw-ajax-box').append(AW_TEMPLATE.loadingBox);
			}

			if (type == 'show')
			{
				if ($('#aw-loading').css('display') == 'block')
				{
					return false;
				}

				$('#aw-loading').fadeIn();

				AWS.G.loading_timer = setInterval(function ()
				{
					AWS.G.loading_bg_count -= 1;

					$('#aw-loading-box').css('background-position', '0px ' + AWS.G.loading_bg_count * 40 + 'px');

					if (AWS.G.loading_bg_count == 1)
					{
						AWS.G.loading_bg_count = 12;
					}
				}, 100);
			}
			else
			{
				$('#aw-loading').fadeOut();

				clearInterval(AWS.G.loading_timer);
			}
		},

		loading_mini: function (selector, type)
		{
			if (!selector.find('#aw-loading-mini-box').length)
			{
				selector.append(AW_TEMPLATE.loadingMiniBox);
			}

			if (type == 'show')
			{
				selector.find('#aw-loading-mini-box').fadeIn();

				AWS.G.loading_timer = setInterval(function ()
				{
					AWS.G.loading_mini_bg_count -= 1;

					$('#aw-loading-mini-box').css('background-position', '0px ' + AWS.G.loading_mini_bg_count * 16 + 'px');

					if (AWS.G.loading_mini_bg_count == 1)
					{
						AWS.G.loading_mini_bg_count = 9;
					}
				}, 100);
			}
			else
			{
				selector.find('#aw-loading-mini-box').fadeOut();

				clearInterval(AWS.G.loading_timer);
			}
		},

		ajax_request: function(url, params)
		{
			AWS.loading('show');

			if (params)
			{
				$.post(url, params + '&_post_type=ajax', function (result)
				{
					_callback(result);
				}, 'json').error(function (error)
				{
					_error(error);
				});
			}
			else
			{
				$.get(url, function (result)
				{
					_callback(result);
				}, 'json').error(function (error)
				{
					_error(error);
				});
			}

			function _callback (result)
			{
				AWS.loading('hide');

				if (!result)
				{
					return false;
				}

				if (result.err)
				{
					AWS.alert(result.err);
				}
				else if (result.rsm && result.rsm.url)
				{
					window.location = decodeURIComponent(result.rsm.url);
				}
				else if (result.errno == 1)
				{
					window.location.reload();
				}
			}

			function _error (error)
			{
				AWS.loading('hide');

				if ($.trim(error.responseText) != '')
				{
					alert(_t('发生错误, 返回的信息:') + ' ' + error.responseText);
				}
			}

			return false;
		},

		ajax_post: function(formEl, processer, type) // 表单对象，用 jQuery 获取，回调函数名
		{
			// 若有编辑器的话就更新编辑器内容再提交
			if (typeof CKEDITOR != 'undefined')
			{
				for ( instance in CKEDITOR.instances ) {
					CKEDITOR.instances[instance].updateElement();
				}
			}

			if (typeof (processer) != 'function')
			{
				var processer = AWS.ajax_processer;

				AWS.loading('show');
			}

			if (!type)
			{
				var type = 'default';
			}
			else if (type == 'reply_question')
			{
				AWS.loading('show');

				$('.btn-reply').addClass('disabled');

				// 删除草稿绑定事件
				if (EDITOR != undefined)
				{
					EDITOR.removeListener('blur', EDITOR_CALLBACK);
				}
			}

			var custom_data = {
				_post_type: 'ajax'
			};

			formEl.ajaxSubmit(
			{
				dataType: 'json',
				data: custom_data,
				success: function (result)
				{
					processer(type, result);
				},
				error: function (error)
				{
					console.log(error);
					if ($.trim(error.responseText) != '')
					{
						AWS.loading('hide');

						alert(_t('发生错误, 返回的信息:') + ' ' + error.responseText);
					}
					else if (error.status == 0)
					{
						AWS.loading('hide');

						alert(_t('网络链接异常'));
					}
					else if (error.status == 500)
					{
						AWS.loading('hide');

						alert(_t('内部服务器错误'));
					}
				}
			});
		},

		// ajax提交callback
		ajax_processer: function (type, result)
		{
			AWS.loading('hide');

			if (typeof (result.errno) == 'undefined')
			{
				AWS.alert(result);
			}
			else if (result.errno != 1)
			{
				switch (type)
				{
					case 'default':
					case 'comments_form':
					case 'reply':
					case 'reply_question':
						AWS.alert(result.err);

						$('.aw-comment-box-btn .btn-success, .btn-reply').removeClass('disabled');
					break;

					case 'ajax_post_alert':
					case 'ajax_post_modal':
					case 'error_message':
						if (!$('.error_message').length)
						{
							alert(result.err);
						}
						else if ($('.error_message em').length)
						{
							$('.error_message em').html(result.err);
						}
						else
						{
							 $('.error_message').html(result.err);
						}

						if ($('.error_message').css('display') != 'none')
						{
							AWS.shake($('.error_message'));
						}
						else
						{
							$('.error_message').fadeIn();
						}

						if ($('#captcha').length)
						{
							$('#captcha').click();
						}
					break;
				}
			}
			else
			{
				if (type == 'comments_form')
				{
					AWS.reload_comments_list(result.rsm.item_id, result.rsm.item_id, result.rsm.type_name);
					$('#aw-comment-box-' + result.rsm.type_name + '-' + result.rsm.item_id + ' form textarea').val('');
					$('.aw-comment-box-btn .btn-success').removeClass('disabled');
				}

				if (result.rsm && result.rsm.url)
				{
					// 判断返回url跟当前url是否相同
					if (window.location.href == result.rsm.url)
					{
						window.location.reload();
					}
					else
					{
						window.location = decodeURIComponent(result.rsm.url);
					}
				}
				else
				{
					switch (type)
					{
						case 'default':
						case 'ajax_post_alert':
						case 'error_message':
							window.location.reload();
						break;

						case 'ajax_post_modal':
							$('#aw-ajax-box div.modal').modal('hide');
						break;

						// 问题回复
						case 'reply_question':
							AWS.loading('hide');

							if (result.rsm.ajax_html)
							{
								$('.aw-feed-list').append(result.rsm.ajax_html);

								$('.aw-comment-box-btn .btn-success, .btn-reply').removeClass('disabled');

								$.scrollTo($('#' + $(result.rsm.ajax_html).attr('id')), 600, {queue:true});

								// 问题
								$('.question_answer_form').detach();

								if ($('.aw-replay-box.question').length)
								{
									if (USER_ANSWERED)
									{
										$('.aw-replay-box').append('<p align="center">一个问题只能回复一次, 你可以在发言后 ' + ANSWER_EDIT_TIME + ' 分钟内编辑回复过的内容</p>');
									}
								}
							}
							else if(result.rsm.url)
							{
								window.location = decodeURIComponent(result.rsm.url);
							}
							else
							{
								window.location.reload();
							}
						break;
						// 文章回复
						case 'reply':
							AWS.loading('hide');

							if (result.rsm.ajax_html)
							{
								$('.aw-feed-list').append(result.rsm.ajax_html);

								$('.aw-comment-box-btn .btn-success, .btn-reply').removeClass('disabled');

								$.scrollTo($('#' + $(result.rsm.ajax_html).attr('id')), 600, {queue:true});

								// 文章
								$('#comment_editor').val('');
							}
							else if(result.rsm.url)
							{
								window.location = decodeURIComponent(result.rsm.url);
							}
							else
							{
								window.location.reload();
							}
						break;
					}
				}
			}
		},

		// 加载更多
		load_list_view: function(url, selector, container, start_page, callback)
		{
			if (!selector.attr('id'))
			{
				return false;
			}

			if (!start_page)
			{
				start_page = 0
			}

			// 把页数绑定在元素上面
			if (selector.attr('data-page') == undefined)
			{
				selector.attr('data-page', start_page);
			}
			else
			{
				selector.attr('data-page', parseInt(selector.attr('data-page')) + 1);
			}

			selector.bind('click', function ()
			{
				var _this = this;

				$(this).addClass('loading');

				$.get(url + '__page-' + $(_this).attr('data-page'), function (result)
				{
					$(_this).removeClass('loading');

					if ($.trim(result) != '')
					{
						if ($(_this).attr('data-page') == start_page && $(_this).attr('auto-load') != 'false')
						{
							container.html(result);
						}
						else
						{
							container.append(result);
						}

						// 页数增加1
						$(_this).attr('data-page', parseInt($(_this).attr('data-page')) + 1);
					}
					else
					{
						//没有内容
						if ($(_this).attr('data-page') == start_page && $(_this).attr('auto-load') != 'false')
						{
							container.html('<p style="padding: 15px 0" align="center">' + _t('没有内容') + '</p>');
						}

						$(_this).addClass('disabled').unbind('click').bind('click', function () { return false; });

						$(_this).find('span').html(_t('没有更多了'));
					}

					if (callback != null)
					{
						callback();
					}
				});

				return false;
			});

			// 自动加载
			if (selector.attr('auto-load') != 'false')
			{
				selector.click();
			}
		},

		// 重新加载评论列表
		reload_comments_list: function(item_id, element_id, type_name)
		{
			$('#aw-comment-box-' + type_name + '-' + element_id + ' .aw-comment-list').html('<p align="center" class="aw-padding10"><i class="aw-loading"></i></p>');

			$.get(G_BASE_URL + '/question/ajax/get_' + type_name + '_comments/' + type_name + '_id-' + item_id, function (data)
			{
				$('#aw-comment-box-' + type_name + '-' + element_id + ' .aw-comment-list').html(data);
			});
		},

		// 警告弹窗
		alert: function (text)
		{
			if ($('.alert-box').length)
			{
				$('.alert-box').remove();
			}

			$('#aw-ajax-box').append(Hogan.compile(AW_TEMPLATE.alertBox).render(
			{
				message: text
			}));

			$(".alert-box").modal('show');
		},

		/**
		 *	公共弹窗
		 *	publish     : 发起
		 *	redirect    : 问题重定向
		 *	imageBox    : 插入图片
		 *	videoBox    : 插入视频
		 *  linkbox     : 插入链接
		 *	commentEdit : 评论编辑
		 *  favorite    : 评论添加收藏
		 *	inbox       : 私信
		 *  report      : 举报问题
		 */
		dialog: function (type, data, callback)
		{
			switch (type)
			{
				case 'alertImg':
					var template = Hogan.compile(AW_TEMPLATE.alertImg).render(
					{
						'hide': data.hide,
						'url': data.url,
						'message': data.message
					});
				break;

				case 'publish':
					var template = Hogan.compile(AW_TEMPLATE.publishBox).render(
					{
						'category_id': data.category_id,
						'ask_user_id': data.ask_user_id
					});
				break;

				case 'redirect':
					var template = Hogan.compile(AW_TEMPLATE.questionRedirect).render(
					{
						'data_id': data
					});
				break;

				case 'commentEdit':
					var template = Hogan.compile(AW_TEMPLATE.editCommentBox).render(
					{
						'answer_id': data.answer_id,
						'attach_access_key': data.attach_access_key
					});
				break;

				case 'favorite':
					var template = Hogan.compile(AW_TEMPLATE.favoriteBox).render(
					{
						 'item_id': data.item_id,
						 'item_type': data.item_type
					});
				break;

				case 'inbox':
					var template = Hogan.compile(AW_TEMPLATE.inbox).render(
					{
						'recipient': data
					});
				break;

				case 'report':
					var template = Hogan.compile(AW_TEMPLATE.reportBox).render(
					{
						'item_type': data.item_type,
						'item_id': data.item_id
					});
				break;

				case 'topicEditHistory':
					var template = AW_TEMPLATE.ajaxData.replace('{{title}}', _t('编辑记录')).replace('{{data}}', data);
				break;

				case 'ajaxData':
					var template = AW_TEMPLATE.ajaxData.replace('{{title}}', data.title).replace('{{data}}', '<div id="aw_dialog_ajax_data"></div>');
				break;

				case 'imagePreview':
					var template = AW_TEMPLATE.ajaxData.replace('{{title}}', data.title).replace('{{data}}', '<p align="center"><img src="' + data.image + '" alt="" style="max-width:520px" /></p>');
				break;

				case 'confirm':
					var template = Hogan.compile(AW_TEMPLATE.confirmBox).render(
					{
						'message': data.message
					});
				break;

				case 'recommend':
					var template = Hogan.compile(AW_TEMPLATE.recommend).render();
				break;

				// modify by wecenter 活动模块
				case 'projectEventForm':
					var template = Hogan.compile(AW_TEMPLATE.projectEventForm).render(
					{
						'project_id': data.project_id,
						'contact_name': data.contact_name,
						'contact_tel': data.contact_tel,
						'contact_email': data.contact_email
					});
				break;

				case 'projectStockForm':
					var template = Hogan.compile(AW_TEMPLATE.projectStockForm).render(
					{
						'project_id': data.project_id,
						'contact_name': data.contact_name,
						'contact_tel': data.contact_tel,
						'contact_email': data.contact_email
					});
				break;

				case 'activityBox':
					var template = Hogan.compile(AW_TEMPLATE.activityBox).render(
					{
						'contact_name': data.contact_name,
						'contact_tel': data.contact_tel,
						'contact_qq': data.contact_qq
					});

				break;
			}

			if (template)
			{
				if ($('.alert-box').length)
				{
					$('.alert-box').remove();
				}

				$('#aw-ajax-box').html(template).show();

				switch (type)
				{
					case 'redirect' :
						AWS.Dropdown.bind_dropdown_list($('.aw-question-redirect-box #question-input'), 'redirect');
					break;

					case 'inbox' :
						AWS.Dropdown.bind_dropdown_list($('.aw-inbox #invite-input'), 'inbox');
						//私信用户下拉点击事件
						$(document).on('click','.aw-inbox .aw-dropdown-list li a',function() {
							$('.alert-box #quick_publish input.form-control').val($(this).text());
							$(this).parents('.aw-dropdown').hide();
						});
					break;

					case 'publish':
						AWS.Dropdown.bind_dropdown_list($('.aw-publish-box #quick_publish_question_content'), 'publish');
						AWS.Dropdown.bind_dropdown_list($('.aw-publish-box #aw_edit_topic_title'), 'topic');
						if (parseInt(data.category_enable) == 1)
						{
							$.get(G_BASE_URL + '/publish/ajax/fetch_question_category/', function (result)
							{
								AWS.Dropdown.set_dropdown_list('.aw-publish-box .dropdown', eval(result), data.category_id);

								$('.aw-publish-title .dropdown li a').click(function ()
								{
									$('.aw-publish-box #quick_publish_category_id').val($(this).attr('data-value'));
									$('.aw-publish-box #aw-topic-tags-select').html($(this).text());
								});
							});
						}
						else
						{
							$('.aw-publish-box .aw-publish-title').hide();
						}

						if (data.ask_user_id != '' && data.ask_user_id != undefined)
						{
							$('.aw-publish-box .modal-title').html('向 ' + data.ask_user_name + ' 提问');
						}

						if ($('#aw-search-query').val() && $('#aw-search-query').val() != $('#aw-search-query').attr('placeholder'))
						{
							$('#quick_publish_question_content').val($('#aw-search-query').val());
						}

						AWS.Init.init_topic_edit_box('#quick_publish .aw-edit-topic');

						$('#quick_publish .aw-edit-topic').click();

						$('#quick_publish .close-edit').hide();

						if (data.topic_title)
						{
							$('#quick_publish .aw-edit-topic').parents('.aw-topic-bar').prepend('<span class="topic-tag"><a class="text">' + data.topic_title + '</a><a class="close" onclick="$(this).parents(\'.topic-tag\').detach();"><i class="icon icon-delete"></i></a><input type="hidden" value="' + data.topic_title + '" name="topics[]" /></span>')
						}

						if (typeof(G_QUICK_PUBLISH_HUMAN_VALID) != 'undefined')
						{
							$('#quick_publish_captcha').show();
							$('#captcha').click();
						}
					break;

					case 'favorite':
						$.get(G_BASE_URL + '/favorite/ajax/get_favorite_tags/', function (result)
						{
							var html = ''

							$.each(result, function (i, e)
							{
								html += '<li><a data-value="' + e['title'] + '"><span class="title">' + e['title'] + '</span></a><i class="icon icon-followed"></i></li>';
							});

							$('.aw-favorite-tag-list ul').append(html);

							$.post(G_BASE_URL + '/favorite/ajax/get_item_tags/', {
								'item_id' : $('#favorite_form input[name="item_id"]').val(),
								'item_type' : $('#favorite_form input[name="item_type"]').val()
							}, function (result)
							{
								if (result != null)
								{
									$.each(result, function (i, e)
									{
										var index = i;

										$.each($('.aw-favorite-tag-list ul li .title'), function (i, e)
										{
											if ($(this).text() == result[index])
											{
												$(this).parents('li').addClass('active');
											}
										});
									});
								}
							}, 'json');

							$(document).on('click', '.aw-favorite-tag-list ul li a', function()
							{
								var _this = this,
									addClassFlag = true, url = G_BASE_URL + '/favorite/ajax/update_favorite_tag/';

								if ($(this).parents('li').hasClass('active'))
								{
									url = G_BASE_URL + '/favorite/ajax/remove_favorite_tag/';

									addClassFlag = false;
								}

								$.post(url,
								{
									'item_id' : $('#favorite_form input[name="item_id"]').val(),
									'item_type' : $('#favorite_form input[name="item_type"]').val(),
									'tags' : $(_this).attr('data-value')
								}, function (result)
								{
									if (result.errno == 1)
									{
										if (addClassFlag)
										{
											$(_this).parents('li').addClass('active');
										}
										else
										{
											$(_this).parents('li').removeClass('active');
										}
									}
								}, 'json');
							});

						}, 'json');
					break;

					case 'report':
						$('.aw-report-box select option').click(function ()
						{
							$('.aw-report-box textarea').text($(this).attr('value'));
						});
					break;

					case 'commentEdit':
						$.get(G_BASE_URL + '/question/ajax/fetch_answer_data/' + data.answer_id, function (result)
						{
							$('#editor_reply').html(result.answer_content.replace('&amp;', '&'));

							var editor = CKEDITOR.replace( 'editor_reply' );

							if (UPLOAD_ENABLE == 'Y')
							{
								var fileupload = new FileUpload('file', '.aw-edit-comment-box .aw-upload-box .btn', '.aw-edit-comment-box .aw-upload-box .upload-container', G_BASE_URL + '/publish/ajax/attach_upload/id-answer__attach_access_key-' + ATTACH_ACCESS_KEY, {'insertTextarea': '.aw-edit-comment-box #editor_reply', 'editor' : editor});

								$.post(G_BASE_URL + '/publish/ajax/answer_attach_edit_list/', 'answer_id=' + data.answer_id, function (data) {
									if (data['err']) {
										return false;
									} else {
										$.each(data['rsm']['attachs'], function (i, v) {
											fileupload.setFileList(v);
										});
									}
								}, 'json');
							}
							else
							{
								$('.aw-edit-comment-box .aw-file-upload-box').hide();
							}
						}, 'json');
					break;

					case 'ajaxData':
						$.get(data.url, function (result) {
							$('#aw_dialog_ajax_data').html(result);
						});
					break;

					case 'confirm':
						$('.aw-confirm-box .yes').click(function()
						{
							if (callback)
							{
								callback();
							}

							$(".alert-box").modal('hide');

							return false;
						});
					break;

					case 'recommend':
						$.get(G_BASE_URL + '/help/ajax/list/', function (result)
						{
							if (result && result != 0)
							{
								var html = '';

								$.each(result, function (i, e)
								{
									html += '<li class="aw-border-radius-5"><img class="aw-border-radius-5" src="' + e.icon + '"><a data-id="' + e.id + '" class="aw-hide-txt">' + e.title + '</a><i class="icon icon-followed"></i></li>'
								});

								$('.aw-recommend-box ul').append(html);

								$.each($('.aw-recommend-box ul li'), function (i, e)
								{
									if (data.focus_id == $(this).find('a').attr('data-id'))
									{
										$(this).addClass('active');
									}
								});

								$(document).on('click', '.aw-recommend-box ul li a', function()
								{
									var _this = $(this), url = G_BASE_URL + '/help/ajax/add_data/', removeClass = false;

									if ($(this).parents('li').hasClass('active'))
									{
										url =  G_BASE_URL + '/help/ajax/remove_data/';

										removeClass = true;
									}

									$.post(url,
									{
										'item_id' : data.item_id,
										'id' : _this.attr('data-id'),
										'title' : _this.text(),
										'type' : data.type
									}, function (result)
									{
										if (result.errno == 1)
										{
											if (removeClass)
											{
												_this.parents('li').removeClass('active');
											}
											else
											{
												$('.aw-recommend-box ul li').removeClass('active');

												_this.parents('li').addClass('active');
											}
										}
									}, 'json');
								});
							}
							else
							{
								$('.error_message').html(_t('请先去后台创建好章节'));

								if ($('.error_message').css('display') != 'none')
								{
									AWS.shake($('.error_message'));
								}
								else
								{
									$('.error_message').fadeIn();
								}
							}
						}, 'json');
					break;
				}

				$(".alert-box").modal('show');
			}
		},

		// 兼容placeholder
		check_placeholder: function(selector)
		{
			$.each(selector, function()
			{
				if (typeof ($(this).attr("placeholder")) != "undefined")
				{
					$(this).attr('data-placeholder', 'true');

					if ($(this).val() == '')
					{
						$(this).addClass('aw-placeholder').val($(this).attr("placeholder"));
					}

					$(this).focus(function () {
						if ($(this).val() == $(this).attr('placeholder'))
						{
							$(this).removeClass('aw-placeholder').val('');
						}
					});

					$(this).blur(function () {
						if ($(this).val() == '')
						{
							$(this).addClass('aw-placeholder').val($(this).attr('placeholder'));
						}
					});
				}
			});
		},

		// 回复背景高亮
		hightlight: function(selector, class_name)
		{
			if (selector.hasClass(class_name))
			{
				return true;
			}

			var hightlight_timer_front = setInterval(function ()
			{
				selector.addClass(class_name);
			}, 500);

			var hightlight_timer_background = setInterval(function ()
			{
				selector.removeClass(class_name);
			}, 600);

			setTimeout(function ()
			{
				clearInterval(hightlight_timer_front);
				clearInterval(hightlight_timer_background);

				selector.addClass(class_name);
			}, 1200);

			setTimeout(function ()
			{
				selector.removeClass(class_name);
			}, 6000);
		},

		nl2br: function(str)
		{
			return str.replace(new RegExp("\r\n|\n\r|\r|\n", "g"), "<br />");
		},

		content_switcher: function(hide_el, show_el)
		{
			hide_el.hide();
			show_el.fadeIn();
		},

		htmlspecialchars: function(text)
		{
			return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
		},

		/*
		 * 用户头像提示box效果
		 *  @params
		 *  type : user/topic
		 *	nTop    : 焦点到浏览器上边距
		 *	nRight  : 焦点到浏览器右边距
		 *	nBottom : 焦点到浏览器下边距
		 *	left    : 焦点距离文档左偏移量
		 *	top     : 焦点距离文档上偏移量
		 **
		 */
		show_card_box: function(selector, type, time) //selector -> .aw-user-name/.topic-tag
		{
			if (!time)
			{
				var time = 300;
			}

			$(document).on('mouseover', selector, function ()
			{
				clearTimeout(AWS.G.card_box_hide_timer);
				var _this = $(this);
				AWS.G.card_box_show_timer = setTimeout(function ()
				{
					//判断用户id or 话题id 是否存在
					if (_this.attr('data-id'))
					{
						 switch (type)
						{
							case 'user' :
								//检查是否有缓存
								if (AWS.G.cashUserData.length == 0)
								{
									_getdata('user', '/people/ajax/user_info/uid-');
								}
								else
								{
									var flag = 0;
									//遍历缓存中是否含有此id的数据
									_checkcash('user');
									if (flag == 0)
									{
										_getdata('user', '/people/ajax/user_info/uid-');
									}
								}
							break;

							case 'topic' :
								//检查是否有缓存
								if (AWS.G.cashTopicData.length == 0)
								{
									_getdata('topic', '/topic/ajax/topic_info/topic_id-');
								}
								else
								{
									var flag = 0;
									//遍历缓存中是否含有此id的数据
									_checkcash('topic');
									if (flag == 0)
									{
										_getdata('topic', '/topic/ajax/topic_info/topic_id-');
									}
								}
							break;
						}
					}

					//获取数据
					function _getdata(type, url)
					{
						if (type == 'user')
						{
							$.get(G_BASE_URL + url + _this.attr('data-id'), function(result)
							{
								var focus = result.focus, verified = result.verified, focusTxt;

								if (focus == 1)
								{
									focus = 'active';
									focusTxt = '取消关注';
								}
								else
								{
									focus = '';
									focusTxt = '关注';
								}

								if(result.verified == 'enterprise')
								{
									verified_enterprise = 'icon-v i-ve';
									verified_title = '企业认证';
								}
								else if(result.verified == 'personal')
								{
									verified_enterprise = 'icon-v';
									verified_title = '个人认证';
								}
								else
								{
									verified_enterprise = verified_title = '';
								}

								//动态插入盒子
								$('#aw-ajax-box').html(Hogan.compile(AW_TEMPLATE.userCard).render(
								{
									'verified_enterprise' : verified_enterprise,
									'verified_title' : verified_title,
									'uid': result.uid,
									'avatar_file': result.avatar_file,
									'user_name': result.user_name,
									'reputation': result.reputation,
									'agree_count': result.agree_count,
									'signature': result.signature,
									'url' : result.url,
									'category_enable' : result.category_enable,
									'focus': focus,
									'focusTxt': focusTxt,
									'ask_name': "'" + result.user_name + "'",
									'fansCount': result.fans_count
								}));

								//判断是否为游客or自己
								if (G_USER_ID == '' || G_USER_ID == result.uid || result.uid < 0)
								{
									$('#aw-card-tips .mod-footer').hide();
								}
								_init();
								//缓存
								AWS.G.cashUserData.push($('#aw-ajax-box').html());
							}, 'json');
						}
						if (type == 'topic')
						{
							$.get(G_BASE_URL + url + _this.attr('data-id'), function(result)
							{
								var focus = result.focus,
									focusTxt;
									if (focus == false)
									{
										focus = '';
										focusTxt = _t('关注');
									}
									else
									{
										focus = 'active';
										focusTxt = _t('取消关注');
									}
									//动态插入盒子
									$('#aw-ajax-box').html(Hogan.compile(AW_TEMPLATE.topicCard).render(
									{
										'topic_id': result.topic_id,
										'topic_pic': result.topic_pic,
										'topic_title': result.topic_title,
										'topic_description': result.topic_description,
										'discuss_count': result.discuss_count,
										'focus_count': result.focus_count,
										'focus': focus,
										'focusTxt': focusTxt,
										'url' : result.url,
										'fansCount': result.fans_count
									}));
									//判断是否为游客
									if (G_USER_ID == '')
									{
										$('#aw-card-tips .mod-footer .follow').hide();
									}
									_init();
									//缓存
									AWS.G.cashTopicData.push($('#aw-ajax-box').html());
							}, 'json');
						}
					}

					//检测缓存
					function _checkcash(type)
					{
						if (type == 'user')
						{
							$.each(AWS.G.cashUserData, function (i, a)
							{
								if (a.match('data-id="' + _this.attr('data-id') + '"'))
								{
									$('#aw-ajax-box').html(a);
									$('#aw-card-tips').removeAttr('style');
									_init();
									flag = 1;
								}
							});
						}
						if (type == 'topic')
						{

							$.each(AWS.G.cashTopicData, function (i, a)
							{
								if (a.match('data-id="' + _this.attr('data-id') + '"'))
								{
									$('#aw-ajax-box').html(a);
									$('#aw-card-tips').removeAttr('style');
									_init();
									flag = 1;
								}
							});
						}
					}

					//初始化
					function _init()
					{
						var left = _this.offset().left,
							top = _this.offset().top + _this.height() + 5,
							nTop = _this.offset().top - $(window).scrollTop();

						//判断下边距离不足情况
						if (nTop + $('#aw-card-tips').innerHeight() > $(window).height())
						{
							top = _this.offset().top - ($('#aw-card-tips').innerHeight()) - 10;
						}

						//判断右边距离不足情况
						if (left + $('#aw-card-tips').innerWidth() > $(window).width())
						{
							left = _this.offset().left - $('#aw-card-tips').innerWidth() + _this.innerWidth();
						}

						$('#aw-card-tips').css(
						{
							left: left,
							top: top
						}).fadeIn();
					}
				}, time);
			});

			$(document).on('mouseout', selector, function ()
			{
				clearTimeout(AWS.G.card_box_show_timer);
				AWS.G.card_box_hide_timer = setTimeout(function ()
				{
					$('#aw-card-tips').fadeOut();
				}, 600);
			});
		},

		// @人功能
		at_user_lists: function(selector, limit) {
			$(selector).keyup(function (e) {
				var _this = $(this),
					flag = _getCursorPosition($(this)[0]).start;
				if ($(this).val().charAt(flag - 1) == '@')
				{
					_init();
					$('#aw-ajax-box .content_cursor').html($(this).val().substring(0, flag));
				} else
				{
					var lis = $('.aw-invite-dropdown li');
					switch (e.which)
					{
						case 38:
							var _index;
							if (!lis.hasClass('active'))
							{
								lis.eq(lis.length - 1).addClass('active');
							}
							else
							{
								$.each(lis, function (i, e)
								{
									if ($(this).hasClass('active'))
									{
										$(this).removeClass('active');
										if ($(this).index() == 0)
										{
											_index = lis.length - 1;
										}
										else
										{
											_index = $(this).index() - 1;
										}
									}
								});
								lis.eq(_index).addClass('active');
							}
							break;
						case 40:
							var _index;
							if (!lis.hasClass('active'))
							{
								lis.eq(0).addClass('active');
							}
							else
							{
								$.each(lis, function (i, e)
								{
									if ($(this).hasClass('active'))
									{
										$(this).removeClass('active');
										if ($(this).index() == lis.length - 1)
										{
											_index = 0;
										}
										else
										{
											_index = $(this).index() + 1;
										}
									}
								});
								lis.eq(_index).addClass('active');
							}
							break;
						case 13:
							$.each($('.aw-invite-dropdown li'), function (i, e)
							{
								if ($(this).hasClass('active'))
								{
									$(this).click();
								}
							});
							break;
						default:
							if ($('.aw-invite-dropdown')[0])
							{
								var ti = 0;
								for (var i = flag; i > 0; i--)
								{
									if ($(this).val().charAt(i) == "@")
									{
										ti = i;
										break;
									}
								}
								$.get(G_BASE_URL + '/search/ajax/search/?type=users&q=' + encodeURIComponent($(this).val().substring(flag, ti).replace('@', '')) + '&limit=' + limit, function (result)
								{
									if ($('.aw-invite-dropdown')[0])
									{
										if (result.length != 0)
										{
											var html = '';

											$('.aw-invite-dropdown').html('');

											$.each(result, function (i, a)
											{
												html += '<li><img src="' + a.detail.avatar_file + '"/><a>' + a.name + '</a></li>'
											});

											$('.aw-invite-dropdown').append(html);

											_display();

											$('.aw-invite-dropdown li').click(function ()
											{
												_this.val(_this.val().substring(0, ti) + '@' + $(this).find('a').html() + " ").focus();
												$('.aw-invite-dropdown').detach();
											});
										}
										else
										{
											$('.aw-invite-dropdown').hide();
										}
									}
									if (_this.val().length == 0)
									{
										$('.aw-invite-dropdown').hide();
									}
								}, 'json');
							}
					}
				}
			});

			$(selector).keydown(function (e) {
				var key = e.which;
				if ($('.aw-invite-dropdown').is(':visible')) {
					if (key == 38 || key == 40 || key == 13) {
						return false;
					}
				}
			});

			//初始化插入定位符
			function _init() {
				if (!$('.content_cursor')[0]) {
					$('#aw-ajax-box').append('<span class="content_cursor"></span>');
				}
				$('#aw-ajax-box').find('.content_cursor').css({
					'left': parseInt($(selector).offset().left + parseInt($(selector).css('padding-left')) + 2),
					'top': parseInt($(selector).offset().top + parseInt($(selector).css('padding-left')))
				});
				if (!$('.aw-invite-dropdown')[0])
				{
					$('#aw-ajax-box').append('<ul class="aw-invite-dropdown"></ul>');
				}
			};

			//初始化列表和三角型
			function _display() {
				$('.aw-invite-dropdown').css({
					'left': $('.content_cursor').offset().left + $('.content_cursor').innerWidth(),
					'top': $('.content_cursor').offset().top + 24
				}).show();
			};

			//获取当前textarea光标位置
			function _getCursorPosition(textarea)
			{
				var rangeData = {
					text: "",
					start: 0,
					end: 0
				};

				textarea.focus();

				if (textarea.setSelectionRange) { // W3C
					rangeData.start = textarea.selectionStart;
					rangeData.end = textarea.selectionEnd;
					rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
				} else if (document.selection) { // IE
					var i,
						oS = document.selection.createRange(),
						// Don't: oR = textarea.createTextRange()
						oR = document.body.createTextRange();
					oR.moveToElementText(textarea);

					rangeData.text = oS.text;
					rangeData.bookmark = oS.getBookmark();

					// object.moveStart(sUnit [, iCount])
					// Return Value: Integer that returns the number of units moved.
					for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
						// Why? You can alert(textarea.value.length)
						if (textarea.value.charAt(i) == '\n') {
							i++;
						}
					}
					rangeData.start = i;
					rangeData.end = rangeData.text.length + rangeData.start;
				}

				return rangeData;
			};
		},

		// 错误提示效果
		shake: function(selector)
		{
			var length = 6;
			selector.css('position', 'relative');
			for (var i = 1; i <= length; i++)
			{
				if (i % 2 == 0)
				{
					if (i == length)
					{
						selector.animate({ 'left': 0 }, 50);
					}
					else
					{
						selector.animate({ 'left': 10 }, 50);
					}
				}
				else
				{
					selector.animate({ 'left': -10 }, 50);
				}
			}
		}
	}

	// 全局变量
	AWS.G =
	{
		cashUserData: [],
		cashTopicData: [],
		card_box_hide_timer: '',
		card_box_show_timer: '',
		dropdown_list_xhr: '',
		loading_timer: '',
		loading_bg_count: 12,
		loading_mini_bg_count: 9,
		notification_timer: ''
	}

	AWS.User =
	{
		// 关注
		follow: function(selector, type, data_id)
		{
			if (selector.html())
			{
				if (selector.hasClass('active'))
				{
					selector.find('span').html(_t('关注'));

					selector.find('b').html(parseInt(selector.find('b').html()) - 1);
				}
				else
				{
					selector.find('span').html(_t('取消关注'));

					selector.find('b').html(parseInt(selector.find('b').html()) + 1);
				}
			}
			else
			{
				if (selector.hasClass('active'))
				{
					selector.attr('data-original-title', _t('关注'));
				}
				else
				{
					selector.attr('data-original-title', _t('取消关注'));
				}
			}

			selector.addClass('disabled');

			switch (type)
			{
				case 'question':
					var url = '/question/ajax/focus/';

					var data = {
						'question_id': data_id
					};

					break;

				case 'topic':
					var url = '/topic/ajax/focus_topic/';

					var data = {
						'topic_id': data_id
					};

					break;

				case 'user':
					var url = '/follow/ajax/follow_people/';

					var data = {
						'uid': data_id
					};

					break;
			}

			$.post(G_BASE_URL + url, data, function (result)
			{
				if (result.errno == 1)
				{
					if (result.rsm.type == 'add')
					{
						selector.addClass('active');
					}
					else
					{
						selector.removeClass('active');
					}
				}
				else
				{
					if (result.err)
					{
						AWS.alert(result.err);
					}

					if (result.rsm.url)
					{
						window.location = decodeURIComponent(result.rsm.url);
					}
				}

				selector.removeClass('disabled');

			}, 'json');
		},

		share_out: function(options)
		{
			var url = options.url || window.location.href, pic = '';

			if (options.title)
			{
				var title = options.title + ' - ' + G_SITE_NAME;
			}
			else
			{
				var title = $('title').text();
			}

			shareURL = 'http://www.jiathis.com/send/?webid=' + options.webid + '&url=' + url + '&title=' + title +'';

			if (options.content)
			{
				if ($(options.content).find('img').length)
				{
					shareURL = shareURL + '&pic=' + $(options.content).find('img').eq(0).attr('src');
				}
			}

			window.open(shareURL);
		},

		// 删除草稿
		delete_draft: function(item_id, type)
		{
			if (type == 'clean')
			{
				$.post(G_BASE_URL + '/account/ajax/delete_draft/', 'type=' + type, function (result)
				{
					if (result.errno != 1)
					{
						AWS.alert(result.err);
					}
				}, 'json');
			}
			else
			{
				$.post(G_BASE_URL + '/account/ajax/delete_draft/', 'item_id=' + item_id + '&type=' + type, function (result)
				{
					if (result.errno != 1)
					{
						AWS.alert(result.err);
					}
				}, 'json');
			}
		},

		// 赞成投票
		agree_vote: function(selector, user_name, answer_id)
		{
			$.post(G_BASE_URL + '/question/ajax/answer_vote/', 'answer_id=' + answer_id + '&value=1');

			// 判断是否投票过
			if ($(selector).parents('.aw-item').find('.aw-agree-by').text().match(user_name))
			{
				$.each($(selector).parents('.aw-item').find('.aw-user-name'), function (i, e)
				{
					if ($(e).html() == user_name)
					{
						if ($(e).prev())
						{
							$(e).prev().remove();
						}
						else
						{
							$(e).next().remove();
						}

						$(e).remove();
					}
				});

				$(selector).removeClass('active');

				if (parseInt($(selector).parents('.operate').find('.count').html()) != 0)
				{
					$(selector).parents('.operate').find('.count').html(parseInt($(selector).parents('.operate').find('.count').html()) - 1);
				}

				if ($(selector).parents('.aw-item').find('.aw-agree-by a').length == 0)
				{
					$(selector).parents('.aw-item').find('.aw-agree-by').hide();
				}
			}
			else
			{
				// 判断是否第一个投票
				if ($(selector).parents('.aw-item').find('.aw-agree-by .aw-user-name').length == 0)
				{
					$(selector).parents('.aw-item').find('.aw-agree-by').append('<a class="aw-user-name">' + user_name + '</a>');
				}
				else
				{
					$(selector).parents('.aw-item').find('.aw-agree-by').append('<em>、</em><a class="aw-user-name">' + user_name + '</a>');
				}

				$(selector).parents('.operate').find('.count').html(parseInt($(selector).parents('.operate').find('.count').html()) + 1);

				$(selector).parents('.aw-item').find('.aw-agree-by').show();

				$(selector).parents('.operate').find('a.active').removeClass('active');

				$(selector).addClass('active');
			}
		},

		// 反对投票
		disagree_vote: function(selector, user_name, answer_id)
		{
			$.post(G_BASE_URL + '/question/ajax/answer_vote/', 'answer_id=' + answer_id + '&value=-1', function (result) {});

			if ($(selector).hasClass('active'))
			{
				$(selector).removeClass('active');
			}
			else
			{
				// 判断是否有赞同过
				if ($(selector).parents('.operate').find('.agree').hasClass('active'))
				{
					// 删除赞同操作
					$.each($(selector).parents('.aw-item').find('.aw-user-name'), function (i, e)
					{
						if ($(e).html() == user_name)
						{
							if ($(e).prev())
							{
								$(e).prev().remove();
							}
							else
							{
								$(e).next().remove();
							}

							$(e).remove();
						}
					});

					// 判断赞同来自内是否有人
					if ($(selector).parents('.aw-item').find('.aw-agree-by a').length == 0)
					{
						$(selector).parents('.aw-item').find('.aw-agree-by').hide();
					}

					$(selector).parents('.operate').find('.count').html(parseInt($(selector).parents('.operate').find('.count').html()) - 1);

					$(selector).parents('.operate').find('.agree').removeClass('active');

					$(selector).addClass('active');
				}
				else
				{
					$(selector).addClass('active');
				}
			}
		},

		// 问题不感兴趣
		question_uninterested: function(selector, question_id)
		{
			selector.fadeOut();

			$.post(G_BASE_URL + '/question/ajax/uninterested/', 'question_id=' + question_id, function (result)
			{
				if (result.errno != '1')
				{
					AWS.alert(result.err);
				}
			}, 'json');
		},

		// 回复折叠
		answer_force_fold: function(selector, answer_id)
		{
			$.post(G_BASE_URL + '/question/ajax/answer_force_fold/', 'answer_id=' + answer_id, function (result) {
				if (result.errno != 1)
				{
					AWS.alert(result.err);
				}
				else if (result.errno == 1)
				{
					if (result.rsm.action == 'fold')
					{
						selector.html(selector.html().replace(_t('折叠'), _t('撤消折叠')));
					}
					else
					{
						selector.html(selector.html().replace(_t('撤消折叠'), _t('折叠')));
					}
				}
			}, 'json');
		},

		// 删除别人邀请我回复的问题
		question_invite_delete: function(selector, question_invite_id)
		{
			$.post(G_BASE_URL + '/question/ajax/question_invite_delete/', 'question_invite_id=' + question_invite_id, function (result)
			{
				if (result.errno == 1)
				{
					selector.fadeOut();
				}
				else
				{
					AWS.alert(result.rsm.err);
				}
			}, 'json');
		},

		// 邀请用户回答问题
		invite_user: function(selector, img)
		{
			$.post(G_BASE_URL + '/question/ajax/save_invite/',
			{
				'question_id': QUESTION_ID,
				'uid': selector.attr('data-id')
			}, function (result)
			{
				if (result.errno != -1)
				{
					if (selector.parents('.aw-invite-box').find('.invite-list a').length == 0)
					{
						selector.parents('.aw-invite-box').find('.invite-list').show();
					}
					selector.parents('.aw-invite-box').find('.invite-list').append(' <a class="text-color-999 invite-list-user" data-toggle="tooltip" data-placement="bottom" data-original-title="'+ selector.attr('data-value') +'"><img src='+ img +' /></a>');
					selector.addClass('active').attr('onclick','AWS.User.disinvite_user($(this))').text('取消邀请');
					selector.parents('.aw-question-detail').find('.aw-invite-replay .badge').text(parseInt(selector.parents('.aw-question-detail').find('.aw-invite-replay .badge').text()) + 1);
				}
				else if (result.errno == -1)
				{
					AWS.alert(result.err);
				}
			}, 'json');
		},

		// 取消邀请用户回答问题
		disinvite_user: function(selector)
		{
			$.get(G_BASE_URL + '/question/ajax/cancel_question_invite/question_id-' + QUESTION_ID + "__recipients_uid-" + selector.attr('data-id'), function (result)
			{
				if (result.errno != -1)
				{
					$.each($('.aw-question-detail .invite-list a'), function (i, e)
					{
						if ($(this).attr('data-original-title') == selector.parents('.main').find('.aw-user-name').text())
						{
							$(this).detach();
						}
					});
					selector.removeClass('active').attr('onclick','AWS.User.invite_user($(this),$(this).parents(\'li\').find(\'img\').attr(\'src\'))').text('邀请');
					selector.parents('.aw-question-detail').find('.aw-invite-replay .badge').text(parseInt(selector.parents('.aw-question-detail').find('.aw-invite-replay .badge').text()) - 1);
					if (selector.parents('.aw-invite-box').find('.invite-list').children().length == 0)
					{
						selector.parents('.aw-invite-box').find('.invite-list').hide();
					}
				}
			});
		},

		// 问题感谢
		question_thanks: function(selector, question_id)
		{
			$.post(G_BASE_URL + '/question/ajax/question_thanks/', 'question_id=' + question_id, function (result)
			{
				if (result.errno != 1)
				{
					AWS.alert(result.err);
				}
				else if (result.rsm.action == 'add')
				{
					selector.html(selector.html().replace(_t('感谢'), _t('已感谢')));
					selector.removeAttr('onclick');
				}
				else
				{
					selector.html(selector.html().replace(_t('已感谢'), _t('感谢')));
				}
			}, 'json');
		},

		// 感谢评论回复者
		answer_user_rate: function(selector, type, answer_id)
		{
			$.post(G_BASE_URL + '/question/ajax/question_answer_rate/', 'type=' + type + '&answer_id=' + answer_id, function (result)
			{
				if (result.errno != 1)
				{
					AWS.alert(result.err);
				}
				else if (result.errno == 1)
				{
					switch (type)
					{
					case 'thanks':
						if (result.rsm.action == 'add')
						{
							selector.html(selector.html().replace(_t('感谢'), _t('已感谢')));
							selector.removeAttr('onclick');
						}
						else
						{
							selector.html(selector.html().replace(_t('已感谢'), _t('感谢')));
						}
						break;

					case 'uninterested':
						if (result.rsm.action == 'add')
						{
							selector.html(selector.html().replace(_t('没有帮助'), _t('撤消没有帮助')));
						}
						else
						{
							selector.html(selector.html().replace(_t('撤消没有帮助'), _t('没有帮助')));
						}
						break;
					}
				}
			}, 'json');
		},

		// 提交评论
		save_comment: function(selector)
		{
			selector.addClass('disabled');

			AWS.ajax_post(selector.parents('form'), AWS.ajax_processer, 'comments_form');
		},

		// 删除评论
		remove_comment: function(selector, type, comment_id)
		{
			$.get(G_BASE_URL + '/question/ajax/remove_comment/type-' + type + '__comment_id-' + comment_id);

			selector.parents('.aw-comment-box li').fadeOut();
		},

		// 文章赞同
		article_vote: function(selector, article_id, rating)
		{
			AWS.loading('show');

			if (selector.hasClass('active'))
			{
				var rating = 0;
			}

			$.post(G_BASE_URL + '/article/ajax/article_vote/', 'type=article&item_id=' + article_id + '&rating=' + rating, function (result) {

				AWS.loading('hide');

				if (result.errno != 1)
				{
					AWS.alert(result.err);
				}
				else
				{
					if (rating == 0)
					{
						selector.removeClass('active').find('b').html(parseInt(selector.find('b').html()) - 1);
					}
					else if (rating == -1)
					{
						if (selector.parents('.aw-article-vote').find('.agree').hasClass('active'))
						{
							selector.parents('.aw-article-vote').find('b').html(parseInt(selector.parents('.aw-article-vote').find('b').html()) - 1);
							selector.parents('.aw-article-vote').find('a').removeClass('active');
						}

						selector.addClass('active');
					}
					else
					{
						selector.parents('.aw-article-vote').find('a').removeClass('active');
						selector.addClass('active').find('b').html(parseInt(selector.find('b').html()) + 1);
					}
				}
			}, 'json');
		},

		// 文章评论赞同
		article_comment_vote: function(selector, comment_id, rating)
		{
			AWS.loading('show');

			if (selector.hasClass('active'))
			{
				var rating = 0;
			}

			$.post(G_BASE_URL + '/article/ajax/article_vote/', 'type=comment&item_id=' + comment_id + '&rating=' + rating, function (result)
			{
				AWS.loading('hide');

				if (result.errno != 1)
				{
					AWS.alert(result.err);
				}
				else
				{
					if (rating == 0)
					{
						selector.html(selector.html().replace(_t('我已赞'), _t('赞'))).removeClass('active');
					}
					else
					{
						selector.html(selector.html().replace(_t('赞'), _t('我已赞'))).addClass('active');
					}
				}
			}, 'json');
		},

		// 创建收藏标签
		add_favorite_tag: function()
		{
			$.post(G_BASE_URL + '/favorite/ajax/update_favorite_tag/', {
				'item_id' : $('#favorite_form input[name="item_id"]').val(),
				'item_type' : $('#favorite_form input[name="item_type"]').val(),
				'tags' : $('#favorite_form .add-input').val()
			}, function (result)
			{
				if (result.errno == 1)
				{
					$('.aw-favorite-box .aw-favorite-tag-list').show();
					$('.aw-favorite-box .aw-favorite-tag-add').hide();

					$('.aw-favorite-tag-list ul').prepend('<li class="active"><a data-value="' + $('#favorite_form .add-input').val() + '"><span class="title">' + $('#favorite_form .add-input').val() + '</span></a><i class="icon icon-followed"></i></li>');
				}
			}, 'json');
		}
	}

	AWS.Dropdown =
	{
		// 下拉菜单功能绑定
		bind_dropdown_list: function(selector, type)
		{
			if (type == 'search')
			{
				$(selector).focus(function()
				{
					$(selector).parent().find('.aw-dropdown').show();
				});
			}
			$(selector).keyup(function(e)
			{
				if (type == 'search')
				{
					$(selector).parent().find('.search').show().children('a').text($(selector).val());
				}
				if ($(selector).val().length >= 1)
				{
					if (e.which != 38 && e.which != 40 && e.which != 188 && e.which != 13)
					{
						AWS.Dropdown.get_dropdown_list($(this), type, $(selector).val());
					}
				}
				else
				{
				   $(selector).parent().find('.aw-dropdown').hide();
				}

				if (type == 'topic')
				{
					// 逗号或回车提交
					if (e.which == 188)
					{
						if ($('.aw-edit-topic-box #aw_edit_topic_title').val() != ',')
						{
							$('.aw-edit-topic-box #aw_edit_topic_title').val( $('.aw-edit-topic-box #aw_edit_topic_title').val().substring(0,$('.aw-edit-topic-box #aw_edit_topic_title').val().length-1));
							$('.aw-edit-topic-box .aw-dropdown').hide();
							$('.aw-edit-topic-box .add').click();
						}
						return false;
					}

					// 回车提交
					if (e.which == 13)
					{
						$('.aw-edit-topic-box .aw-dropdown').hide();
						$('.aw-edit-topic-box .add').click();
						return false;
					}

					var lis = $(selector).parent().find('.aw-dropdown-list li');

					//键盘往下
					if (e.which == 40 && lis.is(':visible'))
					{
						var _index;
						if (!lis.hasClass('active'))
						{
							lis.eq(0).addClass('active');
						}
						else
						{
							$.each(lis, function (i, e)
							{
								if ($(this).hasClass('active'))
								{
									$(this).removeClass('active');
									if ($(this).index() == lis.length - 1)
									{
										_index = 0;
									}
									else
									{
										_index = $(this).index() + 1;
									}
								}
							});
							lis.eq(_index).addClass('active');
							$(selector).val(lis.eq(_index).text());
						}
					}

					//键盘往上
					if (e.which == 38 && lis.is(':visible'))
					{
						var _index;
						if (!lis.hasClass('active'))
						{
							lis.eq(lis.length - 1).addClass('active');
						}
						else
						{
							$.each(lis, function (i, e)
							{
								if ($(this).hasClass('active'))
								{
									$(this).removeClass('active');
									if ($(this).index() == 0)
									{
										_index = lis.length - 1;
									}
									else
									{
										_index = $(this).index() - 1;
									}
								}
							});
							lis.eq(_index).addClass('active');
							$(selector).val(lis.eq(_index).text());
						}

					}
				}
			});

			$(selector).blur(function()
			{
				$(selector).parent().find('.aw-dropdown').delay(500).fadeOut(300);
			});
		},

		// 插入下拉菜单
		set_dropdown_list: function(selector, data, selected)
		{
			$(selector).append(Hogan.compile(AW_TEMPLATE.dropdownList).render(
			{
				'items': data
			}));

			$(selector + ' .aw-dropdown-list li a').click(function ()
			{
				$('#aw-topic-tags-select').html($(this).text());
			});

			if (selected)
			{
				$(selector + " .dropdown-menu li a[data-value='" + selected + "']").click();
			}
		},

		/* 下拉菜单数据获取 */
		/*
		*    type : search, publish, redirect, invite, inbox, topic_question, topic
		*/
		get_dropdown_list: function(selector, type, data)
		{
			if (AWS.G.dropdown_list_xhr != '')
			{
				AWS.G.dropdown_list_xhr.abort(); // 中止上一次ajax请求
			}
			var url;
			switch (type)
			{
				case 'search' :
					url = G_BASE_URL + '/search/ajax/search/?q=' + encodeURIComponent(data) + '&limit=5';
				break;

				case 'publish' :
					url = G_BASE_URL + '/search/ajax/search/?type=questions&q=' + encodeURIComponent(data) + '&limit=5';
				break;

				case 'redirect' :
					url = G_BASE_URL + '/search/ajax/search/?q=' + encodeURIComponent(data) + '&type=questions&limit=30&is_question_id=1';
				break;

				case 'invite' :
				case 'inbox' :
					url = G_BASE_URL + '/search/ajax/search/?type=users&q=' + encodeURIComponent(data) + '&limit=10';
				break;

				case 'topic_question' :
					url = G_BASE_URL + '/search/ajax/search/?type=questions,articles&q=' + encodeURIComponent(data) + '&topic_ids=' + CONTENTS_RELATED_TOPIC_IDS + '&limit=50';
				break;

				case 'topic' :
					url = G_BASE_URL + '/search/ajax/search/?type=topics&q=' + encodeURIComponent(data) + '&limit=10';
				break;

				case 'questions' :
					url = G_BASE_URL + '/search/ajax/search/?type=questions&q=' + encodeURIComponent(data) + '&limit=10';
				break;

				case 'articles' :
					url = G_BASE_URL + '/search/ajax/search/?type=articles&q=' + encodeURIComponent(data) + '&limit=10';
				break;

			}

			AWS.G.dropdown_list_xhr = $.get(url, function (result)
			{
				if (result.length != 0 && AWS.G.dropdown_list_xhr != undefined)
				{
					$(selector).parent().find('.aw-dropdown-list').html(''); // 清空内容
					switch (type)
					{
						case 'search' :
							$.each(result, function (i, a)
							{
								switch (a.type)
								{
									case 'questions':
										if (a.detail.best_answer > 0)
										{
											var active = 'active';
										}
										else
										{
											var active = ''
										}

										$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.searchDropdownListQuestions).render(
										{
											'url': a.url,
											'active': active,
											'content': a.name,
											'discuss_count': a.detail.answer_count
										}));
									break;

									case 'articles':
										$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.searchDropdownListArticles).render(
										{
											'url': a.url,
											'content': a.name,
											'comments': a.detail.comments
										}));
									break;

									case 'topics':
										$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.searchDropdownListTopics).render(
										{
											'url': a.url,
											'name': a.name,
											'discuss_count': a.detail.discuss_count,
											'topic_id': a.detail.topic_id
										}));
									break;

									case 'users':
										if (a.detail.signature == '')
										{
											var signature = _t('暂无介绍');
										}
										else
										{
											var signature = a.detail.signature;
										}

										$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.searchDropdownListUsers).render(
										{
											'url': a.url,
											'img': a.detail.avatar_file,
											'name': a.name,
											'intro': signature
										}));
									break;
								}
							});
						break;

						case 'publish' :
						case 'topic_question' :
							$.each(result, function (i, a)
							{
								$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.questionDropdownList).render(
								{
									'url': a.url,
									'name': a.name
								}));
							});
							break;

						case 'topic' :
							$.each(result, function (i, a)
							{
								$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.editTopicDorpdownList).render(
								{
									'name': a['name']
								}));
							});
							break;

						case 'redirect' :
							$.each(result, function (i, a)
							{
								$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.questionRedirectList).render(
								{
									'url': "'" + G_BASE_URL + "/question/ajax/redirect/', 'item_id=" + $(selector).attr('data-id') + "&target_id=" + a['search_id'] + "'",
									'name': a['name']
								}));
							});
							break;

						case 'questions' :
						case 'articles' :
							$.each(result, function (i, a)
							{
								$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.questionDropdownList).render(
								{
									'url': '#',
									'name': a['name']
								}));
							});
							break;

							$(selector).parent().find('.aw-dropdown-list li').click(function()
							{
								$('.aw-question-list').append('<li data-id="'+$(this).attr('data-id')+'"><div class="col-sm-9">' + $(this).html() + '</div> <div class="col-sm-3"><a class="btn btn-danger btn-xs">删除</a></div></li>');

								$('.aw-question-list li').find("a").attr('href',function(){
									return $(this).attr("_href")

								});

								if ($('.question_ids').val() == '')
								{
									$('.question_ids').val($(this).attr('data-id') + ',');
								}
								else
								{
									$('.question_ids').val($('.question_ids').val() + $(this).attr('data-id') + ',');
								}
								$(".alert-box").modal('hide');
							});

							break;

						case 'inbox' :
						case 'invite' :
							$.each(result, function (i, a)
							{
								$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.inviteDropdownList).render(
								{
									'uid': a.uid,
									'name': a.name,
									'img': a.detail.avatar_file
								}));
							});
							break;

					}
					if (type == 'publish')
					{
						$(selector).parent().find('.aw-publish-suggest-question, .aw-publish-suggest-question .aw-dropdown-list').show();
					}
					else
					{
						$(selector).parent().find('.aw-dropdown, .aw-dropdown-list').show().children().show();
						$(selector).parent().find('.title').hide();
						// 关键词高亮
						$(selector).parent().find('.aw-dropdown-list li.question a').highText(data, 'b', 'active');
					}
				}else
				{
					$(selector).parent().find('.aw-dropdown').show().end().find('.title').html(_t('没有找到相关结果')).show();
					$(selector).parent().find('.aw-dropdown-list, .aw-publish-suggest-question').hide();
				}
			}, 'json');

		}
	}

	AWS.Message =
	{
		// 检测通知
		check_notifications: function()
		{
			// 检测登录状态
			if (G_USER_ID == 0)
			{
				clearInterval(AWS.G.notification_timer);
				return false;
			}

			$.get(G_BASE_URL + '/home/ajax/notifications/', function (result)
			{
				$('#inbox_unread').html(Number(result.rsm.inbox_num));

				var last_unread_notification = G_UNREAD_NOTIFICATION;

				G_UNREAD_NOTIFICATION = Number(result.rsm.notifications_num);

				if (G_UNREAD_NOTIFICATION > 0)
				{
					if (G_UNREAD_NOTIFICATION != last_unread_notification)
					{
						// 加载消息列表
						AWS.Message.load_notification_list();

						// 给导航label添加未读消息数量
						$('#notifications_unread').html(G_UNREAD_NOTIFICATION);
					}

					document.title = '(' + (Number(result.rsm.notifications_num) + Number(result.rsm.inbox_num)) + ') ' + document_title;

					$('#notifications_unread').show();
				}
				else
				{
					if ($('#header_notification_list').length)
					{
						$("#header_notification_list").html('<p class="aw-padding10" align="center">' + _t('没有未读通知') + '</p>');
					}

					if ($("#index_notification").length)
					{
						$("#index_notification").fadeOut();
					}

					document.title = document_title;

					$('#notifications_unread').hide();
				}

				// 私信
				if (Number(result.rsm.inbox_num) > 0)
				{
					$('#inbox_unread').show();
				}
				else
				{
					$('#inbox_unread').hide();
				}

			}, 'json');
		},

		// 阅读通知
		read_notification: function(selector, notification_id , reload)
		{
			if (notification_id)
			{
				selector.remove();

				var url = G_BASE_URL + '/notifications/ajax/read_notification/notification_id-' + notification_id;
			}
			else
			{
				if ($("#index_notification").length)
				{
					$("#index_notification").fadeOut();
				}

				var url = G_BASE_URL + '/notifications/ajax/read_notification/';
			}

			$.get(url, function (result)
			{
				AWS.Message.check_notifications();

				if (reload)
				{
					window.location.reload();
				}
			});
		},

		// 重新加载通知列表
		load_notification_list: function()
		{
			if ($("#index_notification").length)
			{
				// 给首页通知box内label添加未读消息数量
				$("#index_notification").fadeIn().find('[name=notification_unread_num]').html(G_UNREAD_NOTIFICATION);

				$('#index_notification ul#notification_list').html('<p align="center" style="padding: 15px 0"><img src="' + G_STATIC_URL + '/common/loading_b.gif"/></p>');

				$.get(G_BASE_URL + '/notifications/ajax/list/flag-0__page-0', function (result)
				{
					$('#index_notification ul#notification_list').html(result);

					AWS.Message.notification_show(5);
				});
			}

			if ($("#header_notification_list").length)
			{
				$.get(G_BASE_URL + '/notifications/ajax/list/flag-0__limit-5__template-header_list', function (result)
				{
					if (result.length)
					{
						$("#header_notification_list").html(result);
					}
					else
					{
						$("#header_notification_list").html('<p class="aw-padding10" align="center">' + _t('没有未读通知') + '</p>');
					}
				});
			}
		},

		// 控制通知数量
		notification_show: function(length)
		{
			if ($('#index_notification').length > 0)
			{
				if ($('#index_notification ul#notification_list li').length == 0)
				{
					$('#index_notification').fadeOut();
				}
				else
				{
					$('#index_notification ul#notification_list li').each(function (i, e)
					{
						if (i < length)
						{
							$(e).show();
						}
						else
						{
							$(e).hide();
						}
					});
				}
			}
		}
	}

	AWS.Init =
	{
		// 初始化问题评论框
		init_comment_box: function(selector)
		{
			$(document).on('click', selector, function ()
			{
				$(this).parents('.aw-question-detail').find('.aw-invite-box, .aw-question-related-box').hide();
				if (typeof COMMENT_UNFOLD != 'undefined')
				{
					if (COMMENT_UNFOLD == 'all' && $(this).attr('data-comment-count') == 0 && $(this).attr('data-first-click') == 'hide')
					{
						$(this).removeAttr('data-first-click');
						return false;
					}
				}

				if (!$(this).attr('data-type') || !$(this).attr('data-id'))
				{
					return true;
				}

				var comment_box_id = '#aw-comment-box-' + $(this).attr('data-type') + '-' + 　$(this).attr('data-id');

				if ($(comment_box_id).length)
				{
					if ($(comment_box_id).css('display') == 'none')
					{
						$(this).addClass('active');

						$(comment_box_id).fadeIn();
					}
					else
					{
						$(this).removeClass('active');
						$(comment_box_id).fadeOut();
					}
				}
				else
				{
					// 动态插入commentBox
					switch ($(this).attr('data-type'))
					{
						case 'question':
							var comment_form_action = G_BASE_URL + '/question/ajax/save_question_comment/question_id-' + $(this).attr('data-id');
							var comment_data_url = G_BASE_URL + '/question/ajax/get_question_comments/question_id-' + $(this).attr('data-id');
							break;

						case 'answer':
							var comment_form_action = G_BASE_URL + '/question/ajax/save_answer_comment/answer_id-' + $(this).attr('data-id');
							var comment_data_url = G_BASE_URL + '/question/ajax/get_answer_comments/answer_id-' + $(this).attr('data-id');
							break;
					}

					if (G_USER_ID)
					{
						$(this).parents('.aw-item').find('.mod-footer').append(Hogan.compile(AW_TEMPLATE.commentBox).render(
						{
							'comment_form_id': comment_box_id.replace('#', ''),
							'comment_form_action': comment_form_action
						}));

						$(comment_box_id).find('.aw-comment-txt').bind(
						{
							focus: function ()
							{
								$(comment_box_id).find('.aw-comment-box-btn').show();
							},

							blur: function ()
							{
								if ($(this).val() == '')
								{
									$(comment_box_id).find('.aw-comment-box-btn').hide();
								}
							}
						});

						$(comment_box_id).find('.close-comment-box').click(function ()
						{
							$(comment_box_id).fadeOut();
							$(comment_box_id).find('.aw-comment-txt').css('height', $(this).css('line-height'));
						});
					}
					else
					{
						$(this).parents('.aw-item').find('.mod-footer').append(Hogan.compile(AW_TEMPLATE.commentBoxClose).render(
						{
							'comment_form_id': comment_box_id.replace('#', ''),
							'comment_form_action': comment_form_action
						}));
					}

					// 判断是否有评论数据
					$.get(comment_data_url, function (result)
					{
						if ($.trim(result) == '')
						{
							result = '<div align="center" class="aw-padding10">' + _t('暂无评论') + '</div>';
						}

						$(comment_box_id).find('.aw-comment-list').html(result);
					});

					// textarae自动增高
					$(comment_box_id).find('.aw-comment-txt').autosize();

					$(this).addClass('active');

					AWS.at_user_lists(comment_box_id + ' .aw-comment-txt', 5);
				}

				AWS.at_user_lists($(this).parents('.aw-item').find('.aw-comment-txt'));
			});
		},

		// 初始化文章评论框
		init_article_comment_box: function(selector)
		{
			$(document).on('click', selector, function ()
			{
				var _editor_box = $(this).parents('.aw-item').find('.aw-article-replay-box');
				if (_editor_box.length)
				{
					if (_editor_box.css('display') == 'block')
					{
					   _editor_box.fadeOut();
					}
					else
					{
						_editor_box.fadeIn();
					}
				}
				else
				{
					$(this).parents('.mod-footer').append(Hogan.compile(AW_TEMPLATE.articleCommentBox).render(
					{
						'at_uid' : $(this).attr('data-id'),
						'article_id' : $('.aw-topic-bar').attr('data-id')
					}));
				}
			});
		},

		// 初始化话题编辑box
		init_topic_edit_box: function(selector) //selector -> .aw-edit-topic
		{
			$(selector).click(function ()
			{
				var _topic_editor = $(this).parents('.aw-topic-bar'),
					data_id = _topic_editor.attr('data-id'),
					data_type = _topic_editor.attr('data-type');

				if (!_topic_editor.hasClass('active'))
				{
					_topic_editor.addClass('active');

					if (!_topic_editor.find('.topic-tag .close').length)
					{
						_topic_editor.find('.topic-tag').append('<a class="close"><i class="icon icon-delete"></i></a>');
					}
				}
				else
				{
					_topic_editor.addClass('active');
				}

				// 判断插入编辑box
				if (_topic_editor.find('.aw-edit-topic-box').length == 0)
				{
					_topic_editor.append(AW_TEMPLATE.editTopicBox);

					// 给编辑box添加按钮添加事件
					_topic_editor.find('.add').click(function ()
					{
						if (_topic_editor.find('#aw_edit_topic_title').val() != '')
						{
							switch (data_type)
							{
								case 'publish':
									_topic_editor.find('.tag-bar').prepend('<span class="topic-tag"><a class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close" onclick="$(this).parents(\'.topic-tag\').remove();"><i class="icon icon-delete"></i></a><input type="hidden" value="' + _topic_editor.find('#aw_edit_topic_title').val() + '" name="topics[]" /></span>').hide().fadeIn();

									_topic_editor.find('#aw_edit_topic_title').val('');
								break;

								case 'question':
									$.post(G_BASE_URL + '/topic/ajax/save_topic_relation/', 'type=question&item_id=' + data_id + '&topic_title=' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()), function (result)
									{
										if (result.errno != 1)
										{
											AWS.alert(result.err);

											return false;
										}

										_topic_editor.find('.tag-bar').prepend('<span class="topic-tag" data-id="' + result.rsm.topic_id + '"><a href="' + G_BASE_URL + '/topic/' + result.rsm.topic_id + '" class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close"><i class="icon icon-delete"></i></a></span>').hide().fadeIn();

										_topic_editor.find('#aw_edit_topic_title').val('');
									}, 'json');
								break;

								case 'article':
									$.post(G_BASE_URL + '/topic/ajax/save_topic_relation/', 'type=article&item_id=' + data_id + '&topic_title=' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()), function (result)
									{
										if (result.errno != 1)
										{
											AWS.alert(result.err);

											return false;
										}

										_topic_editor.find('.tag-bar').prepend('<span class="topic-tag" data-id="' + result.rsm.topic_id + '"><a href="' + G_BASE_URL + '/topic/' + result.rsm.topic_id + '" class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close"><i class="icon icon-delete"></i></a></span>').hide().fadeIn();

										_topic_editor.find('#aw_edit_topic_title').val('');
									}, 'json');
								break;


								case 'topic':
									$.post(G_BASE_URL + '/topic/ajax/save_related_topic/topic_id-' + data_id, 'topic_title=' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()), function (result)
									{
										if (result.errno != 1)
										{
											AWS.alert(result.err);

											return false;
										}

										_topic_editor.find('.tag-bar').prepend('<span class="topic-tag"><a href="' + G_BASE_URL + '/favorite/tag-' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()) + '" class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close"><i class="icon icon-delete"></i></a></span>').hide().fadeIn();

										_topic_editor.find('#aw_edit_topic_title').val('');
									}, 'json');
								break;

								case 'favorite':
									$.post(G_BASE_URL + '/favorite/ajax/update_favorite_tag/', 'item_id=' + data_id + '&item_type=' + _topic_editor.attr('data-item-type') + '&tags=' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()), function (result)
									{
										if (result.errno != 1)
										{
											AWS.alert(result.err);

											return false;
										}

										_topic_editor.find('.tag-bar').prepend('<span class="topic-tag"><a href="' + G_BASE_URL + '/favorite/tag-' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()) + '" class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close"><i class="icon icon-delete"></i></a></span>').hide().fadeIn();

										_topic_editor.find('#aw_edit_topic_title').val('');
									}, 'json');
								break;
							}
						}
					});

					// 给编辑box取消按钮添加事件
					_topic_editor.find('.close-edit').click(function ()
					{
						_topic_editor.removeClass('active');
						_topic_editor.find('.aw-edit-topic-box').hide();
						_topic_editor.find('.aw-edit-topic').show();
					});

					AWS.Dropdown.bind_dropdown_list($(this).parents('.aw-topic-bar').find('#aw_edit_topic_title'),'topic');
				}

				$(this).parents('.aw-topic-bar').find('.aw-edit-topic-box').fadeIn();

				// 是否允许创建新话题
				if (!G_CAN_CREATE_TOPIC)
				{
					$(this).parents('.aw-topic-bar').find('.add').hide();
				}

				$(this).hide();
			});
		}
	}

	function _t(string, replace)
	{
		if (typeof (aws_lang) != 'undefined')
		{
			if (typeof (aws_lang[string]) != 'undefined')
			{
				string = aws_lang[string];
			}
		}

		if (replace)
		{
			string = string.replace('%s', replace);
		}

		return string;
	};

	// jQuery扩展
	(function ($)
	{
		$.fn.extend(
		{
			insertAtCaret: function (textFeildValue)
			{
				var textObj = $(this).get(0);
				if (document.all && textObj.createTextRange && textObj.caretPos)
				{
					var caretPos = textObj.caretPos;
					caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == '' ?
						textFeildValue + '' : textFeildValue;
				}
				else if (textObj.setSelectionRange)
				{
					var rangeStart = textObj.selectionStart,
						rangeEnd = textObj.selectionEnd,
						tempStr1 = textObj.value.substring(0, rangeStart),
						tempStr2 = textObj.value.substring(rangeEnd);
					textObj.value = tempStr1 + textFeildValue + tempStr2;
					textObj.focus();
					var len = textFeildValue.length;
					textObj.setSelectionRange(rangeStart + len, rangeStart + len);
					textObj.blur();
				}
				else
				{
					textObj.value += textFeildValue;
				}
			},

			highText: function (searchWords, htmlTag, tagClass)
			{
				return this.each(function ()
				{
					$(this).html(function high(replaced, search, htmlTag, tagClass)
					{
						var pattarn = search.replace(/\b(\w+)\b/g, "($1)").replace(/\s+/g, "|");

						return replaced.replace(new RegExp(pattarn, "ig"), function (keyword)
						{
							return $("<" + htmlTag + " class=" + tagClass + ">" + keyword + "</" + htmlTag + ">").outerHTML();
						});
					}($(this).text(), searchWords, htmlTag, tagClass));
				});
			},

			outerHTML: function (s)
			{
				return (s) ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
			}
		});

		$.extend(
		{
			// 滚动到指定位置
			scrollTo : function (type, duration, options)
			{
				if (typeof type == 'object')
				{
					var type = $(type).offset().top
				}

				$('html, body').animate({
					scrollTop: type
				}, {
					duration: duration,
					queue: options.queue
				});
			}
		})

	})(jQuery);


/***/ },
/* 5 */
/***/ function(module, exports) {

	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		__webpack_require__(1);
		__webpack_require__(1);
		(function webpackMissingModule() { throw new Error("Cannot find module \"/Applications/XAMPP/xamppfiles/htdocs/debug/web/Resource/Default/js/areas.js\""); }());
		__webpack_require__(3);
		__webpack_require__(4);
		__webpack_require__(5);
		(function webpackMissingModule() { throw new Error("Cannot find module \"/Applications/XAMPP/xamppfiles/htdocs/debug/web/Resource/Default/js/editor\""); }());
		__webpack_require__(6);
		__webpack_require__(7);
		__webpack_require__(8);
		__webpack_require__(10);
		__webpack_require__(11);
		__webpack_require__(12);
		(function webpackMissingModule() { throw new Error("Cannot find module \"/Applications/XAMPP/xamppfiles/htdocs/debug/web/Resource/Default/js/plug_module\""); }());
		module.exports = __webpack_require__(13);


	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		var document_title = document.title;

		$(document).ready(function ()
		{
		    // fix form bug...
		    $("form[action='']").attr('action', window.location.href);

		    // 验证码
		    $('img#captcha').attr('src', G_BASE_URL + '/account/captcha/');

		    // 输入框自动增高
		    $('.autosize').autosize();

		    //响应式导航条效果
		    $('.aw-top-nav .navbar-toggle').click(function()
		    {
		        if ($(this).parents('.aw-top-nav').find('.navbar-collapse').hasClass('active'))
		        {
		            $(this).parents('.aw-top-nav').find('.navbar-collapse').removeClass('active');
		        }
		        else
		        {
		            $(this).parents('.aw-top-nav').find('.navbar-collapse').addClass('active');
		        }
		    });

		    //检测通知
		    if (typeof (G_NOTIFICATION_INTERVAL) != 'undefined')
		    {
		        AWS.Message.check_notifications();
		        AWS.G.notification_timer = setInterval('AWS.Message.check_notifications()', G_NOTIFICATION_INTERVAL);
		    }

		    //文章列表样式调整
		    if ($('.aw-common-list').length)
		    {
		        $.each($('.aw-common-list .aw-item.article'), function (i, e)
		        {
		            if ($(this).find('.all-content img').length >= 1)
		            {
		                $(this).find('.markitup-box').prepend($(this).find('.all-content img').eq(0).addClass('pull-left inline-img'))
		            }
		        });
		    }

		    $('a[rel=lightbox]:visible').fancybox(
		    {
		        openEffect: 'none',
		        closeEffect: 'none',
		        prevEffect: 'none',
		        nextEffect: 'none',
		        centerOnScroll : true,
		        closeBtn: false,
		        helpers:
		        {
		            buttons:
		            {
		                position: 'bottom'
		            }
		        },
		        afterLoad: function ()
		        {
		            this.title = '第 ' + (this.index + 1) + ' 张, 共 ' + this.group.length + ' 张' + (this.title ? ' - ' + this.title : '');
		        }
		    });

		    if (window.location.hash.indexOf('#!') != -1)
		    {
		        if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)
		        {
		            $.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});
		        }
		    }

		    /*用户头像提示box*/
		    AWS.show_card_box('.aw-user-name, .aw-user-img', 'user');

		    AWS.show_card_box('.topic-tag, .aw-topic-name, .aw-topic-img', 'topic');

		    //文章页添加评论, 话题添加 绑定事件
		    AWS.Init.init_article_comment_box('.aw-article-content .aw-article-comment');

		    AWS.Init.init_topic_edit_box('.aw-edit-topic');

		    //话题编辑下拉菜单click事件
		    $(document).on('click', '.aw-edit-topic-box .aw-dropdown-list li', function ()
		    {
		        $(this).parents('.aw-edit-topic-box').find('#aw_edit_topic_title').val($(this).text());
		        $(this).parents('.aw-edit-topic-box').find('.add').click();
		        $(this).parents('.aw-edit-topic-box').find('.aw-dropdown').hide();
		    });

		    //话题删除按钮
		    $(document).on('click', '.topic-tag .close',  function()
		    {
		        var data_type = $(this).parents('.aw-topic-bar').attr('data-type'),
		            data_id = $(this).parents('.aw-topic-bar').attr('data-id'),
		            data_url = '',
		            topic_id = $(this).parents('.topic-tag').attr('data-id');

		        switch (data_type)
		        {
		            case 'question':
		                data_url = G_BASE_URL + '/topic/ajax/remove_topic_relation/';
		                break;

		            case 'topic':
		                data_url = G_BASE_URL + '/topic/ajax/remove_related_topic/related_id-' + $(this).parents('.topic-tag').attr('data-id') + '__topic_id-' + data_id;
		                break;

		            case 'favorite':
		                data_url = G_BASE_URL + '/favorite/ajax/remove_favorite_tag/';
		                break

		            case 'article':
		                data_url = G_BASE_URL + '/topic/ajax/remove_topic_relation/';
		                break;
		        }

		        if ($(this).parents('.aw-topic-bar').attr('data-url'))
		        {
		            data_url = $(this).parents('.aw-topic-bar').attr('data-url');
		        }

		        if (data_type == 'topic')
		        {
		            $.get(data_url);
		        }
		        else if (data_type == 'favorite')
		        {
		            $.post(data_url, 
		            {
		                'item_type': data_type,
		                'topic_id': topic_id,
		                'item_id' : data_id,
		                'tags' : $.trim($(this).parents('.topic-tag').text())
		            }, function (result)
		            {
		            }, 'json');
		        }
		        else
		        {
		            $.post(data_url, 
		            {
		                'type': data_type,
		                'topic_id': topic_id,
		                'item_id' : data_id
		            }, function (result)
		            {
		                $('#aw-ajax-box').empty();
		            }, 'json');
		        }

		        $(this).parents('.topic-tag').remove();

		        return false;
		    });

		    //小卡片mouseover
		    $(document).on('mouseover', '#aw-card-tips', function ()
		    {
		        clearTimeout(AWS.G.card_box_hide_timer);

		        $(this).show();
		    });

		    //小卡片mouseout
		    $(document).on('mouseout', '#aw-card-tips', function ()
		    {
		        $(this).hide();
		    });

		    //用户小卡片关注更新缓存
		    $(document).on('click', '.aw-card-tips-user .follow', function ()
		    {
		        var uid = $(this).parents('.aw-card-tips').find('.name').attr('data-id');

		        $.each(AWS.G.cashUserData, function (i, a)
		        {
		            if (a.match('data-id="' + uid + '"'))
		            {
		                if (AWS.G.cashUserData.length == 1)
		                {
		                    AWS.G.cashUserData = [];
		                }
		                else
		                {
		                    AWS.G.cashUserData[i] = '';
		                }
		            }
		        });
		    });

		    //话题小卡片关注更新缓存
		    $(document).on('click', '.aw-card-tips-topic .follow', function ()
		    {
		        var topic_id = $(this).parents('.aw-card-tips').find('.name').attr('data-id');

		        $.each(AWS.G.cashTopicData, function (i, a)
		        {
		            if (a.match('data-id="' + topic_id + '"'))
		            {
		                if (AWS.G.cashTopicData.length == 1)
		                {
		                    AWS.G.cashTopicData = [];
		                }
		                else
		                {
		                    AWS.G.cashTopicData[i] = '';
		                }
		            }
		        });
		    });

		    /*icon tooltips提示*/
		    $(document).on('mouseover', '.follow, .voter, .aw-icon-thank-tips, .invite-list-user', function ()
		    {
		        $(this).tooltip('show');
		    });

		    //搜索下拉
		    AWS.Dropdown.bind_dropdown_list('#aw-search-query', 'search');

		    //编辑器@人
		    AWS.at_user_lists('#wmd-input, .aw-article-replay-box #comment_editor', 5);

		    //ie浏览器下input,textarea兼容
		    if (document.all)
		    {
		        AWS.check_placeholder($('input, textarea'));

		        // 每隔1s轮询检测placeholder
		        setInterval(function()
		        {
		            AWS.check_placeholder($('input[data-placeholder!="true"], textarea[data-placeholder!="true"]'));
		        }, 1000);
		    }

		    if ($('.aw-back-top').length)
		    {
		        $(window).scroll(function ()
		        {
		            if ($(window).scrollTop() > ($(window).height() / 2))
		            {
		                $('.aw-back-top').fadeIn();
		            }
		            else
		            {
		                $('.aw-back-top').fadeOut();
		            }
		        });
		    }
		});

		$(window).on('hashchange', function() {
		    if (window.location.hash.indexOf('#!') != -1)
		    {
		        if ($('a[name=' + window.location.hash.replace('#!', '') + ']').length)
		        {
		            $.scrollTo($('a[name=' + window.location.hash.replace('#!', '') + ']').offset()['top'] - 20, 600, {queue:true});
		        }
		    }
		});


	/***/ },
	/* 2 */,
	/* 3 */
	/***/ function(module, exports) {

		var AW_TEMPLATE = {
			'loadingBox':
				'<div id="aw-loading" class="hide">'+
					'<div id="aw-loading-box"></div>'+
				'</div>',

			'loadingMiniBox':
				'<div id="aw-loading-mini-box"></div>',

			'userCard':
					'<div id="aw-card-tips" class="aw-card-tips aw-card-tips-user">'+
						'<div class="aw-mod">'+
							'<div class="mod-head">'+
								'<a href="{{url}}" class="img">'+
									'<img src="{{avatar_file}}" alt="" />'+
								'</a>'+
								'<p class="title clearfix">'+
									'<a href="{{url}}" class="name pull-left" data-id="{{uid}}">{{user_name}}</a>'+
									'<i class="{{verified_enterprise}} pull-left" title="{{verified_title}}"></i>'+
								'</p>'+
								'<p class="aw-user-center-follow-meta">'+
									'<span>' + _t('威望') + ': <em class="aw-text-color-green">{{reputation}}</em></span>'+
									'<span>' + _t('赞同') + ': <em class="aw-text-color-orange">{{agree_count}}</em></span>'+
								'</p>'+
							'</div>'+
							'<div class="mod-body">'+
								'<p>{{signature}}</p>'+
							'</div>'+
							'<div class="mod-footer clearfix">'+
								'<span>'+
									'<a class="text-color-999" onclick="AWS.dialog(\'inbox\', \'{{user_name}}\');"><i class="icon icon-inbox"></i> ' + _t('私信') + '</a>&nbsp;&nbsp;&nbsp;&nbsp;<a  class="text-color-999" onclick="AWS.dialog(\'publish\', {category_enable:{{category_enable}}, ask_user_id:{{uid}}, ask_user_name:{{ask_name}} });"><i class="icon icon-at"></i> ' + _t('问Ta') + '</a>'+
								'</span>'+
								'<a class="btn btn-normal btn-success follow {{focus}} pull-right" onclick="AWS.User.follow($(this), \'user\', {{uid}});"><span>{{focusTxt}}</span> <em>|</em> <b>{{fansCount}}</b></a>'+
							'</div>'+
						'</div>'+
					'</div>',

			'topicCard' :
					'<div id="aw-card-tips" class="aw-card-tips aw-card-tips-topic">'+
						'<div class="aw-mod">'+
							'<div class="mod-head">'+
								'<a href="{{url}}" class="img">'+
									'<img src="{{topic_pic}}" alt="" title=""/>'+
								'</a>'+
								'<p class="title">'+
									'<a href="{{url}}" class="name" data-id="{{topic_id}}">{{topic_title}}</a>'+
								'</p>'+
								'<p class="desc">'+
									'{{topic_description}}'+
								'</p>'+
							'</div>'+
							'<div class="mod-footer">'+
								'<span>'+ _t('讨论数') + ': {{discuss_count}}</span>'+
								'<a class="btn btn-normal btn-success follow {{focus}} pull-right" onclick="AWS.User.follow($(this), \'topic\', {{topic_id}});"><span>{{focusTxt}}</span> <em>|</em> <b>{{focus_count}}</b></a>'+
							'</div>'+
						'</div>'+
					'</div>',

			'alertBox' :
					'<div class="modal fade alert-box aw-tips-box">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content">'+
								'<div class="modal-header">'+
									'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
									'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
								'</div>'+
								'<div class="modal-body">'+
									'<p>{{message}}</p>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>',

			'editCommentBox' :
						'<div class="modal fade alert-box aw-edit-comment-box aw-editor-box">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content">'+
								'<div class="modal-header">'+
									'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
									'<h3 class="modal-title" id="myModalLabel">' + _t('编辑回复') + '</h3>'+
								'</div>'+
								'<form action="' + G_BASE_URL + '/question/ajax/update_answer/answer_id-{{answer_id}}" method="post" onsubmit="return false" id="answer_edit">'+
								'<div class="modal-body">'+
									'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
									'<input type="hidden" name="attach_access_key" value="{{attach_access_key}}" />'+
									'<textarea name="answer_content" id="editor_reply" class="form-control" rows="10"></textarea>'+
									'<div class="aw-file-upload-box">'+
										'<div class="aw-upload-box">'+
											'<a class="btn btn-default">上传附件</a>'+
											'<div class="upload-container"></div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<span><input id="aw-do-delete" type="checkbox" value="1" name="do_delete" /><label for="aw-do-delete">' + _t('删除回复') + '</label></span>'+
									'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#answer_edit\'), AWS.ajax_processer, \'ajax_post_alert\');return false;">' + _t('确定') + '</button>'+
								'</div>'+
								'</form>'+
							'</div>'+
						'</div>'+
					'</div>',

			'articleCommentBox' :
				'<div class="aw-article-replay-box clearfix">'+
					'<form action="'+ G_BASE_URL +'/article/ajax/save_comment/" onsubmit="return false;" method="post">'+
						'<div class="mod-body">'+
							'<input type="hidden" name="at_uid" value="{{at_uid}}">'+
							'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
							'<input type="hidden" name="article_id" value="{{article_id}}" />'+
							'<textarea placeholder="' + _t('写下你的评论...') + '" class="form-control" id="comment_editor" name="message" rows="2"></textarea>'+
						'</div>'+
						'<div class="mod-footer">'+
							'<a href="javascript:;" onclick="AWS.ajax_post($(this).parents(\'form\'));" class="btn btn-normal btn-success pull-right btn-submit">' + _t('回复') + '</a>'+
						'</div>'+
					'</form>'+
				'</div>',

			'favoriteBox' :
				'<div class="modal hide fade alert-box aw-favorite-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('收藏') + '</h3>'+
							'</div>'+
							'<form id="favorite_form" action="' + G_BASE_URL + '/favorite/ajax/update_favorite_tag/" method="post" onsubmit="return false;">'+
								'<input type="hidden" name="item_id" value="{{item_id}}" />'+
								'<input type="hidden" name="item_type" value="{{item_type}}" />'+
								'<input type="text" name="tags" id="add_favorite_tags" class="hide" />'+
								'<div class="mod aw-favorite-tag-list">'+
									'<div class="modal-body">'+
										'<div class="mod-body"><ul></ul></div>'+
										'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
									'</div>'+
									'<div class="modal-footer">'+
										'<a class="pull-left" onclick="$(\'.aw-favorite-box .aw-favorite-tag-list\').hide();$(\'.aw-favorite-box .aw-favorite-tag-add\').show();">' + _t('创建标签') + '</a>'+
										'<a href="javascript:;"  data-dismiss="modal" aria-hidden="true" class="btn btn-large btn-gray" onclick="return false;">' + _t('关闭') + '</a>'+
									'</div>'+
								'</div>'+
								'<div class="mod aw-favorite-tag-add hide">'+
									'<div class="modal-body">'+
										'<input type="text" class="form-control add-input" placeholder="' + _t('标签名字') + '" />'+
									'</div>'+
									'<div class="modal-footer">'+
										'<a class="text-color-999" onclick="$(\'.aw-favorite-box .aw-favorite-tag-list\').show();$(\'.aw-favorite-box .aw-favorite-tag-add\').hide();" style="margin-right:10px;">' + _t('取消') + '</a>'+
										'<a href="javascript:;" class="btn btn-large btn-success" onclick="AWS.User.add_favorite_tag()">' + _t('确认创建') + '</a>'+
									'</div>'+
								'</div>'+
							'</form>'+
						'</div>'+
					'</div>'+
				'</div>',

			'questionRedirect' :
				'<div class="modal fade alert-box aw-question-redirect-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('问题重定向至') + '</h3>'+
							'</div>'+
							'<div class="modal-body">'+
								'<p>' + _t('将问题重定向至') + '</p>'+
								'<div class="aw-question-drodpwon">'+
									'<input id="question-input" class="form-control" type="text" data-id="{{data_id}}" placeholder="' + _t('搜索问题或问题 ID') + '" />'+
									'<div class="aw-dropdown"><p class="title">' + _t('没有找到相关结果') + '</p><ul class="aw-dropdown-list"></ul></div>'+
								'</div>'+
								'<p class="clearfix"><a href="javascript:;" class="btn btn-large btn-success pull-right" onclick="$(\'.alert-box\').modal(\'hide\');">' + _t('放弃操作') + '</a></p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

			'publishBox' :
					'<div class="modal fade alert-box aw-publish-box">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content">'+
								'<div class="modal-header">'+
									'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
									'<h3 class="modal-title" id="myModalLabel">' + _t('发起问题') + '</h3>'+
								'</div>'+
								'<div class="modal-body">'+
									'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
									'<form action="' + G_BASE_URL + '/publish/ajax/publish_question/" method="post" id="quick_publish" onsubmit="return false">'+
										'<input type="hidden" id="quick_publish_category_id" name="category_id" value="{{category_id}}" />'+
										'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
										'<input type="hidden" name="ask_user_id" value="{{ask_user_id}}" />'+
										'<div>'+
											'<textarea class="form-control" placeholder="' + _t('写下你的问题') + '..." rows="1" name="question_content" id="quick_publish_question_content" onkeydown="if (event.keyCode == 13) { return false; }"></textarea>'+
											'<div class="aw-publish-suggest-question hide">'+
												'<p class="text-color-999">你的问题可能已经有答案</p>'+
												'<ul class="aw-dropdown-list">'+
												'</ul>'+
											'</div>'+
										'</div>'+
										'<textarea name="question_detail" class="form-control" rows="4" placeholder="' + _t('问题背景、条件等详细信息') + '..."></textarea>'+
										'<div class="aw-publish-title">'+
											'<div class="dropdown" id="quick_publish_category_chooser">'+
												'<div class="dropdown-toggle" data-toggle="dropdown">'+
													'<span id="aw-topic-tags-select" class="aw-hide-txt">' + _t('选择分类') + '</span>'+
													'<a><i class="icon icon-down"></i></a>'+
												'</div>'+
											'</div>'+
										'</div>'+
										'<div class="aw-topic-bar" data-type="publish">'+
											'<div class="tag-bar clearfix">'+
												'<span class="aw-edit-topic"><i class="icon icon-edit"></i>' + _t('编辑话题') + '</span>'+
											'</div>'+
										'</div>'+
										'<div class="clearfix hide" id="quick_publish_captcha">'+
											'<input type="text" class="pull-left form-control" name="seccode_verify" placeholder="' + _t('验证码') + '" />'+
											'<img id="qp_captcha" class="pull-left" onclick="this.src = \'' +G_BASE_URL + '/account/captcha/\' + Math.floor(Math.random() * 10000);" src="" />'+
										'</div>'+
									'</form>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<span class="pull-right">'+
										'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
										'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');">' + _t('发起') + '</button>'+
									'</span>'+
									'<a href="javascript:;" tabindex="-1" onclick="$(\'form#quick_publish\').attr(\'action\', \'' + G_BASE_URL + '/publish/\');$.each($(\'#quick_publish textarea\'), function (i, e){if ($(this).val() == $(this).attr(\'placeholder\')){$(this).val(\'\');}});document.getElementById(\'quick_publish\').submit();" class="pull-left">' + _t('高级模式') + '</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>',

			'inbox' :
					'<div class="modal fade alert-box aw-inbox">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content">'+
								'<div class="modal-header">'+
									'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
									'<h3 class="modal-title" id="myModalLabel">' + _t('新私信') + '</h3>'+
								'</div>'+
								'<div class="modal-body">'+
									'<div class="alert alert-danger hide error_message"> <i class="icon icon-delete"></i> <em></em></div>'+
									'<form action="' + G_BASE_URL + '/inbox/ajax/send/" method="post" id="quick_publish" onsubmit="return false">'+
										'<input type="hidden" name="post_hash" value="' + G_POST_HASH + '" />'+
										'<input id="invite-input" class="form-control" type="text" placeholder="' + _t('搜索用户') + '" name="recipient" value="{{recipient}}" />'+
										'<div class="aw-dropdown">'+
											'<p class="title">' + _t('没有找到相关结果') + '</p>'+
											'<ul class="aw-dropdown-list">'+
											'</ul>'+
										'</div>'+
										'<textarea class="form-control" name="message" rows="3" placeholder="' + _t('私信内容...') + '"></textarea>'+
									'</form>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
									'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');">' + _t('发送') + '</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>',

			'editTopicBox' :
				'<div class="aw-edit-topic-box form-inline">'+
					'<input type="text" class="form-control" id="aw_edit_topic_title" autocomplete="off"  placeholder="' + _t('创建或搜索添加新话题') + '...">'+
					'<a class="btn btn-normal btn-success add">' + _t('添加') + '</a>'+
					'<a class="btn btn-normal btn-gray close-edit">' + _t('取消') + '</a>'+
					'<div class="aw-dropdown">'+
						'<p class="title">' + _t('没有找到相关结果') + '</p>'+
						'<ul class="aw-dropdown-list">'+
						'</ul>'+
					'</div>'+
				'</div>',

			'ajaxData' :
				'<div class="modal fade alert-box aw-topic-edit-note-box aw-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">{{title}}</h3>'+
							'</div>'+
							'<div class="modal-body">'+
								'{{data}}'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

			'commentBox' :
					'<div class="aw-comment-box" id="{{comment_form_id}}">'+
						'<div class="aw-comment-list"><p align="center" class="aw-padding10"><i class="aw-loading"></i></p></div>'+
						'<form action="{{comment_form_action}}" method="post" onsubmit="return false">'+
							'<div class="aw-comment-box-main">'+
								'<textarea class="aw-comment-txt form-control" rows="2" name="message" placeholder="' + _t('评论一下') + '..."></textarea>'+
								'<div class="aw-comment-box-btn">'+
									'<span class="pull-right">'+
										'<a href="javascript:;" class="btn btn-mini btn-success" onclick="AWS.User.save_comment($(this));">' + _t('评论') + '</a>'+
										'<a href="javascript:;" class="btn btn-mini btn-gray close-comment-box">' + _t('取消') + '</a>'+
									'</span>'+
								'</div>'+
							'</div>'+
						'</form>'+
					'</div>',

			'commentBoxClose' :
					'<div class="aw-comment-box" id="{{comment_form_id}}">'+
						'<div class="aw-comment-list"><p align="center" class="aw-padding10"><i class="aw-loading"></i></p></div>'+
					'</div>',

			'dropdownList' :
				'<div aria-labelledby="dropdownMenu" role="menu" class="aw-dropdown">'+
					'<ul class="aw-dropdown-list">'+
					'{{#items}}'+
						'<li><a data-value="{{id}}">{{title}}</a></li>'+
					'{{/items}}'+
					'</ul>'+
				'</div>',

			'reportBox' :
					'<div class="modal fade alert-box aw-share-box aw-share-box-message aw-report-box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content">'+
								'<div class="modal-header">'+
									'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
									'<h3 class="modal-title" id="myModalLabel">' + _t('举报问题') + '</h3>'+
								'</div>'+
								'<form id="quick_publish" method="post" action="' + G_BASE_URL + '/question/ajax/save_report/">'+
									'<input type="hidden" name="type" value="{{item_type}}" />'+
									'<input type="hidden" name="target_id" value="{{item_id}}" />'+
									'<div class="modal-body">'+
										'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
										'<textarea class="form-control" name="reason" rows="5" placeholder="' + _t('请填写举报理由') + '..."></textarea>'+
									'</div>'+
									'<div class="modal-footer">'+
										'<a data-dismiss="modal" aria-hidden="true" class="text-color-999">' + _t('取消') + '</a>'+
										'<button class="btn btn-large btn-success" onclick="AWS.ajax_post($(\'#quick_publish\'), AWS.ajax_processer, \'error_message\');return false;">' + _t('提交') + '</button>'+
									'</div>'+
								'</form>'+
							'</div>'+
						'</div>'+
					'</div>',

			'recommend' :
				'<div class="modal fade alert-box aw-recommend-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('推荐到帮助中心') + '</h3>'+
							'</div>'+
							'<form id="help_form" action="' + G_BASE_URL + '/help/ajax/add_data/" method="post" onsubmit="return false;">'+
							'<input type="hidden" name="item_id" value="{{item_id}}" />'+
							'<input type="hidden" name="item_type" value="{{question}}" />'+
							'<input type="hidden" name="item_type" value="{{article}}" />'+
							'<div class="mod">'+
							'<div class="modal-body clearfix">'+
								'<div class="alert alert-danger hide error_message"><i class="icon icon-delete"></i> <em></em></div>'+
								'<div class="mod-body">'+
									'<ul></ul>'+
								'</div>'+
							'</div>'+
							'</div>'+
							'<div class="modal-footer">'+
								'<button href="javascript:;"  data-dismiss="modal" aria-hidden="true" class="btn btn-normal btn-gray">' + _t('关闭') + '</button>'+
							'</div>'+
							'</form>'+
						'</div>'+
					'</div>'+
				'</div>',

			'searchDropdownListQuestions' :
				'<li class="{{active}} question clearfix"><i class="icon icon-bestbg pull-left"></i><a class="aw-hide-txt pull-left" href="{{url}}">{{content}} </a><span class="pull-right text-color-999">{{discuss_count}} ' + _t('个回复') + '</span></li>',
			'searchDropdownListTopics' :
				'<li class="topic clearfix"><span class="topic-tag" data-id="{{topic_id}}"><a href="{{url}}" class="text">{{name}}</a></span> <span class="pull-right text-color-999">{{discuss_count}} ' + _t('个讨论') + '</span></li>',
			'searchDropdownListUsers' :
				'<li class="user clearfix"><a href="{{url}}"><img src="{{img}}" />{{name}}<span class="aw-hide-txt">{{intro}}</span></a></li>',
			'searchDropdownListArticles' :
				'<li class="question clearfix"><a class="aw-hide-txt pull-left" href="{{url}}">{{content}} </a><span class="pull-right text-color-999">{{comments}} ' + _t('条评论') + '</span></li>',
			'inviteDropdownList' :
				'<li class="user"><a data-url="{{url}}" data-id="{{uid}}" data-actions="{{action}}" data-value="{{name}}"><img class="img" src="{{img}}" />{{name}}</a></li>',
			'editTopicDorpdownList' :
				'<li class="question"><a>{{name}}</a></li>',
			'questionRedirectList' :
				'<li class="question"><a class="aw-hide-txt" onclick="AWS.ajax_request({{url}})">{{name}}</a></li>',
			'questionDropdownList' :
				'<li class="question" data-id="{{id}}"><a class="aw-hide-txt" href="{{url}}">{{name}}</a></li>',

			'inviteUserList' :
				'<li>'+
					'<a class="pull-right btn btn-mini btn-default" onclick="disinvite_user($(this),{{uid}});$(this).parent().detach();">' + _t('取消邀请') + '</a>'+
					'<a class="aw-user-name" data-id="{{uid}}">'+
						'<img src="{{img}}" alt="" />'+
					'</a>'+
					'<span class="aw-text-color-666">{{name}}</span>'+
				'</li>',

			'educateInsert' :
					'<td class="e1" data-txt="{{school}}">{{school}}</td>'+
					'<td class="e2" data-txt="{{departments}}">{{departments}}</td>'+
					'<td class="e3" data-txt="{{year}}">{{year}} ' + _t('年') + '</td>'+
					'<td><a class="delete-educate">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="edit-educate">' + _t('编辑') + '</a></td>',

			'educateEdit' :
					'<td><input type="text" value="{{school}}" class="school form-control"></td>'+
					'<td><input type="text" value="{{departments}}" class="departments form-control"></td>'+
					'<td><select class="year edityear">'+
						'</select> ' + _t('年') + '</td>'+
					'<td><a class="delete-educate">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="add-educate">' + _t('保存') + '</a></td>',

			'workInsert' :
					'<td class="w1" data-txt="{{company}}">{{company}}</td>'+
					'<td class="w2" data-txt="{{jobid}}">{{work}}</td>'+
					'<td class="w3" data-s-val="{{syear}}" data-e-val="{{eyear}}">{{syear}} ' + _t('年') + ' ' + _t('至') + ' {{eyear}}</td>'+
					'<td><a class="delete-work">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="edit-work">' + _t('编辑') + '</a></td>',

			'workEidt' :
					'<td><input type="text" value="{{company}}" class="company form-control"></td>'+
					'<td>'+
						'<select class="work editwork">'+
						'</select>'+
					'</td>'+
					'<td><select class="syear editsyear">'+
						'</select>&nbsp;&nbsp;' + _t('年') + ' &nbsp;&nbsp; ' + _t('至') + '&nbsp;&nbsp;&nbsp;&nbsp;'+
						'<select class="eyear editeyear">'+
						'</select> ' + _t('年') +
					'</td>'+
					'<td><a class="delete-work">' + _t('删除') + '</a>&nbsp;&nbsp;<a class="add-work">' + _t('保存') + '</a></td>',

			'alertImg' :
				'<div class="modal fade alert-box aw-tips-box aw-alert-img-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
							'</div>'+
							'<div class="modal-body">'+
								'<p class="hide {{hide}}">{{message}}</p>'+
								'<img src="{{url}}" />'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

			'confirmBox' :
				'<div class="modal fade alert-box aw-confirm-box">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<a type="button" class="close icon icon-delete" data-dismiss="modal" aria-hidden="true"></a>'+
								'<h3 class="modal-title" id="myModalLabel">' + _t('提示信息') + '</h3>'+
							'</div>'+
							'<div class="modal-body">'+
								'{{message}}'+
							'</div>'+
							'<div class="modal-footer">'+
								'<a class="btn btn-gray" data-dismiss="modal" aria-hidden="true">取消</a>'+
								'<a class="btn btn-success yes">确定</a>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',

			// Modify by wecenter
			'ProjectForm' :
				'<div class="mod aw-project-return-form hide">'+
					'<form action="" method="" name="">'+
						'<div class="mod-body">'+
							'<dl class="clearfix">'+
								'<dt><strong>*</strong>回报标题:</dt>'+
								'<dd><input type="text" class="form-control form-normal title"/><label class="label label-danger hide">回报标题与支持额度至少填写一个</label></dd>'+
								'</dl>'+
							'<dl>'+
							'<dt><strong>*</strong>支持额度:</dt>'+
								'<dd><input type="text" class="form-control form-normal amount" name="" /> <label class="label label-danger hide">额度不能为空</label></dd>'+
							'</dl>'+
							'<dl class="clearfix">'+
								'<dt><strong>*</strong>回报内容:</dt>'+
								'<dd>'+
									'<textarea rows="5" class="form-control content"></textarea> <label class="label label-danger hide">回报内容不能为空</label>'+
								'</dd>'+
							'</dl>'+
							'<dl>'+
								'<dt><strong>*</strong>限定名额:</dt>'+
								'<dd>'+
										'<label>'+
											'<input type="radio" name="limit-num" class="limit-num-no" value="false" checked="checked" /> 否 '+
										'</label>'+
										'<label>'+
											'<input type="radio" name="limit-num" class="limit-num-yes" value="true"/> 是 '+
										'</label>'+
										'<label class="count hide">'+
											'<span class="pull-left">名额数量:</span>'+
											'<input type="text" class="form-control form-xs pull-left people-amount" name="" />'+
										'</label>'+
									'</dd>'+
								'</dl>'+
								'<dl>'+
									'<dt></dt>'+
									'<dd>'+
										'<a href="javascript:;" class="btn btn-primary btn-green save">保存</a>'+
										'<a href="javascript:;" class="btn btn-default cancel">取消</a>'+
									'</dd>'+
								'</dl>'+
							'</div>'+
						'</form>'+
					'</div>',
			// Modify by wecenter
			'activityBox' :
					'<div class="modal fade alert-box aw-topic-edit-note-box aw-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content">'+
									'<div class="kn-box vmod aw-publish-contact">'+
										'<label class="label label-danger hide"></label>'+
										'<div class="mod-head">'+
											'<p>'+
												'提示：提交审核后点名时间将在 3 个工作日内完成审核，请留意站内通知以及你的邮箱'+
											'</p>'+
										'</div>'+
										'<div class="mod-body">'+
											'<dl>'+
												'<dt><strong>*</strong>姓名:</dt>'+
												'<dd>'+
													'<input type="text" id="publish-name" class="form-control form-normal" name="contact[name]" value="{{contact_name}}" />'+
												'</dd>'+
											'</dl>'+
											'<dl>'+
												'<dt><strong>*</strong>手机:</dt>'+
												'<dd>'+
													'<input type="text" id="publish-tel" class="form-control form-normal" name="contact[mobile]" value="{{contact_tel}}" />'+
												'</dd>'+
											'</dl>'+
											'<dl>'+
												'<dt><strong>*</strong>QQ:</dt>'+
												'<dd>'+
													'<input type="text" id="publish-qq" class="form-control form-normal" name="contact[qq]" value="{{contact_qq}}" />'+
												'</dd>'+
											'</dl>'+
										'</div>'+
										'<div class="mod-footer">'+
										'<a class="btn btn-normal btn-success" >'+ '提交审核 '+ '</a>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>',

				'projectEventForm' :
				'<div class="modal fade alert-box aw-topic-edit-note-box aw-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content">'+
								'<div class="formBox">'+
									'<div class="title">'+
										'<h3>活动报名 <i class="icon icon-delete pull-right" data-dismiss="modal" aria-hidden="true"></i></h3>'+
									'</div>'+

									'<div class="main ">'+
										'<form class="form-horizontal" action="' + G_BASE_URL + '/project/ajax/add_product_order/" onsubmit="return false" role="form" id="projectEventForm" method="post">'+
										'<input type="hidden" name="project_id" value="{{project_id}}">'+
										 ' <div class="form-group">'+
										    '<label class="col-sm-4 control-label">真实姓名:</label>'+
										   ' <div class="col-sm-7">'+
										     ' <input type="text" class="form-control" name="name" value="{{contact_name}}" placeholder="' + _t('请务必实名') + '" >'+
										   ' </div>'+
										  '</div>'+
										 ' <div class="form-group">'+
										  '  <label  class="col-sm-4 control-label">手机:</label>'+
										    '<div class="col-sm-7">'+
										      '<input type="text" class="form-control" name="mobile" value="{{contact_tel}}" >'+
										   ' </div>'+
										 ' </div>'+
										 ' <div class="form-group">'+
										   ' <label  class="col-sm-4 control-label">邮箱:</label>'+
										   ' <div class="col-sm-7">'+
										      '<input type="text" class="form-control" name="email" value="{{contact_email}}" >'+
										    '</div>'+
										 ' </div>'+
										 ' <div class="form-group">'+
										   ' <label  class="col-sm-4 control-label">地址:</label>'+
										   ' <div class="col-sm-7">'+
										      '<input type="text" class="form-control" name="address" value="{{contact_address}}" placeholder="' + _t('完整收件地址') + '" >'+
										    '</div>'+
										 ' </div>'+
									'</form>'+
									'</div>'+
									'<div class="footer pull-right">'+
										'<a onclick="AWS.ajax_post($(\'#projectEventForm\'));">确定</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>',

				'projectStockForm' :
				'<div class="modal fade alert-box aw-topic-edit-note-box aw-question-edit" aria-labelledby="myModalLabel" role="dialog">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content">'+
								'<div class="formBox">'+
									'<div class="title">'+
										'<h3>预约投资 <i class="icon icon-delete pull-right" data-dismiss="modal" aria-hidden="true"></i></h3>'+
									'</div>'+

									'<div class="main ">'+
										'<form class="form-horizontal" action="' + G_BASE_URL + '/project/ajax/add_product_order/" onsubmit="return false" role="form" id="projectEventForm" method="post">'+
										'<input type="hidden" name="project_id" value="{{project_id}}">'+
										 ' <div class="form-group">'+
										    '<label  class="col-sm-4 control-label">预计投资:</label>'+
										   ' <div class="col-sm-7">'+
										     ' <input  type="text" class="form-control" name="amount" value="{{contact_money}}">'+
										    '</div>'+
										' </div>'+
										 ' <div class="form-group">'+
										    '<label class="col-sm-4 control-label">真实姓名:</label>'+
										   ' <div class="col-sm-7">'+
										     ' <input type="text" class="form-control" name="name" value="{{contact_name}}">'+
										   ' </div>'+
										  '</div>'+
										 ' <div class="form-group">'+
										  '  <label  class="col-sm-4 control-label">手机:</label>'+
										    '<div class="col-sm-7">'+
										      '<input type="text" class="form-control" name="mobile" value="{{contact_tel}}">'+
										   ' </div>'+
										 ' </div>'+
										 ' <div class="form-group">'+
										   ' <label  class="col-sm-4 control-label">邮箱:</label>'+
										   ' <div class="col-sm-7">'+
										      '<input type="text" class="form-control" name="email" value="{{contact_email}}" >'+
										    '</div>'+
										 ' </div>'+
									'</form>'+
									'</div>'+
									'<div class="footer pull-right">'+
										'<a onclick="ajax_post($(\'#projectEventForm\'));">确定</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'
		}


	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		var AWS =
		{
			//全局loading
			loading: function (type)
			{
				if (!$('#aw-loading').length)
				{
					$('#aw-ajax-box').append(AW_TEMPLATE.loadingBox);
				}

				if (type == 'show')
				{
					if ($('#aw-loading').css('display') == 'block')
					{
						return false;
					}

					$('#aw-loading').fadeIn();

					AWS.G.loading_timer = setInterval(function ()
					{
						AWS.G.loading_bg_count -= 1;

						$('#aw-loading-box').css('background-position', '0px ' + AWS.G.loading_bg_count * 40 + 'px');

						if (AWS.G.loading_bg_count == 1)
						{
							AWS.G.loading_bg_count = 12;
						}
					}, 100);
				}
				else
				{
					$('#aw-loading').fadeOut();

					clearInterval(AWS.G.loading_timer);
				}
			},

			loading_mini: function (selector, type)
			{
				if (!selector.find('#aw-loading-mini-box').length)
				{
					selector.append(AW_TEMPLATE.loadingMiniBox);
				}

				if (type == 'show')
				{
					selector.find('#aw-loading-mini-box').fadeIn();

					AWS.G.loading_timer = setInterval(function ()
					{
						AWS.G.loading_mini_bg_count -= 1;

						$('#aw-loading-mini-box').css('background-position', '0px ' + AWS.G.loading_mini_bg_count * 16 + 'px');

						if (AWS.G.loading_mini_bg_count == 1)
						{
							AWS.G.loading_mini_bg_count = 9;
						}
					}, 100);
				}
				else
				{
					selector.find('#aw-loading-mini-box').fadeOut();

					clearInterval(AWS.G.loading_timer);
				}
			},

			ajax_request: function(url, params)
			{
				AWS.loading('show');

				if (params)
				{
					$.post(url, params + '&_post_type=ajax', function (result)
					{
						_callback(result);
					}, 'json').error(function (error)
					{
						_error(error);
					});
				}
				else
				{
					$.get(url, function (result)
					{
						_callback(result);
					}, 'json').error(function (error)
					{
						_error(error);
					});
				}

				function _callback (result)
				{
					AWS.loading('hide');

					if (!result)
					{
						return false;
					}

					if (result.err)
					{
						AWS.alert(result.err);
					}
					else if (result.rsm && result.rsm.url)
					{
						window.location = decodeURIComponent(result.rsm.url);
					}
					else if (result.errno == 1)
					{
						window.location.reload();
					}
				}

				function _error (error)
				{
					AWS.loading('hide');

					if ($.trim(error.responseText) != '')
					{
						alert(_t('发生错误, 返回的信息:') + ' ' + error.responseText);
					}
				}

				return false;
			},

			ajax_post: function(formEl, processer, type) // 表单对象，用 jQuery 获取，回调函数名
			{
				// 若有编辑器的话就更新编辑器内容再提交
				if (typeof CKEDITOR != 'undefined')
				{
					for ( instance in CKEDITOR.instances ) {
						CKEDITOR.instances[instance].updateElement();
					}
				}

				if (typeof (processer) != 'function')
				{
					var processer = AWS.ajax_processer;

					AWS.loading('show');
				}

				if (!type)
				{
					var type = 'default';
				}
				else if (type == 'reply_question')
				{
					AWS.loading('show');

					$('.btn-reply').addClass('disabled');

					// 删除草稿绑定事件
					if (EDITOR != undefined)
					{
						EDITOR.removeListener('blur', EDITOR_CALLBACK);
					}
				}

				var custom_data = {
					_post_type: 'ajax'
				};

				formEl.ajaxSubmit(
				{
					dataType: 'json',
					data: custom_data,
					success: function (result)
					{
						processer(type, result);
					},
					error: function (error)
					{
						console.log(error);
						if ($.trim(error.responseText) != '')
						{
							AWS.loading('hide');

							alert(_t('发生错误, 返回的信息:') + ' ' + error.responseText);
						}
						else if (error.status == 0)
						{
							AWS.loading('hide');

							alert(_t('网络链接异常'));
						}
						else if (error.status == 500)
						{
							AWS.loading('hide');

							alert(_t('内部服务器错误'));
						}
					}
				});
			},

			// ajax提交callback
			ajax_processer: function (type, result)
			{
				AWS.loading('hide');

				if (typeof (result.errno) == 'undefined')
				{
					AWS.alert(result);
				}
				else if (result.errno != 1)
				{
					switch (type)
					{
						case 'default':
						case 'comments_form':
						case 'reply':
						case 'reply_question':
							AWS.alert(result.err);

							$('.aw-comment-box-btn .btn-success, .btn-reply').removeClass('disabled');
						break;

						case 'ajax_post_alert':
						case 'ajax_post_modal':
						case 'error_message':
							if (!$('.error_message').length)
							{
								alert(result.err);
							}
							else if ($('.error_message em').length)
							{
								$('.error_message em').html(result.err);
							}
							else
							{
								 $('.error_message').html(result.err);
							}

							if ($('.error_message').css('display') != 'none')
							{
								AWS.shake($('.error_message'));
							}
							else
							{
								$('.error_message').fadeIn();
							}

							if ($('#captcha').length)
							{
								$('#captcha').click();
							}
						break;
					}
				}
				else
				{
					if (type == 'comments_form')
					{
						AWS.reload_comments_list(result.rsm.item_id, result.rsm.item_id, result.rsm.type_name);
						$('#aw-comment-box-' + result.rsm.type_name + '-' + result.rsm.item_id + ' form textarea').val('');
						$('.aw-comment-box-btn .btn-success').removeClass('disabled');
					}

					if (result.rsm && result.rsm.url)
					{
						// 判断返回url跟当前url是否相同
						if (window.location.href == result.rsm.url)
						{
							window.location.reload();
						}
						else
						{
							window.location = decodeURIComponent(result.rsm.url);
						}
					}
					else
					{
						switch (type)
						{
							case 'default':
							case 'ajax_post_alert':
							case 'error_message':
								window.location.reload();
							break;

							case 'ajax_post_modal':
								$('#aw-ajax-box div.modal').modal('hide');
							break;

							// 问题回复
							case 'reply_question':
								AWS.loading('hide');

								if (result.rsm.ajax_html)
								{
									$('.aw-feed-list').append(result.rsm.ajax_html);

									$('.aw-comment-box-btn .btn-success, .btn-reply').removeClass('disabled');

									$.scrollTo($('#' + $(result.rsm.ajax_html).attr('id')), 600, {queue:true});

									// 问题
									$('.question_answer_form').detach();

									if ($('.aw-replay-box.question').length)
									{
										if (USER_ANSWERED)
										{
											$('.aw-replay-box').append('<p align="center">一个问题只能回复一次, 你可以在发言后 ' + ANSWER_EDIT_TIME + ' 分钟内编辑回复过的内容</p>');
										}
									}
								}
								else if(result.rsm.url)
								{
									window.location = decodeURIComponent(result.rsm.url);
								}
								else
								{
									window.location.reload();
								}
							break;
							// 文章回复
							case 'reply':
								AWS.loading('hide');

								if (result.rsm.ajax_html)
								{
									$('.aw-feed-list').append(result.rsm.ajax_html);

									$('.aw-comment-box-btn .btn-success, .btn-reply').removeClass('disabled');

									$.scrollTo($('#' + $(result.rsm.ajax_html).attr('id')), 600, {queue:true});

									// 文章
									$('#comment_editor').val('');
								}
								else if(result.rsm.url)
								{
									window.location = decodeURIComponent(result.rsm.url);
								}
								else
								{
									window.location.reload();
								}
							break;
						}
					}
				}
			},

			// 加载更多
			load_list_view: function(url, selector, container, start_page, callback)
			{
				if (!selector.attr('id'))
				{
					return false;
				}

				if (!start_page)
				{
					start_page = 0
				}

				// 把页数绑定在元素上面
				if (selector.attr('data-page') == undefined)
				{
					selector.attr('data-page', start_page);
				}
				else
				{
					selector.attr('data-page', parseInt(selector.attr('data-page')) + 1);
				}

				selector.bind('click', function ()
				{
					var _this = this;

					$(this).addClass('loading');

					$.get(url + '__page-' + $(_this).attr('data-page'), function (result)
					{
						$(_this).removeClass('loading');

						if ($.trim(result) != '')
						{
							if ($(_this).attr('data-page') == start_page && $(_this).attr('auto-load') != 'false')
							{
								container.html(result);
							}
							else
							{
								container.append(result);
							}

							// 页数增加1
							$(_this).attr('data-page', parseInt($(_this).attr('data-page')) + 1);
						}
						else
						{
							//没有内容
							if ($(_this).attr('data-page') == start_page && $(_this).attr('auto-load') != 'false')
							{
								container.html('<p style="padding: 15px 0" align="center">' + _t('没有内容') + '</p>');
							}

							$(_this).addClass('disabled').unbind('click').bind('click', function () { return false; });

							$(_this).find('span').html(_t('没有更多了'));
						}

						if (callback != null)
						{
							callback();
						}
					});

					return false;
				});

				// 自动加载
				if (selector.attr('auto-load') != 'false')
				{
					selector.click();
				}
			},

			// 重新加载评论列表
			reload_comments_list: function(item_id, element_id, type_name)
			{
				$('#aw-comment-box-' + type_name + '-' + element_id + ' .aw-comment-list').html('<p align="center" class="aw-padding10"><i class="aw-loading"></i></p>');

				$.get(G_BASE_URL + '/question/ajax/get_' + type_name + '_comments/' + type_name + '_id-' + item_id, function (data)
				{
					$('#aw-comment-box-' + type_name + '-' + element_id + ' .aw-comment-list').html(data);
				});
			},

			// 警告弹窗
			alert: function (text)
			{
				if ($('.alert-box').length)
				{
					$('.alert-box').remove();
				}

				$('#aw-ajax-box').append(Hogan.compile(AW_TEMPLATE.alertBox).render(
				{
					message: text
				}));

				$(".alert-box").modal('show');
			},

			/**
			 *	公共弹窗
			 *	publish     : 发起
			 *	redirect    : 问题重定向
			 *	imageBox    : 插入图片
			 *	videoBox    : 插入视频
			 *  linkbox     : 插入链接
			 *	commentEdit : 评论编辑
			 *  favorite    : 评论添加收藏
			 *	inbox       : 私信
			 *  report      : 举报问题
			 */
			dialog: function (type, data, callback)
			{
				switch (type)
				{
					case 'alertImg':
						var template = Hogan.compile(AW_TEMPLATE.alertImg).render(
						{
							'hide': data.hide,
							'url': data.url,
							'message': data.message
						});
					break;

					case 'publish':
						var template = Hogan.compile(AW_TEMPLATE.publishBox).render(
						{
							'category_id': data.category_id,
							'ask_user_id': data.ask_user_id
						});
					break;

					case 'redirect':
						var template = Hogan.compile(AW_TEMPLATE.questionRedirect).render(
						{
							'data_id': data
						});
					break;

					case 'commentEdit':
						var template = Hogan.compile(AW_TEMPLATE.editCommentBox).render(
						{
							'answer_id': data.answer_id,
							'attach_access_key': data.attach_access_key
						});
					break;

					case 'favorite':
						var template = Hogan.compile(AW_TEMPLATE.favoriteBox).render(
						{
							 'item_id': data.item_id,
							 'item_type': data.item_type
						});
					break;

					case 'inbox':
						var template = Hogan.compile(AW_TEMPLATE.inbox).render(
						{
							'recipient': data
						});
					break;

					case 'report':
						var template = Hogan.compile(AW_TEMPLATE.reportBox).render(
						{
							'item_type': data.item_type,
							'item_id': data.item_id
						});
					break;

					case 'topicEditHistory':
						var template = AW_TEMPLATE.ajaxData.replace('{{title}}', _t('编辑记录')).replace('{{data}}', data);
					break;

					case 'ajaxData':
						var template = AW_TEMPLATE.ajaxData.replace('{{title}}', data.title).replace('{{data}}', '<div id="aw_dialog_ajax_data"></div>');
					break;

					case 'imagePreview':
						var template = AW_TEMPLATE.ajaxData.replace('{{title}}', data.title).replace('{{data}}', '<p align="center"><img src="' + data.image + '" alt="" style="max-width:520px" /></p>');
					break;

					case 'confirm':
						var template = Hogan.compile(AW_TEMPLATE.confirmBox).render(
						{
							'message': data.message
						});
					break;

					case 'recommend':
						var template = Hogan.compile(AW_TEMPLATE.recommend).render();
					break;

					// modify by wecenter 活动模块
					case 'projectEventForm':
						var template = Hogan.compile(AW_TEMPLATE.projectEventForm).render(
						{
							'project_id': data.project_id,
							'contact_name': data.contact_name,
							'contact_tel': data.contact_tel,
							'contact_email': data.contact_email
						});
					break;

					case 'projectStockForm':
						var template = Hogan.compile(AW_TEMPLATE.projectStockForm).render(
						{
							'project_id': data.project_id,
							'contact_name': data.contact_name,
							'contact_tel': data.contact_tel,
							'contact_email': data.contact_email
						});
					break;

					case 'activityBox':
						var template = Hogan.compile(AW_TEMPLATE.activityBox).render(
						{
							'contact_name': data.contact_name,
							'contact_tel': data.contact_tel,
							'contact_qq': data.contact_qq
						});

					break;
				}

				if (template)
				{
					if ($('.alert-box').length)
					{
						$('.alert-box').remove();
					}

					$('#aw-ajax-box').html(template).show();

					switch (type)
					{
						case 'redirect' :
							AWS.Dropdown.bind_dropdown_list($('.aw-question-redirect-box #question-input'), 'redirect');
						break;

						case 'inbox' :
							AWS.Dropdown.bind_dropdown_list($('.aw-inbox #invite-input'), 'inbox');
							//私信用户下拉点击事件
							$(document).on('click','.aw-inbox .aw-dropdown-list li a',function() {
								$('.alert-box #quick_publish input.form-control').val($(this).text());
								$(this).parents('.aw-dropdown').hide();
							});
						break;

						case 'publish':
							AWS.Dropdown.bind_dropdown_list($('.aw-publish-box #quick_publish_question_content'), 'publish');
							AWS.Dropdown.bind_dropdown_list($('.aw-publish-box #aw_edit_topic_title'), 'topic');
							if (parseInt(data.category_enable) == 1)
							{
								$.get(G_BASE_URL + '/publish/ajax/fetch_question_category/', function (result)
								{
									AWS.Dropdown.set_dropdown_list('.aw-publish-box .dropdown', eval(result), data.category_id);

									$('.aw-publish-title .dropdown li a').click(function ()
									{
										$('.aw-publish-box #quick_publish_category_id').val($(this).attr('data-value'));
										$('.aw-publish-box #aw-topic-tags-select').html($(this).text());
									});
								});
							}
							else
							{
								$('.aw-publish-box .aw-publish-title').hide();
							}

							if (data.ask_user_id != '' && data.ask_user_id != undefined)
							{
								$('.aw-publish-box .modal-title').html('向 ' + data.ask_user_name + ' 提问');
							}

							if ($('#aw-search-query').val() && $('#aw-search-query').val() != $('#aw-search-query').attr('placeholder'))
							{
								$('#quick_publish_question_content').val($('#aw-search-query').val());
							}

							AWS.Init.init_topic_edit_box('#quick_publish .aw-edit-topic');

							$('#quick_publish .aw-edit-topic').click();

							$('#quick_publish .close-edit').hide();

							if (data.topic_title)
							{
								$('#quick_publish .aw-edit-topic').parents('.aw-topic-bar').prepend('<span class="topic-tag"><a class="text">' + data.topic_title + '</a><a class="close" onclick="$(this).parents(\'.topic-tag\').detach();"><i class="icon icon-delete"></i></a><input type="hidden" value="' + data.topic_title + '" name="topics[]" /></span>')
							}

							if (typeof(G_QUICK_PUBLISH_HUMAN_VALID) != 'undefined')
							{
								$('#quick_publish_captcha').show();
								$('#captcha').click();
							}
						break;

						case 'favorite':
							$.get(G_BASE_URL + '/favorite/ajax/get_favorite_tags/', function (result)
							{
								var html = ''

								$.each(result, function (i, e)
								{
									html += '<li><a data-value="' + e['title'] + '"><span class="title">' + e['title'] + '</span></a><i class="icon icon-followed"></i></li>';
								});

								$('.aw-favorite-tag-list ul').append(html);

								$.post(G_BASE_URL + '/favorite/ajax/get_item_tags/', {
									'item_id' : $('#favorite_form input[name="item_id"]').val(),
									'item_type' : $('#favorite_form input[name="item_type"]').val()
								}, function (result)
								{
									if (result != null)
									{
										$.each(result, function (i, e)
										{
											var index = i;

											$.each($('.aw-favorite-tag-list ul li .title'), function (i, e)
											{
												if ($(this).text() == result[index])
												{
													$(this).parents('li').addClass('active');
												}
											});
										});
									}
								}, 'json');

								$(document).on('click', '.aw-favorite-tag-list ul li a', function()
								{
									var _this = this,
										addClassFlag = true, url = G_BASE_URL + '/favorite/ajax/update_favorite_tag/';

									if ($(this).parents('li').hasClass('active'))
									{
										url = G_BASE_URL + '/favorite/ajax/remove_favorite_tag/';

										addClassFlag = false;
									}

									$.post(url,
									{
										'item_id' : $('#favorite_form input[name="item_id"]').val(),
										'item_type' : $('#favorite_form input[name="item_type"]').val(),
										'tags' : $(_this).attr('data-value')
									}, function (result)
									{
										if (result.errno == 1)
										{
											if (addClassFlag)
											{
												$(_this).parents('li').addClass('active');
											}
											else
											{
												$(_this).parents('li').removeClass('active');
											}
										}
									}, 'json');
								});

							}, 'json');
						break;

						case 'report':
							$('.aw-report-box select option').click(function ()
							{
								$('.aw-report-box textarea').text($(this).attr('value'));
							});
						break;

						case 'commentEdit':
							$.get(G_BASE_URL + '/question/ajax/fetch_answer_data/' + data.answer_id, function (result)
							{
								$('#editor_reply').html(result.answer_content.replace('&amp;', '&'));

								var editor = CKEDITOR.replace( 'editor_reply' );

								if (UPLOAD_ENABLE == 'Y')
								{
									var fileupload = new FileUpload('file', '.aw-edit-comment-box .aw-upload-box .btn', '.aw-edit-comment-box .aw-upload-box .upload-container', G_BASE_URL + '/publish/ajax/attach_upload/id-answer__attach_access_key-' + ATTACH_ACCESS_KEY, {'insertTextarea': '.aw-edit-comment-box #editor_reply', 'editor' : editor});

									$.post(G_BASE_URL + '/publish/ajax/answer_attach_edit_list/', 'answer_id=' + data.answer_id, function (data) {
										if (data['err']) {
											return false;
										} else {
											$.each(data['rsm']['attachs'], function (i, v) {
												fileupload.setFileList(v);
											});
										}
									}, 'json');
								}
								else
								{
									$('.aw-edit-comment-box .aw-file-upload-box').hide();
								}
							}, 'json');
						break;

						case 'ajaxData':
							$.get(data.url, function (result) {
								$('#aw_dialog_ajax_data').html(result);
							});
						break;

						case 'confirm':
							$('.aw-confirm-box .yes').click(function()
							{
								if (callback)
								{
									callback();
								}

								$(".alert-box").modal('hide');

								return false;
							});
						break;

						case 'recommend':
							$.get(G_BASE_URL + '/help/ajax/list/', function (result)
							{
								if (result && result != 0)
								{
									var html = '';

									$.each(result, function (i, e)
									{
										html += '<li class="aw-border-radius-5"><img class="aw-border-radius-5" src="' + e.icon + '"><a data-id="' + e.id + '" class="aw-hide-txt">' + e.title + '</a><i class="icon icon-followed"></i></li>'
									});

									$('.aw-recommend-box ul').append(html);

									$.each($('.aw-recommend-box ul li'), function (i, e)
									{
										if (data.focus_id == $(this).find('a').attr('data-id'))
										{
											$(this).addClass('active');
										}
									});

									$(document).on('click', '.aw-recommend-box ul li a', function()
									{
										var _this = $(this), url = G_BASE_URL + '/help/ajax/add_data/', removeClass = false;

										if ($(this).parents('li').hasClass('active'))
										{
											url =  G_BASE_URL + '/help/ajax/remove_data/';

											removeClass = true;
										}

										$.post(url,
										{
											'item_id' : data.item_id,
											'id' : _this.attr('data-id'),
											'title' : _this.text(),
											'type' : data.type
										}, function (result)
										{
											if (result.errno == 1)
											{
												if (removeClass)
												{
													_this.parents('li').removeClass('active');
												}
												else
												{
													$('.aw-recommend-box ul li').removeClass('active');

													_this.parents('li').addClass('active');
												}
											}
										}, 'json');
									});
								}
								else
								{
									$('.error_message').html(_t('请先去后台创建好章节'));

									if ($('.error_message').css('display') != 'none')
									{
										AWS.shake($('.error_message'));
									}
									else
									{
										$('.error_message').fadeIn();
									}
								}
							}, 'json');
						break;
					}

					$(".alert-box").modal('show');
				}
			},

			// 兼容placeholder
			check_placeholder: function(selector)
			{
				$.each(selector, function()
				{
					if (typeof ($(this).attr("placeholder")) != "undefined")
					{
						$(this).attr('data-placeholder', 'true');

						if ($(this).val() == '')
						{
							$(this).addClass('aw-placeholder').val($(this).attr("placeholder"));
						}

						$(this).focus(function () {
							if ($(this).val() == $(this).attr('placeholder'))
							{
								$(this).removeClass('aw-placeholder').val('');
							}
						});

						$(this).blur(function () {
							if ($(this).val() == '')
							{
								$(this).addClass('aw-placeholder').val($(this).attr('placeholder'));
							}
						});
					}
				});
			},

			// 回复背景高亮
			hightlight: function(selector, class_name)
			{
				if (selector.hasClass(class_name))
				{
					return true;
				}

				var hightlight_timer_front = setInterval(function ()
				{
					selector.addClass(class_name);
				}, 500);

				var hightlight_timer_background = setInterval(function ()
				{
					selector.removeClass(class_name);
				}, 600);

				setTimeout(function ()
				{
					clearInterval(hightlight_timer_front);
					clearInterval(hightlight_timer_background);

					selector.addClass(class_name);
				}, 1200);

				setTimeout(function ()
				{
					selector.removeClass(class_name);
				}, 6000);
			},

			nl2br: function(str)
			{
				return str.replace(new RegExp("\r\n|\n\r|\r|\n", "g"), "<br />");
			},

			content_switcher: function(hide_el, show_el)
			{
				hide_el.hide();
				show_el.fadeIn();
			},

			htmlspecialchars: function(text)
			{
				return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
			},

			/*
			 * 用户头像提示box效果
			 *  @params
			 *  type : user/topic
			 *	nTop    : 焦点到浏览器上边距
			 *	nRight  : 焦点到浏览器右边距
			 *	nBottom : 焦点到浏览器下边距
			 *	left    : 焦点距离文档左偏移量
			 *	top     : 焦点距离文档上偏移量
			 **
			 */
			show_card_box: function(selector, type, time) //selector -> .aw-user-name/.topic-tag
			{
				if (!time)
				{
					var time = 300;
				}

				$(document).on('mouseover', selector, function ()
				{
					clearTimeout(AWS.G.card_box_hide_timer);
					var _this = $(this);
					AWS.G.card_box_show_timer = setTimeout(function ()
					{
						//判断用户id or 话题id 是否存在
						if (_this.attr('data-id'))
						{
							 switch (type)
							{
								case 'user' :
									//检查是否有缓存
									if (AWS.G.cashUserData.length == 0)
									{
										_getdata('user', '/people/ajax/user_info/uid-');
									}
									else
									{
										var flag = 0;
										//遍历缓存中是否含有此id的数据
										_checkcash('user');
										if (flag == 0)
										{
											_getdata('user', '/people/ajax/user_info/uid-');
										}
									}
								break;

								case 'topic' :
									//检查是否有缓存
									if (AWS.G.cashTopicData.length == 0)
									{
										_getdata('topic', '/topic/ajax/topic_info/topic_id-');
									}
									else
									{
										var flag = 0;
										//遍历缓存中是否含有此id的数据
										_checkcash('topic');
										if (flag == 0)
										{
											_getdata('topic', '/topic/ajax/topic_info/topic_id-');
										}
									}
								break;
							}
						}

						//获取数据
						function _getdata(type, url)
						{
							if (type == 'user')
							{
								$.get(G_BASE_URL + url + _this.attr('data-id'), function(result)
								{
									var focus = result.focus, verified = result.verified, focusTxt;

									if (focus == 1)
									{
										focus = 'active';
										focusTxt = '取消关注';
									}
									else
									{
										focus = '';
										focusTxt = '关注';
									}

									if(result.verified == 'enterprise')
									{
										verified_enterprise = 'icon-v i-ve';
										verified_title = '企业认证';
									}
									else if(result.verified == 'personal')
									{
										verified_enterprise = 'icon-v';
										verified_title = '个人认证';
									}
									else
									{
										verified_enterprise = verified_title = '';
									}

									//动态插入盒子
									$('#aw-ajax-box').html(Hogan.compile(AW_TEMPLATE.userCard).render(
									{
										'verified_enterprise' : verified_enterprise,
										'verified_title' : verified_title,
										'uid': result.uid,
										'avatar_file': result.avatar_file,
										'user_name': result.user_name,
										'reputation': result.reputation,
										'agree_count': result.agree_count,
										'signature': result.signature,
										'url' : result.url,
										'category_enable' : result.category_enable,
										'focus': focus,
										'focusTxt': focusTxt,
										'ask_name': "'" + result.user_name + "'",
										'fansCount': result.fans_count
									}));

									//判断是否为游客or自己
									if (G_USER_ID == '' || G_USER_ID == result.uid || result.uid < 0)
									{
										$('#aw-card-tips .mod-footer').hide();
									}
									_init();
									//缓存
									AWS.G.cashUserData.push($('#aw-ajax-box').html());
								}, 'json');
							}
							if (type == 'topic')
							{
								$.get(G_BASE_URL + url + _this.attr('data-id'), function(result)
								{
									var focus = result.focus,
										focusTxt;
										if (focus == false)
										{
											focus = '';
											focusTxt = _t('关注');
										}
										else
										{
											focus = 'active';
											focusTxt = _t('取消关注');
										}
										//动态插入盒子
										$('#aw-ajax-box').html(Hogan.compile(AW_TEMPLATE.topicCard).render(
										{
											'topic_id': result.topic_id,
											'topic_pic': result.topic_pic,
											'topic_title': result.topic_title,
											'topic_description': result.topic_description,
											'discuss_count': result.discuss_count,
											'focus_count': result.focus_count,
											'focus': focus,
											'focusTxt': focusTxt,
											'url' : result.url,
											'fansCount': result.fans_count
										}));
										//判断是否为游客
										if (G_USER_ID == '')
										{
											$('#aw-card-tips .mod-footer .follow').hide();
										}
										_init();
										//缓存
										AWS.G.cashTopicData.push($('#aw-ajax-box').html());
								}, 'json');
							}
						}

						//检测缓存
						function _checkcash(type)
						{
							if (type == 'user')
							{
								$.each(AWS.G.cashUserData, function (i, a)
								{
									if (a.match('data-id="' + _this.attr('data-id') + '"'))
									{
										$('#aw-ajax-box').html(a);
										$('#aw-card-tips').removeAttr('style');
										_init();
										flag = 1;
									}
								});
							}
							if (type == 'topic')
							{

								$.each(AWS.G.cashTopicData, function (i, a)
								{
									if (a.match('data-id="' + _this.attr('data-id') + '"'))
									{
										$('#aw-ajax-box').html(a);
										$('#aw-card-tips').removeAttr('style');
										_init();
										flag = 1;
									}
								});
							}
						}

						//初始化
						function _init()
						{
							var left = _this.offset().left,
								top = _this.offset().top + _this.height() + 5,
								nTop = _this.offset().top - $(window).scrollTop();

							//判断下边距离不足情况
							if (nTop + $('#aw-card-tips').innerHeight() > $(window).height())
							{
								top = _this.offset().top - ($('#aw-card-tips').innerHeight()) - 10;
							}

							//判断右边距离不足情况
							if (left + $('#aw-card-tips').innerWidth() > $(window).width())
							{
								left = _this.offset().left - $('#aw-card-tips').innerWidth() + _this.innerWidth();
							}

							$('#aw-card-tips').css(
							{
								left: left,
								top: top
							}).fadeIn();
						}
					}, time);
				});

				$(document).on('mouseout', selector, function ()
				{
					clearTimeout(AWS.G.card_box_show_timer);
					AWS.G.card_box_hide_timer = setTimeout(function ()
					{
						$('#aw-card-tips').fadeOut();
					}, 600);
				});
			},

			// @人功能
			at_user_lists: function(selector, limit) {
				$(selector).keyup(function (e) {
					var _this = $(this),
						flag = _getCursorPosition($(this)[0]).start;
					if ($(this).val().charAt(flag - 1) == '@')
					{
						_init();
						$('#aw-ajax-box .content_cursor').html($(this).val().substring(0, flag));
					} else
					{
						var lis = $('.aw-invite-dropdown li');
						switch (e.which)
						{
							case 38:
								var _index;
								if (!lis.hasClass('active'))
								{
									lis.eq(lis.length - 1).addClass('active');
								}
								else
								{
									$.each(lis, function (i, e)
									{
										if ($(this).hasClass('active'))
										{
											$(this).removeClass('active');
											if ($(this).index() == 0)
											{
												_index = lis.length - 1;
											}
											else
											{
												_index = $(this).index() - 1;
											}
										}
									});
									lis.eq(_index).addClass('active');
								}
								break;
							case 40:
								var _index;
								if (!lis.hasClass('active'))
								{
									lis.eq(0).addClass('active');
								}
								else
								{
									$.each(lis, function (i, e)
									{
										if ($(this).hasClass('active'))
										{
											$(this).removeClass('active');
											if ($(this).index() == lis.length - 1)
											{
												_index = 0;
											}
											else
											{
												_index = $(this).index() + 1;
											}
										}
									});
									lis.eq(_index).addClass('active');
								}
								break;
							case 13:
								$.each($('.aw-invite-dropdown li'), function (i, e)
								{
									if ($(this).hasClass('active'))
									{
										$(this).click();
									}
								});
								break;
							default:
								if ($('.aw-invite-dropdown')[0])
								{
									var ti = 0;
									for (var i = flag; i > 0; i--)
									{
										if ($(this).val().charAt(i) == "@")
										{
											ti = i;
											break;
										}
									}
									$.get(G_BASE_URL + '/search/ajax/search/?type=users&q=' + encodeURIComponent($(this).val().substring(flag, ti).replace('@', '')) + '&limit=' + limit, function (result)
									{
										if ($('.aw-invite-dropdown')[0])
										{
											if (result.length != 0)
											{
												var html = '';

												$('.aw-invite-dropdown').html('');

												$.each(result, function (i, a)
												{
													html += '<li><img src="' + a.detail.avatar_file + '"/><a>' + a.name + '</a></li>'
												});

												$('.aw-invite-dropdown').append(html);

												_display();

												$('.aw-invite-dropdown li').click(function ()
												{
													_this.val(_this.val().substring(0, ti) + '@' + $(this).find('a').html() + " ").focus();
													$('.aw-invite-dropdown').detach();
												});
											}
											else
											{
												$('.aw-invite-dropdown').hide();
											}
										}
										if (_this.val().length == 0)
										{
											$('.aw-invite-dropdown').hide();
										}
									}, 'json');
								}
						}
					}
				});

				$(selector).keydown(function (e) {
					var key = e.which;
					if ($('.aw-invite-dropdown').is(':visible')) {
						if (key == 38 || key == 40 || key == 13) {
							return false;
						}
					}
				});

				//初始化插入定位符
				function _init() {
					if (!$('.content_cursor')[0]) {
						$('#aw-ajax-box').append('<span class="content_cursor"></span>');
					}
					$('#aw-ajax-box').find('.content_cursor').css({
						'left': parseInt($(selector).offset().left + parseInt($(selector).css('padding-left')) + 2),
						'top': parseInt($(selector).offset().top + parseInt($(selector).css('padding-left')))
					});
					if (!$('.aw-invite-dropdown')[0])
					{
						$('#aw-ajax-box').append('<ul class="aw-invite-dropdown"></ul>');
					}
				};

				//初始化列表和三角型
				function _display() {
					$('.aw-invite-dropdown').css({
						'left': $('.content_cursor').offset().left + $('.content_cursor').innerWidth(),
						'top': $('.content_cursor').offset().top + 24
					}).show();
				};

				//获取当前textarea光标位置
				function _getCursorPosition(textarea)
				{
					var rangeData = {
						text: "",
						start: 0,
						end: 0
					};

					textarea.focus();

					if (textarea.setSelectionRange) { // W3C
						rangeData.start = textarea.selectionStart;
						rangeData.end = textarea.selectionEnd;
						rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
					} else if (document.selection) { // IE
						var i,
							oS = document.selection.createRange(),
							// Don't: oR = textarea.createTextRange()
							oR = document.body.createTextRange();
						oR.moveToElementText(textarea);

						rangeData.text = oS.text;
						rangeData.bookmark = oS.getBookmark();

						// object.moveStart(sUnit [, iCount])
						// Return Value: Integer that returns the number of units moved.
						for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
							// Why? You can alert(textarea.value.length)
							if (textarea.value.charAt(i) == '\n') {
								i++;
							}
						}
						rangeData.start = i;
						rangeData.end = rangeData.text.length + rangeData.start;
					}

					return rangeData;
				};
			},

			// 错误提示效果
			shake: function(selector)
			{
				var length = 6;
				selector.css('position', 'relative');
				for (var i = 1; i <= length; i++)
				{
					if (i % 2 == 0)
					{
						if (i == length)
						{
							selector.animate({ 'left': 0 }, 50);
						}
						else
						{
							selector.animate({ 'left': 10 }, 50);
						}
					}
					else
					{
						selector.animate({ 'left': -10 }, 50);
					}
				}
			}
		}

		// 全局变量
		AWS.G =
		{
			cashUserData: [],
			cashTopicData: [],
			card_box_hide_timer: '',
			card_box_show_timer: '',
			dropdown_list_xhr: '',
			loading_timer: '',
			loading_bg_count: 12,
			loading_mini_bg_count: 9,
			notification_timer: ''
		}

		AWS.User =
		{
			// 关注
			follow: function(selector, type, data_id)
			{
				if (selector.html())
				{
					if (selector.hasClass('active'))
					{
						selector.find('span').html(_t('关注'));

						selector.find('b').html(parseInt(selector.find('b').html()) - 1);
					}
					else
					{
						selector.find('span').html(_t('取消关注'));

						selector.find('b').html(parseInt(selector.find('b').html()) + 1);
					}
				}
				else
				{
					if (selector.hasClass('active'))
					{
						selector.attr('data-original-title', _t('关注'));
					}
					else
					{
						selector.attr('data-original-title', _t('取消关注'));
					}
				}

				selector.addClass('disabled');

				switch (type)
				{
					case 'question':
						var url = '/question/ajax/focus/';

						var data = {
							'question_id': data_id
						};

						break;

					case 'topic':
						var url = '/topic/ajax/focus_topic/';

						var data = {
							'topic_id': data_id
						};

						break;

					case 'user':
						var url = '/follow/ajax/follow_people/';

						var data = {
							'uid': data_id
						};

						break;
				}

				$.post(G_BASE_URL + url, data, function (result)
				{
					if (result.errno == 1)
					{
						if (result.rsm.type == 'add')
						{
							selector.addClass('active');
						}
						else
						{
							selector.removeClass('active');
						}
					}
					else
					{
						if (result.err)
						{
							AWS.alert(result.err);
						}

						if (result.rsm.url)
						{
							window.location = decodeURIComponent(result.rsm.url);
						}
					}

					selector.removeClass('disabled');

				}, 'json');
			},

			share_out: function(options)
			{
				var url = options.url || window.location.href, pic = '';

				if (options.title)
				{
					var title = options.title + ' - ' + G_SITE_NAME;
				}
				else
				{
					var title = $('title').text();
				}

				shareURL = 'http://www.jiathis.com/send/?webid=' + options.webid + '&url=' + url + '&title=' + title +'';

				if (options.content)
				{
					if ($(options.content).find('img').length)
					{
						shareURL = shareURL + '&pic=' + $(options.content).find('img').eq(0).attr('src');
					}
				}

				window.open(shareURL);
			},

			// 删除草稿
			delete_draft: function(item_id, type)
			{
				if (type == 'clean')
				{
					$.post(G_BASE_URL + '/account/ajax/delete_draft/', 'type=' + type, function (result)
					{
						if (result.errno != 1)
						{
							AWS.alert(result.err);
						}
					}, 'json');
				}
				else
				{
					$.post(G_BASE_URL + '/account/ajax/delete_draft/', 'item_id=' + item_id + '&type=' + type, function (result)
					{
						if (result.errno != 1)
						{
							AWS.alert(result.err);
						}
					}, 'json');
				}
			},

			// 赞成投票
			agree_vote: function(selector, user_name, answer_id)
			{
				$.post(G_BASE_URL + '/question/ajax/answer_vote/', 'answer_id=' + answer_id + '&value=1');

				// 判断是否投票过
				if ($(selector).parents('.aw-item').find('.aw-agree-by').text().match(user_name))
				{
					$.each($(selector).parents('.aw-item').find('.aw-user-name'), function (i, e)
					{
						if ($(e).html() == user_name)
						{
							if ($(e).prev())
							{
								$(e).prev().remove();
							}
							else
							{
								$(e).next().remove();
							}

							$(e).remove();
						}
					});

					$(selector).removeClass('active');

					if (parseInt($(selector).parents('.operate').find('.count').html()) != 0)
					{
						$(selector).parents('.operate').find('.count').html(parseInt($(selector).parents('.operate').find('.count').html()) - 1);
					}

					if ($(selector).parents('.aw-item').find('.aw-agree-by a').length == 0)
					{
						$(selector).parents('.aw-item').find('.aw-agree-by').hide();
					}
				}
				else
				{
					// 判断是否第一个投票
					if ($(selector).parents('.aw-item').find('.aw-agree-by .aw-user-name').length == 0)
					{
						$(selector).parents('.aw-item').find('.aw-agree-by').append('<a class="aw-user-name">' + user_name + '</a>');
					}
					else
					{
						$(selector).parents('.aw-item').find('.aw-agree-by').append('<em>、</em><a class="aw-user-name">' + user_name + '</a>');
					}

					$(selector).parents('.operate').find('.count').html(parseInt($(selector).parents('.operate').find('.count').html()) + 1);

					$(selector).parents('.aw-item').find('.aw-agree-by').show();

					$(selector).parents('.operate').find('a.active').removeClass('active');

					$(selector).addClass('active');
				}
			},

			// 反对投票
			disagree_vote: function(selector, user_name, answer_id)
			{
				$.post(G_BASE_URL + '/question/ajax/answer_vote/', 'answer_id=' + answer_id + '&value=-1', function (result) {});

				if ($(selector).hasClass('active'))
				{
					$(selector).removeClass('active');
				}
				else
				{
					// 判断是否有赞同过
					if ($(selector).parents('.operate').find('.agree').hasClass('active'))
					{
						// 删除赞同操作
						$.each($(selector).parents('.aw-item').find('.aw-user-name'), function (i, e)
						{
							if ($(e).html() == user_name)
							{
								if ($(e).prev())
								{
									$(e).prev().remove();
								}
								else
								{
									$(e).next().remove();
								}

								$(e).remove();
							}
						});

						// 判断赞同来自内是否有人
						if ($(selector).parents('.aw-item').find('.aw-agree-by a').length == 0)
						{
							$(selector).parents('.aw-item').find('.aw-agree-by').hide();
						}

						$(selector).parents('.operate').find('.count').html(parseInt($(selector).parents('.operate').find('.count').html()) - 1);

						$(selector).parents('.operate').find('.agree').removeClass('active');

						$(selector).addClass('active');
					}
					else
					{
						$(selector).addClass('active');
					}
				}
			},

			// 问题不感兴趣
			question_uninterested: function(selector, question_id)
			{
				selector.fadeOut();

				$.post(G_BASE_URL + '/question/ajax/uninterested/', 'question_id=' + question_id, function (result)
				{
					if (result.errno != '1')
					{
						AWS.alert(result.err);
					}
				}, 'json');
			},

			// 回复折叠
			answer_force_fold: function(selector, answer_id)
			{
				$.post(G_BASE_URL + '/question/ajax/answer_force_fold/', 'answer_id=' + answer_id, function (result) {
					if (result.errno != 1)
					{
						AWS.alert(result.err);
					}
					else if (result.errno == 1)
					{
						if (result.rsm.action == 'fold')
						{
							selector.html(selector.html().replace(_t('折叠'), _t('撤消折叠')));
						}
						else
						{
							selector.html(selector.html().replace(_t('撤消折叠'), _t('折叠')));
						}
					}
				}, 'json');
			},

			// 删除别人邀请我回复的问题
			question_invite_delete: function(selector, question_invite_id)
			{
				$.post(G_BASE_URL + '/question/ajax/question_invite_delete/', 'question_invite_id=' + question_invite_id, function (result)
				{
					if (result.errno == 1)
					{
						selector.fadeOut();
					}
					else
					{
						AWS.alert(result.rsm.err);
					}
				}, 'json');
			},

			// 邀请用户回答问题
			invite_user: function(selector, img)
			{
				$.post(G_BASE_URL + '/question/ajax/save_invite/',
				{
					'question_id': QUESTION_ID,
					'uid': selector.attr('data-id')
				}, function (result)
				{
					if (result.errno != -1)
					{
						if (selector.parents('.aw-invite-box').find('.invite-list a').length == 0)
						{
							selector.parents('.aw-invite-box').find('.invite-list').show();
						}
						selector.parents('.aw-invite-box').find('.invite-list').append(' <a class="text-color-999 invite-list-user" data-toggle="tooltip" data-placement="bottom" data-original-title="'+ selector.attr('data-value') +'"><img src='+ img +' /></a>');
						selector.addClass('active').attr('onclick','AWS.User.disinvite_user($(this))').text('取消邀请');
						selector.parents('.aw-question-detail').find('.aw-invite-replay .badge').text(parseInt(selector.parents('.aw-question-detail').find('.aw-invite-replay .badge').text()) + 1);
					}
					else if (result.errno == -1)
					{
						AWS.alert(result.err);
					}
				}, 'json');
			},

			// 取消邀请用户回答问题
			disinvite_user: function(selector)
			{
				$.get(G_BASE_URL + '/question/ajax/cancel_question_invite/question_id-' + QUESTION_ID + "__recipients_uid-" + selector.attr('data-id'), function (result)
				{
					if (result.errno != -1)
					{
						$.each($('.aw-question-detail .invite-list a'), function (i, e)
						{
							if ($(this).attr('data-original-title') == selector.parents('.main').find('.aw-user-name').text())
							{
								$(this).detach();
							}
						});
						selector.removeClass('active').attr('onclick','AWS.User.invite_user($(this),$(this).parents(\'li\').find(\'img\').attr(\'src\'))').text('邀请');
						selector.parents('.aw-question-detail').find('.aw-invite-replay .badge').text(parseInt(selector.parents('.aw-question-detail').find('.aw-invite-replay .badge').text()) - 1);
						if (selector.parents('.aw-invite-box').find('.invite-list').children().length == 0)
						{
							selector.parents('.aw-invite-box').find('.invite-list').hide();
						}
					}
				});
			},

			// 问题感谢
			question_thanks: function(selector, question_id)
			{
				$.post(G_BASE_URL + '/question/ajax/question_thanks/', 'question_id=' + question_id, function (result)
				{
					if (result.errno != 1)
					{
						AWS.alert(result.err);
					}
					else if (result.rsm.action == 'add')
					{
						selector.html(selector.html().replace(_t('感谢'), _t('已感谢')));
						selector.removeAttr('onclick');
					}
					else
					{
						selector.html(selector.html().replace(_t('已感谢'), _t('感谢')));
					}
				}, 'json');
			},

			// 感谢评论回复者
			answer_user_rate: function(selector, type, answer_id)
			{
				$.post(G_BASE_URL + '/question/ajax/question_answer_rate/', 'type=' + type + '&answer_id=' + answer_id, function (result)
				{
					if (result.errno != 1)
					{
						AWS.alert(result.err);
					}
					else if (result.errno == 1)
					{
						switch (type)
						{
						case 'thanks':
							if (result.rsm.action == 'add')
							{
								selector.html(selector.html().replace(_t('感谢'), _t('已感谢')));
								selector.removeAttr('onclick');
							}
							else
							{
								selector.html(selector.html().replace(_t('已感谢'), _t('感谢')));
							}
							break;

						case 'uninterested':
							if (result.rsm.action == 'add')
							{
								selector.html(selector.html().replace(_t('没有帮助'), _t('撤消没有帮助')));
							}
							else
							{
								selector.html(selector.html().replace(_t('撤消没有帮助'), _t('没有帮助')));
							}
							break;
						}
					}
				}, 'json');
			},

			// 提交评论
			save_comment: function(selector)
			{
				selector.addClass('disabled');

				AWS.ajax_post(selector.parents('form'), AWS.ajax_processer, 'comments_form');
			},

			// 删除评论
			remove_comment: function(selector, type, comment_id)
			{
				$.get(G_BASE_URL + '/question/ajax/remove_comment/type-' + type + '__comment_id-' + comment_id);

				selector.parents('.aw-comment-box li').fadeOut();
			},

			// 文章赞同
			article_vote: function(selector, article_id, rating)
			{
				AWS.loading('show');

				if (selector.hasClass('active'))
				{
					var rating = 0;
				}

				$.post(G_BASE_URL + '/article/ajax/article_vote/', 'type=article&item_id=' + article_id + '&rating=' + rating, function (result) {

					AWS.loading('hide');

					if (result.errno != 1)
					{
						AWS.alert(result.err);
					}
					else
					{
						if (rating == 0)
						{
							selector.removeClass('active').find('b').html(parseInt(selector.find('b').html()) - 1);
						}
						else if (rating == -1)
						{
							if (selector.parents('.aw-article-vote').find('.agree').hasClass('active'))
							{
								selector.parents('.aw-article-vote').find('b').html(parseInt(selector.parents('.aw-article-vote').find('b').html()) - 1);
								selector.parents('.aw-article-vote').find('a').removeClass('active');
							}

							selector.addClass('active');
						}
						else
						{
							selector.parents('.aw-article-vote').find('a').removeClass('active');
							selector.addClass('active').find('b').html(parseInt(selector.find('b').html()) + 1);
						}
					}
				}, 'json');
			},

			// 文章评论赞同
			article_comment_vote: function(selector, comment_id, rating)
			{
				AWS.loading('show');

				if (selector.hasClass('active'))
				{
					var rating = 0;
				}

				$.post(G_BASE_URL + '/article/ajax/article_vote/', 'type=comment&item_id=' + comment_id + '&rating=' + rating, function (result)
				{
					AWS.loading('hide');

					if (result.errno != 1)
					{
						AWS.alert(result.err);
					}
					else
					{
						if (rating == 0)
						{
							selector.html(selector.html().replace(_t('我已赞'), _t('赞'))).removeClass('active');
						}
						else
						{
							selector.html(selector.html().replace(_t('赞'), _t('我已赞'))).addClass('active');
						}
					}
				}, 'json');
			},

			// 创建收藏标签
			add_favorite_tag: function()
			{
				$.post(G_BASE_URL + '/favorite/ajax/update_favorite_tag/', {
					'item_id' : $('#favorite_form input[name="item_id"]').val(),
					'item_type' : $('#favorite_form input[name="item_type"]').val(),
					'tags' : $('#favorite_form .add-input').val()
				}, function (result)
				{
					if (result.errno == 1)
					{
						$('.aw-favorite-box .aw-favorite-tag-list').show();
						$('.aw-favorite-box .aw-favorite-tag-add').hide();

						$('.aw-favorite-tag-list ul').prepend('<li class="active"><a data-value="' + $('#favorite_form .add-input').val() + '"><span class="title">' + $('#favorite_form .add-input').val() + '</span></a><i class="icon icon-followed"></i></li>');
					}
				}, 'json');
			}
		}

		AWS.Dropdown =
		{
			// 下拉菜单功能绑定
			bind_dropdown_list: function(selector, type)
			{
				if (type == 'search')
				{
					$(selector).focus(function()
					{
						$(selector).parent().find('.aw-dropdown').show();
					});
				}
				$(selector).keyup(function(e)
				{
					if (type == 'search')
					{
						$(selector).parent().find('.search').show().children('a').text($(selector).val());
					}
					if ($(selector).val().length >= 1)
					{
						if (e.which != 38 && e.which != 40 && e.which != 188 && e.which != 13)
						{
							AWS.Dropdown.get_dropdown_list($(this), type, $(selector).val());
						}
					}
					else
					{
					   $(selector).parent().find('.aw-dropdown').hide();
					}

					if (type == 'topic')
					{
						// 逗号或回车提交
						if (e.which == 188)
						{
							if ($('.aw-edit-topic-box #aw_edit_topic_title').val() != ',')
							{
								$('.aw-edit-topic-box #aw_edit_topic_title').val( $('.aw-edit-topic-box #aw_edit_topic_title').val().substring(0,$('.aw-edit-topic-box #aw_edit_topic_title').val().length-1));
								$('.aw-edit-topic-box .aw-dropdown').hide();
								$('.aw-edit-topic-box .add').click();
							}
							return false;
						}

						// 回车提交
						if (e.which == 13)
						{
							$('.aw-edit-topic-box .aw-dropdown').hide();
							$('.aw-edit-topic-box .add').click();
							return false;
						}

						var lis = $(selector).parent().find('.aw-dropdown-list li');

						//键盘往下
						if (e.which == 40 && lis.is(':visible'))
						{
							var _index;
							if (!lis.hasClass('active'))
							{
								lis.eq(0).addClass('active');
							}
							else
							{
								$.each(lis, function (i, e)
								{
									if ($(this).hasClass('active'))
									{
										$(this).removeClass('active');
										if ($(this).index() == lis.length - 1)
										{
											_index = 0;
										}
										else
										{
											_index = $(this).index() + 1;
										}
									}
								});
								lis.eq(_index).addClass('active');
								$(selector).val(lis.eq(_index).text());
							}
						}

						//键盘往上
						if (e.which == 38 && lis.is(':visible'))
						{
							var _index;
							if (!lis.hasClass('active'))
							{
								lis.eq(lis.length - 1).addClass('active');
							}
							else
							{
								$.each(lis, function (i, e)
								{
									if ($(this).hasClass('active'))
									{
										$(this).removeClass('active');
										if ($(this).index() == 0)
										{
											_index = lis.length - 1;
										}
										else
										{
											_index = $(this).index() - 1;
										}
									}
								});
								lis.eq(_index).addClass('active');
								$(selector).val(lis.eq(_index).text());
							}

						}
					}
				});

				$(selector).blur(function()
				{
					$(selector).parent().find('.aw-dropdown').delay(500).fadeOut(300);
				});
			},

			// 插入下拉菜单
			set_dropdown_list: function(selector, data, selected)
			{
				$(selector).append(Hogan.compile(AW_TEMPLATE.dropdownList).render(
				{
					'items': data
				}));

				$(selector + ' .aw-dropdown-list li a').click(function ()
				{
					$('#aw-topic-tags-select').html($(this).text());
				});

				if (selected)
				{
					$(selector + " .dropdown-menu li a[data-value='" + selected + "']").click();
				}
			},

			/* 下拉菜单数据获取 */
			/*
			*    type : search, publish, redirect, invite, inbox, topic_question, topic
			*/
			get_dropdown_list: function(selector, type, data)
			{
				if (AWS.G.dropdown_list_xhr != '')
				{
					AWS.G.dropdown_list_xhr.abort(); // 中止上一次ajax请求
				}
				var url;
				switch (type)
				{
					case 'search' :
						url = G_BASE_URL + '/search/ajax/search/?q=' + encodeURIComponent(data) + '&limit=5';
					break;

					case 'publish' :
						url = G_BASE_URL + '/search/ajax/search/?type=questions&q=' + encodeURIComponent(data) + '&limit=5';
					break;

					case 'redirect' :
						url = G_BASE_URL + '/search/ajax/search/?q=' + encodeURIComponent(data) + '&type=questions&limit=30&is_question_id=1';
					break;

					case 'invite' :
					case 'inbox' :
						url = G_BASE_URL + '/search/ajax/search/?type=users&q=' + encodeURIComponent(data) + '&limit=10';
					break;

					case 'topic_question' :
						url = G_BASE_URL + '/search/ajax/search/?type=questions,articles&q=' + encodeURIComponent(data) + '&topic_ids=' + CONTENTS_RELATED_TOPIC_IDS + '&limit=50';
					break;

					case 'topic' :
						url = G_BASE_URL + '/search/ajax/search/?type=topics&q=' + encodeURIComponent(data) + '&limit=10';
					break;

					case 'questions' :
						url = G_BASE_URL + '/search/ajax/search/?type=questions&q=' + encodeURIComponent(data) + '&limit=10';
					break;

					case 'articles' :
						url = G_BASE_URL + '/search/ajax/search/?type=articles&q=' + encodeURIComponent(data) + '&limit=10';
					break;

				}

				AWS.G.dropdown_list_xhr = $.get(url, function (result)
				{
					if (result.length != 0 && AWS.G.dropdown_list_xhr != undefined)
					{
						$(selector).parent().find('.aw-dropdown-list').html(''); // 清空内容
						switch (type)
						{
							case 'search' :
								$.each(result, function (i, a)
								{
									switch (a.type)
									{
										case 'questions':
											if (a.detail.best_answer > 0)
											{
												var active = 'active';
											}
											else
											{
												var active = ''
											}

											$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.searchDropdownListQuestions).render(
											{
												'url': a.url,
												'active': active,
												'content': a.name,
												'discuss_count': a.detail.answer_count
											}));
										break;

										case 'articles':
											$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.searchDropdownListArticles).render(
											{
												'url': a.url,
												'content': a.name,
												'comments': a.detail.comments
											}));
										break;

										case 'topics':
											$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.searchDropdownListTopics).render(
											{
												'url': a.url,
												'name': a.name,
												'discuss_count': a.detail.discuss_count,
												'topic_id': a.detail.topic_id
											}));
										break;

										case 'users':
											if (a.detail.signature == '')
											{
												var signature = _t('暂无介绍');
											}
											else
											{
												var signature = a.detail.signature;
											}

											$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.searchDropdownListUsers).render(
											{
												'url': a.url,
												'img': a.detail.avatar_file,
												'name': a.name,
												'intro': signature
											}));
										break;
									}
								});
							break;

							case 'publish' :
							case 'topic_question' :
								$.each(result, function (i, a)
								{
									$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.questionDropdownList).render(
									{
										'url': a.url,
										'name': a.name
									}));
								});
								break;

							case 'topic' :
								$.each(result, function (i, a)
								{
									$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.editTopicDorpdownList).render(
									{
										'name': a['name']
									}));
								});
								break;

							case 'redirect' :
								$.each(result, function (i, a)
								{
									$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.questionRedirectList).render(
									{
										'url': "'" + G_BASE_URL + "/question/ajax/redirect/', 'item_id=" + $(selector).attr('data-id') + "&target_id=" + a['search_id'] + "'",
										'name': a['name']
									}));
								});
								break;

							case 'questions' :
							case 'articles' :
								$.each(result, function (i, a)
								{
									$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.questionDropdownList).render(
									{
										'url': '#',
										'name': a['name']
									}));
								});
								break;

								$(selector).parent().find('.aw-dropdown-list li').click(function()
								{
									$('.aw-question-list').append('<li data-id="'+$(this).attr('data-id')+'"><div class="col-sm-9">' + $(this).html() + '</div> <div class="col-sm-3"><a class="btn btn-danger btn-xs">删除</a></div></li>');

									$('.aw-question-list li').find("a").attr('href',function(){
										return $(this).attr("_href")

									});

									if ($('.question_ids').val() == '')
									{
										$('.question_ids').val($(this).attr('data-id') + ',');
									}
									else
									{
										$('.question_ids').val($('.question_ids').val() + $(this).attr('data-id') + ',');
									}
									$(".alert-box").modal('hide');
								});

								break;

							case 'inbox' :
							case 'invite' :
								$.each(result, function (i, a)
								{
									$(selector).parent().find('.aw-dropdown-list').append(Hogan.compile(AW_TEMPLATE.inviteDropdownList).render(
									{
										'uid': a.uid,
										'name': a.name,
										'img': a.detail.avatar_file
									}));
								});
								break;

						}
						if (type == 'publish')
						{
							$(selector).parent().find('.aw-publish-suggest-question, .aw-publish-suggest-question .aw-dropdown-list').show();
						}
						else
						{
							$(selector).parent().find('.aw-dropdown, .aw-dropdown-list').show().children().show();
							$(selector).parent().find('.title').hide();
							// 关键词高亮
							$(selector).parent().find('.aw-dropdown-list li.question a').highText(data, 'b', 'active');
						}
					}else
					{
						$(selector).parent().find('.aw-dropdown').show().end().find('.title').html(_t('没有找到相关结果')).show();
						$(selector).parent().find('.aw-dropdown-list, .aw-publish-suggest-question').hide();
					}
				}, 'json');

			}
		}

		AWS.Message =
		{
			// 检测通知
			check_notifications: function()
			{
				// 检测登录状态
				if (G_USER_ID == 0)
				{
					clearInterval(AWS.G.notification_timer);
					return false;
				}

				$.get(G_BASE_URL + '/home/ajax/notifications/', function (result)
				{
					$('#inbox_unread').html(Number(result.rsm.inbox_num));

					var last_unread_notification = G_UNREAD_NOTIFICATION;

					G_UNREAD_NOTIFICATION = Number(result.rsm.notifications_num);

					if (G_UNREAD_NOTIFICATION > 0)
					{
						if (G_UNREAD_NOTIFICATION != last_unread_notification)
						{
							// 加载消息列表
							AWS.Message.load_notification_list();

							// 给导航label添加未读消息数量
							$('#notifications_unread').html(G_UNREAD_NOTIFICATION);
						}

						document.title = '(' + (Number(result.rsm.notifications_num) + Number(result.rsm.inbox_num)) + ') ' + document_title;

						$('#notifications_unread').show();
					}
					else
					{
						if ($('#header_notification_list').length)
						{
							$("#header_notification_list").html('<p class="aw-padding10" align="center">' + _t('没有未读通知') + '</p>');
						}

						if ($("#index_notification").length)
						{
							$("#index_notification").fadeOut();
						}

						document.title = document_title;

						$('#notifications_unread').hide();
					}

					// 私信
					if (Number(result.rsm.inbox_num) > 0)
					{
						$('#inbox_unread').show();
					}
					else
					{
						$('#inbox_unread').hide();
					}

				}, 'json');
			},

			// 阅读通知
			read_notification: function(selector, notification_id , reload)
			{
				if (notification_id)
				{
					selector.remove();

					var url = G_BASE_URL + '/notifications/ajax/read_notification/notification_id-' + notification_id;
				}
				else
				{
					if ($("#index_notification").length)
					{
						$("#index_notification").fadeOut();
					}

					var url = G_BASE_URL + '/notifications/ajax/read_notification/';
				}

				$.get(url, function (result)
				{
					AWS.Message.check_notifications();

					if (reload)
					{
						window.location.reload();
					}
				});
			},

			// 重新加载通知列表
			load_notification_list: function()
			{
				if ($("#index_notification").length)
				{
					// 给首页通知box内label添加未读消息数量
					$("#index_notification").fadeIn().find('[name=notification_unread_num]').html(G_UNREAD_NOTIFICATION);

					$('#index_notification ul#notification_list').html('<p align="center" style="padding: 15px 0"><img src="' + G_STATIC_URL + '/common/loading_b.gif"/></p>');

					$.get(G_BASE_URL + '/notifications/ajax/list/flag-0__page-0', function (result)
					{
						$('#index_notification ul#notification_list').html(result);

						AWS.Message.notification_show(5);
					});
				}

				if ($("#header_notification_list").length)
				{
					$.get(G_BASE_URL + '/notifications/ajax/list/flag-0__limit-5__template-header_list', function (result)
					{
						if (result.length)
						{
							$("#header_notification_list").html(result);
						}
						else
						{
							$("#header_notification_list").html('<p class="aw-padding10" align="center">' + _t('没有未读通知') + '</p>');
						}
					});
				}
			},

			// 控制通知数量
			notification_show: function(length)
			{
				if ($('#index_notification').length > 0)
				{
					if ($('#index_notification ul#notification_list li').length == 0)
					{
						$('#index_notification').fadeOut();
					}
					else
					{
						$('#index_notification ul#notification_list li').each(function (i, e)
						{
							if (i < length)
							{
								$(e).show();
							}
							else
							{
								$(e).hide();
							}
						});
					}
				}
			}
		}

		AWS.Init =
		{
			// 初始化问题评论框
			init_comment_box: function(selector)
			{
				$(document).on('click', selector, function ()
				{
					$(this).parents('.aw-question-detail').find('.aw-invite-box, .aw-question-related-box').hide();
					if (typeof COMMENT_UNFOLD != 'undefined')
					{
						if (COMMENT_UNFOLD == 'all' && $(this).attr('data-comment-count') == 0 && $(this).attr('data-first-click') == 'hide')
						{
							$(this).removeAttr('data-first-click');
							return false;
						}
					}

					if (!$(this).attr('data-type') || !$(this).attr('data-id'))
					{
						return true;
					}

					var comment_box_id = '#aw-comment-box-' + $(this).attr('data-type') + '-' + 　$(this).attr('data-id');

					if ($(comment_box_id).length)
					{
						if ($(comment_box_id).css('display') == 'none')
						{
							$(this).addClass('active');

							$(comment_box_id).fadeIn();
						}
						else
						{
							$(this).removeClass('active');
							$(comment_box_id).fadeOut();
						}
					}
					else
					{
						// 动态插入commentBox
						switch ($(this).attr('data-type'))
						{
							case 'question':
								var comment_form_action = G_BASE_URL + '/question/ajax/save_question_comment/question_id-' + $(this).attr('data-id');
								var comment_data_url = G_BASE_URL + '/question/ajax/get_question_comments/question_id-' + $(this).attr('data-id');
								break;

							case 'answer':
								var comment_form_action = G_BASE_URL + '/question/ajax/save_answer_comment/answer_id-' + $(this).attr('data-id');
								var comment_data_url = G_BASE_URL + '/question/ajax/get_answer_comments/answer_id-' + $(this).attr('data-id');
								break;
						}

						if (G_USER_ID)
						{
							$(this).parents('.aw-item').find('.mod-footer').append(Hogan.compile(AW_TEMPLATE.commentBox).render(
							{
								'comment_form_id': comment_box_id.replace('#', ''),
								'comment_form_action': comment_form_action
							}));

							$(comment_box_id).find('.aw-comment-txt').bind(
							{
								focus: function ()
								{
									$(comment_box_id).find('.aw-comment-box-btn').show();
								},

								blur: function ()
								{
									if ($(this).val() == '')
									{
										$(comment_box_id).find('.aw-comment-box-btn').hide();
									}
								}
							});

							$(comment_box_id).find('.close-comment-box').click(function ()
							{
								$(comment_box_id).fadeOut();
								$(comment_box_id).find('.aw-comment-txt').css('height', $(this).css('line-height'));
							});
						}
						else
						{
							$(this).parents('.aw-item').find('.mod-footer').append(Hogan.compile(AW_TEMPLATE.commentBoxClose).render(
							{
								'comment_form_id': comment_box_id.replace('#', ''),
								'comment_form_action': comment_form_action
							}));
						}

						// 判断是否有评论数据
						$.get(comment_data_url, function (result)
						{
							if ($.trim(result) == '')
							{
								result = '<div align="center" class="aw-padding10">' + _t('暂无评论') + '</div>';
							}

							$(comment_box_id).find('.aw-comment-list').html(result);
						});

						// textarae自动增高
						$(comment_box_id).find('.aw-comment-txt').autosize();

						$(this).addClass('active');

						AWS.at_user_lists(comment_box_id + ' .aw-comment-txt', 5);
					}

					AWS.at_user_lists($(this).parents('.aw-item').find('.aw-comment-txt'));
				});
			},

			// 初始化文章评论框
			init_article_comment_box: function(selector)
			{
				$(document).on('click', selector, function ()
				{
					var _editor_box = $(this).parents('.aw-item').find('.aw-article-replay-box');
					if (_editor_box.length)
					{
						if (_editor_box.css('display') == 'block')
						{
						   _editor_box.fadeOut();
						}
						else
						{
							_editor_box.fadeIn();
						}
					}
					else
					{
						$(this).parents('.mod-footer').append(Hogan.compile(AW_TEMPLATE.articleCommentBox).render(
						{
							'at_uid' : $(this).attr('data-id'),
							'article_id' : $('.aw-topic-bar').attr('data-id')
						}));
					}
				});
			},

			// 初始化话题编辑box
			init_topic_edit_box: function(selector) //selector -> .aw-edit-topic
			{
				$(selector).click(function ()
				{
					var _topic_editor = $(this).parents('.aw-topic-bar'),
						data_id = _topic_editor.attr('data-id'),
						data_type = _topic_editor.attr('data-type');

					if (!_topic_editor.hasClass('active'))
					{
						_topic_editor.addClass('active');

						if (!_topic_editor.find('.topic-tag .close').length)
						{
							_topic_editor.find('.topic-tag').append('<a class="close"><i class="icon icon-delete"></i></a>');
						}
					}
					else
					{
						_topic_editor.addClass('active');
					}

					// 判断插入编辑box
					if (_topic_editor.find('.aw-edit-topic-box').length == 0)
					{
						_topic_editor.append(AW_TEMPLATE.editTopicBox);

						// 给编辑box添加按钮添加事件
						_topic_editor.find('.add').click(function ()
						{
							if (_topic_editor.find('#aw_edit_topic_title').val() != '')
							{
								switch (data_type)
								{
									case 'publish':
										_topic_editor.find('.tag-bar').prepend('<span class="topic-tag"><a class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close" onclick="$(this).parents(\'.topic-tag\').remove();"><i class="icon icon-delete"></i></a><input type="hidden" value="' + _topic_editor.find('#aw_edit_topic_title').val() + '" name="topics[]" /></span>').hide().fadeIn();

										_topic_editor.find('#aw_edit_topic_title').val('');
									break;

									case 'question':
										$.post(G_BASE_URL + '/topic/ajax/save_topic_relation/', 'type=question&item_id=' + data_id + '&topic_title=' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()), function (result)
										{
											if (result.errno != 1)
											{
												AWS.alert(result.err);

												return false;
											}

											_topic_editor.find('.tag-bar').prepend('<span class="topic-tag" data-id="' + result.rsm.topic_id + '"><a href="' + G_BASE_URL + '/topic/' + result.rsm.topic_id + '" class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close"><i class="icon icon-delete"></i></a></span>').hide().fadeIn();

											_topic_editor.find('#aw_edit_topic_title').val('');
										}, 'json');
									break;

									case 'article':
										$.post(G_BASE_URL + '/topic/ajax/save_topic_relation/', 'type=article&item_id=' + data_id + '&topic_title=' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()), function (result)
										{
											if (result.errno != 1)
											{
												AWS.alert(result.err);

												return false;
											}

											_topic_editor.find('.tag-bar').prepend('<span class="topic-tag" data-id="' + result.rsm.topic_id + '"><a href="' + G_BASE_URL + '/topic/' + result.rsm.topic_id + '" class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close"><i class="icon icon-delete"></i></a></span>').hide().fadeIn();

											_topic_editor.find('#aw_edit_topic_title').val('');
										}, 'json');
									break;


									case 'topic':
										$.post(G_BASE_URL + '/topic/ajax/save_related_topic/topic_id-' + data_id, 'topic_title=' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()), function (result)
										{
											if (result.errno != 1)
											{
												AWS.alert(result.err);

												return false;
											}

											_topic_editor.find('.tag-bar').prepend('<span class="topic-tag"><a href="' + G_BASE_URL + '/favorite/tag-' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()) + '" class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close"><i class="icon icon-delete"></i></a></span>').hide().fadeIn();

											_topic_editor.find('#aw_edit_topic_title').val('');
										}, 'json');
									break;

									case 'favorite':
										$.post(G_BASE_URL + '/favorite/ajax/update_favorite_tag/', 'item_id=' + data_id + '&item_type=' + _topic_editor.attr('data-item-type') + '&tags=' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()), function (result)
										{
											if (result.errno != 1)
											{
												AWS.alert(result.err);

												return false;
											}

											_topic_editor.find('.tag-bar').prepend('<span class="topic-tag"><a href="' + G_BASE_URL + '/favorite/tag-' + encodeURIComponent(_topic_editor.find('#aw_edit_topic_title').val()) + '" class="text">' + _topic_editor.find('#aw_edit_topic_title').val() + '</a><a class="close"><i class="icon icon-delete"></i></a></span>').hide().fadeIn();

											_topic_editor.find('#aw_edit_topic_title').val('');
										}, 'json');
									break;
								}
							}
						});

						// 给编辑box取消按钮添加事件
						_topic_editor.find('.close-edit').click(function ()
						{
							_topic_editor.removeClass('active');
							_topic_editor.find('.aw-edit-topic-box').hide();
							_topic_editor.find('.aw-edit-topic').show();
						});

						AWS.Dropdown.bind_dropdown_list($(this).parents('.aw-topic-bar').find('#aw_edit_topic_title'),'topic');
					}

					$(this).parents('.aw-topic-bar').find('.aw-edit-topic-box').fadeIn();

					// 是否允许创建新话题
					if (!G_CAN_CREATE_TOPIC)
					{
						$(this).parents('.aw-topic-bar').find('.add').hide();
					}

					$(this).hide();
				});
			}
		}

		function _t(string, replace)
		{
			if (typeof (aws_lang) != 'undefined')
			{
				if (typeof (aws_lang[string]) != 'undefined')
				{
					string = aws_lang[string];
				}
			}

			if (replace)
			{
				string = string.replace('%s', replace);
			}

			return string;
		};

		// jQuery扩展
		(function ($)
		{
			$.fn.extend(
			{
				insertAtCaret: function (textFeildValue)
				{
					var textObj = $(this).get(0);
					if (document.all && textObj.createTextRange && textObj.caretPos)
					{
						var caretPos = textObj.caretPos;
						caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == '' ?
							textFeildValue + '' : textFeildValue;
					}
					else if (textObj.setSelectionRange)
					{
						var rangeStart = textObj.selectionStart,
							rangeEnd = textObj.selectionEnd,
							tempStr1 = textObj.value.substring(0, rangeStart),
							tempStr2 = textObj.value.substring(rangeEnd);
						textObj.value = tempStr1 + textFeildValue + tempStr2;
						textObj.focus();
						var len = textFeildValue.length;
						textObj.setSelectionRange(rangeStart + len, rangeStart + len);
						textObj.blur();
					}
					else
					{
						textObj.value += textFeildValue;
					}
				},

				highText: function (searchWords, htmlTag, tagClass)
				{
					return this.each(function ()
					{
						$(this).html(function high(replaced, search, htmlTag, tagClass)
						{
							var pattarn = search.replace(/\b(\w+)\b/g, "($1)").replace(/\s+/g, "|");

							return replaced.replace(new RegExp(pattarn, "ig"), function (keyword)
							{
								return $("<" + htmlTag + " class=" + tagClass + ">" + keyword + "</" + htmlTag + ">").outerHTML();
							});
						}($(this).text(), searchWords, htmlTag, tagClass));
					});
				},

				outerHTML: function (s)
				{
					return (s) ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
				}
			});

			$.extend(
			{
				// 滚动到指定位置
				scrollTo : function (type, duration, options)
				{
					if (typeof type == 'object')
					{
						var type = $(type).offset().top
					}

					$('html, body').animate({
						scrollTop: type
					}, {
						duration: duration,
						queue: options.queue
					});
				}
			})

		})(jQuery);


	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		window.onload = function()
		{
			if (/MSIE 6/.test(navigator.userAgent) || /MSIE 7/.test(navigator.userAgent))
			{
				var newNode = document.createElement("div");
					newNode.setAttribute('id', 'browser-not-support');
			        newNode.innerHTML = '<img class="pull-left" src="'+ G_STATIC_URL +'/css/default/img/404-logo.png" alt="" />'+
							'<div class="pull-left content">'+
								'<h1>您的浏览器<span>不受支持</span></h1>'+
								'<p>您的浏览器版本非常旧, 存在诸多安全和体验问题! 建议<a href="http://windows.microsoft.com/zh-cn/windows/upgrade-your-browser">更新</a>或者使用其他浏览器来访问, 如果您使用的是搜狗、360、遨游等双核浏览器, 请切换到极速模式以获得更好的体验</p>'+
								'<ul>'+
									'<li><a href="http://www.google.cn/intl/zh-CN/chrome/browser/">￮ Google 浏览器</a></li>'+
									'<li><a href="http://opera.com/">￮ Opera 浏览器</a></li>'+
									'<li><a href="http://www.mozilla.com/firefox/">￮ Firefox 浏览器</a></li>'+
								'</ul>'+
							'</div>';
				document.getElementsByTagName('body')[0].appendChild(newNode);
			}
		}

	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		// Copyright 2006 Google Inc.
		//
		// Licensed under the Apache License, Version 2.0 (the "License");
		// you may not use this file except in compliance with the License.
		// You may obtain a copy of the License at
		//
		//   http://www.apache.org/licenses/LICENSE-2.0
		//
		// Unless required by applicable law or agreed to in writing, software
		// distributed under the License is distributed on an "AS IS" BASIS,
		// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		// See the License for the specific language governing permissions and
		// limitations under the License.


		// Known Issues:
		//
		// * Patterns only support repeat.
		// * Radial gradient are not implemented. The VML version of these look very
		//   different from the canvas one.
		// * Clipping paths are not implemented.
		// * Coordsize. The width and height attribute have higher priority than the
		//   width and height style values which isn't correct.
		// * Painting mode isn't implemented.
		// * Canvas width/height should is using content-box by default. IE in
		//   Quirks mode will draw the canvas using border-box. Either change your
		//   doctype to HTML5
		//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
		//   or use Box Sizing Behavior from WebFX
		//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
		// * Non uniform scaling does not correctly scale strokes.
		// * Optimize. There is always room for speed improvements.

		// Only add this code if we do not already have a canvas implementation
		if (!document.createElement('canvas').getContext) {

		(function() {

		  // alias some functions to make (compiled) code shorter
		  var m = Math;
		  var mr = m.round;
		  var ms = m.sin;
		  var mc = m.cos;
		  var abs = m.abs;
		  var sqrt = m.sqrt;

		  // this is used for sub pixel precision
		  var Z = 10;
		  var Z2 = Z / 2;

		  var IE_VERSION = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];

		  /**
		   * This funtion is assigned to the <canvas> elements as element.getContext().
		   * @this {HTMLElement}
		   * @return {CanvasRenderingContext2D_}
		   */
		  function getContext() {
		    return this.context_ ||
		        (this.context_ = new CanvasRenderingContext2D_(this));
		  }

		  var slice = Array.prototype.slice;

		  /**
		   * Binds a function to an object. The returned function will always use the
		   * passed in {@code obj} as {@code this}.
		   *
		   * Example:
		   *
		   *   g = bind(f, obj, a, b)
		   *   g(c, d) // will do f.call(obj, a, b, c, d)
		   *
		   * @param {Function} f The function to bind the object to
		   * @param {Object} obj The object that should act as this when the function
		   *     is called
		   * @param {*} var_args Rest arguments that will be used as the initial
		   *     arguments when the function is called
		   * @return {Function} A new function that has bound this
		   */
		  function bind(f, obj, var_args) {
		    var a = slice.call(arguments, 2);
		    return function() {
		      return f.apply(obj, a.concat(slice.call(arguments)));
		    };
		  }

		  function encodeHtmlAttribute(s) {
		    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
		  }

		  function addNamespace(doc, prefix, urn) {
		    if (!doc.namespaces[prefix]) {
		      doc.namespaces.add(prefix, urn, '#default#VML');
		    }
		  }

		  function addNamespacesAndStylesheet(doc) {
		    addNamespace(doc, 'g_vml_', 'urn:schemas-microsoft-com:vml');
		    addNamespace(doc, 'g_o_', 'urn:schemas-microsoft-com:office:office');

		    // Setup default CSS.  Only add one style sheet per document
		    if (!doc.styleSheets['ex_canvas_']) {
		      var ss = doc.createStyleSheet();
		      ss.owningElement.id = 'ex_canvas_';
		      ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
		          // default size is 300x150 in Gecko and Opera
		          'text-align:left;width:300px;height:150px}';
		    }
		  }

		  // Add namespaces and stylesheet at startup.
		  addNamespacesAndStylesheet(document);

		  var G_vmlCanvasManager_ = {
		    init: function(opt_doc) {
		      var doc = opt_doc || document;
		      // Create a dummy element so that IE will allow canvas elements to be
		      // recognized.
		      doc.createElement('canvas');
		      doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));
		    },

		    init_: function(doc) {
		      // find all canvas elements
		      var els = doc.getElementsByTagName('canvas');
		      for (var i = 0; i < els.length; i++) {
		        this.initElement(els[i]);
		      }
		    },

		    /**
		     * Public initializes a canvas element so that it can be used as canvas
		     * element from now on. This is called automatically before the page is
		     * loaded but if you are creating elements using createElement you need to
		     * make sure this is called on the element.
		     * @param {HTMLElement} el The canvas element to initialize.
		     * @return {HTMLElement} the element that was created.
		     */
		    initElement: function(el) {
		      if (!el.getContext) {
		        el.getContext = getContext;

		        // Add namespaces and stylesheet to document of the element.
		        addNamespacesAndStylesheet(el.ownerDocument);

		        // Remove fallback content. There is no way to hide text nodes so we
		        // just remove all childNodes. We could hide all elements and remove
		        // text nodes but who really cares about the fallback content.
		        el.innerHTML = '';

		        // do not use inline function because that will leak memory
		        el.attachEvent('onpropertychange', onPropertyChange);
		        el.attachEvent('onresize', onResize);

		        var attrs = el.attributes;
		        if (attrs.width && attrs.width.specified) {
		          // TODO: use runtimeStyle and coordsize
		          // el.getContext().setWidth_(attrs.width.nodeValue);
		          el.style.width = attrs.width.nodeValue + 'px';
		        } else {
		          el.width = el.clientWidth;
		        }
		        if (attrs.height && attrs.height.specified) {
		          // TODO: use runtimeStyle and coordsize
		          // el.getContext().setHeight_(attrs.height.nodeValue);
		          el.style.height = attrs.height.nodeValue + 'px';
		        } else {
		          el.height = el.clientHeight;
		        }
		        //el.getContext().setCoordsize_()
		      }
		      return el;
		    }
		  };

		  function onPropertyChange(e) {
		    var el = e.srcElement;

		    switch (e.propertyName) {
		      case 'width':
		        el.getContext().clearRect();
		        el.style.width = el.attributes.width.nodeValue + 'px';
		        // In IE8 this does not trigger onresize.
		        el.firstChild.style.width =  el.clientWidth + 'px';
		        break;
		      case 'height':
		        el.getContext().clearRect();
		        el.style.height = el.attributes.height.nodeValue + 'px';
		        el.firstChild.style.height = el.clientHeight + 'px';
		        break;
		    }
		  }

		  function onResize(e) {
		    var el = e.srcElement;
		    if (el.firstChild) {
		      el.firstChild.style.width =  el.clientWidth + 'px';
		      el.firstChild.style.height = el.clientHeight + 'px';
		    }
		  }

		  G_vmlCanvasManager_.init();

		  // precompute "00" to "FF"
		  var decToHex = [];
		  for (var i = 0; i < 16; i++) {
		    for (var j = 0; j < 16; j++) {
		      decToHex[i * 16 + j] = i.toString(16) + j.toString(16);
		    }
		  }

		  function createMatrixIdentity() {
		    return [
		      [1, 0, 0],
		      [0, 1, 0],
		      [0, 0, 1]
		    ];
		  }

		  function matrixMultiply(m1, m2) {
		    var result = createMatrixIdentity();

		    for (var x = 0; x < 3; x++) {
		      for (var y = 0; y < 3; y++) {
		        var sum = 0;

		        for (var z = 0; z < 3; z++) {
		          sum += m1[x][z] * m2[z][y];
		        }

		        result[x][y] = sum;
		      }
		    }
		    return result;
		  }

		  function copyState(o1, o2) {
		    o2.fillStyle     = o1.fillStyle;
		    o2.lineCap       = o1.lineCap;
		    o2.lineJoin      = o1.lineJoin;
		    o2.lineWidth     = o1.lineWidth;
		    o2.miterLimit    = o1.miterLimit;
		    o2.shadowBlur    = o1.shadowBlur;
		    o2.shadowColor   = o1.shadowColor;
		    o2.shadowOffsetX = o1.shadowOffsetX;
		    o2.shadowOffsetY = o1.shadowOffsetY;
		    o2.strokeStyle   = o1.strokeStyle;
		    o2.globalAlpha   = o1.globalAlpha;
		    o2.font          = o1.font;
		    o2.textAlign     = o1.textAlign;
		    o2.textBaseline  = o1.textBaseline;
		    o2.arcScaleX_    = o1.arcScaleX_;
		    o2.arcScaleY_    = o1.arcScaleY_;
		    o2.lineScale_    = o1.lineScale_;
		  }

		  var colorData = {
		    aliceblue: '#F0F8FF',
		    antiquewhite: '#FAEBD7',
		    aquamarine: '#7FFFD4',
		    azure: '#F0FFFF',
		    beige: '#F5F5DC',
		    bisque: '#FFE4C4',
		    black: '#000000',
		    blanchedalmond: '#FFEBCD',
		    blueviolet: '#8A2BE2',
		    brown: '#A52A2A',
		    burlywood: '#DEB887',
		    cadetblue: '#5F9EA0',
		    chartreuse: '#7FFF00',
		    chocolate: '#D2691E',
		    coral: '#FF7F50',
		    cornflowerblue: '#6495ED',
		    cornsilk: '#FFF8DC',
		    crimson: '#DC143C',
		    cyan: '#00FFFF',
		    darkblue: '#00008B',
		    darkcyan: '#008B8B',
		    darkgoldenrod: '#B8860B',
		    darkgray: '#A9A9A9',
		    darkgreen: '#006400',
		    darkgrey: '#A9A9A9',
		    darkkhaki: '#BDB76B',
		    darkmagenta: '#8B008B',
		    darkolivegreen: '#556B2F',
		    darkorange: '#FF8C00',
		    darkorchid: '#9932CC',
		    darkred: '#8B0000',
		    darksalmon: '#E9967A',
		    darkseagreen: '#8FBC8F',
		    darkslateblue: '#483D8B',
		    darkslategray: '#2F4F4F',
		    darkslategrey: '#2F4F4F',
		    darkturquoise: '#00CED1',
		    darkviolet: '#9400D3',
		    deeppink: '#FF1493',
		    deepskyblue: '#00BFFF',
		    dimgray: '#696969',
		    dimgrey: '#696969',
		    dodgerblue: '#1E90FF',
		    firebrick: '#B22222',
		    floralwhite: '#FFFAF0',
		    forestgreen: '#228B22',
		    gainsboro: '#DCDCDC',
		    ghostwhite: '#F8F8FF',
		    gold: '#FFD700',
		    goldenrod: '#DAA520',
		    grey: '#808080',
		    greenyellow: '#ADFF2F',
		    honeydew: '#F0FFF0',
		    hotpink: '#FF69B4',
		    indianred: '#CD5C5C',
		    indigo: '#4B0082',
		    ivory: '#FFFFF0',
		    khaki: '#F0E68C',
		    lavender: '#E6E6FA',
		    lavenderblush: '#FFF0F5',
		    lawngreen: '#7CFC00',
		    lemonchiffon: '#FFFACD',
		    lightblue: '#ADD8E6',
		    lightcoral: '#F08080',
		    lightcyan: '#E0FFFF',
		    lightgoldenrodyellow: '#FAFAD2',
		    lightgreen: '#90EE90',
		    lightgrey: '#D3D3D3',
		    lightpink: '#FFB6C1',
		    lightsalmon: '#FFA07A',
		    lightseagreen: '#20B2AA',
		    lightskyblue: '#87CEFA',
		    lightslategray: '#778899',
		    lightslategrey: '#778899',
		    lightsteelblue: '#B0C4DE',
		    lightyellow: '#FFFFE0',
		    limegreen: '#32CD32',
		    linen: '#FAF0E6',
		    magenta: '#FF00FF',
		    mediumaquamarine: '#66CDAA',
		    mediumblue: '#0000CD',
		    mediumorchid: '#BA55D3',
		    mediumpurple: '#9370DB',
		    mediumseagreen: '#3CB371',
		    mediumslateblue: '#7B68EE',
		    mediumspringgreen: '#00FA9A',
		    mediumturquoise: '#48D1CC',
		    mediumvioletred: '#C71585',
		    midnightblue: '#191970',
		    mintcream: '#F5FFFA',
		    mistyrose: '#FFE4E1',
		    moccasin: '#FFE4B5',
		    navajowhite: '#FFDEAD',
		    oldlace: '#FDF5E6',
		    olivedrab: '#6B8E23',
		    orange: '#FFA500',
		    orangered: '#FF4500',
		    orchid: '#DA70D6',
		    palegoldenrod: '#EEE8AA',
		    palegreen: '#98FB98',
		    paleturquoise: '#AFEEEE',
		    palevioletred: '#DB7093',
		    papayawhip: '#FFEFD5',
		    peachpuff: '#FFDAB9',
		    peru: '#CD853F',
		    pink: '#FFC0CB',
		    plum: '#DDA0DD',
		    powderblue: '#B0E0E6',
		    rosybrown: '#BC8F8F',
		    royalblue: '#4169E1',
		    saddlebrown: '#8B4513',
		    salmon: '#FA8072',
		    sandybrown: '#F4A460',
		    seagreen: '#2E8B57',
		    seashell: '#FFF5EE',
		    sienna: '#A0522D',
		    skyblue: '#87CEEB',
		    slateblue: '#6A5ACD',
		    slategray: '#708090',
		    slategrey: '#708090',
		    snow: '#FFFAFA',
		    springgreen: '#00FF7F',
		    steelblue: '#4682B4',
		    tan: '#D2B48C',
		    thistle: '#D8BFD8',
		    tomato: '#FF6347',
		    turquoise: '#40E0D0',
		    violet: '#EE82EE',
		    wheat: '#F5DEB3',
		    whitesmoke: '#F5F5F5',
		    yellowgreen: '#9ACD32'
		  };


		  function getRgbHslContent(styleString) {
		    var start = styleString.indexOf('(', 3);
		    var end = styleString.indexOf(')', start + 1);
		    var parts = styleString.substring(start + 1, end).split(',');
		    // add alpha if needed
		    if (parts.length != 4 || styleString.charAt(3) != 'a') {
		      parts[3] = 1;
		    }
		    return parts;
		  }

		  function percent(s) {
		    return parseFloat(s) / 100;
		  }

		  function clamp(v, min, max) {
		    return Math.min(max, Math.max(min, v));
		  }

		  function hslToRgb(parts){
		    var r, g, b, h, s, l;
		    h = parseFloat(parts[0]) / 360 % 360;
		    if (h < 0)
		      h++;
		    s = clamp(percent(parts[1]), 0, 1);
		    l = clamp(percent(parts[2]), 0, 1);
		    if (s == 0) {
		      r = g = b = l; // achromatic
		    } else {
		      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		      var p = 2 * l - q;
		      r = hueToRgb(p, q, h + 1 / 3);
		      g = hueToRgb(p, q, h);
		      b = hueToRgb(p, q, h - 1 / 3);
		    }

		    return '#' + decToHex[Math.floor(r * 255)] +
		        decToHex[Math.floor(g * 255)] +
		        decToHex[Math.floor(b * 255)];
		  }

		  function hueToRgb(m1, m2, h) {
		    if (h < 0)
		      h++;
		    if (h > 1)
		      h--;

		    if (6 * h < 1)
		      return m1 + (m2 - m1) * 6 * h;
		    else if (2 * h < 1)
		      return m2;
		    else if (3 * h < 2)
		      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
		    else
		      return m1;
		  }

		  var processStyleCache = {};

		  function processStyle(styleString) {
		    if (styleString in processStyleCache) {
		      return processStyleCache[styleString];
		    }

		    var str, alpha = 1;

		    styleString = String(styleString);
		    if (styleString.charAt(0) == '#') {
		      str = styleString;
		    } else if (/^rgb/.test(styleString)) {
		      var parts = getRgbHslContent(styleString);
		      var str = '#', n;
		      for (var i = 0; i < 3; i++) {
		        if (parts[i].indexOf('%') != -1) {
		          n = Math.floor(percent(parts[i]) * 255);
		        } else {
		          n = +parts[i];
		        }
		        str += decToHex[clamp(n, 0, 255)];
		      }
		      alpha = +parts[3];
		    } else if (/^hsl/.test(styleString)) {
		      var parts = getRgbHslContent(styleString);
		      str = hslToRgb(parts);
		      alpha = parts[3];
		    } else {
		      str = colorData[styleString] || styleString;
		    }
		    return processStyleCache[styleString] = {color: str, alpha: alpha};
		  }

		  var DEFAULT_STYLE = {
		    style: 'normal',
		    variant: 'normal',
		    weight: 'normal',
		    size: 10,
		    family: 'sans-serif'
		  };

		  // Internal text style cache
		  var fontStyleCache = {};

		  function processFontStyle(styleString) {
		    if (fontStyleCache[styleString]) {
		      return fontStyleCache[styleString];
		    }

		    var el = document.createElement('div');
		    var style = el.style;
		    try {
		      style.font = styleString;
		    } catch (ex) {
		      // Ignore failures to set to invalid font.
		    }

		    return fontStyleCache[styleString] = {
		      style: style.fontStyle || DEFAULT_STYLE.style,
		      variant: style.fontVariant || DEFAULT_STYLE.variant,
		      weight: style.fontWeight || DEFAULT_STYLE.weight,
		      size: style.fontSize || DEFAULT_STYLE.size,
		      family: style.fontFamily || DEFAULT_STYLE.family
		    };
		  }

		  function getComputedStyle(style, element) {
		    var computedStyle = {};

		    for (var p in style) {
		      computedStyle[p] = style[p];
		    }

		    // Compute the size
		    var canvasFontSize = parseFloat(element.currentStyle.fontSize),
		        fontSize = parseFloat(style.size);

		    if (typeof style.size == 'number') {
		      computedStyle.size = style.size;
		    } else if (style.size.indexOf('px') != -1) {
		      computedStyle.size = fontSize;
		    } else if (style.size.indexOf('em') != -1) {
		      computedStyle.size = canvasFontSize * fontSize;
		    } else if(style.size.indexOf('%') != -1) {
		      computedStyle.size = (canvasFontSize / 100) * fontSize;
		    } else if (style.size.indexOf('pt') != -1) {
		      computedStyle.size = fontSize / .75;
		    } else {
		      computedStyle.size = canvasFontSize;
		    }

		    // Different scaling between normal text and VML text. This was found using
		    // trial and error to get the same size as non VML text.
		    computedStyle.size *= 0.981;

		    return computedStyle;
		  }

		  function buildStyle(style) {
		    return style.style + ' ' + style.variant + ' ' + style.weight + ' ' +
		        style.size + 'px ' + style.family;
		  }

		  var lineCapMap = {
		    'butt': 'flat',
		    'round': 'round'
		  };

		  function processLineCap(lineCap) {
		    return lineCapMap[lineCap] || 'square';
		  }

		  /**
		   * This class implements CanvasRenderingContext2D interface as described by
		   * the WHATWG.
		   * @param {HTMLElement} canvasElement The element that the 2D context should
		   * be associated with
		   */
		  function CanvasRenderingContext2D_(canvasElement) {
		    this.m_ = createMatrixIdentity();

		    this.mStack_ = [];
		    this.aStack_ = [];
		    this.currentPath_ = [];

		    // Canvas context properties
		    this.strokeStyle = '#000';
		    this.fillStyle = '#000';

		    this.lineWidth = 1;
		    this.lineJoin = 'miter';
		    this.lineCap = 'butt';
		    this.miterLimit = Z * 1;
		    this.globalAlpha = 1;
		    this.font = '10px sans-serif';
		    this.textAlign = 'left';
		    this.textBaseline = 'alphabetic';
		    this.canvas = canvasElement;

		    var cssText = 'width:' + canvasElement.clientWidth + 'px;height:' +
		        canvasElement.clientHeight + 'px;overflow:hidden;position:absolute';
		    var el = canvasElement.ownerDocument.createElement('div');
		    el.style.cssText = cssText;
		    canvasElement.appendChild(el);

		    var overlayEl = el.cloneNode(false);
		    // Use a non transparent background.
		    overlayEl.style.backgroundColor = 'red';
		    overlayEl.style.filter = 'alpha(opacity=0)';
		    canvasElement.appendChild(overlayEl);

		    this.element_ = el;
		    this.arcScaleX_ = 1;
		    this.arcScaleY_ = 1;
		    this.lineScale_ = 1;
		  }

		  var contextPrototype = CanvasRenderingContext2D_.prototype;
		  contextPrototype.clearRect = function() {
		    if (this.textMeasureEl_) {
		      this.textMeasureEl_.removeNode(true);
		      this.textMeasureEl_ = null;
		    }
		    this.element_.innerHTML = '';
		  };

		  contextPrototype.beginPath = function() {
		    // TODO: Branch current matrix so that save/restore has no effect
		    //       as per safari docs.
		    this.currentPath_ = [];
		  };

		  contextPrototype.moveTo = function(aX, aY) {
		    var p = getCoords(this, aX, aY);
		    this.currentPath_.push({type: 'moveTo', x: p.x, y: p.y});
		    this.currentX_ = p.x;
		    this.currentY_ = p.y;
		  };

		  contextPrototype.lineTo = function(aX, aY) {
		    var p = getCoords(this, aX, aY);
		    this.currentPath_.push({type: 'lineTo', x: p.x, y: p.y});

		    this.currentX_ = p.x;
		    this.currentY_ = p.y;
		  };

		  contextPrototype.bezierCurveTo = function(aCP1x, aCP1y,
		                                            aCP2x, aCP2y,
		                                            aX, aY) {
		    var p = getCoords(this, aX, aY);
		    var cp1 = getCoords(this, aCP1x, aCP1y);
		    var cp2 = getCoords(this, aCP2x, aCP2y);
		    bezierCurveTo(this, cp1, cp2, p);
		  };

		  // Helper function that takes the already fixed cordinates.
		  function bezierCurveTo(self, cp1, cp2, p) {
		    self.currentPath_.push({
		      type: 'bezierCurveTo',
		      cp1x: cp1.x,
		      cp1y: cp1.y,
		      cp2x: cp2.x,
		      cp2y: cp2.y,
		      x: p.x,
		      y: p.y
		    });
		    self.currentX_ = p.x;
		    self.currentY_ = p.y;
		  }

		  contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
		    // the following is lifted almost directly from
		    // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

		    var cp = getCoords(this, aCPx, aCPy);
		    var p = getCoords(this, aX, aY);

		    var cp1 = {
		      x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
		      y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
		    };
		    var cp2 = {
		      x: cp1.x + (p.x - this.currentX_) / 3.0,
		      y: cp1.y + (p.y - this.currentY_) / 3.0
		    };

		    bezierCurveTo(this, cp1, cp2, p);
		  };

		  contextPrototype.arc = function(aX, aY, aRadius,
		                                  aStartAngle, aEndAngle, aClockwise) {
		    aRadius *= Z;
		    var arcType = aClockwise ? 'at' : 'wa';

		    var xStart = aX + mc(aStartAngle) * aRadius - Z2;
		    var yStart = aY + ms(aStartAngle) * aRadius - Z2;

		    var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
		    var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

		    // IE won't render arches drawn counter clockwise if xStart == xEnd.
		    if (xStart == xEnd && !aClockwise) {
		      xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
		                       // that can be represented in binary
		    }

		    var p = getCoords(this, aX, aY);
		    var pStart = getCoords(this, xStart, yStart);
		    var pEnd = getCoords(this, xEnd, yEnd);

		    this.currentPath_.push({type: arcType,
		                           x: p.x,
		                           y: p.y,
		                           radius: aRadius,
		                           xStart: pStart.x,
		                           yStart: pStart.y,
		                           xEnd: pEnd.x,
		                           yEnd: pEnd.y});

		  };

		  contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
		    this.moveTo(aX, aY);
		    this.lineTo(aX + aWidth, aY);
		    this.lineTo(aX + aWidth, aY + aHeight);
		    this.lineTo(aX, aY + aHeight);
		    this.closePath();
		  };

		  contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
		    var oldPath = this.currentPath_;
		    this.beginPath();

		    this.moveTo(aX, aY);
		    this.lineTo(aX + aWidth, aY);
		    this.lineTo(aX + aWidth, aY + aHeight);
		    this.lineTo(aX, aY + aHeight);
		    this.closePath();
		    this.stroke();

		    this.currentPath_ = oldPath;
		  };

		  contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
		    var oldPath = this.currentPath_;
		    this.beginPath();

		    this.moveTo(aX, aY);
		    this.lineTo(aX + aWidth, aY);
		    this.lineTo(aX + aWidth, aY + aHeight);
		    this.lineTo(aX, aY + aHeight);
		    this.closePath();
		    this.fill();

		    this.currentPath_ = oldPath;
		  };

		  contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
		    var gradient = new CanvasGradient_('gradient');
		    gradient.x0_ = aX0;
		    gradient.y0_ = aY0;
		    gradient.x1_ = aX1;
		    gradient.y1_ = aY1;
		    return gradient;
		  };

		  contextPrototype.createRadialGradient = function(aX0, aY0, aR0,
		                                                   aX1, aY1, aR1) {
		    var gradient = new CanvasGradient_('gradientradial');
		    gradient.x0_ = aX0;
		    gradient.y0_ = aY0;
		    gradient.r0_ = aR0;
		    gradient.x1_ = aX1;
		    gradient.y1_ = aY1;
		    gradient.r1_ = aR1;
		    return gradient;
		  };

		  contextPrototype.drawImage = function(image, var_args) {
		    var dx, dy, dw, dh, sx, sy, sw, sh;

		    // to find the original width we overide the width and height
		    var oldRuntimeWidth = image.runtimeStyle.width;
		    var oldRuntimeHeight = image.runtimeStyle.height;
		    image.runtimeStyle.width = 'auto';
		    image.runtimeStyle.height = 'auto';

		    // get the original size
		    var w = image.width;
		    var h = image.height;

		    // and remove overides
		    image.runtimeStyle.width = oldRuntimeWidth;
		    image.runtimeStyle.height = oldRuntimeHeight;

		    if (arguments.length == 3) {
		      dx = arguments[1];
		      dy = arguments[2];
		      sx = sy = 0;
		      sw = dw = w;
		      sh = dh = h;
		    } else if (arguments.length == 5) {
		      dx = arguments[1];
		      dy = arguments[2];
		      dw = arguments[3];
		      dh = arguments[4];
		      sx = sy = 0;
		      sw = w;
		      sh = h;
		    } else if (arguments.length == 9) {
		      sx = arguments[1];
		      sy = arguments[2];
		      sw = arguments[3];
		      sh = arguments[4];
		      dx = arguments[5];
		      dy = arguments[6];
		      dw = arguments[7];
		      dh = arguments[8];
		    } else {
		      throw Error('Invalid number of arguments');
		    }

		    var d = getCoords(this, dx, dy);

		    var w2 = sw / 2;
		    var h2 = sh / 2;

		    var vmlStr = [];

		    var W = 10;
		    var H = 10;

		    // For some reason that I've now forgotten, using divs didn't work
		    vmlStr.push(' <g_vml_:group',
		                ' coordsize="', Z * W, ',', Z * H, '"',
		                ' coordorigin="0,0"' ,
		                ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

		    // If filters are necessary (rotation exists), create them
		    // filters are bog-slow, so only create them if abbsolutely necessary
		    // The following check doesn't account for skews (which don't exist
		    // in the canvas spec (yet) anyway.

		    if (this.m_[0][0] != 1 || this.m_[0][1] ||
		        this.m_[1][1] != 1 || this.m_[1][0]) {
		      var filter = [];

		      // Note the 12/21 reversal
		      filter.push('M11=', this.m_[0][0], ',',
		                  'M12=', this.m_[1][0], ',',
		                  'M21=', this.m_[0][1], ',',
		                  'M22=', this.m_[1][1], ',',
		                  'Dx=', mr(d.x / Z), ',',
		                  'Dy=', mr(d.y / Z), '');

		      // Bounding box calculation (need to minimize displayed area so that
		      // filters don't waste time on unused pixels.
		      var max = d;
		      var c2 = getCoords(this, dx + dw, dy);
		      var c3 = getCoords(this, dx, dy + dh);
		      var c4 = getCoords(this, dx + dw, dy + dh);

		      max.x = m.max(max.x, c2.x, c3.x, c4.x);
		      max.y = m.max(max.y, c2.y, c3.y, c4.y);

		      vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
		                  'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
		                  filter.join(''), ", sizingmethod='clip');");

		    } else {
		      vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
		    }

		    vmlStr.push(' ">' ,
		                '<g_vml_:image src="', image.src, '"',
		                ' style="width:', Z * dw, 'px;',
		                ' height:', Z * dh, 'px"',
		                ' cropleft="', sx / w, '"',
		                ' croptop="', sy / h, '"',
		                ' cropright="', (w - sx - sw) / w, '"',
		                ' cropbottom="', (h - sy - sh) / h, '"',
		                ' />',
		                '</g_vml_:group>');

		    this.element_.insertAdjacentHTML('BeforeEnd', vmlStr.join(''));
		  };

		  contextPrototype.stroke = function(aFill) {
		    var lineStr = [];
		    var lineOpen = false;

		    var W = 10;
		    var H = 10;

		    lineStr.push('<g_vml_:shape',
		                 ' filled="', !!aFill, '"',
		                 ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
		                 ' coordorigin="0,0"',
		                 ' coordsize="', Z * W, ',', Z * H, '"',
		                 ' stroked="', !aFill, '"',
		                 ' path="');

		    var newSeq = false;
		    var min = {x: null, y: null};
		    var max = {x: null, y: null};

		    for (var i = 0; i < this.currentPath_.length; i++) {
		      var p = this.currentPath_[i];
		      var c;

		      switch (p.type) {
		        case 'moveTo':
		          c = p;
		          lineStr.push(' m ', mr(p.x), ',', mr(p.y));
		          break;
		        case 'lineTo':
		          lineStr.push(' l ', mr(p.x), ',', mr(p.y));
		          break;
		        case 'close':
		          lineStr.push(' x ');
		          p = null;
		          break;
		        case 'bezierCurveTo':
		          lineStr.push(' c ',
		                       mr(p.cp1x), ',', mr(p.cp1y), ',',
		                       mr(p.cp2x), ',', mr(p.cp2y), ',',
		                       mr(p.x), ',', mr(p.y));
		          break;
		        case 'at':
		        case 'wa':
		          lineStr.push(' ', p.type, ' ',
		                       mr(p.x - this.arcScaleX_ * p.radius), ',',
		                       mr(p.y - this.arcScaleY_ * p.radius), ' ',
		                       mr(p.x + this.arcScaleX_ * p.radius), ',',
		                       mr(p.y + this.arcScaleY_ * p.radius), ' ',
		                       mr(p.xStart), ',', mr(p.yStart), ' ',
		                       mr(p.xEnd), ',', mr(p.yEnd));
		          break;
		      }


		      // TODO: Following is broken for curves due to
		      //       move to proper paths.

		      // Figure out dimensions so we can do gradient fills
		      // properly
		      if (p) {
		        if (min.x == null || p.x < min.x) {
		          min.x = p.x;
		        }
		        if (max.x == null || p.x > max.x) {
		          max.x = p.x;
		        }
		        if (min.y == null || p.y < min.y) {
		          min.y = p.y;
		        }
		        if (max.y == null || p.y > max.y) {
		          max.y = p.y;
		        }
		      }
		    }
		    lineStr.push(' ">');

		    if (!aFill) {
		      appendStroke(this, lineStr);
		    } else {
		      appendFill(this, lineStr, min, max);
		    }

		    lineStr.push('</g_vml_:shape>');

		    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
		  };

		  function appendStroke(ctx, lineStr) {
		    var a = processStyle(ctx.strokeStyle);
		    var color = a.color;
		    var opacity = a.alpha * ctx.globalAlpha;
		    var lineWidth = ctx.lineScale_ * ctx.lineWidth;

		    // VML cannot correctly render a line if the width is less than 1px.
		    // In that case, we dilute the color to make the line look thinner.
		    if (lineWidth < 1) {
		      opacity *= lineWidth;
		    }

		    lineStr.push(
		      '<g_vml_:stroke',
		      ' opacity="', opacity, '"',
		      ' joinstyle="', ctx.lineJoin, '"',
		      ' miterlimit="', ctx.miterLimit, '"',
		      ' endcap="', processLineCap(ctx.lineCap), '"',
		      ' weight="', lineWidth, 'px"',
		      ' color="', color, '" />'
		    );
		  }

		  function appendFill(ctx, lineStr, min, max) {
		    var fillStyle = ctx.fillStyle;
		    var arcScaleX = ctx.arcScaleX_;
		    var arcScaleY = ctx.arcScaleY_;
		    var width = max.x - min.x;
		    var height = max.y - min.y;
		    if (fillStyle instanceof CanvasGradient_) {
		      // TODO: Gradients transformed with the transformation matrix.
		      var angle = 0;
		      var focus = {x: 0, y: 0};

		      // additional offset
		      var shift = 0;
		      // scale factor for offset
		      var expansion = 1;

		      if (fillStyle.type_ == 'gradient') {
		        var x0 = fillStyle.x0_ / arcScaleX;
		        var y0 = fillStyle.y0_ / arcScaleY;
		        var x1 = fillStyle.x1_ / arcScaleX;
		        var y1 = fillStyle.y1_ / arcScaleY;
		        var p0 = getCoords(ctx, x0, y0);
		        var p1 = getCoords(ctx, x1, y1);
		        var dx = p1.x - p0.x;
		        var dy = p1.y - p0.y;
		        angle = Math.atan2(dx, dy) * 180 / Math.PI;

		        // The angle should be a non-negative number.
		        if (angle < 0) {
		          angle += 360;
		        }

		        // Very small angles produce an unexpected result because they are
		        // converted to a scientific notation string.
		        if (angle < 1e-6) {
		          angle = 0;
		        }
		      } else {
		        var p0 = getCoords(ctx, fillStyle.x0_, fillStyle.y0_);
		        focus = {
		          x: (p0.x - min.x) / width,
		          y: (p0.y - min.y) / height
		        };

		        width  /= arcScaleX * Z;
		        height /= arcScaleY * Z;
		        var dimension = m.max(width, height);
		        shift = 2 * fillStyle.r0_ / dimension;
		        expansion = 2 * fillStyle.r1_ / dimension - shift;
		      }

		      // We need to sort the color stops in ascending order by offset,
		      // otherwise IE won't interpret it correctly.
		      var stops = fillStyle.colors_;
		      stops.sort(function(cs1, cs2) {
		        return cs1.offset - cs2.offset;
		      });

		      var length = stops.length;
		      var color1 = stops[0].color;
		      var color2 = stops[length - 1].color;
		      var opacity1 = stops[0].alpha * ctx.globalAlpha;
		      var opacity2 = stops[length - 1].alpha * ctx.globalAlpha;

		      var colors = [];
		      for (var i = 0; i < length; i++) {
		        var stop = stops[i];
		        colors.push(stop.offset * expansion + shift + ' ' + stop.color);
		      }

		      // When colors attribute is used, the meanings of opacity and o:opacity2
		      // are reversed.
		      lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
		                   ' method="none" focus="100%"',
		                   ' color="', color1, '"',
		                   ' color2="', color2, '"',
		                   ' colors="', colors.join(','), '"',
		                   ' opacity="', opacity2, '"',
		                   ' g_o_:opacity2="', opacity1, '"',
		                   ' angle="', angle, '"',
		                   ' focusposition="', focus.x, ',', focus.y, '" />');
		    } else if (fillStyle instanceof CanvasPattern_) {
		      if (width && height) {
		        var deltaLeft = -min.x;
		        var deltaTop = -min.y;
		        lineStr.push('<g_vml_:fill',
		                     ' position="',
		                     deltaLeft / width * arcScaleX * arcScaleX, ',',
		                     deltaTop / height * arcScaleY * arcScaleY, '"',
		                     ' type="tile"',
		                     // TODO: Figure out the correct size to fit the scale.
		                     //' size="', w, 'px ', h, 'px"',
		                     ' src="', fillStyle.src_, '" />');
		       }
		    } else {
		      var a = processStyle(ctx.fillStyle);
		      var color = a.color;
		      var opacity = a.alpha * ctx.globalAlpha;
		      lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
		                   '" />');
		    }
		  }

		  contextPrototype.fill = function() {
		    this.stroke(true);
		  };

		  contextPrototype.closePath = function() {
		    this.currentPath_.push({type: 'close'});
		  };

		  function getCoords(ctx, aX, aY) {
		    var m = ctx.m_;
		    return {
		      x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
		      y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
		    };
		  };

		  contextPrototype.save = function() {
		    var o = {};
		    copyState(this, o);
		    this.aStack_.push(o);
		    this.mStack_.push(this.m_);
		    this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
		  };

		  contextPrototype.restore = function() {
		    if (this.aStack_.length) {
		      copyState(this.aStack_.pop(), this);
		      this.m_ = this.mStack_.pop();
		    }
		  };

		  function matrixIsFinite(m) {
		    return isFinite(m[0][0]) && isFinite(m[0][1]) &&
		        isFinite(m[1][0]) && isFinite(m[1][1]) &&
		        isFinite(m[2][0]) && isFinite(m[2][1]);
		  }

		  function setM(ctx, m, updateLineScale) {
		    if (!matrixIsFinite(m)) {
		      return;
		    }
		    ctx.m_ = m;

		    if (updateLineScale) {
		      // Get the line scale.
		      // Determinant of this.m_ means how much the area is enlarged by the
		      // transformation. So its square root can be used as a scale factor
		      // for width.
		      var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
		      ctx.lineScale_ = sqrt(abs(det));
		    }
		  }

		  contextPrototype.translate = function(aX, aY) {
		    var m1 = [
		      [1,  0,  0],
		      [0,  1,  0],
		      [aX, aY, 1]
		    ];

		    setM(this, matrixMultiply(m1, this.m_), false);
		  };

		  contextPrototype.rotate = function(aRot) {
		    var c = mc(aRot);
		    var s = ms(aRot);

		    var m1 = [
		      [c,  s, 0],
		      [-s, c, 0],
		      [0,  0, 1]
		    ];

		    setM(this, matrixMultiply(m1, this.m_), false);
		  };

		  contextPrototype.scale = function(aX, aY) {
		    this.arcScaleX_ *= aX;
		    this.arcScaleY_ *= aY;
		    var m1 = [
		      [aX, 0,  0],
		      [0,  aY, 0],
		      [0,  0,  1]
		    ];

		    setM(this, matrixMultiply(m1, this.m_), true);
		  };

		  contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
		    var m1 = [
		      [m11, m12, 0],
		      [m21, m22, 0],
		      [dx,  dy,  1]
		    ];

		    setM(this, matrixMultiply(m1, this.m_), true);
		  };

		  contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
		    var m = [
		      [m11, m12, 0],
		      [m21, m22, 0],
		      [dx,  dy,  1]
		    ];

		    setM(this, m, true);
		  };

		  /**
		   * The text drawing function.
		   * The maxWidth argument isn't taken in account, since no browser supports
		   * it yet.
		   */
		  contextPrototype.drawText_ = function(text, x, y, maxWidth, stroke) {
		    var m = this.m_,
		        delta = 1000,
		        left = 0,
		        right = delta,
		        offset = {x: 0, y: 0},
		        lineStr = [];

		    var fontStyle = getComputedStyle(processFontStyle(this.font),
		                                     this.element_);

		    var fontStyleString = buildStyle(fontStyle);

		    var elementStyle = this.element_.currentStyle;
		    var textAlign = this.textAlign.toLowerCase();
		    switch (textAlign) {
		      case 'left':
		      case 'center':
		      case 'right':
		        break;
		      case 'end':
		        textAlign = elementStyle.direction == 'ltr' ? 'right' : 'left';
		        break;
		      case 'start':
		        textAlign = elementStyle.direction == 'rtl' ? 'right' : 'left';
		        break;
		      default:
		        textAlign = 'left';
		    }

		    // 1.75 is an arbitrary number, as there is no info about the text baseline
		    switch (this.textBaseline) {
		      case 'hanging':
		      case 'top':
		        offset.y = fontStyle.size / 1.75;
		        break;
		      case 'middle':
		        break;
		      default:
		      case null:
		      case 'alphabetic':
		      case 'ideographic':
		      case 'bottom':
		        offset.y = -fontStyle.size / 2.25;
		        break;
		    }

		    switch(textAlign) {
		      case 'right':
		        left = delta;
		        right = 0.05;
		        break;
		      case 'center':
		        left = right = delta / 2;
		        break;
		    }

		    var d = getCoords(this, x + offset.x, y + offset.y);

		    lineStr.push('<g_vml_:line from="', -left ,' 0" to="', right ,' 0.05" ',
		                 ' coordsize="100 100" coordorigin="0 0"',
		                 ' filled="', !stroke, '" stroked="', !!stroke,
		                 '" style="position:absolute;width:1px;height:1px;">');

		    if (stroke) {
		      appendStroke(this, lineStr);
		    } else {
		      // TODO: Fix the min and max params.
		      appendFill(this, lineStr, {x: -left, y: 0},
		                 {x: right, y: fontStyle.size});
		    }

		    var skewM = m[0][0].toFixed(3) + ',' + m[1][0].toFixed(3) + ',' +
		                m[0][1].toFixed(3) + ',' + m[1][1].toFixed(3) + ',0,0';

		    var skewOffset = mr(d.x / Z) + ',' + mr(d.y / Z);

		    lineStr.push('<g_vml_:skew on="t" matrix="', skewM ,'" ',
		                 ' offset="', skewOffset, '" origin="', left ,' 0" />',
		                 '<g_vml_:path textpathok="true" />',
		                 '<g_vml_:textpath on="true" string="',
		                 encodeHtmlAttribute(text),
		                 '" style="v-text-align:', textAlign,
		                 ';font:', encodeHtmlAttribute(fontStyleString),
		                 '" /></g_vml_:line>');

		    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
		  };

		  contextPrototype.fillText = function(text, x, y, maxWidth) {
		    this.drawText_(text, x, y, maxWidth, false);
		  };

		  contextPrototype.strokeText = function(text, x, y, maxWidth) {
		    this.drawText_(text, x, y, maxWidth, true);
		  };

		  contextPrototype.measureText = function(text) {
		    if (!this.textMeasureEl_) {
		      var s = '<span style="position:absolute;' +
		          'top:-20000px;left:0;padding:0;margin:0;border:none;' +
		          'white-space:pre;"></span>';
		      this.element_.insertAdjacentHTML('beforeEnd', s);
		      this.textMeasureEl_ = this.element_.lastChild;
		    }
		    var doc = this.element_.ownerDocument;
		    this.textMeasureEl_.innerHTML = '';
		    this.textMeasureEl_.style.font = this.font;
		    // Don't use innerHTML or innerText because they allow markup/whitespace.
		    this.textMeasureEl_.appendChild(doc.createTextNode(text));
		    return {width: this.textMeasureEl_.offsetWidth};
		  };

		  /******** STUBS ********/
		  contextPrototype.clip = function() {
		    // TODO: Implement
		  };

		  contextPrototype.arcTo = function() {
		    // TODO: Implement
		  };

		  contextPrototype.createPattern = function(image, repetition) {
		    return new CanvasPattern_(image, repetition);
		  };

		  // Gradient / Pattern Stubs
		  function CanvasGradient_(aType) {
		    this.type_ = aType;
		    this.x0_ = 0;
		    this.y0_ = 0;
		    this.r0_ = 0;
		    this.x1_ = 0;
		    this.y1_ = 0;
		    this.r1_ = 0;
		    this.colors_ = [];
		  }

		  CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
		    aColor = processStyle(aColor);
		    this.colors_.push({offset: aOffset,
		                       color: aColor.color,
		                       alpha: aColor.alpha});
		  };

		  function CanvasPattern_(image, repetition) {
		    assertImageIsValid(image);
		    switch (repetition) {
		      case 'repeat':
		      case null:
		      case '':
		        this.repetition_ = 'repeat';
		        break
		      case 'repeat-x':
		      case 'repeat-y':
		      case 'no-repeat':
		        this.repetition_ = repetition;
		        break;
		      default:
		        throwException('SYNTAX_ERR');
		    }

		    this.src_ = image.src;
		    this.width_ = image.width;
		    this.height_ = image.height;
		  }

		  function throwException(s) {
		    throw new DOMException_(s);
		  }

		  function assertImageIsValid(img) {
		    if (!img || img.nodeType != 1 || img.tagName != 'IMG') {
		      throwException('TYPE_MISMATCH_ERR');
		    }
		    if (img.readyState != 'complete') {
		      throwException('INVALID_STATE_ERR');
		    }
		  }

		  function DOMException_(s) {
		    this.code = this[s];
		    this.message = s +': DOM Exception ' + this.code;
		  }
		  var p = DOMException_.prototype = new Error;
		  p.INDEX_SIZE_ERR = 1;
		  p.DOMSTRING_SIZE_ERR = 2;
		  p.HIERARCHY_REQUEST_ERR = 3;
		  p.WRONG_DOCUMENT_ERR = 4;
		  p.INVALID_CHARACTER_ERR = 5;
		  p.NO_DATA_ALLOWED_ERR = 6;
		  p.NO_MODIFICATION_ALLOWED_ERR = 7;
		  p.NOT_FOUND_ERR = 8;
		  p.NOT_SUPPORTED_ERR = 9;
		  p.INUSE_ATTRIBUTE_ERR = 10;
		  p.INVALID_STATE_ERR = 11;
		  p.SYNTAX_ERR = 12;
		  p.INVALID_MODIFICATION_ERR = 13;
		  p.NAMESPACE_ERR = 14;
		  p.INVALID_ACCESS_ERR = 15;
		  p.VALIDATION_ERR = 16;
		  p.TYPE_MISMATCH_ERR = 17;

		  // set up externs
		  G_vmlCanvasManager = G_vmlCanvasManager_;
		  CanvasRenderingContext2D = CanvasRenderingContext2D_;
		  CanvasGradient = CanvasGradient_;
		  CanvasPattern = CanvasPattern_;
		  DOMException = DOMException_;
		})();

		} // if

	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		/*!
		 * FileUpload v1.0
		 * Copyright 2011-2014 Wecenter, Inc.
		 * Date: 2014-06-02
		 */
		function FileUpload (type, element, container, url, options, callback)
		{
			var _this = this;
			this.type = type;
			this.element = element;
			this.container = container;
			this.url = url;
		    this.options = {
				'multiple' : true,
				'deleteBtn' : true,
				'insertBtn' : true,
				'insertTextarea' : '.wmd-input',
				'template' : '<li>'+
				    			'<div class="img"></div>'+
								'<div class="content">'+
									'<p class="title"></p>'+
									'<p class="size"></p>'+
									'<p class="meta"></p>'+
								'</div>'+
				    		'</li>',
				'deleteBtnTemplate' : '<a class="delete-file">删除</a>' ,
				'insertBtnTemplate' : '<a class="insert-file">插入</a>'
			};

			if (options.editor)
			{
				this.editor = options.editor;
			}

			this.options = $.extend(this.options, options);

			this.callback = callback;

			if (type == 'file')
			{
				this.init(element, container);
			}
			else
			{
				var form = this.createForm(),
					input = this.createInput();

				$(element).prepend($(form).append(input));
			}
		}

		FileUpload.prototype = 
		{
			// 初始化上传器
			init : function (element, container)
			{
				var form = this.createForm(),
					input = this.createInput();

				$(element).prepend($(form).append(input));

				$(container).append('<ul class="upload-list"></ul>');
			},

			// 创建表单
			createForm : function ()
			{
				var form = this.toElement('<form method="post" enctype="multipart/form-data"><input type="submit" class="submit" /></form>');

				$(form).attr({
					'id' : 'upload-form',
					'action' : this.url,
					'target' : 'ajaxUpload'
				});

				this.form = form;

				return form;
			},

			// 创建input
			createInput : function ()
			{
				var _this = this, input = this.toElement('<input type="file" />');

				$(input).attr({
					'class' : 'file-input',
					'name' : 'aws_upload_file',
					'multiple' : this.options.multiple ? 'multiple' : false
				});

				$(input).change(function()
				{
					_this.addFileList(this);
				});

				return input;
			},

			// 创建隐藏域 (wecenter定制)
			createHiddenInput : function(attach_id)
			{
				var _this = this, input = this.toElement('<input type="hidden" name="attach_ids[]" class="hidden-input" />');

				$(input).val(attach_id);

				return input;
			},

			// 创建iframe
			createIframe : function ()
			{
				var iframe = this.toElement('<iframe></iframe>');
		    	$(iframe).attr({
		    		'class': 'hide upload-iframe',
		    		'name': 'ajaxUpload'
		    	});
		    	return iframe;
			},

			// 添加文件列表
			addFileList : function (input)
			{
				var files = $(input)[0].files;
				if (files && this.type == 'file')
				{
					for (i = 0; i < files.length; i++)
					{
						this.li = this.toElement(this.options.template);
						this.file = files[i];
						$(this.container).find('.upload-list').append(this.li);
						this.upload(files[i], this.li);
					}
				}
				else
				{
					if (this.type == 'file')
					{
						this.li = this.toElement(this.options.template);
						$(this.container).find('.upload-list').append(this.li);
						this.upload('', this.li);
					}
					else
					{
						this.upload('');
					}
				}
				
			},

			// 上传功能
			upload : function (file, li)
			{
				var _this = this;

				if (file)
				{
					var xhr = new XMLHttpRequest(), status = false;

			        xhr.upload.onprogress = function(event)
			        {
			        	if (event.lengthComputable)
			        	{
			                var percent = Math.round(event.loaded * 100 / event.total);
			            }

		                $(li).find('.title').html(file.name);

		                $(li).find('.size').html(percent + '%');
			        };

			        xhr.onreadystatechange = function()
			        {      
			            _this.oncomplete(xhr, li, file);
			        };

			        var url = this.url + '&aws_upload_file=' + file.name + '&timestamp=' + new Date().getTime();

			        xhr.open("POST", url);

			        xhr.send(file);
				}
		        else
		        {
		        	//低版本ie上传
					var iframe = this.createIframe();

					if (this.options.loading_status)
					{
						$(this.options.loading_status).show();
					}

		        	if (iframe.addEventListener)
		        	{
				        iframe.addEventListener('load', function()
			        	{
			        		_this.getIframeContentJSON(iframe, _this.container);
			        	}, false);
				    } else if (iframe.attachEvent)
				    {
				        iframe.attachEvent('onload', function()
			        	{
			        		_this.getIframeContentJSON(iframe, _this.container);
			        	});
			    	}

		    		$('#aw-ajax-box').append(iframe);

		        	$(this.form).find('.submit').click();
		        }
			},

			// 从iframe获取json内容
			getIframeContentJSON : function (iframe, container)
			{
				var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
					response, filename;

		            response = eval("(" + doc.body.innerHTML + ")");

		            if (this.type == 'file')
		            {
		            	this.render(this.li, response);

			           	filename = this.getName($('#upload-form .file-input')[0].value);

			           	$(this.li).find('.title').html(filename);
		            }
		            else
		            {
		            	$(this.options.loading_status).hide();

		            	if ($(this.container).attr('src'))
		            	{
		            		$(this.container).attr('src', response.thumb + '?' + Math.round(Math.random() * 10000));
		            	}
		            	else
		            	{
		            		$(this.container).css(
		            		{
		            			'background' : 'url(' + response.thumb + '?' + Math.round(Math.random() * 10000) + ')'
		            		});
		            	}
		            }

		           	$('.upload-iframe').detach();

		           	this.oncallback();
			},

			// ajax完成callback
			oncomplete : function (xhr, li, file)
			{
				var _this = this, response, filesize = this.getFIleSize(file);
				if (xhr.readyState == 4)
				{
					if (xhr.status == 200)
					{
			            try
			            {
			                response = eval("(" + xhr.responseText + ")");

			                this.render(li, response, filesize);
			            }
			            catch(err)
			            {
			                response = {};
			            }
					}
					else if (xhr.status == 500)
					{
						this.render(li, {'error':_t('内部服务器错误')}, filesize);
					}
					else if (xhr.status == 0)
					{
						this.render(li, {'error':_t('网络链接异常')}, filesize);
					}
				}
			},

			// 此功能配合编辑器
			oncallback : function ()
			{
				if (this.callback)
		       	{
		       		this.callback();
		       	}
			},

			// 渲染缩略列表
			render : function (element, json, filesize)
			{
				if (json)
				{
					if (!json.error)
					{
						switch (json.class_name)
						{
							case 'txt':
								$(element).find('.img').addClass('file').html('<i class="icon icon-file"></i>');
							break;

							default :
								$(element).find('.img').css(
								{
					                'background': 'url("' + json.thumb + '")'
					            }).addClass('active').attr('data-img', json.thumb);
					        break;
						}

						if (filesize)
						{
							$(element).find('.size').html(filesize);
						}

						if (this.options.deleteBtn && json.delete_url)
						{
							var btn = this.createDeleteBtn(json.delete_url);

							$(element).find('.meta').append(btn);
						}

						if (this.options.insertBtn && json.delete_url && !json.class_name)
						{
							var btn = this.createInsertBtn(json.attach_id);

							$(element).find('.meta').append(btn);
						}

						// 插入隐藏域(wecenter定制)
						$(element).append(this.createHiddenInput(json.attach_id));

						this.oncallback();
					}
					else
					{
						$(element).addClass('error').find('.img').addClass('error').html('<i class="icon icon-delete"></i>');
						
						$(element).find('.size').text(json.error);
					}
				}
			},

			toElement : function (html)
			{
				var div = document.createElement('div');
				div.innerHTML = html;
		        var element = div.firstChild;
		        div.removeChild(element);
		        return element;
			},

			// 获取文件名
			getName : function (filename)
			{
		        return filename.replace(/.*(\/|\\)/, "");
		    },

		    // 获取文件大小
		    getFIleSize : function (file)
		    {
		    	var filesize;
		    	if (file.size > 1024 * 1024)
		        {
		            filesize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
		        }
		        else
		        {
		            filesize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
		        }
		        return filesize;
		    },

		    // 创建插入按钮
		    createInsertBtn : function (attach_id)
		    {
		    	var btn = this.toElement(this.options.insertBtnTemplate), _this = this;

		    	$(btn).click(function()
				{
					if (typeof CKEDITOR != 'undefined')
					{
						_this.editor.insertText("\n[attach]" + attach_id + "[/attach]\n");
					}
					else
					{
						_this.editor.val( _this.editor.val() + "\n[attach]" + attach_id + "[/attach]\n");
					}
				});

				return btn;
		    },

		    // 创建删除按钮
		   	createDeleteBtn : function (url)
		   	{
		   		var btn = this.toElement(this.options.deleteBtnTemplate);

		   		$(btn).click(function()
				{
					if (confirm('确认删除?'))
					{
						var _this = this;
						$.get(url, function (result)
						{
							if (result.errno == "-1")
							{
								AWS.alert(result.err);
							}
							else
							{
								$(_this).parents('li').detach();
							}
						}, 'json');
					}
				});

				return btn;
		   	},

		   	// 初始化文件列表
		    setFileList : function (json)
		    {
		    	var template = '<li>';
		    	
		    	if (!json.is_image)
				{
					template += '<div class="img file"><i class="icon icon-file"></i></div>';
				}
				else
				{
					template += '<div class="img" data-img="' + json.thumb + '" style="background:url(' + json.thumb + ')"></div>';
				}

				template += '<div class="content">'+
									'<p class="title">' + json.file_name + '</p>'+
									'<p class="size"></p>'+
									'<p class="meta"></p>'+
								'</div>'+
				    		'</li>';
				var insertBtn = this.createInsertBtn(json.attach_id),
				    deleteBtn = this.createDeleteBtn(json.delete_link),
				    hiddenInput = this.createHiddenInput(json.attach_id);

				template = this.toElement(template), _this = this;

				$(template).find('.meta').append(deleteBtn);
				$(template).find('.meta').append(insertBtn);
				$(template).find('.meta').append(hiddenInput);
		    	$(this.container).find('.upload-list').append(template);
		    }
		}



	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"=="function"&&__webpack_require__(9)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return n}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});

	/***/ },
	/* 9 */
	/***/ function(module, exports) {

		/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

		/* WEBPACK VAR INJECTION */}.call(exports, {}))

	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		 * jQuery Form Plugin
		 * version: 3.51.0-2014.06.20
		 * Requires jQuery v1.5 or later
		 * Copyright (c) 2014 M. Alsup
		 * Examples and documentation at: http://malsup.com/jquery/form/
		 * Project repository: https://github.com/malsup/form
		 * Dual licensed under the MIT and GPL licenses.
		 * https://github.com/malsup/form#copyright-and-license
		 */
		!function(e){"use strict"; true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"=="function"&&__webpack_require__(9)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return m}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});

	/***/ },
	/* 12 */
	/***/ function(module, exports) {

		/*
		 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
		 * Digest Algorithm, as defined in RFC 1321.
		 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
		 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
		 * Distributed under the BSD License
		 * See http://pajhome.org.uk/crypt/md5 for more info.
		*/

		/*
		 * Configurable variables. You may need to tweak these to be compatible with
		 * the server-side, but the defaults work in most cases.
		 */
		var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
		var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
		var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

		/*
		 * These are the functions you'll usually want to call
		 * They take string arguments and return either hex or base-64 encoded strings
		 */
		function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
		function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
		function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
		function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
		function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
		function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

		function core_md5(c,g){c[g>>5]|=128<<g%32;c[(g+64>>>9<<4)+14]=g;for(var a=1732584193,b=-271733879,d=-1732584194,e=271733878,f=0;f<c.length;f+=16)var h=a,i=b,j=d,k=e,a=md5_ff(a,b,d,e,c[f+0],7,-680876936),e=md5_ff(e,a,b,d,c[f+1],12,-389564586),d=md5_ff(d,e,a,b,c[f+2],17,606105819),b=md5_ff(b,d,e,a,c[f+3],22,-1044525330),a=md5_ff(a,b,d,e,c[f+4],7,-176418897),e=md5_ff(e,a,b,d,c[f+5],12,1200080426),d=md5_ff(d,e,a,b,c[f+6],17,-1473231341),b=md5_ff(b,d,e,a,c[f+7],22,-45705983),a=md5_ff(a,b,d,e,c[f+8],7,1770035416),e=md5_ff(e,a,b,d,c[f+9],12,-1958414417),d=md5_ff(d,e,a,b,c[f+10],17,-42063),b=md5_ff(b,d,e,a,c[f+11],22,-1990404162),a=md5_ff(a,b,d,e,c[f+12],7,1804603682),e=md5_ff(e,a,b,d,c[f+13],12,-40341101),d=md5_ff(d,e,a,b,c[f+14],17,-1502002290),b=md5_ff(b,d,e,a,c[f+15],22,1236535329),a=md5_gg(a,b,d,e,c[f+1],5,-165796510),e=md5_gg(e,a,b,d,c[f+6],9,-1069501632),d=md5_gg(d,e,a,b,c[f+11],14,643717713),b=md5_gg(b,d,e,a,c[f+0],20,-373897302),a=md5_gg(a,b,d,e,c[f+5],5,-701558691),e=md5_gg(e,a,b,d,c[f+10],9,38016083),d=md5_gg(d,e,a,b,c[f+15],14,-660478335),b=md5_gg(b,d,e,a,c[f+4],20,-405537848),a=md5_gg(a,b,d,e,c[f+9],5,568446438),e=md5_gg(e,a,b,d,c[f+14],9,-1019803690),d=md5_gg(d,e,a,b,c[f+3],14,-187363961),b=md5_gg(b,d,e,a,c[f+8],20,1163531501),a=md5_gg(a,b,d,e,c[f+13],5,-1444681467),e=md5_gg(e,a,b,d,c[f+2],9,-51403784),d=md5_gg(d,e,a,b,c[f+7],14,1735328473),b=md5_gg(b,d,e,a,c[f+12],20,-1926607734),a=md5_hh(a,b,d,e,c[f+5],4,-378558),e=md5_hh(e,a,b,d,c[f+8],11,-2022574463),d=md5_hh(d,e,a,b,c[f+11],16,1839030562),b=md5_hh(b,d,e,a,c[f+14],23,-35309556),a=md5_hh(a,b,d,e,c[f+1],4,-1530992060),e=md5_hh(e,a,b,d,c[f+4],11,1272893353),d=md5_hh(d,e,a,b,c[f+7],16,-155497632),b=md5_hh(b,d,e,a,c[f+10],23,-1094730640),a=md5_hh(a,b,d,e,c[f+13],4,681279174),e=md5_hh(e,a,b,d,c[f+0],11,-358537222),d=md5_hh(d,e,a,b,c[f+3],16,-722521979),b=md5_hh(b,d,e,a,c[f+6],23,76029189),a=md5_hh(a,b,d,e,c[f+9],4,-640364487),e=md5_hh(e,a,b,d,c[f+12],11,-421815835),d=md5_hh(d,e,a,b,c[f+15],16,530742520),b=md5_hh(b,d,e,a,c[f+2],23,-995338651),a=md5_ii(a,b,d,e,c[f+0],6,-198630844),e=md5_ii(e,a,b,d,c[f+7],10,1126891415),d=md5_ii(d,e,a,b,c[f+14],15,-1416354905),b=md5_ii(b,d,e,a,c[f+5],21,-57434055),a=md5_ii(a,b,d,e,c[f+12],6,1700485571),e=md5_ii(e,a,b,d,c[f+3],10,-1894986606),d=md5_ii(d,e,a,b,c[f+10],15,-1051523),b=md5_ii(b,d,e,a,c[f+1],21,-2054922799),a=md5_ii(a,b,d,e,c[f+8],6,1873313359),e=md5_ii(e,a,b,d,c[f+15],10,-30611744),d=md5_ii(d,e,a,b,c[f+6],15,-1560198380),b=md5_ii(b,d,e,a,c[f+13],21,1309151649),a=md5_ii(a,b,d,e,c[f+4],6,-145523070),e=md5_ii(e,a,b,d,c[f+11],10,-1120210379),d=md5_ii(d,e,a,b,c[f+2],15,718787259),b=md5_ii(b,d,e,a,c[f+9],21,-343485551),a=safe_add(a,h),b=safe_add(b,i),d=safe_add(d,j),e=safe_add(e,k);return[a,b,d,e]}function md5_cmn(c,g,a,b,d,e){return safe_add(bit_rol(safe_add(safe_add(g,c),safe_add(b,e)),d),a)}function md5_ff(c,g,a,b,d,e,f){return md5_cmn(g&a|~g&b,c,g,d,e,f)}function md5_gg(c,g,a,b,d,e,f){return md5_cmn(g&b|a&~b,c,g,d,e,f)}function md5_hh(c,g,a,b,d,e,f){return md5_cmn(g^a^b,c,g,d,e,f)}function md5_ii(c,g,a,b,d,e,f){return md5_cmn(a^(g|~b),c,g,d,e,f)}function core_hmac_md5(c,g){var a=str2binl(c);16<a.length&&(a=core_md5(a,c.length*chrsz));for(var b=Array(16),d=Array(16),e=0;16>e;e++)b[e]=a[e]^909522486,d[e]=a[e]^1549556828;a=core_md5(b.concat(str2binl(g)),512+g.length*chrsz);return core_md5(d.concat(a),640)}function safe_add(c,g){var a=(c&65535)+(g&65535);return(c>>16)+(g>>16)+(a>>16)<<16|a&65535}function bit_rol(c,g){return c<<g|c>>>32-g}function str2binl(c){for(var g=[],a=(1<<chrsz)-1,b=0;b<c.length*chrsz;b+=chrsz)g[b>>5]|=(c.charCodeAt(b/chrsz)&a)<<b%32;return g}function binl2str(c){for(var g="",a=(1<<chrsz)-1,b=0;b<32*c.length;b+=chrsz)g+=String.fromCharCode(c[b>>5]>>>b%32&a);return g}function binl2hex(c){for(var g=hexcase?"0123456789ABCDEF":"0123456789abcdef",a="",b=0;b<4*c.length;b++)a+=g.charAt(c[b>>2]>>8*(b%4)+4&15)+g.charAt(c[b>>2]>>8*(b%4)&15);return a}function binl2b64(c){for(var g="",a=0;a<4*c.length;a+=3)for(var b=(c[a>>2]>>8*(a%4)&255)<<16|(c[a+1>>2]>>8*((a+1)%4)&255)<<8|c[a+2>>2]>>8*((a+2)%4)&255,d=0;4>d;d++)g=8*a+6*d>32*c.length?g+b64pad:g+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b>>6*(3-d)&63);return g}function str_to_ent(c){var g="",a;for(a=0;a<c.length;a++){var b=c.charCodeAt(a),d="";if(255<b){for(;1<=b;)d="0123456789".charAt(b%10)+d,b/=10;""==d&&(d="0");d="#"+d;d="&"+d;d+=";";g+=d}else g+=c.charAt(a)}return g}function trim(c){for(;" "==c.substring(0,1);)c=c.substring(1,c.length);for(;" "==c.substring(c.length-1,c.length);)c=c.substring(0,c.length-1);return c};

	/***/ },
	/* 13 */
	/***/ function(module, exports) {

		/* Respond.js: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */
		(function( w ){

			"use strict";

			//exposed namespace
			var respond = {};
			w.respond = respond;

			//define update even in native-mq-supporting browsers, to avoid errors
			respond.update = function(){};

			//define ajax obj
			var requestQueue = [],
				xmlHttp = (function() {
					var xmlhttpmethod = false;
					try {
						xmlhttpmethod = new w.XMLHttpRequest();
					}
					catch( e ){
						xmlhttpmethod = new w.ActiveXObject( "Microsoft.XMLHTTP" );
					}
					return function(){
						return xmlhttpmethod;
					};
				})(),

				//tweaked Ajax functions from Quirksmode
				ajax = function( url, callback ) {
					var req = xmlHttp();
					if (!req){
						return;
					}
					req.open( "GET", url, true );
					req.onreadystatechange = function () {
						if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
							return;
						}
						callback( req.responseText );
					};
					if ( req.readyState === 4 ){
						return;
					}
					req.send( null );
				},
				isUnsupportedMediaQuery = function( query ) {
					return query.replace( respond.regex.minmaxwh, '' ).match( respond.regex.other );
				};

			//expose for testing
			respond.ajax = ajax;
			respond.queue = requestQueue;
			respond.unsupportedmq = isUnsupportedMediaQuery;
			respond.regex = {
				media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
				keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
				comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
				urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
				findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
				only: /(only\s+)?([a-zA-Z]+)\s?/,
				minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
				maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
				minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
				other: /\([^\)]*\)/g
			};

			//expose media query support flag for external use
			respond.mediaQueriesSupported = w.matchMedia && w.matchMedia( "only all" ) !== null && w.matchMedia( "only all" ).matches;

			//if media queries are supported, exit here
			if( respond.mediaQueriesSupported ){
				return;
			}

			//define vars
			var doc = w.document,
				docElem = doc.documentElement,
				mediastyles = [],
				rules = [],
				appendedEls = [],
				parsedSheets = {},
				resizeThrottle = 30,
				head = doc.getElementsByTagName( "head" )[0] || docElem,
				base = doc.getElementsByTagName( "base" )[0],
				links = head.getElementsByTagName( "link" ),

				lastCall,
				resizeDefer,

				//cached container for 1em value, populated the first time it's needed
				eminpx,

				// returns the value of 1em in pixels
				getEmValue = function() {
					var ret,
						div = doc.createElement('div'),
						body = doc.body,
						originalHTMLFontSize = docElem.style.fontSize,
						originalBodyFontSize = body && body.style.fontSize,
						fakeUsed = false;

					div.style.cssText = "position:absolute;font-size:1em;width:1em";

					if( !body ){
						body = fakeUsed = doc.createElement( "body" );
						body.style.background = "none";
					}

					// 1em in a media query is the value of the default font size of the browser
					// reset docElem and body to ensure the correct value is returned
					docElem.style.fontSize = "100%";
					body.style.fontSize = "100%";

					body.appendChild( div );

					if( fakeUsed ){
						docElem.insertBefore( body, docElem.firstChild );
					}

					ret = div.offsetWidth;

					if( fakeUsed ){
						docElem.removeChild( body );
					}
					else {
						body.removeChild( div );
					}

					// restore the original values
					docElem.style.fontSize = originalHTMLFontSize;
					if( originalBodyFontSize ) {
						body.style.fontSize = originalBodyFontSize;
					}


					//also update eminpx before returning
					ret = eminpx = parseFloat(ret);

					return ret;
				},

				//enable/disable styles
				applyMedia = function( fromResize ){
					var name = "clientWidth",
						docElemProp = docElem[ name ],
						currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[ name ] || docElemProp,
						styleBlocks	= {},
						lastLink = links[ links.length-1 ],
						now = (new Date()).getTime();

					//throttle resize calls
					if( fromResize && lastCall && now - lastCall < resizeThrottle ){
						w.clearTimeout( resizeDefer );
						resizeDefer = w.setTimeout( applyMedia, resizeThrottle );
						return;
					}
					else {
						lastCall = now;
					}

					for( var i in mediastyles ){
						if( mediastyles.hasOwnProperty( i ) ){
							var thisstyle = mediastyles[ i ],
								min = thisstyle.minw,
								max = thisstyle.maxw,
								minnull = min === null,
								maxnull = max === null,
								em = "em";

							if( !!min ){
								min = parseFloat( min ) * ( min.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
							}
							if( !!max ){
								max = parseFloat( max ) * ( max.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
							}

							// if there's no media query at all (the () part), or min or max is not null, and if either is present, they're true
							if( !thisstyle.hasquery || ( !minnull || !maxnull ) && ( minnull || currWidth >= min ) && ( maxnull || currWidth <= max ) ){
								if( !styleBlocks[ thisstyle.media ] ){
									styleBlocks[ thisstyle.media ] = [];
								}
								styleBlocks[ thisstyle.media ].push( rules[ thisstyle.rules ] );
							}
						}
					}

					//remove any existing respond style element(s)
					for( var j in appendedEls ){
						if( appendedEls.hasOwnProperty( j ) ){
							if( appendedEls[ j ] && appendedEls[ j ].parentNode === head ){
								head.removeChild( appendedEls[ j ] );
							}
						}
					}
					appendedEls.length = 0;

					//inject active styles, grouped by media type
					for( var k in styleBlocks ){
						if( styleBlocks.hasOwnProperty( k ) ){
							var ss = doc.createElement( "style" ),
								css = styleBlocks[ k ].join( "\n" );

							ss.type = "text/css";
							ss.media = k;

							//originally, ss was appended to a documentFragment and sheets were appended in bulk.
							//this caused crashes in IE in a number of circumstances, such as when the HTML element had a bg image set, so appending beforehand seems best. Thanks to @dvelyk for the initial research on this one!
							head.insertBefore( ss, lastLink.nextSibling );

							if ( ss.styleSheet ){
								ss.styleSheet.cssText = css;
							}
							else {
								ss.appendChild( doc.createTextNode( css ) );
							}

							//push to appendedEls to track for later removal
							appendedEls.push( ss );
						}
					}
				},
				//find media blocks in css text, convert to style blocks
				translate = function( styles, href, media ){
					var qs = styles.replace( respond.regex.comments, '' )
							.replace( respond.regex.keyframes, '' )
							.match( respond.regex.media ),
						ql = qs && qs.length || 0;

					//try to get CSS path
					href = href.substring( 0, href.lastIndexOf( "/" ) );

					var repUrls = function( css ){
							return css.replace( respond.regex.urls, "$1" + href + "$2$3" );
						},
						useMedia = !ql && media;

					//if path exists, tack on trailing slash
					if( href.length ){ href += "/"; }

					//if no internal queries exist, but media attr does, use that
					//note: this currently lacks support for situations where a media attr is specified on a link AND
						//its associated stylesheet has internal CSS media queries.
						//In those cases, the media attribute will currently be ignored.
					if( useMedia ){
						ql = 1;
					}

					for( var i = 0; i < ql; i++ ){
						var fullq, thisq, eachq, eql;

						//media attr
						if( useMedia ){
							fullq = media;
							rules.push( repUrls( styles ) );
						}
						//parse for styles
						else{
							fullq = qs[ i ].match( respond.regex.findStyles ) && RegExp.$1;
							rules.push( RegExp.$2 && repUrls( RegExp.$2 ) );
						}

						eachq = fullq.split( "," );
						eql = eachq.length;

						for( var j = 0; j < eql; j++ ){
							thisq = eachq[ j ];

							if( isUnsupportedMediaQuery( thisq ) ) {
								continue;
							}

							mediastyles.push( {
								media : thisq.split( "(" )[ 0 ].match( respond.regex.only ) && RegExp.$2 || "all",
								rules : rules.length - 1,
								hasquery : thisq.indexOf("(") > -1,
								minw : thisq.match( respond.regex.minw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
								maxw : thisq.match( respond.regex.maxw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" )
							} );
						}
					}

					applyMedia();
				},

				//recurse through request queue, get css text
				makeRequests = function(){
					if( requestQueue.length ){
						var thisRequest = requestQueue.shift();

						ajax( thisRequest.href, function( styles ){
							translate( styles, thisRequest.href, thisRequest.media );
							parsedSheets[ thisRequest.href ] = true;

							// by wrapping recursive function call in setTimeout
							// we prevent "Stack overflow" error in IE7
							w.setTimeout(function(){ makeRequests(); },0);
						} );
					}
				},

				//loop stylesheets, send text content to translate
				ripCSS = function(){

					for( var i = 0; i < links.length; i++ ){
						var sheet = links[ i ],
						href = sheet.href,
						media = sheet.media,
						isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

						//only links plz and prevent re-parsing
						if( !!href && isCSS && !parsedSheets[ href ] ){
							// selectivizr exposes css through the rawCssText expando
							if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
								translate( sheet.styleSheet.rawCssText, href, media );
								parsedSheets[ href ] = true;
							} else {
								if( (!/^([a-zA-Z:]*\/\/)/.test( href ) && !base) ||
									href.replace( RegExp.$1, "" ).split( "/" )[0] === w.location.host ){
									// IE7 doesn't handle urls that start with '//' for ajax request
									// manually add in the protocol
									if ( href.substring(0,2) === "//" ) { href = w.location.protocol + href; }
									requestQueue.push( {
										href: href,
										media: media
									} );
								}
							}
						}
					}
					makeRequests();
				};

			//translate CSS
			ripCSS();

			//expose update for re-running respond later on
			respond.update = ripCSS;

			//expose getEmValue
			respond.getEmValue = getEmValue;

			//adjust on resize
			function callMedia(){
				applyMedia( true );
			}

			if( w.addEventListener ){
				w.addEventListener( "resize", callMedia, false );
			}
			else if( w.attachEvent ){
				w.attachEvent( "onresize", callMedia );
			}
		})(this);


	/***/ }
	/******/ ]);

/***/ },
/* 6 */
/***/ function(module, exports) {

	window.onload = function()
	{
		if (/MSIE 6/.test(navigator.userAgent) || /MSIE 7/.test(navigator.userAgent))
		{
			var newNode = document.createElement("div");
				newNode.setAttribute('id', 'browser-not-support');
		        newNode.innerHTML = '<img class="pull-left" src="'+ G_STATIC_URL +'/css/default/img/404-logo.png" alt="" />'+
						'<div class="pull-left content">'+
							'<h1>您的浏览器<span>不受支持</span></h1>'+
							'<p>您的浏览器版本非常旧, 存在诸多安全和体验问题! 建议<a href="http://windows.microsoft.com/zh-cn/windows/upgrade-your-browser">更新</a>或者使用其他浏览器来访问, 如果您使用的是搜狗、360、遨游等双核浏览器, 请切换到极速模式以获得更好的体验</p>'+
							'<ul>'+
								'<li><a href="http://www.google.cn/intl/zh-CN/chrome/browser/">￮ Google 浏览器</a></li>'+
								'<li><a href="http://opera.com/">￮ Opera 浏览器</a></li>'+
								'<li><a href="http://www.mozilla.com/firefox/">￮ Firefox 浏览器</a></li>'+
							'</ul>'+
						'</div>';
			document.getElementsByTagName('body')[0].appendChild(newNode);
		}
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright 2006 Google Inc.
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//   http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.


	// Known Issues:
	//
	// * Patterns only support repeat.
	// * Radial gradient are not implemented. The VML version of these look very
	//   different from the canvas one.
	// * Clipping paths are not implemented.
	// * Coordsize. The width and height attribute have higher priority than the
	//   width and height style values which isn't correct.
	// * Painting mode isn't implemented.
	// * Canvas width/height should is using content-box by default. IE in
	//   Quirks mode will draw the canvas using border-box. Either change your
	//   doctype to HTML5
	//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
	//   or use Box Sizing Behavior from WebFX
	//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
	// * Non uniform scaling does not correctly scale strokes.
	// * Optimize. There is always room for speed improvements.

	// Only add this code if we do not already have a canvas implementation
	if (!document.createElement('canvas').getContext) {

	(function() {

	  // alias some functions to make (compiled) code shorter
	  var m = Math;
	  var mr = m.round;
	  var ms = m.sin;
	  var mc = m.cos;
	  var abs = m.abs;
	  var sqrt = m.sqrt;

	  // this is used for sub pixel precision
	  var Z = 10;
	  var Z2 = Z / 2;

	  var IE_VERSION = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];

	  /**
	   * This funtion is assigned to the <canvas> elements as element.getContext().
	   * @this {HTMLElement}
	   * @return {CanvasRenderingContext2D_}
	   */
	  function getContext() {
	    return this.context_ ||
	        (this.context_ = new CanvasRenderingContext2D_(this));
	  }

	  var slice = Array.prototype.slice;

	  /**
	   * Binds a function to an object. The returned function will always use the
	   * passed in {@code obj} as {@code this}.
	   *
	   * Example:
	   *
	   *   g = bind(f, obj, a, b)
	   *   g(c, d) // will do f.call(obj, a, b, c, d)
	   *
	   * @param {Function} f The function to bind the object to
	   * @param {Object} obj The object that should act as this when the function
	   *     is called
	   * @param {*} var_args Rest arguments that will be used as the initial
	   *     arguments when the function is called
	   * @return {Function} A new function that has bound this
	   */
	  function bind(f, obj, var_args) {
	    var a = slice.call(arguments, 2);
	    return function() {
	      return f.apply(obj, a.concat(slice.call(arguments)));
	    };
	  }

	  function encodeHtmlAttribute(s) {
	    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
	  }

	  function addNamespace(doc, prefix, urn) {
	    if (!doc.namespaces[prefix]) {
	      doc.namespaces.add(prefix, urn, '#default#VML');
	    }
	  }

	  function addNamespacesAndStylesheet(doc) {
	    addNamespace(doc, 'g_vml_', 'urn:schemas-microsoft-com:vml');
	    addNamespace(doc, 'g_o_', 'urn:schemas-microsoft-com:office:office');

	    // Setup default CSS.  Only add one style sheet per document
	    if (!doc.styleSheets['ex_canvas_']) {
	      var ss = doc.createStyleSheet();
	      ss.owningElement.id = 'ex_canvas_';
	      ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
	          // default size is 300x150 in Gecko and Opera
	          'text-align:left;width:300px;height:150px}';
	    }
	  }

	  // Add namespaces and stylesheet at startup.
	  addNamespacesAndStylesheet(document);

	  var G_vmlCanvasManager_ = {
	    init: function(opt_doc) {
	      var doc = opt_doc || document;
	      // Create a dummy element so that IE will allow canvas elements to be
	      // recognized.
	      doc.createElement('canvas');
	      doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));
	    },

	    init_: function(doc) {
	      // find all canvas elements
	      var els = doc.getElementsByTagName('canvas');
	      for (var i = 0; i < els.length; i++) {
	        this.initElement(els[i]);
	      }
	    },

	    /**
	     * Public initializes a canvas element so that it can be used as canvas
	     * element from now on. This is called automatically before the page is
	     * loaded but if you are creating elements using createElement you need to
	     * make sure this is called on the element.
	     * @param {HTMLElement} el The canvas element to initialize.
	     * @return {HTMLElement} the element that was created.
	     */
	    initElement: function(el) {
	      if (!el.getContext) {
	        el.getContext = getContext;

	        // Add namespaces and stylesheet to document of the element.
	        addNamespacesAndStylesheet(el.ownerDocument);

	        // Remove fallback content. There is no way to hide text nodes so we
	        // just remove all childNodes. We could hide all elements and remove
	        // text nodes but who really cares about the fallback content.
	        el.innerHTML = '';

	        // do not use inline function because that will leak memory
	        el.attachEvent('onpropertychange', onPropertyChange);
	        el.attachEvent('onresize', onResize);

	        var attrs = el.attributes;
	        if (attrs.width && attrs.width.specified) {
	          // TODO: use runtimeStyle and coordsize
	          // el.getContext().setWidth_(attrs.width.nodeValue);
	          el.style.width = attrs.width.nodeValue + 'px';
	        } else {
	          el.width = el.clientWidth;
	        }
	        if (attrs.height && attrs.height.specified) {
	          // TODO: use runtimeStyle and coordsize
	          // el.getContext().setHeight_(attrs.height.nodeValue);
	          el.style.height = attrs.height.nodeValue + 'px';
	        } else {
	          el.height = el.clientHeight;
	        }
	        //el.getContext().setCoordsize_()
	      }
	      return el;
	    }
	  };

	  function onPropertyChange(e) {
	    var el = e.srcElement;

	    switch (e.propertyName) {
	      case 'width':
	        el.getContext().clearRect();
	        el.style.width = el.attributes.width.nodeValue + 'px';
	        // In IE8 this does not trigger onresize.
	        el.firstChild.style.width =  el.clientWidth + 'px';
	        break;
	      case 'height':
	        el.getContext().clearRect();
	        el.style.height = el.attributes.height.nodeValue + 'px';
	        el.firstChild.style.height = el.clientHeight + 'px';
	        break;
	    }
	  }

	  function onResize(e) {
	    var el = e.srcElement;
	    if (el.firstChild) {
	      el.firstChild.style.width =  el.clientWidth + 'px';
	      el.firstChild.style.height = el.clientHeight + 'px';
	    }
	  }

	  G_vmlCanvasManager_.init();

	  // precompute "00" to "FF"
	  var decToHex = [];
	  for (var i = 0; i < 16; i++) {
	    for (var j = 0; j < 16; j++) {
	      decToHex[i * 16 + j] = i.toString(16) + j.toString(16);
	    }
	  }

	  function createMatrixIdentity() {
	    return [
	      [1, 0, 0],
	      [0, 1, 0],
	      [0, 0, 1]
	    ];
	  }

	  function matrixMultiply(m1, m2) {
	    var result = createMatrixIdentity();

	    for (var x = 0; x < 3; x++) {
	      for (var y = 0; y < 3; y++) {
	        var sum = 0;

	        for (var z = 0; z < 3; z++) {
	          sum += m1[x][z] * m2[z][y];
	        }

	        result[x][y] = sum;
	      }
	    }
	    return result;
	  }

	  function copyState(o1, o2) {
	    o2.fillStyle     = o1.fillStyle;
	    o2.lineCap       = o1.lineCap;
	    o2.lineJoin      = o1.lineJoin;
	    o2.lineWidth     = o1.lineWidth;
	    o2.miterLimit    = o1.miterLimit;
	    o2.shadowBlur    = o1.shadowBlur;
	    o2.shadowColor   = o1.shadowColor;
	    o2.shadowOffsetX = o1.shadowOffsetX;
	    o2.shadowOffsetY = o1.shadowOffsetY;
	    o2.strokeStyle   = o1.strokeStyle;
	    o2.globalAlpha   = o1.globalAlpha;
	    o2.font          = o1.font;
	    o2.textAlign     = o1.textAlign;
	    o2.textBaseline  = o1.textBaseline;
	    o2.arcScaleX_    = o1.arcScaleX_;
	    o2.arcScaleY_    = o1.arcScaleY_;
	    o2.lineScale_    = o1.lineScale_;
	  }

	  var colorData = {
	    aliceblue: '#F0F8FF',
	    antiquewhite: '#FAEBD7',
	    aquamarine: '#7FFFD4',
	    azure: '#F0FFFF',
	    beige: '#F5F5DC',
	    bisque: '#FFE4C4',
	    black: '#000000',
	    blanchedalmond: '#FFEBCD',
	    blueviolet: '#8A2BE2',
	    brown: '#A52A2A',
	    burlywood: '#DEB887',
	    cadetblue: '#5F9EA0',
	    chartreuse: '#7FFF00',
	    chocolate: '#D2691E',
	    coral: '#FF7F50',
	    cornflowerblue: '#6495ED',
	    cornsilk: '#FFF8DC',
	    crimson: '#DC143C',
	    cyan: '#00FFFF',
	    darkblue: '#00008B',
	    darkcyan: '#008B8B',
	    darkgoldenrod: '#B8860B',
	    darkgray: '#A9A9A9',
	    darkgreen: '#006400',
	    darkgrey: '#A9A9A9',
	    darkkhaki: '#BDB76B',
	    darkmagenta: '#8B008B',
	    darkolivegreen: '#556B2F',
	    darkorange: '#FF8C00',
	    darkorchid: '#9932CC',
	    darkred: '#8B0000',
	    darksalmon: '#E9967A',
	    darkseagreen: '#8FBC8F',
	    darkslateblue: '#483D8B',
	    darkslategray: '#2F4F4F',
	    darkslategrey: '#2F4F4F',
	    darkturquoise: '#00CED1',
	    darkviolet: '#9400D3',
	    deeppink: '#FF1493',
	    deepskyblue: '#00BFFF',
	    dimgray: '#696969',
	    dimgrey: '#696969',
	    dodgerblue: '#1E90FF',
	    firebrick: '#B22222',
	    floralwhite: '#FFFAF0',
	    forestgreen: '#228B22',
	    gainsboro: '#DCDCDC',
	    ghostwhite: '#F8F8FF',
	    gold: '#FFD700',
	    goldenrod: '#DAA520',
	    grey: '#808080',
	    greenyellow: '#ADFF2F',
	    honeydew: '#F0FFF0',
	    hotpink: '#FF69B4',
	    indianred: '#CD5C5C',
	    indigo: '#4B0082',
	    ivory: '#FFFFF0',
	    khaki: '#F0E68C',
	    lavender: '#E6E6FA',
	    lavenderblush: '#FFF0F5',
	    lawngreen: '#7CFC00',
	    lemonchiffon: '#FFFACD',
	    lightblue: '#ADD8E6',
	    lightcoral: '#F08080',
	    lightcyan: '#E0FFFF',
	    lightgoldenrodyellow: '#FAFAD2',
	    lightgreen: '#90EE90',
	    lightgrey: '#D3D3D3',
	    lightpink: '#FFB6C1',
	    lightsalmon: '#FFA07A',
	    lightseagreen: '#20B2AA',
	    lightskyblue: '#87CEFA',
	    lightslategray: '#778899',
	    lightslategrey: '#778899',
	    lightsteelblue: '#B0C4DE',
	    lightyellow: '#FFFFE0',
	    limegreen: '#32CD32',
	    linen: '#FAF0E6',
	    magenta: '#FF00FF',
	    mediumaquamarine: '#66CDAA',
	    mediumblue: '#0000CD',
	    mediumorchid: '#BA55D3',
	    mediumpurple: '#9370DB',
	    mediumseagreen: '#3CB371',
	    mediumslateblue: '#7B68EE',
	    mediumspringgreen: '#00FA9A',
	    mediumturquoise: '#48D1CC',
	    mediumvioletred: '#C71585',
	    midnightblue: '#191970',
	    mintcream: '#F5FFFA',
	    mistyrose: '#FFE4E1',
	    moccasin: '#FFE4B5',
	    navajowhite: '#FFDEAD',
	    oldlace: '#FDF5E6',
	    olivedrab: '#6B8E23',
	    orange: '#FFA500',
	    orangered: '#FF4500',
	    orchid: '#DA70D6',
	    palegoldenrod: '#EEE8AA',
	    palegreen: '#98FB98',
	    paleturquoise: '#AFEEEE',
	    palevioletred: '#DB7093',
	    papayawhip: '#FFEFD5',
	    peachpuff: '#FFDAB9',
	    peru: '#CD853F',
	    pink: '#FFC0CB',
	    plum: '#DDA0DD',
	    powderblue: '#B0E0E6',
	    rosybrown: '#BC8F8F',
	    royalblue: '#4169E1',
	    saddlebrown: '#8B4513',
	    salmon: '#FA8072',
	    sandybrown: '#F4A460',
	    seagreen: '#2E8B57',
	    seashell: '#FFF5EE',
	    sienna: '#A0522D',
	    skyblue: '#87CEEB',
	    slateblue: '#6A5ACD',
	    slategray: '#708090',
	    slategrey: '#708090',
	    snow: '#FFFAFA',
	    springgreen: '#00FF7F',
	    steelblue: '#4682B4',
	    tan: '#D2B48C',
	    thistle: '#D8BFD8',
	    tomato: '#FF6347',
	    turquoise: '#40E0D0',
	    violet: '#EE82EE',
	    wheat: '#F5DEB3',
	    whitesmoke: '#F5F5F5',
	    yellowgreen: '#9ACD32'
	  };


	  function getRgbHslContent(styleString) {
	    var start = styleString.indexOf('(', 3);
	    var end = styleString.indexOf(')', start + 1);
	    var parts = styleString.substring(start + 1, end).split(',');
	    // add alpha if needed
	    if (parts.length != 4 || styleString.charAt(3) != 'a') {
	      parts[3] = 1;
	    }
	    return parts;
	  }

	  function percent(s) {
	    return parseFloat(s) / 100;
	  }

	  function clamp(v, min, max) {
	    return Math.min(max, Math.max(min, v));
	  }

	  function hslToRgb(parts){
	    var r, g, b, h, s, l;
	    h = parseFloat(parts[0]) / 360 % 360;
	    if (h < 0)
	      h++;
	    s = clamp(percent(parts[1]), 0, 1);
	    l = clamp(percent(parts[2]), 0, 1);
	    if (s == 0) {
	      r = g = b = l; // achromatic
	    } else {
	      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	      var p = 2 * l - q;
	      r = hueToRgb(p, q, h + 1 / 3);
	      g = hueToRgb(p, q, h);
	      b = hueToRgb(p, q, h - 1 / 3);
	    }

	    return '#' + decToHex[Math.floor(r * 255)] +
	        decToHex[Math.floor(g * 255)] +
	        decToHex[Math.floor(b * 255)];
	  }

	  function hueToRgb(m1, m2, h) {
	    if (h < 0)
	      h++;
	    if (h > 1)
	      h--;

	    if (6 * h < 1)
	      return m1 + (m2 - m1) * 6 * h;
	    else if (2 * h < 1)
	      return m2;
	    else if (3 * h < 2)
	      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
	    else
	      return m1;
	  }

	  var processStyleCache = {};

	  function processStyle(styleString) {
	    if (styleString in processStyleCache) {
	      return processStyleCache[styleString];
	    }

	    var str, alpha = 1;

	    styleString = String(styleString);
	    if (styleString.charAt(0) == '#') {
	      str = styleString;
	    } else if (/^rgb/.test(styleString)) {
	      var parts = getRgbHslContent(styleString);
	      var str = '#', n;
	      for (var i = 0; i < 3; i++) {
	        if (parts[i].indexOf('%') != -1) {
	          n = Math.floor(percent(parts[i]) * 255);
	        } else {
	          n = +parts[i];
	        }
	        str += decToHex[clamp(n, 0, 255)];
	      }
	      alpha = +parts[3];
	    } else if (/^hsl/.test(styleString)) {
	      var parts = getRgbHslContent(styleString);
	      str = hslToRgb(parts);
	      alpha = parts[3];
	    } else {
	      str = colorData[styleString] || styleString;
	    }
	    return processStyleCache[styleString] = {color: str, alpha: alpha};
	  }

	  var DEFAULT_STYLE = {
	    style: 'normal',
	    variant: 'normal',
	    weight: 'normal',
	    size: 10,
	    family: 'sans-serif'
	  };

	  // Internal text style cache
	  var fontStyleCache = {};

	  function processFontStyle(styleString) {
	    if (fontStyleCache[styleString]) {
	      return fontStyleCache[styleString];
	    }

	    var el = document.createElement('div');
	    var style = el.style;
	    try {
	      style.font = styleString;
	    } catch (ex) {
	      // Ignore failures to set to invalid font.
	    }

	    return fontStyleCache[styleString] = {
	      style: style.fontStyle || DEFAULT_STYLE.style,
	      variant: style.fontVariant || DEFAULT_STYLE.variant,
	      weight: style.fontWeight || DEFAULT_STYLE.weight,
	      size: style.fontSize || DEFAULT_STYLE.size,
	      family: style.fontFamily || DEFAULT_STYLE.family
	    };
	  }

	  function getComputedStyle(style, element) {
	    var computedStyle = {};

	    for (var p in style) {
	      computedStyle[p] = style[p];
	    }

	    // Compute the size
	    var canvasFontSize = parseFloat(element.currentStyle.fontSize),
	        fontSize = parseFloat(style.size);

	    if (typeof style.size == 'number') {
	      computedStyle.size = style.size;
	    } else if (style.size.indexOf('px') != -1) {
	      computedStyle.size = fontSize;
	    } else if (style.size.indexOf('em') != -1) {
	      computedStyle.size = canvasFontSize * fontSize;
	    } else if(style.size.indexOf('%') != -1) {
	      computedStyle.size = (canvasFontSize / 100) * fontSize;
	    } else if (style.size.indexOf('pt') != -1) {
	      computedStyle.size = fontSize / .75;
	    } else {
	      computedStyle.size = canvasFontSize;
	    }

	    // Different scaling between normal text and VML text. This was found using
	    // trial and error to get the same size as non VML text.
	    computedStyle.size *= 0.981;

	    return computedStyle;
	  }

	  function buildStyle(style) {
	    return style.style + ' ' + style.variant + ' ' + style.weight + ' ' +
	        style.size + 'px ' + style.family;
	  }

	  var lineCapMap = {
	    'butt': 'flat',
	    'round': 'round'
	  };

	  function processLineCap(lineCap) {
	    return lineCapMap[lineCap] || 'square';
	  }

	  /**
	   * This class implements CanvasRenderingContext2D interface as described by
	   * the WHATWG.
	   * @param {HTMLElement} canvasElement The element that the 2D context should
	   * be associated with
	   */
	  function CanvasRenderingContext2D_(canvasElement) {
	    this.m_ = createMatrixIdentity();

	    this.mStack_ = [];
	    this.aStack_ = [];
	    this.currentPath_ = [];

	    // Canvas context properties
	    this.strokeStyle = '#000';
	    this.fillStyle = '#000';

	    this.lineWidth = 1;
	    this.lineJoin = 'miter';
	    this.lineCap = 'butt';
	    this.miterLimit = Z * 1;
	    this.globalAlpha = 1;
	    this.font = '10px sans-serif';
	    this.textAlign = 'left';
	    this.textBaseline = 'alphabetic';
	    this.canvas = canvasElement;

	    var cssText = 'width:' + canvasElement.clientWidth + 'px;height:' +
	        canvasElement.clientHeight + 'px;overflow:hidden;position:absolute';
	    var el = canvasElement.ownerDocument.createElement('div');
	    el.style.cssText = cssText;
	    canvasElement.appendChild(el);

	    var overlayEl = el.cloneNode(false);
	    // Use a non transparent background.
	    overlayEl.style.backgroundColor = 'red';
	    overlayEl.style.filter = 'alpha(opacity=0)';
	    canvasElement.appendChild(overlayEl);

	    this.element_ = el;
	    this.arcScaleX_ = 1;
	    this.arcScaleY_ = 1;
	    this.lineScale_ = 1;
	  }

	  var contextPrototype = CanvasRenderingContext2D_.prototype;
	  contextPrototype.clearRect = function() {
	    if (this.textMeasureEl_) {
	      this.textMeasureEl_.removeNode(true);
	      this.textMeasureEl_ = null;
	    }
	    this.element_.innerHTML = '';
	  };

	  contextPrototype.beginPath = function() {
	    // TODO: Branch current matrix so that save/restore has no effect
	    //       as per safari docs.
	    this.currentPath_ = [];
	  };

	  contextPrototype.moveTo = function(aX, aY) {
	    var p = getCoords(this, aX, aY);
	    this.currentPath_.push({type: 'moveTo', x: p.x, y: p.y});
	    this.currentX_ = p.x;
	    this.currentY_ = p.y;
	  };

	  contextPrototype.lineTo = function(aX, aY) {
	    var p = getCoords(this, aX, aY);
	    this.currentPath_.push({type: 'lineTo', x: p.x, y: p.y});

	    this.currentX_ = p.x;
	    this.currentY_ = p.y;
	  };

	  contextPrototype.bezierCurveTo = function(aCP1x, aCP1y,
	                                            aCP2x, aCP2y,
	                                            aX, aY) {
	    var p = getCoords(this, aX, aY);
	    var cp1 = getCoords(this, aCP1x, aCP1y);
	    var cp2 = getCoords(this, aCP2x, aCP2y);
	    bezierCurveTo(this, cp1, cp2, p);
	  };

	  // Helper function that takes the already fixed cordinates.
	  function bezierCurveTo(self, cp1, cp2, p) {
	    self.currentPath_.push({
	      type: 'bezierCurveTo',
	      cp1x: cp1.x,
	      cp1y: cp1.y,
	      cp2x: cp2.x,
	      cp2y: cp2.y,
	      x: p.x,
	      y: p.y
	    });
	    self.currentX_ = p.x;
	    self.currentY_ = p.y;
	  }

	  contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
	    // the following is lifted almost directly from
	    // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

	    var cp = getCoords(this, aCPx, aCPy);
	    var p = getCoords(this, aX, aY);

	    var cp1 = {
	      x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
	      y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
	    };
	    var cp2 = {
	      x: cp1.x + (p.x - this.currentX_) / 3.0,
	      y: cp1.y + (p.y - this.currentY_) / 3.0
	    };

	    bezierCurveTo(this, cp1, cp2, p);
	  };

	  contextPrototype.arc = function(aX, aY, aRadius,
	                                  aStartAngle, aEndAngle, aClockwise) {
	    aRadius *= Z;
	    var arcType = aClockwise ? 'at' : 'wa';

	    var xStart = aX + mc(aStartAngle) * aRadius - Z2;
	    var yStart = aY + ms(aStartAngle) * aRadius - Z2;

	    var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
	    var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

	    // IE won't render arches drawn counter clockwise if xStart == xEnd.
	    if (xStart == xEnd && !aClockwise) {
	      xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
	                       // that can be represented in binary
	    }

	    var p = getCoords(this, aX, aY);
	    var pStart = getCoords(this, xStart, yStart);
	    var pEnd = getCoords(this, xEnd, yEnd);

	    this.currentPath_.push({type: arcType,
	                           x: p.x,
	                           y: p.y,
	                           radius: aRadius,
	                           xStart: pStart.x,
	                           yStart: pStart.y,
	                           xEnd: pEnd.x,
	                           yEnd: pEnd.y});

	  };

	  contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
	    this.moveTo(aX, aY);
	    this.lineTo(aX + aWidth, aY);
	    this.lineTo(aX + aWidth, aY + aHeight);
	    this.lineTo(aX, aY + aHeight);
	    this.closePath();
	  };

	  contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
	    var oldPath = this.currentPath_;
	    this.beginPath();

	    this.moveTo(aX, aY);
	    this.lineTo(aX + aWidth, aY);
	    this.lineTo(aX + aWidth, aY + aHeight);
	    this.lineTo(aX, aY + aHeight);
	    this.closePath();
	    this.stroke();

	    this.currentPath_ = oldPath;
	  };

	  contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
	    var oldPath = this.currentPath_;
	    this.beginPath();

	    this.moveTo(aX, aY);
	    this.lineTo(aX + aWidth, aY);
	    this.lineTo(aX + aWidth, aY + aHeight);
	    this.lineTo(aX, aY + aHeight);
	    this.closePath();
	    this.fill();

	    this.currentPath_ = oldPath;
	  };

	  contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
	    var gradient = new CanvasGradient_('gradient');
	    gradient.x0_ = aX0;
	    gradient.y0_ = aY0;
	    gradient.x1_ = aX1;
	    gradient.y1_ = aY1;
	    return gradient;
	  };

	  contextPrototype.createRadialGradient = function(aX0, aY0, aR0,
	                                                   aX1, aY1, aR1) {
	    var gradient = new CanvasGradient_('gradientradial');
	    gradient.x0_ = aX0;
	    gradient.y0_ = aY0;
	    gradient.r0_ = aR0;
	    gradient.x1_ = aX1;
	    gradient.y1_ = aY1;
	    gradient.r1_ = aR1;
	    return gradient;
	  };

	  contextPrototype.drawImage = function(image, var_args) {
	    var dx, dy, dw, dh, sx, sy, sw, sh;

	    // to find the original width we overide the width and height
	    var oldRuntimeWidth = image.runtimeStyle.width;
	    var oldRuntimeHeight = image.runtimeStyle.height;
	    image.runtimeStyle.width = 'auto';
	    image.runtimeStyle.height = 'auto';

	    // get the original size
	    var w = image.width;
	    var h = image.height;

	    // and remove overides
	    image.runtimeStyle.width = oldRuntimeWidth;
	    image.runtimeStyle.height = oldRuntimeHeight;

	    if (arguments.length == 3) {
	      dx = arguments[1];
	      dy = arguments[2];
	      sx = sy = 0;
	      sw = dw = w;
	      sh = dh = h;
	    } else if (arguments.length == 5) {
	      dx = arguments[1];
	      dy = arguments[2];
	      dw = arguments[3];
	      dh = arguments[4];
	      sx = sy = 0;
	      sw = w;
	      sh = h;
	    } else if (arguments.length == 9) {
	      sx = arguments[1];
	      sy = arguments[2];
	      sw = arguments[3];
	      sh = arguments[4];
	      dx = arguments[5];
	      dy = arguments[6];
	      dw = arguments[7];
	      dh = arguments[8];
	    } else {
	      throw Error('Invalid number of arguments');
	    }

	    var d = getCoords(this, dx, dy);

	    var w2 = sw / 2;
	    var h2 = sh / 2;

	    var vmlStr = [];

	    var W = 10;
	    var H = 10;

	    // For some reason that I've now forgotten, using divs didn't work
	    vmlStr.push(' <g_vml_:group',
	                ' coordsize="', Z * W, ',', Z * H, '"',
	                ' coordorigin="0,0"' ,
	                ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

	    // If filters are necessary (rotation exists), create them
	    // filters are bog-slow, so only create them if abbsolutely necessary
	    // The following check doesn't account for skews (which don't exist
	    // in the canvas spec (yet) anyway.

	    if (this.m_[0][0] != 1 || this.m_[0][1] ||
	        this.m_[1][1] != 1 || this.m_[1][0]) {
	      var filter = [];

	      // Note the 12/21 reversal
	      filter.push('M11=', this.m_[0][0], ',',
	                  'M12=', this.m_[1][0], ',',
	                  'M21=', this.m_[0][1], ',',
	                  'M22=', this.m_[1][1], ',',
	                  'Dx=', mr(d.x / Z), ',',
	                  'Dy=', mr(d.y / Z), '');

	      // Bounding box calculation (need to minimize displayed area so that
	      // filters don't waste time on unused pixels.
	      var max = d;
	      var c2 = getCoords(this, dx + dw, dy);
	      var c3 = getCoords(this, dx, dy + dh);
	      var c4 = getCoords(this, dx + dw, dy + dh);

	      max.x = m.max(max.x, c2.x, c3.x, c4.x);
	      max.y = m.max(max.y, c2.y, c3.y, c4.y);

	      vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
	                  'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
	                  filter.join(''), ", sizingmethod='clip');");

	    } else {
	      vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
	    }

	    vmlStr.push(' ">' ,
	                '<g_vml_:image src="', image.src, '"',
	                ' style="width:', Z * dw, 'px;',
	                ' height:', Z * dh, 'px"',
	                ' cropleft="', sx / w, '"',
	                ' croptop="', sy / h, '"',
	                ' cropright="', (w - sx - sw) / w, '"',
	                ' cropbottom="', (h - sy - sh) / h, '"',
	                ' />',
	                '</g_vml_:group>');

	    this.element_.insertAdjacentHTML('BeforeEnd', vmlStr.join(''));
	  };

	  contextPrototype.stroke = function(aFill) {
	    var lineStr = [];
	    var lineOpen = false;

	    var W = 10;
	    var H = 10;

	    lineStr.push('<g_vml_:shape',
	                 ' filled="', !!aFill, '"',
	                 ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
	                 ' coordorigin="0,0"',
	                 ' coordsize="', Z * W, ',', Z * H, '"',
	                 ' stroked="', !aFill, '"',
	                 ' path="');

	    var newSeq = false;
	    var min = {x: null, y: null};
	    var max = {x: null, y: null};

	    for (var i = 0; i < this.currentPath_.length; i++) {
	      var p = this.currentPath_[i];
	      var c;

	      switch (p.type) {
	        case 'moveTo':
	          c = p;
	          lineStr.push(' m ', mr(p.x), ',', mr(p.y));
	          break;
	        case 'lineTo':
	          lineStr.push(' l ', mr(p.x), ',', mr(p.y));
	          break;
	        case 'close':
	          lineStr.push(' x ');
	          p = null;
	          break;
	        case 'bezierCurveTo':
	          lineStr.push(' c ',
	                       mr(p.cp1x), ',', mr(p.cp1y), ',',
	                       mr(p.cp2x), ',', mr(p.cp2y), ',',
	                       mr(p.x), ',', mr(p.y));
	          break;
	        case 'at':
	        case 'wa':
	          lineStr.push(' ', p.type, ' ',
	                       mr(p.x - this.arcScaleX_ * p.radius), ',',
	                       mr(p.y - this.arcScaleY_ * p.radius), ' ',
	                       mr(p.x + this.arcScaleX_ * p.radius), ',',
	                       mr(p.y + this.arcScaleY_ * p.radius), ' ',
	                       mr(p.xStart), ',', mr(p.yStart), ' ',
	                       mr(p.xEnd), ',', mr(p.yEnd));
	          break;
	      }


	      // TODO: Following is broken for curves due to
	      //       move to proper paths.

	      // Figure out dimensions so we can do gradient fills
	      // properly
	      if (p) {
	        if (min.x == null || p.x < min.x) {
	          min.x = p.x;
	        }
	        if (max.x == null || p.x > max.x) {
	          max.x = p.x;
	        }
	        if (min.y == null || p.y < min.y) {
	          min.y = p.y;
	        }
	        if (max.y == null || p.y > max.y) {
	          max.y = p.y;
	        }
	      }
	    }
	    lineStr.push(' ">');

	    if (!aFill) {
	      appendStroke(this, lineStr);
	    } else {
	      appendFill(this, lineStr, min, max);
	    }

	    lineStr.push('</g_vml_:shape>');

	    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
	  };

	  function appendStroke(ctx, lineStr) {
	    var a = processStyle(ctx.strokeStyle);
	    var color = a.color;
	    var opacity = a.alpha * ctx.globalAlpha;
	    var lineWidth = ctx.lineScale_ * ctx.lineWidth;

	    // VML cannot correctly render a line if the width is less than 1px.
	    // In that case, we dilute the color to make the line look thinner.
	    if (lineWidth < 1) {
	      opacity *= lineWidth;
	    }

	    lineStr.push(
	      '<g_vml_:stroke',
	      ' opacity="', opacity, '"',
	      ' joinstyle="', ctx.lineJoin, '"',
	      ' miterlimit="', ctx.miterLimit, '"',
	      ' endcap="', processLineCap(ctx.lineCap), '"',
	      ' weight="', lineWidth, 'px"',
	      ' color="', color, '" />'
	    );
	  }

	  function appendFill(ctx, lineStr, min, max) {
	    var fillStyle = ctx.fillStyle;
	    var arcScaleX = ctx.arcScaleX_;
	    var arcScaleY = ctx.arcScaleY_;
	    var width = max.x - min.x;
	    var height = max.y - min.y;
	    if (fillStyle instanceof CanvasGradient_) {
	      // TODO: Gradients transformed with the transformation matrix.
	      var angle = 0;
	      var focus = {x: 0, y: 0};

	      // additional offset
	      var shift = 0;
	      // scale factor for offset
	      var expansion = 1;

	      if (fillStyle.type_ == 'gradient') {
	        var x0 = fillStyle.x0_ / arcScaleX;
	        var y0 = fillStyle.y0_ / arcScaleY;
	        var x1 = fillStyle.x1_ / arcScaleX;
	        var y1 = fillStyle.y1_ / arcScaleY;
	        var p0 = getCoords(ctx, x0, y0);
	        var p1 = getCoords(ctx, x1, y1);
	        var dx = p1.x - p0.x;
	        var dy = p1.y - p0.y;
	        angle = Math.atan2(dx, dy) * 180 / Math.PI;

	        // The angle should be a non-negative number.
	        if (angle < 0) {
	          angle += 360;
	        }

	        // Very small angles produce an unexpected result because they are
	        // converted to a scientific notation string.
	        if (angle < 1e-6) {
	          angle = 0;
	        }
	      } else {
	        var p0 = getCoords(ctx, fillStyle.x0_, fillStyle.y0_);
	        focus = {
	          x: (p0.x - min.x) / width,
	          y: (p0.y - min.y) / height
	        };

	        width  /= arcScaleX * Z;
	        height /= arcScaleY * Z;
	        var dimension = m.max(width, height);
	        shift = 2 * fillStyle.r0_ / dimension;
	        expansion = 2 * fillStyle.r1_ / dimension - shift;
	      }

	      // We need to sort the color stops in ascending order by offset,
	      // otherwise IE won't interpret it correctly.
	      var stops = fillStyle.colors_;
	      stops.sort(function(cs1, cs2) {
	        return cs1.offset - cs2.offset;
	      });

	      var length = stops.length;
	      var color1 = stops[0].color;
	      var color2 = stops[length - 1].color;
	      var opacity1 = stops[0].alpha * ctx.globalAlpha;
	      var opacity2 = stops[length - 1].alpha * ctx.globalAlpha;

	      var colors = [];
	      for (var i = 0; i < length; i++) {
	        var stop = stops[i];
	        colors.push(stop.offset * expansion + shift + ' ' + stop.color);
	      }

	      // When colors attribute is used, the meanings of opacity and o:opacity2
	      // are reversed.
	      lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
	                   ' method="none" focus="100%"',
	                   ' color="', color1, '"',
	                   ' color2="', color2, '"',
	                   ' colors="', colors.join(','), '"',
	                   ' opacity="', opacity2, '"',
	                   ' g_o_:opacity2="', opacity1, '"',
	                   ' angle="', angle, '"',
	                   ' focusposition="', focus.x, ',', focus.y, '" />');
	    } else if (fillStyle instanceof CanvasPattern_) {
	      if (width && height) {
	        var deltaLeft = -min.x;
	        var deltaTop = -min.y;
	        lineStr.push('<g_vml_:fill',
	                     ' position="',
	                     deltaLeft / width * arcScaleX * arcScaleX, ',',
	                     deltaTop / height * arcScaleY * arcScaleY, '"',
	                     ' type="tile"',
	                     // TODO: Figure out the correct size to fit the scale.
	                     //' size="', w, 'px ', h, 'px"',
	                     ' src="', fillStyle.src_, '" />');
	       }
	    } else {
	      var a = processStyle(ctx.fillStyle);
	      var color = a.color;
	      var opacity = a.alpha * ctx.globalAlpha;
	      lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
	                   '" />');
	    }
	  }

	  contextPrototype.fill = function() {
	    this.stroke(true);
	  };

	  contextPrototype.closePath = function() {
	    this.currentPath_.push({type: 'close'});
	  };

	  function getCoords(ctx, aX, aY) {
	    var m = ctx.m_;
	    return {
	      x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
	      y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
	    };
	  };

	  contextPrototype.save = function() {
	    var o = {};
	    copyState(this, o);
	    this.aStack_.push(o);
	    this.mStack_.push(this.m_);
	    this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
	  };

	  contextPrototype.restore = function() {
	    if (this.aStack_.length) {
	      copyState(this.aStack_.pop(), this);
	      this.m_ = this.mStack_.pop();
	    }
	  };

	  function matrixIsFinite(m) {
	    return isFinite(m[0][0]) && isFinite(m[0][1]) &&
	        isFinite(m[1][0]) && isFinite(m[1][1]) &&
	        isFinite(m[2][0]) && isFinite(m[2][1]);
	  }

	  function setM(ctx, m, updateLineScale) {
	    if (!matrixIsFinite(m)) {
	      return;
	    }
	    ctx.m_ = m;

	    if (updateLineScale) {
	      // Get the line scale.
	      // Determinant of this.m_ means how much the area is enlarged by the
	      // transformation. So its square root can be used as a scale factor
	      // for width.
	      var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
	      ctx.lineScale_ = sqrt(abs(det));
	    }
	  }

	  contextPrototype.translate = function(aX, aY) {
	    var m1 = [
	      [1,  0,  0],
	      [0,  1,  0],
	      [aX, aY, 1]
	    ];

	    setM(this, matrixMultiply(m1, this.m_), false);
	  };

	  contextPrototype.rotate = function(aRot) {
	    var c = mc(aRot);
	    var s = ms(aRot);

	    var m1 = [
	      [c,  s, 0],
	      [-s, c, 0],
	      [0,  0, 1]
	    ];

	    setM(this, matrixMultiply(m1, this.m_), false);
	  };

	  contextPrototype.scale = function(aX, aY) {
	    this.arcScaleX_ *= aX;
	    this.arcScaleY_ *= aY;
	    var m1 = [
	      [aX, 0,  0],
	      [0,  aY, 0],
	      [0,  0,  1]
	    ];

	    setM(this, matrixMultiply(m1, this.m_), true);
	  };

	  contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
	    var m1 = [
	      [m11, m12, 0],
	      [m21, m22, 0],
	      [dx,  dy,  1]
	    ];

	    setM(this, matrixMultiply(m1, this.m_), true);
	  };

	  contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
	    var m = [
	      [m11, m12, 0],
	      [m21, m22, 0],
	      [dx,  dy,  1]
	    ];

	    setM(this, m, true);
	  };

	  /**
	   * The text drawing function.
	   * The maxWidth argument isn't taken in account, since no browser supports
	   * it yet.
	   */
	  contextPrototype.drawText_ = function(text, x, y, maxWidth, stroke) {
	    var m = this.m_,
	        delta = 1000,
	        left = 0,
	        right = delta,
	        offset = {x: 0, y: 0},
	        lineStr = [];

	    var fontStyle = getComputedStyle(processFontStyle(this.font),
	                                     this.element_);

	    var fontStyleString = buildStyle(fontStyle);

	    var elementStyle = this.element_.currentStyle;
	    var textAlign = this.textAlign.toLowerCase();
	    switch (textAlign) {
	      case 'left':
	      case 'center':
	      case 'right':
	        break;
	      case 'end':
	        textAlign = elementStyle.direction == 'ltr' ? 'right' : 'left';
	        break;
	      case 'start':
	        textAlign = elementStyle.direction == 'rtl' ? 'right' : 'left';
	        break;
	      default:
	        textAlign = 'left';
	    }

	    // 1.75 is an arbitrary number, as there is no info about the text baseline
	    switch (this.textBaseline) {
	      case 'hanging':
	      case 'top':
	        offset.y = fontStyle.size / 1.75;
	        break;
	      case 'middle':
	        break;
	      default:
	      case null:
	      case 'alphabetic':
	      case 'ideographic':
	      case 'bottom':
	        offset.y = -fontStyle.size / 2.25;
	        break;
	    }

	    switch(textAlign) {
	      case 'right':
	        left = delta;
	        right = 0.05;
	        break;
	      case 'center':
	        left = right = delta / 2;
	        break;
	    }

	    var d = getCoords(this, x + offset.x, y + offset.y);

	    lineStr.push('<g_vml_:line from="', -left ,' 0" to="', right ,' 0.05" ',
	                 ' coordsize="100 100" coordorigin="0 0"',
	                 ' filled="', !stroke, '" stroked="', !!stroke,
	                 '" style="position:absolute;width:1px;height:1px;">');

	    if (stroke) {
	      appendStroke(this, lineStr);
	    } else {
	      // TODO: Fix the min and max params.
	      appendFill(this, lineStr, {x: -left, y: 0},
	                 {x: right, y: fontStyle.size});
	    }

	    var skewM = m[0][0].toFixed(3) + ',' + m[1][0].toFixed(3) + ',' +
	                m[0][1].toFixed(3) + ',' + m[1][1].toFixed(3) + ',0,0';

	    var skewOffset = mr(d.x / Z) + ',' + mr(d.y / Z);

	    lineStr.push('<g_vml_:skew on="t" matrix="', skewM ,'" ',
	                 ' offset="', skewOffset, '" origin="', left ,' 0" />',
	                 '<g_vml_:path textpathok="true" />',
	                 '<g_vml_:textpath on="true" string="',
	                 encodeHtmlAttribute(text),
	                 '" style="v-text-align:', textAlign,
	                 ';font:', encodeHtmlAttribute(fontStyleString),
	                 '" /></g_vml_:line>');

	    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
	  };

	  contextPrototype.fillText = function(text, x, y, maxWidth) {
	    this.drawText_(text, x, y, maxWidth, false);
	  };

	  contextPrototype.strokeText = function(text, x, y, maxWidth) {
	    this.drawText_(text, x, y, maxWidth, true);
	  };

	  contextPrototype.measureText = function(text) {
	    if (!this.textMeasureEl_) {
	      var s = '<span style="position:absolute;' +
	          'top:-20000px;left:0;padding:0;margin:0;border:none;' +
	          'white-space:pre;"></span>';
	      this.element_.insertAdjacentHTML('beforeEnd', s);
	      this.textMeasureEl_ = this.element_.lastChild;
	    }
	    var doc = this.element_.ownerDocument;
	    this.textMeasureEl_.innerHTML = '';
	    this.textMeasureEl_.style.font = this.font;
	    // Don't use innerHTML or innerText because they allow markup/whitespace.
	    this.textMeasureEl_.appendChild(doc.createTextNode(text));
	    return {width: this.textMeasureEl_.offsetWidth};
	  };

	  /******** STUBS ********/
	  contextPrototype.clip = function() {
	    // TODO: Implement
	  };

	  contextPrototype.arcTo = function() {
	    // TODO: Implement
	  };

	  contextPrototype.createPattern = function(image, repetition) {
	    return new CanvasPattern_(image, repetition);
	  };

	  // Gradient / Pattern Stubs
	  function CanvasGradient_(aType) {
	    this.type_ = aType;
	    this.x0_ = 0;
	    this.y0_ = 0;
	    this.r0_ = 0;
	    this.x1_ = 0;
	    this.y1_ = 0;
	    this.r1_ = 0;
	    this.colors_ = [];
	  }

	  CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
	    aColor = processStyle(aColor);
	    this.colors_.push({offset: aOffset,
	                       color: aColor.color,
	                       alpha: aColor.alpha});
	  };

	  function CanvasPattern_(image, repetition) {
	    assertImageIsValid(image);
	    switch (repetition) {
	      case 'repeat':
	      case null:
	      case '':
	        this.repetition_ = 'repeat';
	        break
	      case 'repeat-x':
	      case 'repeat-y':
	      case 'no-repeat':
	        this.repetition_ = repetition;
	        break;
	      default:
	        throwException('SYNTAX_ERR');
	    }

	    this.src_ = image.src;
	    this.width_ = image.width;
	    this.height_ = image.height;
	  }

	  function throwException(s) {
	    throw new DOMException_(s);
	  }

	  function assertImageIsValid(img) {
	    if (!img || img.nodeType != 1 || img.tagName != 'IMG') {
	      throwException('TYPE_MISMATCH_ERR');
	    }
	    if (img.readyState != 'complete') {
	      throwException('INVALID_STATE_ERR');
	    }
	  }

	  function DOMException_(s) {
	    this.code = this[s];
	    this.message = s +': DOM Exception ' + this.code;
	  }
	  var p = DOMException_.prototype = new Error;
	  p.INDEX_SIZE_ERR = 1;
	  p.DOMSTRING_SIZE_ERR = 2;
	  p.HIERARCHY_REQUEST_ERR = 3;
	  p.WRONG_DOCUMENT_ERR = 4;
	  p.INVALID_CHARACTER_ERR = 5;
	  p.NO_DATA_ALLOWED_ERR = 6;
	  p.NO_MODIFICATION_ALLOWED_ERR = 7;
	  p.NOT_FOUND_ERR = 8;
	  p.NOT_SUPPORTED_ERR = 9;
	  p.INUSE_ATTRIBUTE_ERR = 10;
	  p.INVALID_STATE_ERR = 11;
	  p.SYNTAX_ERR = 12;
	  p.INVALID_MODIFICATION_ERR = 13;
	  p.NAMESPACE_ERR = 14;
	  p.INVALID_ACCESS_ERR = 15;
	  p.VALIDATION_ERR = 16;
	  p.TYPE_MISMATCH_ERR = 17;

	  // set up externs
	  G_vmlCanvasManager = G_vmlCanvasManager_;
	  CanvasRenderingContext2D = CanvasRenderingContext2D_;
	  CanvasGradient = CanvasGradient_;
	  CanvasPattern = CanvasPattern_;
	  DOMException = DOMException_;
	})();

	} // if

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*!
	 * FileUpload v1.0
	 * Copyright 2011-2014 Wecenter, Inc.
	 * Date: 2014-06-02
	 */
	function FileUpload (type, element, container, url, options, callback)
	{
		var _this = this;
		this.type = type;
		this.element = element;
		this.container = container;
		this.url = url;
	    this.options = {
			'multiple' : true,
			'deleteBtn' : true,
			'insertBtn' : true,
			'insertTextarea' : '.wmd-input',
			'template' : '<li>'+
			    			'<div class="img"></div>'+
							'<div class="content">'+
								'<p class="title"></p>'+
								'<p class="size"></p>'+
								'<p class="meta"></p>'+
							'</div>'+
			    		'</li>',
			'deleteBtnTemplate' : '<a class="delete-file">删除</a>' ,
			'insertBtnTemplate' : '<a class="insert-file">插入</a>'
		};

		if (options.editor)
		{
			this.editor = options.editor;
		}

		this.options = $.extend(this.options, options);

		this.callback = callback;

		if (type == 'file')
		{
			this.init(element, container);
		}
		else
		{
			var form = this.createForm(),
				input = this.createInput();

			$(element).prepend($(form).append(input));
		}
	}

	FileUpload.prototype = 
	{
		// 初始化上传器
		init : function (element, container)
		{
			var form = this.createForm(),
				input = this.createInput();

			$(element).prepend($(form).append(input));

			$(container).append('<ul class="upload-list"></ul>');
		},

		// 创建表单
		createForm : function ()
		{
			var form = this.toElement('<form method="post" enctype="multipart/form-data"><input type="submit" class="submit" /></form>');

			$(form).attr({
				'id' : 'upload-form',
				'action' : this.url,
				'target' : 'ajaxUpload'
			});

			this.form = form;

			return form;
		},

		// 创建input
		createInput : function ()
		{
			var _this = this, input = this.toElement('<input type="file" />');

			$(input).attr({
				'class' : 'file-input',
				'name' : 'aws_upload_file',
				'multiple' : this.options.multiple ? 'multiple' : false
			});

			$(input).change(function()
			{
				_this.addFileList(this);
			});

			return input;
		},

		// 创建隐藏域 (wecenter定制)
		createHiddenInput : function(attach_id)
		{
			var _this = this, input = this.toElement('<input type="hidden" name="attach_ids[]" class="hidden-input" />');

			$(input).val(attach_id);

			return input;
		},

		// 创建iframe
		createIframe : function ()
		{
			var iframe = this.toElement('<iframe></iframe>');
	    	$(iframe).attr({
	    		'class': 'hide upload-iframe',
	    		'name': 'ajaxUpload'
	    	});
	    	return iframe;
		},

		// 添加文件列表
		addFileList : function (input)
		{
			var files = $(input)[0].files;
			if (files && this.type == 'file')
			{
				for (i = 0; i < files.length; i++)
				{
					this.li = this.toElement(this.options.template);
					this.file = files[i];
					$(this.container).find('.upload-list').append(this.li);
					this.upload(files[i], this.li);
				}
			}
			else
			{
				if (this.type == 'file')
				{
					this.li = this.toElement(this.options.template);
					$(this.container).find('.upload-list').append(this.li);
					this.upload('', this.li);
				}
				else
				{
					this.upload('');
				}
			}
			
		},

		// 上传功能
		upload : function (file, li)
		{
			var _this = this;

			if (file)
			{
				var xhr = new XMLHttpRequest(), status = false;

		        xhr.upload.onprogress = function(event)
		        {
		        	if (event.lengthComputable)
		        	{
		                var percent = Math.round(event.loaded * 100 / event.total);
		            }

	                $(li).find('.title').html(file.name);

	                $(li).find('.size').html(percent + '%');
		        };

		        xhr.onreadystatechange = function()
		        {      
		            _this.oncomplete(xhr, li, file);
		        };

		        var url = this.url + '&aws_upload_file=' + file.name + '&timestamp=' + new Date().getTime();

		        xhr.open("POST", url);

		        xhr.send(file);
			}
	        else
	        {
	        	//低版本ie上传
				var iframe = this.createIframe();

				if (this.options.loading_status)
				{
					$(this.options.loading_status).show();
				}

	        	if (iframe.addEventListener)
	        	{
			        iframe.addEventListener('load', function()
		        	{
		        		_this.getIframeContentJSON(iframe, _this.container);
		        	}, false);
			    } else if (iframe.attachEvent)
			    {
			        iframe.attachEvent('onload', function()
		        	{
		        		_this.getIframeContentJSON(iframe, _this.container);
		        	});
		    	}

	    		$('#aw-ajax-box').append(iframe);

	        	$(this.form).find('.submit').click();
	        }
		},

		// 从iframe获取json内容
		getIframeContentJSON : function (iframe, container)
		{
			var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
				response, filename;

	            response = eval("(" + doc.body.innerHTML + ")");

	            if (this.type == 'file')
	            {
	            	this.render(this.li, response);

		           	filename = this.getName($('#upload-form .file-input')[0].value);

		           	$(this.li).find('.title').html(filename);
	            }
	            else
	            {
	            	$(this.options.loading_status).hide();

	            	if ($(this.container).attr('src'))
	            	{
	            		$(this.container).attr('src', response.thumb + '?' + Math.round(Math.random() * 10000));
	            	}
	            	else
	            	{
	            		$(this.container).css(
	            		{
	            			'background' : 'url(' + response.thumb + '?' + Math.round(Math.random() * 10000) + ')'
	            		});
	            	}
	            }

	           	$('.upload-iframe').detach();

	           	this.oncallback();
		},

		// ajax完成callback
		oncomplete : function (xhr, li, file)
		{
			var _this = this, response, filesize = this.getFIleSize(file);
			if (xhr.readyState == 4)
			{
				if (xhr.status == 200)
				{
		            try
		            {
		                response = eval("(" + xhr.responseText + ")");

		                this.render(li, response, filesize);
		            }
		            catch(err)
		            {
		                response = {};
		            }
				}
				else if (xhr.status == 500)
				{
					this.render(li, {'error':_t('内部服务器错误')}, filesize);
				}
				else if (xhr.status == 0)
				{
					this.render(li, {'error':_t('网络链接异常')}, filesize);
				}
			}
		},

		// 此功能配合编辑器
		oncallback : function ()
		{
			if (this.callback)
	       	{
	       		this.callback();
	       	}
		},

		// 渲染缩略列表
		render : function (element, json, filesize)
		{
			if (json)
			{
				if (!json.error)
				{
					switch (json.class_name)
					{
						case 'txt':
							$(element).find('.img').addClass('file').html('<i class="icon icon-file"></i>');
						break;

						default :
							$(element).find('.img').css(
							{
				                'background': 'url("' + json.thumb + '")'
				            }).addClass('active').attr('data-img', json.thumb);
				        break;
					}

					if (filesize)
					{
						$(element).find('.size').html(filesize);
					}

					if (this.options.deleteBtn && json.delete_url)
					{
						var btn = this.createDeleteBtn(json.delete_url);

						$(element).find('.meta').append(btn);
					}

					if (this.options.insertBtn && json.delete_url && !json.class_name)
					{
						var btn = this.createInsertBtn(json.attach_id);

						$(element).find('.meta').append(btn);
					}

					// 插入隐藏域(wecenter定制)
					$(element).append(this.createHiddenInput(json.attach_id));

					this.oncallback();
				}
				else
				{
					$(element).addClass('error').find('.img').addClass('error').html('<i class="icon icon-delete"></i>');
					
					$(element).find('.size').text(json.error);
				}
			}
		},

		toElement : function (html)
		{
			var div = document.createElement('div');
			div.innerHTML = html;
	        var element = div.firstChild;
	        div.removeChild(element);
	        return element;
		},

		// 获取文件名
		getName : function (filename)
		{
	        return filename.replace(/.*(\/|\\)/, "");
	    },

	    // 获取文件大小
	    getFIleSize : function (file)
	    {
	    	var filesize;
	    	if (file.size > 1024 * 1024)
	        {
	            filesize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	        }
	        else
	        {
	            filesize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
	        }
	        return filesize;
	    },

	    // 创建插入按钮
	    createInsertBtn : function (attach_id)
	    {
	    	var btn = this.toElement(this.options.insertBtnTemplate), _this = this;

	    	$(btn).click(function()
			{
				if (typeof CKEDITOR != 'undefined')
				{
					_this.editor.insertText("\n[attach]" + attach_id + "[/attach]\n");
				}
				else
				{
					_this.editor.val( _this.editor.val() + "\n[attach]" + attach_id + "[/attach]\n");
				}
			});

			return btn;
	    },

	    // 创建删除按钮
	   	createDeleteBtn : function (url)
	   	{
	   		var btn = this.toElement(this.options.deleteBtnTemplate);

	   		$(btn).click(function()
			{
				if (confirm('确认删除?'))
				{
					var _this = this;
					$.get(url, function (result)
					{
						if (result.errno == "-1")
						{
							AWS.alert(result.err);
						}
						else
						{
							$(_this).parents('li').detach();
						}
					}, 'json');
				}
			});

			return btn;
	   	},

	   	// 初始化文件列表
	    setFileList : function (json)
	    {
	    	var template = '<li>';
	    	
	    	if (!json.is_image)
			{
				template += '<div class="img file"><i class="icon icon-file"></i></div>';
			}
			else
			{
				template += '<div class="img" data-img="' + json.thumb + '" style="background:url(' + json.thumb + ')"></div>';
			}

			template += '<div class="content">'+
								'<p class="title">' + json.file_name + '</p>'+
								'<p class="size"></p>'+
								'<p class="meta"></p>'+
							'</div>'+
			    		'</li>';
			var insertBtn = this.createInsertBtn(json.attach_id),
			    deleteBtn = this.createDeleteBtn(json.delete_link),
			    hiddenInput = this.createHiddenInput(json.attach_id);

			template = this.toElement(template), _this = this;

			$(template).find('.meta').append(deleteBtn);
			$(template).find('.meta').append(insertBtn);
			$(template).find('.meta').append(hiddenInput);
	    	$(this.container).find('.upload-list').append(template);
	    }
	}



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"=="function"&&__webpack_require__(10)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return n}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Form Plugin
	 * version: 3.51.0-2014.06.20
	 * Requires jQuery v1.5 or later
	 * Copyright (c) 2014 M. Alsup
	 * Examples and documentation at: http://malsup.com/jquery/form/
	 * Project repository: https://github.com/malsup/form
	 * Dual licensed under the MIT and GPL licenses.
	 * https://github.com/malsup/form#copyright-and-license
	 */
	!function(e){"use strict"; true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"=="function"&&__webpack_require__(10)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return m}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});

/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	*/

	/*
	 * Configurable variables. You may need to tweak these to be compatible with
	 * the server-side, but the defaults work in most cases.
	 */
	var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
	var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
	var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

	/*
	 * These are the functions you'll usually want to call
	 * They take string arguments and return either hex or base-64 encoded strings
	 */
	function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
	function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
	function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
	function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
	function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
	function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

	function core_md5(c,g){c[g>>5]|=128<<g%32;c[(g+64>>>9<<4)+14]=g;for(var a=1732584193,b=-271733879,d=-1732584194,e=271733878,f=0;f<c.length;f+=16)var h=a,i=b,j=d,k=e,a=md5_ff(a,b,d,e,c[f+0],7,-680876936),e=md5_ff(e,a,b,d,c[f+1],12,-389564586),d=md5_ff(d,e,a,b,c[f+2],17,606105819),b=md5_ff(b,d,e,a,c[f+3],22,-1044525330),a=md5_ff(a,b,d,e,c[f+4],7,-176418897),e=md5_ff(e,a,b,d,c[f+5],12,1200080426),d=md5_ff(d,e,a,b,c[f+6],17,-1473231341),b=md5_ff(b,d,e,a,c[f+7],22,-45705983),a=md5_ff(a,b,d,e,c[f+8],7,1770035416),e=md5_ff(e,a,b,d,c[f+9],12,-1958414417),d=md5_ff(d,e,a,b,c[f+10],17,-42063),b=md5_ff(b,d,e,a,c[f+11],22,-1990404162),a=md5_ff(a,b,d,e,c[f+12],7,1804603682),e=md5_ff(e,a,b,d,c[f+13],12,-40341101),d=md5_ff(d,e,a,b,c[f+14],17,-1502002290),b=md5_ff(b,d,e,a,c[f+15],22,1236535329),a=md5_gg(a,b,d,e,c[f+1],5,-165796510),e=md5_gg(e,a,b,d,c[f+6],9,-1069501632),d=md5_gg(d,e,a,b,c[f+11],14,643717713),b=md5_gg(b,d,e,a,c[f+0],20,-373897302),a=md5_gg(a,b,d,e,c[f+5],5,-701558691),e=md5_gg(e,a,b,d,c[f+10],9,38016083),d=md5_gg(d,e,a,b,c[f+15],14,-660478335),b=md5_gg(b,d,e,a,c[f+4],20,-405537848),a=md5_gg(a,b,d,e,c[f+9],5,568446438),e=md5_gg(e,a,b,d,c[f+14],9,-1019803690),d=md5_gg(d,e,a,b,c[f+3],14,-187363961),b=md5_gg(b,d,e,a,c[f+8],20,1163531501),a=md5_gg(a,b,d,e,c[f+13],5,-1444681467),e=md5_gg(e,a,b,d,c[f+2],9,-51403784),d=md5_gg(d,e,a,b,c[f+7],14,1735328473),b=md5_gg(b,d,e,a,c[f+12],20,-1926607734),a=md5_hh(a,b,d,e,c[f+5],4,-378558),e=md5_hh(e,a,b,d,c[f+8],11,-2022574463),d=md5_hh(d,e,a,b,c[f+11],16,1839030562),b=md5_hh(b,d,e,a,c[f+14],23,-35309556),a=md5_hh(a,b,d,e,c[f+1],4,-1530992060),e=md5_hh(e,a,b,d,c[f+4],11,1272893353),d=md5_hh(d,e,a,b,c[f+7],16,-155497632),b=md5_hh(b,d,e,a,c[f+10],23,-1094730640),a=md5_hh(a,b,d,e,c[f+13],4,681279174),e=md5_hh(e,a,b,d,c[f+0],11,-358537222),d=md5_hh(d,e,a,b,c[f+3],16,-722521979),b=md5_hh(b,d,e,a,c[f+6],23,76029189),a=md5_hh(a,b,d,e,c[f+9],4,-640364487),e=md5_hh(e,a,b,d,c[f+12],11,-421815835),d=md5_hh(d,e,a,b,c[f+15],16,530742520),b=md5_hh(b,d,e,a,c[f+2],23,-995338651),a=md5_ii(a,b,d,e,c[f+0],6,-198630844),e=md5_ii(e,a,b,d,c[f+7],10,1126891415),d=md5_ii(d,e,a,b,c[f+14],15,-1416354905),b=md5_ii(b,d,e,a,c[f+5],21,-57434055),a=md5_ii(a,b,d,e,c[f+12],6,1700485571),e=md5_ii(e,a,b,d,c[f+3],10,-1894986606),d=md5_ii(d,e,a,b,c[f+10],15,-1051523),b=md5_ii(b,d,e,a,c[f+1],21,-2054922799),a=md5_ii(a,b,d,e,c[f+8],6,1873313359),e=md5_ii(e,a,b,d,c[f+15],10,-30611744),d=md5_ii(d,e,a,b,c[f+6],15,-1560198380),b=md5_ii(b,d,e,a,c[f+13],21,1309151649),a=md5_ii(a,b,d,e,c[f+4],6,-145523070),e=md5_ii(e,a,b,d,c[f+11],10,-1120210379),d=md5_ii(d,e,a,b,c[f+2],15,718787259),b=md5_ii(b,d,e,a,c[f+9],21,-343485551),a=safe_add(a,h),b=safe_add(b,i),d=safe_add(d,j),e=safe_add(e,k);return[a,b,d,e]}function md5_cmn(c,g,a,b,d,e){return safe_add(bit_rol(safe_add(safe_add(g,c),safe_add(b,e)),d),a)}function md5_ff(c,g,a,b,d,e,f){return md5_cmn(g&a|~g&b,c,g,d,e,f)}function md5_gg(c,g,a,b,d,e,f){return md5_cmn(g&b|a&~b,c,g,d,e,f)}function md5_hh(c,g,a,b,d,e,f){return md5_cmn(g^a^b,c,g,d,e,f)}function md5_ii(c,g,a,b,d,e,f){return md5_cmn(a^(g|~b),c,g,d,e,f)}function core_hmac_md5(c,g){var a=str2binl(c);16<a.length&&(a=core_md5(a,c.length*chrsz));for(var b=Array(16),d=Array(16),e=0;16>e;e++)b[e]=a[e]^909522486,d[e]=a[e]^1549556828;a=core_md5(b.concat(str2binl(g)),512+g.length*chrsz);return core_md5(d.concat(a),640)}function safe_add(c,g){var a=(c&65535)+(g&65535);return(c>>16)+(g>>16)+(a>>16)<<16|a&65535}function bit_rol(c,g){return c<<g|c>>>32-g}function str2binl(c){for(var g=[],a=(1<<chrsz)-1,b=0;b<c.length*chrsz;b+=chrsz)g[b>>5]|=(c.charCodeAt(b/chrsz)&a)<<b%32;return g}function binl2str(c){for(var g="",a=(1<<chrsz)-1,b=0;b<32*c.length;b+=chrsz)g+=String.fromCharCode(c[b>>5]>>>b%32&a);return g}function binl2hex(c){for(var g=hexcase?"0123456789ABCDEF":"0123456789abcdef",a="",b=0;b<4*c.length;b++)a+=g.charAt(c[b>>2]>>8*(b%4)+4&15)+g.charAt(c[b>>2]>>8*(b%4)&15);return a}function binl2b64(c){for(var g="",a=0;a<4*c.length;a+=3)for(var b=(c[a>>2]>>8*(a%4)&255)<<16|(c[a+1>>2]>>8*((a+1)%4)&255)<<8|c[a+2>>2]>>8*((a+2)%4)&255,d=0;4>d;d++)g=8*a+6*d>32*c.length?g+b64pad:g+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b>>6*(3-d)&63);return g}function str_to_ent(c){var g="",a;for(a=0;a<c.length;a++){var b=c.charCodeAt(a),d="";if(255<b){for(;1<=b;)d="0123456789".charAt(b%10)+d,b/=10;""==d&&(d="0");d="#"+d;d="&"+d;d+=";";g+=d}else g+=c.charAt(a)}return g}function trim(c){for(;" "==c.substring(0,1);)c=c.substring(1,c.length);for(;" "==c.substring(c.length-1,c.length);)c=c.substring(0,c.length-1);return c};

/***/ },
/* 14 */
/***/ function(module, exports) {

	/* Respond.js: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */
	(function( w ){

		"use strict";

		//exposed namespace
		var respond = {};
		w.respond = respond;

		//define update even in native-mq-supporting browsers, to avoid errors
		respond.update = function(){};

		//define ajax obj
		var requestQueue = [],
			xmlHttp = (function() {
				var xmlhttpmethod = false;
				try {
					xmlhttpmethod = new w.XMLHttpRequest();
				}
				catch( e ){
					xmlhttpmethod = new w.ActiveXObject( "Microsoft.XMLHTTP" );
				}
				return function(){
					return xmlhttpmethod;
				};
			})(),

			//tweaked Ajax functions from Quirksmode
			ajax = function( url, callback ) {
				var req = xmlHttp();
				if (!req){
					return;
				}
				req.open( "GET", url, true );
				req.onreadystatechange = function () {
					if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
						return;
					}
					callback( req.responseText );
				};
				if ( req.readyState === 4 ){
					return;
				}
				req.send( null );
			},
			isUnsupportedMediaQuery = function( query ) {
				return query.replace( respond.regex.minmaxwh, '' ).match( respond.regex.other );
			};

		//expose for testing
		respond.ajax = ajax;
		respond.queue = requestQueue;
		respond.unsupportedmq = isUnsupportedMediaQuery;
		respond.regex = {
			media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
			keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
			comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
			urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
			findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
			only: /(only\s+)?([a-zA-Z]+)\s?/,
			minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
			maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
			minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
			other: /\([^\)]*\)/g
		};

		//expose media query support flag for external use
		respond.mediaQueriesSupported = w.matchMedia && w.matchMedia( "only all" ) !== null && w.matchMedia( "only all" ).matches;

		//if media queries are supported, exit here
		if( respond.mediaQueriesSupported ){
			return;
		}

		//define vars
		var doc = w.document,
			docElem = doc.documentElement,
			mediastyles = [],
			rules = [],
			appendedEls = [],
			parsedSheets = {},
			resizeThrottle = 30,
			head = doc.getElementsByTagName( "head" )[0] || docElem,
			base = doc.getElementsByTagName( "base" )[0],
			links = head.getElementsByTagName( "link" ),

			lastCall,
			resizeDefer,

			//cached container for 1em value, populated the first time it's needed
			eminpx,

			// returns the value of 1em in pixels
			getEmValue = function() {
				var ret,
					div = doc.createElement('div'),
					body = doc.body,
					originalHTMLFontSize = docElem.style.fontSize,
					originalBodyFontSize = body && body.style.fontSize,
					fakeUsed = false;

				div.style.cssText = "position:absolute;font-size:1em;width:1em";

				if( !body ){
					body = fakeUsed = doc.createElement( "body" );
					body.style.background = "none";
				}

				// 1em in a media query is the value of the default font size of the browser
				// reset docElem and body to ensure the correct value is returned
				docElem.style.fontSize = "100%";
				body.style.fontSize = "100%";

				body.appendChild( div );

				if( fakeUsed ){
					docElem.insertBefore( body, docElem.firstChild );
				}

				ret = div.offsetWidth;

				if( fakeUsed ){
					docElem.removeChild( body );
				}
				else {
					body.removeChild( div );
				}

				// restore the original values
				docElem.style.fontSize = originalHTMLFontSize;
				if( originalBodyFontSize ) {
					body.style.fontSize = originalBodyFontSize;
				}


				//also update eminpx before returning
				ret = eminpx = parseFloat(ret);

				return ret;
			},

			//enable/disable styles
			applyMedia = function( fromResize ){
				var name = "clientWidth",
					docElemProp = docElem[ name ],
					currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[ name ] || docElemProp,
					styleBlocks	= {},
					lastLink = links[ links.length-1 ],
					now = (new Date()).getTime();

				//throttle resize calls
				if( fromResize && lastCall && now - lastCall < resizeThrottle ){
					w.clearTimeout( resizeDefer );
					resizeDefer = w.setTimeout( applyMedia, resizeThrottle );
					return;
				}
				else {
					lastCall = now;
				}

				for( var i in mediastyles ){
					if( mediastyles.hasOwnProperty( i ) ){
						var thisstyle = mediastyles[ i ],
							min = thisstyle.minw,
							max = thisstyle.maxw,
							minnull = min === null,
							maxnull = max === null,
							em = "em";

						if( !!min ){
							min = parseFloat( min ) * ( min.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
						}
						if( !!max ){
							max = parseFloat( max ) * ( max.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
						}

						// if there's no media query at all (the () part), or min or max is not null, and if either is present, they're true
						if( !thisstyle.hasquery || ( !minnull || !maxnull ) && ( minnull || currWidth >= min ) && ( maxnull || currWidth <= max ) ){
							if( !styleBlocks[ thisstyle.media ] ){
								styleBlocks[ thisstyle.media ] = [];
							}
							styleBlocks[ thisstyle.media ].push( rules[ thisstyle.rules ] );
						}
					}
				}

				//remove any existing respond style element(s)
				for( var j in appendedEls ){
					if( appendedEls.hasOwnProperty( j ) ){
						if( appendedEls[ j ] && appendedEls[ j ].parentNode === head ){
							head.removeChild( appendedEls[ j ] );
						}
					}
				}
				appendedEls.length = 0;

				//inject active styles, grouped by media type
				for( var k in styleBlocks ){
					if( styleBlocks.hasOwnProperty( k ) ){
						var ss = doc.createElement( "style" ),
							css = styleBlocks[ k ].join( "\n" );

						ss.type = "text/css";
						ss.media = k;

						//originally, ss was appended to a documentFragment and sheets were appended in bulk.
						//this caused crashes in IE in a number of circumstances, such as when the HTML element had a bg image set, so appending beforehand seems best. Thanks to @dvelyk for the initial research on this one!
						head.insertBefore( ss, lastLink.nextSibling );

						if ( ss.styleSheet ){
							ss.styleSheet.cssText = css;
						}
						else {
							ss.appendChild( doc.createTextNode( css ) );
						}

						//push to appendedEls to track for later removal
						appendedEls.push( ss );
					}
				}
			},
			//find media blocks in css text, convert to style blocks
			translate = function( styles, href, media ){
				var qs = styles.replace( respond.regex.comments, '' )
						.replace( respond.regex.keyframes, '' )
						.match( respond.regex.media ),
					ql = qs && qs.length || 0;

				//try to get CSS path
				href = href.substring( 0, href.lastIndexOf( "/" ) );

				var repUrls = function( css ){
						return css.replace( respond.regex.urls, "$1" + href + "$2$3" );
					},
					useMedia = !ql && media;

				//if path exists, tack on trailing slash
				if( href.length ){ href += "/"; }

				//if no internal queries exist, but media attr does, use that
				//note: this currently lacks support for situations where a media attr is specified on a link AND
					//its associated stylesheet has internal CSS media queries.
					//In those cases, the media attribute will currently be ignored.
				if( useMedia ){
					ql = 1;
				}

				for( var i = 0; i < ql; i++ ){
					var fullq, thisq, eachq, eql;

					//media attr
					if( useMedia ){
						fullq = media;
						rules.push( repUrls( styles ) );
					}
					//parse for styles
					else{
						fullq = qs[ i ].match( respond.regex.findStyles ) && RegExp.$1;
						rules.push( RegExp.$2 && repUrls( RegExp.$2 ) );
					}

					eachq = fullq.split( "," );
					eql = eachq.length;

					for( var j = 0; j < eql; j++ ){
						thisq = eachq[ j ];

						if( isUnsupportedMediaQuery( thisq ) ) {
							continue;
						}

						mediastyles.push( {
							media : thisq.split( "(" )[ 0 ].match( respond.regex.only ) && RegExp.$2 || "all",
							rules : rules.length - 1,
							hasquery : thisq.indexOf("(") > -1,
							minw : thisq.match( respond.regex.minw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
							maxw : thisq.match( respond.regex.maxw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" )
						} );
					}
				}

				applyMedia();
			},

			//recurse through request queue, get css text
			makeRequests = function(){
				if( requestQueue.length ){
					var thisRequest = requestQueue.shift();

					ajax( thisRequest.href, function( styles ){
						translate( styles, thisRequest.href, thisRequest.media );
						parsedSheets[ thisRequest.href ] = true;

						// by wrapping recursive function call in setTimeout
						// we prevent "Stack overflow" error in IE7
						w.setTimeout(function(){ makeRequests(); },0);
					} );
				}
			},

			//loop stylesheets, send text content to translate
			ripCSS = function(){

				for( var i = 0; i < links.length; i++ ){
					var sheet = links[ i ],
					href = sheet.href,
					media = sheet.media,
					isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

					//only links plz and prevent re-parsing
					if( !!href && isCSS && !parsedSheets[ href ] ){
						// selectivizr exposes css through the rawCssText expando
						if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
							translate( sheet.styleSheet.rawCssText, href, media );
							parsedSheets[ href ] = true;
						} else {
							if( (!/^([a-zA-Z:]*\/\/)/.test( href ) && !base) ||
								href.replace( RegExp.$1, "" ).split( "/" )[0] === w.location.host ){
								// IE7 doesn't handle urls that start with '//' for ajax request
								// manually add in the protocol
								if ( href.substring(0,2) === "//" ) { href = w.location.protocol + href; }
								requestQueue.push( {
									href: href,
									media: media
								} );
							}
						}
					}
				}
				makeRequests();
			};

		//translate CSS
		ripCSS();

		//expose update for re-running respond later on
		respond.update = ripCSS;

		//expose getEmValue
		respond.getEmValue = getEmValue;

		//adjust on resize
		function callMedia(){
			applyMedia( true );
		}

		if( w.addEventListener ){
			w.addEventListener( "resize", callMedia, false );
		}
		else if( w.attachEvent ){
			w.attachEvent( "onresize", callMedia );
		}
	})(this);


/***/ }
/******/ ]);