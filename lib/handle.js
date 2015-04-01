var fs = require("fs"),
	sqlIn=require("./sql"),
	session = require('./session'),
	fun = require('./function'),
    formidable = require("formidable"),//图片上传第三方包
	querystring = require("querystring"),
	util = require('util')
	,url = require('url')
	;
     
   
//session列表
var session_detail={};

/***************************************************///注册
function regist(response,request){
	try{
		request.setEncoding('utf-8');
		 request.addListener("data",function(postdata){
			var a="",params;
            a+=postdata;	//接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            params = querystring.parse(a);		//转换成json对象
			var insertSQL="insert into t_user(name,pwd,status) values('"+params['name']+"','"+params['pwd']+"','0')";
			var call_return_sql=function(res,response,request,insertSQL){
				if(res.length!=0){
					fun.sendMail(params['name']);
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write("{success:true,name:'"+params['name']+"'}");
					response.end();
				//	response.send({success:false});
				}else{
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write("{success:false}");
					response.end();
				}
			};
			sqlIn.sqlIn(insertSQL,call_return_sql,response,request);//数据库操作
        });
	}
	catch(err){
			console.log(err);
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("{success:false}");
			response.end();
	}
}

/*****************///注册--验证邮箱
function checkEmail(response,request){
	try{
		request.setEncoding('utf-8');
		 request.addListener("data",function(postdata){
			var a="",params;
            a+=postdata;	//接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            params = querystring.parse(a);		//转换成json对象
			var selectSQL = 'select * from t_user where name=\''+params['email']+'\'';
			var call_return_sql=function(res,response,request){
				if(res.length==0){
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write("{success:true}");
					response.end();
				}else{
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write("{success:false}");
					response.end();
				}
			};
			sqlIn.sqlIn(selectSQL,call_return_sql,response,request);//数据库操作
        });
	}
	catch(err){
			console.log(err);
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("{success:false}");
			response.end();
	}
}
/*****************///注册--激活

function activ(response,request){
	try{
		request.setEncoding('utf-8');
		var arg = url.parse(request.url, true).query;
			 
		var ans={'Zl':'0','Ox':'1','At':'2','Qd':'3','Qj':'4','Vu':'5','Vb':'6','Py':'7','Oo':'8','Ik':'9','%w':'A','%n':'B','%j':'C','%f':'D','%c':'E','%q':'F','%i':'G','%a':'H','%h':'I','%l':'J','%e':'K','%d':'L','%y':'M','%t':'N','%z':'O','%v':'P','%o':'Q','%p':'R','%r':'S','%x':'T','%b':'U','%u':'V','%k':'W','%s':'X','%g':'Y','%m':'Z','%E':'a','%D':'b','%L':'c','%B':'d','%N':'e','%Z':'f','%X':'g','%P':'h','%O':'i','%T':'j','%V':'k','%W':'l','%K':'m','%S':'n','%Y':'o','%I':'p','%M':'q','%J':'r','%A':'s','%C':'t','%R':'u','%Q':'v','%F':'w','%U':'x','%H':'y','%G':'z','%1':'@','%2':'.'};
			
			var email="";
			for(var i=0;i<arg.vstr.length;i++){
				email+=ans[arg.vstr.substring(i,i+2)];
				i++;
			}
			
			////修改数据库状态
			
			var updateSQL = 'update t_user set status="1"  where name="'+email+'"';
			var call_return=function(err,res,option){
				//for(var x in res){
//					console.log(x+":"+res[x]);
//				}
				var response=option.response
					,request=option.request
					;
				if(err==null){
					
					var time = new Date().getTime() + '';
					var id = 'session_' + (time).substring(time.length - 6) + '_' + (Math.round(Math.random() * 1000));
					for(var i=0;i<session_detail.length;i++){
						if(session_detail[i].id.indexOf(id)!=-1){
							id = 'session_' + (time).substring(time.length - 6) + '_' + (Math.round(Math.random() * 1000));
							i--;
							continue;
						}
					}
					session.creatSession(session_detail,email,30,id);//简历session
					response.writeHead(200,{ 'Set-Cookie': ["HAJUID="+id], "Content-Type": "text/html"});
					response.write("{success:true}");
					response.end();
				}else{
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write("{success:false}");
					response.end();
				}
			};
			var option={
				response:response
				,request:request
				};
			sqlIn.sqlGet(updateSQL,call_return,option);
	}
	catch(err){
			console.log(err);
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("{success:false}");
			response.end();
	}
}


