'use strict'

const multer = require('multer');

class DetectController {
    async detectMusicGenre({request, response}) {
        // Spawn new child process to call the python script
        var spawn = require("child_process").spawn;
        const python = spawn('python3', ['./DetectGenre/detect_genre.py', request.filename]);

        // Collect output from script
        python.stdout.on('data', function (data) {
            return response.send(data)
        });
    }

    // async uploadFile({request, response}) {
    //     const storage = multer.memoryStorage();
    //     const upload = multer({storage: storage, limits: {fields: 1, fileSize: 600000, files:1, parts:2 }});

    //     upload.single('track')(req, res, (error) => {
    //         if(error) {
    //             return res.status(400).json({ message: "Upload Request Validation Failed" })
    //         }
    //         else if(!req.body.name) {
    //             return res.status(400).json({ message: "No track name in request body" })
    //         }

    //         let trackname = req.body.name;

    //         const readableTrackStream = new Readable();
    //         readableTrackStream.push(req.file.buffer);
    //         readableTrackStream.push(null);
    //     })
    // }
}

module.exports = DetectController
