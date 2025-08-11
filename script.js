const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume-control');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

let isPlaying = false;
let isDarkMode = false;

const songs = [
    {
        title: 'Despacito',
        artist: 'Luis Fonsi & Daddy Yankee',
        src: 'songs/Despacito.mp3'
    },
    {
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        src: 'songs/Shape of You.mp3'
    },
    {
        title: 'Vaada Raha',
        artist: 'Toshi Sabri',
        src: 'songs/Vaada Raha.mp3'
    },
    {
        title: 'Waka Waka',
        artist: 'Shakira',
        src: 'songs/Waka Waka.mp3'
    }
];

let currentSongIndex = 0;

function loadSong(song) {
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    audioPlayer.load();
}

function playPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶️';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playPause();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playPause();
}

function updateProgress() {
    const { duration, currentTime } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function seek(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode', isDarkMode);
    themeBtn.textContent = isDarkMode ? '🌞' : '🌙';
}

volumeControl.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
});

progressContainer.addEventListener('click', seek);
audioPlayer.addEventListener('timeupdate', updateProgress);

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
themeBtn.addEventListener('click', toggleTheme);

loadSong(songs[currentSongIndex]);
