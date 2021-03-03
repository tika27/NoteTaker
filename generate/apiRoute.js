const fs = require("fs");
const express = require("express");
const {v4: uuid } = require("uuid");
const app = express()

app.get('/notes', (req, res) => {
    fs.readFile('./develop/db/db.json', (err, data) => {
        if (err) {
            console.log(err)
        }
        var notes = JSON.parse(data)
        res.send(notes)
    });
});

app.post('/notes', (req, res) => {
    const { title, text } = req.body
    const newNote = { title, text, id: uuid() }
    fs.readFile('./develop/db/db.json', (err, data) => {
        if (err) {
            console.log(err)
        }
        var currentNotes = JSON.parse(data)
        currentNotes.push(newNote)
        fs.writeFile('./develop/db/db.json', JSON.stringify(currentNotes), (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send(currentNotes)
    })
})

app.delete('/notes/:id', (req, res) => {
    var id = req.params.id
    console.log(req.params.id)
    fs.readFile('./develop/db/db.json', (err, data) => {
        if (err) {
            console.log(err)
        }
        var currentNotes = JSON.parse(data)
        var updateNotes = currentNotes.filter(note => note.id !== id)
        fs.writeFile('./develop/db/db.json', JSON.stringify(updateNotes), (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send(updateNotes)
    })
})

module.exports = app;