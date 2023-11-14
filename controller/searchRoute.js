const express = require("express");
const axios=require('axios')
const searchRoute = express.Router();

searchRoute.get('/search',async(req,res,next)=>{
    const searchTerm=req.body.term
    const url=`https://itunes.apple.com/search?term=${searchTerm}&country=US&media=podcast`
    const {data}=await axios({
        url,
        method:'get',
        options:{
            headers:{Accept:'application/json'}
        }
    })
    const {results}=data;
    const podcasts = results.map((podcast) => {
        return {
          author: podcast.artistName,
          episodeTitle: podcast.trackName,
          imageAlt: podcast.artworkUrl600,
          categories: podcast.genres,
          date: podcast.releaseDate,
          duration: podcast.contentAdvisoryRating,
          feed:podcast.feedUrl
        };
      });
  
      res.json({
        podcasts,
      });
})

searchRoute.post('/search',async(req,res,next)=>{
    const searchTerm=req.body.term
    const url=`https://itunes.apple.com/search?term=${searchTerm}&country=US&media=podcast`
    const {data}=await axios({
        url,
        method:'get',
        options:{
            headers:{Accept:'application/json'}
        }
    })
    const {results}=data;
    const podcasts = results.map((podcast,idx) => {
        return {
            id:idx,
          author: podcast.artistName,
          episodeTitle: podcast.trackName,
          imageAlt: podcast.artworkUrl600,
          categories: podcast.genres,
          date: podcast.releaseDate,
          duration: podcast.contentAdvisoryRating,
          feed:podcast.feedUrl
        };
      });
  
      res.json({
        podcasts,
      });
})

module.exports = searchRoute;