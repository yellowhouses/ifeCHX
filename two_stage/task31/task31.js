/**
 * 
 * @authors huruji(谢志强) (594613537@qq.com@qq.com)
 * @date    2016-04-16 00:21:13
 * @version V1.0.0
 */
 var cityList=["北京","上海","广东"];
 var schoolList=[["北京大学","清华大学","北京师范大学","北京交通大学"],["上海交通大学","复旦大学","上海大学"],["中山大学","华南理工大学"]];
 var city=document.getElementById("city");
 var occupation=document.getElementById("user-change");
 var stuContainer=document.getElementById("student-container");
 var noStuCon=document.getElementById("no-stu-container");
 var school=document.getElementById("in-school");
 var schoolOp=document.getElementById("school");

 occupation.onchange=function(){
 	if(school.checked){
 		stuContainer.style.display="block";
 		noStuCon.style.display="none";
 	}
 	else{
 		stuContainer.style.display="none";
 		noStuCon.style.display="block";
 	}
 }
 city.onchange=function(){
 	var index=city.selectedIndex;
 	schoolOp.innerHTML="";
 	for(var i=0;i<schoolList[index].length;i++){
 		var tem=document.createElement("option");
 		tem.value=schoolList[index][i];
 		tem.innerHTML=schoolList[index][i];
 		schoolOp.appendChild(tem)
 	}
 }





