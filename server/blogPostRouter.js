const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

// add content
BlogPosts.create( 
	'first post', 'today it was raining in southern california', 'Lala Schifrin');
BlogPosts.create( 
	'post with the most', 'sometimes less is more', 'Will Fillmore');
// title, content, author, publishDate

// create endpoints
router.get( '/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post( '/', jsonParser, (req, res) => {
	const requiredFields = [title, content, author];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in body of http request`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const posting = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(posting);
});

router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post entry `\${req.params.id}\``);
	res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = [title, content, author];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in body of http request`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
		const message = (`request path id ${req.params.id}`
			`and request body id ${req.body.id} must match`);
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating blog post entry ${req.body.id}`);
	const updatedPost = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate || Date.now()
	});
	res.status(204).json(updatedPost);

});

module.exports = router;
