package com.ems.common.schedule;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;


import com.ems.common.dbcp.DBCPManager;
import com.ems.common.dbcp.DBManager;
import com.ems.common.dbcp.DataSource;
import com.ems.common.smtp.GMailSender;
import com.ems.common.util.EmsHashtable;
import com.ems.common.util.QueryXMLParser;

public class MailSenderJob implements Job {
	
	private static org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(MailSenderJob.class);
	
	private DataSource ds=null;
	private DBManager dbm=null;
	

	
    /**
     * Quartz requires a public empty constructor so that the
     * scheduler can instantiate the class whenever it needs.
     */
    public MailSenderJob() {
    	
    	DBCPManager dbcp = DBCPManager.getInstance("mysql.db.properties");
    	
    	ds = dbcp.getDatasource();
    	
    	dbm = new DBManager(ds);
    	    	    	
    }

    /**
     * <p>
     * Called by the <code>{@link org.quartz.Scheduler}</code> when a
     * <code>{@link org.quartz.Trigger}</code> fires that is associated with
     * the <code>Job</code>.
     * </p>
     * 
     * @throws JobExecutionException
     *             if there is an exception while executing the job.
     */
    public void execute(JobExecutionContext context)
        throws JobExecutionException { 
    	
    	log.info("**************** execute *****************");
    	    	
    	EmsHashtable[] admin = dbm.selectMultipleRecord("SELECT USERNAME, TEL1, TEL2, LOGINID, LOGINPW, ACCESSPW, EMAIL  FROM user_info where status='1' "
    			, new String[]{});
    	    	    	
    	for (int i = 0; i < admin.length; i++) {
    		    		    	
    		sendMail(admin[i].getString("LOGINID"), admin[i].getString("EMAIL"));
			
		}

        // This job simply prints out its job name and the
        // date and time that it is running
        JobKey jobKey = context.getJobDetail().getKey();
        log.info("MailSendJob says: " + jobKey + " executing at " + new Date());
    }
    
    private void sendMail(String loginid, String tomail){
    	try{
    		
    		log.info("5초후 송신");
    		
    		Thread.sleep(1000*5);
    		
    		  String sql = QueryXMLParser.getQuery(this.getClass(), "MailSenderJob.xml", "list_sql");
    		  
	    	
        	EmsHashtable[] hash = dbm.selectMultipleRecord(sql
        			, new String[]{loginid});
        	        	 
        	if(hash!=null && hash.length>0){
            	StringBuffer sb = new StringBuffer("예약등록후 24 시간 지난 입금하지 않는 고객정보 입니다.<BR>");   	

            	GMailSender mail=new GMailSender();
            	
            	for(int i=0; i<hash.length; i++){
            		
            		sb.append(hash[i].getString("USER_NAME")).append("&nbsp;").append(hash[i].getString("USER_TEL1")).append("&nbsp;").append(hash[i].getString("GROUP_KEY")).append(" 데크<BR>");
            		
            	}
            	
    	    	mail.mailSender("입금하지 않은 고객", tomail, sb.toString());
    	    	log.info(sb.toString());		
    	    	sb.setLength(0);
        	}
        	
        	
    	}catch(Exception e){
    		log.info(e.toString());		
    	}
    	
		     	
    }
    
}