/***************************************************///登录
function login(response,request){
	try{
		request.setEncoding('utf-8');
        request.addListener("data",function(postdata){
			var a="",params;
            a+=postdata;	//接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            params = querystring.parse(a);		//转换成json对象
			var selectSQL = 'select * from t_user where name=\''+params['name']+'\' and pwd=\''+params['pwd']+'\'';
			var call_return_login=function(res,response,request){
				if(res.length>0){
					res=JSON.stringify(res);
					eval("res="+res);
					var time = new Date().getTime() + '';
					var id = 'session_' + (time).substring(time.length - 6) + '_' + (Math.round(Math.random() * 1000));
					session.creatSession(session_detail,res[0]['name'],res[0]['id'],id);//简历session
					response.writeHead(200,{ 'Set-Cookie': ["HAJUID="+id], "Content-Type": "text/html"});
					response.write("{success:true}");
					response.end();
				}else{
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write("{success:false}");
					response.end();
				}
			};
			sqlIn.sqlIn(selectSQL,call_return_login,response,request);
        });
	}
	catch(err){
			console.log(err);
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("{success:false}");
			response.end();
	}
}


/***************************************************///首页访问
function index(response,request){
		//判断是否存在session
		 var hassession=session.hasSession(request,session_detail);
		 if(!hassession){
			fn_redirect("./index.html",response);
			return false;
		 }
		 
		//获取session内容
		 var Cookies=session.getSession(request);
		 var name="",id=0;
			name=session_detail[Cookies["HAJUID"]].sessionName;
			id=session_detail[Cookies["HAJUID"]].userId;
		///
		var call_imgReturn=function(res,response,request){
			var img_html="";
			res=JSON.stringify(res);
			eval("res="+res);
			for(var i=0;i<res.length;i++){
				img_html+="<li><img src='"+res[i].url+"' id='"+res[i].id+"' onload='imgLoad(this)' /><span class='d'>删除</span></li>";
			}
			response.writeHead(200, {"Content-Type": "text/html"});
			var ls_html='<html xmlns="http://www.w3.org/1999/xhtml">'+
					'<head>'+
					'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+
					'<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" id="viewport" />'+
					'<title>个人中心</title>'+
					'</head>'+
					'<script '+
					'src="script/jquery-1.11.1.min.js"></script'+
					'>'+
					'<script '+
					'src="script/main.js"></script'+
					'>'+
					'<link href="css/main.css" rel="stylesheet" />'+
					'<body>'+
					'<div class="Head"><div class="top">'+
					'<span>您好！'+name+'</span>'+
					'<a href="/loginOut.haj">退出</a>'+
					'</div></div>'+
					
					'<form action="/upload.haj"  method="post" target="uploadImgFrame" enctype="multipart/form-data" >'+
					'<input type="file" name="upload"rel="up_img">'+
   					'<input type="submit" value="上传图片" id="upload" />'+
					'</form>'+
					'<iframe name="uploadImgFrame" style="display:none" id="uploadIframe">'+
					'</iframe>'+
					'<ul id="img_list" class="img_list">'+
					img_html+
					'</ul>'+
					'</body>'+
					'</html>';
			response.write(ls_html);
			response.end();
		};
		 //搜索数据库返回图片list
		 var selectSql="select * from user_img where userId='"+id+"'";
		 sqlIn.sqlIn(selectSql,call_imgReturn,response,request);//数据库操作
};

function loginOut(response,request){
		
		 var Cookies=session.getSession(request);
		 if(Cookies["HAJUID"]!=""&&Cookies["HAJUID"]!=null){
			 if(session_detail[Cookies["HAJUID"]]){
			 	delete session_detail[Cookies["HAJUID"]];
			 }
		 }
		 
		 fn_redirect("./index.html",response);
		 
		 
		//response.writeHead(200, {"Content-Type": "text/html"});
//		var ls_html='<html xmlns="http://www.w3.org/1999/xhtml">'+
//					'<head>'+
//					'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+
//					'<title>无标题文档</title>'+
//					'</head>'+
//					'<body>'+
//					'<div class="top">'+
//					'<a href="/login.html" target="_blank">登录</a>'+
//					'</div>'+
//					'您好！'+
//					'</body>'+
//					'</html>';
//		response.write(ls_html);
//		response.end();
};

