// === Load saved values or set defaults ===

// == Batarongs ==
let batarongs = Number(localStorage.getItem("batarongs")) || 0;
let increment = Number(localStorage.getItem("increment")) || 1;

// == YouTube ==
let ytbought = Number(localStorage.getItem("ytbought")) || 0;
let bataytCost = Number(localStorage.getItem("bataytCost")) || 10;

// == SOPV ==
let sopvbought = Number(localStorage.getItem("sopvbought")) || 0;
let sopvCost = Number(localStorage.getItem("sopvCost")) || 100;
let sopvInterval = null;

// == MED ==
let medbought = Number(localStorage.getItem("medbought")) || 0;
let medCost = Number(localStorage.getItem("medCost")) || 500;
let medInterval = null;

// == Factory ==
let factorybought = Number(localStorage.getItem("factorybought")) || 0;
let factoryCost = Number(localStorage.getItem("factoryCost")) || 2000;
let factoryInterval = null;


// == UI Elements ==
const upgradesPanel = document.getElementById("upgradesPanel");
const openBtn = document.getElementById("openUpgrades");
const closeBtn = document.getElementById("closeUpgrades");
const totalRateEl = document.getElementById("totalrate");

// === Toggle upgrades panel with slide ===
openBtn.onclick = () => upgradesPanel.classList.add("open");
closeBtn.onclick = () => upgradesPanel.classList.remove("open");

// Update UI
const updateUI = () => {
    const batarongEl = document.getElementById("batarongsclicked");
    if (batarongEl) batarongEl.textContent = `Batarongs: ${batarongs}`;

    const ytCountEl = document.getElementById("bycount");
    if (ytCountEl) ytCountEl.textContent = ytbought;

    const ytCostEl = document.getElementById("bytcost");
    if (ytCostEl) ytCostEl.innerHTML = `Cost: ${bataytCost} Batarongs.<br>Increases Click Value by 1`;

    const sopvCountEl = document.getElementById("sopvcount");
    if (sopvCountEl) sopvCountEl.textContent = sopvbought;

    const sopvCostEl = document.getElementById("sopvcost");
    if (sopvCostEl) sopvCostEl.innerHTML = `Cost: ${sopvCost} Batarongs.<br>Gives 1 batarong /sec`;

    const sopvRateEl = document.getElementById("sopvrate");
    if (sopvRateEl) sopvRateEl.innerHTML = `<span style="color:limegreen;">Income: +${sopvbought}/sec</span>`;

    const medCountEl = document.getElementById("medcount");
    if (medCountEl) medCountEl.textContent = medbought;

    const medCostEl = document.getElementById("medcost");
    if (medCostEl) medCostEl.innerHTML = `Cost: ${medCost} Batarongs.<br>Gives 3 batarongs /sec<br>Triples Click Production`;

    const medRateEl = document.getElementById("medrate");
    if (medRateEl) medRateEl.innerHTML = `<span style="color:limegreen;">Income: +${medbought*3}/sec</span>`;

    const factoryCountEl = document.getElementById("factorycount");
    if (factoryCountEl) factoryCountEl.textContent = factorybought;

    const factoryCostEl = document.getElementById("factorycost");
    if (factoryCostEl) factoryCostEl.innerHTML = `Cost: ${factoryCost} Batarongs.<br>Gives 10 batarongs /sec`;

    const factoryRateEl = document.getElementById("factoryrate");
    if (factoryRateEl) factoryRateEl.innerHTML = `<span style="color:limegreen;">Income: +${factorybought*10}/sec</span>`;

    const totalRateEl = document.getElementById("totalrate");
    if (totalRateEl) {
        const total = sopvbought + medbought*3 + factorybought*10;
        totalRateEl.textContent = `Total Income: +${total}/sec`;
    }
};


updateUI();

// === Clicking main button ===
document.getElementById("batarongbut").onclick = () => {
    batarongs += increment;
    localStorage.setItem("batarongs", batarongs);
    updateUI();
};

// === Upgrade click handlers ===

