'use strict';

let player = document.getElementById("player");
let video = document.getElementById("video");
let fileInput = document.getElementById("input-file");
let closeButton = document.getElementById("button-close");
let loaded = false;
let paused = false;

function displayError(msg) {
    let div = document.getElementById("player-error");
    div.innerText = msg;
}

function getFile(event) {
    let files = event.target.files;
    let file = files[0];
    return file;
}

function loadVideo(src) {
    video.src = src;
    video.focus();
    player.classList.add("playing");
    loaded = true;
}

function unloadVideo() {
    video.src = "";
    player.classList.remove("playing");
    loaded = false;
}

fileInput.addEventListener("change", async (event) => {
    try {
        let file = getFile(event);
        let fileUrl = URL.createObjectURL(file);
        loadVideo(fileUrl);
    }
    catch (ex) {
        unloadVideo();
        displayError(ex.message);
    }
});

closeButton.addEventListener("click", () => {
    unloadVideo();
});

document.addEventListener("click", (event) => {
    if (loaded) {
        let y = event.clientY;
        let h = document.documentElement.clientHeight;
        let above = y < h / 2;
        let below = !above;

        if (below) { // pause/unpause
            if (!paused) {
                paused = true;
                video.pause();
            }
            else {
                paused = false;
                video.play();
            }
        }

        if (above) {
            let current = video.currentTime;
            let seek = current - 2;
            if (seek < 0) seek = 0;
            video.currentTime = seek;
        }
    }
});