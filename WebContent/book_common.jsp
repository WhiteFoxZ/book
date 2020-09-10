<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.ems.common.util.*"%>
<%@ page import="com.ems.common.dbcp.DBManager"%>

<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="com.book.*"%>

<%

EmsHashtable userinfo = session.getAttribute("userinfo")!=null?	(EmsHashtable) session.getAttribute("userinfo")	:null;



if(userinfo!=null){
	
	
	String USERNAME = userinfo.getString("USERNAME");


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
    
    BOOKCOMMON book = new BOOKCOMMON(application,request, userinfo, sessionHashCode);

    
    EmsHashtable[] hash  = (EmsHashtable[])request.getAttribute("hash");


%>



<html>
    <head>
        <title><%=USERNAME %>_기본설정</title>
        
        <link rel="stylesheet" href="./css/pub.css" type="text/css">
         
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">        

        <SCRIPT language=javascript>             
            function setEvent(event){
                document.frmMain.event.value=event;
                document.frmMain.submit();
                
            }
            
            function init(){
            	var msg="<%=request.getAttribute("msg")!=null?request.getAttribute("msg"):""%>";
            	
            	if(msg.length>0){
            		alert(msg);
            	}
            }
        </script>



 <style type="text/css">       
.test1 {table-layout:fixed}
.test2 {table-layout:auto}            
 </style>


    </head> 

    <body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" onload="init()"  >
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
                                <td width="50%" style="padding-left:5" > <b><%=USERNAME %>&gt;기본설정</b>                                
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
                                
	                    </td>
                    <td width="30%" align="right"  >
                    <span id="actionBtns" class="func">
                    <a class="btn"  onClick="javascript : return setEvent('find');" ><span> <span class="search">조회</span></span></a>                                 
                    <a class="btn"  onClick="javascript : return setEvent('modify');"  ><span><span class="modify">수정</span></span></a>                    
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
                                <TD width="100">CD_GROUP_ID</TD>
                                <TD width="150">CD_GROUP_NM</TD>
                                <TD width="100">CD_ID</TD>
                                <TD width="100">CD_MEANING</TD> 
                                			                                   
			                                </TR>
			                            </TABLE>
			                        </TD>
			                    </tr>
			
			                    <TR height="18">
			                        <TD>
			                            <div style="position:relative; overflow-y:auto; width:915px; height:560;top:0; left:0;">
			                                <TABLE  style="TABLE-LAYOUT: fixed" cellSpacing="0" borderColorDark="#ffffff" cellPadding="0" width="900" borderColorLight="#666666" border="1">
			                                    <%
			                                        String trclass = "";
			                                        String tdclass1 = "";
			                                        
			                                        if(hash!=null){
			
			                                        for (int i = 0; i < hash.length; i++) {
			
			                                            if (i % 2 > 0) {
			                                                trclass = "tblcw";
			                                            } else {
			                                                trclass = "tblcg";
			                                            }
			
			                                            if (i % 2 > 0) {
			                                                tdclass1 = "tblrw";
			                                            } else {
			                                                tdclass1 = "tblrg";
			                                            }
			
			                                    %>
			                                    <TR class="<%=trclass%>">
			                                    				                                                                                           
			                                        <TD width="100" ><input type="text" name="CD_GROUP_ID" value="<%=hash[i].getString("CD_GROUP_ID")%>" ></TD>
			                                        <TD width="150"><input type="text" name="CD_GROUP_NM" value="<%=hash[i].getString("CD_GROUP_NM")%>" ></TD>
			                                        <TD width="100" ><input type="text" name="CD_ID" value="<%=hash[i].getString("CD_ID")%>" ></TD>                                                    
			                                        <TD width="100" ><input type="text" name="CD_MEANING" value="<%=hash[i].getString("CD_MEANING")%>" ></TD>			                                     
			                                    </TR>
			
			                                    <%
			                                        }
			                                        
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
</div>       
</form>        
</body>
</html>


<%
    
    	
}else{	//LOGIN 정보가 없을때
%>

<jsp:include page="userinfo.jsp" flush="true"/>

<%} %>
