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

    new Song(1, 'Blue Sky', '1981').save();
    new Song(2, 'Echos', '1971').save();
});