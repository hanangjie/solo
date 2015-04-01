$(function(){
		   //登入
    $("[name='login']").click(function(){
		var name=$("#email").val(),pwd=$("#password").val();
		if(name!=""&&pwd!=""){
			$.ajax({
			type:'Post',
			url:'/login.haj',
			data:{
				name:$("#email").val(),
				pwd:$("#password").val()
			}
			}).done(function(msg){
				if(msg==null){
					return false;	
				}
				eval("var msg="+msg);
				if(msg.success){
					location.href="/index.haj";
				}else{
					alert("登入失败");
				}
			}).fail(function(msg){
					alert("网络连接失败！");
			});			
		}
	});
	
	//注册
	 $("[name='register']").click(function(){
		if($("#password").val()!=$("#passwordagain").val()){
			$("[type='password']").css("border","1px solid red");
			return false;
		}
			$.ajax({
			type:'Post',
			url:'/regist.haj',
			data:{
				name:$("#email").val(),
				pwd:$("#password").val()
			}
			}).done(function(msg){
				if(msg==null){
					return false;	
				}
				eval("var msg="+msg);
				if(msg.success){
					location.href="/index.html";
				}else{
					alert("注册失败");
				}
			}).fail(function(msg){
					alert("网络连接失败！");
			});					 
	});
	
	//验证用户名
	$("#email").blur(function(){
		if($(this).val()==""){
			return false;
		}
		var that=$(this);
		$.ajax({
			type:'Post',
			url:'/checkEmail.haj',
			data:{
				email:$(this).val()
			}
			}).done(function(msg){
				if(msg==null){
					return false;	
				}
				eval("var msg="+msg);
				if(msg.success){
					that.parent().attr().addClass("am-form-success am-form-group am-form-icon am-form-feedback");
					that.next().addClass("am-icon-check");
				}else{
					that.parent().addClass("am-form-warning");
					that.next().addClass("am-icon-warning");
				}
			}).fail(function(msg){
					that.parent().addClass("am-form-error");
					that.next().addClass("am-icon-times");
			});		
	});
	
	
	$("#submit").click(function(){
		$.ajax({
			type:'Post',
			url:'/regist.haj',
			data:{
				name:$("#user").val(),
				pwd:$("#pwd").val()
			}
			}).done(function(msg){
				if(msg==null){
					return false;	
				}
				eval("var msg="+msg);
				if(msg.success){
				
				alert("注册成功");
				}else{
					alert("注册失败");
				}
			});
	});
	
	$("#login_submit").click(function(){
		var name=$("#user").val(),pwd=$("#pwd").val();
		fn_login(name,pwd);
	});
	
	$("#upload").click(function(){
		if(!($("[rel='up_img']").val().indexOf(".jpg")!=-1)&&!($("[rel='up_img']").val().indexOf(".png")!=-1)&&!($("[rel='up_img']").val().indexOf(".gif")!=-1))
		{alert("只支持jpg,png,gif!");return false;}
	});
	$("#uploadIframe").load(function(){
		var io = document.getElementById("uploadIframe");
		var xml = {};
		if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}		
		var html="<li><img src='"+xml.responseText.slice(xml.responseText.indexOf(">")+1,xml.responseText.indexOf("</"))+"'  onload='imgLoad(this)' /></li>";
		$("#img_list").append(html);
		$("[rel='up_img']").val("");
	});
	
	
	
	$("[rel='up_img']").change(function(){
		var fileList=this.files,html="";
		for( var i = 0 ; i < fileList.length-1 ; i++ ){  
           html+='<input type="file" name="q'+i+'" multiple="multiple" value="'+fileList[i].name+'" rel="up_img">';
    	}  
		$(this).after(html);
	});
	//$.ajax({
//			type:'Post',
//			url:'/baidu'
//			}).done(function(msg){
//				if(msg==null){
//					return false;	
//				}
//				eval("var res="+msg);
//				var img_html="";
//				for(var i=0;i<res.items.length;i++){
//					img_html+="<li><img src='"+res.items[i].pic_url+"' alt='"+res.items[i].pic_url_noredirect+"' /></li>";
//				}
//				$("#img_list").append(img_html);
//			}).fail(function(msg){
//					alert("网络连接失败！");
//			});
	
	
});

//图片加载
function imgLoad(a){
	var h=parseInt(a.height),w=parseInt(a.width),bli=0;
	if(h>250){
		bli=250/h;
		a.style.height=250;
		a.style.width=bli*w;
		a.style.marginLeft=(250-parseInt(a.style.width))/2;
	}else{
		a.style.marginTop=(250-h)/2;
	}
}
//图片删除
$(document).on("click","span.d",function(){
		var $this=$(this);
		$.ajax({
			type:'Post',
			url:'/deletImg.haj',
			data:{
				id:$this.parent().find("img").attr("id")
			}
			}).done(function(msg){
				if(msg==null)return false;	
				eval("var msg="+msg);
				if(msg.success){
					$this.parent().remove();
				}else{
					alert("删除失败");
				}
			}).fail(function(msg){
					alert("网络连接失败！");
			});
	});

	
	

