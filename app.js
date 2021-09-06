const app = require('express')();
const mongoose = require('mongoose');

const PORT = 8080 || process.env.PORT;
const mongoUri =
  'mongodb+srv://ob-app:orbaeven13@cluster0.auoth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; //TODO: remove this password from here and put it in a safe place

mongoose.connect(mongoUri, () =>
  console.log('DB connection established')
);

app.get('/', (req, res) => {
  res.send('working!');
});

app.listen(PORT, () =>
  console.log(`Amazing! app is listening on port ${PORT} ^_^ `)
);
