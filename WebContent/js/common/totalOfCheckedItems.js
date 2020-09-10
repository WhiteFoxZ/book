/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA                                                
 *                                                                                
 * @ProcessChain   : Reuse
 *                                                                                  
 * @File           : totalOfCheckedItems.js
 *                                                                                  
 * @FileName       :
 *                                                                                  
 * Open Issues     : 
 *                                                                                
 * Change history
 * @LastModifyDate : 2003-05-21
 * @Author         :      정창호                                           
 * @LastModifier   :      정창호                                              
 * @LastVersion    : 
 *     2003-05-01    
 *     draft1A       for review
 *     1.0           배포                                                                           
 *==============================================================================*/



/**---------------------------------------------------------------------------------------------------
 *	totalOfCheckedItems Method
 **---------------------------------------------------------------------------------------------------*/

/**
* @Function 명		: doTotalOfCheckedItems
* @Function 설명		: 체크된 row의 특정 cell의 합을 구하는 Function
* @Param 		: f_name - form name 
*			  ck_name - checkbox name
*			  cell_name - 값이 더해질 특정 셀 name
*			  tot_name - 더해진 값을 display하는 셀 name
* @return값		: 
* @사용 Event 		: onClick
* @see 				
*/

function doTotalOfCheckedItems(f_name, ck_name, cell_name, tot_name)
{
	var doc=document.f_name;
	var total=0;
	var tmp=0;
	
	if(ck_name.length>0)
	{
			for (var i = 0; i <ck_name.length; i++) 
			{
				if (ck_name[ i ].checked == true)
				{
						
						 switch(cell_name[i].type)
						 {
						 case "text" :
								tmp=eval(cell_name[i].value);
								if(isNaN(tmp))
								{
									tmp=0;
								}
								else
								{
									tmp=eval(cell_name[i].value);
								}
															
								total +=tmp;
								break;
							 case undefined:
								tmp=eval(cell_name[i].innerText);
								
								if(isNaN(tmp))
								{
									tmp=0;
								}
								else{ tmp=eval(cell_name[i].innerText);}
								total+=tmp;
								break;
						}
				}
			}//for
			tot_name.value=total;
		}//if
		else 
		{
			if (ck_name.checked == true)
				{
						switch(cell_name.type)
						 {
						 case "text" :
								tmp=eval(cell_name.value);
								if(isNaN(tmp))
								{
									tmp=0;
								}
								else
								{
									tmp=eval(cell_name.value);
								}															
								
								break;
							
							 case undefined:
								tmp=eval(cell_name.innerText);
								
								if(isNaN(tmp))
								{
									tmp=0;
								}
								else
								{ 
									tmp=eval(cell_name.innerText);
								}
								
								break;
						}
				}
			tot_name.value=tmp;
		}
}