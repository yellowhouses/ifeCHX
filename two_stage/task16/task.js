/*
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-03-31 17:52:22
 * @version v1.0
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityName=document.getElementById("aqi-city-input").value.trim();
	var airValue=document.getElementById("aqi-value-input").value.trim();
	cityName=cityName.match(/\S+/g);
	if(parseInt(Number(airValue))!=airValue||!airValue){
		alert("空气质量指数请输入整数");
	}
	else if(!cityName){
		alert("城市名称请输入中英文字符");
	}
	else{
	aqiData[cityName.join("")]=parseInt(airValue);
	}//加上parseInt是为了防止用户可能输入类似12.0这样的数据
	/*alert(cityName);*/
}
/*var btn=document.getElementById("add-btn");
btn.onclick=addAqiData;*/

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var dataCon=document.getElementById("aqi-table");
	dataCon.innerHTML="";
	for(i in aqiData){
		dataCon.innerHTML+="<td>"+i+"</td><td>"+aqiData[i]+"</td><td><button>删除</button></td>"
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  /*var dataCon=document.getElementById("aqi-table");
  var delBtn=dataCon.getElementsByTagName("button");
  for(var i=0;i<delBtn.length;i++){
  	delBtn[i].onclick=function(){*/
  		/*dataCon.removeChild(this.parentNode.parentNode);
  		var delCity=this.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML.toString();*/
  		delete aqiData[city];
  /*	}
  }*/
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var btn=document.getElementById("add-btn");
  var dataCon=document.getElementById("aqi-table");
  btn.onclick=addBtnHandle;
  dataCon.onclick=function(event){
  	if(event.target.nodeName.toLowerCase()=="button"){
  		delBtnHandle(event.target.parentNode.previousSibling.previousSibling.innerHTML.toString());
  	}
  }
}
init();