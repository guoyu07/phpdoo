<?php

use Phinx\Migration\AbstractMigration;

class AddDefaultData extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function up()
    {
        $rows = [
            ['category_id'=>1,'category_title'=>'未分类','sort'=>0,'parent_id'=>0],
            ['category_id'=>2,'category_title'=>'PHP','sort'=>0,'parent_id'=>0],
            ['category_id'=>3,'category_title'=>'PHP框架','sort'=>0,'parent_id'=>2],
            ['category_id'=>4,'category_title'=>'核心语法','sort'=>0,'parent_id'=>2],
            ['category_id'=>5,'category_title'=>'前端','sort'=>0,'parent_id'=>0],
            ['category_id'=>6,'category_title'=>'javascript','sort'=>0,'parent_id'=>5],
            ['category_id'=>7,'category_title'=>'react','sort'=>0,'parent_id'=>5],
            ['category_id'=>8,'category_title'=>'react native','sort'=>0,'parent_id'=>7],
        ];

        $this->insert('category',$rows);

        $roles = [
            ['isAdmin'=>1,'title'=>'管理员'],
            ['isAdmin'=>0,'title'=>'普通用户']
        ];
        $this->insert('role',$roles);

        $users = [
            ['id'=>1,'username'=>'spider','password'=>'spider','email'=>'spider','token'=>'','token_exptime'=>0,'status'=>0,'regtime'=>0,'lastlogin'=>0,'role_id'=>0,'salt'=>'spider'],
            ['id'=>2,'username'=>'chen','password'=>'d2c725f1db9576a6f8bce398cc187252','email'=>'688977@qq.com ','token'=>'TOKEN_5742b22e714678.81403998','token_exptime'=>0,'status'=>1,'regtime'=>1463988782,'lastlogin'=>1463988782,'role_id'=>1,'salt'=>'3c4d464469c2f710'],
            ['id'=>3,'username'=>'user','password'=>'d2c725f1db9576a6f8bce398cc187252','email'=>'68977@qq.com ','token'=>'TOKEN_5742b22e714678.81403998','token_exptime'=>0,'status'=>1,'regtime'=>1463988782,'lastlogin'=>1463988782,'role_id'=>0,'salt'=>'3c4d464469c2f710']
        ];
        $this->insert('user',$users);

        $topics = [
            ['topic_title'=>'PHP','topic_desc'=>'宇宙无敌PHP，神马都能写，紫禁惊雷','topic_img'=>'20160528/191936_57497ec85bca0_100x100.png','add_time'=>time()],
            ['topic_title'=>'Laravel','topic_desc'=>'天极魂牵梦萦','topic_img'=>'20160528/191936_57497ec85bca0_100x100.png','add_time'=>time()-60*60*24*2],
            ['topic_title'=>'Symfony','topic_desc'=>'魂牵梦萦魂牵梦萦仍未','topic_img'=>'20160529/211739_574aebf3f2c6e_100x100.png','add_time'=>time()-60*60*24*10],
            ['topic_title'=>'我了个去','topic_desc'=>'前方有炸弹','topic_img'=>'20160528/191936_57497ec85bca0_100x100.png','add_time'=>time()-60*60*15],

        ];
        $this->insert('topic',$topics);

        $follows = [
            ['user_id'=>1,'question_id'=>1],
            ['user_id'=>1,'question_id'=>2],
            ['user_id'=>1,'question_id'=>3],
            ['user_id'=>1,'topic_id'=>1],
            ['user_id'=>1,'topic_id'=>2],
            ['user_id'=>1,'topic_id'=>3],
            ['user_id'=>2,'question_id'=>1],
            ['user_id'=>2,'question_id'=>2],
            ['user_id'=>2,'question_id'=>3],
            ['user_id'=>2,'topic_id'=>1],
            ['user_id'=>2,'topic_id'=>2],
            ['user_id'=>2,'topic_id'=>3],
        ];
        $this->insert('follow',$follows);

        $questions = [
            ['category_id'=>1,'question_content'=>'测试问题一,8天前的问题','question_detail'=>'发点什么吧?!!','add_time'=>time()-60*60*24*8,'update_time'=>time(),'user_id'=>1,'view_count'=>999],
            ['category_id'=>1,'question_content'=>'测试问题二,今天的问题','question_detail'=>'发点什么吧?!!','add_time'=>time()-60*60,'update_time'=>time(),'user_id'=>1,'view_count'=>231],
            ['category_id'=>2,'question_content'=>'测试问题三,3天前的问题','question_detail'=>'发点什么吧?!!','add_time'=>time()-60*60*24*3,'update_time'=>time()-60*60*24*3,'user_id'=>2,'view_count'=>1102],
            ['category_id'=>2,'question_content'=>'测试问题四,10天前的问题','question_detail'=>'发点什么吧?!!','add_time'=>time()-60*60*24*10,'update_time'=>time()-60*60*24*10,'user_id'=>2,'view_count'=>43],
            ['category_id'=>3,'question_content'=>'测试问题五,30天前的问题','question_detail'=>'发点什么吧?!!','add_time'=>time()-60*60*24*30,'update_time'=>time()-60*60*24*30,'user_id'=>1,'view_count'=>54],
            ['category_id'=>3,'question_content'=>'测试问题六,1天前的问题','question_detail'=>'发点什么吧?!!','add_time'=>time()-60*60*24*1,'update_time'=>time(),'user_id'=>1,'view_count'=>42],
        ];
        $this->insert('question',$questions);

        $answers = [
            ['question_id'=>1,'answer_content'=>'测试回答一,8天前的回答','user_id'=>1,'add_time'=>time()-60*60*24*8],
            ['question_id'=>2,'answer_content'=>'测试回答一,今天的问题','user_id'=>1,'add_time'=>time()-60*60],
            ['question_id'=>3,'answer_content'=>'测试回答一,3天前的问题','user_id'=>1,'add_time'=>time()-60*60*24*3],
            ['question_id'=>4,'answer_content'=>'测试回答一,10天前的问题','user_id'=>1,'add_time'=>time()-60*60*24*10],
            ['question_id'=>1,'answer_content'=>'测试回答一,30天前的问题','user_id'=>1,'add_time'=>time()-60*60*24*30],
            ['question_id'=>5,'answer_content'=>'测试回答一,1天前的问题','user_id'=>1,'add_time'=>time()-60*60*24*1],
        ];
        $this->insert('answer',$answers);

        $topic_questions = [
            ['topic_id'=>1,'question_id'=>1],
            ['topic_id'=>2,'question_id'=>2],
            ['topic_id'=>3,'question_id'=>3],
            ['topic_id'=>1,'question_id'=>4],
            ['topic_id'=>2,'question_id'=>5],
            ['topic_id'=>3,'question_id'=>6],
        ];
        $this->insert('topic_question',$topic_questions);
    }
    public function down()
    {
        $this->execute("delete from `category`");
        $this->execute('delete from `user`');
        $this->execute('delete from `topic`');
        $this->execute('delete from `role`');
    }
}
