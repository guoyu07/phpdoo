<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/29
 * Time: 下午1:26
 */
namespace Helper;

class Encrypt
{
    const OPERATION_ENCODE = 1;
    const OPERATION_DECODE = 2;

    public static function encode($string, $key = ENCRYPT_KEY)
    {
        return self::_encrypt($string,self::OPERATION_ENCODE,$key);
    }
    public static function decode($string, $key = ENCRYPT_KEY) {
        return self::_encrypt($string, self::OPERATION_DECODE,$key);
    }
    private static function _encrypt($string, $operation, $key,$expiry = 0)
    {
        $cKeyLength = 4;
        $key = md5($key);
        $keyA = md5(substr($key, 0, 16));
        $keyB = md5(substr($key, 16, 16));
        $keyC = $cKeyLength ? ($operation == self::OPERATION_DECODE ? substr($string,0, $cKeyLength) : substr(md5(microtime()),-$cKeyLength)) : '';

        $cryptKey = $keyA . md5($keyA . $keyC);
        $key_length = strlen($cryptKey);
        $string = $operation == self::OPERATION_DECODE ? base64_decode(substr($string,$cKeyLength)) :
            sprintf('%010d',$expiry ? $expiry + time() : 0) . substr(md5($string . $keyB), 0, 16) . $string;

        $string_length = strlen($string);
        $result = '';

        $box = range(0,255);
        $rndKey = array();
        for ($i = 0; $i <= 255; $i++) {
            $rndKey[$i] = ord($cryptKey[$i % $key_length]);
        }
        for ($j = $i = 0; $i < 256; $i++) {
            $j = ($j + $box[$i] + $rndKey[$i]) % 256;
            $tmp = $box[$i];
            $box[$i] = $box[$j];
            $box[$j] = $tmp;
        }
        for ($a = $j =$i = 0; $i < $string_length; $i++) {
            $a = ($a + 1) %256;
            $j = ($j + $box[$a]) %256;
            $tmp = $box[$a];
            $box[$a] = $box[$j];
            $box[$j] = $tmp;

            $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
        }
        if ($operation == self::OPERATION_DECODE) {
            if ((substr($result,0 ,10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26) . $keyB), 0 ,16)) {
                return substr($result, 26);
            } else {
                return '';
            }
        } else {
            return $keyC . str_replace('=', '', base64_encode($result));
        }
    }
}