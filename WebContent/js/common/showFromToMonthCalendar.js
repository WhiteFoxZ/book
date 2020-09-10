var showFromToMonthCalendar_first_obj ;
var showFromToMonthCalendar_second_obj;
var showFromToMonthCalendar_year_from;
var showFromToMonthCalendar_month_from;
var showFromToMonthCalendar_year_to;
var showFromToMonthCalendar_month_to;
var showFromToMonthCalendar_closeScript;
var showFromToMonthCalendar_option;

var FromTo_gNow = new Date();

function showFromToMonthCalendar()
{
    
    
    showFromToMonthCalendar_first_obj = null;
    showFromToMonthCalendar_second_obj = null;
    showFromToMonthCalendar_year_from = null;
    showFromToMonthCalendar_month_from = null;
    showFromToMonthCalendar_year_to = null;
    showFromToMonthCalendar_month_to = null;
    showFromToMonthCalendar_closeScript = null;
    showFromToMonthCalendar_option = null;


    // firstName   
    if (arguments[0] != "" && arguments[0] != null)
    {
        showFromToMonthCalendar_first_obj = arguments[0];
    }
    // secondName   
    if (arguments[1] != "" && arguments[1] != null)
    {
        showFromToMonthCalendar_second_obj = arguments[1];
    }
  
    // first base year 
    if (arguments[2] != "" && arguments[2] != null)
    {

        var tmpDate = arguments[2];
        
        if (tmpDate.length == 7)
        {
            var tmpYear = tmpDate.substring(0,4);
            var tmpMonth = tmpDate.substring(5,7);
            
            if (0<eval(tmpMonth) && eval(tmpMonth) < 13)
            {
                showFromToMonthCalendar_year_from = tmpYear;
                showFromToMonthCalendar_month_from = tmpMonth;
            }
        }
    }
    else
    {

        showFromToMonthCalendar_year_from= FromTo_gNow.getFullYear();
        showFromToMonthCalendar_month_from= ""+FromTo_gNow.getMonth()+1;
    }
    
    // second base year 
    if (arguments[3] != "" && arguments[3] != null)
    {
        var tmpDate = arguments[3];
        
        if (tmpDate.length == 7)
        {
            var tmpYear = tmpDate.substring(0,4);
            var tmpMonth = tmpDate.substring(5,7);
            
            if (0<eval(tmpMonth) && eval(tmpMonth) < 13)
            {
                showFromToMonthCalendar_year_to = tmpYear;
                showFromToMonthCalendar_month_to = tmpMonth;
            }
        }
    }
    else
    {
        showFromToMonthCalendar_year_to= FromTo_gNow.getFullYear();
        showFromToMonthCalendar_month_to= ""+FromTo_gNow.getMonth()+1;                      
    }
  
    // closeScript
    if (arguments[4] != "" && arguments[4] != null)
    {
        showFromToMonthCalendar_closeScript = arguments[4];
    }
    
    // option
    if (arguments[5] != "" || arguments[5] != null)
    {
        showFromToMonthCalendar_option = arguments[5];
    }

    var vWinCal = window.open("", "FromToMonthCalendar", "width=290,height=300,top=200,left=200");

    showFromToMonthCalendar_build(vWinCal);

    vWinCal.MM_initial_FromTo();
    vWinCal.focus();
}

function showFromToMonthCalendar_setValue(fromvalue,tovalue )
{
    if (showFromToMonthCalendar_first_obj != null)
    {
        showFromToMonthCalendar_first_obj.value = fromvalue;
    }
    if (showFromToMonthCalendar_second_obj != null)
    {
        showFromToMonthCalendar_second_obj.value = tovalue;
    }
}

