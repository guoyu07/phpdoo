<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/20
 * Time: 下午4:55
 */

namespace Helper;

class Upload
{
    //使用此参数后，如果上传目录有同样的文件，则不新增文件，直接返回该文件
    const UseExistingFile = true;

    private static $errors = array();
    private static $hash = '';
    private static $hashs = array();
    public static $uploadPath = UPLOAD_FILE_PATH ? UPLOAD_FILE_PATH : './';
    public static $allowFileType = array(
        '.jpeg' => 'image/jpeg',
        '.png'  => 'image/png',
        '.gif'  => 'image/gif',
        '.jpg'  => 'image/jpeg',
    );
    public static $allowFileSize = ALLOW_UPLOAD_FILE_SIZE ? ALLOW_UPLOAD_FILE_SIZE : 1024*1024*1024;
    public static function uploadFile($file,$UseExistingFile=false)
    {
        if (0 != $file['error']) {
            self::$errors[] = $file['error'] . ' 上传文件存在错误。';
            return false;
        }
        //得到文件hash
        self::$hash = sha1_file($file['tmp_name']);

        if ($UseExistingFile) {
            $res = self::returnDirHashFile(self::$hash);
            if ($res) {
                self::deleteTempFile($file);
                return $res;
            }
        }

        $fileInfo = new \finfo(FILEINFO_MIME_TYPE);
        $mime = $fileInfo->file($file['tmp_name']);

        if ($file['size'] > self::$allowFileSize) {
            self::$errors[] = '文件大小超过限制，最大允许上传的文件大小为：' . self::$allowFileSize/1024 . 'K';
            self::deleteTempFile($file);
            return false;
        }
        if (!in_array($mime,array_values(self::$allowFileType))) {
            self::$errors[] = '文件类型不在允许的范围内';
            self::deleteTempFile($file);
            return false;
        }

        //文件名称后缀
        $ext = explode('/',$mime)[1];
        $ext = $ext == 'jpeg' ? 'jpg' : $ext;

        $subDir = date('Ymd'). DIRECTORY_SEPARATOR;
        if (!is_dir(self::$uploadPath . $subDir)) {
            $res = mkdir(self::$uploadPath . $subDir, 0755);
            if (!$res) {
                self::$errors[] = '创建目录' . rtrim($subDir,'/') . '失败！';
                self::deleteTempFile($file);
                return false;
            }
        }
        $fileName = date('His').'_'.uniqid() . '.' . $ext;

        $res = move_uploaded_file($file['tmp_name'], self::$uploadPath . $subDir . $fileName);
        if (!$res) {
            self::$errors[] = '移动文件到上传目录失败';
            self::deleteTempFile($file);
            return false;
        }
        self::$errors[] = 'success';
        return $subDir . $fileName;
    }
    public static function returnDirHashFile($hash)
    {
        $subDir = date('Ymd'). DIRECTORY_SEPARATOR;
        if (is_dir(self::$uploadPath . $subDir)) {
            $dh = opendir(self::$uploadPath . $subDir);
            while ($file = readdir($dh)) {
                if ($file!="." && $file!="..") {
                    self::$hashs[$file] = sha1_file(self::$uploadPath . $subDir .$file);
                    if ($hash == sha1_file(self::$uploadPath . $subDir .$file)) {
                        return $subDir .$file;
                    }
                }
            }
        }
        return false;
    }
    public static function getLastError()
    {
        return array_pop(self::$errors);
    }
    public static function getAllError()
    {
        return self::$errors;
    }
    public static function getFileHash()
    {
        return self::$hash;
    }
    public static function deleteTempFile($file)
    {
        if (@$file['tmp_name']) {
            $res = @unlink($file['tmp_name']);
            if($res) return true;
        }
        return false;
    }
}