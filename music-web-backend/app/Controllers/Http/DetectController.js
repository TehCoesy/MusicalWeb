'use strict'
const Helpers = use('Helpers');

class DetectController {
    async detectMusicGenre({request, response}) {
        // Spawn new child process to call the python script
        const audioFile = Helpers.resourcesPath('audio/audio-detect-file.wav')
        let {PythonShell} = require('python-shell')
        
        let promise = new Promise((resolve, reject) => {
            PythonShell.run('./model/detect_genre.py', null, function (err, results) {
                if (err){
                    throw error;
                    console.log(err);
                    return response.status('500').send('Can detect musoc ')
                } 
                // results is an array consisting of messages collected during execution
                console.log(results)
                resolve(results)
              });
        });

        let result = await promise;
        return result;
    }

    async uploadFile({request, response}) {
        const audio = request.file('audio', {
            type: ['audio/mpeg'],
            size: '10mb'
        })
        console.log(audio.clientName);
        const fileName = audio.clientName;

        if(!fileName.includes('wav')) {
            return response.status(500).send('Only accept .wav format file')
        }
        
        await audio.move(Helpers.resourcesPath('audio'), {
            name: 'audio-detect-file.wav',
            overwrite: true
        })

        if (!audio.moved()) {
            return audio.error();
        }

        return response.status(200).send('File uploaded')
    }
}

module.exports = DetectController
