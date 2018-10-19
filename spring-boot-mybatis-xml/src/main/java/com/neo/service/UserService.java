package com.neo.service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.neo.common.BaseResult;
import com.neo.common.ErrorCode;
import com.neo.common.utils.StringUtils;
import com.neo.common.utils.ToolUtils;
import com.neo.mapper.UserMapper;



@Service
public class UserService {
	private static final Logger log = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserMapper userMapper;
	
	
	/**
	 * 登录
	 * 
	 * @param req
	 * @return
	 */
	public BaseResult login(JSONObject req) {
		log.debug("login req:{}", req);
		String uuid = req.getString("uuid");
		
		String username = req.getString("userName");
		
		JSONObject user = null;
		try {
			user = userMapper.getUserByUserName(username);
		} catch (Exception e) {
			log.error("queryUserByLoginName error userName:[{}] {}", req, e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.DB_SERVICE_ERROR, uuid);
		}
		
		if (null == user ) {
			return new BaseResult(ErrorCode.USER_NAME_NOT_REGISTERED, uuid);
		}
		if (user.getInteger("state") == 1)
			return new BaseResult(ErrorCode.ACCOUNT_NOT_ACTIVATED, uuid);
		if (user.getInteger("state") == 2)
			return new BaseResult(ErrorCode.ACCOUNT_DEACTIVATION, uuid);
		if (!user.getString("password").equals(req.getString("password"))) {
			return new BaseResult(ErrorCode.USER_PASSWORD_ERROR, uuid);
		}
		JSONObject loginLog = new JSONObject();
		try {
			loginLog.put("userId", user.getString("id"));
			loginLog.put("userName", req.getString("userName"));
			loginLog.put("deviceName", req.getString("deviceName"));
			loginLog.put("hostName", req.getString("hostName"));
			loginLog.put("ipAddress", req.getString("ipAddress"));
			//userMapper.insertLoginLog(loginLog);

			JSONObject res = new JSONObject();
			JSONObject userInfo = new JSONObject();
			userInfo.put("userName", user.getString("user_name"));
			res.put("userName", req.getString("userName"));
			res.put("userId", user.getString("id"));
			res.put("userInfo", userInfo);
			return new BaseResult(ErrorCode.OK, uuid, res);
		} catch (Exception e) {
			log.error("login insertLoginLog error loginLog:[{}] {}", loginLog, e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.DB_SERVICE_ERROR, uuid);
		}
	};
	/**
	 * 查询权限 by LoginName
	 * 
	 * @param req
	 * @return
	 */
	public BaseResult queryUserAllFunctionsByUserName(JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("queryUserAllFunctionsByLoginName uuid:{}", uuid);
		try {
			JSONArray userAllFunctions = userMapper.queryUserAllFunctionsByUserName(req.getString("userName"));
			JSONObject res = new JSONObject();
			res.put("userAllFunctions", userAllFunctions);
			
			res.put("menus", createMenus(new BigDecimal(0), userAllFunctions));
			return new BaseResult(ErrorCode.OK, uuid, res);
		} catch (Exception e) {
			log.error("queryUserAllFunctionsByLoginName error req:[{}] {}", req, e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.DB_SERVICE_ERROR, uuid);
		}
	};

