import express from 'express';
import mongoose from 'mongoose';
import { mongoUri } from './secrets.js';

const PORT = 8080 || process.env.PORT;

const app = express();

mongoose.connect(mongoUri, () =>
  console.log('DB connection established')
);

app.get('/', (req, res) => {
  res.send('working!');
});

app.listen(PORT, () =>
  console.log(`Amazing! app is listening on port ${PORT} ^_^ `)
);
