<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.ems.common.util.*"%>
<%@ page import="com.ems.common.dbcp.DBManager"%>

<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.book.*"%>

<%

EmsHashtable userinfo = session.getAttribute("userinfo")!=null?	(EmsHashtable) session.getAttribute("userinfo")	:null;

String USERNAME = userinfo.getString("USERNAME");


if(userinfo!=null){

    StringBuffer serverURL = new StringBuffer("http://").append(request.getServerName()).append(":").append(request.getServerPort()).append("/").append(request.getContextPath());

            
    String TO_DAY = EmsDateUtil.getCurrentDate("yyyy-MM-dd");
    
    String P_SDATE = request.getParameter("P_SDATE");
    String P_EDATE = request.getParameter("P_EDATE");
    

    if (P_SDATE == null) {
        P_SDATE = TO_DAY;
    }
    if (P_EDATE == null) {
        P_EDATE = TO_DAY;
    }
    

    String event = request.getParameter("event");
    if (event == null) {
        event = "find";
    }

    if (event.equals("excel")) {        
        response.setContentType("application/vnd.ms-excel;charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=BOOK_" + TO_DAY + ".xls");
        response.setHeader("Content-Description", "JSP Generated Data");
    } else {
        response.setContentType("text/html;charset=UTF-8");

    }    

    int sessionHashCode = session.getId().hashCode();
    
    BOOKSEARCH book = new BOOKSEARCH(application,request, userinfo);

    
    EmsHashtable[] hash  = (EmsHashtable[])request.getAttribute("hash");


   
%>

<!DOCTYPE html> 

      
       <%
       String serverUrl = request.getRequestURL().toString();
       serverUrl = serverUrl.substring(0,serverUrl.lastIndexOf("/"));
       
       %>
       
      
<%  if (!event.equals("excel")) { %>
<html>  
    <head>
        <title><%=USERNAME %>
        <%if(userinfo.getString("LOGINID").startsWith("TEST")) {%>
        (<%=sessionHashCode%>)
        <%} %>
        </title>
        
        <link rel="stylesheet" href="./css/pub.css" type="text/css"> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        

        <SCRIPT language=javascript>             
            function setEvent(event){
                document.frmMain.event.value=event;
                document.frmMain.submit();
                
            }            
        </script>



 <style type="text/css">       
.test1 {table-layout:fixed}
.test2 {table-layout:auto}            
 </style>

<link type="text/css" href="jquery/css/ui.all.css" rel="stylesheet" />
<script type="text/javascript" src="jquery/js/jquery-1.3.2.js"></script>
<script type="text/javascript" src="jquery/js/ui.core.js"></script>
<script type="text/javascript" src="jquery/js/ui.datepicker.js"></script>
<script type="text/javascript">
$(function() {
	$.datepicker.setDefaults({
	    monthNames: ['년 1월','년 2월','년 3월','년 4월','년 5월','년 6월','년 7월','년 8월','년 9월','년 10월','년 11월','년 12월'],
	    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	    showMonthAfterYear:true,
	    dateFormat: 'yy-mm-dd',
	    showOn: 'both',
	    buttonImage: 'jquery/ic_03.gif',
	    buttonImageOnly: true
	    
	});
	$("#P_SDATE").datepicker({
	    buttonText: '시작일',
	    showButtonPanel:true
	    
	    
	});
	$("#P_EDATE").datepicker({
	    buttonText: '종료일',
	    showButtonPanel:true
	});
});
function commonWork() {
	var stdt = document.getElementById("P_SDATE");
	var endt = document.getElementById("P_EDATE");

	if(endt.value != '' && stdt.value > endt.value) {
		alert("종료일이 시작일보다 빠릅니다.\n\n다시 입력해 주십시오.");
		stdt.value = "";
		endt.value = "";
		stdt.focus();
	}
}
</script>
<style type="text/css">
	.ui-datepicker-trigger {		
		vertical-align: middle;
		cursor: pointer;
		border-width:1px; background-color:#E9F3FE; border-color:#404040;font:12px;text-align: left; padding-left:2px;
		
	}
</style>

    </head> 

    <body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0"  >
        <form name="frmMain" method=post  action="" target="_self">

            <input type="hidden" name="event" value="" />
            
            
<div class="workspace">
            <table width="990" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" borderColorLight="#666666" border="1" class="hdtlt">
                <tr>
                    <!-- showLogo  -->
                    <td  background="./img/book_head_bg.gif" align="right"  height=80 >&nbsp;</td>
                </tr>

                <tr>              
                    <td  bgcolor="e5e5e5" > 
                        <table width="980" borderColorDark="#ffffff" cellPadding="0" borderColorLight="#666666" border="0"  align="center">
                            <tr height="25"> 
                                <td width="50%" style="padding-left:5" > <b><%=USERNAME %></b> &gt;일자별실적조회                               
                                </td>
                                <td align="right" style="padding-right:8" >&nbsp;
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>               

                <tr>                
                    <td >

                        <TABLE  cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="900" borderColorLight="#666666" border="0" class="hdtlt">
                            <tr>
                                <td width="70%" style="padding-left:10"  >
                                기간 :
                              <input type="text" id="P_SDATE" name="P_SDATE" value="<%=P_SDATE %>" size="12" class="ui-datepicker-trigger" onchange="commonWork()" readonly="readonly"/>
								~
								<input type="text" id="P_EDATE" name="P_EDATE" value="<%=P_EDATE %>" size="12" class="ui-datepicker-trigger"  onchange="commonWork()" readonly="readonly"/>
                                
                    </td>
                    <td width="30%" align="right"  >
                    <span id="actionBtns" class="func">
                    <a class="btn"  onClick="javascript : return setEvent('find');" ><span> <span class="search">조회</span></span></a>                    
                    <a class="btn"  onClick="javascript : return setEvent('excel');"  ><span><span class="export">엑셀</span></span></a>
                    <a class="btn"  onClick="javascript : return closeWindow();" ><span><span class="close">닫기</span></span></a>
                    </span>                        
                    </td>
                </tr>
            </table>


        </td>
    </tr>


			    <tr>
			
			        <td style="padding-left:10" >
			            <TABLE  cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="100%" borderColorLight="#666666" border="0">
			                <TBODY >
			
			                    <tr>
			                        <TD >
			                            <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="900" borderColorLight="#666666" border="1">
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
			                        <div style="position:relative; overflow-y:auto; width:915px; height:560;top:0; left:0;">
			                           <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="900" borderColorLight="#666666" border="1">
			                            <%
			                                String trclass="";
			                                String tdclass1="";
			                                int intCardId=0;
			                                
			                                if(hash!=null){
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
                                                    <TD width="50"><%=hash[i].getString("BOOK_SALES_ID").equals("SUM")?"합계":""+i%></TD>                                                    
                                                    <TD width="50"><%=hash[i].getString("CARD_ID") %>&nbsp;</TD>
                                                    <TD width="100"><%=hash[i].getString("START_DAY") %>&nbsp;<%=hash[i].getString("START_TIME") %>&nbsp;</TD>
                                                    <TD width="100">&nbsp;</TD>                                                                                                        
                                                    <TD width="140" colspan="2" > <B>과 자, 음료수, 라면</B> &nbsp;</TD>                                                                                        
                                                    <TD width="70" class="<%=tdclass1%>"><%=hash[i].getString("WROK_PAY") %>&nbsp;</TD>
                                                </TR>
                                                    <%
                                                    }else{
                                                    %>
                                                <TR class="<%=trclass%>" height="25">
                                                    <TD width="50"><%=hash[i].getString("BOOK_SALES_ID").equals("SUM")?"합계":""+i%></TD>                                                    
                                                    <TD width="50"><%=hash[i].getString("CARD_ID") %>&nbsp;</TD>
                                                    <TD width="100" TITLE="<%=hash[i].getString("START_DAY") %>" ><%=hash[i].getString("START_DAY") %>&nbsp;<%=hash[i].getString("START_TIME") %>&nbsp;</TD>                                                    
                                                    <TD width="100" TITLE="<%=hash[i].getString("END_DAY") %>" ><%=hash[i].getString("END_DAY") %>&nbsp;<%=hash[i].getString("END_TIME") %>&nbsp;</TD>
                                                    <TD width="70"><%=hash[i].getString("WORK_HH") %>&nbsp;</TD>
                                                    <TD width="70"><%=hash[i].getString("WORK_MIN") %>&nbsp;</TD>                                                    
                                                    <TD width="70" class="<%=tdclass1%>"><%=hash[i].getString("WROK_PAY") %>&nbsp;</TD>
                                            	</TR>
			                                <%
			                                		}                                                    
			                                                                     
			                            	}	//for
			                                
			                                }	//if(hash!=null){
			                            
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
</div>       
</form>        
</body>
</html>


