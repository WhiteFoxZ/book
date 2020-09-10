
<%@ page contentType="text/html;charset=UTF-8"%>

<%@ page import="com.ems.common.util.*"%>
<%@ page import="com.ems.common.dbcp.DBManager"%>
<%@page import="com.ems.common.dbcp.DataSource"%>


<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>


<%


int sessionHashCode = session.getId().hashCode();

String remoteIp = request.getRemoteAddr();
String ContextPath = request.getContextPath();

String id = request.getParameter("id"); 	
String pw = request.getParameter("pw"); 	
String remember = request.getParameter("remember"); 



DBManager dbm = new DBManager((DataSource)application.getAttribute("jdbc/mysql_book"));	

Connection con = dbm.getConnection();
EmsHashtable[] hash = dbm.selectMultipleRecord("select /*+ rule */ * from book_user where LOGINID=UPPER(?)",
		new String[] { id });


String LOGINID="";
String STATUS="";
String LOGINPW="";

try{
	
	

if(hash!=null && hash.length>0){
	STATUS = hash[0].getString("STATUS");		
	LOGINPW = hash[0].getString("LOGINPW");		
	LOGINID = hash[0].getString("LOGINID");	
	
	//login id 가 TEST 인경우엔 세션id를 더한다.
	
	if(LOGINPW.equals(pw) && STATUS.equals("1") ){

		
		if(LOGINID.equals("TEST")){
			LOGINID = LOGINID+"_"+sessionHashCode;		
			hash[0].put("LOGINID",LOGINID);
												
			//세션마다 테스트용 공통정보를 만든다. 
			dbm.insert(con,"INSERT INTO book_code (CD_GROUP_ID, CD_GROUP_NM,CD_ID,CD_MEANING) SELECT CD_GROUP_ID, CD_GROUP_NM,?, CD_MEANING FROM book_code where CD_ID='TEST'"
					,new String[]{LOGINID});
			
			dbm.commitChange(con);
				
		}
			
		session.setAttribute("userinfo",hash[0]);	
		
		Cookie cookie1 = new Cookie("LOGINID",LOGINID);
		Cookie cookie2 = new Cookie("LOGINPW",LOGINPW);
		
		
		
		
		if(remember!=null){
					
			cookie1.setMaxAge(60*60*24*1);			//3600 1시간
			cookie2.setMaxAge(60*60*24*1);			//3600 1시간
			response.addCookie(cookie1);
			response.addCookie(cookie2);
		}else{
			
			cookie1.setMaxAge(0);
			cookie2.setMaxAge(0);
			response.addCookie(cookie1);
			response.addCookie(cookie2);
		}
		
		
	}
	
}


}catch(Exception e){
	e.printStackTrace();
	
	dbm.rollbackChange(con);
}


/**
패스워드가 맞으면 상태를 체크한다.
**/
%>

<html>
    <head>
        <title>로그아웃</title>
        <link rel="stylesheet" href="./css/pub.css" type="text/css"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">        

<SCRIPT language=javascript> 


function init(){
	

<%
if(LOGINPW.equals("")){
%>
alert('아이디가 없습니다. 관리자에게 문의하세요');
document.location.href='<%=ContextPath%>/login.jsp';
return false;
<%}
%>


<%
if(!LOGINPW.equals(pw)){
%>
alert('비밀번호가 틀립니다.');
document.location.href='<%=ContextPath%>/login.jsp';
return false;
<%}
%>



<%
if(!STATUS.equals("1")){
%>
alert('만료상태입니다. 관리자에게 문의하세요.');
document.location.href='<%=ContextPath%>/login.jsp';
//document.location.href='http://localhost:8888/<%=ContextPath%>/login.jsp';
return false;
<%
}
%>


document.location.href='<%=ContextPath%>/book_list.jsp';

}

</SCRIPT> 
<body onload="init()">
</body>      
