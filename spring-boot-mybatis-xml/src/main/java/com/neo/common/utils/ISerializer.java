package com.neo.common.utils;


public interface ISerializer {
	/**
	 * 反序列化
	 * 
	 * @param serializedXml
	 *            序列化字串
	 * @param rootName
	 *            根元素名称
	 */
	void deserialize(String serializedXml, String rootName);

	/**
	 * 序列化
	 * 
	 * @param rootName
	 *            根元素名称
	 * @return
	 */
	String serialize(String rootName);
}