const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const articles = require('./routes/api/articles');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const db = require('../config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error));

app.use('/api/articles', articles);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