<%} else {%>


<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">

<link rel="stylesheet" href="<%=serverUrl %>/css/pub.css" type="text/css">

<TABLE  cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="100%" borderColorLight="#666666" border="0">
			                <TBODY >
			
			                    <tr>
			                        <TD >
			                            <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="900" borderColorLight="#666666" border="1">
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
			                        <div style="position:relative; overflow-y:auto; width:915px; height:560;top:0; left:0;">
			                           <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="900" borderColorLight="#666666" border="1">
			                            <%
			                                String trclass="";
			                                String tdclass1="";
			                                int intCardId=0;
			                                
			                                if(hash!=null){
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
		                                                    <TD width="50"><%=hash[i].getString("BOOK_SALES_ID").equals("SUM")?"합계":""+i%></TD>                                                    
		                                                    <TD width="50"><%=hash[i].getString("CARD_ID") %>&nbsp;</TD>
		                                                    <TD width="100"><%=hash[i].getString("START_DAY") %>&nbsp;<%=hash[i].getString("START_TIME") %>&nbsp;</TD>
		                                                    <TD width="100">&nbsp;</TD>                                                                                                        
		                                                    <TD width="140" colspan="2" > <B>과 자, 음료수, 라면</B> &nbsp;</TD>                                                                                        
		                                                    <TD width="70" class="<%=tdclass1%>"><%=hash[i].getString("WROK_PAY") %>&nbsp;</TD>
		                                                </TR>
		                                                    <%
		                                                    }else{
		                                                    %>
		                                                <TR class="<%=trclass%>" height="25">
		                                                    <TD width="50"><%=hash[i].getString("BOOK_SALES_ID").equals("SUM")?"합계":""+i%></TD>                                                    
		                                                    <TD width="50"><%=hash[i].getString("CARD_ID") %>&nbsp;</TD>
		                                                    <TD width="100" TITLE="<%=hash[i].getString("START_DAY") %>" ><%=hash[i].getString("START_DAY") %>&nbsp;<%=hash[i].getString("START_TIME") %>&nbsp;</TD>                                                    
		                                                    <TD width="100" TITLE="<%=hash[i].getString("END_DAY") %>" ><%=hash[i].getString("END_DAY") %>&nbsp;<%=hash[i].getString("END_TIME") %>&nbsp;</TD>
		                                                    <TD width="70"><%=hash[i].getString("WORK_HH") %>&nbsp;</TD>
		                                                    <TD width="70"><%=hash[i].getString("WORK_MIN") %>&nbsp;</TD>                                                    
		                                                    <TD width="70" class="<%=tdclass1%>"><%=hash[i].getString("WROK_PAY") %>&nbsp;</TD>
		                                            	</TR>
					                                <%
					                                		}                                                    
					                                                                     
					                            	}	//for
					                                
					                                }	//if(hash!=null){
			                            
			                            %>
			
			                        </TABLE>
			                        </div>
			                    </TD>
			                </TR>
			                </TBODY>
			            </TABLE>
</html>
			            
<%} %>




<%	
}else{
%>
<jsp:include page="userinfo.jsp" flush="true"/>

<%} %>
