/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA                                                
 *                                                                                
 * @ProcessChain   : Reuse
 *                                                                                  
 * @File           : showMonthCalendar.js
 *                                                                                  
 * @FileName       : showMonthCalendar
 *                                                                                  
 * Open Issues     : 
 *                                                                                
 * Change history
 * @LastModifyDate : 20040721
 * @Author         : 김동호                                                 
 * @LastModifier   : 남광현                                         
 * @LastVersion    : 1.1
 *     2003-09-23    김동호
 *     1.0           최초작성 
 *     2004-07-21    남광현
 *     1.1           맨위 출력 focusing 적용
 *                                                                                
 *==============================================================================*/
var showMonthCalendar_obj;
var showMonthCalendar_year;
var showMonthCalendar_month;
var showMonthCalendar_closeScript;
var showMonthCalendar_option;

var showMonthCalendar_ok;
var showMonthCalendar_cancel;
var showMonthCalendar_confirm;

function showMonthCalendar()
{
    showMonthCalendar_obj = null;
    showMonthCalendar_year = null;
    showMonthCalendar_month = null;
    showMonthCalendar_closeScript = null;
    showMonthCalendar_option = null;
    showMonthCalendar_ok = null;
    showMonthCalendar_cancel = null;
    showMonthCalendar_confirm = null;

    // form object    
    if (arguments[0] != "" && arguments[0] != null)
    {
        showMonthCalendar_obj = arguments[0];
    }
  
    // base year 
    if (arguments[1] != "" && arguments[1] != null)
    {
        var tmpDate = arguments[1];
        
        if (tmpDate.length == 7)
        {
            var tmpYear = tmpDate.substring(0,4);
            var tmpMonth = tmpDate.substring(5,7);
            
            if (0<eval(tmpMonth) && eval(tmpMonth) < 13)
            {
                showMonthCalendar_year = tmpYear;
                showMonthCalendar_month = tmpMonth;
            }
        }
    }
  
    // closeScript
    if (arguments[2] != "" && arguments[2] != null)
    {
        showMonthCalendar_closeScript = arguments[2];
    }
    
    // option
    if (arguments[3] != "" || arguments[3] != null)
    {
        showMonthCalendar_option = arguments[3];

        if (showMonthCalendar_option == 0)
        {
            showMonthCalendar_ok = false;
            showMonthCalendar_cancel = false;
            showMonthCalendar_confirm = false;
        }        
        else if (showMonthCalendar_option == 1)
        {
            showMonthCalendar_ok = true;
            showMonthCalendar_cancel = false;
            showMonthCalendar_confirm = false;
        }
        else if (showMonthCalendar_option == 2)
        {
            showMonthCalendar_ok = true;
            showMonthCalendar_cancel = false;
            showMonthCalendar_confirm = true;
        }
        else if (showMonthCalendar_option == 3)
        {
            showMonthCalendar_ok = false;
            showMonthCalendar_cancel = true;
            showMonthCalendar_confirm = false;
        }
        else if (showMonthCalendar_option == 4)
        {
            showMonthCalendar_ok = true;
            showMonthCalendar_cancel = true;
            showMonthCalendar_confirm = false;
        }
        else if (showMonthCalendar_option == 5)
        {
            showMonthCalendar_ok = true;
            showMonthCalendar_cancel = true;
            showMonthCalendar_confirm = true;
        }
    }

    var vWinCal = window.open("", "MonthCalendar", "width=290,height=150,top=200,left=200");

    showMonthCalendar_build(vWinCal);

    vWinCal.MM_initial();
    vWinCal.focus();
}

function showMonthCalendar_setValue(value)
{
    if (showMonthCalendar_obj != null)
    {
        showMonthCalendar_obj.value = value;
    }
}

