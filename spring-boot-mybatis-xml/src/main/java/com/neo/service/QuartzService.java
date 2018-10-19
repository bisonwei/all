package com.neo.service;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class QuartzService {
	private static final Logger log = LoggerFactory.getLogger(QuartzService.class);
	/**  
	 * 一个cron表达式有至少6个（也可能7个）有空格分隔的时间元素。按顺序依次为：
	1.秒（0~59）
	2.分钟（0~59）
	3.小时（0~23）
	4. 天（0~31）
	5 .月（0~11）
	6 .星期（1~7 1=SUN 或 SUN，MON，TUE，WED，THU，FRI，SAT）
	年份.（1970－2099）
	其中每个元素可以是一个值(如6),一个连续区间(9-12),一个间隔时间(8-18/4)(/表示每隔4小时),一个列表(1,3,5),通配符。由于”月份中的日期”和”星期中的日期”这两个元素互斥的,必须要对其中一个设置
	 * cron
	 * （1）0 0 2 1 * ? *   表示在每月的1日的凌晨2点调整任务
	　　（2）0 15 10 ? * MON-FRI   表示周一到周五每天上午10:15执行作业
	　　（3）0 15 10 ? 6L 2002-2006   表示2002-2006年的每个月的最后一个星期五上午10:15执行作
	　　（4）0 0 10,14,16 * * ?   每天上午10点，下午2点，4点 
	　　（5）0 0/30 9-17 * * ?   朝九晚五工作时间内每半小时 
	　　（6）0 0 12 ? * WED    表示每个星期三中午12点 
	　　（7）0 0 12 * * ?   每天中午12点触发 
	　　（8）0 15 10 ? * *    每天上午10:15触发 
	　　（9）0 15 10 * * ?     每天上午10:15触发 
	　　（10）0 15 10 * * ? *    每天上午10:15触发 
	　　（11）0 15 10 * * ? 2005    2005年的每天上午10:15触发 
	　　（12）0 * 14 * * ?     在每天下午2点到下午2:59期间的每1分钟触发 
	　　（13）0 0/5 14 * * ?    在每天下午2点到下午2:55期间的每5分钟触发 
	　　（14）0 0/5 14,18 * * ?     在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发 
	　　（15）0 0-5 14 * * ?    在每天下午2点到下午2:05期间的每1分钟触发 
	　　（16）0 10,44 14 ? 3 WED    每年三月的星期三的下午2:10和2:44触发 
	　　（17）0 15 10 ? * MON-FRI    周一至周五的上午10:15触发 
	　　（18）0 15 10 15 * ?    每月15日上午10:15触发 
	　　（19）0 15 10 L * ?    每月最后一日的上午10:15触发 
	　　（20）0 15 10 ? * 6L    每月的最后一个星期五上午10:15触发 
	　　（21）0 15 10 ? * 6L 2002-2005   2002年至2005年的每月的最后一个星期五上午10:15触发 
	　　（22）0 15 10 ? * 6#3   每月的第三个星期五上午10:15触发
	 */
	//  每分钟启动
  @Scheduled(cron = "0 * * * * ?")
  public void timerToNow(){
      System.out.println("now time:" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
  }
 //每5启动
  @Scheduled(fixedRate = 50000)
  public void timerToZZP(){
      System.out.println("ZZP:" + new Random().nextLong() + new SimpleDateFormat("HH:mm:ss").format(new Date()));
  }
  @Scheduled(fixedDelay = 60000000)
  public void timerToReportCount(){
         System.out.println("<================its"  + "count===============>" + new SimpleDateFormat("HH:mm:ss").format(new Date()));
     
  }

 // @Scheduled(initialDelay = 5000,fixedRate = 6000)
  public void timerToReport(){
      for (int i = 0; i < 10; i++){
          System.out.println("<================delay :" + i + new SimpleDateFormat("HH:mm:ss").format(new Date()) + "count===============>");
      }
  }

}