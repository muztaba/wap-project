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

    static alreadyAdded(username, songId) {
        let user = users.get(username);
        let playlist = user.playlist;
        console.log('already user ', user);
        console.log('already playlist ', playlist);
        if (playlist === undefined || playlist.length === 0) {
            return false; 
        }
        return playlist.find(it => it.id == songId) != undefined;
    }

    static addToPlaylist(username, song) {
        let user = users.get(username);
        user.add(song);        
    }

    static removeToPlaylist(username, songId) {
        let user = users.get(username);
        console.log('User removeToPlaylist ', user, ' songid ', songId);
        const newArr = user.playlist.filter(it => it.id != songId);
        console.log('newArr ', newArr);
        user.playlist = newArr;
    }

    add(song) {
        this.playlist.push(song);
    }

    static getPlaylist(username) {
        const playlist = users.get(username).playlist;
        return (playlist === undefined) ? [] : playlist;
    }



}