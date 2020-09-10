package com.book;

import com.ems.common.util.*;


import com.ems.common.dbcp.DBManager;
import com.ems.common.dbcp.DataSource;

import java.util.*;
import java.sql.*;

import javax.servlet.ServletRequest;
import javax.servlet.ServletContext;;

/**
 * _기본설정 화면 처리
 * @author fox97
 *
 */

public class BOOKCOMMON {

	ServletRequest request = null;	
	
	static HashMap<String, String> map1 = new HashMap();
	EmsHashtable userinfo=null;
	int sessionHashCode;
	
	DBManager dbm = null;
	
	
	

	public BOOKCOMMON(ServletContext application,ServletRequest request, EmsHashtable userinfo, int sessionHashCode) {
		this.request = request;
		this.userinfo = userinfo;
		this.sessionHashCode=sessionHashCode;
		
		
		DataSource ds = (DataSource)application.getAttribute("jdbc/mysql_book");

		dbm = new DBManager(ds);
		
		
	    String event = request.getParameter("event");
	    if (event == null) {
	        event = "find";
	    }
	    
	    
	    
	    if(event.equals("find")){
	    	list();
	    }else if(event.equals("modify")){
	    	modify();
	    	list();
	    }
	    
	}

	public void list() {

		/*
		 * 종료일자가 저녁12시가 넘었을때 계산안되는문제
		 */

		String LOGINID = userinfo.getString("LOGINID");
				

		try {
			
			String sql = QueryXMLParser.getQuery(this.getClass(), "common.xml", "list_sql");
			
			
			System.out.println("sql "+sql);
				
			EmsHashtable[] hash = 
				dbm.selectMultipleRecord(sql,new String[] {  LOGINID });
														
			request.setAttribute("hash", hash);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	
	public void modify() {

				
		String[] CD_MEANING = request.getParameterValues("CD_MEANING"); // 카드ID
		String[] CD_GROUP_ID = request.getParameterValues("CD_GROUP_ID"); // 카드ID
	
		String LOGINID = userinfo.getString("LOGINID");
		
		Connection con  = null;

		try {
			
			con  = dbm.getConnection();
			
			for (int i = 0; i < CD_GROUP_ID.length; i++) {
				dbm.insert(con , QueryXMLParser.getQuery(this.getClass(), "common.xml", "update_sql")
						,new String[] { CD_MEANING[i],CD_GROUP_ID[i], LOGINID });
				
			}
						
			dbm.commitChange(con);
																	
		} catch (Exception e) {
			e.printStackTrace();
			dbm.rollbackChange(con);
		}finally{
			
			request.setAttribute("msg","수정 되었습니다.");
			
		}

	}
	

}
