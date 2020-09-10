/*==============================================================================
*Copyright(c) 2003 POSCO/POSDATA
*
*@ProcessChain : Reuse
*
*@File        : showCalendar.js
*
*@FileName : showCalendar
*
*Open Issues :			 
*
*Change history 
*@LastModifyDate : 20050408
*@Author            : 강정미
*@LastModifier      : 남광현
*@LastVersion       : 1.29
*
*    2003-05-16   강정미
*        Draft1A  최초 생성
*    2003-05-22   강정미
*        1.0      배포
*    2003-06-23   정영훈
*        1.1      메소드의 2개의 달력스크린 출력 후 시간출력 설정했을 때
*                 년, 월을 변경하면 시간이 일관성있게 출력되지 않던 부분을 수정
*    2003-06-30   정영훈
*		 1.20     image경로 재설정(/img)
*    2003-07-14   정영훈
*        1.21     close시 main의 script를 호출하는 기능 추가,
*                 달력1개 출력시에 닫기버튼 삭제, 날짜선택 하자마자 close되도록 수정,
*                 달력2개 출력시는 닫기버튼을 클릭할때만 close됨.
*    2003-09-02   김동호
*		 1.22     close flag 셋팅.
*    2003-09-21   정창호
*		 1.23     해당 년과 달을 display함.
*    2003-09-26   정창호
*		 1.24     확인버튼 기능추가
*                 달력1개 출력시에 확인버튼이 존재하면 확인버튼 클릭시 선택된 날짜를 textbox에 set하도록 수정.
*                 (확인버튼이 있다면 날짜와 시간 중 클릭하는 순서와 상관없이 날짜 선택 가능)
*		          해당 시와 분을 display함.
*    2003-10-01   정창호
*		 1.25     null check -없으면 현재 날짜,시간을 보여줌 (2003-10-01 15:00)
*    2003-11-26   정창호
*		 1.26     checkbox 안보이게 하는 기능 추가 (2003-11-26 18:00)
*                 FromTo달력 6칸으로 고정(2003-11-26 18:00)
*    2003-12-17   김동호
*		 1.26     formatDate2 메소드 수정.
*    2004-02-02   정창호
*		 1.26     close script 두번 호출 오류 수정.(2004-02-02 18:00)
*    2004-07-21   남광현
*        1.27     맨위 출력 focusing 적용
*    2004-09-13   남광현
*        1.28     SCR #4658 showCalendar 시간 변경시 날짜 적용되도록 수정
*    2005-04-08   남광현
*        1.29     SCR #14562 showPoscoCalendar 위해 Format 추가
*==============================================================================*/

var weekend = [0];
var weekend2 = [6];
//종합반영
var closeScript="";
var modal="";
var checkDate="";
var weekendColor = "#FFE1E2";
var fontface = "arial";
var fontsize = "9pt";

var gNow = new Date();
var ggWinCal;
var gCal, gCal2;

var showCalendar_close_flag;


var	second_p_year;
var	second_p_month;

