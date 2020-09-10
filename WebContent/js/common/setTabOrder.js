 /** -------------------------------------------------------------------------
  * COMPONENT   ID: PMC_UI_JS_043
  * COMPONENT NAME: The setTabOrder Method  
  * Designer      : Lim Jong O
  * @author       : Lim Jong O
  * @version      : 1.0.0
  * Description   : 
  * Revision History --------------------------------------------------------
  *  Version Date       Description
  *  1.0.0   2003/04/16 상세설계에 의거
  * -------------------------------------------------------------------------
  */
  
/** 
 * Function Description: the function is moving cursor by Tab Key.
 * @author Lim Jong O
 * @version 1.0
 * @param  objIdx: Form object Index  
 */   
function setTabOrderIdx(objIdx)
{
  	objInx = parseInt(objIdx);
	var keyCode = event.keyCode;
	

	var totObj  = document.forms[0].elements.length;
	
	if(keyCode == 9){
    
        for(i=0; i < totObj; i++){
        	if(i == objIdx){      
        		
         		document.forms[0].elements[i - 1].focus();
         		break;     
        	}
    	}    
  	}
  	
  	return;
}
/** 
 * Function Description: the function is moving cursor by Tab Key.
 * @author Lim Jong O
 * @version 1.0
 * @param  nextObj: Next Taget Object Name
 */   
function setTabOrderObj(nextObj)
{
  	
  	var idx;
  	var keyCode = event.keyCode;
  	var totObj  = document.forms[0].elements.length;

  	if(keyCode == 9){

    	for(i=0; i < totObj; i++){
        	if(document.forms[0].elements[i].name == nextObj){      
        
        	document.forms[0].elements[i - 1].focus();
        	break;        
	      	}
   		} 
    }
  	return;
}