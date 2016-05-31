<?php

use Phinx\Migration\AbstractMigration;

class CreateTableMigration extends AbstractMigration
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
    public function change()
    {
        $this->table('category',['id'=>false,'primary_key'=>['category_id']])
            ->addColumn('category_id','integer',['identity'=>true,'signed' => false,'comment'=>'分类表'])
            ->addColumn('category_title','string',['limit' => 64,'default'=>'','comment'=>'分类名称'])
            ->addColumn('sort','integer',['default'=>0])
            ->addColumn('parent_id','integer',['default'=>0,'signed' => false])
            ->create()
        ;

        $this->table('topic',['id'=>false,'primary_key'=>['topic_id']])
            ->addColumn('topic_id','integer',['identity'=>true,'signed'=>false])
            ->addColumn('topic_title','string',['limit'=>64,'default'=>'','comment'=>'话题标题'])
            ->addColumn('topic_desc','string',['limit'=>255,'default'=>'','comment'=>'话题描述'])
            ->addColumn('topic_img','string',['limit'=>255,'default'=>'','comment'=>'话题缩略图'])
            ->addColumn('add_time','integer',['default'=>0])
            ->addIndex(['topic_id'])
            ->create()
        ;

        $this->table('question',['id'=>false,'primary_key'=>['question_id']])
            ->addColumn('question_id','integer',['identity'=>true,'signed'=>false])
            ->addColumn('category_id','integer',['signed'=>false])
            ->addColumn('question_content','string',['limit'=>255,'default'=>''])
            ->addColumn('question_detail','text')
            ->addColumn('add_time','integer',['default'=>0])
            ->addColumn('update_time','integer',['default'=>0])
            ->addColumn('user_id','integer',['signed'=>false,'default'=>0])
            ->addColumn('view_count','integer',['signed'=>false,'default'=>0])
            ->create()
            ;

        $this->table('topic_question',['id'=>false,'primary_key'=>['tq_id']])
            ->addColumn('tq_id','integer',['identity'=>true,'signed'=>false])
            ->addColumn('topic_id','integer',['signed'=>false])
            ->addColumn('question_id','integer',['signed'=>false])
            ->create()
            ;

        $this->table('follow',['id'=>false,'primary_key'=>['id']])
            ->addColumn('id','integer',['limit'=>16,'identity'=>true])
            ->addColumn('user_id','integer')
            ->addColumn('question_id','integer',['null'=>true])
            ->addColumn('topic_id','integer',['null'=>true])
            ->create()
        ;

        $this->table('user',['id'=>true,'integer','signed'=>false,'primary_key'=>['id']])
            ->addColumn('nickname','string',['limit'=>32])
            ->addColumn('username','string',['limit'=>32])
            ->addColumn('password','string',['limit'=>64])
            ->addColumn('salt','string',['limit'=>16])
            ->addColumn('email','string',['limit'=>32])
            ->addColumn('role_id','integer',['default'=>0,'limit'=>\Phinx\Db\Adapter\MysqlAdapter::INT_TINY])
            ->addColumn('token','string',['limit'=>64])
            ->addColumn('token_exptime','integer',['limit'=>10])
            ->addColumn('status','integer',['limit'=>\Phinx\Db\Adapter\MysqlAdapter::INT_TINY,'default'=>0,'comment'=>'状态,0-未激活,1-已激活'])
            ->addColumn('regtime','integer',['comment'=>'注册时间'])
            ->addColumn('lastlogin','integer',['comment'=>'最后登陆时间'])
            ->addIndex(['email','username'],['unique'=>true])
            ->create()
            ;

        $this->table('role',['id'=>false,'primary_key'=>['id']])
            ->addColumn('id','integer',['limit'=>\Phinx\Db\Adapter\MysqlAdapter::INT_TINY,'signed'=>false,'identity'=>true])
            ->addColumn('isAdmin','integer',['limit'=>\Phinx\Db\Adapter\MysqlAdapter::INT_TINY,'default'=>0])
            ->addColumn('title','string',['limit'=>32,'comment'=>'角色名称'])
            ->create()
            ;

        $this->table('answer',['id'=>false,'primary_key'=>['answer_id']])
            ->addColumn('answer_id','integer',['identity'=>true,'signed'=>false])
            ->addColumn('question_id','integer',['signed'=>false,'default'=>false])
            ->addColumn('answer_content','text')
            ->addColumn('user_id','integer',['signed'=>false,'default'=>0])
            ->addColumn('add_time','integer',['signed'=>false,'default'=>0])
            ->create()
            ;
    }

    public function down()
    {
        $this->table('category')        ->drop();
        $this->table('topic')           ->drop();
        $this->table('answer')          ->drop();
        $this->table('role')            ->drop();
        $this->table('user')            ->drop();
        $this->table('topic_question')  ->drop();
        $this->table('question')        ->drop();
    }
}
