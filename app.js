'use strict';

let player = document.getElementById("player");
let video = document.getElementById("video");
let fileInput = document.getElementById("input-file");
let closeButton = document.getElementById("button-close");

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
}

function unloadVideo() {
    video.src = "";
    player.classList.remove("playing");
}

fileInput.addEventListener("change", async (event) => {
    try {
        let file = getFile(event);
        let fileUrl = URL.createObjectURL(file);
        loadVideo(fileUrl);
    }
    catch (ex) {
        unloadVideo();
        displayError(ex.message)
    }
});

closeButton.addEventListener("click", () => {
    unloadVideo();
});