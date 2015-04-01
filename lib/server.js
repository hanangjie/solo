var http=require("http")
	,url = require("url")
	,server
	,sockets = [];
	
function start(router){
	function onrequest(request, response){
		
		var pathname = url.parse(request.url).pathname;
		router(response,request,pathname);
		console.log(pathname);
	}
	server=http.createServer(onrequest);
	server.listen(8888);
	console.log("server start");
	server.on("connection",function(socket){
	  sockets.push(socket);
	  socket.once("close",function(){
		 sockets.splice(sockets.indexOf(socket),1);
	  });
	});
	
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






