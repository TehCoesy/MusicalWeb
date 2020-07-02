// Example JS to communicate with python script
// Only need express: npm install express

const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    console.log("Received request...");

    // Spawn new child process to call the python script
    var spawn = require("child_process").spawn;
    const python = spawn('python', ['./detect_genre.py', './blues_1.wav']);

    console.log("Child process started");

    // Collect output from script
    python.stdout.on('data', function (data) {
        res.send(data.toString());
    });
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));