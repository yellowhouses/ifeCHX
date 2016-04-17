/**
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-04-13 15:58:45
 * @version V1.0.0
 */
 var warning=document.getElementById("remind");
        var text=document.getElementById("text");
        var btn=document.getElementById("button");
        btn.onclick=reminduser;
        function reminduser(){
            var num=checkValue(text.value);
            if(num>=4&&num<=16){
                warning.innerHTML="名称格式正确";
            }
            else if(num==0){
                warning.innerHTML="姓名不能为空";
                warning.style.color="red";
            }
            else{
                warning.innerHTML="名称格式错误";
                warning.style.color="red";
            }
        }

        function checkValue(str){
            var count=0;
            for(var i=0;i<str.length;i++){
                var reCh=/[\u4e00-\u9fa5]/;
                var reEn=/[\w\^\$\.\*\+\?\=\!\:\|\\\/\(\)\[\]\{\}@#%~`,;""&]/;
                if(reCh.test(str[i])){
                    count+=2;
                }
                else if(reEn.test(str[i])){
                    count++
                }
                else{
                    return -1;
                }
            }
            return count;
        }

