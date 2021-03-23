// const express = require('express')
// const app = express()
// const cors = require('cors')
// require('dotenv').config()
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser')

// mongoose.connect(process.env.URL2, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// })

// const userSchema = mongoose.Schema({
//   username: {
//     type: String,
//     unique: true
//   }
// })
// const User = mongoose.model('User', userSchema)

// const exerciseSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   description: { type: String, required: true },
//   duration: { type: Number, required: true },
//   date: { type: Date, default: Date.now }
// });
// const Exercise = mongoose.model('Exercise', exerciseSchema);

// app.use(cors())
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html')
// });

// app.post('/api/exercise/new-user', (req, res) => {
//   if(req.body.username) {
//     User.find({
//       username: req.body.username
//     }).exec((err, userExist) => {
//       if(userExist.length > 0) {
//         return res.json({
//           error: 'Username already taken'
//         })
//       }
//       const user = new User({
//         username: req.body.username
//       })

//       user.save((err, savedUser) => {
//           if(err) {
//             return res.json(err)
//           }
//           res.json({
//             _id: savedUser._id,
//             username: savedUser.username
//           })
//         })
//       })

//   } else {
//     return res.json({
//       error: 'Empty String'
//     })
//   }
// })

// app.get('/api/exercise/users', (req, res) => {
//   User.find().exec((err, user) => {
//     if(err) {
//       return res.json(err)
//     }
//     res.json(user)
//   })
// })

// app.get('/api/exercise/log', (req, res) => {
//   const { userId, from, to, limit } = req.query
//   Exercise.find({
//     userId: usedId,
//   }, {
//     date: {
//       $gte: new Date(from),
//       $lte: new Date(to)
//     }
//   }).select('id description duration date').limit(+limit).exec((err, exe) => {
//     if(err) {
//       return res.json(err.errors)
//     }
//     Person.findById(userId, (errP, userExist) => {
//       if(errP) {
//         return res.json(errP)
//       }
//       if(!userExist.username) {
//         return res.json({
//           error: "No user exist"
//         })
//       }

//       const username = userExist.username
//       if(!exe) {
//         res.json({
//           userId: userId,
//           username: username,
//           count: 0,
//           log: []
//         })
//       } else {
//         let customData = exe.map(exer => {
//           let dateFormatted = new Date(exer.date).toDateString()
//           return {
//             id: exer.id,
//             description: exer.description,
//             duration: exer.duration,
//             date: dateFormatted
//           }
//         })
//         res.json({
//           userId: userId,
//           username: username,
//           count: exe.length,
//           log: customData
//         })
//       }
//     })
//   })
// })

// app.post('/api/exercise/add', (req, res) => {

//   if(req.body) {
//     User.findById(req.body.userId, (err, userExist) => {
//       if(err) {
//         return res.json({
//           error: 'No User Found'
//         })
//       }
//       const exercise = new Exercise({
//         userId: req.body.userId,
//         duration: +req.body.duration,
//         description: req.body.description,
//         date: req.body.date
//       })

//       exercise.save((err, exe) => {
//         res.json({
//           userId: exe.userId,
//           username: userExist.username,
//           duration: exe.duration,
//           description: exe.description,
//           date: new Date(exe.date).toDateString()
//         })
//       })
//       // let date = req.body.date ? new Date(req.body.date) : new Date();

//       // const days = [
//       //   'Sun',
//       //   'Mon',
//       //   'Tue',
//       //   'Wed',
//       //   'Thu',
//       //   'Fri',
//       //   'Sat'
//       // ]

//       // const months = [
//       //   'Jan',
//       //   'Feb',
//       //   'Mar',
//       //   'Apr',
//       //   'May',
//       //   'Jun',
//       //   'Jul',
//       //   'Aug',
//       //   'Sep',
//       //   'Oct',
//       //   'Nov',
//       //   'Dec'
//       // ]

//       // let d = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
//       //   })

//       // console.log(userExist)
//       // return 
//       // const username = userExist[0].username
//       // const _id = userExist._id

//       // const exercise = new Exercise({
//       //   date: d,
//       //   duration: req.body.duration,
//       //   description: req.body.description,
//       //   username: username,
//       //   _id: _id
//       // })

//       // exercise.save((err, exe) => {
//       //   if(err) {
//       //     return res.json(err)
//       //   }
//       //   return res.json(exe)
//       // })

