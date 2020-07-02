'use strict'
const Helpers = use('Helpers');

class DetectController {
    async detectMusicGenre({request, response}) {
        // Spawn new child process to call the python script
        const audioFile = Helpers.resourcesPath('audio/audio-detect-file.wav')
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
