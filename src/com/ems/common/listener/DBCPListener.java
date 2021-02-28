package com.ems.common.listener;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.ems.common.dbcp.DBCPManager;
import com.ems.common.dbcp.DataSource;


public class DBCPListener implements ServletContextListener {
	private ServletContext context = null;
	private org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(this.getClass());

	DBCPManager dbcp = null;

	public void contextInitialized(ServletContextEvent event) {
		context = event.getServletContext();


		Properties pr =  System.getProperties();

		String osName = pr.getProperty("os.name");

		log.debug("OS Name : " + pr.getProperty("os.name"));


			String file = null;

			if(osName.equals("Windows 10")) {
				file = "mysql.db.properties";
			}else {
				file = "mysql.db2.properties";	//가동계
			}

			dbcp = DBCPManager.getInstance(file);

			com.ems.common.dbcp.DataSource ds = dbcp.getDatasource();

			log.info("최초생성 " + ds.toString());

			context.setAttribute(dbcp.getDataSourceName(), ds);



	}

	public void contextDestroyed(ServletContextEvent event) {
		context = event.getServletContext();

		try {

			com.ems.common.dbcp.DataSource ds = (DataSource) context.getAttribute(dbcp.getDataSourceName());

			if (ds != null) {

				log.info("종료전 " + ds.toString());

				ds.close();

				log.info("종료후 " + ds.toString());
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {

		}
	}

}
