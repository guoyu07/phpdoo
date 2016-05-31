<?php
/**
 * Created by PhpStorm.
 * User: apple
 * Date: 16/5/16
 * Time: 上午9:26
 */
namespace Model;

use Core\Model;
use Core\Database;

/**
 * Class User
 * @table User
 * @package Model
 *
 */
namespace Model;

use Core\Model as BaseModel;
use Core\Database as DB;
use Helper\Encrypt;
use Helper\Session;

/**
 * Class User
 * @package Model
 * @table user
 */
class User extends BaseModel
{
    private $id;
    private $username;
    private $email;
    private $token;
    private $token_exptime;
    private $status;
    private $regtime;

    public static function getCurrentUser()
    {
        return self::findUserById(Session::get('user')['id']);
    }
    public static function findUserById($id)
    {
        $statement = DB::sql("select u.*,r.title as role_title,r.isadmin as isAdmin from user u left join role r on u.role_id=r.id where id=:id");
        $statement->bindValue(":id",$id);
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }
    public static function findUserByUserNameAndPassword($username,$password)
    {
        $statment = DB::sql("select u.*,r.title as role_title,r.isadmin as isAdmin from user u left join role r on u.role_id=r.id WHERE (username=:username OR email=:username) AND password=md5(concat(:password,md5(u.salt)))");
        $statment->bindValue(":username",$username);
        $statment->bindValue(":password",$password);
        $statment->execute();
        return $statment->fetchAll(DB::FETCH_ASSOC);
    }
    public static function activeUser($token)
    {
        $time = time();
        return DB::getInstance()->exec("update user set `status`=1,`token_exptime`=0 WHERE `token`='{$token}' AND (token_exptime - {$time}) > 0");
    }
    public static function findList()
    {
        $statement = DB::sql("select u.*,r.title as role_title,r.isadmin as isAdmin from user u left join role r on u.role_id=r.id;");
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }

    /**
     * @param int $length
     * @return mixed
     */
    public static function findHotUsers(int $length)
    {
        $statement = DB::sql("select u.*,count(q.user_id) as questionCount from (select u.username,u.id,count(a.user_id) as answerCount from user as u left join answer as a on a.user_id=u.id group by u.id) as u left join question as q on u.id=q.user_id group by u.id ORDER BY answerCount DESC LIMIT $length");
        $statement->execute();
        return $statement->fetchAll(DB::FETCH_ASSOC);
    }
    public  static function registerUser($data)
    {
        return DB::insert($data,'user');
    }
}