Calendar.Months = ["1 월", "2 월", "3 월", "4 월", "5 월", "6 월", "7 월", "8 월", "9 월", "10 월", "11 월", "12 월"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
* 칼렌더 객체 생성하기
* @param  p_item   부모창에 날짜값을 입력해줄 input tag의 name, 
*		  p_WinCal 팝업창 객체,
*		  p_month  선택한 달, 
*		  p_year   선택한 년도, 
*		  p_format 날짜포맷형식, 				
*		  p_many	 보여줄 달력 갯수, 				
*		  hh_sel   선택한 시간, 
*		  mi_sel   선택한 분, 
*		  p_time   디폴트로 시/분/초를 보여줄 것인지의 여부
*/
function Calendar(p_item, p_WinCal, p_month, p_year, p_format, p_many, hh_sel, mi_sel, p_time,isCheckbox, p_defaultTime) {
	this.gYear				= p_year;
	this.gFormat			= p_format;
    this.gBGColor			= "gray";
	this.gFGColor			= "black";
	this.gTextColor		    = "black";
	this.gHeaderColor       = "black";
	this.gReturnItem	    = p_item;	
	this.checkValue         = false;
	this.vCode1		        = "";
	this.defaultTime        = p_defaultTime;

	this.prevMMYYYY ;
	this.prevMM 		;
	this.prevYYYY   ;

	this.nextMMYYYY ;
	this.nextMM 		;
	this.nextYYYY 	;
	
	this.ghh_sel    ;
	this.gmi_sel    ;



/**
* 숫자또는 문자값으로 입력한 월을 "1월,2월,,,," 문자열 값을 리턴해주는 메소드
* @param  monthNo 선택한 달 인덱스
*/
	this.getMonth = function(monthNo) {
		return Calendar.Months[monthNo];
	}

/**
* 달력 객체를 생성하기 위해서 초기화해주는 초기화메소드
* @param  objName  생성한 달력객체,  
*         p_item   부모창에 날짜값을 입력해줄 input tag의 name, 
*         p_WinCal 팝업창 객체,
*         p_month  선택한 달, 
*         p_year   선택한 년도, 
*         p_format 날짜포맷형식, 				  
*         hh_sel   선택한 시간, 
*         mi_sel   선택한 분, 
*         p_time   디폴트로 시/분/초를 보여줄 것인지의 여부
*/
  this.init = function(p_item, p_WinCal, p_month, p_year, p_format, hh_sel, mi_sel, p_time){
		if ((p_month == null) && (p_year == null))  return;

		if (p_WinCal == null) {
			this.gWinCal = ggWinCal;
		}else {
			this.gWinCal = p_WinCal;
		}

		if (hh_sel == null) {
			this.ghh_sel = null;
		}else {
			this.ghh_sel = hh_sel;
		}

		if (p_year == null) {
			this.gYear = null;
		}else {
			this.gYear = p_year;
		}

		if (mi_sel == null) {
			this.gmi_sel = null;
		}else {
			this.gmi_sel = mi_sel;
		}

		if(p_time){			
			this.checkValue = true;
		}else{
			this.checkValue = false;
		}

		if (p_month == null) {
			this.gMonthName = null;
			this.gMonth = null;
			this.gYearly = true;
			
		} else {			
			this.gMonth = new Number(p_month);
			//3.1
			this.gMonthName = this.getMonth(this.gMonth);
			this.gYearly = false;
		}
		
		this.vCode1 = "";
	}

/**
* 날짜 포맷을 지정해준다
* @param  p_day 선택한 날
*/
  this.formatData = function(p_day) {
    var vData;
    var vMonth = 1 + this.gMonth;
    vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
    var vMon = this.getMonth(this.gMonth).substr(0,3).toUpperCase();
    var vFMon = this.getMonth(this.gMonth).toUpperCase();
    var vY4 = new String(this.gYear);
    var vY2 = new String(this.gYear.substr(2,2));
    var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;
  
    switch (this.gFormat) { 
      case "YYYY" :
        vData = vY4 ;
        break;  
		  case "YYYY-MM" :
        vData = vY4 + "-" + vMonth ;
        break;
			case "YYYYMMDD" :
        vData = vY4 + vMonth + vDD;
        break;	        
			case "YYYY-MM-DD" :
        vData = vY4 + "-" + vMonth + "-" + vDD;
        break;	
			case "YYYY-MM-DD HH" :
        vData = vY4 + "-" + vMonth + "-" + vDD +" HH";
        break;	
			case "YYYY-MM-DD HH:mm" :
        vData = vY4 + "-" + vMonth + "-" + vDD +" HH:mm";
        break;	
			case "YYYY-MM-DD HH:mm:SS" :
        vData = vY4 + "-" + vMonth + "-" + vDD +" HH:mm:SS";
        break;	
      default :
        vData = vY4 + "-" + vMonth + "-" + vDD;
    }
  
    return vData;
	}
		
/**
* 오늘 날짜에 대해서 #FF686C 색으로 
* @param  vday 선택한 날
*/
	this.formatDay = function(vday) {
    var vNowDay   = gNow.getDate();
    var vNowMonth = gNow.getMonth();
    var vNowYear  = gNow.getFullYear();
  
    if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear) {
      return ("<FONT COLOR=\'#FF686C\'>" + vday + "</FONT>");
    }else {
      return (vday);
		}
  }  
  
  this.writeWeekendString = function(vday) {
    var i;
  
    // Return special formatting for the weekend day.
    for (i=0; i<weekend.length; i++) {
        if ((vday == weekend[i])||(vday == weekend2[i])) {
            return (" BGCOLOR=\"" + weekendColor + "\"");
	    }
    }    
    return "";
  }

/**
* 윤년 계산 로직
* @param  monthNo 선택한 달, p_year 선택한 년도	  
*/
  this.getDaysOfMonth = function(monthNo, p_year) {
		if ((p_year % 4) == 0) {
			if ((p_year % 100) == 0 && (p_year % 400) != 0){
				return Calendar.DOMonth[monthNo];
			}
			return Calendar.lDOMonth[monthNo];

		} else
			return Calendar.DOMonth[monthNo];
	}

/**
* 다음 년또는 다음 월 그리고 이전 년도 또는 이전 월을 보여주기 위한 계산 로직
* @param  p_Month 선택한 달, p_Year 선택한 년도, incr 증가 또는 감소		  
*/
	this.calcMonthYear = function(p_Month, p_Year, incr) { 
		var ret_arr = new Array();
		
		if (incr == -1) {
			// B A C K W A R D
			if (p_Month == 0) {
				ret_arr[0] = 11;
				ret_arr[1] = parseInt(p_Year) - 1;
			}
			else {
				ret_arr[0] = parseInt(p_Month) - 1;
				ret_arr[1] = parseInt(p_Year);
			}
		} else if (incr == 1) {
			// F O R W A R D
			if (p_Month == 11) {
				ret_arr[0] = 0;
				ret_arr[1] = parseInt(p_Year) + 1;
			}
			else {
				ret_arr[0] = parseInt(p_Month) + 1;
				ret_arr[1] = parseInt(p_Year);
			}
		}		
		return ret_arr;
	}
/**
* 달력을 팝업창에서 그려주기 위한 메소드
* @param  objName 객체이름, p_many 보여줄 달력의 갯수, timeObj 2개의 달력일 경우 상대달력객체의 이름		  
*/
	this.show = function(objName, p_many, timeObj ,mm,yy, isCheckbox) {		
			prevMMYYYY		= this.calcMonthYear( this.gMonth, this.gYear, -1);			
			this.prevMM 	= prevMMYYYY[0];			
			this.prevYYYY = prevMMYYYY[1];

			nextMMYYYY		= this.calcMonthYear( this.gMonth, this.gYear, 1);
			this.nextMM 	= nextMMYYYY[0];
			this.nextYYYY = nextMMYYYY[1];


			this.vCode1 = this.vCode1 + ("<td valign=top>\n");	
			this.vCode1 = this.vCode1 + ("<div align=center><FONT FACE='" + fontface +
														   		 "' SIZE=3><B>\n");
            this.vCode1 = this.vCode1 + ("<span class=bigfont>  "   );														   		 
			this.vCode1 = this.vCode1 + (this.gYear + " 년 " + this.gMonthName);		
			this.vCode1 = this.vCode1 + ("</B></FONT></div><P>\n");
			this.vCode1 = this.vCode1 + ("</span>"   );		
			this.vCode1 = this.vCode1 + ("<TABLE WIDTH='100%' BORDER=0 CELLSPACING=0 CELLPADDING=0 ALIGN='CENTER'>\n<TR>\n<TD ALIGN=center>\n");			
			
			/* 2개짜리 달력을 위해 build 메소드 flag 추가. (2003-09-22 20:00) */           
			if(p_many == 2){ 
			    if(isCheckbox=="true")
			    {
				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
											"javascript:window.opener.build('" + objName + 
											"', '" + this.gReturnItem + "', '" + this.gMonth + "', '" +
											(parseInt(this.gYear)-1) + "', '" + this.gFormat + "', '" + 
											this.gReturnItem + "', " + p_many + ", document." + timeObj +
											"Form1." + timeObj +"_hh_sel.value , document." + timeObj +
											"Form1." + timeObj +"_mi_sel.value, "+ this.checkValue +", false,true,"+isCheckbox+");" +
											"\"><IMG SRC='/img/m000801img.gif' BORDER=0><\/A></TD><TD ALIGN=center>\n");
				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
											"javascript:window.opener.build('" + objName +
											"', '" + this.gReturnItem + "', '" + this.prevMM + "', '" + this.prevYYYY + "', '" 
											+ this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
											", document." + timeObj +"Form1." + timeObj +"_hh_sel.value , document." + 
											timeObj +"Form1." + timeObj +"_mi_sel.value, "+ this.checkValue +", false,true,"+isCheckbox+");" +
											"\"><IMG SRC='/img/m000802img.gif' BORDER=0><\/A></TD><TD ALIGN=center>\n");				
				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
											"javascript:window.opener.build('" + objName +
											"', '" + this.gReturnItem + "', '" + this.nextMM + "', '" + this.nextYYYY + "', '" 
											+ this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
											", document." + timeObj +"Form1." + timeObj +"_hh_sel.value, document." + 
											timeObj +"Form1." + timeObj +"_mi_sel.value, "+ this.checkValue +", false,true,"+isCheckbox+");" +
											"\"><IMG SRC='/img/m000803img.gif' BORDER=0><\/A></TD><TD ALIGN=center>\n");				
				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
											"javascript:window.opener.build('" + objName +
											"', '" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) 
											+ "', '" + this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
											", document." + timeObj +"Form1." + timeObj +"_hh_sel.value, document." + 
											timeObj +"Form1." + timeObj +"_mi_sel.value, "+ this.checkValue +", false,true,"+isCheckbox+");" +
											"\"><IMG SRC='/img/m000804img.gif' BORDER=0><\/A></TD></TR></TABLE><BR>\n");
              }
              else 
              {
				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
											"javascript:window.opener.build('" + objName + 
											"', '" + this.gReturnItem + "', '" + this.gMonth + "', '" +
											(parseInt(this.gYear)-1) + "', '" + this.gFormat + "', '" + 
											this.gReturnItem + "', " + p_many + ", '' , '', "+ this.checkValue +", false,true,"+isCheckbox+");" +
											"\"><IMG SRC='/img/m000801img.gif' BORDER=0 >  <\/A></TD><TD ALIGN=center>\n");
				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
											"javascript:window.opener.build('" + objName +
											"', '" + this.gReturnItem + "', '" + this.prevMM + "', '" + this.prevYYYY + "', '" 
											+ this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
											",  '' , '', "+ this.checkValue +", false,true,"+isCheckbox+");" +
											"\"><IMG SRC='/img/m000802img.gif' BORDER=0><\/A></TD><TD ALIGN=center>\n");				
				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
											"javascript:window.opener.build('" + objName +
											"', '" + this.gReturnItem + "', '" + this.nextMM + "', '" + this.nextYYYY + "', '" 
											+ this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
											",  '' , '', "+ this.checkValue +", false,true,"+isCheckbox+");" +
											"\"><IMG SRC='/img/m000803img.gif' BORDER=0><\/A></TD><TD ALIGN=center>\n");				
				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
											"javascript:window.opener.build('" + objName +
											"', '" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) 
											+ "', '" + this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
											", '' , '', "+ this.checkValue +", false,true,"+isCheckbox+");" +
											"\"><IMG SRC='/img/m000804img.gif' BORDER=0><\/A></TD></TR></TABLE><BR>\n");
                
                
              }

			}
			else{ 
			    if(isCheckbox=="true")
			    {
    				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
    											"javascript:window.opener.build('" + objName +
    											"', '" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) 
    											+ "', '" + this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
    											", document." + objName +"Form1." + objName +"_hh_sel.value, document." + 
    											objName +"Form1." + objName +"_mi_sel.value, "+ this.checkValue +", false,'',"+isCheckbox+");" +
    											"\"><IMG SRC='/img/m000801img.gif' BORDER=0><\/A></TD><TD ALIGN=center>");
    				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
    											"javascript:window.opener.build('" + objName +
    											"', '" + this.gReturnItem + "', '" + this.prevMM + "', '" + this.prevYYYY + "', '" 
    											+ this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
    											", document." + objName +"Form1." + objName +"_hh_sel.value, document." + 
    											objName +"Form1." + objName +"_mi_sel.value, "+ this.checkValue+ ", false,'',"+isCheckbox+");" +
    											"\"><IMG SRC='/img/m000802img.gif' BORDER=0><\/A></TD><TD ALIGN=center>");
    				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
    											"javascript:window.opener.build('" + objName +
    											"', '" + this.gReturnItem + "', '" + this.nextMM + "', '" + this.nextYYYY + "', '" 
    											+ this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
    											", document." + objName +"Form1." + objName +"_hh_sel.value, document." + 
    											objName +"Form1." + objName +"_mi_sel.value, "+ this.checkValue +", false,'',"+isCheckbox+");" +
    											"\"><IMG SRC='/img/m000803img.gif' BORDER=0><\/A></TD><TD ALIGN=center>");
    				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
    											"javascript:window.opener.build('" + objName +
    											"', '" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) 
    											+ "', '" + this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
    											", document." + objName +"Form1." + objName +"_hh_sel.value, document." + 
    											objName +"Form1." + objName +"_mi_sel.value, "+ this.checkValue +", false,'',"+isCheckbox+");" +
    											"\"><IMG SRC='/img/m000804img.gif' BORDER=0><\/A></TD></TR></TABLE><BR>");
			    }
			    else
			    {
    				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
    											"javascript:window.opener.build('" + objName +
    											"', '" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) 
    											+ "', '" + this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
    											", '', '', "+ this.checkValue +", false,'',"+isCheckbox+");" +
    											"\"><IMG SRC='/img/m000801img.gif' BORDER=0><\/A></TD><TD ALIGN=center>");
    				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
    											"javascript:window.opener.build('" + objName +
    											"', '" + this.gReturnItem + "', '" + this.prevMM + "', '" + this.prevYYYY + "', '" 
    											+ this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
    											", '', '', "+ this.checkValue+ ", false,'',"+isCheckbox+");" +
    											"\"><IMG SRC='/img/m000802img.gif' BORDER=0><\/A></TD><TD ALIGN=center>");
    				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
    											"javascript:window.opener.build('" + objName +
    											"', '" + this.gReturnItem + "', '" + this.nextMM + "', '" + this.nextYYYY + "', '" 
    											+ this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
    											", '', '', "+ this.checkValue +", false,'',"+isCheckbox+");" +
    											"\"><IMG SRC='/img/m000803img.gif' BORDER=0><\/A></TD><TD ALIGN=center>");
    				this.vCode1 = this.vCode1 + ("<A HREF=\"" +
    											"javascript:window.opener.build('" + objName +
    											"', '" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) 
    											+ "', '" + this.gFormat + "', '" + this.gReturnItem + "', " + p_many + 
    											", '', '',"+ this.checkValue +", false,'',"+isCheckbox+");" +
    											"\"><IMG SRC='/img/m000804img.gif' BORDER=0><\/A></TD></TR></TABLE><BR>");


                }		
	}
			this.vCode1 = this.vCode1 + "<TABLE ALIGN='CENTER' BORDER=0 CELLSPACING=1 CELLPADDING=2 BGCOLOR=\"" + this.gBGColor + "\">\n";
			this.vCode1 = this.vCode1 + "<TR>\n";
			this.vCode1 = this.vCode1 + "<TD WIDTH='14%' ALIGN='CENTER' BGCOLOR='#FFB0B3'><FONT FACE COLOR='#D80309'>&nbsp;일&nbsp;</FONT></TD>\n";
			this.vCode1 = this.vCode1 + "<TD WIDTH='14%' ALIGN='CENTER' BGCOLOR='#E2E0D8'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'>&nbsp;월&nbsp;</FONT></TD>\n";
			this.vCode1 = this.vCode1 + "<TD WIDTH='14%' ALIGN='CENTER' BGCOLOR='#E2E0D8'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'>&nbsp;화&nbsp;</FONT></TD>\n";
			this.vCode1 = this.vCode1 + "<TD WIDTH='14%' ALIGN='CENTER' BGCOLOR='#E2E0D8'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'>&nbsp;수&nbsp;</FONT></TD>\n";
			this.vCode1 = this.vCode1 + "<TD WIDTH='14%' ALIGN='CENTER' BGCOLOR='#E2E0D8'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'>&nbsp;목&nbsp;</FONT></TD>\n";
			this.vCode1 = this.vCode1 + "<TD WIDTH='14%' ALIGN='CENTER' BGCOLOR='#E2E0D8'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'>&nbsp;금&nbsp;</FONT></TD>\n";
			this.vCode1 = this.vCode1 + "<TD WIDTH='16%' ALIGN='CENTER' BGCOLOR='#FFB0B3'><FONT FACE COLOR='#D80309'>&nbsp;토&nbsp;</FONT></TD>\n";
			this.vCode1 = this.vCode1 + "</TR>\n";			
			var vDate = new Date();
			vDate.setDate(1);
			vDate.setMonth(this.gMonth);
			vDate.setFullYear(this.gYear);

			//Returns the day of the week for the specified date 
			//according to local time.
			var vFirstDay=vDate.getDay(); 
			var vDay=1;
			var vLastDay=this.getDaysOfMonth(this.gMonth, this.gYear);//10.
			var vOnLastDay=0;
			
			//****
			var rowCnt=1;
			
			this.vCode1 = this.vCode1 + "<TR BGCOLOR='#F4F3F0' ALIGN='CENTER'>\n";
			for (i=0; i<vFirstDay; i++) {
				this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(i) + 
											"><FONT FACE='" + fontface + "'> </FONT></TD>\n";

			}

			// Write rest of the 1st week
			for (j=vFirstDay; j<7; j++)
            {
                    this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(j) + 
                                                "><FONT FACE='" + fontface + "'>\n" + 
                                                "<A HREF='#' " ;
/* 1개짜리 달력에 확인 버튼이 있다면 클릭한 날짜를 전역변수에 저장, 날짜와 시간의 순서에 상관없이 
* 확인버튼 클릭시 날짜를 set 하도록 함(2003-09-26 12:00) */           
                    if(p_many == '1' && showCalendar_close_flag == "true" ) 
                    {
                        this.vCode1 = this.vCode1 + "onClick=\"javascript : setVdayMethod('"+this.formatData(vDay)+"');"; 
                    } 
                    else
                    {
                        if(p_many == '2' && objName =='gCal2')
                        {
                                this.vCode1 = this.vCode1 + "onClick=\"javascript : setVdayMethod2('"+this.formatData(vDay)+"'); clickCalendar1('"+this.gReturnItem+"','"+checkStr+"','"+objName+"','"+check+"', '"+p_many+"', '"+"'"+",'close','"+isCheckbox+"');";
                        }
                        else
                        {
                                this.vCode1 = this.vCode1 + "onClick=\"javascript : setVdayMethod('"+this.formatData(vDay)+"'); clickCalendar1('"+this.gReturnItem+"','"+checkStr+"','"+objName+"','"+check+"', '"+p_many+"', '"+"'"+",'close','"+isCheckbox+"');";
                        }
                    }
                
/* 확인 버튼이 없는 1개짜리 달력의 경우 날짜를 클릭하면 window close(2003-09-26 12:00) 
 * 주석 처리 (2004-02-02 )
 */           
                    this.vCode1 = this.vCode1 + "\">" + this.formatDay(vDay) + "</A></FONT></TD>\n";
                    vDay=vDay + 1;
            }
            this.vCode1 = this.vCode1 + "</TR>\n";

			// Write the rest of the weeks
			for (k=2; k<7; k++)
            {
                    this.vCode1 = this.vCode1 + "<TR BGCOLOR='#F4F3F0' ALIGN='CENTER'>\n";

                    for (j=0; j<7; j++) 
                    {				
                            this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(j) + 
                                                        "><FONT FACE='" + fontface + "'>\n" + 
                                                        "<A HREF='#' " ;
    /* 1개짜리 달력에 확인 버튼이 있다면 클릭한 날짜를 전역변수에 저장, 날짜와 시간의 순서에 상관없이 
    * 확인버튼 클릭시 날짜를 set 하도록 함(2003-09-26 12:00) */           
                            if(p_many == '1' && showCalendar_close_flag == "true" ) 
                            {
                                this.vCode1 = this.vCode1 + "onClick=\"javascript : setVdayMethod('"+this.formatData(vDay)+"');"; 
                            } 
                            else
                            {
                                if(p_many == '2' && objName =='gCal2')
                                {
                                        this.vCode1 = this.vCode1 + "onClick=\"javascript : setVdayMethod2('"+this.formatData(vDay)+"'); clickCalendar1('"+this.gReturnItem+"','"+checkStr+"','"+objName+"','"+check+"', '"+p_many+"', '"+"'"+",'close','"+isCheckbox+"');";
                                }
                                else
                                {
                                        this.vCode1 = this.vCode1 + "onClick=\"javascript : setVdayMethod('"+this.formatData(vDay)+"'); clickCalendar1('"+this.gReturnItem+"','"+checkStr+"','"+objName+"','"+check+"', '"+p_many+"', '"+"'"+",'close','"+isCheckbox+"');";
                                }                            
                            }

    /* 확인 버튼이 없는 1개짜리 달력의 경우 날짜를 클릭하면 window close(2003-09-26 12:00)
     * 주석 처리 (2004-02-02 )
    */                   
                            this.vCode1 = this.vCode1 + "\">" + this.formatDay(vDay) + "</A></FONT></TD>\n";
                            vDay=vDay + 1;

                            if (vDay > vLastDay)
                            {
                                    vOnLastDay = 1;
                                    break;
                            }
                        }
				if (j == 6)
					this.vCode1 = this.vCode1 + "</TR>\n";
					rowCnt++;
				if (vOnLastDay == 1)
					break;
			 }
			
			if(rowCnt == 5 )
			{
    			for (m=1; m<(14-j); m++) {
    				if(j+m<7)
    				{
        				if (this.gYearly) {
        					this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(j+m) + 
        						"><FONT FACE='" + fontface + "' COLOR='gray'> </FONT></TD>\n";
        				}else {
        					this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(j+m) + 
        						"><FONT FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>\n";
        				}
    		    	}
    		    	else{
        				if (this.gYearly) {
        					this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(j+m) + 
        						"><FONT FACE='" + fontface + "' COLOR='gray'>&nbsp;</FONT></TD>\n";
        				}else {
        					this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(j+m) + 
        						"><FONT FACE='" + fontface + "' COLOR='gray'>&nbsp;</FONT></TD>\n";
        				}
    		    	
    		    }
				if (j+m == 6)
				{	this.vCode1 = this.vCode1 + "</TR>\n";
                    this.vCode1 = this.vCode1 + "<TR BGCOLOR='white' ALIGN='CENTER'>\n";
                }

    			}
			}
			
			else if(rowCnt == 6)
			{
    			// Fill up the rest of last week with proper blanks, so that we get proper square blocks
    			for (m=1; m<(7-j); m++) {
    				if (this.gYearly) {
    					this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(j+m) + 
    						"><FONT FACE='" + fontface + "' COLOR='gray'> </FONT></TD>\n";
    				}else {
    					this.vCode1 = this.vCode1 + "<TD WIDTH='14%'" + this.writeWeekendString(j+m) + 
    						"><FONT FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>\n";
    				}
    			}
		    }
		
			this.vCode1 = this.vCode1 + "</TABLE>\n";	
			this.vCode1 = this.vCode1 + "<FORM name=\""+objName+"Form1\">\n";	
			this.vCode1 = this.vCode1 + "<TABLE ALIGN='CENTER' BORDER=0 CELLSPACING=1 CELLPADDING=2 BGCOLOR='#FFFFFF'>\n";	
			this.vCode1 = this.vCode1 + "<TR>\n";	
			this.vCode1 = this.vCode1 + "<TD>\n";	
            //timeObj 상대 칼런더 객체이름			
			if(this.ghh_sel == null || this.ghh_sel=='' ){
				var nowTime = new Date();
				var hh = nowTime.getHours();
				var mi = nowTime.getMinutes();
				cCode = this.clock(objName, hh, mi, this.gReturnItem, this.defaultTime);
				this.vCode1 = this.vCode1 + (cCode);

			}else {
				var hh = this.ghh_sel;
				var mi = this.gmi_sel;
				cCode = this.clock(objName, hh, mi, this.gReturnItem, this.defaultTime);
				this.vCode1 = this.vCode1 + (cCode);
			}
		
	
			this.vCode1 = this.vCode1 + "</TD>\n";	
			this.vCode1 = this.vCode1 + "</TR>\n";
			this.vCode1 = this.vCode1 + "</TABLE>\n";	
			this.vCode1 = this.vCode1 + "</FORM>\n";	
		
			if(p_many == 2){
				this.vCode1 = this.vCode1 + ("</TD>\n");
			}	
			
	}

	this.init(p_item, p_WinCal, p_month, p_year, p_format, hh_sel, mi_sel, p_time);	
}

