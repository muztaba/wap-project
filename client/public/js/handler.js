function loginHandler() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let loginReq = {
        username,
        password
    }

    console.log(username, ' ', password);

    fetch('http://localhost:3000/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(loginReq)
    }).then(res => res.json())
        .then(res => {
            console.log("login response ", res)
            if (res.message === 'no_match') {
                const loginErr = document.getElementById('login-error');
                loginErr.style = 'color: red;';
            } else if (res.message === 'match') {
                let obj = {
                    username: res.username,
                    token: res.token
                }
                setUser(obj);
                loginAndLoadData(res.username, res.token);
            }
        })
        .catch(err => console.log(err));
}

function loginAndLoadData(username, token) {
    document.getElementById('welcome-message').style.display = 'none';
    document.getElementById('login-content').style.display = '';

    const loginPanel = document.getElementById('login-panel');
    loginPanel.style = 'display: none;';

    const userPanel = document.getElementById('login-user-panel');
    const usernamePanel = document.getElementById('user-name');
    userPanel.style = 'visibility: visible;';
    usernamePanel.innerText = username;

    loadAllSong();
    getPlayList();
}

function logoutHandler() {
    sessionStorage.removeItem('m_user');
    location.reload();
}

function loadAllSong() {
    fetch('http://localhost:3000/profile/songs')
        .then(res => res.json())
        .then(res => listTable(res.songlist))
        .catch(err => console.log(err));
}

function searchHandler() {
    let q = document.getElementById('search-input').value;
    console.log('search query ', q);
    q = q.trim();
    fetch('http://localhost:3000/profile/songs' + '?s=' + q)
        .then(res => res.json())
        .then(res => {
            console.log('search query result ', res);
            listTable(res.songlist)
        })
        .catch(err => console.log(err));
}

function listTable(songlist) {
    let rows = '';

    for (let i = 0; i < songlist.length; i++) {
        let row = '<tr> ';
        row += '<th scope="row"> ' + (i + 1) + ' </th> ';
        row += ' <td> ' + songlist[i].title + ' </td> ';
        row += ' <td> ' + songlist[i].releaseDate + ' </td> '
        row += ` <td> <button data-songid="${songlist[i].id}" id="${'add-' + songlist[i].id}">Add</button> `;
        rows += row;
    }

    const tableBody = document.getElementById('songList');
    tableBody.innerHTML = '';
    tableBody.innerHTML = rows;

    addHandler(songlist);
}

function addHandler(songlist) {
    for (let i = 0; i < songlist.length; i++) {
        const addBtn = document.getElementById('add-' + songlist[i].id);

        addBtn.onclick = function () {
            const songId = addBtn.dataset.songid;
            let obj = getUser();
            console.log(obj);

            fetch('http://localhost:3000/profile/add-song', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({ username: obj.username, songId: songId })
            }).then(res => res.json())
                .then(res => {
                    console.log('added song res ', res);
                    if (res == 'already_added') {
                        alert('Already Added');
                    } else {
                        getPlayList();
                    }
                })
                .catch(err => console.log(err));

        }

    }
}

function getPlayList() {
    fetch('http://localhost:3000/profile/get-playlist', {
        headers: {
            'username': getUser().username
        },
    }).then(res => res.json())
        .then(res => {
            songlist = res.songlist;
            let rows = '';

            for (let i = 0; i < songlist.length; i++) {
                let row = '<tr> ';
                row += '<th scope="row"> ' + (i + 1) + ' </th> ';
                row += ' <td> ' + songlist[i].title + ' </td> ';
                row += ` <td> 
                <button data-songid="${songlist[i].id}" id="${'remove-song-' + songlist[i].id}">Remove</button> 
                <button data-songid="${songlist[i].id}" id="${'play-song-' + songlist[i].id}">Play</button> 
                </td>`;
                rows += row;
            }

            const tableBody = document.getElementById('playlist');
            tableBody.innerHTML = '';
            tableBody.innerHTML = rows;

            for (let i = 0; i < songlist.length; i++) {
                const removeBtn = document.getElementById('remove-song-' + songlist[i].id);
                
                // remove song from playlist
                removeBtn.onclick = function () {
                    const songId = removeBtn.dataset.songid;
                    let obj = getUser();
                    console.log(obj);

                    fetch('http://localhost:3000/profile/remove-song', {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'username': getUser().username
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify({ username: obj.username, songId: songId })
                    }).then(res => res.json())
                        .then(res => {
                            document.getElementById('playlist').innerHTML = '';
                            getPlayList();
                        })
                        .catch(err => console.log(err));

                }

            }
        })
        .catch(err => console.log(err));
}

function setUser(obj) {
    sessionStorage.setItem('m_user', JSON.stringify(obj));
}

function getUser() {
    return JSON.parse(sessionStorage.getItem('m_user'));
}