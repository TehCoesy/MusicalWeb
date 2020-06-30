'use strict'

const axios = require('axios');

class GeneratePlaylistController {
    async generatePlaylist({request}) {
        const {genre} = request.get();
        console.log(genre)
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
                if(musicData.results[i].year >= 2005){
                    list.push(musicData.results[i]);
                }
            }     
        }
        console.log(listData);
        console.log(list.length);
        let data = [];
        for (var i = 0; i < list.length; i++) {
            let _data = {
                id: i,
                title: list[i].title,
                year: list[i].year,
                label: list[i].label,
                genre: list[i].genre,
                thumbnail: list[i].thumb,
                master_url: list[i].master_url
            }
            console.log(_data)
            data.push(_data);;
        }

        return data;
    }
}

module.exports = GeneratePlaylistController
