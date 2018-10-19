package com.neo.common.utils;


import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class StringUtils {
	static final int GB_SP_DIFF = 160;
	static final int[] secPosValueList = { 1601, 1637, 1833, 2078, 2274, 2302, 2433, 2594, 2787, 3106, 3212, 3472, 3635,
			3722, 3730, 3858, 4027, 4086, 4390, 4558, 4684, 4925, 5249, 5600 };
	static final char[] firstLetter = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
			'r', 's', 't', 'w', 'x', 'y', 'z' };

	private static Random rd = new Random();

	public static byte[] getBytes(String str) {
		if (str != null) {
			try {
				return str.getBytes("UTF-8");
			} catch (UnsupportedEncodingException e) {
				return null;
			}
		} else {
			return null;
		}
	}

	public static String byteToString(byte[] bytes) {
		try {
			return new String(bytes, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}
	public static boolean isBlanks(String str) {
		if (str == null||str.length()<1) {
			return true;
		}
		return false;
	}
	public static boolean isBlanks(Object str) {
		if (str == null||str == "") {
			return true;
		}
		
		return false;
	}
	public static boolean isBlanks(String... str) {
		if (str == null)
			return true;
		for (String s : str) {
			if (org.apache.commons.lang.StringUtils.isBlank(s))
				return true;
		}
		return false;
	}

	public static boolean isNotBlanks(String... str) {
		return !isBlanks(str);
	}

	public static boolean includes(String str, String s) {
		return str.indexOf(s) != -1;
	}

	public static Double toDouble(Object val) {
		if (val == null) {
			return 0D;
		}
		try {
			return Double.valueOf(trim(val.toString()));
		} catch (Exception e) {
			return 0D;
		}
	}

	public static Float toFloat(Object val) {
		return toDouble(val).floatValue();
	}

	public static Long toLong(Object val) {
		return toDouble(val).longValue();
	}

	public static Integer toInteger(Object val) {
		return toLong(val).intValue();
	}

	public static String getRandom(int count) {
		return getRandom(count, null);
	}

	public static String getRandom(int count, String exclude) {
		if (exclude == null) {
			exclude = "";
		}
		if (count <= 0) {
			throw new IllegalArgumentException("Character length must be > 0");
		}
		int start = ' ';
		int end = 'z' + 1;
		int num = end - start;
		StringBuffer buf = new StringBuffer();
		char c;
		while (count-- != 0) {
			c = (char) rd.nextInt(num);
			if (Character.isLetterOrDigit(c) && exclude.indexOf((int) c) < 0) {
				buf.append(c);
			} else {
				count++;
			}
		}
		return buf.toString();
	}

	public static String getRandomFromLong() {

		String token = Long.toString(Math.abs(rd.nextLong()), 36);
		return token;
	}

	public static String capitalize(String str) {
		return changeFirstCharacterCase(str, true);
	}

	public static String uncapitalize(String str) {
		return changeFirstCharacterCase(str, false);
	}

	private static String changeFirstCharacterCase(String str, boolean capitalize) {
		if (str == null || str.length() == 0) {
			return str;
		}
		StringBuffer buf = new StringBuffer(str.length());
		if (capitalize) {
			buf.append(Character.toUpperCase(str.charAt(0)));
		} else {
			buf.append(Character.toLowerCase(str.charAt(0)));
		}
		buf.append(str.substring(1));
		return buf.toString();
	}

	public static String[] removeDuplicateStrings(String[] array) {
		if (array == null) {
			return array;
		}
		Set<String> set = new HashSet<String>();
		for (int i = 0; i < array.length; i++) {
			set.add(array[i]);
		}
		return set.toArray(new String[set.size()]);
	}

	public static String padLeft(String str, char c, int len) {
		String _c = String.valueOf(c);
		String _str = str;
		while (_str.length() < len) {
			_str = _c + _str;
		}
		return _str;
	}

	public static String padRight(String str, char c, int len) {
		String _c = String.valueOf(c);
		String _str = str;
		while (_str.length() < len) {
			_str = _str + _c;
		}
		return _str;
	}

	public static String right(String str, int len) {
		if (isBlanks(str))
			return "";
		String _str = str;
		if (_str.length() <= len) {
			return _str;
		}
		return _str.substring(_str.length() - len);
	}

	public static String left(String str, int len) {
		if (isBlanks(str))
			return "";
		String _str = str;
		if (_str.length() <= len) {
			return _str;
		}
		return _str.substring(0, len);
	}

	public static String join(String[] arr, String splitChar) {
		if (arr == null || arr.length == 0)
			return "";
		StringBuilder sbStr = new StringBuilder();
		for (int i = 0; i < arr.length; i++) {
			sbStr.append(arr[i]);
			if (i != arr.length - 1)
				sbStr.append(splitChar);
		}
		return sbStr.toString();
	}

	public static String join(char[] arr, String splitChar) {
		if (arr == null || arr.length == 0)
			return "";
		StringBuilder sbStr = new StringBuilder();
		for (int i = 0; i < arr.length; i++) {
			sbStr.append(arr[i]);
			if (i != arr.length - 1)
				sbStr.append(splitChar);
		}
		return sbStr.toString();
	}

	public static String trimEnd(String str, char... chs) {
		if (str == null || str.length() == 0)
			return str;
		for (char ch : chs) {
			while (str.length() > 0 && str.charAt(str.length() - 1) == ch) {
				str = str.substring(0, str.length() - 1);
			}
		}
		return str;
	}

	public static String trimStart(String str, char... chs) {
		if (str == null || str.length() == 0)
			return str;
		for (char ch : chs) {
			while (str.length() > 0 && str.charAt(0) == ch) {
				str = str.substring(1);
			}
		}
		return str;
	}

	public static String trim(String str, char... chs) {
		if (chs == null)
			chs = new char[] { ' ' };
		return trimEnd(trimStart(str, chs), chs);
	}

	public static String format(String formatString, Object... objs) {
		if (objs == null && objs.length == 0)
			return formatString;

		for (int i = 0; i < objs.length; i++) {
			if (objs[i] == null) {
				objs[i] = "";
			}
		}

		return String.format(formatString, objs);
	}

	public static String getChineseSpell(String strText, boolean replaceBlank) {
		int len = strText.length();
		StringBuilder myStr = new StringBuilder();
		for (int i = 0; i < len; i++) {
			myStr.append(getSpell(strText.charAt(i)));
		}
		if (replaceBlank) {
			return myStr.toString().replace(" ", "_");
		}
		return myStr.toString();
	}

	private static char getSpell(char cnChar) {
		char[] temp = new char[] { cnChar };
		byte[] uniCode = new String(temp).getBytes();
		if (uniCode[0] < 128 && uniCode[0] > 0) { // 非汉字
			return cnChar;
		}
		return convert(uniCode);
	}

	private static char convert(byte[] bytes) {
		char result = '-';
		int secPosValue = 0;
		int i;
		for (i = 0; i < bytes.length; i++) {
			bytes[i] -= GB_SP_DIFF;
		}
		secPosValue = bytes[0] * 100 + bytes[1];
		for (i = 0; i < 23; i++) {
			if (secPosValue >= secPosValueList[i] && secPosValue < secPosValueList[i + 1]) {
				result = firstLetter[i];
				break;
			}
		}
		return result;
	}
}