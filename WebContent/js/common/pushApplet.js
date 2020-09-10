function push_popup(msg, anchor, textColor){
    var win=window.open("" , "", "status=no,menubar=no,width=350,height=300,resizable=yes,scrollbars=yes");
		win.document.open("text/html","replace")

		win.document.writeln("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		win.document.writeln("<html>           ");
		win.document.writeln("<head>");
		win.document.writeln("<title>메시지가 도착했습니다</title>");
		win.document.writeln("<meta http-equiv=Content-Type content=text/html; charset=euc-kr\>");
		win.document.writeln("<script language=\"javascript\">function openWin(url){window.open(url);}</script>");
		win.document.writeln("</head>");
		win.document.writeln("<style>");
		win.document.writeln("table{font-size:13px;font-family:verdana,돋움;color:#333333}");
		win.document.writeln("</style>");
		win.document.writeln("<body leftmargin=0 topmargin=0>                    ");
		win.document.writeln("<table width=300 border=1 align=center cellpadding=5 cellspacing=2 bordercolor=#999999 bgcolor=#FFFFFF>");
		win.document.writeln("  <tr>");
		win.document.writeln("    <td bordercolor=#FFFFFF bgcolor=#fdfdf5>   "  );
		win.document.writeln("       <p>   "  );
		win.document.writeln("          <font size=3 color=\"" + textColor + "\">" + msg + " </font>  ");
		win.document.writeln("       </p>   "  );
		if (anchor != null) {
			win.document.writeln("       <BR>");
			win.document.writeln("       <BR>");
			win.document.writeln("       <p align=right>   "  );
			win.document.writeln("          <font color=#336699 size=2>" );
			win.document.writeln("          <a href=javascript:openWin(\"" + anchor + "\")>▶ 참고 페이지</a></font>  ");
			win.document.writeln("       </p>   "  );
		}
		win.document.writeln("    </td>   "  );
		win.document.writeln("  </tr>");
		win.document.writeln("</table>");
		win.document.writeln("<BR>");
		win.document.writeln("<BR>");
		win.document.writeln("<p align=center><a href=javascript:window.close();>창닫기</a></p>");
		win.document.writeln("</body>");
		win.document.writeln("</html>");
		win.focus();
}

function push_info(msg, anchor){
		push_popup(msg, anchor, "#333333");
}

function push_urgent(msg, anchor){
		push_popup(msg, anchor, "#990000");
}

function push_alarm(msg,anchor){
    openAlert = alert(msg);
}

function showMesPushAppletPopup(host,port,empno,realip)
{
	var winx = screen.width;
	var winy = screen.height;
	if(getPushBrowserCookie()) {
		return;
	}
	newPushBrowserCookie();
	var popWindow;
	popWindow=window.open("apppush.jsp?host="+host+"&port="+port+"&empno="+empno+"&realip="+realip,"","toolbar=no,height=280,width=400,menubar=no,top="+winy+",left="+winx);
}
function move_to_default()
{
       window.blur();
	window.moveTo(0,0);
}

function getPushBrowserCookie() {
	var arg = "PUSH_RECEIVER_LISTENING=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return true;
		}

		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return false;
}

function newPushBrowserCookie() {
	document.cookie = "PUSH_RECEIVER_LISTENING=OK; path=/"+"; domain =posco.co.kr";
}

function changePushBrowserCookie() {
	var expires = new Date();
	expires.setTime(expires.getTime() + 8 * 60 * 60 * 1000);
	document.cookie = "PUSH_RECEIVER_LISTENING=OK; expires=" + expires.toGMTString()+"; path=/"+"; domain =posco.co.kr";
}
