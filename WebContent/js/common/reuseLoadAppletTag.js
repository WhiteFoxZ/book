/*==============================================================================
*Copyright(c) 2006 POSCO/POSDATA
*
*@ProcessChain : Reuse
*
*@File        : reuseLoadAppletTag.js
*
*@FileName : reuseLoadAppletTag
*
*Open Issues :	 
*
*Change history 
*@LastModifyDate : 20060207
*@Author            : 박정숙
*@LastModifier      : 박정숙
*@LastVersion       : 1.0
*
*    2006-02-07   박정숙
*        1.0      배포(ActiveX 컨트롤 이슈해결을 위해 Java Script로 Applet Loading)
*==============================================================================*/


function loadApplet(id, name, width, height, align, className, codebase, archive, dataValue, paramId, paramValue)
{
    var reuseLoadAppletTagElement = document.createElement('<object id="'+ id + '" name="' + name + '" classid="clsid:CAFEEFAC-0014-0002-0011-ABCDEFFEDCBA" codebase="/signedjar/sunupgrade_j2re-1_4_2_11-windows-i586-p.exe#Version=1,4,2,11" width="' + width+ '" height="' + height +'" align="' + align + '" ></object>');
    var reuseLoadAppletTagParam1 = document.createElement('<param name="type" value="application/x-java-applet;jpi-version=1.4.2_11">');
    var reuseLoadAppletTagParam2 = document.createElement('<param name="code" value="'+ className +'">');
    var reuseLoadAppletTagParam3 = document.createElement('<param name="codebase" value="'+ codebase +'">');
    var reuseLoadAppletTagParam4 = document.createElement('<param name="archive" value="'+ archive +'">');
    
    reuseLoadAppletTagElement.appendChild(reuseLoadAppletTagParam1);
    reuseLoadAppletTagElement.appendChild(reuseLoadAppletTagParam2);
    reuseLoadAppletTagElement.appendChild(reuseLoadAppletTagParam3);
    reuseLoadAppletTagElement.appendChild(reuseLoadAppletTagParam4);
    
    if (dataValue != '') 
    {
        var reuseLoadAppletTagParam5 = document.createElement('<param name="data" value="'+ dataValue +'">');
        reuseLoadAppletTagElement.appendChild(reuseLoadAppletTagParam5);
    }
    
    for(var reuseI=0; reuseI < paramId.length; reuseI++) 
    {
        var reuseLoadAppletTagParam6 = document.createElement('<param name="'+ paramId[reuseI] +'" value="'+ paramValue[reuseI] +'">');
        reuseLoadAppletTagElement.appendChild(reuseLoadAppletTagParam6);
    }
    
    return reuseLoadAppletTagElement;
}

