const path = require ("path");
const express = require("express");
const app = express()

app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "/develop/public/notes.html")));

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, "/develop/public/index.html")));

module.exports = app;