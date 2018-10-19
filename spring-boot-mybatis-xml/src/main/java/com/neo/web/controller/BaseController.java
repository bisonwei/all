package com.neo.web.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.neo.common.BaseResult;
import com.neo.common.ErrorCode;


public class BaseController {
	private static final Logger log = LoggerFactory.getLogger(BaseController.class);

	/*public static BaseResult callService(String url) {
		log.debug("BaseController callService url:{}", url);
		String callUrl = AppConfig.serviceUrl + url + ".service";
		BaseResult result = RestUtils.post(callUrl, new JSONObject());
		return result;
	}

	public static BaseResult callService(JSONObject req, String url) {
		log.debug("BaseController callService url:{}", url);
		String callUrl = AppConfig.serviceUrl + url + ".service";
		return RestUtils.post(callUrl, req);
	}*/

	public static boolean isSuccess(BaseResult result) {
		return result.getErrorCode().equals(ErrorCode.OK.getErrorCode());
	}
}
