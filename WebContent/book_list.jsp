<%@ page contentType="text/html;charset=utf-8"%>

<%@ page import="com.ems.common.util.*"%>
<%@ page import="com.ems.common.dbcp.DBManager"%>
<%@ page import="com.book.*"%>

<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>




<%
//http://www.oddcast.com/home/demos/tts/tts_example.php
int sessionHashCode = session.getId().hashCode();

EmsHashtable userinfo = session.getAttribute("userinfo")!=null?	(EmsHashtable) session.getAttribute("userinfo")	:null;

if(userinfo!=null){

String remoteIp = request.getRemoteAddr();

BOOKLIST book = new BOOKLIST(application,request, userinfo);

String BOOK_SALES_ID =(String) request.getAttribute("BOOK_SALES_ID");
String CARD_ID =(String) request.getAttribute("CARD_ID");
String TO_DAY =(String) request.getAttribute("TO_DAY");

String START_TIME =(String)  request.getAttribute("START_TIME");
String END_TIME = (String) request.getAttribute("END_TIME");
String WROK_PAY = (String) request.getAttribute("WROK_PAY");
String WORK_HH = (String) request.getAttribute("WORK_HH");
String WORK_MIN = (String) request.getAttribute("WORK_MIN");
String MSG = (String) request.getAttribute("MSG");
String audio = (String) request.getAttribute("audio");

EmsHashtable[] hash  = (EmsHashtable[])request.getAttribute("hash");

String userid = userinfo!=null?userinfo.getString("LOGINID"):"";

%>

<html>
    <head>
        <title><%=userinfo.getString("USERNAME")%>
        <%if(userinfo.getString("LOGINID").startsWith("TEST")) {%>
        (<%=sessionHashCode%>)
        <%} %>
        </title>
        <link rel="stylesheet" href="./css/pub.css" type="text/css"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <Script Language="JavaScript" src="./js/common/checkValidations.js"></script>

<SCRIPT language=javascript> 

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



function Exit() {
    if (self.screenTop > 9000) {
 alert('닫힘');
        // 브라우저 닫힘
    } else {
        if(document.readyState == "complete") {
   alert('새로고침');
            // 새로고침
        } else if(document.readyState == "loading") {
   alert('이동');
            // 다른 사이트로 이동
        }
    }
}


//새로고침 방지   
// Ctrl+R, Ctrl+N, F5 키 막음

document.onkeydown = function(e){
	key = (e) ? e.keyCode : event.keyCode;

	if(key==8 || key==116){
		if(e){	//표준			
			e.preventDefault();
		}
		else{ //익스용
			event.keyCode = 0;
			event.returnValue = false;
		}
	}
}

//마우스 오른쪽 클릭으로 새로고침하는 것을 방지
document.onmousedown = function(e){
	key = (e) ? e.button : event.button;

	if(key==2 || key==3){
		if(e){	//표준			
			e.preventDefault();
		}
		else{ //익스용
			return false;
		}
	}
}




</SCRIPT> 

        <script language = "javascript">
                    
            function onkeydownP_CARD_ID(){            	            	            
            	
                if(event.keyCode==9 || event.keyCode==13){
                    onblurCardId();
                }else{                   
                    return false;
                }
            }
            
            function init(){
                var frm = document.frmMain;
                frm.P_CARD_ID.focus();                
            }
            
            function onblurCardId(){
                var frm = document.frmMain;              
              
                if(frm.P_CARD_ID.value!="" && frm.P_CARD_ID.value.length==3 ){
                
                    //숫자체크
                    if(!checkDigit(frm.P_CARD_ID.value)){
                      frm.P_CARD_ID.value="";
                      frm.P_CARD_ID.focus();
                      return false;
                    }else{
                    	
                      document.frmMain.submit();
                    }
                    
                    
                }else{
                    frm.P_CARD_ID.value="";
                    frm.P_CARD_ID.focus();
                    return false;
                }
              
            }

        </script>

  
  <script language="javascript" event="onunload" for="window">
    Exit();
</script>

   
        <style type="text/css">
            <!--
            .test1{table-layout:fixed}
            .test2{table-layout:auto}
            -->
        </style>

    </head> 

    <body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" onload="init()" onclick="init()" oncontextmenu="return false" ondragstart="return false" onselectstart="return false" >
        <form name="frmMain" method=post  action="book_list.jsp" onSubmit="return checkDoubleClick()"  target="_self">

            <input type="hidden" name="event" value="" />

            <table width="990" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" borderColorLight="#666666" border="1">
                <tr>
                    <!-- showLogo  -->
                    <td  background="./img/book_head_bg.gif" align="right"  height=80 colspan="2">&nbsp;</td>
                </tr>
                
                <tr>              
                    <td colspan="2" bgcolor="e5e5e5" > 
                        <table width="980" borderColorDark="#ffffff" cellPadding="0" borderColorLight="#666666" border="0"  align="center">
                            <tr height="25"> 
                                <td width="30%" style="padding-left:8" ><B><%=userinfo.getString("USERNAME") %></B> &gt; 일일실적                                
                                </td>
                                <td align="right" style="padding-right:8" >
                                    <a href="book_search.jsp" target="_blank" >일자별실적조회</a>|
                                    <a href="book_barcode.jsp" target="_blank" >일일권 바코드출력</a>|
                                    <a href="book_barcode1.jsp" target="_blank" >종일권 바코드출력</a>|
                                    <a href="book_barcode2.jsp" target="_blank" >간식 바코드출력</a>|
                                    <a href="book_common.jsp" target="_blank" >기본설정</a>|                                                                        
                                    <a href="logout.jsp" target="_self" >LogOut</a>      
                                                                  
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>               
                
                <tr><td colspan="2">
                    <table>
                        <tr>
                            <td style="padding-left:8" width="45%" >
                                <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="250" borderColorLight="#666666" border="1">                            
                                    <TR >                                                        
                                        <TD class="tbldb" height="25" >카드번호</TD>                                                        
                                        <TD ><input type="text" name="P_CARD_ID"  size="10" class="adf1" onkeydown="onkeydownP_CARD_ID();"  maxlength="3"  /> </TD>                                                                                                              
                                    </TR>
                                </TABLE>
                            </td>
                            
                            <td style="padding-left:25">
                                <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="250" borderColorLight="#666666" border="1">                            
                                    <TR >                                                        
                                        <TD class="tbldb" height="25" >총인원</TD>                                                        
                                        <TD ><input type="text" name="TOTAL"  size="5" class="adf1"  maxlength="3" value="<%=hash.length>0? hash.length-1:0%>" /></TD>                                                                    
                                </TABLE>
                            </td>
        
                        </tr>
                        </TR>
                </td>
                </tr>

                <tr>
                    <td height="18" colspan="2">&nbsp;</td>
                </tr>

                <tr>
                    <td style="padding-left:8" valign="top" >
                        <TABLE  cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="100%" borderColorLight="#666666" border="0">
                            <TBODY>

                                <TR height="18">
                                    <TD>                                        
                                        <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="350" borderColorLight="#666666" border="1">
                                            <TBODY>

                                                <TR height="25" >                                                        
                                                    <TD class="tbldb" width="30%">일자</TD>                                                        
                                                    <TD class="tbllw" width="70%"  colspan="2" ><%=TO_DAY%><input type="hidden" name="TO_DAY" value="" size="10" class="adf1" /> </TD>                                                        
                                                </TR>

                                                <TR height="25" >                                                        
                                                    <TD class="tbldb" >카드번호</TD>                                                        
                                                    <TD class="tbllw"  colspan="2"><input type="text" name="CARD_ID" value="<%=CARD_ID%>" size="10" class="adf1" readonly  /> </TD>                                                        
                                                </TR>

                                                <TR height="25" >                                                        
                                                    <TD class="tbldb" >시작시간</TD>                                                        
                                                    <TD class="tbllw"  colspan="2"><input type="text" name="START_TIME" value="<%=START_TIME%>" size="20" class="adf1" readonly /> </TD>                                                        
                                                </TR>
                                                
                                                <TR height="25" >                                                    
                                                    <TD class="tbldb" >종료시간</TD>                                                        
                                                    <TD class="tbllw"  colspan="2"><input type="text" name="END_TIME" value="<%=END_TIME%>" size="20" class="adf1" readonly /> </TD>                                                        
                                                </TR>

                                                <TR height="25" >                                                    
                                                    <TD class="tbldb" >총사용시간</TD>                                                        
                                                    <TD class="tbllw" >
                                                        <input type="text" name="WORK_HH" value="<%=WORK_HH%>" size="5" class="adf1" readonly />시간
                                                    </TD>
                                                    <TD class="tbllw">
                                                        <input type="text" name="WORK_MIN" value="<%=WORK_MIN%>" size="5" class="adf1" readonly />분
                                                    </TD>                                                        
                                                </TR>
                                                                                                
                                                <TR height="25" >                                                    
                                                    <TD class="tbldb" >지불비용</TD>                                                        
                                                    <TD class="tbllw"  colspan="2"><input type="text" name="WROK_PAY" value="<%=WROK_PAY%>" size="10" class="adf1" readonly /> </TD>                                                        
                                                </TR>

                                                <TR height="200" >                                                                                                            
                                                    <TD class="tblcw"  colspan="3"><font size="6" color="red" >지불비용 :<%=WROK_PAY%> 원<BR>                                                   
                                                    
                                                    <b><%=MSG%></b>&nbsp;</font>
                                                    <%if(!audio.equals("")){%>
                                                    <embed src="./mp3/<%=audio%>" hidden=true autostart=true loop=false width=0 height=0></embed>
                                                    <%}%>
                                                </TD>                                                        
                                                </TR>
                                                
                                                 <TR height="25" >                                                                                                            
                                                    <TD class="tbllw"  colspan="3"><b>001~099 -> 일반손님</b></TD>                                                        
                                                </TR>
                                                 <TR height="25"  >                                                                                                            
                                                    <TD class="tbllw"  colspan="3"><b>100~199 -> 종일권</b></TD>                                                        
                                                </TR>
                                                 <TR height="25"  >                                                                                                            
                                                    <TD class="tbllw"  colspan="3"><b>200~223 -> 과자</b></TD>                                                        
                                                </TR>
                                                

                                            </TBODY>
                                        </TABLE>                                        
                                    </TD>
                                </TR>
                            </TBODY>
                        </TABLE>

                    </td>


                    <td style="padding-left:25" >
                        <TABLE  cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="100%" borderColorLight="#666666" border="0">
                            <TBODY >

                                <tr>
                                    <TD >
                                        <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="510" borderColorLight="#666666" border="1">
                                            <TR class="tbldb" height="25">
                                                <TD width="50" >순번</TD>                                                
                                                <TD width="50">CARD</TD>
                                                <TD width="100">시작시간</TD>
                                                <TD width="100">종료시간</TD>
                                                <TD width="70">시간</TD>
                                                <TD width="70">분</TD>
                                                <TD width="70">금액</TD>
                                            </TR>
                                        </TABLE>
                                    </TD>
                                </tr>

                                <TR height="18">
                                    <TD>
                                        <div style="position:relative; overflow-y:auto; width:550px; height:500;top:0; left:0;">
                                            <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="430" borderColorLight="#666666" border="1">
                                                <%
                                                    String trclass="";
                                                    String tdclass1="";
                                                    int intCardId=0;
                                                    
                                                    for (int i = 0; i <hash.length ; i++) 
                                                    {
                                                    
                                                    if(i%2>0) trclass="tblcw";
                                                    else trclass="tblcg"; 
                                                    
                                                    if(i%2>0) tdclass1="tblrw";
                                                    else tdclass1="tblrg";
                                                    
                                                    if(!hash[i].getString("CARD_ID").equals(""))
                                                    intCardId = Integer.parseInt( hash[i].getString("CARD_ID") );
                                                    else intCardId=0;
                                                    
                                                    
                                                    if(intCardId >= 200){ //과자면
                                                    %>
                                               <TR class="<%=trclass%>" height="25">
                                                    <TD width="50"><%=hash[i].getString("BOOK_SALES_ID").equals("SUM")?"합계":String.valueOf(i)%></TD>                                                    
                                                    <TD width="50"><%=hash[i].getString("CARD_ID") %>&nbsp;</TD>
                                                    <TD width="100"><%=hash[i].getString("START_TIME") %>&nbsp;</TD>
                                                    <TD width="100"><%=hash[i].getString("START_TIME") %>&nbsp;</TD>                                                                                                        
                                                    <TD width="140" colspan="2" > <B>과 자, 음료수, 라면</B> &nbsp;</TD>                                                                                        
                                                    <TD width="70" class="<%=tdclass1%>"><%=hash[i].getString("WROK_PAY") %>&nbsp;</TD>
                                                </TR>
                                                    <%
                                                    }else{
                                                    %>
                                                <TR class="<%=trclass%>" height="25">
                                                    <TD width="50"><%=hash[i].getString("BOOK_SALES_ID").equals("SUM")?"합계":""+i%></TD>                                                    
                                                    <TD width="50"><%=hash[i].getString("CARD_ID") %>&nbsp;</TD>
                                                    <TD width="100" TITLE="<%=hash[i].getString("START_DAY") %>" ><%=hash[i].getString("START_TIME") %>&nbsp;</TD>                                                    
                                                    <TD width="100" TITLE="<%=hash[i].getString("END_DAY") %>" ><%=hash[i].getString("END_TIME") %>&nbsp;</TD>
                                                    <TD width="70"><%=hash[i].getString("WORK_HH") %>&nbsp;</TD>
                                                    <TD width="70"><%=hash[i].getString("WORK_MIN") %>&nbsp;</TD>                                                    
                                                    <TD width="70" class="<%=tdclass1%>"><%=hash[i].getString("WROK_PAY") %>&nbsp;</TD>
                                                </TR>
                                                    <%
                                                    }                                                    
                                                %>
                                                
                                                

                                           

                                                <%                                                    
                                                }
                                                
                                                %>

                                            </TABLE>
                                        </div>
                                    </TD>
                                </TR>
                            </TBODY>
                        </TABLE>

                    </td>

                </tr>

            </table>
	           	</td>
	           	</tr>
           	</table>                        
        </form>        
    </body>
</html>

<%}else{%>

<jsp:include page="userinfo.jsp" flush="true"/>

<%} %>
