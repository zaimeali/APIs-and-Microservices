// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
  // res.send(new Date(1451001600000).toUTCString())
  // res.send(JSON.stringify(new Date('2015-12-25').getTime()))
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", (req, res) => {
  const dateString = req.params.date
  let date
  if(!dateString) {
    date = new Date()
  } else {
    if(!isNaN(dateString)) {
      date = new Date(parseInt(dateString))
    } else {
      date = new Date(dateString)
    }
  }

  if(date.toString() === 'Invalid Date') {
    res.json({
      error: date.toString()
    })
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }
  // if(date.length) {
  //   if(date.length === 10) {
  //     res.status(200).json({
  //       unix: JSON.stringify(new Date(date).getTime()),
  //       utc: new Date(date).toUTCString()
  //     })
  //   } else {
  //     res.status(200).json({
  //       unix: JSON.stringify(new Date(parseInt(date)).getTime()),
  //       utc: new Date(new Date(parseInt(date)).toLocaleDateString("en-US")).toUTCString()
  //     })
  //   }
  // } 
  // else {
  //   res.json({
  //     error: 'Invalid Date'
  //   })
  // }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
