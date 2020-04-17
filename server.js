const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require('path');
const appRoutes = require("./app/routes/api")(router);
const app = express();

const PORT = process.env.PORT || 666;

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": true }))
app.use("/api", appRoutes);
app.use(express.static(__dirname+'/public'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/app/index.html'));
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






app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});
