/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA                                                
 *                                                                                
 * @ProcessChain   : Reuse
 *                                                                                  
 * @File           : showHighLowIndexArrow.js
 *                                                                                  
 * @FileName       :
 *                                                                                  
 * Open Issues     : 
 *                                                                                
 * Change history
 * @LastModifyDate : 
 * @Author         : 정창호                                             
 * @LastModifier   : 정창호                                                   
 * @LastVersion    : 1.0
 *     2003-05-18    
 *     1.0       for review
 *==============================================================================*/


/**---------------------------------------------------------------------------------------------------
 *	The showHighLowIndexArrow Method ( isInCode() )
 **---------------------------------------------------------------------------------------------------*/

/**
* @Function 명		: isInCode
* @Function 설명	: 입력받은 textbox의 value가 조회된 array내에 존재하는지 체크하는 function
* @Param 			: txt_name - 입력받는 textbox name
* @return값			:  
* @사용 Event 		: 
* @see 				
*/
function isInCode(txt_name){
    var flag=false;
    for (var i = 0; i <code_array.length; i++) {

       if( txt_name.value == code_array[i]) {
           flag=true;
           break;
        }
    }
    return flag;
}

/**---------------------------------------------------------------------------------------------------
 *	The showHighLowIndexArrow Method ( showHighIndexArrow() )
 **---------------------------------------------------------------------------------------------------*/

/**
* @Function 명		: showHighIndexArrow
* @Function 설명	: 상화살표를 누르면 현 코드값보다 큰 값을 textbox에 display하는 function
* @Param 			: txt_name - 입력받는 textbox name
* @return값			:  
* @사용 Event 		:  onClick
* @see 				
*/
function showHighIndexArrow(txt_name){
    var flag=false;

    flag=isInCode(txt_name);
 
    if(flag==false) { txt_name.value=""; txt_name.focus(); alert("존재하지 않는 값입니다.");}

	for (var i = 0; i <code_array.length; i++) {

       if( txt_name.value == code_array[code_array.length]) {
              alert("더이상 없습니다.");
			  break;
	   }
  	   else  if( txt_name.value==code_array[i])
		{
            if(i+1 >= code_array.length)
            { 
				alert("더 큰값이 존재하지 않습니다.");
				break;
			}
			else {
				txt_name.value=code_array[i+1];
				txt_name.focus();
				break;
		   }
		}
    }
}
	
/**---------------------------------------------------------------------------------------------------
 *	The showHighLowIndexArrow Method ( showLowIndexArrow() )
 **---------------------------------------------------------------------------------------------------*/

/**
* @Function 명		: showLowIndexArrow
* @Function 설명	: 아래화살표를 누르면 현 코드값보다 작은 값을 textbox에 display하는 function
* @Param 			: txt_name - 입력받는 textbox name
* @return값			:  
* @사용 Event 		:  onClick
* @see 				
*/
function showLowIndexArrow(txt_name){
 var flag=false;

    flag=isInCode(txt_name);
    if(flag==false) { txt_name.value=""; alert("존재하지 않는 값입니다.");}
	for (var i = 0; i <code_array.length; i++) {
        if(txt_name.value==code_array[0]){
            alert("더이상 작은 값은 존재하지 않습니다.");
            txt_name.value=code_array[0];
            break;
       }
       else if( txt_name.value == code_array[i]) {
                txt_name.value=code_array[i-1];
                break;
       }
    }
}