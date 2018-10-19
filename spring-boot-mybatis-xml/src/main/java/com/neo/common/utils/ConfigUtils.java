package com.neo.common.utils;


import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Properties;

/**
 * 配置读取
 *
 */
public class ConfigUtils {
	private static Properties props = null;
	private final static String CONFIG_FILE_PATH = "config.properties";

	/**
	 * 先从根目录读取 再从上一级目录读取
	 */
	private synchronized static void loadProperties() {
		if (props != null)
			return;

		props = new Properties();
		try {
			InputStream input = ConfigUtils.class.getResourceAsStream("/" + CONFIG_FILE_PATH);

			if (input == null) {
				ClassLoader classLoader = ConfigUtils.class.getClassLoader();
				input = ConfigUtils.class.getResourceAsStream("" + classLoader.getResource(CONFIG_FILE_PATH));
			}

			if (input == null) {
				String configPath = StringUtils.trimEnd(System.getProperty("user.dir"), '/', '\\') + "/"
						+ CONFIG_FILE_PATH;
				input = new BufferedInputStream(new FileInputStream(configPath));
			}

			if (input == null) {
				return;
			}

			props.load(input);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 读取config.properties文件中的属性值
	 * 
	 * @param propName
	 * @return
	 */
	public static String getProperty(String propName) {
		loadProperties();
		return props.getProperty(propName);
	}

	private static ClassLoader getTCL() throws IllegalAccessException, InvocationTargetException {
		Method method = null;
		try {
			method = Thread.class.getMethod("getContextClassLoader", null);
		} catch (NoSuchMethodException e) {
			return null;
		}

		return (ClassLoader) method.invoke(Thread.currentThread(), null);
	}
}