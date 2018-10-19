package com.neo.web.controller;


import java.sql.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
import com.neo.common.utils.WebUtils;
import com.neo.service.UserService;



@RestController
@RequestMapping("/app/user")
public class UserAppController extends BaseController {
	private static final Logger log = (Logger) LoggerFactory.getLogger(UserAppController.class);

	@Autowired
	private UserService userService;

	/**
	 * 获取首页菜单
	 * 
	 * @param req
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryHomeMenu.do", method = RequestMethod.POST)
	public BaseResult queryHomeMenu(@RequestBody JSONObject req, HttpServletRequest request) {
		String uuid = req.getString("uuid");
		log.info("queryHomeMenu uuid:{}", uuid);
		HttpSession session = request.getSession();
		JSONObject cacheUser = (JSONObject) session.getAttribute("cache_user");
		if (cacheUser != null && StringUtils.isNotBlanks(cacheUser.getString("userName"))) {
			req.put("userName", cacheUser.getString("userName"));
			BaseResult result = userService.queryUserAllFunctionsByUserName(req);
			
			JSONObject res = result.getRes();
			if (isSuccess(result)) {
				session.setAttribute("cache_user_all_functions", res.getJSONArray("userAllFunctions"));
				res.remove("userAllFunctions");
			}
			return result;
		}
		return new BaseResult(ErrorCode.ERROR, uuid);
	}

	

	/**
	 * 用户登出
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public BaseResult updateLogoutTime(@RequestBody JSONObject req, HttpServletRequest request) {
		String uuid = req.getString("uuid");
		log.debug("updateLogoutTime uuid:{}", uuid);
		HttpSession session = request.getSession();
		JSONObject cacheUser = (JSONObject) session.getAttribute("cache_user");
		if (cacheUser != null && StringUtils.isNotBlanks(cacheUser.getString("loginLogId"))) {
			req.put("id", cacheUser.getString("loginLogId"));
			req.put("logoutTime", new Date(0));
			BaseResult result = null;
					//callService(req, "api/user/updateLogoutTime");
			WebUtils.clearSession(session);
			return result;
		}
		WebUtils.clearSession(session);
		return new BaseResult(ErrorCode.USER_CACHE_INVALID, uuid);
	}
	/**
	 * 获取所有用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllUsers.do", method = RequestMethod.POST)
	public JSONObject getAllUsers(HttpServletRequest request) {
		System.out.println(request.getParameter("page"));
		
		UUID uuid = UUID.randomUUID();
		JSONObject req = new JSONObject();
		String searchField = request.getParameter("searchField");
		String searchString = request.getParameter("searchString");
		int currPage = Integer.parseInt(request.getParameter("page"));
		int count = Integer.parseInt(request.getParameter("rows"));
		String sortname = request.getParameter("sidx");
		String sortorder = request.getParameter("sord");
		String search  = request.getParameter("_search");
		if(StringUtils.isBlanks(sortname)) {
			sortname = "update_time";
		}
		req.put("uuid", uuid);
		req.put("sortname", sortname);
		req.put("sortorder", sortorder);
		req.put("count", count);
		req.put("currPage", currPage);
		req.put("searchField", searchField);
		req.put("searchString", searchString);
		req.put("searchOper", "eq".equals(request.getParameter("searchOper"))?"=":"like");
		req.put("start_num", count*(currPage-1));
		req.put("search", search);
		BaseResult result = userService.getAllUsers(req);
		
		return result.getRes();
	}
	
	/**
	 * 获取所有用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllUsers2.do", method = RequestMethod.POST)
	public JSONObject getAllUsers2(@RequestBody JSONObject req) {
		UUID uuid = UUID.randomUUID();
		req.put("uuid", uuid);
		BaseResult result = userService.getAllUsers2(req);
		return result.getRes();
		
	}
	/**
	 * 删除用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/delUser.do", method = RequestMethod.POST)
	public BaseResult delUser(@RequestBody JSONObject req) {
		UUID uuid = UUID.randomUUID();
		req.put("uuid", uuid);
		BaseResult result = userService.delUser(req);
		return result;
	}
	/**
	 * 编辑用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/editUser.do", method = RequestMethod.POST)
	public BaseResult editUser(@RequestBody JSONObject req) {
		UUID uuid = UUID.randomUUID();
		req.put("uuid", uuid);
		BaseResult result = userService.editUser(req);
		return result;
	}
	/**
	 * 查询用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/queryUserById.do", method = RequestMethod.POST)
	public BaseResult queryUserById(@RequestBody JSONObject req) {
		UUID uuid = UUID.randomUUID();
		req.put("uuid", uuid);
		BaseResult result = userService.queryUserById(req);
		return result;
		
	}
	/**
	 * 用户添加
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/addUser.do", method = RequestMethod.POST)
	public BaseResult addUser(@RequestBody JSONObject req) {
		UUID uuid = UUID.randomUUID();
		req.put("uuid", uuid);
		BaseResult result = userService.addUser(req);
		return result;
		
	}
	/**
	 * 查询用户权限
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getUserFuncs.do", method = RequestMethod.POST)
	public BaseResult getUserFuncs(@RequestBody JSONObject req) {
		UUID uuid = UUID.randomUUID();
		req.put("uuid", uuid);
		BaseResult result = userService.getUserFuncs(req);
		return result;
		
	}
	/**
	 * 给用户授权
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/assignTree.do", method = RequestMethod.POST)
	public BaseResult assignTree(@RequestBody JSONObject req) {
		UUID uuid = UUID.randomUUID();
		req.put("uuid", uuid);
		BaseResult result = userService.assignTree(req);
		return result;
		
	}
}
