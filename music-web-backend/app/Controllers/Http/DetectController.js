'use strict'
const Helpers = use('Helpers');

class DetectController {
    async detectMusicGenre({request}) {
        // Spawn new child process to call the python script
        const audioFile = Helpers.resourcesPath('audio/audio-detect-file.wav')
<<<<<<< HEAD
        var spawn = require("child_process").spawn;
        const python = spawn('python', ['./DetectGenre/detect_genre.py', audioFile]);
        console.log(audioFile);
        // console.log(python)
        // Collect output from script
        let d = "nothing!"
        await python.stdout.on('data', function (data) {
            d = data;
            return d;
        });

        return d;
=======
        let {PythonShell} = require('python-shell')
        
        let promise = new Promise((resolve, reject) => {
            PythonShell.run('./model/detect_genre.py', null, function (err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                console.log(results)
                resolve(results)
              });
        });

        let result = await promise;
        return result;
>>>>>>> 2822b06156612c24325b1722e0e8d1da8d366184
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
