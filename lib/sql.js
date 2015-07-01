var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'han',
    password: '64540614',
    database: 'loca',
    port: 3306
});
function sqlIn(sql,call,response,request){
	conn = mysql.createConnection(conn.config);
	conn.connect();
	conn.query(sql,function(err1,res1){
			console.log("sql call"+err1+"res:"+res1);
			call(res1,response,request);
		});
	conn.end();
}


function sqlInImg(sql,call,response,request,imgName){
	conn = mysql.createConnection(conn.config);
	conn.connect();
	conn.query(sql,function(err1,res1){
			console.log("sql call"+err1);
			call(res1,response,request,imgName);
		});
	conn.end();
}


function sqlGet(sql,call,option){
	conn = mysql.createConnection(conn.config);
	conn.connect();
	conn.query(sql,function(err1,res1){
			call(err1,res1,option);
		});
	conn.end();
}



exports.sqlIn=sqlIn;
exports.sqlInImg=sqlInImg;
exports.sqlGet=sqlGet;


//var insertSQL = 'insert into t_user(name) values("conan"),("fens.me")';
//var selectSQL = 'select * from t_user limit 10';
//var deleteSQL = 'delete from t_user';
//var updateSQL = 'update t_user set name="conan update"  where name="conan"';
