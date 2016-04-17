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

var nameArr=["必填，长度为4-16个字符","填写正确","填写错误","名称不能为空"];
var passwordArr=["必填，长度为4-16个字符","密码符合","密码长度为4-16个字符"];
var pwaArr=["请确认密码","填写正确","填写错误，请检查"];
var adressArr=["必填","填写正确","填写错误"];
var phoneArr=["必填","填写正确","填写错误"];
var re=/\w/;
var passRe=/[\w\^\$\.\*\+\?\=\!\:\|\\\/\(\)\[\]\{\}@#%~`,;""&]{4,16}/;
var adressRe=/[\w]+@[\w]+\.[\w]+/;
var phoneRe=/[\d]{11}/;


function CheckValue(ele,arr){
	this.ele=ele;
	this.arr=arr;
}
CheckValue.prototype.checkCom=function(re){
	var arr=this.arr;
	this.ele.onfocus=function(){
		var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
		mind.innerHTML=arr[0];
		mind.style.cssText="display:block;color:#aaa";
		this.style.cssText="border:2px solid #ccc";
		this.onblur=function(){
		    if(re.test(this.value)){
				mind.innerHTML=arr[1];
				this.style.cssText="border:2px solid #2EC0A8";
				mind.style.color="#2EC0A8"
			}
			else{
				mind.innerHTML=arr[2];
				this.style.cssText="border:2px solid #F01212";
				mind.style.color="#F01212"
			}
		}
}
}
CheckValue.prototype.checkPwa=function(itarget){
	var arr=this.arr;
	this.ele.onfocus=function(){
		var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
		mind.innerHTML=arr[0];
		mind.style.cssText="display:block;color:#aaa";
		this.style.cssText="border:2px solid #ccc";
		var targetValue=itarget.value;
		this.onblur=function(){
			if(this.value==targetValue){
				mind.innerHTML=arr[1];
				this.style.cssText="border:2px solid #2EC0A8";
				mind.style.color="#2EC0A8"
			}
			else{
				mind.innerHTML=arr[2];
				this.style.cssText="border:2px solid #F01212";
				mind.style.color="#F01212"
			}
		}
	}
}
CheckValue.prototype.checkName=function(mind4){
	var arr=this.arr;
	this.ele.onfocus=function(){
		var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
		mind.innerHTML=arr[0];
		mind.style.cssText="display:block;color:#aaa";
		this.style.cssText="border:2px solid #ccc";
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
			if(count>=4&&count<=16){
                mind.innerHTML=arr[1];
                this.style.cssText="border:2px solid #2EC0A8";
				mind.style.color="#2EC0A8"
            }
            else if(count==0){
                mind.innerHTML=mind4;
                this.style.cssText="border:2px solid #F01212";
				mind.style.color="#F01212"
            }
            else{
                mind.innerHTML=arr[2];
                this.style.cssText="border:2px solid #F01212";
				mind.style.color="#F01212"
            }
		}
	}
}
var checkname=new CheckValue(username,nameArr);
var checkPw=new CheckValue(password,passwordArr);
var checkPwcon=new CheckValue(pwa,pwaArr);
var checkAdress=new CheckValue(adress,adressArr);
var checkPhone=new CheckValue(phone,phoneArr);
checkname.checkName(nameArr[3]);
checkPw.checkCom(passRe);
checkPwcon.checkPwa(password);
checkAdress.checkCom(adressRe);
checkPhone.checkCom(phoneRe);
