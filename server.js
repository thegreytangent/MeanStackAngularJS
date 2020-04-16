const express = require("express");
const morgan  = require("morgan");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 666;

app.use(morgan('dev'))


mongoose.connect('mongodb://localhost:27017/MeanStack', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("error", err);
    }else {
        console.log("Mongo connected");
    }
});



app.get("/", (req, res) => {
    res.send("test");
});


app.listen(PORT, () => {
    console.log("listening to port ", PORT );
});
