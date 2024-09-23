
const tracks = [
    {
        title: "Pullin Up",
        artist: "SODA",
        src: "assets/audio/SODA – Pullin Up (Extended).mp3",
        cover: "assets/images/1.jpg"
    },
    {
        title: "Praise God",
        artist: "Kanye West",
        src: "assets/audio/Kanye West – Praise God.mp3",
        cover: "assets/images/2.jpg"
    },
    {
        title: "Left Alone",
        artist: "Allan Raymon",
        src: "assets/audio/Allan Rayman – Left Alone.mp3",
        cover: "assets/images/3.jpg"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;


const coverImage = document.getElementById('cover-image');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = document.getElementById('play-pause-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
const backgrounds = document.querySelectorAll('.background-img');


const audio = new Audio();
audio.src = tracks[currentTrackIndex].src;


function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    coverImage.src = track.cover;


    backgrounds.forEach((bg, idx) => {
        if (idx === index) {
            bg.style.display = "block";
            bg.style.opacity = 0;
        
            setTimeout(() => {
                bg.style.opacity = 1;
            }, 100);
        } else {
            bg.style.opacity = 0;
       
            setTimeout(() => {
                bg.style.display = "none";
            }, 500);
        }
    });
}

function updatePlayPauseIcon() {
    if (isPlaying) {
        playPauseIcon.src = "assets/svg/pause.png";
    } else {
        playPauseIcon.src = "assets/svg/play.png";
    }
}
function playTrack() {
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
    coverImage.style.transform = "rotate(360deg)";
    coverImage.style.transition = "transform 30s linear";
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    updatePlayPauseIcon();
    coverImage.style.transform = "rotate(0deg)";
    coverImage.style.transition = "transform 0s linear";
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
}

function updateProgress() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalDurationEl.textContent = "-" + formatTime(audio.duration - audio.currentTime);
    }
}


function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', nextTrack);

progressBar.addEventListener('input', (e) => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});


loadTrack(currentTrackIndex);
