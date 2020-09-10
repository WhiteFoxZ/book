/*==============================================================================
*Copyright(c) 2003 POSCO/POSDATA
*
*@ProcessChain : Reuse
*
*@File        : setSelectValue.js
*
*@FileName : setSelectValue
*
*Open Issues :
*
*Change history 
*@LastModifyDate : 20030516
*@Author            : 임종오
*@LastModifier      : 임종오
*@LastVersion       : 1.0
*==============================================================================*/


/** 
 * Function Description: the function is adjusting to many target objects 
 *                       by selected certain object value.   
 * @author Lim Jong O
 * @version 1.0
 * @param  targetObj: Target Object Name
 *         val: Current Object value
 */   
 
function setSelectValue(orijinObj,targetObj)
{
  	var selectIdx;
  	var orijinVal = eval("document.forms[0]."+orijinObj+".value");
  	var totObj = document.forms[0].elements.length;

  	for(i=0; i < totObj; i++){
    	if(document.forms[0].elements[i].name == targetObj){  		
          	document.forms[0].elements[i].value = orijinVal;     
    	}//end if
  	}//end for 
  
  	return;
}