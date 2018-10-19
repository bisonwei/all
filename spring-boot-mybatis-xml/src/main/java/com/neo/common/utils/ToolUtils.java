package com.neo.common.utils;


import org.slf4j.Logger;

public class ToolUtils {
	public static void getFullStackTrace(Logger log, Exception e) {
		log.error(org.apache.commons.lang.exception.ExceptionUtils.getFullStackTrace(e));
		e.printStackTrace();
	}
}
