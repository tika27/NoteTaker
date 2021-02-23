const fs = require('fs');
const express = require("express");
const path = require("path");
const unit = require("unit");

const readFileAsync = unit.promisify(fs.readFile);
const writeFileAsync = unit.promisify(fs.writeFile);


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("./develop/public"));


app.get("/api/notes", function (req, res)  {
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.post("/api/notes", function(req, res)  {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const note = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes;
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(data))
        res.json(note);

    })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});


app.delete("/api/notes/:id", (req, res) => {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i = 0; i <notes.length; i++) {
            if(idToDelete !== notes[i].id){
                newNotesData.push(notes[i])

            }          
        }
        return newNotesData

    }).then(function(notes) {
    writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.send("successfully saved");

    })
})

app.listen(PORT, () => {
    console.log("APP listening on PORT" +PORT);
});