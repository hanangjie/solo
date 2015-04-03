
var user=""
	,sex=""
	,power={send:true,times:0}//权限设置
	,loc=""//定位
	;
$('.ui-searchbar').tap(function(){
	$('.ui-searchbar-wrap').addClass('focus');
	$('.ui-searchbar-input input').focus();
});
$('.ui-searchbar-cancel').tap(function(){
	$('.ui-searchbar-wrap').removeClass('focus');
});
	
	
	

/*socket部分*********************************************/

function checkBrowser(){
	if (window.WebSocket){
	//log("This browser supports WebSocket!");
	} else {
	//log("This browser does not support WebSocket.");
	alert("手机太老了");
	}
}
//c9.io布置测试环境


var wsServer = 'ws://solo-hanangjie-4.c9.io';
var wsServer2 = 'ws://localhost:8888';
var wsServer3 = 'ws://192.168.66.161:8888';
var ws ;
if(location.href.indexOf("192.168.66.161")!=-1){
	ws = new WebSocket(wsServer3);
}else if(location.href.indexOf("localhost")!=-1){
	ws = new WebSocket(wsServer2);
}else{
ws = new WebSocket(wsServer);
}

ws.onopen = function (e) {
	//log("Connected to WebSocket server.");
} ;
function setup(mmm,ws){
	if(mmm=="")return;
	if(power.send){
		$("#cont").val("");
		power.times++;
		power.send=false;
		var option='local:{'+
			'cont:\''+mmm+
			'\',times:'+power.times+
			',name:\''+user+
			'\',sex:\''+sex+
			'\',loc:\''+loc+
			'\'}';
		ws.send(option);
		ws.onmessage = function(e) {
			if(power.times==1){
				var re=e.data.split("||");
				for(var tt=0;tt<re.length;tt++){
					eval("re["+tt+"]={"+re[tt]+"}");
				}
			}else{
				eval("var re=[{"+e.data+"}]");
			}
			//数据转换
			var html="";
			for(var q=(re.length-1);q>=0;q--){
				var time = new Date()
				time.setTime(parseInt(re[q].ser.time));
				re[q].ser.time=time.toLocaleTimeString();
				re[q].local.sex=re[q].local.sex=="girl"?"/images/girl.png":"/images/boy.png";
				$("#num").html("人："+re[q].ser.num);
				console.log("人："+re[q].ser.num);
				html+='<li>'+
						'<div class="ui-avatar-s">'+
						'<span style="background-image:url('+re[q].local.sex+')"></span>'+
						'  </div>'+
						' <div class="ui-list-info ui-border-t">'+
						'  <h4>'+re[q].local.name+'<label style="font-size:12px;color:#999999;padding-left:10px;">'+re[q].ser.time+'</label><label style="font-size:12px;color:#999999;padding-left:10px;">'+re[q].local.loc+'</label></h4>'+
						'  <p>'+re[q].local.cont+'</p>'+
						' </div>'+
						' </li>';
			}
			$("#contList").prepend(html);
			$(window).scrollTop(0);
		}
		if(power.times!=1){
			$("#send").addClass("active")
			$("#send").html("5秒");
			setTimeout(function(){
				$("#send").removeClass("active").html("确定");
				power.send=true;
			},5000);
		}else{
			power.send=true;
		}
}

ws.onerror = function (e) {
	//log('Error occured: ' + e.data,e);
	alert('Error occured: ' + e.data,e);
} ;

}

checkBrowser();

/*socket部分*********************************************/

var $enter=$("#enter")
	,$first=$("#first")
	;
//进入聊天室*******************************
$("#start").tap(function(){
	user=$("#user_name").val();
	sex=$("[name='Sex']:checked").val();
	if(user==""){
		$("#wram").addClass("show");
	}else{
		//进行存储
		localStorage.name=user;
		localStorage.sex=sex;
		$enter.hide();
		$first.show();
	}
	
	//进行初始发送
	setTimeout(function(){
	setup("大家好！我是"+sex,ws);
	},1000);
});

/*判断是否已经登录过*/
if(localStorage.name!=undefined){
	$enter.hide();
	$first.show();
	user=localStorage.name;
	sex=localStorage.sex;
	setTimeout(function(){
	setup("大家好！我是"+sex,ws);
	},1000);
}


function warmNo(){
	user = "没有名字的人";
	$enter.hide();
	$first.show();
	$("#wram").removeClass("show");
}


function warmYes(){
	$("#wram").removeClass("show");
}

//////退出登入//////////////////////////

function loginout(){
	$("#warmLoginOut").addClass("show");
}

function warmLoginOutNo(){
	$("#warmLoginOut").removeClass("show");
}

function warmLoginOutYes(){
	localStorage.clear();
	$enter.show();
	$first.hide();
	$("#warmLoginOut").removeClass("show");
}

//***********定位部分************
var lbsGeo = document.getElementById('geo');
//监听定位失败事件 geofail	
lbsGeo.addEventListener("geofail",function(evt){ 
	console.log("fail");
});
//监听定位成功事件 geosuccess
lbsGeo.addEventListener("geosuccess",function(evt){ 
	console.log(evt.detail);
	var address = evt.detail.address;
	var coords = evt.detail.coords;
	var x = coords.lng; 
	var y = coords.lat;
	//alert("地址："+address);
//	alert("地理坐标："+x+','+y);
	loc=address;
});

//压力测试
//setTimeout(function(){
//	var aa=Math.random();
//	window.open("/","a"+aa,"blank");
//},1000);




