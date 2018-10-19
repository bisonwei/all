package com.neo.entity;

import java.io.Serializable;
import java.util.Date;

import com.alibaba.fastjson.JSONArray;


public class UserEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	@Override
	public String toString() {
		return "UserEntity [id=" + id + ", userName=" + userName + ", password=" + password + ", sex=" + sex
				+ ", state=" + state + ", updateTime=" + updateTime + "]";
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	private String userName;
	private String password;
	private String sex;
	private int state;
	private Date updateTime;
	
	

}