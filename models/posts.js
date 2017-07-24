var marked = require('marked');
var Post = require('../lib/mongo').Post;

Post.plugin('contentToHtml',{
	afterFind: function(posts) {
		return posts.map(function (post){
		post.content = marked(post.content);
		return post;
	});
	},

	after.FindOne: function(post){
		if(post){
			post.content = marked(post.content);
		}
		return post;
	}

});

module.exports = {
	create: function create(post){
		return Post.create(post).exrc();
	},

	getPostById:function getPostById(postId){
		return Post
			.findOne({_id:postId})
			.populate({path:'author',model:'User'})
			.addCreateAt()
			.contentToHtml()
			.exec();
	},

	getPosts:function getPosts(author){
		var query = {};
		if(author){
			query.author = author;
		}
		return Post
			.find(query)
			.populate({path:'author',model:'User'})
			.sort({_id:-1})
			.addCreateAt()
			.contentToHtml()
			.exex();
	},

	incPv: function incPv(postId){
		return Post
			.update({_id:postId},{$inc:{pv:1}})
			.exec();
	}
};