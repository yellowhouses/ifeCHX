 /**
  * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-04-30 
 * @version V1.0.0
 */
 function creEle(tag){
 	return document.createElement(tag)
 }
 
 function Table(opt){
 	this.options={
 		editable:true,
 		sequence:true,
 		raws:3,
 		cell:5,
 		freeze:true,
 	}
 	if(opt){
 		for(var key in opt){
 			this.options[key]=opt[key];
 		}
 	}
 }


 Table.prototype.create = function(){
 	 raws=this.options.raws;
     cells=this.options.cell;
     this.Table_container=creEle("table");
     this.Table_container.className="table-container";
     this.Table_head=creEle("thead");
     this.Table_headRaw=creEle("tr");
     this.Table_head.appendChild(this.Table_headRaw);
     this.Table_container.appendChild(this.Table_head);

     //创建按钮数组
     this.Table_btnArr=[];
     for(var i=0;i<cells;i++){
     	this.Table_btnArr[i]=creEle("span");
     	this.Table_btnArr[i].setAttribute("contenteditable", "false");
     }

     for(var i=0;i<cells;i++){
     	var cellTemp=creEle("td");
     	cellTemp.innerHTML="title";
     	cellTemp.setAttribute("contenteditable", "true");

     	//判断是否需要排序，需要则添加按钮
     	if(this.options.sequence){
     		cellTemp.appendChild(this.Table_btnArr[i]);
     	}
     	this.Table_headRaw.appendChild(cellTemp);
     }

     this.Table_body=creEle("tbody");
     this.Table_container.appendChild(this.Table_body);
     this.Table_bodyRaws=[];
     //创建主体的表格行
     for(var j=0;j<raws-1;j++){
     	this.Table_bodyRaws[j]=creEle("tr");
     	for(var k=0;k<cells;k++){
     		var bodyCell=creEle("td");
     		bodyCell.setAttribute("contenteditable", "true")
     		this.Table_bodyRaws[j].appendChild(bodyCell);
     	}
     }

     //向tbody添加行
     for(var i=0;i<this.Table_bodyRaws.length;i++){
     	this.Table_body.appendChild(this.Table_bodyRaws[i]);
     }
  	return this.Table_container;
 }

Table.prototype.sequence= function(btnArr,table,rawArr,chinese){
	 var btns=btnArr||this.Table_btnArr;
	 var tableContainer=table||this.Table_container;
	 var tableRaws=rawArr||this.Table_bodyRaws;
	 //创建布尔值数组
	 var boolArr=[]
	 for(var i=0;i<tableRaws.length;i++){
	 	boolArr.push(true);
	 }
	var cellsArr=document.getElementsByTagName("td");
	for(var x=0;x<cellsArr.length;x++){
		cellsArr[x].onblur=function(){
			for(var i=0;i<btns.length;i++){
			btns[i].index=i;
			btns[i].onclick=function(){			
				var n=this.index;
				function sortFnAsc(a,b){
					return a.cells[n].innerHTML.trim()-b.cells[n].innerHTML.trim()
				}

				//降序排列函数
				function sortFnDes(a,b){
					return b.cells[n].innerHTML.trim()-a.cells[n].innerHTML.trim()
				}	

				//中文按字母表升序排列函数
				function sortFnAscCh(a,b){
					return a.cells[0].innerHTML.trim().localeCompare(b.cells[0].innerHTML.trim())
				}

				//中文按字母表降序排列函数
				function sortFnDesCh(a,b){
					return b.cells[0].innerHTML.trim().localeCompare(a.cells[0].innerHTML.trim())
				}

				//开始排序
        		if(chinese===true){
        			if(boolArr[n]){
						tableRaws.sort(sortFnAscCh);
					}else{
						tableRaws.sort(sortFnDesCh);
					}
        		}else{
        			if(boolArr[n]){
						tableRaws.sort(sortFnAsc);
					}else{
						tableRaws.sort(sortFnDes);
					}
        		}
		
				//将排序的结果重新写入表格
				for(var k=0;k<tableRaws.length;k++){
					tableContainer.appendChild(tableRaws[k]);
				}

				boolArr[n]=!boolArr[n]
				}
			}
		}
	}
}

//冻结函数
Table.prototype.freeze=function(freezeRaw,table){
	var freeze=freezeRaw||this.Table_headRaw;
	var tableContainer=table||this.Table_container;
	var containerHei=tableContainer.offsetHeight;
	var freezeTop=freeze.offsetTop;
	document.addEventListener("scroll", function(){
		var top=document.documentElement.scrollTop||document.body.scrollTop;
		if((top>freezeTop)&&(top<(freezeTop+containerHei))){
			freeze.style.position="fixed";
			freeze.style.top=0;
		}else{
			freeze.style.position="static";
		}
	},false);
}