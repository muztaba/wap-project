let songs = [];

module.exports = class Song {
    constructor(id, title, releaseDate, url) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.url = url;
    }

    save() {
        songs.push(this);
    }

    static search(title) {
        if (title === undefined || title == null || title === '') {
            return songs;
        }
        title = title.toLowerCase();
        return songs.filter(it => {
            let ss = it.title.toLowerCase();
            return ss.includes(title);
        });
    }

    static findById(songId) {
        console.log('song arra ', songs);
        console.log('songid ', songId);
        return songs.find(it => {
            console.log('song id ', it.id == songId);
            return it.id == songId;
        });
    }
}