package com.ems.common.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.ems.common.schedule.CronTriggerTest;

public class JOBListener implements ServletContextListener {
    private ServletContext context = null;
    private org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger( this.getClass() );

    CronTriggerTest trigger=null;
    
    
    public void contextInitialized(ServletContextEvent event) {
        context = event.getServletContext();
        try{
        	log.info("JOBListener start 2초후 ");
        	
        	log.info("******************"+context.getContextPath());
        	
        	log.info(context.getContextPath().replaceAll("/", ""));
        	
        	
        	
        	
        	Thread.sleep(1000*2);
        	trigger = new CronTriggerTest(context.getContextPath().replaceAll("/", ""));
        	trigger.run();
        }catch(Exception e){
        	e.printStackTrace();
        }
        
                                
    }

    public void contextDestroyed(ServletContextEvent event) {
        context = event.getServletContext();                
        
        try {            
        	log.info("JOBListener 종료  ");
        	if(trigger!=null)
        	trigger.stop();        	        	

        } catch (Exception e) {
            e.printStackTrace();
        }finally{
        	
        }
    }

    
}
