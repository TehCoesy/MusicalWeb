'use strict'
const Helpers = use('Helpers')

const multer = require('multer');

class DetectController {
    async detectMusicGenre({request, response}) {
        // Spawn new child process to call the python script

        const audio = request.file('audio' ,{
            type: ['audio/mpeg'],
            size: '5mb'
        })

        var spawn = require("child_process").spawn;
        const python = spawn('python3', ['./DetectGenre/detect_genre.py', audio]);
        console.log(python);
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

    async uploadFile({request}) {
        const audio = request.file('audio', {
            type: ['audio/mpeg'],
            size: '5mb'
        })

        await audio.move(Helpers.tmpPath('uploads', {
            name: 'audio-name.wav',
            overwrite: true
        }))

        if (!audio.moved()) {
            return audio.error();
        }

        return 'File moved'
    }
}

module.exports = DetectController
