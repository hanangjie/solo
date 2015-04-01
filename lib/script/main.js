
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

var wsServer = 'ws://localhost:8888';
var ws = new WebSocket(wsServer);

ws.onopen = function (e) {
	//log("Connected to WebSocket server.");
} ;
function setup(mmm,ws){


ws.send(mmm);
ws.onmessage = function(e) {
	//log("RECEIVED: " + e.data, e);
	var html='<li>'+
			'<div class="ui-avatar-s">'+
			'<span style="background-image:url(http://placehold.sinaapp.com/?80*80)"></span>'+
			'  </div>'+
			' <div class="ui-list-info ui-border-t">'+
			'  <h4>陌生人</h4>'+
			'  <p>'+e.data+'</p>'+
			' </div>'+
			' </li>';
	$(".ui-list").append(html);
}

ws.onerror = function (e) {
	//log('Error occured: ' + e.data,e);
} ;

}

checkBrowser();



	

