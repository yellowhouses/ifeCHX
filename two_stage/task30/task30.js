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


function CheckValue(ele,re,mind1,mind2,mind3,mind4,itarget){
	this.ele=ele;
	this.re=re;
	this.mind1=mind1;
	this.mind2=mind2;
	this.mind3=mind3;
	if(mind4){
		this.mind4=mind4;
	}
	if(itarget){
		this.itarget=itarget;
	}
}

CheckValue.prototype.checkName=function(){
		var mind1=this.mind1;
		var mind2=this.mind2;
		var mind3=this.mind3;
		var mind4=this.mind4;
		this.ele.onfocus=function(){
		var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
		mind.innerHTML=mind1;
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
                mind.innerHTML=mind2;
                this.style.cssText="border:2px solid #2EC0A8";
				mind.style.color="#2EC0A8"
            }
            else if(count==0){
                mind.innerHTML=mind4;
                this.style.cssText="border:2px solid #F01212";
				mind.style.color="#F01212"
            }
            else{
                mind.innerHTML=mind3;
                this.style.cssText="border:2px solid #F01212";
				mind.style.color="#F01212"
            }
		}
	}
	}

CheckValue.prototype.checkCom=function(){
		var mind1=this.mind1;
		var mind2=this.mind2;
		var mind3=this.mind3;
		var re=this.re;
		this.ele.onfocus=function(){
		var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
		mind.innerHTML=mind1;
		mind.style.cssText="display:block;color:#aaa";
		this.style.cssText="border:2px solid #ccc";
		this.onblur=function(){
			if(re.test(this.value)){
				mind.innerHTML=mind2;
				this.style.cssText="border:2px solid #2EC0A8";
				mind.style.color="#2EC0A8"
			}
			else{
				mind.innerHTML=mind3;
				this.style.cssText="border:2px solid #F01212";
				mind.style.color="#F01212"
			}
		}
	}
	}

CheckValue.prototype.checkPwa=function(itarget){
				var mind1=this.mind1;
				var mind2=this.mind2;
				var mind3=this.mind3;
				this.ele.onfocus=function(){
				var mind=this.parentNode.parentNode.getElementsByTagName("p")[1];
				mind.innerHTML=mind1;
				mind.style.cssText="display:block;color:#aaa";
				this.style.cssText="border:2px solid #ccc";
				var targetValue=itarget.value;
				this.onblur=function(){
				if(this.value==targetValue){
					mind.innerHTML=mind2;
					this.style.cssText="border:2px solid #2EC0A8";
					mind.style.color="#2EC0A8"
				}
				else{
					mind.innerHTML=mind3;
					this.style.cssText="border:2px solid #F01212";
					mind.style.color="#F01212"
				}
				}
			}
	}
var checkname=new CheckValue(username,nameMind,nameArr[0],nameArr[1],nameArr[2],nameArr[3]);
var checkPw=new CheckValue(password,passRe,passwordArr[0],passwordArr[1],passwordArr[2]);
var checkPwcon=new CheckValue(pwa,pwaMind,pwaArr[0],pwaArr[1],pwaArr[2]);
var checkAdress=new CheckValue(adress,adressRe,adressArr[0],adressArr[1],adressArr[2]);
var checkPhone=new CheckValue(phone,phoneRe,phoneArr[0],phoneArr[1],phoneArr[2]);
checkname.checkName();
checkPw.checkCom();
checkPwcon.checkPwa(password);
checkAdress.checkCom();
checkPhone.checkCom();
 function focusFun(ele,mind1){
 	var mind=ele.parentNode.parentNode.getElementsByTagName("p")[1];
		mind.innerHTML=mind1;
		mind.style.display="block";
 }
 function blurFun(re,ele,mind2,mind3){
 	if(re.test(ele.value)){
			mind.innerHTML=mind2;
			ele.style.cssText="border:2px solid #2EC0A8";
			mind.style.color="#2EC0A8"
			}
	else{
			mind.innerHTML=mind3;
			ele.style.cssText="border:2px solid #F01212";
			mind.style.color="#F01212"
			}
 }