// --- YouTube (+1 click) ---
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

// --- SOPV (+1/sec) ---
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

// --- MED (+3/sec & triples click production) ---
document.getElementById("medclick").onclick = () => {
    if (batarongs >= medCost) {
        batarongs -= medCost;
        medbought += 1;
        increment += 3; // triples click production
        medCost = Math.ceil(medCost * 1.25);

        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("medbought", medbought);
        localStorage.setItem("medCost", medCost);

        updateUI();
        startMedInterval();
    }
};

// --- Factory (+10/sec, no click bonus) ---
document.getElementById("factoryclick").onclick = () => {
    if (batarongs >= factoryCost) {
        batarongs -= factoryCost;
        factorybought += 1;           // increment factory count
        factoryCost = Math.ceil(factoryCost * 1.25);  // increase cost

        // Save to localStorage
        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("factorybought", factorybought);
        localStorage.setItem("factoryCost", factoryCost);

        updateUI();
        startFactoryInterval();       // start interval that adds 10/sec per factory
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
        batarongs += medbought * 3;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

function startFactoryInterval() {
    if (factoryInterval) clearInterval(factoryInterval);
    factoryInterval = setInterval(() => {
        batarongs += factorybought * 10;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

// Resume intervals if player owns upgrades
if (sopvbought > 0) startSopvInterval();
if (medbought > 0) startMedInterval();
if (factorybought > 0) startFactoryInterval();


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
        batarongs += medbought * 3;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

function startFactoryInterval() {
    if (factoryInterval) clearInterval(factoryInterval);
    factoryInterval = setInterval(() => {
        batarongs += factorybought * 10;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

if (sopvbought > 0) startSopvInterval();
if (medbought > 0) startMedInterval();
if (factorybought > 0) startFactoryInterval();

// === Global Game Object ===
window.game = {
    Reset: function() {
        // Reset all game values to defaults
        batarongs = 0;
        increment = 1;

        ytbought = 0;
        bataytCost = 10;

        sopvbought = 0;
        sopvCost = 100;

        medbought = 0;
        medCost = 500;

        factorybought = 0;
        factoryCost = 2000

        localStorage.clear();

        if (sopvInterval) clearInterval(sopvInterval);
        if (medInterval) clearInterval(medInterval);
        if (factoryInterval) clearInterval(factoryInterval);

        updateUI();
        console.log("♻️ Game fully reset to defaults.");
    },

    Test: function() {
        batarongs = 9999;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
        console.log("💰 Test mode: 9999 Batarongs added.");
    }
};

// === Developer Menu ===
function createDeveloperMenu() {
    if (document.querySelector('.developer-menu')) return;

    const devMenu = document.createElement('div');
    devMenu.className = 'developer-menu';
    devMenu.innerHTML = `
        <div class="dev-header">
            <h2>Developer Menu</h2>
            <button id="dev-close">✖</button>
        </div>
        <div id="dev-content">
            <button id="dev-test">💰 Test (Set 9999 Batarongs)</button>
            <button id="dev-reset">♻️ Reset Game</button>
        </div>
    `;
    document.body.appendChild(devMenu);

    const header = devMenu.querySelector('.dev-header');
    let isDragging = false, offsetX, offsetY;

    header.addEventListener('mousedown', e => {
        isDragging = true;
        offsetX = e.clientX - devMenu.getBoundingClientRect().left;
        offsetY = e.clientY - devMenu.getBoundingClientRect().top;
    });
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        devMenu.style.left = `${e.clientX - offsetX}px`;
        devMenu.style.top = `${e.clientY - offsetY}px`;
        devMenu.style.right = 'auto';
        devMenu.style.transform = 'none';
    });

    document.getElementById("dev-close").onclick = () => devMenu.remove();
    document.getElementById("dev-test").onclick = () => game.Test();
    document.getElementById("dev-reset").onclick = () => game.Reset();
}

// ✅ expose dev menu
window.game.Developer = function() {
    createDeveloperMenu();
    console.log("✅ Developer Menu opened.");
};
