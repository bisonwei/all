package com.neo.common.utils;


import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * http请求
 */
public class HttpUtils {
	private static final Logger log = LoggerFactory.getLogger(HttpUtils.class);

	/**
	 * 获取http内容
	 * 
	 * @param requestUrl
	 * @return
	 * @throws Exception
	 */
	public static String get(String requestUrl) throws Exception {
		return get(requestUrl, "utf-8");
	}

	public static String get(String requestUrl, String charset) throws Exception {
		URL url = new URL(requestUrl);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		StringWriter sw = new StringWriter();

		try {
			InputStream inStream = connection.getInputStream();
			InputStreamReader inr = new InputStreamReader(inStream, java.nio.charset.Charset.forName(charset));
			char[] buf = new char[8096];
			int size = 0;

			try {
				while ((size = inr.read(buf)) != -1)
					sw.write(buf, 0, size);
			} finally {
				sw.close();
				inr.close();
				inStream.close();
			}
		} finally {
			connection.disconnect();
		}
		return sw.toString();
	}

	/**
	 * 以POST方式发送内容并获取数据
	 * 
	 * @param requestUrl
	 * @param content
	 * @return
	 * @throws Exception
	 */
	public static String send(String requestUrl, String content) throws Exception {
		return send(requestUrl, content, null, "utf-8");
	}

	public static String send(String requestUrl, String content, HashMap<String, String> requestProperties,
			String charset) throws Exception {
		charset = charset == null ? "utf-8" : charset;

		URL url = new URL(requestUrl);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setDoOutput(true);
		connection.setDoInput(true);
		connection.setRequestMethod("POST");

		if (requestProperties != null) {
			for (String key : requestProperties.keySet()) {
				if (key.equalsIgnoreCase("ConnectTimeOut")) {
					connection.setConnectTimeout(Integer.parseInt(requestProperties.get(key)));
				} else if (key.equalsIgnoreCase("ReadTimeOut")) {
					connection.setReadTimeout(Integer.parseInt(requestProperties.get(key)));
				} else {
					connection.setRequestProperty(key, requestProperties.get(key));
				}
			}
		}

		OutputStream outStream = connection.getOutputStream();
		OutputStreamWriter osw = new OutputStreamWriter(outStream, java.nio.charset.Charset.forName(charset));
		String response = null;

		try {
			try {
				osw.write(content);
			} finally {
				osw.close();
				outStream.close();
			}

			InputStream inStream = null;
			InputStreamReader inStreamReader = null;

			try {
				inStream = connection.getInputStream();
			} catch (Exception exception) {
				inStream = connection.getErrorStream();
			}

			if (inStream == null) {
				throw new Exception("连接异常,无法获取响应");
			}

			inStreamReader = new InputStreamReader(inStream, java.nio.charset.Charset.forName(charset));
			StringWriter sw = new StringWriter();
			char[] buf = new char[8096];
			int size = 0;

			try {
				while ((size = inStreamReader.read(buf)) != -1)
					sw.write(buf, 0, size);

				response = sw.toString();
			} finally {
				sw.close();
				inStreamReader.close();
				inStream.close();
			}
		} finally {
			connection.disconnect();
		}

		return response;
	}
}
