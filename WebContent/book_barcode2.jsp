<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="net.sourceforge.barbecue.BarcodeFactory" %>
<%@ page import="net.sourceforge.barbecue.Barcode" %>
<%@ page import="net.sourceforge.barbecue.BarcodeException" %>
<%@ page import="net.sourceforge.barbecue.BarcodeImageHandler" %>

<%@ page import="java.io.File" %>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="java.io.IOException" %>
<%@ page import="com.ems.common.util.*"%>

<HTML>
    <HEAD>
        <TITLE>간식 Barcode</TITLE>
        <link rel="stylesheet" href="./css/pub.css" type="text/css"> 
    </HEAD>
    <BODY>
    <center>
        <%
            Barcode barcode = null;
            String reqData = request.getParameter("data");

            try {

                String dirRoot = application.getRealPath("/");
                String dirPath = dirRoot + "barcodeImage" + "\\";
                String filePath = null;


                File f = new File(dirPath);
                if (!f.exists()) {
                    f.mkdirs();
                }

                
                if (reqData == null) {
                    reqData = "25";

                    String num = null;
                    FileOutputStream fos = null;

                    for (int i = 1; i <= Integer.parseInt(reqData); i++) {
                        num = EmsNumberUtil.format(i+199, "000");

//                        barcode = BarcodeFactory.create3of9(num, false);
                        barcode = BarcodeFactory.createCode128(num);
 

                        filePath = dirPath + num + ".jpg";

                        fos = new FileOutputStream(new File(filePath));

                        BarcodeImageHandler.outputBarcodeAsJPEGImage(barcode, fos);

                    }

                }


            } catch (Exception e) {
            }
        %>

<table cellSpacing="0" borderColorDark="#ffffff" cellPadding="5" width="500" borderColorLight="#666666" border="1">

        <%
            int q = 1;
            int k=200;
            for (int i = 1; i <= Integer.parseInt(reqData)/4; i++) {
        %>

        
<tr height="130" align="center" class="barcode" >
<td width="250" ><BR><img src="./barcodeImage/<%=EmsNumberUtil.format(k++, "000")%>.jpg" width="180"><div align="center" style="padding-left:5"  ><br><b><font size="6" ><%=(q++)*100+600%></font>원</b></div></td>
<td             ><BR><img src="./barcodeImage/<%=EmsNumberUtil.format(k++, "000")%>.jpg" width="180"><div align="center" style="padding-left:5"  ><br><b><font size="6" ><%=(q++)*100+600%></font>원</b></div></td>
<td             ><BR><img src="./barcodeImage/<%=EmsNumberUtil.format(k++, "000")%>.jpg" width="180"><div align="center" style="padding-left:5"  ><br><b><font size="6" ><%=(q++)*100+600%></font>원</b></div></td>
<td             ><BR><img src="./barcodeImage/<%=EmsNumberUtil.format(k++, "000")%>.jpg" width="180"><div align="center" style="padding-left:5"  ><br><b><font size="6" ><%=(q++)*100+600%></font>원</b></div></td>
</tr>

        <%}%>

</table>

    </BODY>
</HTML>

