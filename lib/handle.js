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

/*图片上传*****************************************/

function upload(response, request) {
   /* var hassession=session.hasSession(request,session_detail);
    if(!hassession){
        fn_redirect("./html/login.html",response);
        return false;
    }
    var Cookies=session.getSession(request);
    var userid="";
    if(Cookies["HAJUID"]!=""&&Cookies["HAJUID"]!=null){
        if(session_detail[Cookies["HAJUID"]]){
            userid=session_detail[Cookies["HAJUID"]].userId;
        }
    }*/
    /*var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        var time=new Date();
        var img_rand=parseInt(Math.random()*1000);
        img=time.getFullYear()+"0"+time.getMonth()+"0"+time.getDay()+"0"+time.getHours()+"0"+time.getMinutes()+"0"+time.getSeconds()+"0"+img_rand;
        console.log(files);
        var readStream = fs.createReadStream(files.upload.path);
        var geshi=files.upload.name.slice(files.upload.name.indexOf("."),files.upload.name.length);
        var imgName="tmp/"+img+geshi;
        var writeStream = fs.createWriteStream(imgName);
        util.pump(readStream, writeStream, function(){
            fs.unlinkSync(files.upload.path);
        });
        sqlIn.sqlInImg("insert into avotor(url) values('/tmp/"+img+geshi+"')",call_uploadReturn,response,request,imgName);//数据库操作

    });*/
    call_uploadReturn("",response,request,"1")
}

function call_uploadReturn(res,response,request,imgName){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("{data:'/"+imgName+"'}");
    response.end();
}

exports.send=send;
exports.upload=upload;