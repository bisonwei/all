package com.neo.web.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.neo.common.BaseResult;
import com.neo.common.ErrorCode;
import com.neo.common.utils.EncryptUtils;
import com.neo.common.utils.StringUtils;
import com.neo.common.utils.ToolUtils;
import com.neo.common.utils.ValidateUtils;
import com.neo.common.utils.WebUtils;
import com.neo.service.UserService;



@RestController
@RequestMapping("/api/user")
public class UserApiController extends BaseController {
	private static final Logger log = LoggerFactory.getLogger(UserApiController.class);

	@Autowired
	private UserService userService;
	/**
	 * 从缓存获取用户信息
	 * 
	 * @param req
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getUserInfo", method = RequestMethod.POST)
	public BaseResult getUserInfo(@RequestBody JSONObject req, HttpServletRequest request) {
		String uuid = req.getString("uuid");
		log.debug("getUserInfo uuid:{}", uuid);
		HttpSession session = request.getSession();
		try {
			JSONObject cacheUser = (JSONObject) session.getAttribute("cache_user");
			if (cacheUser != null && !cacheUser.isEmpty()) {
				return new BaseResult(ErrorCode.OK, uuid, cacheUser);
			} else {
				WebUtils.clearSession(session);
				return new BaseResult(ErrorCode.USER_CACHE_INVALID, uuid);
			}
		} catch (Exception e) {
			log.error("getUserInfo error uuid:{}", uuid);
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.ERROR, uuid);
		}
	}

	/**
	 * 用户登录
	 * 
	 * @param req
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public BaseResult login(@RequestBody JSONObject req, HttpServletRequest request) {
		String uuid = req.getString("uuid");
		log.debug("login uuid:{}", uuid);
		HttpSession session = request.getSession();
		String userName = req.getString("userName");
		String password = req.getString("password");
		if (StringUtils.isBlanks(userName, password)) {
			return new BaseResult(ErrorCode.PARAMETER_IS_EMPTY, uuid);
		}
		req.put("deviceName", WebUtils.getDeviceName(request));
		req.put("hostName", WebUtils.getLocalName(request));
		req.put("ipAddress", WebUtils.getRemoteAddr(request));
		BaseResult result = userService.login(req);
		
		JSONObject res = result.getRes();
		if (isSuccess(result) && !res.isEmpty()) {
			session.setAttribute("cache_user", res);
		}
		return result;
	}

	/**
	 * 用户注册
	 * 
	 * @param req
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public BaseResult register(@RequestBody JSONObject req, HttpServletRequest request) {
		String uuid = req.getString("uuid");
		log.debug("register uuid:{}", uuid);
		HttpSession session = request.getSession();
		String userName = req.getString("userName");
		String nickName = req.getString("nickName");
		String password = req.getString("password");
		String verifyCode = req.getString("verifyCode");
		String email = req.getString("email");

		if (StringUtils.isBlanks(userName, nickName, password)) {
			return new BaseResult(ErrorCode.PARAMETER_IS_EMPTY, uuid);
		}
		if (!ValidateUtils.checkEmail(email)) {
			return new BaseResult(ErrorCode.EMAIL_FORMAL_ERROR, uuid);
		}
		/*if (StringUtils.isBlanks(verifyCode) || !CustomCaptcha.validateCaptcha(session, verifyCode)) {
			return new BaseResult(ErrorCode.VERIFY_CODE_ERROR, uuid);
		}*/

