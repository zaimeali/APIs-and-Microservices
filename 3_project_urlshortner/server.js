require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const validUrl = require('valid-url')
const shortId = require('shortid')

// Basic Configuration
const port = process.env.PORT || 3000;
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.srsrx.mongodb.net/urlshortner?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
})
const URLSHORTNER = mongoose.model('URLSHORTNER', urlSchema)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:new', (req, res) => {
  URLSHORTNER.find({
    short_url: req.params.new
  }).exec((err, url) => {
    if(err) {
      return res.json({
        error: "Error"
      })
    }
    res.redirect(url[0].original_url)
  })
  // URLSHORTNER.find({
  //   short_url: req.params.new
  // }, (err, url) => {
  //   if(err) {
  //     return res.json(err)
  //   }
  //   res.json({
  //     short_url: url.short_url
  //   })
  // })
})

app.post('/api/shorturl/new', (req, res) => {
  const { url } = req.body
  const urlCode = shortId.generate()
   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  // console.log(!!pattern.test(url))
  if(!pattern.test(url)) {
    res.json({
      error: 'invalid url'
    })
  } else {
    const urlShort = new URLSHORTNER({
      original_url: url,
      short_url: urlCode
    })
    urlShort.save((err, data) => {
      if(err) {
        return res.json(err)
      }
      res.json({
        original_url: data.original_url,
        short_url: data.short_url
      })
    })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
