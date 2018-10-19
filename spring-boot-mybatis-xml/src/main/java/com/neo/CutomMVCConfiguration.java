package com.neo;

import java.nio.charset.Charset;
import java.util.List;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;



@Configuration
public class CutomMVCConfiguration extends WebMvcConfigurerAdapter{
	@Bean
    public HttpMessageConverter<String> responseBodyConverter(){
       StringHttpMessageConverter converter = new StringHttpMessageConverter(
    		   Charset.forName("UTF-8"));

        return converter;
    }
	public void ConfigureMessageConverters(List<HttpMessageConverter<?>> converters) {
		super.configureMessageConverters(converters);
		converters.add(responseBodyConverter());
		
	}
	
	public void ConfigureContentNegotiation( ContentNegotiationConfigurer converter) {
		converter.favorPathExtension(false);
		
	}
}
