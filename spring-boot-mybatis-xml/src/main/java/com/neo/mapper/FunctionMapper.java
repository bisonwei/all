package com.neo.mapper;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public interface FunctionMapper {

	JSONArray getAllFunctions();

	JSONObject queryFunctionById(Integer id);

}
