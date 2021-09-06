const app = require('express')();
const mongoose = require('mongoose');

const PORT = 8080 || process.env.PORT;


app.get('/', (req,res) => {
    res.send('working!')
})

app.listen(PORT, () => console.log(`Amazing! app is listening on port ${PORT} ^_^ `))