/**
* 시/분/초를 출력해 주기 위한 메소드
* @param  objName 객체이름, hh 시간, hh 분				  
*/
Calendar.prototype.clock = function(objName, hh, mi, returnItem, defaultTime) {
  var vCode = "";
  var nowTime = new Date();
    
	if(this.checkValue){
		vCode = vCode + "<div align=left id=\""+objName+"Time\" style=\"display:\"\"\">\n ";
	}else{
		vCode = vCode + "<div align=left id=\""+objName+"Time\" style=\"display:none\">\n ";
	}
	vCode = vCode + "	<select name=\""+ objName +"_hh_sel\" onChange=\"javascript : clickCalendar1('"+returnItem+"','"+checkStr+"','"+objName+"','"+check+"', '"+p_many+"', '"+"'"+",'close','"+isCheckbox+"','"+defaultTime+"');\"; style='border-width:1px; background-color:#5b90bf; border-color:#404040;font:10px;color:white; text-align: left;'>\n";
  for(i=0; i<24; i++){
    if(hh == i){
			if(i<10) {
				vCode = vCode + "<option selected value=\"0" + i + "\">";
			}else {
				vCode = vCode + "<option selected value=\"" + i + "\">";
			}
		}else{
			if(i<10) {
				vCode = vCode + "<option value=\"0" + i + "\">";
			}else {
				vCode = vCode + "<option value=\"" + i + "\">";
			}
		}
		if(i<10) {
			vCode = vCode + "0" + i + "</option>\n";
		}else {
			vCode = vCode + i + "</option>\n";
		}
	}
	vCode = vCode + "</select> <font style='font:11px'>시</font>";
  
	vCode = vCode + " <select name=\""+ objName +"_mi_sel\" onChange=\"javascript : clickCalendar1('"+returnItem+"','"+checkStr+"','"+objName+"','"+check+"', '"+p_many+"', '"+"'"+",'close','"+isCheckbox+"','"+defaultTime+"');\"; style='border-width:1px; background-color:#5b90bf; border-color:#404040;font:10px;color:white; text-align: left;'>\n";
	for(i=0; i<60; i++){
		if(mi == i){
			if(i<10){
				vCode = vCode + "<option selected value=\"0" + i + "\">";
			}else{
				vCode = vCode + "<option selected value=\"" + i + "\">";
			}
		}else{
			if(i<10) {
				vCode = vCode + "<option value=\"0" + i + "\">";
			}else {
				vCode = vCode + "<option value=\"" + i + "\">";
			}
		}
		if(i<10) {
			vCode = vCode + "0" + i + "</option>\n";
		}else {
			vCode = vCode + i + "</option>\n";
		}
  }
  vCode = vCode + "</select> <font style='font:11px'>분</font>";
  
  vCode = vCode + " <select name=\""+ objName +"_ss_sel\" onChange=\"javascript : clickCalendar1('"+returnItem+"','"+checkStr+"','"+objName+"','"+check+"', '"+p_many+"', '"+"'"+",'close','"+isCheckbox+"','"+defaultTime+"');\"; style='border-width:1px; background-color:#5b90bf; border-color:#404040;font:10px;color:white; text-align: left;'><option selected value=\"00\">00</option>\n";
  for(i=1; i<60; i++){
	  if(i<10) {
		  vCode = vCode + "<option value=\"0" + i + "\">" + "0" + i + "</option>\n";
	  }else {
		  vCode = vCode + "<option value=\"" + i + "\">" + i + "</option>\n";
		}
  }
  vCode = vCode + "</select> <font style='font:11px'>초</font></div> \n ";

	vCode = vCode + "<input type=\"Checkbox\" " + (this.checkValue? "checked" : "" ) +" name=\""+objName+"TimeCheck\" onClick=\"timeShow('"+objName+"');\"><font style='font:12px'>시간출력</font>";
    if(isCheckbox=="false")
  {
    return "";
  }
  return vCode;
    }

