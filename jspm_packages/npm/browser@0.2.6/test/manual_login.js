/* */ 
var userdata = require('./accounts/google');
var browser = require('../browser');
var $b = new browser();
$b.browse('login', 'https://accounts.google.com/Login', {debug: true});
$b.browse(function(err, out) {
  var $ = require('cheerio').load(out.result);
  var postdata = {
    Email: userdata.email,
    Passwd: userdata.pass
  };
  var url = $("#gaia_loginform").attr("action");
  $("input").each(function(k, el) {
    var $el = $(el);
    var name = $el.attr("name"),
        type = $el.attr("type"),
        val = $el.attr("value");
    if (type == "hidden" || type == "submit")
      postdata[name] = val;
  });
  return [url, {
    data: postdata,
    method: "POST"
  }];
}).after("login");
$b.browse('https://mail.google.com/mail/u/0/?ui=html&zy=d').after();
$b.on("end", function(err, out) {
  console.log(out.result);
});
$b.run();