//     // User.findById(req.body.userId, (err, userExist) => {
//     //     if(err) {
//     //       return res.json({
//     //         error: 'No User Found'
//     //       })
//     //     }
        
//     //     let date = req.body.date ? new Date(req.body.date) : new Date();

//     //   const exercise = new Exercise({
//     //     ...req.body,
//     //     date: date
//     //   })
//     //   exercise.save((err, exe) => {
//     //     if(err) {
//     //       return res.json(err.errors)
//     //     }


        
    
//     //     res.json({
//     //         _id: userExist._id,
//     //         username: userExist.username,
//     //         date: `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`,
//     //         duration: exe.duration,
//     //         description: exe.description
//     //     })
        
//     //   })
//     })

//   } else {
//     return res.json({
//       error: 'Empty Objects'
//     })
//   }
// })



// const listener = app.listen(process.env.PORT || 3000, () => {
//   console.log('Your app is listening on port ' + listener.address().port)
// })


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.URL2, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, maxlength: 20, unique: true}
});
const User = mongoose.model('GymUsers', userSchema);

const logSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});
const Log = mongoose.model('GymLog', logSchema);


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


app.post("/api/exercise/new-user", function (req, res, next) {

  const newUser = new User({username: req.body.username});

  newUser.save(function (error, data) {

    if (error) {
      
//      console.log(error);

      if (error.errors &&
          error.errors.username &&
          error.errors.username['$isValidatorError'] &&
          error.errors.username.kind == 'maxlength') {
        return next({
          status: 400,
          message: 'username too long'
        });
      }

      if (error.code == 11000) return next({
        status: 400,
        message: 'username already taken'
      });

      return next(error);
    }

    res.json({
      username: data.username,
      _id: data._id
    });
  });
});


app.post("/api/exercise/add", function (req, res, next) {

  User.findById(req.body.userId,
                'username',
                {lean: true},
                function (error, user) {

    if (error) {
      
      if (error.name == 'CastError' &&
          error.kind == 'ObjectId' &&
          error.path == '_id') {
        return next({
          status: 400,
          message: 'unknown _id'
        });
      }

      console.log('Error finding user _id:\n', error);
      return next(error);
    }
    
    if (!user) return next({
      status: 400,
      message: 'unknown _id'
    });

    const entry = {
      userId: req.body.userId,
      description: req.body.description,
      duration: req.body.duration
    };

    if (req.body.date) entry.date = req.body.date;
    const exercise = new Log(entry);

    exercise.save(function (error, exercise) {

      if (error) return next(error);

      res.json({
        username: user.username,
        _id: user._id,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      });
    });
  });
});


app.get('/api/exercise/users', (req, res) => {
  User.find().exec((err, user) => {
    if(err) {
      return res.json(err)
    }
    res.json(user)
  })
})


app.get('/api/exercise/log', function (req, res, next) {

  if (!req.query.userId) return next({
    status: 400,
    message: 'unknown userId'
  });

  User.findById(req.query.userId,
                'username',
                {lean: true},
                function (error, user) {

    if (error) {
      
      if (error.name == 'CastError' &&
          error.kind == 'ObjectId' &&
          error.path == '_id') {
        return next({
          status: 400,
          message: 'unknown userId'
        });
      }

      console.log('Error finding user _id:\n', error);
      return next(error);
    }

    if (!user) return next({
      status: 400,
      message: 'unknown userId'
    });

    const msg = {
      _id: user._id,
      username: user.username
    };

    const filter = {userId: req.query.userId};

    if (req.query.from) {
      const from = new Date(req.query.from);
      if (!isNaN(from.valueOf())) {
        filter.date = {'$gt': from};
        msg.from = from.toDateString();
      }
    }

    if (req.query.to) {
      const to = new Date(req.query.to);
      if (!isNaN(to.valueOf())) {
        if (!filter.date) filter.date = {};
        filter.date['$lt'] = to;
        msg.to = to.toDateString();
      }
    }

    const fields = 'description duration date';
    const options = {sort: {date: -1}};
    const query = Log.find(filter, fields, options).lean();

    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      if (limit) query.limit(limit);
    }

    query.exec(function(error, posts) {

      //console.log(error);
      if (error) return next(error);

      for (let post of posts) {
        delete post._id;
        post.date = post.date.toDateString();
      }

      msg.count = posts.length;
      msg.log = posts;
      res.json(msg);
    });
  });
});


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'});
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }
  res.status(errCode).type('txt')
    .send(errMessage);
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
