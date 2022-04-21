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
    const alreadyAdded = User.alreadyAdded(obj.username, obj.songId);
    console.log('controller already added ', alreadyAdded);
    if (!alreadyAdded) {
        let song = Song.findById(obj.songId);
        console.log('added song ', song)
        User.addToPlaylist(obj.username, song);
        res.json("ok");
    } else {
        res.json("already_added");
    }
    
};

let getPlaylist = (req, res, next) => {
    let username = req.headers.username;
    console.log('get playlist by username ', username);
    const arr = User.getPlaylist(username);
    res.json({
        songlist: arr
    });
};

let removeSong = (req, res, next) => {
    let username = req.headers.username;
    const songId = req.body.songId;
    console.log('remove song ', username, ' obj ==', songId);
    User.removeToPlaylist(username, songId);
    res.json('ok');
};


module.exports = { songs, addSong, getPlaylist, removeSong };