package com.neo.web.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class CommonController extends BaseController {
	private static final Logger log = LoggerFactory.getLogger(CommonController.class);

	/*@Autowired
	private ImageCaptchaService imageCaptchaService;
*/
	/**
	 * 获取图形验证码
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	/*@RequestMapping(value = "/api/common/captcha", method = RequestMethod.GET)
	public void captcha(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ServletOutputStream out = response.getOutputStream();
		try {
			ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
			String captchaId = request.getSession().getId();
			log.debug("captcha sessionID:{}", captchaId);
			BufferedImage challenge = imageCaptchaService.getImageChallengeForID(captchaId, request.getLocale());

			response.setHeader("Cache-Control", "no-store");
			response.setHeader("Pragma", "no-cache");
			response.setDateHeader("Expires", 0L);
			response.setContentType("image/jpeg");

			ImageIO.write(challenge, "jpeg", jpegOutputStream);
			byte[] captchaChallengeAsJpeg = jpegOutputStream.toByteArray();
			out.write(captchaChallengeAsJpeg);
			out.flush();
		} catch (CaptchaServiceException e) {
			log.error("获取图形验证码失败！");
		} finally {
			out.close();
		}
	}*/
}
