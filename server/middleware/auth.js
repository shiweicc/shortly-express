const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    // return models.Sessions.create()
    //   .then(session => {
    //     models.Sessions.get({id: session.insertId})
    //       .then(hash => {
    //         req.session = {hash: hash.hash};
    //         res.cookie('shortlyid', hash.hash);
    //         res.send();
    //         next();
    //       });
    //   })
    //   .catch(err => {
    //     console.log('Create session failed.');
    //     next();
    //   });
    return                                          //new method for easy reuse
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
                                                // use that new method because cookie is invalid and we need to make a new session/cookie
        next();
      });
  }
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/



models.Sessions.create()
      .then(session => {
        models.Sessions.get({id: session.insertId})
          .then(hash => {
            req.session = {hash: hash.hash};
            res.cookie('shortlyid', hash.hash);
            res.send();
            next();
          });
      })
      .catch(err => {
        console.log('Create session failed.');
        next();