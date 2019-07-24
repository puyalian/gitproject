function $(selector,context){
				context=context||document;
				if(selector.charAt(0)==="#")
				return document.getElementById(selector.slice(1));
				if(selector.charAt(0)===".")
			return context.getElementsByClassName(selector.slice(1),context);
			return context.getElementsByTagName(selector);
		}


function format(){
				var year=datetime.getFullYear(),
					month=("0"+(datetime.getMonth()+1)).slice(-2),
					Date=("0"+datetime.getData()).slice(-2),
					hour=("0"+datetime.getHours()).slice(-2),
					minute=("0"+datetime.getMinutes()).slice(-2),
					second=("0"+datetime.getMilliseconds()).slice(-2);
					return year+"-"+month+"-"+Date+" "+hour+":"+minute+":"+second+";"
			}


function rang(lower,upper){
				return Math.floor(Math.random()*(upper-lower)+lower);
			}


function randomColor(){
				var r=random(0,255),
					g=random(0,255),
					b=random(0,255);
					return "rgb("+r+","+g+","+b+")";
		}
//添加事件监听
function on(element,type,callback){
	if(element.addEventListener){
		if(type.indexOf("on")===0)
		type=type.slice(2);
		element.addEventListener(type,callback);
	}else{
		if(type.indexOf("on")!==0)
		type="on"+type;
		element.attachEvent(type,callback);
	}
}
//删除事件监听
function off(element,type,callback){
	if(element.removeEventListener){
		if(type.indexOf("on")===0)
		type=type.slice(2);
		element.removeEventListener(type,callback);
	}else{
		if(type.indexOf("on")!==0)
		type="on"+type;
		element.detachEvent(type,callback);
	}
}
//获取/设置 css样式
//attr 是css属性名字
function css(element,attr,value){
	if(typeof attr==="object"){
		for(var i in attr){
			element.style[i]=attr[i];
		}
		return;
	}
	if(typeof value==="undefined"){
	return window.getComputedStyle
					?window.getComputedStyle(element)[attr]
					:element.currentStyle[attr];
	}
	
	element.style[attr]=value;
}
//元素的显示/隐藏
function show(element){
	element.style.display="block";
}
function hide(element){
	element.style.display="none";
}
//获取元素在文档中的定位坐标
function offset(element){
	var _left=0,_top=0;
	while (element!==null){
		_left+=element.offsetLeft;
		_top+=element.offsetTop;
		element=element.offsetParent;
	}
	return{
		top:_top,
		left:_left
	};
}
//查找。保持cookie
//options可配置项
function cookie(key,value,options){
	if(typeof value!=="undefined"){
//	将key和value都执行编码操作
	var cookie=encodeURIComponent(key)+"="+encodeURIComponent(value);
//	判断可配置顶
	options=options||{};
//	有失效时间
if(options.expires){
	var datetime=new Date();
	datetime.setDate(datetime.getDate()+options.expires);
	cookie+=";expires="+datetime.toUTCString();
}if(options.cookie){
	cookie+=";path="+options.cookie;
}if(options.domain){
	cookie+=";domain="+options.domain;
}if(options.secure){
	cookie+=";secure";
}
document.cookie=cookie;
return;
}
	var cookies=document.cookie.split("; ");
	for(var i=0,len=cookies.length;i<len;i++){
		var parts=cookies[i].split("=");
		var name=encodeURIComponent(parts.shift());
		if(name===key){
			var value=decodeURIComponent(parts.join("="));
			return value;
		}
	}
	return undefined;
}
//删除cookie
function removeCookie(key,options){
	options=options||{};
	options.expires=-1;
	cookie(key,"",options);
}
			//单属性运动函数
function animate(element,attr,value,speed){
				clearInterval(element.timer);
				var start=parseFloat(css(element,attr));
					range=value-start;
					startTime=+new Date();
					element.timer=setInterval(function(){
					var elapesd=Math.min(+new Date()-startTime,speed);
					var result=elapesd*range/speed+start;
					element.style[attr]=result+"px";
					if(elapesd===speed)
						clearInterval(element.timer);
						},1000/60);
			}
//多属性运动函数
function animate(element,options,speed,fn){
			clearInterval(element.timer);
			var start={},range={};
			for(var attr in options){
				start[attr]=parseFloat(css(element,attr));
				range[attr]=options[attr]-start[attr];
				var startTime=+new Date();
				element.timer=setInterval(function(){
					var elapesd=Math.min(+new Date()-startTime,speed);
					for(var attr in options){
						var result=elapesd*range[attr]/speed+start[attr];
						element.style[attr]=result+(attr==="opacity"?"":"px");
					}
					if(elapesd===speed){
					clearInterval(element.timer);
					fn&&fn();
					}
				},1000/60)
			}
		}
//淡入
function fadeIn(element,speed,fn){
	element.style.display="block";
	element.style.opacity=0;
	animate(element,{opacity:1},speed,fn)
}
//淡出
function fadeOut(element,speed,fn){
	animate(element,{opacity:0},speed,function(){
		element.style.diaplay="none";
	});
}