//  return vCode;
  



/**
* calendar 객체를 생성하고 calendar내부의 컬러를 지정해 주는 메소드이다
* @param  objName  생성한 달력객체,  
*         p_item1  부모창에 From Date 날짜값을 입력해줄 input tag의 name, 
*         p_month  선택한 달, 
*         p_year   선택한 년도, 
*         p_format 날짜포맷형식, 
*         p_item2  부모창에 To Date 날짜값을 입력해줄 input tag의 name, 
*         p_many   달력 갯수선택 1 또는 2개, 
*         hh_sel   선택한 시간, 
*         mi_sel   선택한 분, 
*         p_time   디폴트로 시/분/초를 보여줄 것인지의 여부
*/
function build(objName, p_item1, p_month, p_year, p_format, p_item2, p_many, hh_sel, mi_sel, p_time, p_timeContinue,flag,isCheckbox) {
	var vCode = "";
	var p_WinCal = ggWinCal;
	//var memoryBDate
	//p_many =2 -> 2개의 달력동시출력

/* 2개짜리 달력을 위해 build 메소드 flag에 따라 다른 Calendar 생성. (2003-09-22 20:00)          
 * 선택된 시와 분을 display하기 위한 변수 셋팅(2003-09-26 15:00) */     
    var firstTime;
    var secondTime;
    if(arguments[13] == "" || arguments[13] == null){
        firstTime = "";
    }else{
        firstTime = arguments[13];
    }
    if(arguments[14] == "" || arguments[14] == null){
        secondTime = "";
    }else{
        secondTime = arguments[14];
    }
	if(flag==false)
	{
		if(p_timeContinue)//true
		{
			if(p_many ==2)//두개
			{
				gCal  = new Calendar(p_item1, p_WinCal, second_p_month, second_p_year, p_format, p_many, second_hh_sel, second_mi_sel, true, isCheckbox, firstTime);
				gCal2 = new Calendar(p_item2, p_WinCal, p_month, p_year, p_format, p_many, hh_sel, mi_sel, true, isCheckbox, secondTime);
			}			
			else//한개
			{
			    gCal  = new Calendar(p_item1, p_WinCal, p_month, p_year, p_format, p_many , hh_sel, mi_sel, p_time, isCheckbox, firstTime);
			}
		}
		else//false
		{
			if(p_many ==2)//두개
			{
				gCal  = new Calendar(p_item1, p_WinCal, second_p_month, second_p_year, p_format, p_many,second_hh_sel, second_mi_sel, false, isCheckbox, firstTime);
				gCal2 = new Calendar(p_item2, p_WinCal, p_month, p_year, p_format, p_many, hh_sel, mi_sel, false, isCheckbox, secondTime);
			}			
			else//한개
			{
			    gCal  = new Calendar(p_item1, p_WinCal, p_month, p_year, p_format, p_many , hh_sel, mi_sel, p_time, isCheckbox, firstTime);
			}
		}
	}
	else
	{
		if(p_timeContinue)
		{
			gCal  = new Calendar(p_item1, p_WinCal, p_month, p_year, p_format, p_many, hh_sel, mi_sel, true, isCheckbox, firstTime);
			gCal2 = new Calendar(p_item2, p_WinCal, p_month, p_year, p_format, p_many, hh_sel, mi_sel, true, isCheckbox, secondTime);
		}
		else
		{
			if(p_many ==2)
			{
				if(objName == "gCal")
				{
					if(gCal.checkValue)
					{			
						gCal.init(p_item1, gCal.gWinCal, p_month, p_year, p_format, gCal2.ghh_sel, gCal2.gmi_sel, true, isCheckbox);
						gCal2.init(p_item2, gCal2.gWinCal, gCal2.gMonth, gCal2.gYear, gCal2.gFormat, hh_sel, mi_sel, gCal2.checkValue, isCheckbox);
					}
					else
					{			
						gCal.init(p_item1, gCal.gWinCal, p_month, p_year, p_format, gCal2.ghh_sel, gCal2.gmi_sel, false, isCheckbox);
						gCal2.init(p_item2, gCal2.gWinCal, gCal2.gMonth, gCal2.gYear, gCal2.gFormat, hh_sel, mi_sel, gCal2.checkValue, isCheckbox);
					}
				}
				else if(objName == "gCal2")
				{
					if(gCal2.checkValue)
					{			
						gCal.init(p_item1, gCal.gWinCal, gCal.gMonth, gCal.gYear, gCal.gFormat, hh_sel, mi_sel, gCal.checkValue, isCheckbox);
						gCal2.init(p_item2, p_WinCal, p_month, p_year, p_format, null, null, true, isCheckbox);
					}
					else
					{			
						gCal.init(p_item1, gCal.gWinCal, gCal.gMonth, gCal.gYear, gCal.gFormat, hh_sel, mi_sel, gCal.checkValue, isCheckbox);
						gCal2.init(p_item2, p_WinCal, p_month, p_year, p_format, null, null, false, isCheckbox);
					}
				}
				else
				{
					gCal  = new Calendar(p_item1, p_WinCal, p_month, p_year, p_format, p_many, hh_sel, mi_sel, p_time, isCheckbox);
					gCal2 = new Calendar(p_item2, p_WinCal, p_month, p_year, p_format, p_many, hh_sel, mi_sel, p_time, isCheckbox);
				}
			}
			else
			{
				gCal  = new Calendar(p_item1, p_WinCal, p_month, p_year, p_format, p_many , hh_sel, mi_sel, p_time, isCheckbox);
			}
		}//flag
	}
	p_WinCal.document.open();

  // Customize your Calendar here..
  gCal.gBGColor="#FFFFFF";
  gCal.gLinkColor="#4D4D4D";
  gCal.gTextColor="#990066";
  gCal.gHeaderColor="#715F44";
		
    	if(p_many ==2){
	gCal2.gBGColor="#FFFFFF";
  gCal2.gLinkColor="#4D4D4D";
  gCal2.gTextColor="#990066";
  gCal2.gHeaderColor="#715F44";
	}
    /* 확인 버튼이 없는 1개짜리 달력의 경우 날짜를 클릭하면 window close(2003-09-26 12:00) */           
	// 칼렌더 화면의 년도 표시...
	vCode = vCode + ("<html>																										\n");
	vCode = vCode + ("<link rel=\"stylesheet\" href=\"/css/pub.css\" type=\"text/css\">\n");
	vCode = vCode + ("<head><title>Calendar</title>															\n");
	vCode = vCode + ("<style>\n");
	vCode = vCode + ("body{font-size:12px;font-family:\"돋움\",\"verdana\"}\n");
	vCode = vCode + ("table{font-size:12px;font-family:\"돋움\",\"verdana\"}\n");
	vCode = vCode + (".bigfont{font-size:15px}\n");
	vCode = vCode + ("</style>\n ");
	vCode = vCode + ("<script language=\"JavaScript\">													\n");
	vCode = vCode + ("var memoryADate=\"2999-01-01 00:00:00\";										\n");
	vCode = vCode + ("var memoryBDate;										\n");
	vCode = vCode + ("/* 1개짜리 달력에서 클릭된 값을 저장하기 위한 전역변수 선언(2003-09-26 12:00) */     								\n");
	vCode = vCode + ("var memoryClickedDate;		\n");
	vCode = vCode + ("var memoryClickedDate2;		\n");
	vCode = vCode + ("	function timeShow(objName){															\n");	
	vCode = vCode + ("		if(objName == \"gCal\"){															\n");
	vCode = vCode + ("			if(eval(document.gCalForm1.gCalTimeCheck.checked)){	\n");
	vCode = vCode + ("						document.all.gCalTime.style.display=\"\";			\n");
	vCode = vCode + ("			}else{																							\n");
	vCode = vCode + ("						document.all.gCalTime.style.display=\"none\";	\n");
	vCode = vCode + ("			}																										\n");		
	vCode = vCode + ("		}else if(objName == \"gCal2\"){												\n");
	vCode = vCode + ("			if(eval(document.gCal2Form1.gCal2TimeCheck.checked)){	\n");
	vCode = vCode + ("				document.all.gCal2Time.style.display=\"\";				\n");
	vCode = vCode + ("			}else{																							\n");	
	vCode = vCode + ("				document.all.gCal2Time.style.display=\"none\";		\n");
	vCode = vCode + ("			}																										\n");	
	vCode = vCode + ("		}																											\n");	
	vCode = vCode + ("		opener.eval(objName).checkValue = eval(\"document.\"+objName+\"Form1.\"+objName+\"TimeCheck.checked\")	;\n");
	vCode = vCode + ("	}																												\n");
	vCode = vCode + ("/* 1개짜리 달력에서 클릭된 값을 저장(2003-09-26 12:00) */     								\n")
	vCode = vCode + ("	function setVdayMethod(vDay){															\n");	
	vCode = vCode + ("		memoryClickedDate=vDay;															\n");
	vCode = vCode + ("	}																												\n");
	vCode = vCode + ("	function setVdayMethod2(vDay){															\n");	
	vCode = vCode + ("		memoryClickedDate2=vDay;															\n");
	vCode = vCode + ("	}																												\n");
	vCode = vCode + ("	function closeScript(){   \n");
	vCode = vCode + ("		//달력팝업을 닫기전 메인의 특정script를 호출하는 부분 \n");
    vCode = vCode + ("		"+closeScript+" \n");
	vCode = vCode + ("		window.close(); \n");
	vCode = vCode + ("	}\n");
	vCode = vCode + ("		//전월의 값을 기억\n"														);
	vCode = vCode + ("	function setMemB(before){			  \n");
    vCode = vCode + ("			memoryBDate= before;			\n");
	vCode = vCode + ("			}\n"														);
	vCode = vCode + ("		//현재월의 값을 기억\n"														);
	vCode = vCode + ("	function setMemA(after){			  \n");
    vCode = vCode + ("			memoryADate= after;			\n");
	vCode = vCode + ("			}\n"														);
	vCode = vCode + ("	function formatDate(vDay, preLen){   \n");
	vCode = vCode + ("		switch (preLen) { \n");		
	vCode = vCode + ("			case 4 :\n");
	vCode = vCode + ("				vData = vDay.substr(0,preLen) ;\n");
	vCode = vCode + ("				break;  \n");
	vCode = vCode + ("			case 7 :\n");
	vCode = vCode + ("				vData = vDay.substr(0,preLen);\n");		
	vCode = vCode + ("				break;\n");
	vCode = vCode + ("			case 10 :\n");
	vCode = vCode + ("				vData = vDay.substr(0,10);\n");
	vCode = vCode + ("				break;	\n");	
	vCode = vCode + ("			default :\n");
	vCode = vCode + ("				vData = vDay;\n");
	vCode = vCode + ("		}\n");
	vCode = vCode + ("		return vData;\n");
	vCode = vCode + ("	}\n");
	vCode = vCode + ("	function formatTime(vDay, preLen, postLen, hhmmssurl, hhmmurl, hhurl){   \n");
	vCode = vCode + ("		switch (postLen) { \n");	
	vCode = vCode + ("			case 2 :\n");
	vCode = vCode + ("				vData =  \" \" +hhurl;\n");
	vCode = vCode + ("				break;	\n");
	vCode = vCode + ("			case 5 :  \n");
	vCode = vCode + ("				vData =  \" \" +hhmmurl; \n");
	vCode = vCode + ("				break;	\n");
	vCode = vCode + ("			case 8 :\n");						
	vCode = vCode + ("				vData =  \" \" +hhmmssurl;\n");
	vCode = vCode + ("				break;	\n");
	vCode = vCode + ("			default :\n");
	vCode = vCode + ("				 vData = \" \" +hhmmssurl;\n");
	vCode = vCode + ("			}\n");
	vCode = vCode + ("			return vData;\n");   
	vCode = vCode + ("	}\n");
	vCode = vCode + ("/* 1개짜리 달력에서 클릭된 값을 저장하기위해 메소드 수정(2003-09-26 12:00) */     								\n")    ;
                    //clickCalendar1('jung', '',  'gCal',                 'false', '1', '','close','true');">
vCode = vCode + ("function clickCalendar1(gReturnItem, checkStr, objName,check, typeCnt,  vDay_tmp, isCloseFlag, isCheckbox, isDefault)			            \n");
vCode = vCode + ("{		                                                                                                                   \n");
vCode = vCode + ("	    var vDay=vDay_tmp;	                                                                                                        \n");
vCode = vCode + ("                                                                                                                                  \n");
vCode = vCode + ("        /* 1개짜리 달력에서 날짜를 클릭하기 전에 확인 버튼을 누르면 경고창 display(2003-09-26 12:00) */     						\n");		
vCode = vCode + ("        if(objName == 'gCal'){   						\n");		
vCode = vCode + ("            if(memoryClickedDate==null || memoryClickedDate.length<0)                                                              \n");
vCode = vCode + ("            {																                                                            \n");
vCode = vCode + ("                if(isDefault==null || isDefault.length<0)	{															                            \n");
vCode = vCode + ("                    alert(\"날짜를 선택 하세요\");																                            \n");
vCode = vCode + ("                }else{																                            \n");
vCode = vCode + ("                    memoryClickedDate = isDefault;																                            \n");
vCode = vCode + ("                }														                            \n");
vCode = vCode + ("            }															                            \n");
vCode = vCode + ("        }																                                                            \n");
vCode = vCode + ("        else{   						\n");		
vCode = vCode + ("            if(memoryClickedDate2==null || memoryClickedDate2.length<0)                                                              \n");
vCode = vCode + ("            {																                                                            \n");
vCode = vCode + ("                if(isDefault==null || isDefault.length<0)	{															                            \n");
vCode = vCode + ("                    alert(\"날짜를 선택 하세요\");																                            \n");
vCode = vCode + ("                }else{																                            \n");
vCode = vCode + ("                    memoryClickedDate2 = isDefault;																                            \n");
vCode = vCode + ("                }														                            \n");
vCode = vCode + ("            }															                            \n");
vCode = vCode + ("        }																                                                            \n");
vCode = vCode + ("        if(vDay=='' || vDay.length<0)                                                                                             \n");
vCode = vCode + ("        {																			                                                \n");
vCode = vCode + ("            if(objName == 'gCal')																			                                                \n");
vCode = vCode + ("                vDay	= 	 memoryClickedDate;														                                    \n");
vCode = vCode + ("            else    vDay	= 	 memoryClickedDate2;														                                    \n");
vCode = vCode + ("        }                                                                                                                         \n");
vCode = vCode + ("        																                                                            \n");
vCode = vCode + ("        /* 1개짜리 달력에서 날짜를 클릭하기 전에 확인 버튼을 누르면 경고창보이고 나머지는 수행안함(2003-09-26 12:00) */     		\n");						
vCode = vCode + ("        if(vDay!=null&&vDay.length>0)                                                                                             \n");
vCode = vCode + ("        {																                                                            \n");
vCode = vCode + ("    		var preLen  = vDay.indexOf(\" \");										                                                \n");
vCode = vCode + ("    		var len		  = vDay.length;														                                    \n");
vCode = vCode + ("    		var postLen = len-preLen-1;														                                        \n");
vCode = vCode + ("    		                                                                                                                        \n");
vCode = vCode + ("    		if(objName == \"gCal\") //하나짜리 달력                                                                                   \n");
vCode = vCode + ("    		{                                                                                                                       \n");
vCode = vCode + ("        		if(isCheckbox==\"true\") //체크박스 보이기-기존과 동일                                                                \n");
vCode = vCode + ("        		{													                                                                \n");
vCode = vCode + ("			        var hhmmssurl = eval(\"document.gCalForm1.\"+objName+\"_hh_sel.options(eval(document.\"+objName+\"Form1.\"+objName	\n");
vCode = vCode + ("										+\"_hh_sel.selectedIndex)).value \");	\n");
vCode = vCode + ("					hhmmssurl +=	\":\" +   eval(\"document.all.\"+objName+\"Form1.\"+objName+\"_mi_sel.options(eval(document.\"+objName+\"Form1.\"+objName	+\"_mi_sel.selectedIndex)).value \" );	\n");
vCode = vCode + ("					hhmmssurl +=	\":\" + eval(\"document.all.\"+objName+\"Form1.\"+objName+\"_ss_sel.options(eval(document.\"+objName+\"Form1.\"+objName	+\"_ss_sel.selectedIndex)).value \" );	\n");
vCode = vCode + ("			        var hhmmurl		= eval(\"document.gCalForm1.\"+objName+\"_hh_sel.options(eval(document.\"+objName+\"Form1.\"+objName	\n");
vCode = vCode + ("										+\"_hh_sel.selectedIndex)).value \");	\n");
vCode = vCode + ("					hhmmurl		+=	\":\" + eval(\"document.all.\"+objName+\"Form1.\"+objName+\"_mi_sel.options(eval(document.\"+objName+\"Form1.\"+objName	+\"_mi_sel.selectedIndex)).value \" );	\n");
vCode = vCode + ("			        var hhurl			= eval(\"document.gCalForm1.\"+objName+\"_hh_sel.options(eval(document.\"+objName+\"Form1.\"+objName	\n");
vCode = vCode + ("										+\"_hh_sel.selectedIndex)).value \");	\n");
vCode = vCode + ("            			if(eval(document.gCalForm1.gCalTimeCheck.checked))                                                          \n");
vCode = vCode + ("            			{	                                                                                                      \n");
vCode = vCode + ("            				var vDay = formatDate(vDay, preLen);					                                                \n");
vCode = vCode + ("         		            vDay += formatTime(vDay, preLen, postLen, hhmmssurl, hhmmurl, hhurl);	                                \n");
vCode = vCode + ("				                                                                                                                    \n");
vCode = vCode + ("                    			if(check=='true')                                                                                   \n");
vCode = vCode + ("                    			{																	                                \n");
vCode = vCode + ("                    				if(memoryADate<vDay)                                                                            \n");
vCode = vCode + ("                    				{													                                            \n");
vCode = vCode + ("                    					alert(checkStr);                                                                            \n");
vCode = vCode + ("                    				}                                                                                               \n");
vCode = vCode + ("                    				else                                                                                            \n");
vCode = vCode + ("                    				{						                                                                        \n");
vCode = vCode + ("                    					eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");                   \n");
vCode = vCode + ("                                    }                                                                                             \n");
vCode = vCode + ("                    		    }                                                                                                   \n");
vCode = vCode + ("                    		    else                                                                                                \n");
vCode = vCode + ("                    		    {                                                                                                   \n");
vCode = vCode + ("                    		        eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");                             \n");
vCode = vCode + ("                    		    }		                                                                                            \n");
vCode = vCode + ("                    	}																                           			        \n");
vCode = vCode + ("            			else                                                                                                        \n");
vCode = vCode + ("            			{																											\n");	
vCode = vCode + ("                    		    var vDay = formatDate(vDay, preLen);	                                                            \n");
vCode = vCode + ("                    			if(check=='true')                                                                                   \n");
vCode = vCode + ("                    			{																	                                \n");
vCode = vCode + ("                    				//			이게 필요												\n");															
vCode = vCode + ("                    				if(memoryADate<vDay)                                                                            \n");
vCode = vCode + ("                    				{													                                            \n");
vCode = vCode + ("                    					alert(checkStr);                                                                            \n");
vCode = vCode + ("                    				}                                                                                               \n");
vCode = vCode + ("                    				else                                                                                            \n");
vCode = vCode + ("                    				{						                                                                        \n");
vCode = vCode + ("                    						eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");               \n");
vCode = vCode + ("                    				}																								\n");		
vCode = vCode + ("                    			}                                                                                                   \n");
vCode = vCode + ("                    			else                                                                                                \n");
vCode = vCode + ("                    			{																							        \n");
vCode = vCode + ("                    		    	eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");						\n");
vCode = vCode + ("                    			}																									\n");			
vCode = vCode + ("            		    }                                                                                                           \n");
vCode = vCode + ("        		  }	                                                                                        \n");
vCode = vCode + ("                else                                                                                       \n");
vCode = vCode + ("                {                                                                                                            \n");
vCode = vCode + ("                     var vDay = formatDate(vDay, preLen);	                                                            \n");
vCode = vCode + ("                    			if(check=='true')                                                                                   \n");
vCode = vCode + ("                    			{																	                                \n");
vCode = vCode + ("                    				if(memoryADate<vDay)                                                                            \n");
vCode = vCode + ("                    				{													                                            \n");
vCode = vCode + ("                    					alert(checkStr);                                                                            \n");
vCode = vCode + ("                    				}                                                                                               \n");
vCode = vCode + ("                    				else                                                                                            \n");
vCode = vCode + ("                    				{						                                                                        \n");
vCode = vCode + ("                    						eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");               \n");
vCode = vCode + ("                    				}																								\n");		
vCode = vCode + ("                    			}                                                                                                   \n");
vCode = vCode + ("                    			else                                                                                                \n");
vCode = vCode + ("                    			{																							        \n");
vCode = vCode + ("                    		    	eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");						\n");
vCode = vCode + ("                    			}																									\n");			
vCode = vCode + ("            	  }                                                                                                    \n");
vCode = vCode + ("        																								\n");		
vCode = vCode + ("              setMemB(vDay);		                                                                                        \n");
vCode = vCode + ("			if(typeCnt=='1' &&  isCloseFlag=='close')																				\n");								
vCode = vCode + ("	        {																									            \n");
vCode = vCode + ("	              closeScript(); 																									\n");			
vCode = vCode + ("			}																											            \n");
vCode = vCode + ("		} //gCal1                                                                                                                   \n");
vCode = vCode + ("		 else if(objName == \"gCal2\")                                                                                                                                                   \n");       
vCode = vCode + ("		 {										                                                                                                                                 \n");
vCode = vCode + ("			                                                                                                                                                                             \n");
vCode = vCode + ("			if(isCheckbox==\"true\") //체크박스 보이기-기존과 동일                                                                                                                       \n");
vCode = vCode + ("			{                                                                                                                                                                          \n");
vCode = vCode + ("    			var hhmmssurl = eval(\"document.gCal2Form1.\"+objName+\"_hh_sel.options(eval(document.\"+objName+\"Form1.\"+objName	                                                         \n");
vCode = vCode + ("    								+\"_hh_sel.selectedIndex)).value \");				                                                                                                     \n");
vCode = vCode + ("                    hhmmssurl +=	\":\" +   eval(\"document.all.\"+objName+\"Form1.\"+objName+\"_mi_sel.options(eval(document.\"+objName+\"Form1.\"+objName	+\"_mi_sel.selectedIndex)).value \" );\n");
vCode = vCode + ("                    hhmmssurl +=	\":\" + eval(\"document.all.\"+objName+\"Form1.\"+objName+\"_ss_sel.options(eval(document.\"+objName+\"Form1.\"+objName	+\"_ss_sel.selectedIndex)).value \" );\n");
vCode = vCode + ("                                                                                                                                                                                       \n");
vCode = vCode + ("    			var hhmmurl = eval(\"document.gCal2Form1.\"+objName+\"_hh_sel.options(eval(document.\"+objName+\"Form1.\"+objName	                                                             \n");
vCode = vCode + ("    								+\"_hh_sel.selectedIndex)).value \");				                                                                                                     \n");
vCode = vCode + ("    				hhmmurl +=	\":\" + eval(\"document.all.\"+objName+\"Form1.\"+objName+\"_mi_sel.options(eval(document.\"+objName+\"Form1.\"+objName	+\"_mi_sel.selectedIndex)).value \" );	 \n");
vCode = vCode + ("                                                                                                                                                                                       \n");
vCode = vCode + ("    			var hhurl = eval(\"document.gCal2Form1.\"+objName+\"_hh_sel.options(eval(document.\"+objName+\"Form1.\"+objName	                                                             \n");
vCode = vCode + ("    								+\"_hh_sel.selectedIndex)).value \");				                                                                                                     \n");
vCode = vCode + ("                                                                                                                                                                                       \n");
vCode = vCode + ("    			if(eval(document.gCal2Form1.gCal2TimeCheck.checked))                                                                                                                     \n");
vCode = vCode + ("    			{	                                                                                                                                                             \n");
vCode = vCode + ("    				var vDay = formatDate(vDay, preLen);	                                                                                                \n");
vCode = vCode + ("  	            vDay += formatTime(vDay, preLen, postLen, hhmmssurl, hhmmurl, hhurl);	                                \n");
vCode = vCode + ("    			                                                                                                                                                                         \n");
vCode = vCode + ("                    if(check=='true')                                                                                                                                                  \n");
vCode = vCode + ("                    {																		                                                                                                 \n");
vCode = vCode + ("                        if(memoryBDate>vDay)                                                                                                                                           \n");
vCode = vCode + ("                        {						");
vCode = vCode + ("                            alert(checkStr);                                                                                                                                           \n");
vCode = vCode + ("                        }                                                                                                                                                              \n");
vCode = vCode + ("                        else                                                                                                                                                           \n");
vCode = vCode + ("                        {						                                                                                                                                         \n");
vCode = vCode + ("                            eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");                                                                                        \n");
vCode = vCode + ("                        }                                                                                                                                                              \n");
vCode = vCode + ("                    }                                                                                                                                                                  \n");
vCode = vCode + ("                    else                                                                                                                                                               \n");
vCode = vCode + ("                    {                                                                                                                                                                  \n");
vCode = vCode + ("                        eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");                                                                                            \n");
vCode = vCode + ("                    }	                                                                                                                                                                 \n");
vCode = vCode + ("    			}                                                                                                                                                                        \n");
vCode = vCode + ("    			else                                                                                                                                                                     \n");
vCode = vCode + ("    			{																												                                                         \n");
vCode = vCode + ("                    var vDay = formatDate(vDay, preLen);	                                                                                                                          \n");
vCode = vCode + ("                    if(check=='true')                                                                                                                                                  \n");
vCode = vCode + ("                    {																                                                                                                 \n");
vCode = vCode + ("                        if(memoryBDate>vDay)                                                                                                                                           \n");
vCode = vCode + ("                        {													                                                                                                             \n");
vCode = vCode + ("                            alert(checkStr);                                                                                                                                           \n");
vCode = vCode + ("                        }                                                                                                                                                              \n");
vCode = vCode + ("                        else                                                                                                                                                           \n");
vCode = vCode + ("                        {					                                                                                                                                         \n");
vCode = vCode + ("                            eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");                                                                                        \n");
vCode = vCode + ("                        }																										                                                         \n");
vCode = vCode + ("                    }                                                                                                                                                                  \n");
vCode = vCode + ("                    else                                                                                                                                                               \n");
vCode = vCode + ("                    {																							                                                                         \n");
vCode = vCode + ("                        eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \"); 	//check																					\n");							
vCode = vCode + ("                    }	                                                                                                                                                                 \n");
vCode = vCode + ("             }	                                                                                                                                                                     \n");
vCode = vCode + ("       }																											                                                                 \n");
vCode = vCode + ("	   	else                                                                                                                                                                             \n");
vCode = vCode + ("	    {																												                                                                 \n");
vCode = vCode + ("   		    var vDay = formatDate(vDay, preLen);	                                                                                                                                   \n");
vCode = vCode + ("   			if(check=='true')                                                                                                                                                        \n");
vCode = vCode + ("   			{																	                                                                                                     \n");
vCode = vCode + ("   				if(memoryBDate>vDay)                                                                                                                                                 \n");
vCode = vCode + ("   				{											                                                                                                                 \n");
vCode = vCode + ("   					alert(checkStr);                                                                             										                             \n");                                          
vCode = vCode + ("   				}                                                                                                                                                                    \n");
vCode = vCode + ("   				else                                                                                                                                                                 \n");
vCode = vCode + ("   				{						                                                                                                                                             \n");
vCode = vCode + ("    					eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");                                                                                    \n");
vCode = vCode + ("    			    }																										                                                                 \n");
vCode = vCode + ("  			}                                                                                                                                                                        \n");
vCode = vCode + ("   			else                                                                                                                                                                     \n");
vCode = vCode + ("   			{																							                                                                             \n");
vCode = vCode + ("   		    	eval(\"self.opener.document.all.\"+gReturnItem+\".value='\"+vDay+\"' \");						                                                                     \n");
vCode = vCode + ("   			}																												                                                         \n");
vCode = vCode + ("      }                                                                                                                                                                              \n");
vCode = vCode + ("                                                                                                                                                                                       \n");
vCode = vCode + ("              setMemA(vDay);		                                                                                        \n");
vCode = vCode + (" }	//elseif																							                                                                         \n");
	vCode = vCode + ("		}																											\n");
	vCode = vCode + ("	}																												\n");
       vCode = vCode + ("   function confirmCalendar(gReturnItem, gReturnItem2, checkStr, check, isCloseFlag, isCheckbox)	\n");
       vCode = vCode + ("   {           \n");
       vCode = vCode + ("        if(memoryClickedDate == null)      \n");
       vCode = vCode + ("            clickCalendar1(gReturnItem, checkStr, 'gCal',check, 1,'' , 'true', isCheckbox, '"+firstTime+"','true');    \n");
       vCode = vCode + ("        if(memoryClickedDate2 == null)      \n");
       vCode = vCode + ("            clickCalendar1(gReturnItem2, checkStr, 'gCal2',check, 2, '' , 'true', isCheckbox, '"+secondTime+"','true');    \n");
       vCode = vCode + ("        window.close() ;  \n");
       vCode = vCode + ("   }	    \n");	
	vCode = vCode + ("</script>																									\n");
	vCode = vCode + ("</head>																										\n");
	vCode = vCode + ("<body " + 
		"link=\"" + gCal.gLinkColor + "\" " + 
		"vlink=\"" + gCal.gLinkColor + "\" " +
		"alink=\"" + gCal.gLinkColor + "\" " +
		"text=\"" + gCal.gTextColor + "\" ");
	//종합반영
	if(modal == "1")
	    vCode = vCode + ("onBlur=\"self.focus();\">");
    	else
		vCode = vCode + (">");
		
	if(p_many == 2){
		vCode = vCode + ("<TABLE>");
		vCode = vCode + ("<TR>");		
  
		gCal.show("gCal", p_many, "gCal2",this.second_p_year,this.second_p_month,isCheckbox);
		vCode = vCode+gCal.vCode1;
		gCal2.show("gCal2", p_many,"gCal",this.p_year,this.p_month,isCheckbox);
		vCode = vCode+gCal2.vCode1;
		
		vCode = vCode + ("</TR>");		
		vCode = vCode + ("<TR>");	
		vCode = vCode + ("<TD COLSPAN=\"2\" ALIGN=\"center\">\n");

              if (showCalendar_close_flag == "true"){
                        vCode = vCode + ("<IMG SRC=\"/img/m000010ico.gif\" BORDER=0 style=\"cursor:hand\" onClick=\"javascript : "+
                                                            "confirmCalendar('"+this.p_item1+"', '"+this.p_item2+"','"+checkStr+"', '"+checkDate+"',"+" 'close','"+isCheckbox+"');\">");
              }
              else{
            		vCode = vCode + ("<A HREF=\"" +
                     "javascript:closeScript();\"><IMG SRC=\"/img/m000010ico.gif\" BORDER=0></A>");
              }
		vCode = vCode + ("</TD>\n");
        vCode = vCode + ("</TR>");	
		vCode = vCode + ("</TABLE>");	
	}
	else{
		gCal.show("gCal", p_many, "gCal2",p_year,p_month,isCheckbox);
		vCode = vCode+gCal.vCode1;

/* 1개짜리 달력에서 확인 버튼 클릭시 값을 setting하고 window close 호출(2003-09-26 12:00) */     				
		if (showCalendar_close_flag == "true")
		{
                        vCode = vCode + ("<CENTER><TABLE>");
                        vCode = vCode + ("<TR>");	
                        vCode = vCode + ("<TD COLSPAN=\"2\" ALIGN=\"center\">\n");
                        vCode = vCode + ("<IMG SRC=\"/img/m000010ico.gif\" BORDER=0 style=\"cursor:hand\" onClick=\"javascript : "+
                                                            "clickCalendar1('"+this.p_item1+"', '', "+" 'gCal','"+checkDate+"', '"+p_many+"','',"+" 'close','"+isCheckbox+"');\">");
                        vCode = vCode + ("</TD>\n");
                        vCode = vCode + ("</TR>");	
                        vCode = vCode + ("</TABLE></CENTER>");	
		}
	}
	
	vCode = vCode + ("</BODY>");		
	vCode = vCode + ("</HTML>");	
  
	p_WinCal.document.writeln(vCode);
	p_WinCal.document.close();
	
}


