/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA                                                
 *                                                                                
 * @ProcessChain   : Reuse
 *                                                                                  
 * @File           : showSerial.js
 *                                                                                  
 * @FileName       : showSerial
 *                                                                                  
 * Open Issues     : 
 *                                                                                
 * Change history
 * @LastModifyDate : 20040721
 * @Author         : 김동호                                                 
 * @LastModifier   : 남광현                                                
 * @LastVersion    : 1.1
 *     2003-09-06    김동호
 *     1.0           최초작성 
 *     2004-07-21    남광현
 *     1.1           맨위 출력 focusing 적용                                                   
 *==============================================================================*/
var showSerial_obj;
var showSerial_year;
var showSerial_closeScript;

function showSerial()
{
    // form object    
    if (arguments[0] == "" || arguments[0] == null)
    {
        showSerial_obj = null;
    }
    else 
    {
        showSerial_obj = arguments[0];
    }
  
    // base year 
    if (arguments[1] == "" || arguments[1] == null)
    {
        showSerial_year = null;
    }
    else 
    {
        showSerial_year = arguments[1];
    }
  
  
    // base year 
    if (arguments[2] == "" || arguments[2] == null)
    {
        showSerial_closeScript = null;
    }
    else 
    {
        showSerial_closeScript = arguments[2];
    }

    var vWinCal = window.open("", "SerialWindow", "width=290,height=150,top=200,left=200");
    showSerial_build(vWinCal);
    vWinCal.focus();
}

function showSerial_setValue(value)
{
    if (showSerial_obj != null)
    {
        showSerial_obj.value = value;
    }
}

