var http=require("http")
	,url = require("url")
	,server
	,WebSocket = require('faye-websocket')
	,sockets = [];

var msgList=[]
	,sendMsg=false
	,wsList=[]
	;
if(!process.env.PORT){
	process.env.PORT=8888;
}
function start(router){
	function onrequest(request, response){
		
		var pathname = url.parse(request.url).pathname;
		router(response,request,pathname);
		console.log(pathname);
	}
	server=http.createServer(onrequest);
	console.log("server start");
	server.on('upgrade', function(request, socket, body) {
	  if (WebSocket.isWebSocket(request)) {
		var ws = new WebSocket(request, socket, body);
		//wsList.push(ws._stream._idleStart);ws._stream._idleStart区分不同的浏览器
		wsList.push(ws);
		ws.on('message', function(event) {
			   var time=new Date().getTime();
			   msgList.push(event.data+",ser:{time:"+time+",num:"+wsList.length+"}");
			   if(msgList.length>100){
				  msgList=msgList.slice(1); 
			   }
			   for(var i=0;i<wsList.length;i++){
				  wsList[i].send(msgList[(msgList.length-1)]);
			   }
			   console.log('msg', event.data);
		});
		
		ws.on('close', function(event) {
			for(var q=0;q<wsList.length;q++){
				if(wsList[q]._stream._idleStart==ws._stream._idleStart){
					wsList.splice(q-1,1);
				}
			}
		  	console.log('close', event.code, event.reason);
		  	ws = null;
		});
	  }
	});
	server.listen(process.env.PORT);
	
}

function closeServer(router){
	sockets.forEach(function(socket){
	 socket.destroy();
	 });
	 server.close(function(){
		 console.log("close server!");
	 });
}







exports.start=start;
exports.closeServer=closeServer;






