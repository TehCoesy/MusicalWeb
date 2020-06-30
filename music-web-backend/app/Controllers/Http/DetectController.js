'use strict'

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
}

module.exports = DetectController
