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

// UI Elements
const upgradesPanel = document.getElementById("upgradesPanel");
const openBtn = document.getElementById("openUpgrades");
const closeBtn = document.getElementById("closeUpgrades");
const totalRateEl = document.getElementById("totalrate");

// Toggle upgrades panel with slide
openBtn.onclick = () => upgradesPanel.classList.add("open");
closeBtn.onclick = () => upgradesPanel.classList.remove("open");

// Update UI
const updateUI = () => {
    document.getElementById("batarongsclicked").textContent = `Batarongs: ${batarongs}`;
    document.getElementById("bycount").textContent = ytbought;
    document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`;

    document.getElementById("sopvcount").textContent = sopvbought;
    document.getElementById("sopvcost").innerHTML = `Cost: ${sopvCost} Batarongs.<br>Gives 1 batarong /sec`;
    document.getElementById("sopvrate").innerHTML = `<span style="color:limegreen;">Income: +${sopvbought}/sec</span>`;

    document.getElementById("medcount").textContent = medbought;
    document.getElementById("medcost").innerHTML = `Cost: ${medCost} Batarongs.<br>Gives 3 batarongs /sec`;
    document.getElementById("medrate").innerHTML = `<span style="color:limegreen;">Income: +${medbought*3}/sec</span>`;

    // Total income
    const total = sopvbought + medbought*3;
    totalRateEl.textContent = `Total Income: +${total}/sec`;
};

updateUI();

// === Clicking main button ===
document.getElementById("batarongbut").onclick = () => {
    batarongs += increment;
    localStorage.setItem("batarongs", batarongs);
    updateUI();
};

// === Upgrades ===
document.getElementById("bataytclick").onclick = () => {
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
    }
};

document.getElementById("sopvclick").onclick = () => {
    if (batarongs >= sopvCost) {
        batarongs -= sopvCost;
        sopvbought += 1;
        sopvCost = Math.ceil(sopvCost * 1.2);

        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("sopvbought", sopvbought);
        localStorage.setItem("sopvCost", sopvCost);
        updateUI();
        startSopvInterval();
    }
};

document.getElementById("medclick").onclick = () => {
    if (batarongs >= medCost) {
        batarongs -= medCost;
        medbought += 1;
        medCost = Math.ceil(medCost * 1.25);

        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("medbought", medbought);
        localStorage.setItem("medCost", medCost);
        updateUI();
        startMedInterval();
    }
};

// === Intervals ===
function startSopvInterval() {
    if (sopvInterval) clearInterval(sopvInterval);
    sopvInterval = setInterval(() => {
        batarongs += sopvbought;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

function startMedInterval() {
    if (medInterval) clearInterval(medInterval);
    medInterval = setInterval(() => {
        batarongs += medbought*3;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

// Resume if owned
if (sopvbought > 0) startSopvInterval();
if (medbought > 0) startMedInterval();

// Reset game
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
