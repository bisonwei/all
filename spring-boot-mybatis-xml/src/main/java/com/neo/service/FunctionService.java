package com.neo.service;

import java.math.BigDecimal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.neo.common.BaseResult;
import com.neo.common.ErrorCode;
import com.neo.common.utils.ToolUtils;
import com.neo.mapper.FunctionMapper;




@Service
public class FunctionService {
	private static final Logger log = LoggerFactory.getLogger(FunctionService.class);

	@Autowired
	private FunctionMapper functionMapper;
	
	
	
	public BaseResult getAllFunctions(JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("getAllFunctions uuid:{}", uuid);
		JSONObject res = new JSONObject();
		try {
			JSONArray allFuncList = functionMapper.getAllFunctions();
			JSONObject json = new JSONObject();
			for(Object obj:allFuncList) {
				json = (JSONObject) obj;
				json.put("open", true);
			}
			res.put("allFuncList", allFuncList);
			return new BaseResult(ErrorCode.OK, uuid,res);
		} catch (Exception e) {
			log.error("queryUserAllFunctionsByLoginName error req:[{}] {}", req, e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.DB_SERVICE_ERROR, uuid);
		}
	}
	/**
	 * 创建主页菜单
	 * 
	 * @param id
	 * @param allFunctions
	 * @return
	 */
	private static JSONArray createTrees(BigDecimal id, JSONArray allFunctions) {
		JSONArray menuItem = new JSONArray();
		JSONObject func;
		JSONObject item = null;
		for (Object obj : allFunctions) {
			item = (JSONObject) obj;
			
			//JSONArray children = createTrees(new BigDecimal(item.getInteger("id")), allFunctions);
			func = new JSONObject();
			func.put("id", item.getString("id"));
			func.put("parent_id", item.getString("parent_id"));
			func.put("name", item.getString("name"));
			func.put("param", item.getString("param"));
			func.put("icon", item.getString("icon"));
			func.put("type", item.getString("type"));
			//func.put("children", children);
			menuItem.add(func);
			
		}
		return menuItem;
	}
	public BaseResult queryFunction(JSONObject req) {
		Integer id = req.getInteger("id");
		String uuid = req.getString("uuid");
		try {
			JSONObject res = functionMapper.queryFunctionById(id);
			return new BaseResult(ErrorCode.OK,uuid,res);
		} catch (Exception e) {
			log.error("queryFunction error req:[{}] {}", req, e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.DB_SERVICE_ERROR, uuid);
		}
	}
}