'use strict'

const axios = require('axios');

class GeneratePlaylistController {
    async generatePlaylist({request, response}) {
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
            data.push(_data);;
        }

        return data;
    }
}

module.exports = GeneratePlaylistController
