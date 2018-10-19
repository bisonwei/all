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
import com.neo.service.FunctionService;



@RestController
@RequestMapping("/app/function")
public class FunctionController extends BaseController {
	private static final Logger log = LoggerFactory.getLogger(UserAppController.class);

	@Autowired
	FunctionService functionService;
	/**
	 * 获取所有权限
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllFunctions", method = RequestMethod.POST)
	public BaseResult getAllFunctions(@RequestBody JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("getAllFunctions uuid:{}", uuid);
		return functionService.getAllFunctions(req);
	}

	/**
	 * 增加权限
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/addFunction", method = RequestMethod.POST)
	public BaseResult addFunction(@RequestBody JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("addFunction uuid:{}", uuid);
		
		return null;
	}

	/**
	 * 更新权限
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updateFunction", method = RequestMethod.POST)
	public BaseResult updateFunction(@RequestBody JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("updateFunction uuid:{}", uuid);
		return null;
	}

	/**
	 * 更新排序号
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updateViewPos", method = RequestMethod.POST)
	public BaseResult updateViewPos(@RequestBody JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("updateViewPos uuid:{}", uuid);
		return null;
	}

	/**
	 * 
	 * 删除权限
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/deleteFunction", method = RequestMethod.POST)
	public BaseResult deleteFunction(@RequestBody JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("deleteFunction uuid:{}", uuid);
		return null;
	}

	/**
	 * 
	 * 获取权限信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryFunction", method = RequestMethod.POST)
	public BaseResult getFunction(@RequestBody JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("queryFunction uuid:{}", uuid);
		return functionService.queryFunction(req);
	}
}
