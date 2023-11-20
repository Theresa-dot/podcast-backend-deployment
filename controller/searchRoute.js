const express = require("express");
const axios=require('axios')
const searchRoute = express.Router();
const {parseString} = require('xml2js')

searchRoute.get('/feed' , async(req,res,next) => {
  const url=req.query.url

  const {data}=await axios({
    url,
    method:'get'
  })

  parseString(data,(err,json)=>{
    if(err){
      return
    }
    const {rss}=json
    const {channel}=rss
    const payload=channel[0]
    res.json(payload)
  })

   
})

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