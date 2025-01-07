const hamburger = document.querySelector(".hamburger");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const shuffle = document.querySelector("#shuffle");
const repeat = document.querySelector("#repeat");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const album = document.querySelector("#album");
const audio = document.querySelector("#audio");
const cover = document.querySelector("#cover");
const volumeBar = document.querySelector("#volumeBar");
const progressBar = document.querySelector("#progressBar");
const elapsedTime = document.querySelector("#elapsedTime");
const totalTime = document.querySelector("#totalTime");
const right = document.querySelector(".right");
const volumeIcon = document.querySelector("#volumeIcon");

let trackIndex = 0;
let isPlaying = false;
let isShuffling = false;
let isRepeating = false;
let previousVolume = 1;
volumeBar.value = audio.volume * 8;

const songList = [
    {
        title: "Astroscape Motivation",
        artist: "DayNightMorning",
        album: "Motivated",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg",
    },
    {
        title: "Dancing in the Stardust",
        artist: "FreeSoundServer",
        album: "Galaxy",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg",
    },
    {
        title: "Drift Away Dusk",
        artist: "FreeSoundServer",
        album: "Separated",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg",
    },
    {
        title: "Soul Sweeper",
        artist: "ItsWatR",
        album: "Rebirth",
        src: "songs/song4.mp3",
        cover: "images/cover4.jpg",
    },
    {
        title: "Amalgam",
        artist: "Rockot",
        album: "Union",
        src: "songs/song5.mp3",
        cover: "images/cover5.jpg",
    },
];

function updateTrack() {
    const track = songList[trackIndex];
    audio.src = track.src;
    title.textContent = track.title;
    artist.textContent = track.artist;
    album.textContent = track.album;
    cover.src = track.cover;

    audio.addEventListener("loadedmetadata", () => {
        totalTime.textContent = formatTime(audio.duration);
    });
}

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 8;
    updateVolumeIcon();
});

audio.addEventListener("timeupdate", () => {
    const current = audio.currentTime;
    const duration = audio.duration;
    progressBar.value = (current / duration) * 100;
    elapsedTime.textContent = formatTime(current);
});

progressBar.addEventListener("input", () => {
    const duration = audio.duration;
    const seekTime = (progressBar.value / 100) * duration;
    audio.currentTime = seekTime;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

hamburger.addEventListener("click", () => {
    const right = document.querySelector(".right");
    const left = document.querySelector(".left");
    right.classList.toggle("sideMenu");
    left.classList.toggle("dark");
});

shuffle.addEventListener("click", () => {
    shuffle.classList.toggle("active");
    isShuffling = !isShuffling;
});

repeat.addEventListener("click", () => {
    isRepeating = !isRepeating;
    repeat.classList.toggle("active");
});

play.addEventListener("click", () => {
    if (play.getAttribute("src") === "icons/play.svg") {
        play.setAttribute("src", "icons/pause.svg");
        audio.play();
        isPlaying = true;
    } else {
        play.setAttribute("src", "icons/play.svg");
        audio.pause();
        isPlaying = false;
    }
    isPlaying = !isPlaying;
});

next.addEventListener("click", () => {
    if (isShuffling) {
        let nextTrackIndex = Math.floor(Math.random() * songList.length);
        trackIndex =
            nextTrackIndex != trackIndex
                ? nextTrackIndex
                : Math.floor(Math.random() * songList.length);
    } else {
        trackIndex = (trackIndex + 1) % songList.length;
    }
    updateTrack();
    imageList();
    audio.play();
    play.setAttribute("src", "icons/pause.svg");
    isPlaying = true;
});

previous.addEventListener("click", () => {
    if (isShuffling) {
        trackIndex = Math.floor(Math.random() * songList.length);
    } else {
        trackIndex = (trackIndex - 1 + songList.length) % songList.length;
    }
    updateTrack();
    imageList();
    audio.play();
    play.setAttribute("src", "icons/pause.svg");
    isPlaying = true;
});

audio.addEventListener("ended", () => {
    if (isRepeating) {
        audio.play();
    } else {
        next.click();
    }
});

function updateActiveImage(index) {
    const currentActive = right.querySelector(".imageActive");
    if (currentActive) currentActive.classList.remove("imageActive");

    const newActive = right.querySelector(`img[data-index="${index}"]`);
    if (newActive) newActive.classList.add("imageActive");

    scrollActiveImageIntoView();
}

function scrollActiveImageIntoView() {
    const activeImage = right.querySelector(".imageActive");
    if (activeImage) {
        activeImage.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }
}

function imageList() {
    right.innerHTML = "";

    songList.forEach((song, index) => {
        let image = document.createElement("img");
        image.src = song.cover;
        image.alt = song.title;
        image.classList.add("album-cover");
        image.dataset.index = index;
        image.loading = "lazy";

        if (index === trackIndex) {
            image.classList.add("imageActive");
        }

        image.addEventListener("click", () => {
            trackIndex = index;
            updateTrack();
            audio.play();
            play.setAttribute("src", "icons/pause.svg");
            isPlaying = true;

            updateActiveImage(index);
        });

        right.append(image);
    });

    scrollActiveImageIntoView();
}

function updateVolumeIcon() {
    if (audio.volume === 0) {
        volumeIcon.src = "icons/mute.svg";
    } else if (audio.volume > 0 && audio.volume <= 0.3) {
        volumeIcon.src = "icons/volumeLow.svg";
    } else if (audio.volume > 0.3 && audio.volume <= 0.7) {
        volumeIcon.src = "icons/volumeMedium.svg";
    } else {
        volumeIcon.src = "icons/volume.svg";
    }
}

volumeIcon.addEventListener("click", () => {
    if (audio.volume === 0) {
        audio.volume = previousVolume;
        volumeBar.value = audio.volume * 8;
        updateVolumeIcon();
    } else {
        previousVolume = audio.volume;
        audio.volume = 0;
        volumeBar.value = 0;
        volumeIcon.src = "icons/mute.svg";
    }
});

imageList();
updateTrack();
