var fs = require("fs"),
	path = require('path'),
	session = require('./session')
	,server=require('./server')
	,handle=require('./handle');
var url = require("url");
var urlForbidden='/upload,index.html';
   
function router(response,request,pathname){
	
	if(pathname.slice(1)=="off"){
		asd();
	}
	
	if(pathname.slice(1)=="close"){
		server.closeServer(router);
		return false;
	}
	/*var session_detail=handle.fn_session_detail();
	var Cookies=session.getSession(request);
	var timeNow=new Date();
	if(Cookies["HAJUID"]!=""&&Cookies["HAJUID"]!=null){
		if(session_detail[Cookies["HAJUID"]]){
			if((timeNow.getTime()-session_detail[Cookies["HAJUID"]].timestamp)<60*20*1000){
			 	session_detail[Cookies["HAJUID"]].timestamp=timeNow.getTime();//更新session时间
			}else{
				delete session_detail[Cookies["HAJUID"]];
				handle.fn_redirect("./index.html",response);
				return false;
			}
		}
	}
	var hassession=session.hasSession(request,session_detail);
	if(!hassession){
			handle.fn_redirect("./index.html",response);
			return false;
	}
	*/
	 console.log("Request handler '"+pathname+"' was called.");
		if(pathname=="/"){
			pathname="html/index.html";
		}
		console.log(pathname);
		if(!(pathname.indexOf(".haj")!=-1)){
			pathname="./"+pathname;
			fs.readFile(path.join(__dirname, `./${pathname}`), "binary", function(error, file) {
				if(error) {
					console.log(pathname);
					console.log("No request handler found for "+pathname+error);
					
					response.writeHead(404, {"Content-Type": "text/html"});
					response.write("404 Not found");
					response.end();
				} else {
					if(pathname.indexOf(".html")!=-1){
						response.writeHead(200, {"Content-Type": "text/html"});
					}else if(pathname.indexOf(".css")!=-1){
						response.writeHead(200, {"Content-Type": "text/css"});
					}else if(pathname.indexOf(".js")!=-1){
						response.writeHead(200, {"Content-Type": "text/javascript"});	
					}else{
						response.writeHead(200, {"Content-Type": "text/plain"});
					}
					response.write(file, "binary");
					response.end();
				}
			});
		}else{
			try{
				pathname=pathname.replace(".haj","");
				pathname=pathname.slice(1);
				console.log("Request handler "+pathname+"()  was called.");
				var newFn=eval(handle[pathname]);
				newFn(response,request);
				//handle[pathname](response,request);
			}
			catch(err){
				console.log(err);
				response.writeHead(500, {"Content-Type": "text/html"});
				response.write("500 Not found");
				response.end();
			}
		}
		//路由结束
}



exports.router=router;