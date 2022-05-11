const parseCookies = (req, res, next) => {
  var cookie = req.headers;
  if (cookie.cookie === undefined) {
    next();
  } else {
    var cookieObj = {};
    var cookieValue = cookie.cookie;
    if (cookieValue.indexOf('; ') !== -1) {
      var array = cookieValue.split('; ');
      array.forEach(cookie => {
        var index = cookie.indexOf('=');
        var key = cookie.slice(0, index);
        var value = cookie.slice(index + 1);
        cookieObj[key] = value;
      });
      req.cookies = cookieObj;
      next();
    } else {
      var index = cookieValue.indexOf('=');
      var key = cookieValue.slice(0, index);
      var value = cookieValue.slice(index + 1);
      cookieObj[key] = value;
      req.cookies = cookieObj;
      next();
    }
  }
};
module.exports = parseCookies;