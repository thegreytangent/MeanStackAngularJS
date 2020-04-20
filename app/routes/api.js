const User = require("../models/user");
const Token = require("jsonwebtoken");
const secret = 'node';



module.exports = function(router) {
  router.post("/users", (req, res) => {
    let data = req.body;
    const user = new User();
    user.username = data.username;
    user.password = data.password;
    user.email = data.email;


    if (data.username == null || data.password == null || user.email == null) {
      res.json({
        success: false,
        message: "Field cannot be empty"
      });
    } else {
      user.save(function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.json({
            success: true,
            message: "User has been created!"
          });
        }
      });
    }
  });




  router.post("/auth", (req, res) => {

    User.findOne({ username : req.body.username }).select('email username password').exec(function(err, user){

      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: "User not authenticated!"
        });

      } else if(user) {
        if (!req.body.password) {
          res.json({
            success: false,
            message: "No password provided!"
          });

        }
        const validPassword = user.comparePasswords(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: "Not valid password!"
          });
        } else {
          const token =  Token.sign({
             email: user.email,
             username: user.username,
             password: user.password
           }, secret, { expiresIn: '24h'});
          res.json({
            success: true,
            message: "User authenticated!",
            token: token
          });
        }


      }
    });
  });



  router.use( (req, res, next) => {

    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {
      Token.verify(token, secret, (err, decoded) => {
        if (err) {
          res.json({
            success: false,
            message: 'Token invalid'
          });
        }else {
          req.decoded = decoded;
          console.log("body query ", req.decoded);
          next();
        }
      });
    } else {
      res.json({
        success: false,
        message: "No token provided"
      });
    }

  });

  router.post("/me", (req, res) => {
    res.send(req.decoded);
  });



  return router;

}
