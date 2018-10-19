package com.neo.web.util;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HtmlUtils {
	private static final Logger log = LoggerFactory.getLogger(HtmlUtils.class);

	/*public static Document readTemple(String path) {
		log.debug("readTemple path:{}", path);
		Document doc = new Document("");
		try {
			doc = Jsoup.parse(HtmlUtils.class.getResourceAsStream(path), "UTF-8", "");
		} catch (Exception e) {
			System.out.println("读取文件内容出错");
			e.printStackTrace();
		}
		return doc;
	}

	public static String send(String path, String script) {
		Document doc = readTemple(path);
		StringBuilder sb = new StringBuilder();
		sb.append("<script>window.onload = function () {" + script + "}</script>");
		doc.body().prepend(sb.toString());
		return doc.toString();
	}

	public static void main(String[] args) {
		Document doc = Jsoup.parse(
				"<!doctype html><html><head><meta charset=\"utf-8\"><title></title><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"><meta name=\"keywords\" content=\"\"><meta name=\"description\" content=\"\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\"></head><body>123</body></html>");
		System.out.println("-->" + doc.html());
	}*/
}
