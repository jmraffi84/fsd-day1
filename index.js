const http = require('http')

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

const app = http.createServer((req, res) => {
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(notes))
})

const PORT = 3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);