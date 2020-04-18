const User = require("../models/user");


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

    

    return router;

}
