const { Router } = require("express");
const path = require ("path");
const route = require("express"). Route();

route.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, "./develop/public/notes.html")));

route.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, "./develop/public/index.html")));

module.exports = route;