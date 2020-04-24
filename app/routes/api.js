const User = require("../models/user");
const Token = require("jsonwebtoken");
const secret = 'node';



module.exports = function(router) {
  router.post("/users", (req, res) => {
    let data = req.body;
    const user = new User();
    user.name = data.name;
    user.username = data.username;
    user.password = data.password;
    user.email = data.email;


    if ( user.name == null || user.username == null || user.password == null || user.email == null ) {
      res.json({
        success: false,
        message: "Field cannot be empty"
      });
    } else {
      user.save(function (err, doc) {

        if (err) {

          if (err.errors) {
            if(err.errors.name) {
              res.json({ success: false, message: err.errors.name.message });
            }else if (err.errors.email) {
              res.json({ success: false, message: err.errors.email.message });
            }else {
              res.json({ success: false, message: err });
            }
          }else if (err) {
            if (err.code == 11000) {
              res.json({ success: false, message: "Username or email is already taken!" });
            } else {
              res.json({ success: false, message: err });
            }
          }


        } else {
          res.json({ success: true, message: "User has been created!"
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

router.post("/checkUsername", (req, res) => {
  User.findOne({ username : req.body.username }).select('username').exec(function(err, username){
    if (err) throw err;
    if (username) {
        res.json({
          success: false,
          message: "That username is already taken!"
        });
    } else {
      res.json({
        success: true,
        message: "Valid username!"
      });
    }
  });
});



router.post("/checkEmail", (req, res) => {

  User.findOne({ email : req.body.email }).select('email').exec(function(err, email) {
    if (err) throw err;
    if (email) {
        res.json({
          success: false,
          message: "That email is already taken!",
          data: email
        });
    } else {
      res.json({
        success: true,
        message: "Valid email!"
      });
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