function showSerial_build(win)
{
    var vCode;
        
    vCode = ("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n");
    vCode = vCode + ("<html>\n");
    vCode = vCode + ("<head>\n");
    vCode = vCode + ("<title>차수입력</title>\n");
    vCode = vCode + ("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=euc-kr\">\n");
    vCode = vCode + ("<link rel=\"stylesheet\" href=\"/css/pub.css\" type=\"text/css\">\n");
    vCode = vCode + ("<script language=\"JavaScript\" type=\"text/JavaScript\">\n");
    vCode = vCode + ("<!--\n");
    vCode = vCode + ("var show_sequence_returnObj;\n");
    vCode = vCode + ("var show_sequence_firstItem;\n");
    vCode = vCode + ("var show_sequence_secondItem;\n");
    vCode = vCode + ("var show_sequence_firstItem_img;\n");
    vCode = vCode + ("var show_sequence_secondItem_img;\n");
    vCode = vCode + ("var show_sequence_firstItem_value;\n");
    vCode = vCode + ("var show_sequence_secondItem_value;\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("function MM_swapImgRestore() { //v3.0\n");
    vCode = vCode + ("  var i,x,a=document.MM_sr; \n");
    vCode = vCode + ("  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)\n");
    vCode = vCode + ("  {if(show_sequence_firstItem != x.id && show_sequence_secondItem != x.id)x.src=x.oSrc;}\n");
    vCode = vCode + ("}\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("function MM_preloadImages() { //v3.0\n");
    vCode = vCode + ("  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();\n");
    vCode = vCode + ("    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)\n");
    vCode = vCode + ("    if (a[i].indexOf(\"#\")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}\n");
    vCode = vCode + ("}\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("function MM_findObj(n, d) { //v4.01\n");
    vCode = vCode + ("  var p,i,x;  if(!d) d=document; if((p=n.indexOf(\"?\"))>0&&parent.frames.length) {\n");
    vCode = vCode + ("    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}\n");
    vCode = vCode + ("  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];\n");
    vCode = vCode + ("  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);\n");
    vCode = vCode + ("  if(!x && d.getElementById) x=d.getElementById(n); return x;\n");
    vCode = vCode + ("}\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("function MM_swapImage() { //v3.0\n");
    vCode = vCode + ("  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)\n");
    vCode = vCode + ("   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}\n");
    vCode = vCode + ("}\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("function itemSelected(id, order, img, value, srcimg)\n");
    vCode = vCode + ("{\n");
    vCode = vCode + ("    var previousId;\n");
    vCode = vCode + ("    var previousImg;\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    if (order == 1)\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        previousId = show_sequence_firstItem;\n");
    vCode = vCode + ("        previousImg = show_sequence_firstItem_img;\n");
    vCode = vCode + ("        \n");
    vCode = vCode + ("        show_sequence_firstItem = id;\n");
    vCode = vCode + ("        show_sequence_firstItem_img = srcimg;\n");
    vCode = vCode + ("        show_sequence_firstItem_value = value;\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    else if (order == 2)\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        previousId = show_sequence_secondItem;\n");
    vCode = vCode + ("        previousImg = show_sequence_secondItem_img;\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("        show_sequence_secondItem = id;\n");
    vCode = vCode + ("        show_sequence_secondItem_img = srcimg;\n");
    vCode = vCode + ("        show_sequence_secondItem_value = value;\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("    if (previousId != null && previousImg != null)\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        MM_swapImage(previousId,'',previousImg,1);\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("    MM_swapImage(id,'',img,1);\n");
    vCode = vCode + ("}\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("function yearChanged(type)\n");
    vCode = vCode + ("{\n");
    vCode = vCode + ("    if (type == 1)\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        var yearValue = year.innerText;\n");
    vCode = vCode + ("        year.innerText = yearValue - 1;\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    else \n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        var yearValue = year.innerText;\n");
    vCode = vCode + ("        year.innerText = eval(yearValue) + 1;\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("}\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("function closeSerial()\n");
    vCode = vCode + ("{\n");
    vCode = vCode + ("    if (show_sequence_firstItem_value == null)\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        alert('첫번째 자리를 입력하세요');\n");
    vCode = vCode + ("        return;\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    \n");
    vCode = vCode + ("    if (show_sequence_secondItem_value == null)\n");
    vCode = vCode + ("    {\n");
    vCode = vCode + ("        alert('두번째 자리를 입력하세요');\n");
    vCode = vCode + ("        return;\n");
    vCode = vCode + ("    }\n");
    vCode = vCode + ("    \n");

    // 값 셋팅
    if (showSerial_obj != null)
    {
        vCode = vCode + ("    window.opener.showSerial_setValue(year.innerText + \"-\" + show_sequence_firstItem_value + show_sequence_secondItem_value);\n");
    }

    // 확인 후에 표시될 자바스크립트
    if (showSerial_closeScript != null)
    {
        vCode = vCode + ("    window.opener." + showSerial_closeScript + ";\n");
    }

    vCode = vCode + ("    window.close();\n");
    vCode = vCode + ("}\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("//-->\n");
    vCode = vCode + ("</script>\n");
    vCode = vCode + ("</head>\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("<style>\n");
    vCode = vCode + ("table{font-family:\"Verdana\", \"Arial\", \"Helvetica\", \"sans-serif\";font-size:13px;};\n");
    vCode = vCode + ("</style>\n");
    vCode = vCode + ("\n");
    vCode = vCode + ("<body leftmargin=\"0\" topmargin=\"0\" onLoad=\"MM_preloadImages('/img/m000725img.gif','/img/m000711img.gif','/img/m000712img.gif','/img/m000713img.gif','/img/m000714img.gif','/img/m000715img.gif','/img/m000716img.gif','/img/m000717img.gif','/img/m000718img.gif','/img/m000719img.gif')\">\n");
    vCode = vCode + ("<table width=\"288\" height=\"140\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("  <tr>\n");
    vCode = vCode + ("    <td><table width=\"255\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("        <tr> \n");
    vCode = vCode + ("          <td height=\"29\" background=\"/img/m000700img.gif\"><table width=\"255\" height=\"29\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("              <tr>\n");
    vCode = vCode + ("                <td width=\"104\"><div align=\"center\"><font color=\"#FFFFFF\"><img src=\"/img/m000722img.gif\" width=\"17\" height=\"16\" align=\"absmiddle\" onClick=\"yearChanged(1)\" style=\"cursor:hand\">&nbsp;<strong id='year'>");
    
    // 해당 년도 표시
    if (showSerial_year != null)
    {
        vCode = vCode + showSerial_year;
    }
    else
    {
        // 자바스크립트로 해당 년도 구하는 것.
        var now = new Date();
        vCode = vCode + now.getYear();
    }

    vCode = vCode + ("</strong>&nbsp;<img src=\"/img/m000723img.gif\" width=\"17\" height=\"16\" align=\"absmiddle\" onClick=\"yearChanged(2)\" style=\"cursor:hand\"></font></div></td>\n");
    vCode = vCode + ("                <td width=\"151\"><div align=\"right\"><img src=\"/img/m000721img.gif\" width=\"57\" height=\"19\" style=\"cursor:hand\" onClick=\"closeSerial()\"></div></td>\n");
    vCode = vCode + ("              </tr>\n");
    vCode = vCode + ("            </table></td>\n");
    vCode = vCode + ("        </tr>\n");
    vCode = vCode + ("        <tr> \n");
    vCode = vCode + ("          <td><table width=\"255\" border=\"0\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"#0066CC\">\n");
    vCode = vCode + ("              <tr>\n");
    vCode = vCode + ("                <td bgcolor=\"#336699\"><table width=\"100%\" height=\"84\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("                    <tr> \n");
    vCode = vCode + ("                      <td bgcolor=\"#F4f4f4\"> \n");
    vCode = vCode + ("                        <table width=\"198\" border=\"0\" align=\"center\" cellpadding=\"2\" cellspacing=\"0\">\n");
    vCode = vCode + ("                          <tr>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image0','','/img/m000725img.gif',1)\"><img src=\"/img/m000726img.gif\" name=\"Image0\" id=\"Image0\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image0', 1, '/img/m000725img.gif', 0, '/img/m000726img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image1','','/img/m000711img.gif',1)\"><img src=\"/img/m000701img.gif\" name=\"Image1\" id=\"Image1\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image1', 1, '/img/m000711img.gif', 1, '/img/m000701img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image2','','/img/m000712img.gif',1)\"><img src=\"/img/m000702img.gif\" name=\"Image2\" id=\"Image2\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image2', 1, '/img/m000712img.gif', 2, '/img/m000702img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image3','','/img/m000713img.gif',1)\"><img src=\"/img/m000703img.gif\" name=\"Image3\" id=\"Image3\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image3', 1, '/img/m000713img.gif', 3, '/img/m000703img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image4','','/img/m000714img.gif',1)\"><img src=\"/img/m000704img.gif\" name=\"Image4\" id=\"Image4\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image4', 1, '/img/m000714img.gif', 4, '/img/m000704img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image5','','/img/m000715img.gif',1)\"><img src=\"/img/m000705img.gif\" name=\"Image5\" id=\"Image5\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image5', 1, '/img/m000715img.gif', 5, '/img/m000705img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image6','','/img/m000716img.gif',1)\"><img src=\"/img/m000706img.gif\" name=\"Image6\" id=\"Image6\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image6', 1, '/img/m000716img.gif', 6, '/img/m000706img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image7','','/img/m000717img.gif',1)\"><img src=\"/img/m000707img.gif\" name=\"Image7\" id=\"Image7\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image7', 1, '/img/m000717img.gif', 7, '/img/m000707img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image8','','/img/m000718img.gif',1)\"><img src=\"/img/m000708img.gif\" name=\"Image8\" id=\"Image8\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image8', 1, '/img/m000718img.gif', 8, '/img/m000708img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image9','','/img/m000719img.gif',1)\"><img src=\"/img/m000709img.gif\" name=\"Image9\" id=\"Image9\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image9', 1, '/img/m000719img.gif', 9, '/img/m000709img.gif')\"></a></td>\n");
    vCode = vCode + ("                          </tr>\n");
    vCode = vCode + ("                        </table></td>\n");
    vCode = vCode + ("                    </tr>\n");
    vCode = vCode + ("                    <tr> \n");
    vCode = vCode + ("                      <td bgcolor=\"#F4f4f4\"> \n");
    vCode = vCode + ("                        <table width=\"230\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">\n");
    vCode = vCode + ("                          <tr>\n");
    vCode = vCode + ("                            <td background=\"/img/m000720img.gif\"><img src=\"/img/m000720img.gif\" width=\"4\" height=\"1\"></td>\n");
    vCode = vCode + ("                          </tr>\n");
    vCode = vCode + ("                        </table></td>\n");
    vCode = vCode + ("                    </tr>\n");
    vCode = vCode + ("                    <tr> \n");
    vCode = vCode + ("                      <td bgcolor=\"#F4f4f4\"> \n");
    vCode = vCode + ("                        <table width=\"198\" border=\"0\" align=\"center\" cellpadding=\"2\" cellspacing=\"0\">\n");
    vCode = vCode + ("                          <tr> \n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image01','','/img/m000725img.gif',1)\"><img src=\"/img/m000726img.gif\" name=\"Image01\" id=\"Image01\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image01', 2, '/img/m000725img.gif', 0, '/img/m000726img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image11','','/img/m000711img.gif',1)\"><img src=\"/img/m000701img.gif\" name=\"Image11\" id=\"Image11\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image11', 2, '/img/m000711img.gif', 1, '/img/m000701img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image21','','/img/m000712img.gif',1)\"><img src=\"/img/m000702img.gif\" name=\"Image21\" id=\"Image21\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image21', 2, '/img/m000712img.gif', 2, '/img/m000702img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image31','','/img/m000713img.gif',1)\"><img src=\"/img/m000703img.gif\" name=\"Image31\" id=\"Image31\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image31', 2, '/img/m000713img.gif', 3, '/img/m000703img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image41','','/img/m000714img.gif',1)\"><img src=\"/img/m000704img.gif\" name=\"Image41\" id=\"Image41\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image41', 2, '/img/m000714img.gif', 4, '/img/m000704img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image51','','/img/m000715img.gif',1)\"><img src=\"/img/m000705img.gif\" name=\"Image51\" id=\"Image51\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image51', 2, '/img/m000715img.gif', 5, '/img/m000705img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image61','','/img/m000716img.gif',1)\"><img src=\"/img/m000706img.gif\" name=\"Image61\" id=\"Image61\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image61', 2, '/img/m000716img.gif', 6, '/img/m000706img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image71','','/img/m000717img.gif',1)\"><img src=\"/img/m000707img.gif\" name=\"Image71\" id=\"Image71\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image71', 2, '/img/m000717img.gif', 7, '/img/m000707img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image81','','/img/m000718img.gif',1)\"><img src=\"/img/m000708img.gif\" name=\"Image81\" id=\"Image81\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image81', 2, '/img/m000718img.gif', 8, '/img/m000708img.gif')\"></a></td>\n");
    vCode = vCode + ("                            <td><a href=\"#\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('Image91','','/img/m000719img.gif',1)\"><img src=\"/img/m000709img.gif\" name=\"Image91\" id=\"Image91\" width=\"22\" height=\"22\" border=\"0\" onClick=\"itemSelected('Image91', 2, '/img/m000719img.gif', 9, '/img/m000709img.gif')\"></a></td>\n");
    vCode = vCode + ("                          </tr>\n");
    vCode = vCode + ("                        </table></td>\n");
    vCode = vCode + ("                    </tr>\n");
    vCode = vCode + ("                  </table></td>\n");
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