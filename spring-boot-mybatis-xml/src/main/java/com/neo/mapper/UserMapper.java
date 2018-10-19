package com.neo.mapper;


import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.neo.entity.FunctionEntity;
import com.neo.entity.UserEntity;

public interface UserMapper {
	
	JSONArray queryUserAllFunctionsByUserName(String user_name);
	
	JSONObject getUserByUserName(String userName);
	
	JSONArray queryUsers1(JSONObject req);
	
	JSONArray queryUsers2(JSONObject req);
	
	JSONArray mulCdtqueryUsers(JSONObject req);
	
	Integer mulCdtqueryUsersCount(JSONObject req);
	
	void delUser(Integer id);
	
	JSONObject queryUserById(Integer id);

	void editUser(JSONObject req);

	void addUser(JSONObject req);
	
	JSONArray queryAllFunctions();

	void delUserAuthority(Integer id);

	void insertUserAuthority(JSONObject req);
}