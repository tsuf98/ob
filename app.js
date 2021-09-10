const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const { mongoUri } = require('./secrets.js');
const requireAll = require('require-all');
const ModelInitiator = require('./services/init-models');

const app = express();

const PORT = 8080 || process.env.PORT;

mongoose.connect(mongoUri, () =>
  console.log('DB connection established')
);

requireAll(path.join(__dirname, 'models'));
ModelInitiator.initModels();

app.use(express.static(path.join(__dirname, 'backoffice', 'build')));
app.use(express.static('backoffice/public'));

app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'backoffice', 'build', 'index.html')
  );
});

app.listen(PORT, () =>
  console.log(`Amazing! app is listening on port ${PORT} ^_^ `)
);
