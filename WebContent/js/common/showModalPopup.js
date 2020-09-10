/*==============================================================================
*Copyright(c) 2003 POSCO/POSDATA
*
*@ProcessChain	: Reuse
*
*@File			: showModalPopup.js
*
*@FileName		: 모달 팝업 스크린 출력.
*
*Open Issues	:
*
*Change history 
*@LastModifyDate: 20030710
*@Author		: 정영훈
*@LastModifier	: 정영훈
*@LastVersion   : 1.1
*
*    2003-05-16   정영훈
*        Draft1A     최초 생성
*
*    2003-05-22   정영훈
*        Draft1A     업무 기능 수정
*                    함수 파라미터 추가 (상태바 출력 여부)
*    2003-05-28   정영훈
*        1.0         Code review
*    2003-07-10   정영훈
*        1.1         팝업 출력관련 설정을 다양하게 반영할 수 있도록 수정
*==============================================================================*/


/** 
 * Function Description: Parameter에 따라 출력 위치를 정하고 Modal팝업을 출력한다.
 * @author Chung Young Hun
 * @version 1.1
 * @param  
 *			url: Popup page의 위치 경로
 *			arg : 전달할 값
 *			w : 팝업의 width값
 *			h : 팝업의 heigth값
 *          center : 팝업의 중앙출력 여부
 *			top : 팝업의 출력 위치
 *			left : 팝업의 출력 위치
 *          status : 상태바 출력 여부
 *          scroll : 스크롤바 출력 여부
 *          resize : 팝업 size 조정가능 여부 
 * @return 
 */   
function showModalPopup()
{

    var url, arg, w, h, center, top, left, loca, status, scroll, resize, winprops, win;

    url = arguments[0];

    if (arguments[1] == "" || arguments[1] == null) 
        arg = '';
    else arg = arguments[1];


	if (arguments[2] == "" || arguments[2] == null) 
        w = 100;
    else w = arguments[2];


	if (arguments[3] == "" || arguments[3] == null) 
        h = 100;
    else h = arguments[3];


    //팝업을 중앙에 출력시킬지 특정 위치에 출력시킬지 여부 결정
    if ( arguments[4] == "" || arguments[4] == null || arguments[4] == "1" || arguments[4] == "yes") 
        loca = "center: 1;";
    else if(arguments[4] == "0" || arguments[4] == "no")
	{
        if (arguments[5] == "" || arguments[5] == null) 
            top = 0;
        else top = arguments[5];
	
        if (arguments[6] == "" || arguments[6] == null) 
            left = 0;
        else left = arguments[6];

		loca = 'dialogTop:'+top+'px; dialogLeft:'+left+'px;' ;
	}
	else loca = '';	


    if (arguments[7] == "" || arguments[7] == null) 
        status = '1';
    else status = arguments[7];


	if (arguments[8] == "" || arguments[8] == null) 
        scroll = '0';
    else scroll = arguments[8];


	if (arguments[9] == "" || arguments[9] == null) 
        resize = '0';
    else resize = arguments[9];


    winprops = 'dialogWidth:'+w+'px;dialogHeight:'+h+'px; '+loca+' help:0; status:'
	           +status+'; scroll:'+scroll+'; resizable:'+resize ;

    win = window.showModalDialog(url,arg,winprops);

    return false;
}