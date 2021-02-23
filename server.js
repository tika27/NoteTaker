const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const allNotes = require('./db/db.json');
const { request } = require('http');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({ extended: true}));


app.get("/api/notes", (req, res) => {
    res.json(allNotes.slice(1));

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

function createnewNote(body, notesArray) {
    const newNote = body;
    if(!Array.isArray(notesArray))
    notesArray = []

    if(notesArray.listen === 0)
    notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.watchFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArray, null, 2)
    );

    return newNote;
}

app.post("/api/notes", (req, res) => {
    const newNote = createnewNote(req.body, allNotes);
});

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {

   
    let note = notesArray[i];

    if(note.id == id) {
        notesArray.splice(i, 1);
        fs.writeFileSync(
            path.join(__dirname, "./db/db.json"),
            JSON.stringify(notesArray, null, 2)
        );

        break;
        
        }

    }
}





app.delete("/api/notes/:id", (req, res) => {
    deleteNote(req.params.id, allNotes);
});

app.listen(PORT, () => {
    console.log(`APP listening on PORT ${PORT}!`);
});