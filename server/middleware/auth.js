const models = require('../models');
const Promise = require('bluebird');

var newSession = function (req, res, next) {
  models.Sessions.create()
    .then(session => {
      models.Sessions.get({id: session.insertId})
        .then(hash => {
          req.session = {hash: hash.hash};
          res.cookie('shortlyid', hash.hash);
          // req.cookies.shortlyid = hash.hash;
          // res.send();
          next();
        });
    })
    .catch(err => {
      console.log('Create session failed.');
      next();
    });
};


module.exports.createSession = (req, res, next) => {
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    return newSession(req, res, next);
  } else {
    var hash = req.cookies.shortlyid;
    req.session = {hash: hash};
    return models.Sessions.get({hash: hash})
      .then(session => {
        var user = session.user.username;
        var id = session.userId;
        req.session.user = {username: user};
        req.session.userId = id;
        next();
      })
      .catch(err => {
        console.log('cant find ID for hash');
        return newSession(req, res, next);
        next();
      });
  }
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/



