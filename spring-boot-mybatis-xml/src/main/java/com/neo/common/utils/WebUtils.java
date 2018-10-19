package com.neo.common.utils;


import java.util.Enumeration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WebUtils {
	private static final Logger log = LoggerFactory.getLogger(WebUtils.class);

	private static String phoneReg = "\\b(ip(hone|od)|android|opera m(ob|in)i" + "|windows (phone|ce)|blackberry"
			+ "|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp" + "|laystation portable)|nokia|fennec|htc[-_]"
			+ "|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";
	private static String tableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";
	private static Pattern phonePat = Pattern.compile(phoneReg, Pattern.CASE_INSENSITIVE);
	private static Pattern tablePat = Pattern.compile(tableReg, Pattern.CASE_INSENSITIVE);

	/**
	 * 清除所有session
	 * 
	 * @param session
	 * @throws Exception
	 */
	public static void clearSession(HttpSession session) {
		try {
			Enumeration enumeration = session.getAttributeNames();
			while (enumeration.hasMoreElements()) {
				String key = enumeration.nextElement().toString();
				log.debug("WebUtil clearSession key:{}", key);
				session.removeAttribute(key);
				log.debug("WebUtil removeAttribute key:{}", key);
			}
		} catch (Exception e) {
			log.error("clearSession error {}", e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
		}
	}

	/**
	 * 获取客户端IP
	 * 
	 * @param request
	 * @return
	 */
	public static String getRemoteAddr(HttpServletRequest request) {
		String remoteAddr = request.getHeader("X-Real-IP");
		if (StringUtils.isBlanks(remoteAddr)) {
			remoteAddr = request.getHeader("X-Forwarded-For");
		} else if (StringUtils.isBlanks(remoteAddr)) {
			remoteAddr = request.getHeader("Proxy-Client-IP");
		} else if (StringUtils.isBlanks(remoteAddr)) {
			remoteAddr = request.getHeader("WL-Proxy-Client-IP");
		} else if (StringUtils.isBlanks(remoteAddr)) {
			remoteAddr = request.getRemoteAddr();
		} else {
			remoteAddr = "127.0.0.1";
		}
		return remoteAddr;
	}

	public static String getLocalPort(HttpServletRequest request) {
		return String.valueOf(request.getLocalPort());
	}

	/**
	 * 检测是否是移动设备访问
	 * 
	 * @param request
	 * @return
	 */
	public static boolean check(HttpServletRequest request) {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
		if (null == userAgent) {
			userAgent = "";
		}
		Matcher matcherPhone = phonePat.matcher(userAgent);
		Matcher matcherTable = tablePat.matcher(userAgent);
		if (matcherPhone.find() || matcherTable.find()) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 获取设备名称
	 * 
	 * @param request
	 * @return
	 */
	public static String getDeviceName(HttpServletRequest request) {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
		if (null == userAgent) {
			userAgent = "";
		}
		Matcher matcherPhone = phonePat.matcher(userAgent);
		Matcher matcherTable = tablePat.matcher(userAgent);
		if (matcherPhone.find()) {
			return matcherPhone.group();
		} else if (matcherTable.find()) {
			return matcherTable.group();
		} else {
			return "pc";
		}
	}

	public static String getLocalName(HttpServletRequest request) {
		return request.getLocalName();
	}
}
