'use strict'
const Helpers = use('Helpers');

class DetectController {
    async detectMusicGenre({request, response}) {
        // Spawn new child process to call the python script
        const audioFile = Helpers.resourcesPath('audio/audio-detect-file.wav')
        var spawn = require("child_process").spawn;
        //const python = spawn('python', ['./DetectGenre/detect_genre.py', audioFile]);
        const python = spawn('python', ['./DetectGenre/detect_genre.py']);
        console.log(audioFile);
        // console.log(python)
        // Collect output from script
        python.stdout.on('data', function (data) {
            return response.send(data)
        });
    }

    async uploadFile({request}) {
        const audio = request.file('audio', {
            type: ['audio/mpeg'],
            size: '5mb'
        })

        await audio.move(Helpers.resourcesPath('audio'), {
            name: 'audio-detect-file.wav',
            overwrite: true
        })

        if (!audio.moved()) {
            return audio.error();
        }

        return 'File moved'
    }
}

module.exports = DetectController
