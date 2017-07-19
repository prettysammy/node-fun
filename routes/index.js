module.exports = function(app){
app.get('/',function(req,res){
		res.redirect('/posts');
	});
	app.use('/singup',require('./singup'));
	app.use('/singin',require('./singin'));
	app.use('/singout',require('./singout'));
	app.use('/posts',require('./posts'));
};