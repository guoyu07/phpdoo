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

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */

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

		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */

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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */

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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */

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