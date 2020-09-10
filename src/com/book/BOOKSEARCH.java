package com.book;

import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;

import com.ems.common.dbcp.DBManager;
import com.ems.common.dbcp.DataSource;
import com.ems.common.util.EmsHashtable;
import com.ems.common.util.QueryXMLParser;

public class BOOKSEARCH {

	ServletRequest request = null;
	static HashMap<String, String> map1 = new HashMap<String, String>();
	EmsHashtable userinfo=null;
	DBManager dbm=null;
		
	

	public BOOKSEARCH(ServletContext application,ServletRequest request, EmsHashtable userinfo ) {
		this.request = request;
		this.userinfo = userinfo;
		DataSource ds = (DataSource)application.getAttribute("jdbc/mysql_book");
		dbm = new DBManager(ds);
			
		list();

	}

	public void list() {

		/*
		 * 종료일자가 저녁12시가 넘었을때 계산안되는문제
		 */

		String P_SDATE = request.getParameter("P_SDATE"); // 카드ID		
		String P_EDATE = request.getParameter("P_EDATE"); // 카드ID
		
		System.out.print("P_SDATE   "+P_SDATE);
		System.out.print("P_EDATE   "+P_EDATE);
		
	
		String LOGINID = userinfo.getString("LOGINID");

		try {		
 
			EmsHashtable[] hash = 
				dbm.selectMultipleRecord(QueryXMLParser.getQuery(this.getClass(), "book.xml", "query6"),new String[] { P_SDATE,P_EDATE, LOGINID });
														
			request.setAttribute("hash", hash);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
