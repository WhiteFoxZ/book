<!DOCTYPE html>

<%@ page  pageEncoding="UTF-8"%>
    
<%@ include file="include.jsp" %>

<%

Cookie cookies[] = request.getCookies();
String cookieName=null;
String id="";
String pw="";

if(cookies!=null && cookies.length>0){
for(int i=0; i<cookies.length; i++){
	
	cookieName = cookies[i].getName();
	
	if(cookieName.equals("LOGINID")){
		id = cookies[i].getValue();
	}
	
	if(cookieName.equals("LOGINPW")){
		pw = cookies[i].getValue();
	}
	
}
}


%>

<html>
<head>
<title>만화방로그인</title>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="https://www.freepik.com/favicon.ico">	
	<link rel="stylesheet" href="css/login.css" />
<style>


</style>
<SCRIPT >


onlyOneHit = false
function nextSubmit() { 
	setTimeout("onlyOneHit = false", 5000); 
}


//연속클릭방지
function checkDoubleClick(){
	
	console.log(' onSubmit ');
	
	if( !onlyOneHit ) { 
		console.log(' you are double click');
		onlyOneHit = true
		nextSubmit();
		return true;
	}
	return false
	
}



    function sendData()
    {
    	    	
     var f = document.frmMain;
     if(f.id.value == "")
     {
      window.alert("ID를 반드시 입력해야 합니다.");
      f.id.focus();
      return false;
     }
     if(f.id.value.length < 4 || f.id.value.length > 10)
     {
      window.alert("ID는 4자 이상 10자 이하 입니다.");
      f.id.select();
      return false;
     }

     if(f.pw.value == "")
     {
      window.alert("비밀번호를 반드시 입력해야 합니다.");
      f.pw.focus();
      return false;
     }

     if(f.pw.value.length < 4 || f.pw.value.length > 10)
     {
      window.alert("비밀번호를 4자 이상 10자 이하 입니다.");
      f.pw.select();
      return false;
     }
     
     f.submit();
    }
  </SCRIPT>
  
</head>

<body class="freepik bg-login logofreepik" onload="document.frmMain.id.focus();">

<div id="logo" class="logo-centered flaticon-freepik" ><span><span>camp82go</span>icon</span></div>

<section id="gr_loginbox" class="gr_box login nolo_anime" style="display: block;">
<div class="box">

<h1 class="no-margin"></h1>

<p class="separator"><span>다함께만화방</span></p>

<form name="frmMain" method=post action="loginAction.jsp" onSubmit="return checkDoubleClick()" target="_self">
<span >
				<label for="gr_login_username">ID</label>
				<input type="text" name="id" id="gr_login_username" value="<%=id %>" tabindex="1" autofocus />
				
				
			</span>
			
<span >
				<label for="gr_login_password">Password</label>
				<input type="password" name="pw" id="gr_login_password" value="<%=pw %>" tabindex="2"  />
				
			</span>
			
<span >
				<label for="gr_login_rememberme" class="text">Keep me signed in</label>
				<input type="checkbox" name="remember" id="gr_login_rememberme"  <%=pw.equals("")?"":"checked" %> />
				<label for="gr_login_rememberme" class="fake-checkbox"></label>
			</span>			
						
	<button class="btn fullwidth spinner_button" id="signin_button" tabindex="3" onclick="sendData();">Login</button>
</form>
	
</div>
</section>
	
</body>

</html>
