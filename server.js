const express = require("express");
const path = require("path");
const unit = require("unit");

const GenerateHTML = require('./generate/htmlgenerate')
const apiroutes = require('./generate/generatenotes')


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(__dirname + "/public"));

app.use("/api", apiroutes)
app.use("/", GenerateHTML);


app.listen(PORT, () => console.log(`APP listening on PORT: ${PORT}`))