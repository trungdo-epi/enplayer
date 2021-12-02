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

function loadVideo(video, src) {
    video.src = src;
    video.focus();
}

function unloadVideo(video) {
    video.src = "";
}

fileInput.addEventListener("change", (event) => {
    try {
        let file = getFile(event);
        let fileUrl = URL.createObjectURL(file);
        loadVideo(video, fileUrl);
        player.classList.add("playing");
    }
    catch (ex) {
        let msg = ex.message;
        displayError(msg);
    }
});

closeButton.addEventListener("click", () => {
    unloadVideo(video);
    player.classList.remove("playing");
});