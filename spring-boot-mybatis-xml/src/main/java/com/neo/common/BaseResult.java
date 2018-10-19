package com.neo.common;


import java.io.Serializable;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONObject;

public class BaseResult implements Serializable {
	private static final Logger log = LoggerFactory.getLogger(BaseResult.class);

	private static final String[] errors = { "0001", "0002", "0003", "1000", "1001", "8000" };

	private static final long serialVersionUID = 1L;

	private String uuid;

	private String errorCode;

	private String errorMessage;

	private JSONObject res;

	public BaseResult() {

	}

	public BaseResult(ErrorCode e, String uuid) {
		ErrorCode errorCode = maskingError(e);
		this.errorCode = errorCode.getErrorCode();
		this.errorMessage = errorCode.getErrorMessage();
		this.uuid = uuid;
		this.res = new JSONObject();
	}

	private ErrorCode maskingError(ErrorCode e) {
		if (Arrays.asList(errors).contains(e.getErrorCode())) {
			return ErrorCode.ERROR;
		}
		return e;
	}

	public BaseResult(ErrorCode e, String uuid, JSONObject res) {
		ErrorCode errorCode = maskingError(e);
		this.errorCode = errorCode.getErrorCode();
		this.errorMessage = errorCode.getErrorMessage();
		this.uuid = uuid;
		this.res = res;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public JSONObject getRes() {
		return res;
	}

	public void setRes(JSONObject res) {
		this.res = res;
	}

	@Override
	public String toString() {
		return "{uuid:" + uuid + ", errorCode:" + errorCode + ", res:" + res + ", errorMessage:" + errorMessage + "}";
	}
}
