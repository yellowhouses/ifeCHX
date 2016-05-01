/**
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-05-01 16:23:00
 * @version V1.0.0
 */
 function creEle(tag){
 	return document.createElement(tag)
 }

 function getColor(){
 	return Math.random().toString(16).substring(2,8);
 }

 function bodyHei(){
 	if(document.compatMode=="BackCompat"){
 		return document.body.clientHeight;
 	}else{
 		return document.documentElement.clientHeight;
 	}
 }

function Barrel(opt){
	this.options={
		imgNum:50,
		baseUrl:"http://placehold.it/",
	}
	if(opt){
		for(key in opt){
			this.options[key]=opt[key];
		}
	}
	window.onresize=function(){
    		barrel.render();
    	}
}
Barrel.prototype.init = function(){
	   this.create();
	   this.render();
	   var self=this;
	   window.onresize=function(){
	   		self.render();
	   }
	   
};
Barrel.prototype.create= function(){
	   var self=this; 
	   this.Barrel_imgContainer=creEle("div");
	   this.Barrel_imgContainer.className="img-container";
	   document.body.appendChild(this.Barrel_imgContainer);
	   this.Barrel_imgSource=[];
	   for(var i=0;i<this.options.imgNum;i++){
	   		var width=Math.floor(Math.random()*300+300);
	   		var height=Math.floor(Math.random()*30+300);
	   		var color=getColor();
	   		this.Barrel_imgSource.push({
	   			width:width,
	   			height:height,
	   			url:this.options.baseUrl+width+"x"+height+"/"+color+"/fff",
	   			ratio:width/height
	   		})
	   }
}
Barrel.prototype.render=function(){
	   //将图片分行
	   var raws=[];
	   var rawWidth=0;
	   var rawStart=0;
	   var rawEnd=0;

	   for(var j=0;j<this.Barrel_imgSource.length;j++){
	   		this.Barrel_imgSource[j].height=200;
	   		this.Barrel_imgSource[j].width=200*this.Barrel_imgSource[j].ratio;
	   		rawWidth+=this.Barrel_imgSource[j].width;
	   		rawEnd=j;
	   		if(rawWidth>this.Barrel_imgContainer.clientWidth){
	   			var lastWidth=rawWidth-this.Barrel_imgSource[j].width;
	   			var rawRatio=200/lastWidth;
	   			var lastHeight=rawRatio*(this.Barrel_imgContainer.clientWidth-(rawEnd-rawStart-1)*8);
	   			raws.push({
	   				imgstart:rawStart,
	   				end:rawEnd-1,
	   				lastHeight:lastHeight
	   			});
	   			rawWidth=this.Barrel_imgSource[j].width;
	   			rawStart=j;
	   		}
	   }
	   	
	   //开始渲染,添加DOM节点
	   var imgurl=[];
	   for(var i=0;i<this.Barrel_imgSource.length;i++){
	   		imgurl.push(this.Barrel_imgSource[i].url);
	   }
	 
	   	for(var i=0;i<raws.length;i++){
	   		var imgContainer=creEle("div");
	   		imgContainer.className="img-raw";
	   		for(j=raws[i].imgstart;j<=raws[i].end;j++){
	   			var imgContent=creEle("img");
	   			var imgBox=creEle("div");
	   			imgBox.className="img-box";
	   			imgBox.appendChild(imgContent);
	   			imgContainer.appendChild(imgBox);
	   			imgContent.src=imgurl[j];
	   			imgContainer.style.height=raws[i].lastHeight+"px";
	   			imgContent.style.height=raws[i].lastHeight+"px";
	   		}
	   		imgContainer.style.height=raws[i].lastHeight+"px";
	   		this.Barrel_imgContainer.appendChild(imgContainer);
	   	}

};


