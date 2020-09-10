<%
/**
종일권
**/

%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="net.sourceforge.barbecue.BarcodeFactory" %>
<%@ page import="net.sourceforge.barbecue.Barcode" %>
<%@ page import="net.sourceforge.barbecue.BarcodeException" %>
<%@ page import="net.sourceforge.barbecue.BarcodeImageHandler" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="java.io.IOException" %>
<%@ page import="com.ems.common.util.*" %>
<%@ page import="com.ems.common.dbcp.DBManager" %>
<%@ page import="com.ems.common.dbcp.DataSource" %>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.*" %>



<%@ page import="com.ems.common.util.*"%>

<%


EmsHashtable userinfo = session.getAttribute("userinfo")!=null?	(EmsHashtable) session.getAttribute("userinfo")	:null;

String LOGINID = userinfo.getString("LOGINID");
String BOOK_1DAY_RATE="";
String USERNAME="";


if(userinfo!=null){
	
	USERNAME = userinfo.getString("USERNAME");
	
	DataSource ds = (DataSource)application.getAttribute("jdbc/mysql_book");
	
	DBManager dbm = new DBManager(ds);

	 
	EmsHashtable[] hash = dbm.selectMultipleRecord(" select CD_GROUP_ID,CD_GROUP_NM,CD_ID,CD_MEANING from book_code where CD_ID=? and CD_GROUP_ID!='BOOK_MAX_RATE' ",
			new String[] { LOGINID });
	// 현재날짜, 카드ID, END_TIME IS NULL 로 데이타 가 있는지 조회해서 데이타가 있으면 들어오셨습니다 메시지를 뿌린다.


String start_num = request.getParameter("start_num");
	
EmsHashtable userAttInfo =new  EmsHashtable();

if(hash!=null && hash.length>0){
	
	String CD_GROUP_ID=null;
	String CD_MEANING =null;
	
	for(int i=0; i<hash.length; i++){
		CD_GROUP_ID = hash[i].getString("CD_GROUP_ID");
		CD_MEANING = hash[i].getString("CD_MEANING");
		userAttInfo.put(CD_GROUP_ID,CD_MEANING);		
	}
		
	BOOK_1DAY_RATE = userAttInfo.getString("BOOK_1DAY_RATE");	
	
		     
}else{	
	out.println("<script>alert('기준정보가 없습니다.')</script>");
}


%>

<HTML>
    <HEAD>
        <TITLE>종일권 Barcode</TITLE>
        <link rel="stylesheet" href="./css/pub.css" type="text/css"> 

<STYLE media=print>
.noPrint {
 DISPLAY: none
}

@page { 
  size:21cm 29.7cm; /*A4*/ 
  margin: 1%;

}
  
</STYLE>


<!--http://www.tutorialspoint.com/css/css_paged_media.htm  참고-->  

        
<script>
function init(){
	
	<%if(start_num!=null){%>
	var start_num = <%=start_num%>;	
	document.frm.start_num.value=start_num;
	<%}%>
	
}
</script>        
    </HEAD>
    <BODY onload="init()">
    <form name="frm" action="" method="post" >    
    <div class="noPrint" >
    <select name="start_num" >
    <option value="101">101~120</option>
    <option value="121">121~140</option>    
    </select>
    <input type="submit" value="생성">
    <input type="button" value="인쇄" onclick="window.print()" />
    <input type="button" value="닫기" onclick="window.close()" />    
    </div>
     
    
        <%

if(start_num!=null && hash!=null )        
{
            Barcode barcode = null;            
            
            int reqData = Integer.parseInt(start_num) + 20;
                                
            try {

                String dirRoot = application.getRealPath("/");
                String dirPath = dirRoot + "barcodeImage" + "\\";
                String filePath = null;
                

                File f = new File(dirPath);
                if (!f.exists()) {
                    f.mkdirs();
                }                

                    String num = null;
                    FileOutputStream fos = null;

                    for (int i = Integer.parseInt(start_num); i <=reqData;  i++) {
                        num = EmsNumberUtil.format(i, "000");

//                        barcode = BarcodeFactory.create3of9(num, false);
                        barcode = BarcodeFactory.createCode128(num);
 

                        filePath = dirPath + num + ".jpg";

                        fos = new FileOutputStream(new File(filePath));

                        BarcodeImageHandler.outputBarcodeAsJPEGImage(barcode, fos);

                    }

            } catch (Exception e) {
            }
        %>
        
		<br>	
		<table cellSpacing="0" borderColorDark="#ffffff" cellPadding="1" width="500" borderColorLight="#666666" border="1" align="center">

        <%
        
        int k= Integer.parseInt(start_num);

            for (int i = 1; i <= 5; i++) {
        %>
        
		<tr height="130" align="center" class="barcode" >
		<td width="250" ><BR><img src="./barcodeImage/<%=EmsNumberUtil.format(k++, "000")%>.jpg" width="200"><div align="center" style="padding-left:5"  ><P><!-- 종일권:<%=BOOK_1DAY_RATE%>원--><BR><font class="barcode1" ></font><BR>과자,음료수,라면은<BR>카운터에 문의<P><B>찾아주셔서 감사합니다.<BR><%=USERNAME %></B><BR>&nbsp;</div></td>
		<td             ><BR><img src="./barcodeImage/<%=EmsNumberUtil.format(k++, "000")%>.jpg" width="200"><div align="center" style="padding-left:5"  ><P><!-- 종일권:<%=BOOK_1DAY_RATE%>원--><BR><font class="barcode1" ></font><BR>과자,음료수,라면은<BR>카운터에 문의<P><B>찾아주셔서 감사합니다.<BR><%=USERNAME %></B><BR>&nbsp;</div></td>
		<td             ><BR><img src="./barcodeImage/<%=EmsNumberUtil.format(k++, "000")%>.jpg" width="200"><div align="center" style="padding-left:5"  ><P><!-- 종일권:<%=BOOK_1DAY_RATE%>원--><BR><font class="barcode1" ></font><BR>과자,음료수,라면은<BR>카운터에 문의<P><B>찾아주셔서 감사합니다.<BR><%=USERNAME %></B><BR>&nbsp;</div></td>
		<td             ><BR><img src="./barcodeImage/<%=EmsNumberUtil.format(k++, "000")%>.jpg" width="200"><div align="center" style="padding-left:5"  ><P><!-- 종일권:<%=BOOK_1DAY_RATE%>원--><BR><font class="barcode1" ></font><BR>과자,음료수,라면은<BR>카운터에 문의<P><B>찾아주셔서 감사합니다.<BR><%=USERNAME %></B><BR>&nbsp;</div></td>
		</tr>

        <%}%>

		</table>
<%} // if(start_num!=null && hash!=null )  %>


	</form>
    </BODY>    
</HTML>
<%}else{%>
<jsp:include page="userinfo.jsp" flush="true"/>
<%} ////userinfo!=null)
%>