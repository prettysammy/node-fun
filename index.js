var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');

var app = express();

// 设置模板目录
app.set('views',path.join(__dirname,'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));
// session 中间件
app.use(session({
	name:config.session.key,       // 设置 cookie 中保存 session id 的字段名称
	secret:config.session.secret,  // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave:true,   				   // 强制更新 session
	saveUninitialized:false,       // 设置为 false，强制创建一个 session，即使用户未登录
	cookie:{
		maxAge:config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store:new MongoStore({
		url:config.mongodb
	})
}));

// flash 中间件，用来显示通知
app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
	uploadDir:path.join(__dirname,'public/img'),
	keepExtensions:true
}));

//设置全局变量模板
app.locals.blog = {
	title: pkg.name,
	description: pkg.description
}

//添加模板必须的三个变量
app.use(function(req,res,next){
	res.locals.user = req.session.user;
	res.locals.success = req.flash('success').toString();
	res.locals.error = req.flash('error').toString();
	next();
});


routes(app);

if (module.parent) {
  module.exports = app;
} else {
	app.listen(config.port, function(){
		console.log(`${pkg.name} listen on port ${config.port}`);
	});
}


