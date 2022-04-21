const express = require('express');

const playlistController = require('../controller/playlistController');

const router = express.Router();

router.all('/profile/*', (req, res, next) =>{

    next();
});

router.get('/profile/songs', playlistController.songs);

router.get('/profile/get-playlist', playlistController.getPlaylist);

router.post('/profile/add-song', playlistController.addSong);

router.post('/profile/remove-song', playlistController.removeSong);



module.exports = router;