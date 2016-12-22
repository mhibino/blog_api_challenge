const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

// add content
BlogPosts.create( /* Fill in here */ );
BlogPosts.create( /* Fill in here */ );

// create endpoints
router.get( /* Fill in here */ );
router.post( /* Fill in here */ );
router.delete( /* Fill in here */ );
router.put( /* Fill in here */ );

module.exports = router;
