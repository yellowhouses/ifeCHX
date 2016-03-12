/**
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-03-11 14:57:00
 * @version V1.0
 */

var topMenu=document.getElementById("top-menu");
var menuItem=document.getElementById("top-nav").getElementsByTagName("li");

addEvent(topMenu,"mouseover",menuWhite);
addEvent(topMenu,"mouseout",menuAlpha);
addEvent(document,"scroll",menuScroll);
//项目下划线出现与消失函数
for(var i=0;i<menuItem.length;i++){
	menuItem[i].index=i;
	menuItem[i].onmouseover=function(){
		widthMove(menuItem[this.index].getElementsByTagName("span")[0],70);
	}

	menuItem[i].onmouseout=function(){
		widthMove(menuItem[this.index].getElementsByTagName("span")[0],0);
	}

}

//滚轮事件
function menuScroll(){
	if(document.scrollTop==0||document.body.scrollTop==0){
		/*topMenu.style.top=0;*/
		menuAlpha();
	}else{
		/*topMenu.style.top=(document.scrollTop||document.body.scrollTop)+"px";*/
		menuWhite();
	}

}
//鼠标放上去显现导航背景函数
function menuWhite(){
	topMenu.style.backgroundColor="#eee";
	topMenu.style.boxShadow=" 0 5px 20px #eee"
    for(var i=0;i<menuItem.length;i++){
    	menuItem[i].getElementsByTagName("a")[0].style.color="#818891";
    }
}
//鼠标移出隐藏导航背景函数
function menuAlpha(){
	topMenu.style.boxShadow="none"
	topMenu.style.background="none";
    for(var i=0;i<menuItem.length;i++){
    	menuItem[i].getElementsByTagName("a")[0].style.color="#eee";
    }
}
//兼容IE10及以下的事件绑定函数
function addEvent(ele,event,fn){
	if(window.attachEvent){
		return ele.attachEvent("on"+event,fn);
	}else{
		return ele.addEventListener(event, fn,false);
	}
}
//兼容IE8及以下的获取元素属性函数
function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele)[attr];
	}
}
//宽度运动函数
function widthMove(ele,target){
	clearInterval(ele.timer);
	ele.timer=setInterval(function(){
		var cur=parseInt(getStyle(ele,"width"));
		speed=(target-cur)/5;
		if(speed>0){
			speed=Math.ceil(speed);
		}else{
			speed=Math.floor(speed);
		}
		if(cur==target){
			clearInterval(ele.timer);
		}else{
			ele.style.width=cur+speed+"px";
		}
	}, 30);
}