const audioPlayer = document.querySelector(".audio-player");

// var song_track = [
//   {
//     songId: 1,
//     title: "Formula Fantasy",
//     url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//   },
//   {
//     songId: 2,
//     title: "Wonderful Lights",
//     url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
//   },
//   {
//     songId: 3,
//     title: "Big Ben",
//     url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp33",
//   },
// ];

let current_song_track = 0;
let audio = new Audio();
let shuffleState = "random";

//create the const of all the audio button
const playBtn = document.getElementById("play-icon");
const stopBtn = document.getElementById("stop-icon");
const shuffleBtn = document.getElementById("shuffle-icon");
const retweetBtn = document.getElementById("retweet-icon");
const repeatBtn = document.getElementById("repeat-icon");
const volumeSlider = document.getElementById("volume-slider");
const volumePercentage = document.getElementById("volume-percentage");
const timeline = audioPlayer.querySelector(".timeline");
const forwardBtn = document.getElementById("forward-icon");
const backwardBtn = document.getElementById("backward-icon");
let totalDuration = 0;

function loadSongsInPlayer(data) {
  song_track = [];
  rnd_track = [];
  rnd_idx = 0;
  data.forEach((x) => {
    let o = {
      songId: x.id,
      title: x.title,
      url: x.url,
    };
    // console.log('loadsongsinplayer ', o);
    song_track.push(o);
  }
  );
}

const startPlayingFromHere = function (songId) {
  current_song_track = song_track.findIndex((x) => x.songId == songId);
  audio.src = song_track[current_song_track].url;
  document.getElementById("song-title").innerHTML =
    song_track[current_song_track].title;
  audio.play();
  audio.currentTime = 0;
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play-circle");
};

audio.addEventListener(
  "loadeddata",
  () => {
    document.getElementById("song-title").innerHTML = song_track[current_song_track].title;
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = 0.75;
  },
  false
);

//toggle between playing and pausing on button click
playBtn.addEventListener("click", () => {
  if (song_track.length == 0) {
    return;
  }
  if (current_song_track < 0 && song_track.length > 0) {
    current_song_track = 0;
    audio.src = song_track[current_song_track].url;
    document.getElementById("song-title").innerHTML =
      song_track[current_song_track].title;
  }
  else if (song_track.length > 0 && audio.src == "") {
    audio.src = song_track[current_song_track].url;
    document.getElementById("song-title").innerHTML =
      song_track[current_song_track].title;
  }
  if (audio.paused) {
    playBtn.classList.remove("fa-play-circle");
    playBtn.classList.add("fa-pause");
    audio.play();
  } else {
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play-circle");
    audio.pause();
  }
});

//toggle between volume
document.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("fa-volume-up");
    volumeEl.classList.add("fa-volume-off");
  } else {
    volumeEl.classList.add("fa-volume-up");
    volumeEl.classList.remove("fa-volume-off");
  }
});

//turn seconds to minutes
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

//toggle between the shuffle buttons
shuffleBtn.addEventListener("click", () => {
  shuffleState = "random";
});

retweetBtn.addEventListener("click", () => {
  shuffleState = "retweet";
});

repeatBtn.addEventListener("click", () => {
  shuffleState = "repeat";
});

//click volume slider to change volume
volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    volumePercentage.style.width = newVolume * 100 + "%";
  },
  false
);

//click on timeline to skip around
timeline.addEventListener(
  "click",
  (e) => {
    try {
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
      audio.currentTime = timeToSeek;
    } catch (Error) {
      return false;
    }
  }
);

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
  if ((audio.currentTime / audio.duration) * 100 == 100) {
    playNextSong();
  }
}, 500);

//select next track based on the shuffle condition
//retweet means going via entire list in circular
//repeat means playing song again and again
function playNextSong() {
  console.log('suffleState ', shuffleState);
  if (shuffleState == "random") {

    while(true) {
      if (rnd_idx >= song_track.length) {
        rnd_idx = 0;
        rnd_track = [];
        for (let i = 0; i < song_track.length; i++) {
          rnd_track.push(i);
        }
        rnd_track = _.shuffle(rnd_track);
      }
  
      if (rnd_track.length === 0) {
        for (let i = 0; i < song_track.length; i++) {
          rnd_track.push(i);
        }
        rnd_track = _.shuffle(rnd_track);
      }
  
      console.log('rnd_idx ', rnd_idx, ' rnd_track ', rnd_track);
      if (rnd_track[rnd_idx] != current_song_track) {
        break;
      }
      rnd_track = _.shuffle(rnd_track);
    }

    current_song_track = rnd_track[rnd_idx];
    rnd_idx++;


  } else if (shuffleState == "retweet") {
    if (current_song_track == song_track.length - 1) {
      current_song_track = 0;
    } else {
      current_song_track += 1;
    }
  } else {
    current_song_track = current_song_track;
  }
  audio.src = song_track[current_song_track].url;
  document.getElementById("song-title").innerHTML =
    song_track[current_song_track].title;
  audio.play();
}

//change track on clicking forward button
forwardBtn.addEventListener("click", () => {
  playNextSong();
});

//change track on clicking backward button
backwardBtn.addEventListener("click", () => {
  if (current_song_track == 0) {
    current_song_track = song_track.length - 1;
  } else {
    current_song_track -= 1;
  }
  audio.src = song_track[current_song_track].url;
  audio.play();
});


function removeFromCurrentPlayer(songId) {
  fetch("http://localhost:5500/users/removeSong/" + songId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.url == audio.src) {
        audio.currentTime = 0;
        document.getElementById("song-title").innerHTML = "-";
        audioPlayer.querySelector(".progress").style.width = 0;
        audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(0);
        current_song_track = -1;
        audio.src = "";
      }
      song_track = song_track.filter((x) => x.songId != songId);
      console.log(song_track);
    });
}