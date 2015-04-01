
var user="";
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


var wsServer = 'ws://solo-hanangjie-3.c9.io';
var wsServer2 = 'ws://localhost:8888';
var ws ;
if(location.href.indexOf("localhost")!=-1){
	ws = new WebSocket(wsServer2);
}else{
	ws = new WebSocket(wsServer);
}

ws.onopen = function (e) {
	//log("Connected to WebSocket server.");
} ;
function setup(mmm,ws){
	var option='local:{'+
		'cont:\''+mmm+
		'\',name:\''+user+
		'\'}';
	ws.send(option);
	ws.onmessage = function(e) {
	eval("var re={"+e.data+"}");
	var time = new Date()
		time.setTime(parseInt(re.ser.time));
		re.ser.time=time.toLocaleTimeString();
	var html='<li>'+
			'<div class="ui-avatar-s">'+
			'<span style="background-image:url(http://placehold.sinaapp.com/?80*80)"></span>'+
			'  </div>'+
			' <div class="ui-list-info ui-border-t">'+
			'  <h4>'+re.local.name+'<label style="font-size:12px;color:#999999;padding-left:10px;">'+re.ser.time+'</label></h4>'+
			'  <p>'+re.local.cont+'</p>'+
			' </div>'+
			' </li>';
	$(".ui-list").prepend(html);
	$("#cont").val("");
}

ws.onerror = function (e) {
	//log('Error occured: ' + e.data,e);
} ;

}

checkBrowser();

/*socket部分*********************************************/

//进入聊天室*******************************
$("#start").tap(function(){
	user=$("#user_name").val();
	if(user==""){
		$("#wram").addClass("show");
	}else{
		$("#enter").hide();
		$("#first").show();
	}
});

function warmNo(){
	user = "没有名字的人";
	$("#enter").hide();
	$("#first").show();
	$("#wram").removeClass("show");
}


function warmYes(){
	$("#wram").removeClass("show");
}

	

