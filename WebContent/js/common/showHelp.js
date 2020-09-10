 /*==============================================================================
*Copyright(c) 2003 POSCO/POSDATA
*
*@ProcessChain	: Reuse
*
*@File			: showHelp.js
*
*@FileName		: 조업 도움화면 출력 기능.
*
*Open Issues	:
*
*Change history 
*@LastModifyDate: 20040721
*@Author		: 정영훈
*@LastModifier	: 남광현
*@LastVersion   : 1.2
*
*    2003-05-15   정영훈
*        Draft1A     최초 생성
*
*    2003-05-28   정영훈
*        1.0         Code review
*
*    2004-06-23   남광현
*        1.1         Size 조정 및 resizable
*
*    2004-07-21   남광현
*        1.2         맨위 출력 focusing 적용
*==============================================================================*/



/** 
 * Function Description: 조업화면 도움버튼을 눌렀을때 오른쪽 하단으로 도움화면 출력.
 * @author	Chung Young Hun
 * @version Draft1A
 * @param  
 *			url: Help page의 위치 경로
 * @return
 */   
function showHelp(url) 
{
	var w = 670;						// 팝업 width값
	var h = 550;						// 팝업 height값
	var winl = (screen.width - w -10);	// 팝업이 스크린 오른쪽 끝에 나타나도록 width값 조정
	var wint = (screen.height - h -55);	// 팝업이 스크린 하단 끝에 나타나도록 height값 조정

	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars=yes, resizable=yes';
	win = window.open(url, 'help', winprops);
	win.focus();
	return false;
}