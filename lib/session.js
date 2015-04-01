
function createSession(array,name,userid,id){
	var timestamp=new Date();
	
	timestamp=timestamp.getTime();
	array[id]={
		sessionId:id,
		timestamp:timestamp,
		sessionName:name,
		userId:userid
	}
}


function getSession(request){
	var Cookies = {};
		 request.headers.cookie && request.headers.cookie.split(';').forEach(function( Cookie ) {
				var parts = Cookie.split('=');
				Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
		});
	return Cookies;
}

function hasSession(request,session_detail){
	var Cookies=getSession(request);
	var timeNow=new Date();
	if(Cookies["HAJUID"]==""&&Cookies["HAJUID"]==null) return false;
	if(session_detail[Cookies["HAJUID"]]&&(timeNow.getTime()-session_detail[Cookies["HAJUID"]].timestamp)<20*60*1000){
		 session_detail[Cookies["HAJUID"]].timestamp=timeNow.getTime();//更新session时间
		 return true;
	}else{
		delete session_detail[Cookies["HAJUID"]];
		return false;
	}
}



exports.creatSession=createSession;
exports.getSession=getSession;
exports.hasSession=hasSession;