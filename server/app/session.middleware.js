var router = require('express').Router();
var session = require('express-session');
var User = require('../api/users/user.model');

router.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));

router.use(function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

router.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

// router.use('/', function (req, res, next) {
//     // if (!req.session.userId) req.session.userId = null;
//     next();
// });

router.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    console.log('FROM FIND ONE', user.id);
    // console.log(user.dataValues);
    // user = user.dataValues;
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      console.log('session', req.session);
      res.json(user);
    }
  })
  .catch(next);
});

// router.post('/', function (req, res, next) {
//   console.log('IN POST',req.body);
//   User.create(req.body)
//   .then(function (user) {
//     res.status(201).json(user);
//   })
//   .catch(next);
// });

module.exports = router;