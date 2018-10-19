package com.neo.entity;

import java.io.Serializable;

import com.alibaba.fastjson.JSONArray;


public class FunctionEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	@Override
	public String toString() {
		return "FunctionEntity [id=" + id + ", parentId=" + parentId + ", name=" + name + ", param=" + param
				+ ", description=" + description + ", icon=" + icon + ", type=" + type + ", state=" + state
				+ ", viewPos=" + viewPos + "]";
	}
	private Long parentId;
	private String name;
	private String param;
	private String description;
	private String icon;
	private int type;
	private int state;
	private int viewPos;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParam() {
		return param;
	}
	public void setParam(String param) {
		this.param = param;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getViewPos() {
		return viewPos;
	}
	public void setViewPos(int viewPos) {
		this.viewPos = viewPos;
	}
	

}