/**
* main 페이지에서 달력을 보여주기 위해 호출하는 메소드
*/
function showCalendar() {		
  /* 
  *  p_month : 0-11 for Jan-Dec; 12 for All Months.
  *  p_year  : 4-digit year
  *  p_format: Date uments[3] == null) p_format = "YYYY-MONTH-DD";  //포맷양식을 지정한다.
  *  p_item  : Return Item.
  *		예제: 
  *			'fromdate[0]','2000','10','YYYY/MONTH/DD','todate[0]',1, true
  */
  

  objName = ""; hh_sel = null; mi_sel = null;

  p_item1 = arguments[0]; 


/**
 * null check -없으면 현재 날짜,시간을 보여줌 (2003-10-01 15:00)
 * textbox value중 년도를 구한다.(2003-09-21 18:00) 
 */           
if (arguments[1] == "" || arguments[1] == null)   //현재시간의 년도를 구한다. 
{
	p_year = new String(gNow.getFullYear().toString());
}
else
{
	  var tmpY=arguments[1];
	  p_year = tmpY.substring(0,4);
}


/* 선택된 시와 분을 display하기 위한 변수 셋팅(2003-09-26 15:00) */           
    var nowTime = new Date();

/* textbox value중 달을 구한다.(2003-09-21 18:00) */           
if (arguments[2] == "" || arguments[2] == null || arguments[2].length<6)
{
	p_month = new String(gNow.getMonth());   //현재시간의 달로 p_month를 구한다
}
else
{	
    var tmpD = arguments[2];
    p_month = tmpD.substring(5,7)-1;
    if(parseInt(p_month)>11 || parseInt(p_month)<0 )
    {
        p_month = new String(gNow.getMonth());   //현재시간의 달로 p_month를 구한다
    }
}

if(arguments[2] == "" ||  arguments[2] == null || arguments[2].length<13 )
{
       hh_sel = new String(nowTime.getHours());
}
else
{
	  var tmpD=arguments[2];
       hh_sel =tmpD.substring(11,13);
}

if(arguments[2] == "" ||  arguments[2] == null || arguments[2].length<16)
{
        mi_sel = new String(nowTime.getMinutes());
}
else
{
	  var tmpD=arguments[2];
       mi_sel =tmpD.substring(14,16);
}



  if (arguments[3] == "" || arguments[3] == null) p_format = "YYYY-MONTH-DD";
  else p_format = arguments[3];
  
	p_item2 = arguments[4];
	p_many  = arguments[5];  
	p_time  = arguments[6];

	//종합반영
    if (arguments[7] == "" || arguments[7] == null) closeScript = "";
    else closeScript = arguments[7];
    
	//종합반영
    if (arguments[8] == "" || arguments[8] == null) modal = "0";
    else modal = arguments[8];

    if (arguments[9] == "" || arguments[9] == null) {checkDate = "false";}
    else{ checkDate = arguments[9];}
    
	if (arguments[10] == "" || arguments[10] == null) {checkStr = "From ~ To 의 값을 확인하세요";}
    else{ checkStr = arguments[10];}

	// showCalendar_close_flag 추가
	if (arguments[11] == "" || arguments[11] == null) {showCalendar_close_flag = "false";}
    else{ showCalendar_close_flag = arguments[11];
	}

/* null check -없으면 현재 날짜,시간을 보여줌 (2003-10-01 15:00) */
if (arguments[12] == "" || arguments[12] == null || arguments[12].length<4)
{
			second_p_year = new String(gNow.getFullYear().toString());
}
else
{	
		var tmpSecondstr=arguments[12];
		this.second_p_year=tmpSecondstr.substring(0,4);
}

if(arguments[12] == "" || arguments[12] == null ||  arguments[12].length<7)
{
			second_p_month = new String(gNow.getMonth());
}
else
{
		var tmpSecondstr=arguments[12];
		this.second_p_month=tmpSecondstr.substring(5,7)-1;
        if(parseInt(second_p_month)>11 || parseInt(second_p_month)<0 )
        {
            second_p_month = new String(gNow.getMonth());   //현재시간의 달로 p_month를 구한다
        }
}

if(arguments[12]== "" ||  arguments[12] == null ||arguments[12].length<13)
{
            second_hh_sel = new String(nowTime.getHours());
}
else
{
		var tmpSecondstr=arguments[12];
		second_hh_sel =tmpSecondstr.substring(11,13);
}
if(arguments[12] == "" || arguments[12] == null || arguments[12].length<16)
{
            second_mi_sel = new String(nowTime.getMinutes());
}
else
{
		var tmpSecondstr=arguments[12];
        second_mi_sel =tmpSecondstr.substring(14,16);
}
//체크 박스 안보이게 하는 기능을 위한 파라미터
if(arguments[13]== "" ||  arguments[13] == null ||arguments[13].length<1 )
{
            isCheckbox="true";
}
else
{
		isCheckbox=arguments[13];
}


	if(p_time){
		p_timeContinue = true;
	}else{
		p_timeContinue = false;
	}
	if(p_many==2){
        vWinCal = window.open(objName, "Calendar", "width=390,height=360,status=yes,resizable=yes,top=200,left=200");
        
	}else{
		vWinCal = window.open(objName, "Calendar", "width=300,height=350,status=yes,resizable=yes,top=200,left=200");	
	}
	check=false;

	if(checkDate==true)
	{
		check=true;
	}

  /* 추가 */
  var firstCal ;
  var secondCal;
  if (arguments[2] == "" || arguments[2] == null || arguments[2].length<10){
    firstCal = "";
  }else{
    firstCal=arguments[2];
//    firstTime = tmpD.substring(0,10);
  }
  if (arguments[12] == "" || arguments[12] == null || arguments[12].length<10){
    secondCal = "";
  }else{
    secondCal=arguments[12];
//    secondTime = tmpD.substring(0,10);
  }  
  
  vWinCal.opener = self;
  ggWinCal = vWinCal;
  ggWinCal.focus();
  
/* 2개짜리 달력을 위해 build 메소드 flag 추가. (2003-09-22 20:00) */           
  build(objName, p_item1, p_month, p_year, p_format, p_item2, p_many, hh_sel, mi_sel, p_time, p_timeContinue,false,isCheckbox,secondCal,firstCal);
  
}

