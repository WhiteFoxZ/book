/*==============================================================================
*Copyright(c) 2003 POSCO/POSDATA
*
*@ProcessChain : Reuse
*
*@File        : moveFieldCursor.js
*
*@FileName : moveFieldCursor
*
*Open Issues :
*
*Change history 
*@LastModifyDate : 20030522
*@Author            : 임종오
*@LastModifier      : 임종오
*@LastVersion       : 1.0
*    2003-05-16   임종오
*        Draft1A     최초 생성
*
*    2003-05-22   임종오
*        1.0         배포
*==============================================================================*/



/** 
 * Function Description: the function is moving cursor by Arrow Key.
 * @author Lim Jong O
 * @version 1.0
 * @param  obj: Current Object Name
 *         idx: Current Object index
 *         int: Targer Objcect Count
 */   
 
var totObj;
function moveFieldCursor(obj,idx,totCol)
{
  	var objLen;
  	var cnt = 0;
  	idx = parseInt(idx);
  	totCol = parseInt(totCol);
  	var keyCode = event.keyCode;
  	totObj  = document.forms[0].elements.length;
  
  	objLen = eval("document.forms[0]." + obj + ".length");
  
  	//UP화살표Click시
  	if(keyCode == 38){
    	moveUpCursor(obj,idx);
   
  	}//end if
  
  
   	//DOWN화살표Click시
  	if(keyCode == 40){
    	moveDownCursor(obj,idx);
    }
  
  	//LEFT화살표Click시
  	if(keyCode == 37){
    	//alert(obj+idx+int);
    	moveLeftCursor(obj,idx,totCol);
  	}  
  
  	//RIGHT화살표Click시
  	if(keyCode == 39){
    	//alert(obj,idx,int);
    	moveRightCursor(obj,idx,totCol);
  	}  

  	return;
}

/** 
 * Function Description: the function is moving up cursor.
 * @author Lim Jong O
 * @version 1.0
 * @param  obj: Current Object Name
 *         idx: Current Object index
 */   
function moveUpCursor(obj,idx){

  	//UP화살표Click시  
	if(eval("document.forms[0]." + obj + "[+idx-1]") != null){
  		eval("document.forms[0]." + obj + "[+idx-1].focus()");
    }
  	return;    
}

/** 
 * Function Description: the function is moving Down cursor.
 * @author Lim Jong O
 * @version 1.0
 * @param  obj: Current Object Name
 *         idx: Current Object index
 */   
function moveDownCursor(obj,idx){
	//Down화살표Click시  
	if(eval("document.forms[0]." + obj + "[+idx+1]") != null){
  		eval("document.forms[0]." + obj + "[+idx+1].focus()");
	}
  
	return;    
}

/** 
 * Function Description: the function is moving Left cursor.
 * @author Lim Jong O
 * @version 1.0
 * @param  obj: Current Object Name
 *         idx: Current Object index
 */   
function moveLeftCursor(obj,idx,totCol){
  
  	//Left화살표Click시  
  	for(i=0; i < totObj; i++){
   
    	if(document.forms[0].elements[i].name == obj){      
     
      		//alert(i+(idx*int)-1);
			if(document.forms[0].elements[i + (idx * totCol) - 1] != null){
      			document.forms[0].elements[i + (idx * totCol) - 1].focus();
      			break;  
			}	
    	}
 	}
  
  	return;    
}
/** 
 * Function Description: the function is moving right cursor.
 * @author Lim Jong O
 * @version 1.0
 * @param  obj: Current Object Name
 *         idx: Current Object index
 */   
function moveRightCursor(obj,idx,totCol){

  	for(i=0; i < totObj; i++){
    	if(document.forms[0].elements[i].name == obj){         
			
			if(document.forms[0].elements[i + (idx * totCol) + 1] != null){
      			document.forms[0].elements[i + (idx * totCol) + 1].focus();
      			break;
			}	
    	}
  	}   
   
   	return;
}