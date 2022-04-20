const express = require('express');
const path = require('path');

const indexRouter = require('./routers/indexRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

app.listen(4000, () => {
    console.log('client is listing at port ', 4000);
});