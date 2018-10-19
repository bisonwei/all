package com.neo.common.utils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.neo.common.BaseResult;
import com.neo.common.ErrorCode;


public class RestUtils {
	private static final Logger log = LoggerFactory.getLogger(RestUtils.class);

	/*public static BaseResult post(String url, JSONObject req) {
		return invokeService(url, req, HttpMethod.POST);
	}

	public static BaseResult get(String url, JSONObject req) {
		return invokeService(url, req, HttpMethod.GET);
	}

	private static BaseResult invokeService(String requestUrl, JSONObject req, HttpMethod method) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("application/json; charset=UTF-8"));
		headers.add("Accept", MediaType.APPLICATION_JSON.toString());
		HttpEntity<String> requestEntity = new HttpEntity<String>(req.toJSONString(), headers);
		log.debug("requestUrl:" + requestUrl);
		log.debug("requestEntity:" + requestEntity.getBody());
		RestTemplate restTemplate = new RestTemplate();
		try {
			ResponseEntity<String> exchange = restTemplate.exchange(requestUrl, method, requestEntity, String.class);
			String result = exchange.getBody();
			log.debug("invokeService result:{}" + result);
			return JSONObject.parseObject(result, BaseResult.class);
		} catch (Exception e) {
			log.error("调用Service异常: requestUrl:{}", requestUrl);
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.SERVICE_NETWORK_ERROR, req.getString("uuid"));
		}
	}*/
}
