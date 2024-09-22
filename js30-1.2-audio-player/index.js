const playButton = document.getElementById('play_first');
const pauseButton = document.getElementById('pause_first');
const imageMain = document.getElementsByClassName('image')[0];
const audio_first = document.getElementById('audio_first');
const rangeAudio = document.getElementById('range-audio_first');
const currentTimeDisplay = document.querySelector('.currentTime');
const durationTimeDisplay = document.querySelector('.durationTime');
const nextButton = document.getElementById('forward_first');
const prevButton = document.getElementById('rewind_first');

const musicBlocks = [
    {
        imageSrc: 'img/spin.png',
        artistName: 'Dead or Alive',
        songName: 'You Spin Me Round',
        audioSrc: 'audio/spin.mp3',
    },
    {
        imageSrc: 'img/never.png',
        artistName: 'Rick Astley',
        songName: 'Never Gonna Give You Up',
        audioSrc: 'audio/never.mp3',
    },
    {
        imageSrc: 'img/rhytmn.png',
        artistName: 'SNAP!',
        songName: 'Rhythm is A Dancer',
        audioSrc: 'audio/rhythm.mp3',
    },
];

let currentIndex = 0;
let isPlaying = false;

audio_first.src = "audio/spin.mp3";
audio_first.load();

playButton.onclick = function(event){
    imageMain.style.transform = "scale(0.95)";
    playButton.style.display = "none";
    pauseButton.style.display = "block";
    audio_first.play();
    isPlaying = true;
};

pauseButton.onclick = function(event){
    imageMain.style.transform = "none";
    playButton.style.display = "block";
    pauseButton.style.display = "none";
    audio_first.pause();
    isPlaying = false;
};

function playAudio() {
    audio_first.play();
    isPlaying = true;
    playButton.style.display = "none";
    pauseButton.style.display = "block";
}

rangeAudio.addEventListener('input', function(event) {
    const newPosition = audio_first.duration * (rangeAudio.value / 100);
    audio_first.currentTime = newPosition;
});

audio_first.addEventListener('timeupdate', function(event) {
    if (isPlaying) {
        const currentTime = audio_first.currentTime;
        const duration = audio_first.duration;
        const progress = (currentTime / duration) * 100;
        
        rangeAudio.value = progress;

        const remainingTime = duration - currentTime;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationTimeDisplay.textContent = `-${formatTime(remainingTime)}`;
    }
});

audio_first.addEventListener('ended', function() {
    currentIndex = (currentIndex + 1) % musicBlocks.length;
    loadCurrentMusic();
    playAudio();
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function loadCurrentMusic() {
    const currentMusic = musicBlocks[currentIndex];
    imageMain.src = currentMusic.imageSrc;
    audio_first.src = currentMusic.audioSrc;
    audio_first.load();
    playButton.style.display = "block";
    pauseButton.style.display = "none";
    currentTimeDisplay.textContent = '0:00';
    durationTimeDisplay.textContent = '0:00';
    rangeAudio.value = 0;


    const artistName = document.querySelector('.artist-name');
    const songName = document.querySelector('.song-name');
    artistName.textContent = currentMusic.artistName;
    songName.textContent = currentMusic.songName;

    const backgroundImages = document.querySelectorAll('.background-img');
    backgroundImages.forEach((img, index) => {
        if (index === currentIndex) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }
    });
}

loadCurrentMusic();

nextButton.onclick = function() {
    currentIndex = (currentIndex + 1) % musicBlocks.length;
    loadCurrentMusic();
    playAudio(); 
};

prevButton.onclick = function() {
    currentIndex = (currentIndex - 1 + musicBlocks.length) % musicBlocks.length;
    loadCurrentMusic();
    playAudio(); 
};