function upload(response, request) {
	var hassession=session.hasSession(request,session_detail);
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
	}
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		var time=new Date();
		var img_rand=parseInt(Math.random()*1000);
		img=time.getFullYear()+"0"+time.getMonth()+"0"+time.getDay()+"0"+time.getHours()+"0"+time.getMinutes()+"0"+time.getSeconds()+"0"+img_rand;
		console.log(files);
		//var x ;
//		for(x in files){
//			var readStream = fs.createReadStream(files[x].path);
//			var geshi=files[x].name.slice(files[x].name.indexOf("."),files[x].name.length);
//			var imgName="tmp/"+img+geshi;
//			var writeStream = fs.createWriteStream(imgName);
//			util.pump(readStream, writeStream, function(){
//				fs.unlinkSync(files[x].path);
//			});
////			sqlIn.sqlInImg("insert into user_img(userid,url,size) values('"+userid+"','/tmp/"+img+geshi+"','"+files[x].size+"')",call_uploadReturn,response,request,imgName);//数据库操作
//console.log(files[x].path);
//		}
		var readStream = fs.createReadStream(files.upload.path);
		var geshi=files.upload.name.slice(files.upload.name.indexOf("."),files.upload.name.length);
		var imgName="tmp/"+img+geshi;
		var writeStream = fs.createWriteStream(imgName);
		util.pump(readStream, writeStream, function(){
			fs.unlinkSync(files.upload.path);
		});
		sqlIn.sqlInImg("insert into user_img(userid,url,size) values('"+userid+"','/tmp/"+img+geshi+"','"+files.upload.size+"')",call_uploadReturn,response,request,imgName);//数据库操作

	});
}

function call_uploadReturn(res,response,request,imgName){
	 response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("/"+imgName);
    response.end();
}


function fn_redirect(pathname,response){
	fs.readFile(pathname, "binary", function(error, file) {
				if(error) {
					console.log("No request handler found for /html/login.html");
					response.writeHead(404, {"Content-Type": "text/html"});
					response.write("404 Not found");
					response.end();
				} else {
					 response.writeHead(200, {"Content-Type": "text/html"});
					 response.write(file, "binary");
					 response.end();
				}
			});
}


function deletImg(response, request){
		var hassession=session.hasSession(request,session_detail);
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
		}
		
		call_deletImg=function(res,response,request){
			console.log(res);
			if(res!=null){
				 response.writeHead(200, {"Content-Type": "text/html"});
					 response.write("{success:true}");
					 response.end();
			}else{
			 response.writeHead(200, {"Content-Type": "text/html"});
					 response.write("{success:false}");
					 response.end();
			}
		};
		
		request.setEncoding('utf-8');
        request.addListener("data",function(postdata){
			var a="",params;
            a+=postdata;	//接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
            params = querystring.parse(a);		//转换成json对象
			var selectSQL = 'delete from user_img where id="'+params["id"]+'" and userid="'+userid+'"';
			sqlIn.sqlIn(selectSQL,call_deletImg,response,request);
        });
}

function imgList(response, request){
	var selectSQL = 'select * from user_img';
	sqlIn.sqlIn(selectSQL,call_imgList,response,request);
}

function call_imgList(res,response, request){
	res=JSON.stringify(res);
	 response.writeHead(200, {"Content-Type": "text/plain"});
	 response.write(res.toString());
	 response.end();
}

function baidu(response, request){
	var selectSQL = 'select html from zhuaqu where domainname="百度"';
	sqlIn.sqlIn(selectSQL,call_baidu,response,request);
}

function call_baidu(res,response, request){
	res=JSON.stringify(res);
	eval("res="+res);
	var html=res[0].html;
	html=html.replace(/\$xiegan\$maohao/g,"'");
	html=html.replace(/\$maohao/g,"\"");
	html=html.replace(/\&amp;/g,"\&");
	
	//html=JSON.stringify(html);
	//var html=encodeURIComponent(res[0].html);
	

	 response.writeHead(200, {"Content-Type": "text/plain"});
	 response.write(html);
	 response.end();
}







function fn_session_detail(){
	return session_detail;
}

exports.regist=regist;
exports.login=login;
exports.index=index;
exports.loginOut=loginOut;
exports.upload=upload;
exports.deletImg=deletImg;
exports.fn_session_detail=fn_session_detail;
exports.fn_redirect=fn_redirect;
exports.imgList=imgList;
exports.baidu=baidu;
exports.checkEmail=checkEmail;
exports.activ=activ;