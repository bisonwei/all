package com.neo.common.utils;


import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EncryptUtils {
	private static final Logger log = LoggerFactory.getLogger(EncryptUtils.class);

	private static String[] hexDigits = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E",
			"F" };
	private static int saltLength = 4;

	public static String base64Encode(String s) {
		if (s == null) {
			return null;
		}
		try {
			return base64Encode(s.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			ToolUtils.getFullStackTrace(log, e);
			throw new RuntimeException(e);
		}
	}

	public static String base64Encode(byte[] b) {
		if (b == null) {
			return null;
		}
		return Base64.getEncoder().encodeToString(b);
	}

	public static String base64DecodeToString(String s) {
		byte[] b = base64Decode(s);
		if (b == null) {
			return null;
		} else {
			try {
				return new String(b, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				ToolUtils.getFullStackTrace(log, e);
				throw new RuntimeException(e);
			}
		}
	}

	public static byte[] base64Decode(String s) {
		if (s == null) {
			return null;
		}
		return Base64.getDecoder().decode(s);
	}

	/**
	 * 加密不可逆
	 * 
	 * @param buf
	 * @return
	 * @throws Exception
	 */
	public static String md5Encrypt(String buf) {
		try {
			MessageDigest instance = MessageDigest.getInstance("MD5");
			instance.update(buf.getBytes());
			byte[] data = instance.digest();
			return byteArraytoHexString(data);
		} catch (Exception e) {
			log.error("md5Encrypt fail {}", e.getMessage());
			ToolUtils.getFullStackTrace(log, e);
		}
		return "";
	}

	/**
	 * 加密不可逆，不重复
	 * 
	 * @param buf
	 * @return
	 * @throws Exception
	 */
	public static String shaEncrypt(String buf) throws Exception {
		if (buf == null)
			buf = "";
		buf = StringUtils.padLeft(buf, '0', 6);
		try {
			MessageDigest instance = MessageDigest.getInstance("SHA");
			instance.update(buf.getBytes());
			byte[] byteTemp = instance.digest();

			return base64Encode(createShaEncryptByte(byteTemp));
		} catch (Exception e) {
			throw new Exception("shaEncrypt fail" + e.getMessage());
		}
	}

	/**
	 * 加密比对
	 * 
	 * @param str
	 * @param encryptStr
	 * @return
	 */
	public static boolean shaCompare(String str, String encryptStr) {
		if (str == null)
			str = "";
		str = str.length() < 6 ? StringUtils.padLeft(str, '0', 6) : str;
		try {
			MessageDigest instance = MessageDigest.getInstance("SHA");
			instance.update(str.getBytes());
			byte[] byteNewEncryption = instance.digest();
			byte[] byteOldEncryption = base64Decode(encryptStr);
			if (compareEncrypts(byteOldEncryption, byteNewEncryption) == true)
				return true;
			else
				return false;
		} catch (Exception ex) {
			return false;
		}
	}

	private static String byteToHexString(byte b) {
		int n = b;
		if (n < 0) {
			n = 256 + n;
		}
		int d1 = n / 16;
		int d2 = n % 16;
		return hexDigits[d1] + hexDigits[d2];
	}

	private static String byteArraytoHexString(byte[] b) {
		String res = "";
		for (int i = 0; i < b.length; ++i) {
			res += byteToHexString(b[i]);
		}
		return res;
	}

	private static byte[] createShaEncryptByte(byte[] unsaltedByte) throws Exception {
		byte[] saltValue = new byte[saltLength];
		new Random().nextBytes(saltValue);
		return createSaltedEncrytByte(saltValue, unsaltedByte);
	}

	private static byte[] createSaltedEncrytByte(byte[] saltValue, byte[] unsaltedByte) throws Exception {
		byte[] rawSalted = new byte[unsaltedByte.length + saltValue.length];
		for (int i = 0; i < unsaltedByte.length; i++)
			rawSalted[i] = unsaltedByte[i];
		for (int i = 0; i < saltValue.length; i++)
			rawSalted[unsaltedByte.length + i] = saltValue[i];
		MessageDigest instance = MessageDigest.getInstance("SHA");
		instance.update(rawSalted);
		byte[] saltedByte = instance.digest();
		byte[] encrytByte = new byte[saltedByte.length + saltValue.length];
		for (int i = 0; i < saltedByte.length; i++)
			encrytByte[i] = saltedByte[i];
		for (int i = 0; i < saltValue.length; i++)
			encrytByte[saltedByte.length + i] = saltValue[i];

		return encrytByte;
	}

	private static boolean compareEncrypts(byte[] storedEncryptByte, byte[] hashedEncryptByte) throws Exception {
		if (storedEncryptByte == null || hashedEncryptByte == null
				|| hashedEncryptByte.length != storedEncryptByte.length - saltLength)
			return false;
		byte[] saltValue = new byte[saltLength];
		int saltOffset = storedEncryptByte.length - saltLength;
		for (int i = 0; i < saltLength; i++)
			saltValue[i] = storedEncryptByte[saltOffset + i];
		byte[] saltedNewEncryptByte = createSaltedEncrytByte(saltValue, hashedEncryptByte);
		return compareByteArray(storedEncryptByte, saltedNewEncryptByte);
	}

	private static boolean compareByteArray(byte[] array1, byte[] array2) {
		if (array1.length != array2.length)
			return false;
		for (int i = 0; i < array1.length; i++) {
			if (array1[i] != array2[i])
				return false;
		}
		return true;
	}
	public static void main(String[] args) {
		String ss = "123456";
		System.out.println(md5Encrypt(ss));
	}
}