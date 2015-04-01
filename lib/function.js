
//加密
var sec={'0':'Zl','1':'Ox','2':'At','3':'Qd','4':'Qj','5':'Vu','6':'Vb','7':'Py','8':'Oo','9':'Ik','A':'%w','B':'%n','C':'%j','D':'%f','E':'%c','F':'%q','G':'%i','H':'%a','I':'%h','J':'%l','K':'%e','L':'%d','M':'%y','N':'%t','O':'%z','P':'%v','Q':'%o','R':'%p','S':'%r','T':'%x','U':'%b','V':'%u','W':'%k','X':'%s','Y':'%g','Z':'%m','a':'%E','b':'%D','c':'%L','d':'%B','e':'%N','f':'%Z','g':'%X','h':'%P','i':'%O','j':'%T','k':'%V','l':'%W','m':'%K','n':'%S','o':'%Y','p':'%I','q':'%M','r':'%J','s':'%A','t':'%C','u':'%R','v':'%Q','w':'%F','x':'%U','y':'%H','z':'%G','@':'%1','.':'%2'};


//发送邮件
function sendMail(email){
	var nodemailer  = require("nodemailer");
	var user = '2757753371@qq.com'
	  , pass = 'smtp64540614'
	  , url=''
	  ;
	var smtpTransport = nodemailer.createTransport("SMTP", {
		  service: "QQ"
		, auth: {
			user: user,
			pass: pass
		}
	  });
	 for(var i=0;i<email.length;i++){
		url+=sec[email[i]];	
	 }
	 var time=new Date();
	 	time=time.getUTCFullYear()+"年"+(time.getUTCMonth()+1)+"月"+time.getUTCDate()+"日 "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
	 smtpTransport.sendMail({
		from    : 'Img_Home<' + user + '>'
	  , to      : '<'+email+'>'
	  , subject :'图床--账号激活'
	  , html    :  '	亲爱的用户：'+
	'您好！'+
	'您于'+time+' 注册图床帐号 '+email+'，点击以下链接，即可激活该帐号：<br> '+
	'<a href="http://localhost:8888/activ.haj?vstr='+url+'">http://http://localhost:8888/activ.haj?vstr='+url+'</a><br>'+
	'(如果您无法点击此链接，请将它复制到浏览器地址栏后访问)<br>'+
	'1、为了保障您帐号的安全性，请在 48小时内完成激活，此链接将在您激活过一次后失效！<br>'+
	'2、请尽快完成激活，否则过期。<br>'+
	'图床帐号团队<br>'+time
	}, function(err, res) {
		console.log(err, res);
	});	
}

exports.sendMail=sendMail;