/**
* 부모창의 날짜값을 입력받기 위한 input tag name 이 여러개일 경우 배열로 처리해주기 위해 이름을 변경해주는 메소드
* @param  obj 객체이름,  idx 인덱스
*/
function textGen(obj,idx){
    if (obj.length!=null)
    {
        return obj[0].name+"["+idx+"]";
    }
    else
    {
        var array_idx = eval("document.all." + obj.name).length;
    
        if (parseInt(array_idx)>1)    
        {
            return obj.name+"["+idx+"]";
        }
        else
        {
            return obj.name;
        }
    }
}

/**
* 현재 날짜로 달력을 출력할 것인지 선택한 날짜로 출력할 것인지를 판단하여 달력을 띄우는 메소드
* @param  idx  날짜값을 출력시키는 input type tag가 입력을 받기 위한 tag인지(값 -1),
*              showTable에서 출력되는 tag인지를 판단하기 위한 값(값 >=0)
*              obj  날짜값을 출력시키는 input type tag 객체
*/
function jspCalendar(idx, obj, gFormat, timecheck)
{	
	var objYear="";
	var objMonth="";
	var objDay="";

	//stor2=는 날짜를 입력할 input tag name
	if(idx == -1){	
		objName  = obj.name;

		if(obj.value!=null && obj.value.length > 0){
			objYear  = obj.value.substr(0,4);
			objMonth = obj.value.substr(5,2);
			objDay   = obj.value.substr(8,2);
		}
		stor2 = objName;

	}else if(idx >= 0){
		objName  = obj[idx].name;

		if(obj.value!=null && obj.value.length > 0){
			objValue = obj[idx].value;
			objYear  = objValue.substr(0,4);
			objMonth = objValue.substr(5,2);
			objDay   = objValue.substr(8,2);
		}
		stor2 = objName+"["+idx+"]";
	}		
	
	var url = "server_calendar.jsp?year="+objYear+"&month="+objMonth+"&day="+objDay
					 +"&gFormat=" +gFormat +"&stor2=" +stor2 +"&timeCheck="+timecheck;
				
	var winsize = 'scrollbars=no,status=no,width=280,height=320';
	window.open(url,"Calendar", winsize);
}