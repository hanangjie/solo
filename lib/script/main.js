
var user="";
	$('.ui-searchbar').tap(function(){
		$('.ui-searchbar-wrap').addClass('focus');
		$('.ui-searchbar-input input').focus();
	});
	$('.ui-searchbar-cancel').tap(function(){
		$('.ui-searchbar-wrap').removeClass('focus');
	});
	
	
	


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
	var option='{'+
		'cont:\''+mmm+
		'\',name:\''+user+
		'\'}';
ws.send(option);
ws.onmessage = function(e) {
	eval("var re="+e.data);
	var html='<li>'+
			'<div class="ui-avatar-s">'+
			'<span style="background-image:url(http://placehold.sinaapp.com/?80*80)"></span>'+
			'  </div>'+
			' <div class="ui-list-info ui-border-t">'+
			'  <h4>'+re.name+'</h4>'+
			'  <p>'+re.cont+'</p>'+
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


//进入聊天室*******************************
$("#start").tap(function(){
	user=$("#user_name").val();
	$("#enter").hide();
	$("#first").show();
});


	

