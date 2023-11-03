require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json());



//  create a model - WILL WORK AS CONSTRUCTOR
// const Note = mongoose.model('Note', noteSchema, 'notes')
const Note = require('./models/db')


// SET ENDPOINTS
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

//  fetch al the resources in the note collection
app.get('/api/notes', (req, res) => {
    Note.find({}, {})
        .then((notes) => {
            res.json(notes)
        })
})

// creates a new resource based on the request data
app.post('/api/notes', (req, res) => {
    // prepare an object to store it in database
    const note = new Note(req.body);

    // storing the new object to the database
    note.save()
        .then(result => {
            res.status(201).json({ message: 'Note created successfully' })
        });
})

// fetching a single resource
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .then((note) => {
            if (!note) {
                return res.status(404).json({ error: "Note not found" })
            }
            res.json(note);
        })
        .catch((error) => {
            res.status(500).json({ error: "Internal server error" })
        });
});

// deleting a single resource
app.delete('/api/notes/:id', (req, res) => {
    // get the id of the resource from params
    const id = req.params.id;

    Note.findByIdAndDelete(id)
        .then((deleteNote) => {
            if (!deleteNote) {
                return res.status(404).json({ error: "Note not found" })
            }
            res.status(204).json({ message: "Note Deleted successfully" })
        })
        .catch((error) => {
            res.status(500).json({ error: "Internal server error" })
        });
})

app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const noteToPut = req.body;

    Note.findByIdAndUpdate(id, noteToPut)
        .then((updatedNote) => {
            if (!updatedNote) {
                return res.status(404).json({ error: "Note not found" })
            }
            res.json(updatedNote)
        })
        .catch((error) => {
            res.status(500).json({ error: "Internal server error" })
        });
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

