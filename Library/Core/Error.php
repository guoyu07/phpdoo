<?php
namespace Core;

class Error extends \Exception{
	public function __construct($message='Internal Server Error',$code = 0, $private = null, $trace = array())
	{
		parent::__construct($message,$code,$private);
		$this->trace = $trace;
        if (!$trace) {
            $this->trace = debug_backtrace();
        }
	}
	public static function registerHandler()
	{
		set_exception_handler(array(__CLASS__,'handleUncaughtException'));
	}
	public static function handlePHPError($errNo,$errStr,$errFile,$errLine)
	{
		if($errNo == E_STRICT){
			return;
		}
		if($errNo == E_NOTICE){
			return;
		}
		$trace = debug_backtrace();
		array_unshift($trace,array('file'=>$errFile,'line'=>$errLine));
		$exception = new self($errStr,$errNo,null,$trace);
		self::handleUncaughtException($exception);
	}

	public static function handleUncaughtException($instance)
	{
		@ob_end_clean();
		if (Database::getInstance() && Database::getInstance()->inTransaction()){
			Database::getInstance()->rollBack();
		}
		if(!($instance instanceof Error)){
			$instance = new self($instance->getMessage(),intval($instance->getCode()),$instance,$instance->getTrace());
		}
		
		self::haveErrorThrowException($instance);
		exit();
	}

	public static function haveErrorThrowException($errorMsg)
	{
		echo '<pre>' . $errorMsg ;

		// echo "<div style='width:100%;height:100%;'>
		// 		<div style='color:red;font-size:1.2rem'>
		// 			$errorMsg
		// 		<div>
		// 	</div>";
	}
}