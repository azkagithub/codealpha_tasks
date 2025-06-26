const songs = [
  {
    title: "Inspire",
    artist: "Aviate",
    path: "song1.mp3",
    cover: "Nature 4.PNG"
  },
  {
    title: "Dreams",
    artist: "Sienna",
    path: "song2.mp3",
    cover: "Nature 5.PNG"
  },
  {
    title: "Sunrise",
    artist: "Nova",
    path: "song3.mp3",
    cover: "Nature 1.PNG"
  }
];

// DOM elements
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume-slider");

let currentIndex = 0;
let isPlaying = false;
const audio = new Audio();

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.path;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  isPlaying = false;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

loadSong(currentIndex);
