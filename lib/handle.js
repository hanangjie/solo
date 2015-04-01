var fs = require("fs"),
	sqlIn=require("./sql"),
	session = require('./session'),
	fun = require('./function'),
    formidable = require("formidable"),//图片上传第三方包
	querystring = require("querystring"),
	util = require('util')
	,url = require('url')
	;

//发送信息****************************************************
function send(response,request){
	try{
		request.setEncoding('utf-8');
		 request.addListener("data",function(postdata){
			var a="",params;
            a+=postdata;	//接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            params = querystring.parse(a);		//转换成json对象
			params['cont'];
        });
	}
	catch(err){
			console.log(err);
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("{success:false}");
			response.end();
	}
	
}


exports.send=send;