function showMonthCalendar_build(win)
{
    var vCode;
           
    vCode = ("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n");
    vCode = vCode + ("<html>\n");
    vCode = vCode + ("<head>\n");
    vCode = vCode + ("<title>년월입력</title>\n");
    vCode = vCode + ("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=euc-kr\">\n");
    vCode = vCode + ("<script language=\"JavaScript\" type=\"text/JavaScript\">\n");
    vCode = vCode + ("<!--\n");
    vCode = vCode + ("    var show_month_calendar_returnObj;\n");
    vCode = vCode + ("    var show_month_calendar_firstItem;\n");
    vCode = vCode + ("    var show_month_calendar_firstItem_img;\n");
    vCode = vCode + ("    var show_month_calendar_firstItem_value;\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    function MM_initial() { //v3.0\n");
    
    //-------------------------------------------------------------------------------------------------------------------------------
    // 값 셋팅
    if (showMonthCalendar_month != null)
    {
        vCode = vCode + ("      MM_preloadImages('/img/m000921img.gif','/img/m000924img.gif','/img/m000923img.gif','/img/m000922img.gif','/img/m000925img.gif','/img/m000926img.gif','/img/m000927img.gif','/img/m000928img.gif','/img/m000929img.gif','/img/m000930img.gif','/img/m000931img.gif','/img/m000932img.gif');\n");
        vCode = vCode + ("      itemSelected('Image" + showMonthCalendar_month + "','/img/m0009" + (20+eval(showMonthCalendar_month)) + "img.gif','" + showMonthCalendar_month + "','/img/m0009" + showMonthCalendar_month + "img.gif', 0);\n");
    }
    else
    {
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    function MM_preloadImages() { //v3.0\n");
    vCode = vCode + ("      var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();\n");
    vCode = vCode + ("        var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)\n");
    vCode = vCode + ("        if (a[i].indexOf(\"#\")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    function MM_swapImgRestore() { //v3.0\n");
    vCode = vCode + ("      var i,x,a=document.MM_sr; \n");
    vCode = vCode + ("      for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)\n");
    vCode = vCode + ("      {if(show_month_calendar_firstItem != x.id)x.src=x.oSrc;}\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    function MM_findObj(n, d) { //v4.01\n");
    vCode = vCode + ("      var p,i,x;  if(!d) d=document; if((p=n.indexOf(\"?\"))>0&&parent.frames.length) {\n");
    vCode = vCode + ("        d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}\n");
    vCode = vCode + ("      if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];\n");
    vCode = vCode + ("      for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);\n");
    vCode = vCode + ("      if(!x && d.getElementById) x=d.getElementById(n); return x;\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    function MM_swapImage() { //v3.0\n");
    vCode = vCode + ("      var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)\n");
    vCode = vCode + ("       if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    function yearChanged(type)\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        if (type == 1)\n");
    vCode = vCode + ("        {\n");
    vCode = vCode + ("            var yearValue = year.innerText;\n");
    vCode = vCode + ("            year.innerText = yearValue - 1;\n");
    vCode = vCode + ("        }\n");
    vCode = vCode + ("        else \n");
    vCode = vCode + ("        {\n");
    vCode = vCode + ("            var yearValue = year.innerText;\n");
    vCode = vCode + ("            year.innerText = eval(yearValue) + 1;\n");
    vCode = vCode + ("        }\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    function itemSelected(id, img, value, srcimg, option)\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        var previousId;\n");
    vCode = vCode + ("        var previousImg;\n");
    vCode = vCode + ("        \n");
    vCode = vCode + ("        previousId = show_month_calendar_firstItem;\n");
    vCode = vCode + ("        previousImg = show_month_calendar_firstItem_img;\n");
    vCode = vCode + ("        \n");
    vCode = vCode + ("        show_month_calendar_firstItem = id;\n");
    vCode = vCode + ("        show_month_calendar_firstItem_img = srcimg;\n");
    vCode = vCode + ("        show_month_calendar_firstItem_value = value;\n");
    vCode = vCode + ("    \n");

    //-------------------------------------------------------------------------------------------------------------------------------
    if (showMonthCalendar_obj != null && showMonthCalendar_confirm == true)
    {
        vCode = vCode + ("        if (previousId != null && previousImg != null)\n");
        vCode = vCode + ("        {\n");
        vCode = vCode + ("            MM_swapImage(previousId,'',previousImg,1);\n");
        vCode = vCode + ("        }\n");
        vCode = vCode + ("    \n");
        vCode = vCode + ("        MM_swapImage(id,'',img,1);\n");
    }
    else
    {
        vCode = vCode + ("        if (option == 1)\n");
        vCode = vCode + ("        {\n");
        vCode = vCode + ("            closeMonthCalendar();\n");
        vCode = vCode + ("        }\n");
        vCode = vCode + ("        else\n");
        vCode = vCode + ("        {\n");
        vCode = vCode + ("            if (previousId != null && previousImg != null)\n");
        vCode = vCode + ("            {\n");
        vCode = vCode + ("                MM_swapImage(previousId,'',previousImg,1);\n");
        vCode = vCode + ("            }\n");
        vCode = vCode + ("            \n");
        vCode = vCode + ("            MM_swapImage(id,'',img,1);\n");
        vCode = vCode + ("        }\n");
    }
    //-------------------------------------------------------------------------------------------------------------------------------

    vCode = vCode + ("    }\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    function closeMonthCalendar()\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        if (show_month_calendar_firstItem_value == null)\n");
    vCode = vCode + ("        {\n");
    vCode = vCode + ("            alert('월을 선택하세요');\n");
    vCode = vCode + ("            return;\n");
    vCode = vCode + ("        }\n");
    vCode = vCode + ("        \n");

    //-------------------------------------------------------------------------------------------------------------------------------
    // 값 셋팅
    if (showMonthCalendar_obj != null)
    {
        vCode = vCode + ("        window.opener.showMonthCalendar_setValue(year.innerText + \"-\" + show_month_calendar_firstItem_value);\n");
    }

    // 확인 후에 표시될 자바스크립트
    if (showMonthCalendar_closeScript != null)
    {
        vCode = vCode + ("        window.opener." + showMonthCalendar_closeScript + ";\n");
    }
    //-------------------------------------------------------------------------------------------------------------------------------

    vCode = vCode + ("        window.close();\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("//-->\n");
    vCode = vCode + ("</script>\n");
    vCode = vCode + ("</head>\n");
    vCode = vCode + ("<style>\n");
    vCode = vCode + ("table{font-family:\"Verdana\", \"Arial\", \"Helvetica\", \"sans-serif\";font-size:13px;};\n");
    vCode = vCode + ("</style>\n");
    vCode = vCode + ("<body onLoad=\"MM_preloadImages('/img/m000921img.gif','/img/m000924img.gif','/img/m000923img.gif','/img/m000922img.gif','/img/m000925img.gif','/img/m000926img.gif','/img/m000927img.gif','/img/m000928img.gif','/img/m000929img.gif','/img/m000930img.gif','/img/m000931img.gif','/img/m000932img.gif')\">\n");
    vCode = vCode + ("<table width=\"270\" height=\"130\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("  <tr> \n");
    vCode = vCode + ("    <td><table width=\"255\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("        <tr> \n");
    vCode = vCode + ("          <td height=\"29\" background=\"/img/m000900img.gif\">\n");
    vCode = vCode + ("            <table width=\"255\" height=\"29\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("              <tr> \n");
    vCode = vCode + ("                <td width=\"104\"><div align=\"center\"><font color=\"#FFFFFF\"><img src=\"/img/m000935img.gif\" width=\"16\" height=\"17\" align=\"absmiddle\" onClick=\"javascript:yearChanged(1)\" style=\"cursor:hand\"> \n");
    vCode = vCode + ("                    <strong id='year'>");

    //-------------------------------------------------------------------------------------------------------------------------------
    // 해당 년도 표시
    if (showMonthCalendar_year != null)
    {
        vCode = vCode + showMonthCalendar_year;
    }
    else
    {
        // 자바스크립트로 해당 년도 구하는 것.
        var now = new Date();
        vCode = vCode + now.getYear();
    }
    //-------------------------------------------------------------------------------------------------------------------------------

    vCode = vCode + ("</strong>&nbsp;<img src=\"/img/m000934img.gif\" width=\"16\" height=\"17\" align=\"absmiddle\" onClick=\"javascript:yearChanged(2)\" style=\"cursor:hand\"></font></div></td>\n");
    vCode = vCode + ("                <td width=\"151\"><div align=\"right\">");
    
    //-------------------------------------------------------------------------------------------------------------------------------
    // 확인 버튼 생성
    if (showMonthCalendar_ok == true)
    {
        vCode = vCode + ("<img src=\"/img/m000933img.gif\" width=\"57\" height=\"19\" style=\"cursor:hand\" onClick=\"javascript:closeMonthCalendar()\">");
    }

    // 취소 버튼 생성
    if (showMonthCalendar_cancel == true)
    {
        vCode = vCode + ("&nbsp;<img src=\"/img/m000936img.gif\" width=\"57\" height=\"19\" style=\"cursor:hand\" onClick=\"javascript:window.close()\">");
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    
    vCode = vCode + ("              </div></td>\n");
    vCode = vCode + ("              </tr>\n");
    vCode = vCode + ("            </table>\n");
    vCode = vCode + ("          </td>\n");
    vCode = vCode + ("        </tr>\n");
    vCode = vCode + ("        <tr> \n");
    vCode = vCode + ("          <td><table width=\"255\" border=\"0\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"#0066CC\">\n");
    vCode = vCode + ("              <tr> \n");
    vCode = vCode + ("                <td bgcolor=\"94AAE1\">\n");
    vCode = vCode + ("                  <table width=\"100%\" height=\"84\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("                    <tr> \n");
    vCode = vCode + ("                      <td valign=\"bottom\" bgcolor=\"#F4f4f4\">\n");
    vCode = vCode + ("                        <table width=\"240\" border=\"0\" align=\"center\">\n");
    vCode = vCode + ("                          <tr> \n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image01','','/img/m000921img.gif',1)\"><img src=\"/img/m000901img.gif\" name=\"Image01\" width=\"31\" id=\"Image01\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image01', '/img/m000921img.gif', '01', '/img/m000901img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image02','','/img/m000922img.gif',1)\"><img src=\"/img/m000902img.gif\" name=\"Image02\" width=\"31\" id=\"Image02\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image02', '/img/m000922img.gif', '02', '/img/m000902img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image03','','/img/m000923img.gif',1)\"><img src=\"/img/m000903img.gif\" name=\"Image03\" width=\"31\" id=\"Image03\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image03', '/img/m000923img.gif', '03', '/img/m000903img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image04','','/img/m000924img.gif',1)\"><img src=\"/img/m000904img.gif\" name=\"Image04\" width=\"31\" id=\"Image04\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image04', '/img/m000924img.gif', '04', '/img/m000904img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image05','','/img/m000925img.gif',1)\"><img src=\"/img/m000905img.gif\" name=\"Image05\" width=\"31\" id=\"Image05\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image05', '/img/m000925img.gif', '05', '/img/m000905img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image06','','/img/m000926img.gif',1)\"><img src=\"/img/m000906img.gif\" name=\"Image06\" width=\"31\" id=\"Image06\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image06', '/img/m000926img.gif', '06', '/img/m000906img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                          </tr>                                                                                                                                                                                           \n");
    vCode = vCode + ("                        </table> \n");
    vCode = vCode + ("                      </td>\n");
    vCode = vCode + ("                    </tr>\n");
    vCode = vCode + ("                 \n");
    vCode = vCode + ("                    <tr> \n");
    vCode = vCode + ("                      <td valign=\"top\" bgcolor=\"#F4f4f4\">\n");
    vCode = vCode + ("                        <table width=\"240\" border=\"0\" align=\"center\">\n");
    vCode = vCode + ("                          <tr> \n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image07','','/img/m000927img.gif',1)\"><img src=\"/img/m000907img.gif\" name=\"Image07\" width=\"31\" id=\"Image07\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image07', '/img/m000927img.gif', '07', '/img/m000907img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image08','','/img/m000928img.gif',1)\"><img src=\"/img/m000908img.gif\" name=\"Image08\" width=\"31\" id=\"Image08\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image08', '/img/m000928img.gif', '08', '/img/m000908img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image09','','/img/m000929img.gif',1)\"><img src=\"/img/m000909img.gif\" name=\"Image09\" width=\"31\" id=\"Image09\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image09', '/img/m000929img.gif', '09', '/img/m000909img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image10','','/img/m000930img.gif',1)\"><img src=\"/img/m000910img.gif\" name=\"Image10\" width=\"31\" id=\"Image10\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image10', '/img/m000930img.gif', '10', '/img/m000910img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image11','','/img/m000931img.gif',1)\"><img src=\"/img/m000911img.gif\" name=\"Image11\" width=\"31\" id=\"Image11\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image11', '/img/m000931img.gif', '11', '/img/m000911img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image12','','/img/m000932img.gif',1)\"><img src=\"/img/m000912img.gif\" name=\"Image12\" width=\"31\" id=\"Image12\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image12', '/img/m000932img.gif', '12', '/img/m000912img.gif', 1)\"></a></div></td>\n");
    vCode = vCode + ("                          </tr>\n");
    vCode = vCode + ("                        </table> \n");
    vCode = vCode + ("                      </td>\n");
    vCode = vCode + ("                    </tr>\n");
    vCode = vCode + ("                  </table>\n");
    vCode = vCode + ("                </td>\n");
    vCode = vCode + ("              </tr>\n");
    vCode = vCode + ("            </table></td>\n");
    vCode = vCode + ("        </tr>\n");
    vCode = vCode + ("      </table></td>\n");
    vCode = vCode + ("  </tr>\n");
    vCode = vCode + ("</table>\n");
    vCode = vCode + ("</body>\n");
    vCode = vCode + ("</html>\n");

    win.document.writeln(vCode);
    
    win.document.close();

}