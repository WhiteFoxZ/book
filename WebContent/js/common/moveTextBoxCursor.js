/*==============================================================================
*Copyright(c) 2003 POSCO/POSDATA
*
*@ProcessChain	: Reuse
*
*@File			: moveTextBoxCursor.js
*
*@FileName		: TextBox 커서의 자동 이동 기능.
*
*Open Issues	:
*
*Change history 
*@LastModifyDate: 20030528
*@Author		: 정영훈
*@LastModifier	: 정영훈
*@LastVersion   : 1.0
*
*    2003-05-16   정영훈
*        Draft1A     최초 생성
*
*    2003-05-21   정영훈
*        Draft1A     업무 기능 수정
*                    NextObject의 input type을 체크하여 text일때만 기능 수행하게함.
*    2003-05-28   정영훈
*        1.0         Code review
*==============================================================================*/



/** 
 * Function Description: showTable의 특정 Row의 TextBox에서 사용되는 moveTextBoxCursor.
 * @author Chung Young Hun
 * @version 1.0
 * @param  
 *			formname: Current Form Name
 *			obj: Current Object Name
 *			nextObj: Next Object Name
 *			finalObj : Final Object Name in a Row
 *			max : maxlength
 */   
function moveCursorInTable(formname, obj, nextObj, finalObj, max) 
{

	var idx = obj.parentElement.index;

	if(obj.value.length >= max)
	{		
		if(obj.name==finalObj[idx].name)
		{
			idx++;
		}
		
		if((nextObj[idx] == null) || (nextObj[idx].length == 0))
		{
			return;
		}
		else 
			if(nextObj[idx].type == 'text')
			{
				nextObj[idx].focus();
				return;
			}
	}
}



/** 
 * Function Description: TextBox에서 입력값의 max를 초과했을 때 특정 순서의 객체로 Cursor를 이동.
 * @author Chung Young Hun
 * @version 1.0
 * @param  
 *			formname: Current Form Name
 *			obj: Current Object Name
 *			num: Next Object to move
 *			max : maxlength
 */   
function moveTextBoxCursor(formname, obj, num, max) 
{
	value = obj.value;

	if(value.length >= max)
	{
		formname.elements[num].focus();
		return;
	}
}