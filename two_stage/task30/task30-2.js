/**
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-04-13 16:31:06
 * @version V1.0.0
 */
var username=document.getElementById("user-name");
var nameMind=document.getElementById("name-remind");
var password=document.getElementById("user-pw");
var pwMind=document.getElementById("pw-remind");
var pwa=document.getElementById("user-pwa");
var pwaMind=document.getElementById("pwa-remind");
var adress=document.getElementById("user-adress");
var adressMind=document.getElementById("adress-remind");
var phone=document.getElementById("user-phone");
var phoneMind=document.getElementById("phone-remind");
var btn=document.getElementById("button");

var nameArr=["必填，长度为4-16个字符","填写正确","填写错误","名称不能为空"];
var passwordArr=["必填，长度为4-16个字符","密码符合","密码长度为4-16个字符"];
var comArr=["请确认密码","填写正确","填写错误，请检查"];
var passRe=/[\w\^\$\.\*\+\?\=\!\:\|\\\/\(\)\[\]\{\}@#%~`,;""&]{4,16}/;
var adressRe=/[\w]+@[\w]+\.[\w]+/;
var phoneRe=/[\d]{11}/;
var lastCheckArr=[nameArr,passwordArr,comArr,comArr,comArr];
var lastCheckIn=[nameMind,pwMind,pwaMind,adressMind,phoneMind];


function CheckValue(ele,arr){
	this.ele=ele;
	this.arr=arr;
}
CheckValue.prototype.checkCom=function(re){
	var arr=this.arr;
	var ele=this.ele;
	ele.onfocus=function(){
		var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
		focusCom(ele,mind,arr[0]);
		this.onblur=function(){
		    blurCom(ele,mind,arr,re.test(ele.value));
		}
}
}
CheckValue.prototype.checkPwa=function(itarget){
	var arr=this.arr;
	var ele=this.ele;
	this.ele.onfocus=function(){
		var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
		focusCom(ele,mind,arr[0]);
		var targetValue=itarget.value;
		this.onblur=function(){
			blurCom(ele,mind,arr,ele.value==targetValue&&passRe.test(targetValue));
	}
}
}
CheckValue.prototype.checkName=function(mind4){
	var arr=this.arr;
	var ele=this.ele;
	ele.onfocus=function(){
		var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
		focusCom(ele,mind,arr[0]);
		this.onblur=function(){
			var count=0;
			for(var i=0;i<this.value.length;i++){
				var reCh=/[\u4e00-\u9fa5]/;
                var reEn=/[\w\^\$\.\*\+\?\=\!\:\|\\\/\(\)\[\]\{\}@#%~`,;""&]/;
                if(reCh.test(this.value[i])){
                    count+=2;
                }
                else if(reEn.test(this.value[i])){
                    count++
                }
                else{
                	count=-1;
                	break;
                }
			}
			blurCom(ele,mind,arr,count>=4&&count<=16,count==0);
		}
	}
}
var checkname=new CheckValue(username,nameArr);
var checkPw=new CheckValue(password,passwordArr);
var checkPwcon=new CheckValue(pwa,comArr);
var checkAdress=new CheckValue(adress,comArr);
var checkPhone=new CheckValue(phone,comArr);
checkname.checkName(nameArr[3]);
checkPw.checkCom(passRe);
checkPwcon.checkPwa(password);
checkAdress.checkCom(adressRe);
checkPhone.checkCom(phoneRe);
function focusCom(el1,el2,str){
	el2.innerHTML=str;
	el2.style.cssText="display:block;color:#aaa";
	el1.style.cssText="border:2px solid #ccc";
}
function blurCom(el1,el2,arr,bllo1,bllo2){
	if(blurCom.arguments.length==5){
		if(bllo1){
			el2.innerHTML=arr[1];
            el1.style.cssText="border:2px solid #2EC0A8";
			el2.style.color="#2EC0A8"
		}
		else if(bllo2){
			el2.innerHTML=arr[3];
            el1.style.cssText="border:2px solid #F01212";
			el2.style.color="#F01212"
		}
		else{
			el2.innerHTML=arr[2];
            el1.style.cssText="border:2px solid #F01212";
			el2.style.color="#F01212"
		}
	}
	else{
		if(bllo1){
			el2.innerHTML=arr[1];
            el1.style.cssText="border:2px solid #2EC0A8";
			el2.style.color="#2EC0A8"
		}
		else{
			el2.innerHTML=arr[2];
            el1.style.cssText="border:2px solid #F01212";
			el2.style.color="#F01212"
		}
	}
}
function lastCheck(ele,str){
    if(ele.innerHTML.trim()==str){
        return true;
    }
    else{
        return false;
    }
}
btn.onclick=function(){
    var laBool=true;
    for(var i=0;i<lastCheckIn.length;i++){
        var laTrue=lastCheck(lastCheckIn[i],lastCheckIn[i][1]);
        if(!laTrue){
            laBool=false;
            break;
        }
    }
    if(!laBool){
        alert("表单输入有误，请检查");
    }
}