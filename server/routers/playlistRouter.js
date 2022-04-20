const express = require('express');

const playlistController = require('../controller/playlistController');

const router = express.Router();

router.get('/songs', playlistController.songs)

router.post('/add-song', playlistController.addSong);

module.exports = router;