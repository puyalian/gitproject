;
(function($){
//轮播图构造函数
function Carousel({imgs,width,height,duration,addPrevNextBtn}){
	this.imgs=imgs;
	this.width=width;
	this.height=height;
	//轮播相隔时长
	this.duration=duration||3000;
	//是否要向前向后翻页
	this.addPrevNextBtn=addPrevNextBtn;
	//放置轮播图容器属性
	this.container=null;
	//所以轮播图片的小盒子
	this.lis=null;
	this.circles=null;
	//所以轮播图片的张数
	this.len=imgs.length;
	//当前显示图片索引
	this.currentIndex=0;
	//即将显示图片索引
	this.nextIndex=1;
	this.timer=null;
	this.prev=null;
	this.next=null;
};
//向carousel。prototype中添加属性
$.extend(Carousel.prototype,{
	//布局创建dom
	createDom:function(container){
		//保存布局结构放置的大的容器
		this.container=$(container);
		//为放置轮播图容器自定义类名
		this.container.addClass("carousel_container");
		//图片li和小圆点布局
		var lis="",circles="";
		for(var i=0,len=this.imgs.length;i<len;i++){
			lis+=`<li ${i==0 ? 'style="display:block"':''}>
					<a href="${this.imgs[i].href}">
					<img src="${this.imgs[i].src}">
				</a></li>`;
			circles+=`<i ${i==0 ? 'class="current"' :''}></i>`
		}
		//向前、后翻页dom结构
		var prevNext="";
		if(this.addPrevNextBtn){
			prevNext=`<div class="prev">&lt;</div>
					<div class="prev">&gt;</div>
					$(pprevNext)`;
		}
		//轮播图完整布局
		var html=`<ul class="imgs">${lis}</ul>
			<div class="pages">${circles}</div>
			`;
			//把布局添加到容器里
			this.container.html=html;
			this.container.css({
				width:this.width,
				height:this.height
			});
			$(".imgs,li",this.container).css({
				width:this.width,
				height:this.height
			});
			$(".pages",this.container).css("width",this.width);
			//保存属性
			this.lis=$("li",this.container);
			this.circles=$("i",this.container);
			this.prev=$(".prev",this.container);
			this.next=$(".next",this.container);
			
	},
//自动轮播
		autoPlay:function(){
			this.timer=setInterval($.proxy(this.move,this),this.duration);
		},
		//轮播图片
		move:function(){
		this.lis.eq(this.currentIndex).stop().fadeOut();
		this.lis.eq(this.nextIndex).stop().fadeIn();
		//小圆点变换
		this.circles.eq(this.currentIndex).removeClass("current");
		this.circles.eq(this.nextIndex).addClass("current");
		//修改索引
		this.currentIndex=this.nextIndex;
		this.nextIndex++;
		if(this.nextIndex>=this.len){
			this.nextIndex=0;
		}		
		},
		//注册事件监听
		registerEventListener:function(){
			//鼠标移入、移出容器范围停止、重启自动轮播
			this.container.hover($.proxy(this.stopPlay,this),$.proxy(this.autoplay,this));
		//鼠标移入小圆点，向对应的图片切换
		this.circles.mouseover($.proxy(this.over,this));
		//向前翻页
		this.prev.click($.proxy(this.previous,this));
		this.next.click($.proxy(this.move,this));
		this.registerEventListener();
		},
		//停止自动轮播
		stopPlay:function(){
			clearInterval(this.timer);
		},
		//鼠标移入小圆点切换图片
		over:function(e){
			//获取小圆点索引
		var _index=$(e.taiget).index();
		if(this.currentIndex===_index)
		return;
		this.nextIndex=_index;
		this.move();
		},
		//向前翻页
		previous:function(){
			this.nextIndex=this.currentIndex-1;
			if(this.nextIndex<0){
				this.nextIndex=this.len-1;
				this.move();
			}
		}
});
//向Jquery。prototype中扩展carousel方法，插件
	$.fn.carousel=function(options){
		this.each(function(index,element){
			var c=new Carousel(options);
			c.createDom(element);
			c.autoPlay();
		})
	}
})(jQuery);
