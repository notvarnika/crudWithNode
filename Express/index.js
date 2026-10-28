const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const router = require("./routes/myroutes");
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, (error) => {
    if (error) {
        console.log(error.message);
        return;
    }

    console.log("Running server on: http://127.0.0.1:3000");
});