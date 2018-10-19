package com.neo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.alibaba.fastjson.JSONObject;
import com.neo.common.BaseResult;
import com.neo.common.ErrorCode;
import com.neo.common.utils.EncryptUtils;



@Service
public class UtilsService {
	private static final Logger log = LoggerFactory.getLogger(UtilsService.class);

	public BaseResult md5encode(JSONObject req) {
		String str = req.getString("str");
		String uuid = req.getString("str");
		JSONObject res = new JSONObject ();
		String result = EncryptUtils.md5Encrypt(str);
		res.put("result", result);
		log.info("md5encode result:{}",result);
		return new BaseResult(ErrorCode.OK,uuid,res);
	}
}