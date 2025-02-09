const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

//Don't ask where I got this...
function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

const users = new Map();

//No idea if I should remove this
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users', (req, res) => {
    const data = req.body;
    const uuid = uuidv4();
    if (data.name != undefined && data.email != undefined) {
        users.set(uuid, data);
        res.status(201).send({id: uuid, name: data.name, email: data.email});
    } else 
        res.sendStatus(400);
});

app.get('/users/:id', (req, res) => {
    if (users.has(req.params.id)) {
        const data = users.get(req.params.id);
        res.send({id: req.params.id, name: data.name, email: data.email});
    } else
        res.send(404);
});


app.put('/users/:id', (req, res) => {
    const data = req.body;
    if (users.has(req.params.id)) {
        if (data.name != undefined && data.email != undefined) {
            users.set(req.params.id, data);
            res.send({id: req.params.id, name: data.name, email: data.email});
        } else
            res.sendStatus(400);
    } else
        res.sendStatus(404);
});

app.delete('/users/:id', (req, res) => {
    if (users.has(req.params.id)) {
        users.delete(req.params.id);
        res.sendStatus(204);
    } else
        res.sendStatus(404);
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing