const express = require("express");
const https = require("https");
const fs = require('fs')
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require('path');
const appRoutes = require("./app/routes/api")(router);
const app = express();

const passport = require("passport");
const social  = require("./app/passport/passport")(app, passport);

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": true }))
app.use("/api", appRoutes);
app.use(express.static(__dirname+'/public'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});




mongoose.connect('mongodb://localhost:27017/MeanStack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("error", err);
    } else {
        console.log("Mongo connected");
    }
});


// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }, app).listen(PORT, () => {
//     console.log("listening to port ", PORT);
// });


app.listen(PORT, () => {

});
