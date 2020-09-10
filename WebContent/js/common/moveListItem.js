/*==============================================================================
*Copyright(c) 2003 POSCO/POSDATA
*
*@ProcessChain : Reuse
*
*@File        : moveListItem.js
*
*@FileName : moveListItem
*
*Open Issues :
*
*Change history 
*@LastModifyDate : 20030522
*@Author            : 강정미
*@LastModifier      : 강정미
*@LastVersion       : 1.0
*    2003-05-16   강정미
*        Draft1A     최초 생성
*
*    2003-05-22   강정미
*        1.0         배포
*==============================================================================*/

/**
* 왼쪽 ListBox의 선택된 데이타를 오른쪽 ListBox의 마지막 index에 list item을 추가하는 메소드
* @param leftObj 왼쪽ListBox객체, rightObj 오른쪽ListBox객체
*/
function right_Select_Click(leftObj, rightObj){
	alert(rightObj.length);
	var idx = rightObj.length;
		for(var i = 0; i < leftObj.length; i++){
			if(leftObj.options[i].selected){
				rightObj.length += 1;
				rightObj.options[idx].text = leftObj.options[i].text;
				rightObj.options[idx].value = leftObj.options[i].value;
				leftObj.options[i] = null;
			}
		}
}

/**
* 오른쪽 ListBox의 선택된 데이타를 왼쪽 ListBox의 마지막 index에 list item을 추가하는 메소드
* @param leftObj 왼쪽ListBox객체, rightObj 오른쪽ListBox객체
*/
function left_Select_Click(leftObj, rightObj){
	var idx = leftObj.length;
		for(var i = 0; i < rightObj.length; i++){
			if(rightObj.options[i].selected){
				leftObj.length += 1;
				leftObj.options[idx].text = rightObj.options[i].text;
				leftObj.options[idx].value = rightObj.options[i].value;
				rightObj.options[i] = null;
			}
		}
}

/**
* 아래쪽 ListBox의 선택된 데이타를 윗쪽 ListBox의 마지막 index에 list item을 추가하는 메소드
* @param upObj 윗쪽ListBox객체, downObj 아래쪽ListBox객체
*/
function up_Select_Click(upObj, downObj){
	var idx = upObj.length;	
		for(var i = 0; i < downObj.length; i++){
			if(downObj.options[i].selected){			
				upObj.length += 1;
				upObj.options[idx].text = downObj.options[i].text;
				upObj.options[idx].value = downObj.options[i].value;
				downObj.options[i] = null;
			}
		}
}

/**
* 윗쪽 ListBox의 선택된 데이타를 아래쪽 ListBox의 마지막 index에 list item을 추가하는 메소드
* @param upObj 윗쪽ListBox객체, downObj 아래쪽ListBox객체
*/
function down_Select_Click(upObj, downObj){
	var idx = downObj.length;
	
		for(var i = 0; i < upObj.length; i++){
			if(upObj.options[i].selected){		
				downObj.length += 1;
				downObj.options[idx].text = upObj.options[i].text;
				downObj.options[idx].value = upObj.options[i].value;
				upObj.options[i] = null;
			}
		}
}


/**
* 하나의 ListBox에서 아이템을 선택하고 그 아이템의 list 인덱스를 하나씩 위로 올리는 메소드
* @param objItem 선택한ListBox
*/
function oneStepUp(objItem) {
	var item = objItem.selectedIndex;
	if (item != 0){			
		var temp = objItem.options[item].text;
		objItem.options[item].text = objItem.options[item-1].text;
		objItem.options[item-1].text = temp;
		objItem.options[item-1].selected =true;
	}
}


/**
* 하나의 ListBox에서 아이템을 선택하고 그 아이템의 list 인덱스를 하나씩 아래로 내리는 메소드
* @param objItem 선택한ListBox
*/
function oneStepDown(objItem) {
  var item = objItem.selectedIndex;
	if (item < objItem.length){			
		var temp = objItem.options[item].text;
		objItem.options[item].text = objItem.options[item+1].text;
		objItem.options[item+1].text = temp;
		objItem.options[item+1].selected =true;
		objItem.options[item].selected =false;
	}
}

/**
* select box에서 선택한 값으로 연결된 하나의 ListBox에서 Item들을 ascending/descending 하는 기능
* @param SortField 선택한ListBox, obj ascending/descending을 선택할 수 있는 Select ListBox
*/
var NewOption = new Array();

function arrangeList(SortField, obj){
	if(NewOption.length == 0)
	{
		for(var i=0; i < SortField.options.length; i++)
		{
			NewOption[i] = new Option();
			NewOption[i] = SortField.options[i];
		}	
	}else{
		NewOption.reverse(); 
	}

	while(SortField.options.length)
	{
	  d = SortField.options.length - 1;
	  SortField.remove(d);
	}
	
	//NewOption.reverse(); 
	CombSort(NewOption, obj.value);
	
  for(x=0; x < NewOption.length; x++)
  {
		SortField.options[x] = new Option();
		SortField.options[x] = NewOption[x];
  }
}

/**
* 소팅하는 메소드
* @param ArrIn SelectBox의 데이타을 담은 배열, idx 인덱스값
*/
function CombSort(ArrIn, idx)
{	
	var SF, gap, j, flipped, top;
	var temp = new Option();
	SF = 2;
	flipped = false;
	gap = ArrIn.length;

	do {
		gap = gap / SF;

		switch(gap)
		{
		  case 0:
		    gap = 1;
				break;
		  case 9:
		  case 10:
		    gap = 11;
				break;
		}
	
		flipped = false;
		top = ArrIn.length - gap;
		top = Math.floor(top)	;

		for(i=0; i<top; i++)
		{
		  j = i + gap;
		  j = Math.round(j);

			if(idx==1){		 
				if (ArrIn[i].text.toLowerCase() > ArrIn[j].text.toLowerCase())
				{			
					var temp = new Option();
					temp = ArrIn[i];
					ArrIn[i] = ArrIn[j];
					ArrIn[j] = temp;
					flipped = true;
				}		

			}else {			 
				if (ArrIn[i].text.toLowerCase() < ArrIn[j].text.toLowerCase())
				{			
					var temp = new Option();
					temp = ArrIn[i];
					ArrIn[i] = ArrIn[j];
					ArrIn[j] = temp;
					flipped = true;
				}				
			}
		}
	}while(flipped || (gap > 1));
}