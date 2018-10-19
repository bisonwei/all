package com.neo.web.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.neo.common.BaseResult;
import com.neo.common.ErrorCode;
import com.neo.common.utils.StringUtils;
import com.neo.service.UtilsService;


@RestController
@RequestMapping("/app/utils")
public class UtilsController extends BaseController {
	private static final Logger log = LoggerFactory.getLogger(UtilsController.class);

	@Autowired
	private UtilsService utilsService;

	/**
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "/md5encode", method = RequestMethod.POST)
	public BaseResult md5encode(@RequestBody JSONObject req) {
		String uuid = req.getString("str");
		String str = req.getString("str");
		log.info("md5encode uuid:{} str:{}", str);
		if (StringUtils.isBlanks(str)) {
			return new BaseResult(ErrorCode.PARAMETER_IS_EMPTY, uuid);
		}
		return utilsService.md5encode(req);
	}
}
