package com.ems.common.schedule;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.Date;

import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;


import com.ems.common.dbcp.DataSource;


public class CronTriggerTest {
	
	Scheduler sched =null;
	String name;
	String group;
	
	public CronTriggerTest(String name){
		this.name=name;
		this.group = name+"Group";
	}
	
	public void run() throws Exception {
        org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(CronTriggerTest.class);

        log.info("------- Initializing -------------------");

        // First we must get a reference to a scheduler
        SchedulerFactory sf = new StdSchedulerFactory();
        
        
        sched = sf.getScheduler();
        
       
        log.info("------- Initialization Complete --------");

        log.info("------- Scheduling Jobs ----------------");

        // jobs can be scheduled before sched.start() has been called

        // job 1 will run every 20 seconds
        JobDetail job = newJob(MailSenderJob.class)
            .withIdentity("MailSenderJob", group)
            .build();
        
        CronTrigger trigger = newTrigger()
            .withIdentity("trigger1", group)
            //.withSchedule(cronSchedule("* 0/60 * * * ?"))	//초 분 시 일 월 년	(60분마다)
            
            .withSchedule(cronSchedule("0 0 10,19 * * ?"))	//초 분 시 일 월 년	

            
            .build();

        Date ft = sched.scheduleJob(job, trigger);
        log.info(job.getKey() + " has been scheduled to run at: " + ft
                + " and repeat based on expression: "
                + trigger.getCronExpression());
        
        
        log.info("------- Starting Scheduler ----------------");

        // All of the jobs have been added to the scheduler, but none of the
        // jobs
        // will run until the scheduler has been started
        sched.start();

        log.info("------- Started Scheduler -----------------");
        
        
	}
	
	public void stop()
	{
			try{
				sched.shutdown(true);		
			}catch(Exception e){
				e.printStackTrace();
			}
		
		
	}
	
    public static void main(String[] args) throws Exception {

    	CronTriggerTest example = new CronTriggerTest("group1");
        example.run();
    }	

}
