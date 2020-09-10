/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA                                                
 *                                                                                
 * @ProcessChain   : Reuse
 *                                                                                  
 * @File           : selectAll.js
 *                                                                                  
 * @FileName       : selectAll
 *                                                                                  
 * Open Issues     : 
 *                                                                                
 * Change history
 * @LastModifyDate : 20030519
 * @Author         : 김동호                                                 
 * @LastModifier   : 김동호                                                   
 * @LastVersion    : draft1A
 *     2003-05-01    김동호
 *     draft1A       for review
 *                                                                                
 *==============================================================================*/

var selectAllVar = true
var selectAllFormVar = true
var selectAllDocVar = true

function selectAll(name)
{
	
   if (name.length > 1) 
   {
   	
      for (var idx = 0; idx < name.length; idx++) 
      {
        var element = name[idx];

        if (element.type == "checkbox") 
        {
            element.checked = selectAllVar;
        }
      }
    } else 
    {
        var element = name;

        if (element.type == "checkbox") 
        {
            element.checked = selectAllVar;
        }  
    }  	
    
    if (selectAllVar == true)
    {
        selectAllVar = false;
    }
    else 
    {
        selectAllVar = true;
    }
    
    return;
}

function selectAllForm(form)
{
    for (var idx = 0; idx < form.elements.length; idx++) 
    {
        var element = form.elements[idx];

        if (element.type == "checkbox") 
        {
            element.checked = selectAllFormVar
        }
    }

    if (selectAllFormVar == true)
    {
        selectAllFormVar = false;
    }
    else 
    {
        selectAllFormVar = true;
    }
    
    return;
}

function selectAllDoc()
{
    for (var formIdx = 0; formIdx < document.forms.length; formIdx++)
    {
        var form = document.forms[formIdx];

        for (var idx = 0; idx < form.elements.length; idx++) 
        {
            var element = form.elements[idx];

            if (element.type == "checkbox") 
            {
                element.checked = selectAllDocVar
            }
        }
    }

    if (selectAllDocVar == true)
    {
        selectAllDocVar = false;
    }
    else 
    {
        selectAllDocVar = true;
    }
    
    return;
}

function toggleAll(name)
{
    for (var idx = 0; idx < name.length; idx++) 
    {
        var element = name[idx];

        if (element.type == "checkbox") 
        {
            element.checked = !element.checked;
        }
    }
    
    return;
}

function toggleAllForm(form)
{
    for (var idx = 0; idx < form.elements.length; idx++) 
    {
        var element = form.elements[idx];

        if (element.type == "checkbox") 
        {
            element.checked = !element.checked;
        }
    }

    return;
}

function toggleAllDoc()
{
    for (var formIdx = 0; formIdx < document.forms.length; formIdx++)
    {
        var form = document.forms[formIdx];

        for (var idx = 0; idx < form.elements.length; idx++) 
        {
            var element = form.elements[idx];

            if (element.type == "checkbox") 
            {
                element.checked = !element.checked;
            }
        }
    }

    return;
}