function showFromToMonthCalendar_build(win)
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
    vCode = vCode + ("    var show_month_calendar_secondItem;\n");
    vCode = vCode + ("    var show_month_calendar_secondItem_img;\n");
    vCode = vCode + ("    var show_month_calendar_secondItem_value;\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    function MM_initial_FromTo() { //v3.0\n");
     
    //-------------------------------------------------------------------------------------------------------------------------------
    // 값 셋팅
    if (showFromToMonthCalendar_month_from != null)
    {
        vCode = vCode + ("      MM_preloadImages('/img/m000921img.gif','/img/m000924img.gif','/img/m000923img.gif','/img/m000922img.gif','/img/m000925img.gif','/img/m000926img.gif','/img/m000927img.gif','/img/m000928img.gif','/img/m000929img.gif','/img/m000930img.gif','/img/m000931img.gif','/img/m000932img.gif');\n");
        vCode = vCode + ("      itemSelected('Image" + showFromToMonthCalendar_month_from + "','/img/m0009" + (20+eval(showFromToMonthCalendar_month_from)) + "img.gif','" + showFromToMonthCalendar_month_from + "','/img/m0009" + showFromToMonthCalendar_month_from + "img.gif', 0, 1);\n");
    }
    else
    {       
    }
    if (showFromToMonthCalendar_month_to != null)
    {
        vCode = vCode + ("      MM_preloadImages('/img/m000921img.gif','/img/m000924img.gif','/img/m000923img.gif','/img/m000922img.gif','/img/m000925img.gif','/img/m000926img.gif','/img/m000927img.gif','/img/m000928img.gif','/img/m000929img.gif','/img/m000930img.gif','/img/m000931img.gif','/img/m000932img.gif');\n");
        vCode = vCode + ("      itemSelected('Image" + showFromToMonthCalendar_month_to + "_s','/img/m0009" + (20+eval(showFromToMonthCalendar_month_to)) + "img.gif','" + showFromToMonthCalendar_month_to + "','/img/m0009" + showFromToMonthCalendar_month_to + "img.gif', 0, 2);\n");
    }
    else
    {
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    vCode = vCode + ("    }                                                                 \n");
    vCode = vCode + ("                                                                      \n");
    vCode = vCode + ("    function MM_preloadImages() { //v3.0                                                                      \n");
    vCode = vCode + ("      var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();                                           \n");
    vCode = vCode + ("        var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)                         \n");
    vCode = vCode + ("        if (a[i].indexOf(\"#\")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}                             \n");
    vCode = vCode + ("    }                                                                         \n");
    vCode = vCode + ("    function MM_swapImgRestore() { //v3.0                                     \n");
    vCode = vCode + ("      var c=MM_swapImgRestore.arguments;   //c는 1인지 2인지만 판단.-->from, to 달력 구분을 위해                \n");
    vCode = vCode + ("      if(c[0] == 1){                                                          \n");
    vCode = vCode + ("              var i,x,a=document.MM_sr;                                       \n");
    vCode = vCode + ("              for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)                    \n");
    vCode = vCode + ("                  {if(show_month_calendar_firstItem != x.id)x.src=x.oSrc;}    \n");
    vCode = vCode + ("      }                                                                       \n");
    vCode = vCode + ("      else {                                                                  \n");
    vCode = vCode + ("              var i,y,a=document.MM_srb;                                      \n");
    vCode = vCode + ("              for(i=0;a&&i<a.length&&(y=a[i])&&y.oSrc;i++)                    \n");
    vCode = vCode + ("                  {if(show_month_calendar_secondItem != y.id)y.src=y.oSrc;}   \n");
    vCode = vCode + ("      }                                                                       \n");
    vCode = vCode + ("    }                                                                         \n");
    vCode = vCode + ("    function MM_findObj(n, d) { //v4.01                                       \n");
    vCode = vCode + ("      var p,i,x;  if(!d) d=document; if((p=n.indexOf(\"?\"))>0&&parent.frames.length) {                       \n");
    vCode = vCode + ("        d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}                                      \n");
    vCode = vCode + ("      if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];                    \n");
    vCode = vCode + ("      for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);                      \n");
    vCode = vCode + ("      if(!x && d.getElementById) x=d.getElementById(n); return x;     \n");
    vCode = vCode + ("    }                                                                 \n");
    vCode = vCode + ("                                                                      \n");
    vCode = vCode + ("    function MM_swapImage() { //v3.0                                  \n");        
    vCode = vCode + ("        var a=MM_swapImage.arguments;                                 \n");
    vCode = vCode + ("        document.MM_sr=new Array;                                     \n");
    vCode = vCode + ("        if(a[3]==1)                                                   \n");
    vCode = vCode + ("        {                                                             \n");
    vCode = vCode + ("          var i,j=0,x;  for(i=0;i<(a.length-2);i+=3)                  \n");
    vCode = vCode + ("          if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}        \n");
    vCode = vCode + ("        }                                                             \n");
    vCode = vCode + ("        else                                                          \n");
    vCode = vCode + ("        {                                                             \n");
    vCode = vCode + ("          var i,j=0,y,a=MM_swapImage.arguments; document.MM_srb=new Array; for(i=0;i<(a.length-2);i+=3)           \n");
    vCode = vCode + ("          if ((y=MM_findObj(a[i]))!=null){document.MM_srb[j++]=y; if(!y.oSrc) y.oSrc=y.src; y.src=a[i+2];}        \n");
    vCode = vCode + ("        }                                                             \n");
    vCode = vCode + ("    }                                                                 \n");
    vCode = vCode + ("                                                                      \n");
    vCode = vCode + ("    function yearChanged(type, fort)                                  \n");
    vCode = vCode + ("    {                                                                 \n");
    vCode = vCode + ("      if(fort==\"from\"){                                             \n");
    vCode = vCode + ("        if (type == 1)                                                \n");
    vCode = vCode + ("        {                                                             \n");
    vCode = vCode + ("            var yearValue = year_from.innerText;                      \n");
    vCode = vCode + ("            year_from.innerText = yearValue - 1;                      \n");
    vCode = vCode + ("        }                                                             \n");
    vCode = vCode + ("        else                                                          \n");
    vCode = vCode + ("        {                                                             \n");
    vCode = vCode + ("            var yearValue = year_from.innerText;                      \n");
    vCode = vCode + ("            year_from.innerText = eval(yearValue) + 1;                \n");
    vCode = vCode + ("        }                                                             \n");
    vCode = vCode + ("      }                                                               \n");
    vCode = vCode + ("      else if(fort==\"to\"){                                          \n");
    vCode = vCode + ("        if (type == 1)                                                \n");
    vCode = vCode + ("        {                                                             \n");
    vCode = vCode + ("            var yearValue = year_to.innerText;                        \n");
    vCode = vCode + ("            year_to.innerText = yearValue - 1;                        \n");
    vCode = vCode + ("        }                                                             \n");
    vCode = vCode + ("        else                                                          \n");
    vCode = vCode + ("        {                                                             \n");
    vCode = vCode + ("            var yearValue = year_to.innerText;                        \n");
    vCode = vCode + ("            year_to.innerText = eval(yearValue) + 1;                  \n");
    vCode = vCode + ("        }                                                             \n");
    vCode = vCode + ("      }                                                               \n");
    vCode = vCode + ("    }                                                                 \n");
    vCode = vCode + ("                                                                      \n");
    vCode = vCode + ("    function itemSelected(id, img, value, srcimg, option, itemCode)   \n");
    vCode = vCode + ("    {                                                                 \n");
    vCode = vCode + ("        var previousId;                                               \n");
    vCode = vCode + ("        var previousImg;                                              \n");
    vCode = vCode + ("        var previousId_s;                                             \n");
    vCode = vCode + ("        var previousImg_s;                                            \n");
    vCode = vCode + ("                                                                    \n");
    vCode = vCode + ("        if(itemCode==1)                                               \n");    
    vCode = vCode + ("        {                                                                \n");       
    vCode = vCode + ("              previousId = show_month_calendar_firstItem;             \n");
    vCode = vCode + ("              previousImg = show_month_calendar_firstItem_img;        \n");
    vCode = vCode + ("                                                                      \n");       
    vCode = vCode + ("              show_month_calendar_firstItem = id;                     \n");
    vCode = vCode + ("              show_month_calendar_firstItem_img = srcimg;             \n");
    vCode = vCode + ("              show_month_calendar_firstItem_value = value;            \n");
    vCode = vCode + ("              if (previousId != null && previousImg != null)          \n");
    vCode = vCode + ("              {                                                       \n");
    vCode = vCode + ("                   MM_swapImage(previousId,'',previousImg,1);         \n");
    vCode = vCode + ("              }                                                       \n");
    vCode = vCode + ("                                                                      \n");
    vCode = vCode + ("              MM_swapImage(id,'',img,1);                              \n");
    vCode = vCode + ("        }                                                             \n");    
    vCode = vCode + ("        else                                                          \n");    
    vCode = vCode + ("        {                                                          \n");    
    vCode = vCode + ("              previousId_s = show_month_calendar_secondItem;          \n");
    vCode = vCode + ("              previousImg_s = show_month_calendar_secondItem_img;     \n");
    vCode = vCode + ("                                                                      \n");    
    vCode = vCode + ("              show_month_calendar_secondItem = id;                    \n");
    vCode = vCode + ("              show_month_calendar_secondItem_img = srcimg;            \n");
    vCode = vCode + ("              show_month_calendar_secondItem_value = value;           \n");
    vCode = vCode + ("              if (previousId_s != null && previousImg_s != null)      \n");
    vCode = vCode + ("              {                                                       \n");
    vCode = vCode + ("                   MM_swapImage(previousId_s,'',previousImg_s,2);     \n");
    vCode = vCode + ("             }                                                       \n");
    vCode = vCode + ("                                                                      \n");
    vCode = vCode + ("              MM_swapImage(id,'',img,2);                           \n");
    vCode = vCode + ("        }                                                             \n");    
    vCode = vCode + ("                                                                      \n");    
    vCode = vCode + ("    }                                                                 \n");
    vCode = vCode + ("                                                                      \n");

    //-------------------------------------------------------------------------------------------------------------------------------
    // 값 셋팅
vCode = vCode + ("   function fromToClose(){                                               \n");  
vCode = vCode +("    if(eval(year_from.innerText) > eval(year_to.innerText) ) \n");
vCode = vCode +("    {                                                                      \n"); 
if(showFromToMonthCalendar_option!="" || showFromToMonthCalendar_option.length>0) 
{
    vCode = vCode +("               alert(\""+showFromToMonthCalendar_option+"\");                             \n"); 
}
else
{
    vCode = vCode +("               alert(\"From ~ To 기간을 정확히 입력하세요\");               \n"); 
}
vCode = vCode +("    }                                                                      \n"); 
vCode = vCode +("    else if(    (eval(year_from.innerText) == eval(year_to.innerText)) && ( eval(show_month_calendar_firstItem_value) > eval(show_month_calendar_secondItem_value))  )           \n"); 
vCode = vCode +("    {                                                                   \n"); 
if(showFromToMonthCalendar_option!="" || showFromToMonthCalendar_option.length>0) 
{
    vCode = vCode +("               alert(\""+showFromToMonthCalendar_option+"\");                             \n"); 
}
else
{
    vCode = vCode +("               alert(\"From ~ To 기간을 정확히 입력하세요\");               \n"); 
}
vCode = vCode +("    }                                                                      \n"); 
vCode = vCode +("    else                                                                   \n"); 
vCode = vCode +("    {                                                                      \n"); 
vCode = vCode +("        window.opener.showFromToMonthCalendar_setValue(year_from.innerText + \"-\" + show_month_calendar_firstItem_value, year_to.innerText + \"-\" + show_month_calendar_secondItem_value);\n");
       
    // 확인 후에 표시될 자바스크립트
    if (showFromToMonthCalendar_closeScript != null)
    {
        vCode = vCode + ("        window.opener." + showFromToMonthCalendar_closeScript + ";\n");
    }
    //-------------------------------------------------------------------------------------------------------------------------------

    vCode = vCode + ("        window.close();\n");
    vCode = vCode + (" }\n");
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
    vCode = vCode + ("                <td width=\"104\"><div align=\"center\"><font color=\"#FFFFFF\"><img src=\"/img/m000935img.gif\" width=\"16\" height=\"17\" align=\"absmiddle\" onClick=\"javascript:yearChanged(1, 'from')\" style=\"cursor:hand\"> \n");
    vCode = vCode + ("                    <strong id='year_from'>");

    //-------------------------------------------------------------------------------------------------------------------------------
    // 해당 년도 표시
    if (showFromToMonthCalendar_year_from != null)
    {
        vCode = vCode + showFromToMonthCalendar_year_from;
    }
    else
    {
        // 자바스크립트로 해당 년도 구하는 것.
        var now = new Date();
        vCode = vCode + now.getYear();
    }
    //-------------------------------------------------------------------------------------------------------------------------------

    vCode = vCode + ("</strong>&nbsp;<img src=\"/img/m000934img.gif\" width=\"16\" height=\"17\" align=\"absmiddle\" onClick=\"javascript:yearChanged(2, 'from')\" style=\"cursor:hand\"></font></div></td>\n");
    vCode = vCode + ("                <td width=\"151\"><div align=\"right\">");
        
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
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image01','','/img/m000921img.gif',1)\"><img src=\"/img/m000901img.gif\" name=\"Image01\" width=\"31\" id=\"Image01\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image01', '/img/m000921img.gif', '01', '/img/m000901img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image02','','/img/m000922img.gif',1)\"><img src=\"/img/m000902img.gif\" name=\"Image02\" width=\"31\" id=\"Image02\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image02', '/img/m000922img.gif', '02', '/img/m000902img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image03','','/img/m000923img.gif',1)\"><img src=\"/img/m000903img.gif\" name=\"Image03\" width=\"31\" id=\"Image03\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image03', '/img/m000923img.gif', '03', '/img/m000903img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image04','','/img/m000924img.gif',1)\"><img src=\"/img/m000904img.gif\" name=\"Image04\" width=\"31\" id=\"Image04\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image04', '/img/m000924img.gif', '04', '/img/m000904img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image05','','/img/m000925img.gif',1)\"><img src=\"/img/m000905img.gif\" name=\"Image05\" width=\"31\" id=\"Image05\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image05', '/img/m000925img.gif', '05', '/img/m000905img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image06','','/img/m000926img.gif',1)\"><img src=\"/img/m000906img.gif\" name=\"Image06\" width=\"31\" id=\"Image06\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image06', '/img/m000926img.gif', '06', '/img/m000906img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                          </tr>                                                                                                                                                                                           \n");
    vCode = vCode + ("                        </table> \n");
    vCode = vCode + ("                      </td>\n");
    vCode = vCode + ("                    </tr>\n");
    vCode = vCode + ("                 \n");
    vCode = vCode + ("                    <tr> \n");
    vCode = vCode + ("                      <td valign=\"top\" bgcolor=\"#F4f4f4\">\n");
    vCode = vCode + ("                        <table width=\"240\" border=\"0\" align=\"center\">\n");
    vCode = vCode + ("                          <tr> \n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image07','','/img/m000927img.gif',1)\"><img src=\"/img/m000907img.gif\" name=\"Image07\" width=\"31\" id=\"Image07\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image07', '/img/m000927img.gif', '07', '/img/m000907img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image08','','/img/m000928img.gif',1)\"><img src=\"/img/m000908img.gif\" name=\"Image08\" width=\"31\" id=\"Image08\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image08', '/img/m000928img.gif', '08', '/img/m000908img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image09','','/img/m000929img.gif',1)\"><img src=\"/img/m000909img.gif\" name=\"Image09\" width=\"31\" id=\"Image09\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image09', '/img/m000929img.gif', '09', '/img/m000909img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image10','','/img/m000930img.gif',1)\"><img src=\"/img/m000910img.gif\" name=\"Image10\" width=\"31\" id=\"Image10\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image10', '/img/m000930img.gif', '10', '/img/m000910img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image11','','/img/m000931img.gif',1)\"><img src=\"/img/m000911img.gif\" name=\"Image11\" width=\"31\" id=\"Image11\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image11', '/img/m000931img.gif', '11', '/img/m000911img.gif', 1, 1)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(1)\" onMouseOver=\"MM_swapImage('Image12','','/img/m000932img.gif',1)\"><img src=\"/img/m000912img.gif\" name=\"Image12\" width=\"31\" id=\"Image12\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image12', '/img/m000932img.gif', '12', '/img/m000912img.gif', 1, 1)\"></a></div></td>\n");
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
/////*****************************************************************************************************
    vCode = vCode + ("  <tr> \n");
    vCode = vCode + ("    <td><table width=\"255\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("        <tr> \n");
    vCode = vCode + ("          <td height=\"29\" background=\"/img/m000900img.gif\">\n");
    vCode = vCode + ("            <table width=\"255\" height=\"29\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("              <tr> \n");
    vCode = vCode + ("                <td width=\"104\"><div align=\"center\"><font color=\"#FFFFFF\"><img src=\"/img/m000935img.gif\" width=\"16\" height=\"17\" align=\"absmiddle\" onClick=\"javascript:yearChanged(1, 'to')\" style=\"cursor:hand\"> \n");
    vCode = vCode + ("                    <strong id='year_to'>");

    //-------------------------------------------------------------------------------------------------------------------------------
    // 해당 년도 표시
    if (showFromToMonthCalendar_year_to != null)
    {
        vCode = vCode + showFromToMonthCalendar_year_to;
    }
    else
    {
        // 자바스크립트로 해당 년도 구하는 것.
        var now = new Date();
        vCode = vCode + now.getYear();
    }
    //-------------------------------------------------------------------------------------------------------------------------------

    vCode = vCode + ("</strong>&nbsp;<img src=\"/img/m000934img.gif\" width=\"16\" height=\"17\" align=\"absmiddle\" onClick=\"javascript:yearChanged(2, 'to')\" style=\"cursor:hand\"></font></div></td>\n");
    vCode = vCode + ("                <td width=\"151\"><div align=\"right\">");
        
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
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image01_s','','/img/m000921img.gif',2)\"><img src=\"/img/m000901img.gif\" name=\"Image01_s\" width=\"31\" id=\"Image01_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image01_s', '/img/m000921img.gif', '01', '/img/m000901img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image02_s','','/img/m000922img.gif',2)\"><img src=\"/img/m000902img.gif\" name=\"Image02_s\" width=\"31\" id=\"Image02_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image02_s', '/img/m000922img.gif', '02', '/img/m000902img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image03_s','','/img/m000923img.gif',2)\"><img src=\"/img/m000903img.gif\" name=\"Image03_s\" width=\"31\" id=\"Image03_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image03_s', '/img/m000923img.gif', '03', '/img/m000903img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image04_s','','/img/m000924img.gif',2)\"><img src=\"/img/m000904img.gif\" name=\"Image04_s\" width=\"31\" id=\"Image04_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image04_s', '/img/m000924img.gif', '04', '/img/m000904img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image05_s','','/img/m000925img.gif',2)\"><img src=\"/img/m000905img.gif\" name=\"Image05_s\" width=\"31\" id=\"Image05_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image05_s', '/img/m000925img.gif', '05', '/img/m000905img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image06_s','','/img/m000926img.gif',2)\"><img src=\"/img/m000906img.gif\" name=\"Image06_s\" width=\"31\" id=\"Image06_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image06_s', '/img/m000926img.gif', '06', '/img/m000906img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                          </tr>                                                                                                                                                                                           \n");
    vCode = vCode + ("                        </table> \n");
    vCode = vCode + ("                      </td>\n");
    vCode = vCode + ("                    </tr>\n");
    vCode = vCode + ("                 \n");
    vCode = vCode + ("                    <tr> \n");
    vCode = vCode + ("                      <td valign=\"top\" bgcolor=\"#F4f4f4\">\n");
    vCode = vCode + ("                        <table width=\"240\" border=\"0\" align=\"center\">\n");
    vCode = vCode + ("                          <tr> \n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image07_s','','/img/m000927img.gif',2)\"><img src=\"/img/m000907img.gif\" name=\"Image07_s\" width=\"31\" id=\"Image07_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image07_s', '/img/m000927img.gif', '07', '/img/m000907img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image08_s','','/img/m000928img.gif',2)\"><img src=\"/img/m000908img.gif\" name=\"Image08_s\" width=\"31\" id=\"Image08_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image08_s', '/img/m000928img.gif', '08', '/img/m000908img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image09_s','','/img/m000929img.gif',2)\"><img src=\"/img/m000909img.gif\" name=\"Image09_s\" width=\"31\" id=\"Image09_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image09_s', '/img/m000929img.gif', '09', '/img/m000909img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image10_s','','/img/m000930img.gif',2)\"><img src=\"/img/m000910img.gif\" name=\"Image10_s\" width=\"31\" id=\"Image10_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image10_s', '/img/m000930img.gif', '10', '/img/m000910img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image11_s','','/img/m000931img.gif',2)\"><img src=\"/img/m000911img.gif\" name=\"Image11_s\" width=\"31\" id=\"Image11_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image11_s', '/img/m000931img.gif', '11', '/img/m000911img.gif', 1, 2)\"></a></div></td>\n");
    vCode = vCode + ("                            <td><div align=\"center\"><a href=\"#\" onMouseOut=\"MM_swapImgRestore(2)\" onMouseOver=\"MM_swapImage('Image12_s','','/img/m000932img.gif',2)\"><img src=\"/img/m000912img.gif\" name=\"Image12_s\" width=\"31\" id=\"Image12_s\" height=\"27\" border=\"0\" onClick=\"itemSelected('Image12_s', '/img/m000932img.gif', '12', '/img/m000912img.gif', 1, 2)\"></a></div></td>\n");
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

/////

    vCode = vCode + ("  </tr>\n");
    vCode = vCode + ("  <tr>\n");
    vCode = vCode + ("  <td align=center>\n");
    vCode = vCode + ("  <p>\n");    
    vCode = vCode + ("<img src=\"/img/m000933img.gif\" width=\"57\" height=\"19\" style=\"cursor:hand\" onClick=\"javascript:fromToClose()\">");
    vCode = vCode + ("  </td>\n");
    vCode = vCode + ("  </tr>\n");

    vCode = vCode + ("</table>\n");
    vCode = vCode + ("</body>\n");
    vCode = vCode + ("</html>\n");

    win.document.writeln(vCode);
    
    win.document.close();

}