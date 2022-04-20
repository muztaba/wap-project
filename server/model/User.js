let users = new Map();

module.exports = class User {
    constructor(id, username, password){
        this.id = id;
        this.username = username;
        this.password = password;
        this.playlist = [];
    }

    static exist(username, password) {
        console.log(username, password);
        const user = users.get(username);        
        if (user != undefined || user != null) {
            console.log("user found");
            if (password === user.password) {
                return true;
            }
        }
        return false;
    }

    save() {
        users.set(this.username, this);
    }

    static addToPlaylist(username, song) {
        let user = users.get(username);
        console.log(user);
        user.add(song);
        console.log(user);
    }

    add(song) {
        this.playlist.push(song);
    }



}