import  mongoose  from 'mongoose';
import express from 'express';
import path from 'path';

const app = express();

const PORT = 8080 || process.env.PORT;
const mongoUri =
  'mongodb+srv://ob-app:orbaeven13@cluster0.auoth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; //TODO: remove this password from here and put it in a safe place

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
