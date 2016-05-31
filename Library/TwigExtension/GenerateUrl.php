<?php
/**
 * Created by vector.
 * Email: 688977@qq.com
 * Date: 16/5/29
 * Time: 下午11:31
 */

namespace TwigExtension;

use Core\Response;

class GenerateUrl extends \Twig_Extension
{
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('generateUrl', array($this, 'generateUrl')),
        );
    }
    public function generateUrl($target = '')
    {
      return Response::generateUrl($target);
    }
    public function getName()
    {
        return 'generateUrl';
    }
}