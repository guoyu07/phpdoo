<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/20
 * Time: 下午10:05
 */

namespace Helper;

class GDImage
{
    private static $errors = array();
    private static $imageMimeType;
    private static $allowImageType = array(
        'image/jpeg',
        'image/png',
        'image/gif',
    );
    private static function  createFromImageFunction()
    {
        if (!in_array(self::$imageMimeType,self::$allowImageType)) {
            self::$errors[] = '图片文件类型错误';
            return false;
        }
        $ext = explode('/',self::$imageMimeType)[1];
        return 'imagecreatefrom'.$ext;
    }
    private static function outputImageFunction()
    {
        if (!in_array(self::$imageMimeType,self::$allowImageType)) {
            self::$errors[] = '图片文件类型错误';
            return false;
        }
        $ext = explode('/',self::$imageMimeType);
        return $ext[0] . $ext[1];
    }
    public static function resize($srcImageFile,$destDir='./Resize/',$width=100,$height=100)
    {
        if (!is_dir($destDir)) {
            $res = mkdir($destDir);
            if (!$res) {
                self::$errors[] = '输出图片目录不存在或无写入权限';
                return false;
            }
        }
        if ($width<1 || $height<1) {
            self::$errors[] = '要创建的缩略图,超过最小范围';
            return false;
        }
        // 检查图片文件是否存在
        if (!file_exists($srcImageFile)) {
            self::$errors[] = '图片文件不存在';
            return false;
        }
        $fileInfo = new \Finfo(FILEINFO_MIME_TYPE);
        self::$imageMimeType = $fileInfo->file($srcImageFile);

        $thumbnail_width = $width;
        $thumbnail_height = $height;

        // 载入原图片函数
        $createFromImage = self::createFromImageFunction();
        if (!$createFromImage) return false;

        // 根据原图创建画布
        $src_image = $createFromImage($srcImageFile);
        // 创建缩略图画面
        $thumbnail_canvas = imagecreatetruecolor($width,$height);
        // 配置画面背景颜色
        $canvas_color = imagecolorallocate($thumbnail_canvas,255,255,255);
        // 填充背景颜色
        imagefill($thumbnail_canvas,0,0,$canvas_color);

        // 获取原图的高度和宽度
        $src_image_width = imagesx($src_image);
        $src_image_height = imagesy($src_image);

        // 根据原图片高宽比配置缩略图片高宽比
        if ($src_image_width/$thumbnail_width > $src_image_height/$thumbnail_height) {
            $thumbnail_image_width = $thumbnail_width;
            $thumbnail_image_height = $thumbnail_image_width/$src_image_width * $src_image_height;
        } else {
            $thumbnail_image_height = $thumbnail_height;
            $thumbnail_image_width = $thumbnail_image_height/$src_image_height * $src_image_width;
        }

        // 计算图片位置
        $thumbnail_x = ($thumbnail_width - $thumbnail_image_width) / 2;
        $thumbnail_y = ($thumbnail_height - $thumbnail_image_height) / 2 ;

        $src_image_x = 0;
        $src_image_y = 0;


        // 渲染原图到缩略图画布上
        imagecopyresampled($thumbnail_canvas,$src_image,$thumbnail_x,$thumbnail_y,$src_image_x,$src_image_y,$thumbnail_image_width,$thumbnail_image_height,$src_image_width,$src_image_height);

        $sub_dir = Date('Ymd') . DIRECTORY_SEPARATOR;
        if (!(is_dir($destDir . $sub_dir))) {
            $res = mkdir($destDir . $sub_dir, 0755,true);
            if(!$res) {
                self::$errors[] = '子目录创建失败,可能是无写入权限';
                return false;
            }
        }

        // 文件名称后缀
        $ext = explode('/',self::$imageMimeType)[1];
        $ext = $ext == 'jpeg' ? 'jpg' : $ext;

        $filename = Date('His') . '_' . uniqid() .'_'. $thumbnail_width . 'x' .$thumbnail_height . '.' . $ext;

        // 输出 处理后图片 的函数
        $outputImage = self::outputImageFunction();
        if (!$outputImage) return false;
        $outputImage($thumbnail_canvas, $destDir . $sub_dir . $filename);

        // 销毁图片画布
        imagedestroy($src_image);
        imagedestroy($thumbnail_canvas);

        return $sub_dir . $filename;
    }
    public static function getLastError()
    {
        return array_pop(self::$errors);
    }

}