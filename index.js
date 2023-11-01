const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

 
app.get("/api", (req, res) => {
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
});

app.get("/api/:date", (req, res) => {
  if (isNaN(new Date(req.params.date)) === false){
    res.json({unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toUTCString()})
  } else if (isNaN(new Date(req.params.date)) === true && parseInt(req.params.date) > 0) {
    res.json({unix: parseInt(req.params.date), utc: new Date(parseInt(req.params.date)).toUTCString()})
  }else {
    res.json ({error: 'Invalid Date'})
  }
})

const portNum = process.env.PORT || 5000
const listener = app.listen(portNum, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
