/*==============================================================================
 * Copyright(c) 2003 POSCO/POSDATA                                                
 *                                                                                
 * @ProcessChain   : Reuse
 *                                                                                  
 * @File           : treelist.js
 *                                                                                  
 * @FileName       : 트리
 *                                                                                  
 * Open Issues     : 
 *                                                                                
 * Change history
 * @LastModifyDate : 2003/05/19
 * @Author         : 이완종                                                 
 * @LastModifier   : 이완종                                                   
 * @LastVersion    : draft1A
 *     2003-05-01    이완종
 *     draft1A       for review
 * @description    :
 *		Internet Explorer 5.5 이상의 버전만을 지원한다
 *                                                                                
 *==============================================================================*/
// composite패턴에서 client의 역할을 수행하는 객체

function TreeList()
{
	// 객체의 빠른 접근을 위한 인덱스 테이블
	this.indexTable     = new Array();
	// 현재 브라우저의 종류를 나타낸다(OTHER=0, MS=1, NS=2)
	this.browserVersion = 0;
	// 트리가 생성될 때의 객체의 이름(기본값:treelist)
    this.name           = "treelist"; 
	this.bTextLink      = true;
	this.count          = 0;
	this.tTrame         = "_blank";
	this.bNewWin        = false;
	this.images         = null;

	// 객체의 초기화
	this.init = function() {
		if ( document.all ) {
			this.setVersion(1);
		} else if ( document.layers) {
			this.setVersion(2);
			self.onresize = this.doResize;
		} else {
			this.setVersion(0);
		}
	}

	// 트리에 필요한 각종 이미지를 설정하는 함수
	this.setImages = function(obj) {
		this.images = obj;
	}
	
	// 객체를 테이블에 추가한다
	this.setObject = function(objId, obj) {
		this.indexTable[objId] = obj;
		return obj;
	}
	
	// 현재의 브라우저 버전을 설정
	this.setVersion = function(ver) {
		this.browserVersion = ver;
	}	

    // 트리객체의 오브젝트명을 설정한다
    // 다수의 트리가 한 페이지에 존재할 경우에 각각을 구분해주기 위해서 필요하다
    this.setName = function(name) {
        this.name = name;
    }
	
	// 전체 트리를 화면에 출력한다
	this.display = function() {
		var root = this.indexTable[0];
		if ( root ) {
			// level, lastnode, link를 입력한다
			root.draw(0,1,"");
			root.show();
		}
		// ROOT폴더를 열린상태로 만든다
		this.clickOnNode(0);
		this.clickOnNode(0);
	}
	
	this.clickOnFolder = function(objId) {
		var clickedFolder = this.indexTable[objId];
		
		// 이 부분은 생각을 좀더 해야겠다.
		// 왜냐하면 설명을 클릭했을 때 expand되었다가 다시 클릭하면 
		// collapse되어야하는데 지금 그렇게 되지 않고 있다.
		if ( !clickedFolder.bOpen ) {
			this.clickOnNode(objId);
		}
		return false;
	}
	
	// 폴더에만 node가 존재하므로 폴더일때만 작동한다
	this.clickOnNode = function(objId) {
		var clickedNode = null;
		var state       = false;
		
		clickedNode = this.indexTable[objId];

		state       = clickedNode.bOpen;
		
		// toggle
		clickedNode.toggle(!state);
		
		// 링크를 클릭했을 때 다른 페이지로 분기하는 것을 막기 위해서 false를 반환
		return false;		
	}
	
	this.go = function(ref) {
		if ( !opener.closed ) {
			this.openWindow(ref);	
		} else {
			window.open(ref, "newW");
		}
	}
	
	this.openWindow = function(ref) {
		opener.document.location = ref;
	}
		
	// 생성자의 역할을 한다.
	this.init();
}

