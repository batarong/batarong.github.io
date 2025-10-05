let batarongs = Number(localStorage.getItem("batarongs")) || 0;

document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;

document.getElementById("batarongbut").onclick = function() {
    batarongs = batarongs + 1;
    document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
    localStorage.setItem("batarongs", batarongs);
}