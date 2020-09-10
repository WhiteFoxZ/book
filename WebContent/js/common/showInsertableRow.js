/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA
 *
 * @ProcessChain   : Reuse GUI
 *
 * @File           : showInsertableRow.js
 *
 * @FileName       : Table의 Row를 추가 또는 삭제
 *
 * Open Issues     :
 *
 * Change history
 * @LastModifyDate : 20030506
 * @LastModifier   : 김성태
 * @LastVersion    : 1.0
 *     2003-05-20    김성태
 *     1.0           최초 생성
 *
*==============================================================================*/


/** 기존Row 복사
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param table_id : table id 이름
 * @      eTable_id : hidden table id 이름
 * @      chkname : checkbox 이름
 */
function insRow(table_id,eTable_id,chkname){
	if (chkname == null && eTable_id == null )
	{
		return false;
	}

	if( chkname!= null && chked(chkname) ){			//체크박스를 선택되어 있을때 그 Row를 바로 위로 복사
		minsRow(table_id.firstChild.firstChild,chkname);
	}
	else{
		if( eTable_id != null){     //체크박스를 선택하지 않고 행삽입 눌룰시 빈 HiddenTable존재시 그 Table의 Row를 복사 
			insertRowNochk(table_id,eTable_id);
		}
	}
    return false;
}



function minsRow(trtag) {
	if (trtag) {
		var tdtag = trtag.firstChild;
		var chktag = tdtag.firstChild;
		
		if (trtag.nextSibling) minsRow(trtag.nextSibling);
				
		if (chktag.checked == true) insertRow(tdtag);
	}
}


function insertRow(tdtag) {
   var trtag = tdtag.parentElement;
   var oCloneNode = trtag.cloneNode(true);
   trtag.parentElement.insertBefore(oCloneNode,trtag);
   swapall(trtag,trtag.nextSibling);
}



function insertRowNochk(table_id,eTable_id){

		var hTrtag = eTable_id.firstChild.firstChild;
		var oCloneNode = hTrtag.cloneNode(true);
		table_id.firstChild.insertBefore(oCloneNode,null);
		if(table_id.firstChild.firstChild != null){
			trtag=table_id.firstChild.firstChild;
			swapall(trtag,trtag.nextSibling);
		}
}



/** 기존Row 삭제
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param table_id : source inputField 이름
 * @      chkname : dest inputField 이름
 */
function delRow(table_id,chkname){
	var chk = chked(chkname);   // 체크                       
	if( chk == true){			// 체크가 되어있는  Row를 삭제한다.
		mdelrow(table_id.firstChild.firstChild);
	}
    return false;
}


function mdelrow(trtag){
	if (trtag) {
	var tdtag = trtag.firstChild;
	var chktag = tdtag.firstChild;
	if (trtag.nextSibling) mdelrow(trtag.nextSibling);
	if (chktag.checked == true) removeRow(tdtag);
	}
}


function removeRow(tdtag) {
	var trtag = tdtag.parentElement;
	var Ttag = trtag.nextSibling;
	var tabtag = trtag.parentElement;
	tabtag.deleteRow(trtag.rowIndex);
	if (Ttag) swapall(Ttag,Ttag.nextSibling);
}


/** 기존Row 복사, 삭제시 인덱스 정렬 (index는 ShowTableTag에서 지원해 주는 속성이다-Td에 들어간다.)
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param trtag : source inputField 이름
 * @      Ttag : dest inputField 이름
 */
function swapall(trtag,Ttag) {
	var node;
	var chktag = trtag.firstChild.firstChild;
	
	// 다음 row가 존재시
	if (trtag.nextSibling) {	
		for(var ch =0 ; ch <trtag.childNodes.length ; ch++){	
			if(ch==0) chktag.value = Ttag.rowIndex-1;
			trtag.childNodes[ch].index = Ttag.rowIndex-1;
		}
		swapall(trtag.nextSibling,Ttag.nextSibling);

    //다음 row가 미존재시(마지막 Row일때)
	} else {									

		for(var ce =0 ; ce <trtag.childNodes.length ; ce++){
			if(ce==0) chktag.value =  trtag.rowIndex;
			trtag.childNodes[ce].index = trtag.rowIndex;
		}
    }
}



/** 첫 column의 checkbox중 체크 되어 있는 Row가 있는지 체크
 * @author 김성태
 * @company PosData Corporation
 * @version 1.0
 * @param chkname : source inputField 이름
 */
function chked(chkname) {
	var result=false;

	if(chkname.length == null){
		if (chkname.checked){
			result = true;
		}
	}
	else{
		for(var chkno = 0 ; chkno < chkname.length ; chkno++){
			if (chkname[chkno].checked){
				result = true;
			}
		}
	}
	return result
}