// composite패턴에서 최상위의 component의 역할을 하는 객체
// 이 객체는 단독으로 사용될 수 없고 항상 Folder또는 Item객체의 멤버로 등록되어야 한다.
// 왜냐하면 자바스크립트는 상속의 개념이 없기 때문에 Entry객체를 Folder 또는 Item객체의
// 상위 객체로서 사용한다
function Entry(treeObj, description, reference, value)
{
    // 엔트가 등록되는 트리객체
    this.treeObj = treeObj;
	
	// 객체가 등록될 때 설정된다

    // 객체설명
	this.desc    = description;	
	// 객체링크
	this.link    = reference;	
	// 코드값
    this.value   = value;     
	// 객체식별자(인덱스테이블에서 식별자로서 역할을 함)
	this.id	     = -1;			

	// 객체의 내용이 html로 출력될 때 값이 설정된다
	// HTML중 객체의 테이블 식별자
	this.obj     = null;
	// HTML중 객체의 이미지식별자
	this.iconImg = null;
	// HTML중 각 노드의 이미지식별자
	this.nodeImg = null;			
	
	// 테이블 식별자, 폴더 또는 아이템 식별자, 및 노드 식별자를 설정한다
	this.setIds = function( objName ) {
		this.obj	= document.all[objName+this.id];
		this.iconImg= document.all[objName+"Icon"+this.id];
		this.nodeImg= document.all[objName+"nodeIcon"+this.id];			
	}
	
	// 이 함수는 가상함수를 제공하는 것으로 기본적으로 자신의 식별자를 만든다
	// 매개변수 obj를 사용하기 위해서 재정의하여 사용해야 한다
	this.add = function(obj){		
		this.id = this.treeObj.count;
		this.treeObj.setObject(this.id, obj);
		this.treeObj.count++;
	}
	
	// 현재의 객체를 숨긴다
	this.hide = function() {
		if ( this.obj.style.display == "none" ) {
			return;
		}
		this.obj.style.display = "none"
	}
	
	// 현재의 객체를 보이게 한다
	this.show = function() {
		this.obj.style.display = "block";
	}
	
}

