const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostRouter = require('./blogPostRouter');

// log http request activity
app.use(morgan('common'));

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

