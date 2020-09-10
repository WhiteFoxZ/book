/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA
 *
 * @ProcessChain   : Reuse GUI
 *
 * @File           : cellCopy.js
 *
 * @FileName       : Table의 Row의 특정 값을 특정 cell로 복사한다.(CellCopy)
 *
 * Open Issues     :
 *
 * Change history
 * @LastModifyDate : 20030506
 * @LastModifier   : 김성태
 * @LastVersion    : draft1A
 *     2003-05-20    김성태
 *     draft1A       for review
 *
*==============================================================================*/


/** Table의 Row의 특정 값을 특정 cell로 복사한다.
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param index : 인덱스값
 * @param src : source inputField 이름
 * @param des : dest inputField 이름
 */
function cellCopyone(index,src,des){

	var source = "";
	var idx =parseInt(index);
	source = returnTypeValue(src[idx]);
	insTypeValue(des,source);

}



/** Table의 Row의 특정 값의 Type를 결정한다.
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param des : dest inputField 이름
 * @param src : source inputField 이름
 */
function returnTypeValue(src){
	var source;
	switch (src.type) {
		case "text" :
		    source = src.value;
			break;
		case "select-one" :
			source = src.options[src.selectedIndex].innerHTML;
			break;
		case undefined :
			source = src.innerText;
			break;
	}
	return source;
}



/** Table의 Row의 특정 값의 Value를 Destination의 Type를 결정하여 대입
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param des : dest inputField 이름
 * @param src : source inputField 이름
 */
function insTypeValue(des,src){
	switch (des.type) {
		case "text" :
		    des.value = src;
			break;
		case "select-one" :
			selectedValue(des,src);
			break;
		case undefined :
			des.innerText = src;
			break;
	}

}



/** Table의 Row의 특정 값의 Type이 LOV일 경우 값을 Mapping
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param des : dest inputField 이름
 * @param src : source inputField 이름
 */
function selectedValue(des,src){
	var ln =des.length;
	for(var i=0 ; i < ln ; i++){
		if(des.options[i].innerHTML == src)
			des.selectedIndex = i;
	}
	
}


/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA
 *
 * @ProcessChain   : Reuse GUI
 *
 * @File           : cellCopy.js
 *
 * @FileName       : Row를 바로 아래로로 복사 (rowCellCopy)
 *
 * Open Issues     :
 *
 * Change history
 * @LastModifyDate : 20030506
 * @LastModifier   : 김성태
 * @LastVersion    : draft1A
 *     2003-05-20    김성태
 *     draft1A       for review
*==============================================================================*/

/** 처움 호출되는 Method (rowCellCopy)
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param table_id 대상 Table ID
 * @param chkname 대상 Checkbox name
 */
function rowCellCopy(table_id,chkname){
	var chk = chkedCellCopy(chkname);   // 체크 
	if( chk == true){ 
		mcopyRow(table_id.firstChild.firstChild);
	}		
	return false;
}



/** 중첨 루프 Method (rowCellCopy)
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param trtag 대상 Table 의 첫번째 Row
 */
function mcopyRow(trtag) {
	if (trtag) {
		var tdtag = trtag.firstChild;
		var chktag = tdtag.firstChild;
		
		if (trtag.nextSibling) mcopyRow(trtag.nextSibling);
				
		if (chktag.checked == true && trtag.nextSibling) copyRow(trtag);
	}
}	



/** 복사를 실행하는 Method (rowCellCopy)
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param trtag 대상 Table 의 체크된 Row
 */
function copyRow(trtag) {

	var oCloneNode = trtag;
	var nextTrtag= trtag.nextSibling;
	var source="";
	var colCount = oCloneNode.childNodes.length
	

	for(var i = 0 ; i < colCount ; i++ ) {

		var src = oCloneNode.childNodes[i].firstChild;
		var des = nextTrtag.childNodes[i].firstChild;

		switch (src.type) {
			case "text" :
				des.value = src.value;
				break;
			case "select-one" :
				selectedValue(des, src.options[src.selectedIndex].innerHTML);
				break;
			case undefined :
				nextTrtag.childNodes[i].innerHTML = oCloneNode.childNodes[i].innerHTML;
				break;
			case "" :
				nextTrtag.childNodes[i].innerHTML = oCloneNode.childNodes[i].innerHTML;
				break;
			default :
				break;
		}
	}
}



/** 첫 column의 checkbox중 체크 되어 있는 Row가 있는지 체크하는 Method
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param chkname 대상 Checkbox name
 */
function chkedCellCopy(chkname) {
	var result=false;
	for(var chkno = 0 ; chkno < chkname.length ; chkno++){
		if (chkname[chkno].checked){
			result = true;
		}
	}
	return result
}