'use strict'

const axios = require('axios');
const Playlist = use('App/Models/Playlist')
const Const = use('App/Common/Const')

class GeneratePlaylistController {

    async generatePlaylist({request, response, auth}) {
        var {genre} = request.get();
        console.log(genre)
        if(genre === Const.GENRE.HIPHOP) {
            genre = 'hip%hop'
        }
        let musicData, listData;
        const music = await axios({
            baseURL: `https://api.discogs.com/database/search?genre=${genre}&page=1&per_page=100`,
            method: 'get',
            headers: { 'Authorization': `Discogs token=${process.env.DISCOGS_KEY}` }
        }).then(response => {
            listData = response.data.pagination.items;
            musicData = response.data;
        }).catch((error) => {
            console.log(error)
        })

        let list = [];
        for(var i = 0;i <= listData; i++){
            if(musicData.results[i] != undefined && musicData.results[i].year != undefined){
                if(musicData.results[i].year >= 1990){
                    list.push(musicData.results[i]);
                }
            }     
        }
        list.sort(() => Math.random() -0.5);
        // console.log(listData);
        console.log(list.length);
        if(list.length == 0) {
            return response.status(400).json({ message: 'no song recommend with this genre' })
        }
        const playlist_id = auth.user.id + '_' + genre;
        let data = [];
        for (var i = 0; i < 10; i++) {
            let _data = {
                id: i+1,
                title: list[i].title,
                year: list[i].year,
                label: list[i].label,
                genre: list[i].genre,
                thumbnail: list[i].thumb,
                master_url: list[i].master_url
            }
            // console.log(_data)
            data.push(_data);
            const user_id = auth.user.id;
            
            const save = await this.savePlaylist(_data, user_id, playlist_id);
        }

        return data;
    }

    async savePlaylist(data, user_id, playlist_id) {
        const song = new Playlist()

        // console.log(data, user_id, playlist_id);
        song.playlist_id = playlist_id;
        song.user_id = user_id;
        song.track_id = data.id;
        song.title = data.title;
        song.label = data.label[0];
        song.genre = data.genre;
        song.thumb_img = data.thumbnail;
        song.master_url = data.master_url;
        song.year = data.year;

        await song.save()
    }
}

module.exports = GeneratePlaylistController
