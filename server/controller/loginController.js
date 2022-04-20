const user = require('../model/User');

let login = (req, res, next) => {
    let body = req.body;
    console.log('login request ', body);
    let exist = user.exist(body.username, body.password);
    let str = {
        message: 'no_match'
    };
    
    if (exist) {
        str.message = 'match';
        str.username = body.username;
        str.token = body.username + '-' + Date.now();        
    }

    res.json(str);
};

module.exports = {login};