// composite역할을 하는 Container로서 folder또는 item을 똑같은 방법으로 
// 다루기 위해서 필요하다
function Folder(treeObj, folderDesc, folderLink, value)
{	
	// Entry객체를 상속한다.
	this.entry     = new Entry(treeObj, folderDesc, folderLink, value);
	// folder고유의 멤버변수
	// 자식객체를 저장하는 배열
	this.children  = new Array();	
	// 자식의 갯수
	this.nChildren = 0;
	// 현재 폴더가 마지막 노드인지를 판단하는 플래그
	this.bLastNode = false;			
	// 폴더가 열려있는지를 판단하는 플래그
	this.bOpen     = true;			
	
	// 객체를 초기화한다
	this.init = function() {
        var treeName = this.entry.treeObj.name;
        
		if ( treeObj.bNewWin && this.entry.link ) {
			this.entry.link = "javascript:"+treeName+".go(\""+this.entry.link+"\")";
		}
		
		// 인덱스 테이블에 등록한다
		this.entry.add(this);
	}
	
	// 함수의 override가 필요하면 여기서 재정의 해야한다.	
	this.hide = function() {
		this.entry.hide();
		this.toggle(false);
	}
	this.show = function() {
		this.entry.show();
	}
	
	this.add  = function(obj) {
		// 폴더의 자식으로서 등록
		this.children[this.nChildren] = obj;
		this.nChildren++;
		return obj;
	}
	
	// 좌측 장식과 객체의 내용을 출력한다
	this.draw = function(level, lastNode, decorator) {
		var img;		// 이미지
		var stag;		// Node를 클릭했을 때 반응하는 action을 지정하기 위한 시작태그
		var etag;		// stag의 종료태그
		var folderId;	// 현재의 아이디(스크립트를 간단하게 위해서)
        var treeName;
				
		folderId = this.entry.id;
        treeName = this.entry.treeObj.name;
						
		// 노드를 클릭할 경우에 반응하는 action을 설정한다
		stag = "<a href='javascript:;' onMouseDown=\"return "+treeName+".clickOnNode("+folderId+");\">";
		etag = "</a>";

		// 자신을 출력한다
		if ( level > 0 ) {
			var nodeimg;
            var imgSrc;
            var folderName = treeName+"nodeIcon"+folderId;
			if ( lastNode ) {
                nodeimg = this.entry.treeObj.images.mlastnode;
                imgSrc  = this.entry.treeObj.images.blank;
				img = "<img name='"+folderName+"' src='"+nodeimg+"' width=16 height=22 border=0>";
				this.drawObj(decorator + stag + img + etag);				
				decorator = decorator + "<img src='"+imgSrc+"' width=16 height=22 border=0>";
				this.bLastNode = true;
			} else {
				// 자식이 있는 경우는 pnode.gif로 표시하고 그리고 링크를 걸고
				// 하지만 자식이 없는 경우는 node.gif를 표시하고 링크를 걸지 않는다
				if ( this.nChildren ) {
					nodeimg = this.entry.treeObj.images.pnode;
					img = "<img name='"+folderName+"' src='"+nodeimg+"' width=16 height=22 border=0>";
					this.drawObj(decorator + stag + img + etag);			
					
				} else {
					nodeimg = this.entry.treeObj.images.node;
					img = "<img name='"+folderName+"' src='"+nodeimg+"' width=16 height=22 border=0>";
					this.drawObj(decorator + img );								
				}
                imgSrc = this.entry.treeObj.images.vline;
				decorator = decorator + "<img src='"+imgSrc+"' width=16 height=22 border=0>";
				this.bLastNode = false;
			}
		} else {
			// Root를 출력한다
			this.drawObj("");
		}
				
		// 자식이 있으면 자식을 출력한다
		if ( this.nChildren > 0 ) {
			var i=0;
			level++;
			for(i=0; i<this.nChildren; i++) {
				if ( i == (this.nChildren-1)) {
					this.children[i].draw(level, true, decorator);
				} else {
					this.children[i].draw(level, false, decorator);
				}
			}
		}
		
	}
	
	// 객체의 내용에 장식을 붙여 HTML형식으로 출력한다
	this.drawObj = function(decorator) {		
        var treeName   = this.entry.treeObj.name;
        var folderId   = treeName + this.entry.id;
        var folderIcon = treeName + "Icon" + this.entry.id;

		document.write("<TABLE ");
		document.write(" id = '"+folderId+"' style='position:block;' ");
		document.write(" border=0 cellspacing=0 cellpadding=0><tr><td>");
		document.write(decorator);	
		document.write("<img name='"+folderIcon+"' src='"+this.entry.treeObj.images.folderopen+"' border=0>");	
		document.write("</td><td valign=middle nowrap>");
		
		if ( this.entry.treeObj.bTextLink ) {
			this.writeLink();
			document.write("<NOBR>"+this.entry.desc+"</NOBR></a>");
		} else {
			document.write("<NOBR>"+this.entry.desc+"</NOBR>");
		}
		
		document.write("</td></tr></TABLE>");

		this.entry.setIds(treeName);		

	}
	
	this.writeLink = function() {
        var treeName = this.entry.treeObj.name;
		if ( this.entry.link ) {
			document.write("<a href='"+this.entry.link+"' target=\""+this.entry.treeObj.tFrame+"\" ");
			document.write(" onMouseDown="+treeName+".clickOnFolder('"+this.entry.id+"')>");			
		} else {
			if ( this.entry.id != 0 ) {
				document.write("<a href='javascript:;' onMouseDown=\""+treeName+".clickOnFolder('"+this.entry.id+"'); return false;\">");
			}
		}
	}
	
	this.toggle = function(bOpen) {
		// 현재의 상태와 같으면 그냥 종료한다
		if ( this.bOpen == bOpen ) {
			return;
		}
		
		this.bOpen = bOpen;
		this.propagate();
	}
	
	// 노드아이콘 폴더아이콘을 상태에 맞는 아이콘으로 바꾸고,
	// bOpen이 true이면 자식을 펼지고 false이면 자식을 감춘다
	this.propagate = function() {
		var i = 0;
		if ( this.bOpen ) {
			// 노드아이콘을 바꾼다
			if ( this.entry.nodeImg ) {							
				if ( this.bLastNode ) {
					this.entry.nodeImg.src = this.entry.treeObj.images.mlastnode;
				} else {
					this.entry.nodeImg.src = this.entry.treeObj.images.mnode;
				}
			}
			// 폴더 아이콘을 바꾼다
			this.entry.iconImg.src = this.entry.treeObj.images.folderopen;
			// 자식이 있는 경우에 자식을 보이게 만든다
			for(i=0; i<this.nChildren; i++ ) {
				this.children[i].show();
			}
		} else {
			// 노드아이콘을 바꾼다
			if ( this.entry.nodeImg ) {							
				if ( this.bLastNode ) {
					this.entry.nodeImg.src = this.entry.treeObj.images.plastnode;
				} else {
					this.entry.nodeImg.src = this.entry.treeObj.images.pnode;
				}
			}
			// 폴더 아이콘을 바꾼다
			this.entry.iconImg.src = this.entry.treeObj.images.folderclosed;
			// 자식이 있는 경우에 자식을 보이지 않게 한다
			for(i=0; i<this.nChildren; i++ ) {
				this.children[i].hide();
			}			
		}
	}
	
	// 생성자의 역할을 수행한다(변수의 초기화)
	this.init();

}

