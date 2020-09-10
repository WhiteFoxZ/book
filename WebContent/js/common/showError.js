/*==============================================================================
*Copyright(c) 2003 POSCO/POSDATA
*
*@ProcessChain	: Reuse
*
*@File			: showError.js
*
*@FileName		: 조업 ERROR 화면 출력 기능.
*
*Open Issues	:
*
*Change history 
*@LastModifyDate: 20040721
*@Author		: 정창호
*@LastModifier	: 남광현
*@LastVersion   : 1.0
*
*    2003-06-30   정창호
*        1.0     최초 생성
 *   2004-07-21    남광현
 *       1.1     맨위 출력 focusing 적용
*==============================================================================*/



/** 
 * Function Description: 조업 ERROR 화면 출력 기능.
 * @author	정창호
 * @version 1.0
 * @param  
 *			msgCode:
 *          msgString:
 *          detailMsg:
 * @return
 */   
function showError(msgCode,msgString,detailMsg)
{
var msgWindow;

msgWindow=window.open("",msgWindow,"toolbar=no,height=340,width=400,menubar=no ");
msgWindow.document.open("text/html","replace")
                              
msgWindow.document.writeln("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
msgWindow.document.writeln("<html>           ");  
msgWindow.document.writeln("<head>");  
msgWindow.document.writeln("<title>ERROR페이지 입니다</title>");  
msgWindow.document.writeln("<meta http-equiv=Content-Type content=text/html; charset=euc-kr\>");  
msgWindow.document.writeln("</head>");  
msgWindow.document.writeln("<style>");  
msgWindow.document.writeln("table{font-size:13px;font-family:verdana,굴림;color:#333333}");  
msgWindow.document.writeln("</style>");  
msgWindow.document.writeln("<body leftmargin=0 topmargin=0>                    ");  
msgWindow.document.writeln("<table width=400 border=0 cellspacing=0 cellpadding=0>");  
msgWindow.document.writeln("  <tr>");  
msgWindow.document.writeln("    <td><img src=/img/m000832img.gif width=400 height=61></td>    "  );  
msgWindow.document.writeln("  </tr>");  
msgWindow.document.writeln("  <tr>");  
msgWindow.document.writeln("    <td><table width=400 border=0 cellspacing=0 cellpadding=0>");  
msgWindow.document.writeln("        <tr>");  
msgWindow.document.writeln("          <td><img src=/img/m000833img.gif width=128 height=33></td>");  
msgWindow.document.writeln("          <td width=173 background=/img/m000829img.gif><strong><font color=#FF0000>"+msgCode+"</font></strong></td>"); 
msgWindow.document.writeln("          <td><img src=/img/m000834img.gif width=85 height=33></td>");  
msgWindow.document.writeln("          <td><img src=/img/m000830img.gif width=15 height=33></td>");  
msgWindow.document.writeln("        </tr>");  
msgWindow.document.writeln("      </table></td>");  
msgWindow.document.writeln("  </tr>");  
msgWindow.document.writeln("  <tr>");  
msgWindow.document.writeln("    <td height=214 background=/img/m000831img.gif><div style=\"LEFT:15px ; overflow:auto; position:absolute; width:370px;top:95; height:199px  \"><table width=350 height=214 border=0 align=center cellpadding=0 cellspacing=10>");  
msgWindow.document.writeln("        <tr>");  
msgWindow.document.writeln("          <td valign=top>"+msgString+"&nbsp;"); 
if(detailMsg!=undefined)
	{
msgWindow.document.writeln("				<p>&nbsp;&nbsp; <strong>-</strong> &nbsp;"+detailMsg+"</font></td>");  
	}
	else{
msgWindow.document.writeln("</font></td>");  
	}
msgWindow.document.writeln("            <p>&nbsp;</p>");  
msgWindow.document.writeln("            </td>");   
msgWindow.document.writeln("        </tr>");  
msgWindow.document.writeln("      </table></div></td>");  
msgWindow.document.writeln("  </tr>");  
msgWindow.document.writeln("</table>"); 
msgWindow.document.writeln("<table><td><center><input type=image src=/img/m000005ico.gif onclick=javascript:window.close();></center></td></table>"); 
msgWindow.document.writeln("</body>");  
msgWindow.document.writeln("</html>");
msgWindow.focus();
}