const Song = require('../model/Song');
const User = require('../model/User');
const user = require('../model/User');

let songs = (req, res, next) => {
    let q = req.query;
    console.log('serch query ', q);
    let arr = Song.search(q.s);
    console.log('search result ', arr);
    res.json({
        songlist: arr
    });
};

let addSong = (req, res, next) => {
    const obj = req.body;
    console.log('add request ', obj);
    
    let song = Song.findById(obj.songId);
    console.log('added song ', song)
    User.addToPlaylist(obj.username, song);
    res.json("ok");
};


module.exports = {songs, addSong};