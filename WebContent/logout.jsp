<%@ page contentType='text/html; charset=UTF-8'%>
<%@ page import="com.ems.common.util.*"%>
<%@ page import="com.ems.common.dbcp.DBManager"%>
<%@ page import="com.ems.common.dbcp.DataSource"%>



<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>



<%

String ContextPath = request.getContextPath();

EmsHashtable userinfo = session.getAttribute("userinfo")!=null?	(EmsHashtable) session.getAttribute("userinfo")	:null;

String LOGINID = userinfo.getString("LOGINID");


log("LOGINID : "+LOGINID);

/**
로그아웃시 아이디가  TEST 인경우 공통정보를 삭제한다.
**/
if(LOGINID.startsWith("TEST")){
	
	DBManager dbm = new DBManager((DataSource)application.getAttribute("jdbc/mysql_book"));	

	Connection con = dbm.getConnection();
			
	dbm.delete(con,"delete from book_code where CD_ID=?"
			,new String[]{LOGINID});
	
	dbm.commitChange(con);
	
}


session.invalidate();


%>

<script>
document.location.href='<%=ContextPath%>/login.jsp';
</script>
