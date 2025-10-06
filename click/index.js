// === Load saved values or set defaults ===
let batarongs = Number(localStorage.getItem("batarongs")) || 0;
let increment = Number(localStorage.getItem("increment")) || 1;
let ytbought = Number(localStorage.getItem("ytbought")) || 0;
let bataytCost = Number(localStorage.getItem("bataytCost")) || 10;

// SOPV values
let sopvbought = Number(localStorage.getItem("sopvbought")) || 0;
let sopvCost = Number(localStorage.getItem("sopvCost")) || 100;
let sopvInterval = null;


// === Update all UI elements on load ===
document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
document.getElementById("bycount").textContent = ytbought;
document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`;
document.getElementById("sopvcount").textContent = sopvbought;
document.getElementById("sopvcost").innerHTML = `Cost: ${sopvCost} Batarongs.<br>Gives 1 batarong /sec`;

// 💡 Add a spot for income rate display
const sopvRateEl = document.getElementById("sopvrate");
if (sopvRateEl) sopvRateEl.textContent = `Income: +${sopvbought}/sec`;


// === Clicking main button gives Batarongs ===
document.getElementById("batarongbut").onclick = function() {
    batarongs += increment;
    document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
    localStorage.setItem("batarongs", batarongs);
};


// === YouTube upgrade (doubles click production) ===
document.getElementById("bataytclick").onclick = function() {
    if (batarongs >= bataytCost) {
        batarongs -= bataytCost;
        increment += 1; // +1 click power each time
        ytbought += 1;
        bataytCost = Math.ceil(bataytCost * 1.2); // 20% cost increase

        // Save data
        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("increment", increment);
        localStorage.setItem("ytbought", ytbought);
        localStorage.setItem("bataytCost", bataytCost);

        // Update UI
        document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
        document.getElementById("bycount").textContent = ytbought;
        document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`;
    } else {
        console.log("Not enough Batarongs");
    }
};


// === SOPV upgrade (auto batarongs/sec) ===
document.getElementById("sopvclick").onclick = function() {
    if (batarongs >= sopvCost) {
        batarongs -= sopvCost;
        sopvbought += 1;
        sopvCost = Math.ceil(sopvCost * 1.2); // increase cost by 20%

        // Save new values
        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("sopvbought", sopvbought);
        localStorage.setItem("sopvCost", sopvCost);

        // Update UI
        document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
        document.getElementById("sopvcount").textContent = sopvbought;
        document.getElementById("sopvcost").innerHTML = `Cost: ${sopvCost} Batarongs.<br>Gives 1 batarong /sec`;
        if (sopvRateEl) sopvRateEl.textContent = `Income: +${sopvbought}/sec`;

        // Start or keep the interval running
        if (!sopvInterval) {
            sopvInterval = setInterval(function() {
                batarongs += sopvbought; // adds current SOPV total per second
                document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
                localStorage.setItem("batarongs", batarongs);
            }, 1000);
        }
    } else {
        console.log("Not enough Batarongs");
    }
};


// === Continue SOPV income if already owned ===
if (sopvbought > 0) {
    sopvInterval = setInterval(function() {
        batarongs += sopvbought;
        document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
        localStorage.setItem("batarongs", batarongs);
    }, 1000);
    if (sopvRateEl) sopvRateEl.textContent = `Income: +${sopvbought}/sec`;
}


// === Reset all progress ===
window.game = {
    Reset: function() {
        batarongs = 0;
        increment = 1;
        ytbought = 0;
        bataytCost = 10;
        sopvbought = 0;
        sopvCost = 100;

        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("increment", increment);
        localStorage.setItem("ytbought", ytbought);
        localStorage.setItem("bataytCost", bataytCost);
        localStorage.setItem("sopvbought", sopvbought);
        localStorage.setItem("sopvCost", sopvCost);

        // Stop interval
        if (sopvInterval) {
            clearInterval(sopvInterval);
            sopvInterval = null;
        }

        // Update UI
        document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
        document.getElementById("bycount").textContent = ytbought;
        document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`;
        document.getElementById("sopvcount").textContent = sopvbought;
        document.getElementById("sopvcost").innerHTML = `Cost: ${sopvCost} Batarongs.<br>Gives 1 batarong /sec`;
        if (sopvRateEl) sopvRateEl.textContent = `Income: +${sopvbought}/sec`;
    }
};
