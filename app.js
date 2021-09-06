
import  mongoose  from 'mongoose';
import express from 'express';
import path from 'path';
import { mongoUri } from './secrets.js';

const app = express();

const PORT = 8080 || process.env.PORT;

mongoose.connect(mongoUri, () =>
  console.log('DB connection established')
);

app.use(express.static(path.join(path.resolve(), "backoffice", "build")));
app.use(express.static("backoffice/public"));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), "backoffice", "build", "index.html"));
});

app.listen(PORT, () =>
  console.log(`Amazing! app is listening on port ${PORT} ^_^ `)
);
