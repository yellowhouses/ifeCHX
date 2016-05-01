/**
 * 
 * @authors 谢志强 (594613537@qq.com)
 * @date    2016-04-21 16:06:40
 * @version V1.0.0
 */
  function creEle(tag){
 	return document.createElement(tag)
 }
function Dialog(opt){
	this.options={
		title:"对话框",
		message:null,
		type:null,
		drag:true,
	}
	if(opt){
		for(var key in opt){
			this.options[key]=opt[key];
		}
	}

	//创建浮出层container盒子及下一层盒子
	this.Dialog_shelter=creEle("div");
	this.Dialog_shelter.className="dialog";
	this.Dialog_container=creEle("div");
	this.Dialog_container.className="dialog-container";
	this.Dialog_main=creEle("div");
	this.Dialog_main.className="dialog-main";
	this.Dialog_title=creEle("div");
	this.Dialog_title.className="dialog-title";
	this.Dialog_container.appendChild(this.Dialog_title);
	this.Dialog_container.appendChild(this.Dialog_main);

	//为body添加dialog主体
	var body=document.getElementsByTagName("body")[0];
	body.appendChild(this.Dialog_shelter);
	body.appendChild(this.Dialog_container);


	//为dialog的标题添加内容
	this.Dialog_title.innerHTML=this.options.title;

	//创建dialog下main盒子的主体
	this.Dialog_main_p=creEle("p");
	this.Dialog_main_form=creEle("form");

	//创建prompt类型下的输入框
	this.Dialog_main_prompt_input=creEle("input");
	this.Dialog_main_prompt_input.type="text";
	this.Dialog_main_prompt_input.className="prompt_input";

	//为提醒添加内容
	this.Dialog_main_p.innerHTML=this.options.message;

	//添加确定框与取消框
	this.Dialog_sure_button=creEle("input");
	this.Dialog_sure_button.type="button";
	this.Dialog_sure_button.value="确定";
	this.Dialog_cancel_button=creEle("input");
	this.Dialog_cancel_button.type="button";
	this.Dialog_cancel_button.value="取消";

	//为main主体添加form表单和提醒内容（包括prompt的输入框）
    this.Dialog_main.appendChild(this.Dialog_main_p);
	if(this.options.type=="prompt"){
		this.Dialog_main.appendChild(this.Dialog_main_prompt_input);
	}
	this.Dialog_main.appendChild(this.Dialog_main_form);

	//添加确定按钮和取消按钮
	this.Dialog_main_form.appendChild(this.Dialog_sure_button);
	if(this.options.type=="prompt"||this.options.type=="conform"){
		this.Dialog_main_form.appendChild(this.Dialog_cancel_button);
	}

	//添加禁用滚动
	document.onmousewheel=function(){
            return false;
        }

	//添加点击事件
	var self=this;
	this.Dialog_sure_button.addEventListener("click", function(){
		self.Dialog_shelter.style.display="none";
		self.Dialog_container.style.display="none";
		document.onmousewheel=function(){
            return true;
        }
        setTimeout(function(){
        	self.Dialog_remove();
        }, 1000);	
	},false)
	this.Dialog_cancel_button.addEventListener("click", function(){
		self.Dialog_shelter.style.display="none";
		self.Dialog_container.style.display="none";
		document.onmousewheel=function(){
            return true;
        }
        setTimeout(function(){
        	self.Dialog_remove();
        }, 1000);	
	},false)

	//将dialog元素移除的函数
	this.Dialog_remove=function(){
		body.removeChild(this.Dialog_shelter);
	    body.removeChild(this.Dialog_container);
	}

	//为浮出层添加宽和高
	var scrollHeight=document.body.scrollHeight;
	var scrollWidth=document.body.scrollWidth;
	this.Dialog_shelter.style.height=scrollHeight+"px";
	this.Dialog_shelter.style.width=scrollWidth+"px";

	//为浮出层添加拖拽事件
	if(this.options.drag){
		this.drag();
	}

}

//拖拽函数
Dialog.prototype.drag=function(){
	var self=this;
	this.Dialog_title.onmousedown=function(event){
		var title_left=self.Dialog_container.offsetLeft;
		var title_top=self.Dialog_container.offsetTop;
		var disX=event.clientX-self.Dialog_container.offsetLeft;
		var disY=event.clientY-self.Dialog_container.offsetTop;
		this.style.cursor="move";
		var title=this;
		document.onmousemove=function(event){
			self.Dialog_container.style.position="absolute";
			self.Dialog_container.style.left=title_left+"px";
			self.Dialog_container.style.margin=0;
			self.Dialog_container.style.top=title_top+"px";
			self.Dialog_container.style.left=event.clientX-disX+"px";
			self.Dialog_container.style.top=event.clientY-disY+"px";
		}
		document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
		}
		return false;
}
}