	/**
	 * 创建主页菜单
	 * 
	 * @param id
	 * @param allFunctions
	 * @return
	 */
	private static JSONArray createMenus(BigDecimal id, JSONArray allFunctions) {
		JSONArray menuItem = new JSONArray();
		JSONObject func;
		JSONObject item = null;
		for (Object obj : allFunctions) {
			item = (JSONObject) obj;
			if (item.getInteger("type") == 1)
				continue;// 操作权限跳过
			if (new BigDecimal(item.getInteger("parent_id")).equals(id)) {
				JSONArray children = createMenus(new BigDecimal(item.getInteger("id")), allFunctions);
				func = new JSONObject();
				func.put("name", item.getString("name"));
				func.put("param", item.getString("param"));
				func.put("icon", item.getString("icon"));
				func.put("children", children);
				menuItem.add(func);
			}
		}
		return menuItem;
	}
	public BaseResult getAllUsers(JSONObject req) {
		String uuid = req.getString("uuid");
		Integer count = req.getInteger("count");
		try {
			boolean search = req.getBoolean("search");
			JSONArray arr = new JSONArray();
			if( search) {
				arr = userMapper.queryUsers2(req);
			}else  {
				arr = userMapper.queryUsers1(req);
			}
			Integer totalCount = arr.size();
			JSONObject userInfo;
			for(Object obj:arr) {
				userInfo = (JSONObject) obj;
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date criTime = userInfo.getDate("create_time");
				String create_time = simpleDateFormat.format(criTime);
				userInfo.put("create_time", create_time);
				Date uptTime = userInfo.getDate("update_time");
				String update_time = simpleDateFormat.format(uptTime);
				userInfo.put("update_time", update_time);
			}
			Integer totalPage = totalCount/count;
			if(totalCount%count != 0) {
				totalPage = totalCount/count+1;
			}
			JSONObject resultObj = new JSONObject();
			resultObj.put("totalPage", totalPage);
			resultObj.put("currPage", req.getString("currPage"));
			resultObj.put("totalCount", totalCount);
			resultObj.put("users", arr);
			resultObj.put("uuid", req.getString("uuid"));
			return new BaseResult(ErrorCode.OK,req.getString("uuid"),resultObj);
		}catch(Exception e) {
			log.error("addUser error {}", e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
		}
		return null;
	};
	/**
	 * 
	 *   分页查询
	 * @param req
	 * @return
	 */
	public BaseResult getAllUsers2(JSONObject req) {
		String uuid = req.getString("uuid");
		Integer count = req.getInteger("limit");
		System.out.println(req.toJSONString());
		try {
			JSONArray arr = new JSONArray();
			arr = userMapper.mulCdtqueryUsers(req);
			Integer totalCount = userMapper.mulCdtqueryUsersCount(req);
			JSONObject userInfo;
			for(Object obj:arr) {
				userInfo = (JSONObject) obj;
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date criTime = userInfo.getDate("create_time");
				String create_time = simpleDateFormat.format(criTime);
				userInfo.put("create_time", create_time);
				Date uptTime = userInfo.getDate("update_time");
				String update_time = simpleDateFormat.format(uptTime);
				userInfo.put("update_time", update_time);
			}
			Integer totalPage = totalCount/count;
			if(totalCount%count != 0) {
				totalPage = totalCount/count+1;
			}
			JSONObject resultObj = new JSONObject();
			resultObj.put("totalPage", totalPage);
			resultObj.put("page", req.getString("page"));
			resultObj.put("total", totalCount);
			resultObj.put("users", arr);
			resultObj.put("uuid", req.getString("uuid"));
			return new BaseResult(ErrorCode.OK,req.getString("uuid"),resultObj);
		}catch(Exception e) {
			log.error("addUser error {}", e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
		}
		return null;
	};
	/**
	 * 
	 *   删除用户
	 * @param req
	 * @return
	 */
	public BaseResult delUser(JSONObject req) {
		String uuid = req.getString("uuid");
		Integer id = req.getInteger("id");
		try {
			userMapper.delUser(id);
			return new BaseResult(ErrorCode.OK,uuid);
		}catch(Exception e) {
			log.error("addUser error {}", e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
		}
		return new BaseResult(ErrorCode.DB_SERVICE_ERROR,uuid);
	};
	
	/**
	 * 
	 *   查询用户
	 * @param req
	 * @return
	 */
	public BaseResult queryUserById(JSONObject req) {
		String uuid = req.getString("uuid");
		Integer id = req.getInteger("id");
		try {
			JSONObject res = userMapper.queryUserById(id);
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date criTime = res.getDate("create_time");
			String create_time = simpleDateFormat.format(criTime);
			res.put("create_time", create_time);
			Date uptTime = res.getDate("update_time");
			String update_time = simpleDateFormat.format(uptTime);
			res.put("update_time", update_time);
			
			return new BaseResult(ErrorCode.OK,uuid,res);
		}catch(Exception e) {
			log.error("addUser error {}", e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
		}
		return new BaseResult(ErrorCode.DB_SERVICE_ERROR,uuid);
	}
	public BaseResult editUser(JSONObject req) {
		String uuid = req.getString("uuid");
		String user_name = req.getString("user_name");
		Integer id = req.getInteger("id");
		try {
			JSONObject user = userMapper.queryUserById(id);
			userMapper.editUser(req);
			return new BaseResult(ErrorCode.OK,uuid);
		} catch (Exception e) {
			log.error("addUser error {}", e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.USER_NAME_EXIST,uuid);
		}
		
	}
	public BaseResult addUser(JSONObject req) {
		String uuid = req.getString("uuid");
		try {
			String user_name = req.getString("user_name");
			JSONObject user = userMapper.getUserByUserName(user_name);
			if(null==user) {
				userMapper.addUser(req);
				return new BaseResult(ErrorCode.OK,uuid);
			}
			return new BaseResult(ErrorCode.USER_NAME_EXIST,uuid);
			
		} catch (Exception e) {
			log.error("addUser error req:[{}] {}", req, e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			
		}
		return new BaseResult(ErrorCode.DB_SERVICE_ERROR,uuid);
	}
	public BaseResult getUserFuncs(JSONObject req) {
		String uuid = req.getString("uuid");
		log.debug("getUserFuncs uuid:{}", uuid);
		try {
			JSONObject user = userMapper.queryUserById(req.getInteger("id"));
			JSONArray userAllFunctions = userMapper.queryUserAllFunctionsByUserName(user.getString("user_name"));
			JSONArray AllFunctions = userMapper.queryAllFunctions();
			JSONObject res = new JSONObject();
			//res.put("functions", userAllFunctions);
			res.put("functions", createFunctionTree(new BigDecimal(0),AllFunctions, userAllFunctions));
			return new BaseResult(ErrorCode.OK, uuid, res);
		} catch (Exception e) {
			log.error("queryUserAllFunctionsByLoginName error req:[{}] {}", req, e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.DB_SERVICE_ERROR, uuid);
		}
	};
	public JSONArray createFunctionTree(BigDecimal id,JSONArray AllFunctions,JSONArray userAllFunctions) {
		JSONArray functions = new JSONArray();
		try {
			JSONObject item = null;
			for(Object obj :AllFunctions) {
				item = (JSONObject) obj;
				JSONObject function = new JSONObject();
				function.put("id", item.getBigDecimal("id"));
				function.put("parent_id", item.getBigDecimal("parent_id"));
				function.put("name", item.getString("name"));
				String icon = item.getString("icon");
				if(StringUtils.isBlanks(icon)) {
					function.put("iconSkin", "glyphicon glyphicon-flash");
				}else {
					function.put("iconSkin", icon);
				}
				JSONObject item2 = null;
				for(Object userFuncobj :userAllFunctions) {
					item2 =  (JSONObject) userFuncobj;
					if(item2.getString("id").equals(item.getString("id"))) {
						function.put("checked", true);
					}
				}
				function.put("open", true);
				functions.add(function);
			}
			JSONObject root = new JSONObject();
			root.put("id", new BigDecimal(0));
			root.put("parent_id", new BigDecimal(0));
			root.put("name", "所有权限");
			root.put("iconSkin", "glyphicon glyphicon-flash");
			root.put("iconSkin", "glyphicon glyphicon-flash");
			root.put("checked", true);
			root.put("open", true);
			//functions.add(root);
			return functions;
		}catch(Exception e) {
			log.error("addUser error {}", e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
		}
		return null;
	}
	/**
	 * 给用户授权
	 * @param req
	 * @return
	 */
	public BaseResult assignTree(JSONObject req) {
		
		String uuid = req.getString("uuid");
		log.debug("assignTree uuid:{}", uuid);
		try {
			Integer id = req.getInteger("id");
			userMapper.delUserAuthority(id);
			String selectIdStr = req.getString("selectIdStr");
			String[] ids = selectIdStr.split(",");
			JSONObject insJson = new JSONObject();
			insJson.put("user_id", id);
			for(int i=0;i<ids.length;i++) {
				if(!"0".equals(ids[i])) {
					insJson.put("function_id", Integer.parseInt(ids[i]));
					userMapper.insertUserAuthority(insJson);
				}
			}
			return new BaseResult(ErrorCode.OK, uuid);
		} catch (Exception e) {
			log.error("queryUserAllFunctionsByLoginName error req:[{}] {}", req, e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.DB_SERVICE_ERROR, uuid);
		}
	}
}