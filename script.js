// Song database with sample audio URLs
const songs = {
    'midnight-city': {
        title: 'Midnight City',
        artist: 'M83',
        cover: 'https://picsum.photos/seed/midnightcity/56/56.jpg',
        largeCover: 'https://picsum.photos/seed/midnightcity/280/280.jpg',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    'stressed-out': {
        title: 'Stressed Out',
        artist: 'Twenty One Pilots',
        cover: 'https://picsum.photos/seed/stressedout/56/56.jpg',
        largeCover: 'https://picsum.photos/seed/stressedout/280/280.jpg',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    'feel-it-still': {
        title: 'Feel It Still',
        artist: 'Portugal. The Man',
        cover: 'https://picsum.photos/seed/feelitstill/56/56.jpg',
        largeCover: 'https://picsum.photos/seed/feelitstill/280/280.jpg',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    'believer': {
        title: 'Believer',
        artist: 'Imagine Dragons',
        cover: 'https://picsum.photos/seed/believer/56/56.jpg',
        largeCover: 'https://picsum.photos/seed/believer/280/280.jpg',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    },
    'shape-of-you': {
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        cover: 'https://picsum.photos/seed/shapeofyou/56/56.jpg',
        largeCover: 'https://picsum.photos/seed/shapeofyou/280/280.jpg',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
    },
    'closer': {
        title: 'Closer',
        artist: 'The Chainsmokers',
        cover: 'https://picsum.photos/seed/closer/56/56.jpg',
        largeCover: 'https://picsum.photos/seed/closer/280/280.jpg',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
    },
    'bad-guy': {
        title: 'Bad Guy',
        artist: 'Billie Eilish',
        cover: 'https://picsum.photos/seed/badguy/56/56.jpg',
        largeCover: 'https://picsum.photos/seed/badguy/280/280.jpg',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
    },
    'sunflower': {
        title: 'Sunflower',
        artist: 'Post Malone & Swae Lee',
        cover: 'https://picsum.photos/seed/sunflower/56/56.jpg',
        largeCover: 'https://picsum.photos/seed/sunflower/280/280.jpg',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
    }
};

// DOM elements
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.querySelector('.play-pause');
const modalPlayPauseBtn = document.getElementById('modal-play-pause');
const playerAlbumCover = document.querySelector('.player-album-cover');
const playerTitle = document.querySelector('.player-info h3');
const playerArtist = document.querySelector('.player-info p');
const progressBar = document.querySelector('.progress-bar');
const modalProgressBar = document.getElementById('modal-progress-bar');
const prevBtn = document.querySelector('.fa-step-backward');
const nextBtn = document.querySelector('.fa-step-forward');
const musicPlayer = document.getElementById('music-player');
const nowPlayingModal = document.getElementById('now-playing-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalAlbumCover = document.getElementById('modal-album-cover');
const modalSongTitle = document.getElementById('modal-song-title');
const modalArtistName = document.getElementById('modal-artist-name');
const modalCurrentTime = document.getElementById('modal-current-time');
const modalTotalTime = document.getElementById('modal-total-time');

// Current song tracking
let currentSongId = 'midnight-city';
let isPlaying = false;
let currentSongIndex = 0;
const songIds = Object.keys(songs);

// Initialize player with first song
function initPlayer() {
    loadSong(currentSongId);
}

// Load song into player
function loadSong(songId) {
    const song = songs[songId];
    audioPlayer.src = song.src;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerAlbumCover.src = song.cover;
    
    // Update modal
    modalSongTitle.textContent = song.title;
    modalArtistName.textContent = song.artist;
    modalAlbumCover.src = song.largeCover;
    
    // Update active state in recently played
    document.querySelectorAll('.recently-played-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.song === songId) {
            item.classList.add('active');
        }
    });
    
    // Update current song index
    currentSongIndex = songIds.indexOf(songId);
    currentSongId = songId;
}

// Play/pause toggle
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.classList.remove('fa-pause-circle');
        playPauseBtn.classList.add('fa-play-circle');
        modalPlayPauseBtn.classList.remove('fa-pause-circle');
        modalPlayPauseBtn.classList.add('fa-play-circle');
    } else {
        audioPlayer.play();
        playPauseBtn.classList.remove('fa-play-circle');
        playPauseBtn.classList.add('fa-pause-circle');
        modalPlayPauseBtn.classList.remove('fa-play-circle');
        modalPlayPauseBtn.classList.add('fa-pause-circle');
    }
    isPlaying = !isPlaying;
}

// Play next song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songIds.length;
    loadSong(songIds[currentSongIndex]);
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Play previous song
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songIds.length) % songIds.length;
    loadSong(songIds[currentSongIndex]);
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Update progress bar
function updateProgress() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
        modalProgressBar.style.width = `${progress}%`;
        
        // Update time display
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        const totalMinutes = Math.floor(audioPlayer.duration / 60);
        const totalSeconds = Math.floor(audioPlayer.duration % 60);
        
        modalCurrentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        modalTotalTime.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }
}

// Format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
modalPlayPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', playPrevSong);
nextBtn.addEventListener('click', playNextSong);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', playNextSong);

// Music player click to open modal
musicPlayer.addEventListener('click', function(e) {
    // Don't open modal if clicking on controls
    if (e.target.closest('.player-controls')) {
        return;
    }
    nowPlayingModal.classList.add('active');
});

// Close modal
closeModalBtn.addEventListener('click', function() {
    nowPlayingModal.classList.remove('active');
});

// Close modal when clicking outside content
nowPlayingModal.addEventListener('click', function(e) {
    if (e.target === nowPlayingModal) {
        nowPlayingModal.classList.remove('active');
    }
});

// Recently played item click
document.querySelectorAll('.recently-played-item').forEach(item => {
    item.addEventListener('click', function() {
        const songId = this.dataset.song;
        loadSong(songId);
        
        if (isPlaying) {
            audioPlayer.play();
        } else {
            togglePlayPause();
        }
    });
});

// Navigation item click
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Don't trigger navigation if clicking on file input
        if (e.target.classList.contains('profile-upload')) {
            return;
        }
        
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Playlist card click
document.querySelectorAll('.playlist-card').forEach(card => {
    card.addEventListener('click', function() {
        // In a real app, this would navigate to the playlist
        console.log('Playlist card clicked');
    });
});

// Profile picture upload
document.querySelector('.profile-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.profile-pic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Initialize player
initPlayer();