		req.put("deviceName", WebUtils.getDeviceName(request));
		req.put("hostName", WebUtils.getLocalName(request));
		req.put("ipAddress", WebUtils.getRemoteAddr(request));
		return null;
	}

	/**
	 * 注册发送邮件
	 * 
	 * @param req
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/sendRegisterEmail", method = RequestMethod.POST)
	public BaseResult sendRegisterEmail(@RequestBody JSONObject req, HttpServletRequest request) {
		String registerId = req.getString("registerId");
		String email = req.getString("email");
		log.debug("sendRegisterEmail email:{} registerId:{}", email, registerId);
		/*try {
			String href = AppConfig.webPbulicUrl + "activation.html?registerId=" + registerId;
			Email mail = new Email();
			mail.setSubject(AppConfig.webName + " 账户激活");
			mail.setToEmails(email);
			mail.setContent("<html><body>" + "<h2>亲爱的用户：</h2><br />" + "你好！<br />" + "&nbsp&nbsp&nbsp&nbsp感谢您注册"
					+ AppConfig.webName + "。您正在进行账户注册，请点击下面链接激活您的账户：" + "<a href='" + href
					+ "' target='_blank'>点击激活账户</a><br />" + "&nbsp&nbsp&nbsp&nbsp如非本人操作，请忽略此邮件，由此给您带来的不便请谅解！<br />"
					+ "<br/><br/><br/><br/>&nbsp&nbsp&nbsp&nbsp " + AppConfig.webCompany
					+ DateUtils.formatDateString(new Date(), "yyyy年MM月dd日 HH:mm:ss") + "</body></html>");
			log.debug("register sendEmail href:{}", href);
			SendMailTools.sendEmail(mail);
			return new BaseResult(ErrorCode.OK, registerId);
		} catch (Exception e) {
			log.error("sendRegisterEmail error email:{}", email);
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.EMAIL_SEND_ERROR, registerId);
		}*/
		return null;
	}

	/**
	 * 用户激活
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "/activation", method = RequestMethod.POST)
	public BaseResult activationByUserCode(@RequestBody JSONObject req) {
		String uuid = req.getString("uuid");
		String registerId = req.getString("registerId");
		log.debug("activationByUserCode uuid:{} registerId:{}", uuid);
		if (StringUtils.isBlanks(registerId)) {
			return new BaseResult(ErrorCode.PARAMETER_IS_EMPTY, uuid);
		}
		return null;
	}

	/**
	 * 发送重置密码邮件
	 * 
	 * @param req
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/resetPasswordSendEmail", method = RequestMethod.POST)
	public BaseResult resetPasswordSendEmail(@RequestBody JSONObject req, HttpServletRequest request) {
		String uuid = req.getString("uuid");
		log.debug("resetPasswordSendEmail uuid:{}", uuid);

		HttpSession session = request.getSession();

		String email = req.getString("email");
		String verifyCode = req.getString("verifyCode");
		if (!ValidateUtils.checkEmail(email)) {
			return new BaseResult(ErrorCode.EMAIL_FORMAL_ERROR, uuid);
		}
		/*if (StringUtils.isBlanks(verifyCode) || !CustomCaptcha.validateCaptcha(session, verifyCode)) {
			return new BaseResult(ErrorCode.VERIFY_CODE_ERROR, uuid);
		}

		BaseResult result = callService(req, "api/user/queryUserCountByEmail");
		if (!isSuccess(result)) {
			return result;
		}*/
		String resetVerifycode = StringUtils.getRandom(6);
		log.debug("resetPasswordSendEmail email：{} resetVerifycode：{}", email, resetVerifycode);
		/*try {
			Email mail = new Email();
			mail.setSubject(AppConfig.webName + " 重置密码");
			mail.setToEmails(email);
			mail.setContent("<html><body>" + "<h2>亲爱的用户：</h2><br />" + "你好<br />" + "&nbsp&nbsp&nbsp&nbsp感谢您使用"
					+ AppConfig.webName + "。您正在进行重置密码操作，请在验证码输入框中输入此次验证码："
					+ "<span style='color: red;font-weight: bold;'>" + resetVerifycode + "</span> [20分钟内有效]以完成验证。<br />"
					+ "&nbsp&nbsp&nbsp&nbsp如非本人操作，请忽略此邮件，由此给您带来的不便请谅解<br />"
					+ "<br/><br/><br/><br/>&nbsp&nbsp&nbsp&nbsp " + AppConfig.webCompany + " "
					+ DateUtils.formatDateString(new Date(), "yyyy年MM月dd日 HH:mm:ss") + "</body></html>");
			SendMailTools.sendEmail(mail);
			session.setAttribute("resetVerifycode", resetVerifycode);
			session.setAttribute("resetEmail", email);
			return new BaseResult(ErrorCode.OK, uuid);
		} catch (Exception e) {
			log.error("resetPasswordSendEmail error email:{}", email);
			ToolUtils.getFullStackTrace(log, e);
			return new BaseResult(ErrorCode.EMAIL_SEND_ERROR, uuid);
		}*/
		return null;
	}

	/**
	 * 重置密码
	 * 
	 * @param req
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/resetPassword", method = RequestMethod.POST)
	public BaseResult resetPassword(@RequestBody JSONObject req, HttpServletRequest request) {
		String uuid = req.getString("uuid");
		log.debug("resetPassword uuid:{}", uuid);

		String password = req.getString("password");
		String verifyCode = req.getString("verifyCode");
		if (StringUtils.isBlanks(password, verifyCode)) {
			return new BaseResult(ErrorCode.PARAMETER_IS_EMPTY, uuid);
		}
		HttpSession session = request.getSession();
		String resetVerifycode = (String) session.getAttribute("resetVerifycode");
		String resetEmail = (String) session.getAttribute("resetEmail");
		if (StringUtils.isBlanks(resetVerifycode, resetEmail)) {
			return new BaseResult(ErrorCode.VERIFY_CODE_CACHE_INVALID, uuid);
		}
		if (!resetVerifycode.equals(verifyCode)) {
			return new BaseResult(ErrorCode.VERIFY_CODE_ERROR, uuid);
		}

		req.put("password", EncryptUtils.md5Encrypt(password));
		req.put("email", resetEmail);
		return null;
	}
}
