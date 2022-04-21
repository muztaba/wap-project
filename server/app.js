const express = require('express');
const cors = require('cors');
const user = require('./model/User')

const loginRouter = require('./routers/loginRouter');
const playlistRouter = require('./routers/playlistRouter')
const Song = require('./model/Song');

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRouter);
app.use(playlistRouter);


app.listen(3000, () => {
    console.log('server is listing at port ', 3000);
    new user(1, "john", "123").save();
    new user(2, "seal", "123").save();

    new Song(1, 'Blue Sky', '1981', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" ).save();
    new Song(2, 'Echos', '1971', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3").save();
    new Song(3, 'Pigs', '1976', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3").save();
    new Song(4, 'Money', '1970', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3").save();
    new Song(5, 'Wish you were here', '1973', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3").save();
    new Song(6, 'Have a ciger', '1973', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3").save();
    new Song(7, 'Dark side of the moon', '1975', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3").save();
    new Song(8, 'Welcome to the machine', '1974', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3").save();
    new Song(9, 'The Wall', '1974', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3").save();
    new Song(10, 'High hopes', '1974', "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3").save();
});