package com.neo.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.neo.mapper.UserMapper;

@RestController
public class UserController {
	
	@Autowired
	private UserMapper userMapper;
	
	
	
    @RequestMapping("/getUser")
    public JSONObject getUser(Long id) {
    	JSONObject user=userMapper.getUserByUserName("jack");
        return user;
    }
    
    
    
}