// composite패턴에서 LEAF에 해당되는 객체
function Item(treeObj, target, itemDesc, itemLink, value)
{	
	// Entry객체를 상속한다
	this.entry = new Entry(treeObj, itemDesc, itemLink, value);
	this.target = target;
	
	// 객체의 초기화
	this.init = function() {
		var ref     = "";
		var fullRef = "";
        
		if ( this.entry.treeObj.bNewWin && this.entry.link ) {
			ref = "javascript:"+this.entry.treeObj.name+".go(\""+this.entry.link+"\")";
		} else {
			ref = this.entry.link;
		}
		
		if ( ref != "" ) {
			if ( this.target == "" ) {
				fullRef = "'"+ref+"' target=\""+this.entry.treeObj.tFrame+"\"";
			} else {
				fullRef = "'"+ref+"' target=\""+this.target+"\"";
			}
		}
		
		this.entry.link = fullRef;
		
		this.entry.add(this);
	}
	
	// 함수의 override가 필요하면 여기서 재정의 해야한다.	
	this.hide = function() {
		this.entry.hide();
	}
	this.show = function() {
		this.entry.show();
	}
	
	this.draw = function(level, lastNode, decorator) {
		// 이미지
		var img;		
		
		// item은 자식을 가지고 있지 않기 때문에 자기 자신만을 출력하면 된다.
		if ( level > 0 ) {
			if ( lastNode ) {
				img = "<img src='"+this.entry.treeObj.images.lastnode+"' width=16 height=22>";				
			} else {
				img = "<img src='"+this.entry.treeObj.images.node+"' width=16 height=22>";
			}
			this.drawObj(decorator+img);
		} else {
			this.drawObj("");
		}
	}
	
	// 객체의 내용에 장식을 붙여 HTML형식으로 출력한다
	this.drawObj = function(decorator) {
        var treeName = this.entry.treeObj.name;
        var itemId   = treeName + this.entry.id;
        var itemIcon = treeName + "Icon" + this.entry.id;

		document.write("<TABLE ");
		document.write(" id='"+itemId+"' style='position:block;' ");			
		document.write("border=0 cellspacing=0 cellpadding=0><tr><td>");
		document.write(decorator);
		document.write("<img id='"+itemIcon+"' src='"+this.entry.treeObj.images.doc+"' border=0>");
		document.write("</td><td valign=middle nowrap>");
		
		if ( this.entry.treeObj.bTextLink && this.entry.link ) {
			document.write("<NOBR>");
            if ( typeof(this.entry.treeObj.OnClick) == 'undefined' ) {
    			document.write("<a href="+this.entry.link+">"+this.entry.desc+"</a>");
            } else {
                document.write("<a href='javascript:;' OnClick="+treeName+".OnClick("+treeName+".indexTable["+this.entry.id+"])>"+this.entry.desc+"</a>");
            }
			document.write("</NOBR>");	
		} else {
			document.write("<NOBR>"+this.entry.desc+"</NOBR>");
		}
		
		document.write("</td></tr></TABLE>");	

		this.entry.setIds(treeName);
		
	}
	
	// 생성자의 역할을 수행한다
	this.init();
}

function TreeImages(imgpath)
{
	this.plastnode    = imgpath + "/m000814img.gif";
	this.folderopen   = imgpath + "/m000815img.gif";
	this.mnode        = imgpath + "/m000816img.gif";
	this.pnode        = imgpath + "/m000817img.gif";
	this.blank        = imgpath + "/m000818img.gif";
	this.folderclosed = imgpath + "/m000819img.gif";
	this.mlastnode    = imgpath + "/m000820img.gif";
	this.lastnode     = imgpath + "/m000821img.gif";
	this.node         = imgpath + "/m000822img.gif";
	this.doc          = imgpath + "/m000823img.gif";
	this.vline        = imgpath + "/m000824img.gif";
	
	this.init = function() {
		// 이미지를 preloading한다
		var img1 = new Image();
		img1.src = this.plastnode;
		
		var img2 = new Image();
		img2.src = this.folderopen;
		
		var img3 = new Image();
		img3.src = this.mnode;
		
		var img4 = new Image();
		img4.src = this.pnode;
		
		var img5 = new Image();
		img5.src = this.blank;
		
		var img6 = new Image();
		img6.src = this.folderclosed;
		
		var img7 = new Image();
		img7.src = this.mlastnode;
		
		var img8 = new Image();
		img8.src = this.lastnode;
		
		var img9 = new Image();
		img9.src = this.node;
		
		var img10 = new Image();
		img10.src = this.doc;
		
		var img11 = new Image();		
		img11.src = this.vline;
	}
	
	this.init();
}