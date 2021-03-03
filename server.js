const express = require("express");
const path = require("path");
const unit = require("unit");

const htmlRoute = require('./generate/htmlRoute');
const apiRoute = require('./generate/apiRoute');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(__dirname + "/public"));

app.use("/api", apiRoute)
app.use("/", htmlRoute);


app.listen(PORT, () => console.log(`APP listening on PORT: ${PORT}`))