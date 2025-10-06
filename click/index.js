console.log("Javascript is Armed and Loaded!")

// === Load saved values or set defaults ===
let batarongs = Number(localStorage.getItem("batarongs")) || 0;
let increment = Number(localStorage.getItem("increment")) || 1;

// YouTube
let ytbought = Number(localStorage.getItem("ytbought")) || 0;
let bataytCost = Number(localStorage.getItem("bataytCost")) || 10;

// SOPV
let sopvbought = Number(localStorage.getItem("sopvbought")) || 0;
let sopvCost = Number(localStorage.getItem("sopvCost")) || 100;
let sopvInterval = null;

// MED
let medbought = Number(localStorage.getItem("medbought")) || 0;
let medCost = Number(localStorage.getItem("medCost")) || 500;
let medInterval = null;


// === Update UI on load ===
const updateUI = () => {
    document.getElementById("batarongsclicked").textContent = `Batarongs: ${batarongs}`;
    document.getElementById("bycount").textContent = ytbought;
    document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`;

    document.getElementById("sopvcount").textContent = sopvbought;
    document.getElementById("sopvcost").innerHTML = `Cost: ${sopvCost} Batarongs.<br>Gives 1 batarong /sec`;

    document.getElementById("medcount").textContent = medbought;
    document.getElementById("medcost").innerHTML = `Cost: ${medCost} Batarongs.<br>Gives 3 batarongs /sec`;

    const sopvRateEl = document.getElementById("sopvrate");
    const medRateEl = document.getElementById("medrate");
    const totalRateEl = document.getElementById("totalrate");

    if (sopvRateEl) sopvRateEl.innerHTML = `<span style="color:limegreen;">Income: +${sopvbought}/sec</span>`;
    if (medRateEl) medRateEl.innerHTML = `<span style="color:limegreen;">Income: +${medbought * 3}/sec</span>`;
    if (totalRateEl) totalRateEl.innerHTML = `<span style="color:cyan;">Total Income: +${sopvbought + medbought * 3}/sec</span>`;
};

updateUI();


// === Clicking main button ===
document.getElementById("batarongbut").onclick = function() {
    batarongs += increment;
    document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
    localStorage.setItem("batarongs", batarongs);
};


// === YouTube upgrade (increases click power) ===
document.getElementById("bataytclick").onclick = function() {
    if (batarongs >= bataytCost) {
        batarongs -= bataytCost;
        increment += 1;
        ytbought += 1;
        bataytCost = Math.ceil(bataytCost * 1.2);

        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("increment", increment);
        localStorage.setItem("ytbought", ytbought);
        localStorage.setItem("bataytCost", bataytCost);

        updateUI();
    } else {
        console.log("Not enough Batarongs");
    }
};


// === SOPV upgrade (+1/sec) ===
document.getElementById("sopvclick").onclick = function() {
    if (batarongs >= sopvCost) {
        batarongs -= sopvCost;
        sopvbought += 1;
        sopvCost = Math.ceil(sopvCost * 1.2);

        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("sopvbought", sopvbought);
        localStorage.setItem("sopvCost", sopvCost);

        updateUI();
        startSopvInterval();
    } else {
        console.log("Not enough Batarongs");
    }
};


// === MED upgrade (+3/sec) ===
document.getElementById("medclick").onclick = function() {
    if (batarongs >= medCost) {
        batarongs -= medCost;
        medbought += 1;
        medCost = Math.ceil(medCost * 1.25);

        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("medbought", medbought);
        localStorage.setItem("medCost", medCost);

        updateUI();
        startMedInterval();
    } else {
        console.log("Not enough Batarongs");
    }
};


// === Start intervals ===
function startSopvInterval() {
    if (sopvInterval) clearInterval(sopvInterval);
    sopvInterval = setInterval(() => {
        batarongs += sopvbought;
        document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

function startMedInterval() {
    if (medInterval) clearInterval(medInterval);
    medInterval = setInterval(() => {
        batarongs += medbought * 3;
        document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}


// === Resume intervals if owned ===
if (sopvbought > 0) startSopvInterval();
if (medbought > 0) startMedInterval();


// === Reset everything ===
window.game = {
    Reset: function() {
        batarongs = 0;
        increment = 1;
        ytbought = 0;
        bataytCost = 10;
        sopvbought = 0;
        sopvCost = 100;
        medbought = 0;
        medCost = 500;

        localStorage.clear();

        if (sopvInterval) clearInterval(sopvInterval);
        if (medInterval) clearInterval(medInterval);

        updateUI();
    }
};
