// Example JS to communicate with python script
// Only need express: npm install express

const express = require('express');
const app = express();
<<<<<<< HEAD
const port = 4000;
=======
const port = 3001;
>>>>>>> 2822b06156612c24325b1722e0e8d1da8d366184

app.get('/', (req, res) => {
    console.log("Received request...");

    // Spawn new child process to call the python script
    var spawn = require("child_process").spawn;
<<<<<<< HEAD
    const python = spawn('python', ['./detect_genre.py', 'blues_1.wav']);
=======
    const python = spawn('python', ['./detect_genre.py', '../music-web-backend/resources/audio/audio-detect-file.wav']);
>>>>>>> 2822b06156612c24325b1722e0e8d1da8d366184

    console.log("Child process started");

    // Collect output from script
    python.stdout.on('data', function (data) {
        res.send(data.toString());
    });
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));