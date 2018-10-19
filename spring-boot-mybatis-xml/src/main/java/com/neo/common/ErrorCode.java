package com.neo.common;


public enum ErrorCode {
	OK("0000", "ok"), 
	ERROR("9999", "失败"), 
	
	//常见错误 0001-0999
	PARAMETER_IS_EMPTY("0001", "参数为空"), 
	FORMAL_ERROR("0002", "格式化错误"), 
	CACHE_INVALID("0003", "缓存无效"), 
	
	//服务错误 1000-1999
	SERVICE_NETWORK_ERROR("1000", "服务异常"), 
	SERVICE_ERROR("1001", "系统错误"), 

	//验证 2000-2999
	VERIFY_CODE_ERROR("2000", "验证码错误"),
	VERIFY_CODE_CACHE_INVALID("2001", "验证码已失效"), 
	
	EMAIL_FORMAL_ERROR("2100", "邮箱格式错误"), 
	EMAIL_SEND_ERROR("2101", "发送邮箱失败"), 
	EMAIL_NOT_REGISTERED("2102", "邮箱尚未注册"),
	EMAIL_HAS_BEEN_REGISTERED("2103", "邮箱已被注册"),
	EMAIL_HAS_BEEN_REGISTERED_BUT_NOT_ACTIVATED("2104", "邮箱已被注册，尚未激活"),

	USER_NAME_EXIST("2200", "用户名已存在"),
	USER_NAME_NOT_REGISTERED("2201", "用户名尚未注册"),
	USER_PASSWORD_ERROR("2202", "密码不正确"),
	USER_CACHE_INVALID("2203", "登陆信息已失效"),

	ACCOUNT_NOT_ACTIVATED("2300", "您的账户尚未激活"),
	ACCOUNT_DEACTIVATION("2301", "您的账户已经被停用"),

	//数据库错误 8000
	DB_SERVICE_ERROR("8000", "数据库异常"), 
	DB_QUERY_NO_RECORD("8001", "无记录"), 
	
	;

	private String errorCode;
	private String errorMessage;
	
	private ErrorCode(String errorCode, String errorMessage) {
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}

	public String getErrorMessage() {
		return this.errorMessage;
	}

	public String getErrorCode() {
		return this.errorCode;
	}
}