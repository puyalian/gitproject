//加载购物车数据。渲染
$(function(){
	//配置cookie
	$.cookie.json=true;
	//读取cookie中保存的购物车数据
	var _products=$.cookie("products")||[];
	if(_products.length===0)
	return;
	var html=template("cart_template",{products:_products});
	$(".tables tbody").html(html);
	//删除商品：事件委派
	$(".tables").on("click",".del",function(){
		//获取商品所在行
		var rows=$(this).parents("tr");
		//获取商品的id
		var _id=rows.data("id");
		//查找id在数组中的下标
		var index=exist(_id,_products);
		//从数组中删除
		_products.splice(index,1);
	//存回到cookie中
		$.cookie("products",_products,{expires:7,path:"/"});
		//从dom节点中删除
		rows.remove();
		//计算合计
		calcTotalPrice();
	})
	//修改数量+、-
	$(".tables").on("click",".mins,.add",function(){
		var rows=$(this).parents("tr");
			_id=rows.data("id");
		var index=exist(_id,_products);
		var prod=_products[index];
		if($(this).is(".add"))
		prod.amount++;
		else{
			if(prod.amount<=1)
			return;
			prod.amount--;
		}
		$.cookie("products",_products,{expires:7,path:"/"});
		//显示修改后的数量与小计
		rows.find(".amount").val(prod.amount);
		rows.find(".sub").text((prod.price*prod.amount).toFixed(2));
		//计算合计
		calcTotalPrice();
	});
	//全选和部分选中
	$(".ck_all").on("click",function(){
		//获取全选复选框状态
		var status=$(this).prop("checked");
		//获取商品复选框与全选框一致
		$(".ck_prod").prop("checked",status);
		//计算合计
		calcTotalPrice();
	})
	$(".ck_prod").click(function(){
		var b=$(".ck_prod:checked").length===_products.length
		$(".ck_all").prop("checked",b);
	})
	//修改输入数量
	$(".tables").on("blur",".amount",function(){
		var rows=$(this).parents("tr");
			_id=rows.data("id");
		var index=exist(_id,_products);
		var prod=_products[index];
		var inputAmount=$(this).val()
		//判断输入格式
		if(!/^[1-9]\d*$/.test(inputAmount)){
		$(this).val(prod.amount);
		return;
		}
		prod.amount=inputAmount;
		$.cookie("products",_products,{expires:7,path:"/"});
		rows.find(".sub").text((prod.price*prod.amount).toFixed(2));
		//计算合计
		calcTotalPrice();
	})
	//商品下标
	function exist(id,products){
		for(var i=0,len=products.length;i<len;i++){
			if(products[i].id==id){
				return i;
			}
		}return -1;
	}
	//计算合计
	function calcTotalPrice(){
		var total=0;
		//遍历jquery对象中每个dom元素
		$(".ck_all:checked").each(function(index,element){
			total+=Number($(this).parents("tr").find(".sub").text())
		});
		//显示合计金额
		$(".total_pay").text(this.toFixed(2));
	}
});
