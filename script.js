const music = document.querySelector("audio");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const img = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");

// Music
const songs = [
  {
    name: "pretty-boy",
    displayName: "Pretty Boy",
    artist: "Joji",
  },
  {
    name: "jacinto-1",
    displayName: "Piusbfvcyudvc",
    artist: "Joji",
  },
  {
    name: "more-than-u-know",
    displayName: "More Than You Know",
    artist: "Axwell & Ingrosso",
  },
];

// Check if playing
let isPLaying = false;

// Play
const playSong = () => {
  isPLaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

// Pause
const pauseSong = () => {
  isPLaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Play or pause event Listener
playBtn.addEventListener("click", () => (isPLaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// // Next Song
// const nextSong = () => {
//     songIndex++;
//     console.log(songIndex)
//     loadSong(songs[songIndex]);
//     playSong();
// }

// Prev Song
// const prevSong = () => {
//     songIndex--;
//     loadSong(songs[songIndex]);
//     playSong();
// }
// Next Song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Prev Song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// function nextSong(){
//     songIndex++;
//     console.log(songIndex);
//     loadSong(songs[songIndex]);
//     playSong();
// }

// function prevSong(){
//     songIndex--;
//     console.log(songIndex);
//     loadSong(songs[songIndex]);
//     playSong();
// }
// First Song - On Load

// Update Progress Bar and Time
function updateProgressBar(e) {
  if (isPLaying) {
    const { duration, currentTime } = e.srcElement;
    // Update the progess bar with duration
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate the display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay the switching element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate the display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

loadSong(songs[songIndex]);

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended",nextSong)
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
