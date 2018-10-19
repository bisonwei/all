package com.neo.common.utils;


import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidateUtils {
	/**
	 * 验证手机
	 * 
	 * @param val
	 * @return
	 */
	public static boolean isNumeric(String val) {
		if (StringUtils.isBlanks(val))
			return false;
		String str = val.replaceAll("[,+-.\\s]", "");
		return str.matches("^[0-9]+$");
	}

	/**
	 * 验证邮箱
	 * 
	 * @param email
	 * @return
	 */
	public static boolean checkEmail(String email) {
		if (StringUtils.isBlanks(email))
			return false;
		boolean flag = false;
		try {
			String check = "^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
			Pattern regex = Pattern.compile(check);
			Matcher matcher = regex.matcher(email);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	/**
	 * 验证手机号码
	 * 
	 * @param mobiles
	 * @return
	 */
	public static boolean checkMobileNumber(String mobileNumber) {
		if (StringUtils.isBlanks(mobileNumber))
			return false;
		boolean flag = false;
		try {
			Pattern regex = Pattern
					.compile("^(((13[0-9])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8})|(0\\d{2}-\\d{8})|(0\\d{3}-\\d{7})$");
			Matcher matcher = regex.matcher(mobileNumber);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}
}