const express = require('express');
const app = express();

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Backend application using NodeJs',
        important: true
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    },
    {
        id: 4,
        content: 'Browser can execute only Javascript',
        important: false
    },
]

// SET ENDPOINTS
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

const PORT = 3001;
app.listen(PORT);
// app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))
