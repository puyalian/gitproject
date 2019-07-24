//读取列表数据资源。渲染
$(function(){
	//利用ajax访问后端接口。获取数据
	$.ajax({
		type:"get",
		url:"../mock/list.json",
		datatype:"json",
		success:function(responseData){
			//处理数据，渲染
			responseData.res_body.list.forEach(function(product){
				//克隆模板
				$(".template").clone()
							  .removeClass("template").addClass("buy")
							  .css({display:"inline-block"})
							  .appendTo(".box")
							  .children(".img").attr("src",product.img)
							  .next(".desc").text(product.desc)
							  .next().text(product.price)
							  .next().text(product.id);
			});
		}
	});
});
//为加入购物车绑定点击事件：事件委派的方式
$(function(){
	$(".box").on("click",".add",function(e){
		var box=$(this).parent();
		//获取到添加购物车的商品信息
		var content={
			id:box.children(".id").text(),
			price:box.children(".price").text(),
			desc:box.children(".desc").text(),
			img:box.children(".img").attr("src"),
			amount:1
		};
	//配置cookie使用。自动json转换；
	$.cookie.json=true;
	//先读取已有的购物车
	var products=$.cookie("products")||[];
	var index=exist(content.id,products);
		//判断商品id是否已选购
	if(index!==-1){
		products[index].amount++;
	}else{
		products.push(content);
	}
$.cookie("products",products,{expires:7,path:"/"});
//抛进购物车：抛物线
 	var flyer=$(`<img src="${content.img}">`);
 		offset=$(".cart").offset();
 		flyer.fly({
 			start:{
 				top:e.pageY,
 				left:e.pageX
 			},end:{
 				top:offset.top,
 				left:offset.left,
 				width:0,
 				height:0
 			}
 		})
	})
//商品下标
	function exist(id,products){
		for(var i=0,len=products.length;i<len;i++){
			if(products[i].id==id){
				return i;
			}
		}return -1;
	}
})
