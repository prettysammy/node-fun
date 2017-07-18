var express = require('express');
var router = express.Router;

var checkNotLogin = require('../middlewares/check'),checkNotLogin;

// GET /signout 登出
router.get('/',checkLogin,function(req,res,next){
	res.send(req.flash());
});

modules.exports = router;
