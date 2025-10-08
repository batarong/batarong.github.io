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

// == Foxxer ==
let foxxerbought = Number(localStorage.getItem("foxxerbought")) || 0;
let foxxerCost = Number(localStorage.getItem("foxxerCost")) || 10000;
let foxxerInterval = null;


// == UI Elements ==
const upgradesPanel = document.getElementById("upgradesPanel");
const openBtn = document.getElementById("openUpgrades");
const closeBtn = document.getElementById("closeUpgrades");

// === Toggle upgrades panel ===
openBtn.onclick = () => upgradesPanel.classList.add("open");
closeBtn.onclick = () => upgradesPanel.classList.remove("open");

// === Update UI ===
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
    if (sopvCostEl) sopvCostEl.innerHTML = `Cost: ${sopvCost} Batarongs.<br>Gives 1 batarong/sec`;

    const sopvRateEl = document.getElementById("sopvrate");
    if (sopvRateEl) sopvRateEl.innerHTML = `<span style="color:limegreen;">Income: +${sopvbought}/sec</span>`;

    const medCountEl = document.getElementById("medcount");
    if (medCountEl) medCountEl.textContent = medbought;

    const medCostEl = document.getElementById("medcost");
    if (medCostEl) medCostEl.innerHTML = `Cost: ${medCost} Batarongs.<br>Gives 3 batarongs/sec<br>Triples Click Production`;

    const medRateEl = document.getElementById("medrate");
    if (medRateEl) medRateEl.innerHTML = `<span style="color:limegreen;">Income: +${medbought * 3}/sec</span>`;

    const factoryCountEl = document.getElementById("factorycount");
    if (factoryCountEl) factoryCountEl.textContent = factorybought;

    const factoryCostEl = document.getElementById("factorycost");
    if (factoryCostEl) factoryCostEl.innerHTML = `Cost: ${factoryCost} Batarongs.<br>Gives 10 batarongs/sec`;

    const factoryRateEl = document.getElementById("factoryrate");
    if (factoryRateEl) factoryRateEl.innerHTML = `<span style="color:limegreen;">Income: +${factorybought * 10}/sec</span>`;

    const foxxerCountEl = document.getElementById("foxxercount");
    if (foxxerCountEl) foxxerCountEl.textContent = foxxerbought;

    const foxxerCostEl = document.getElementById("foxxercost");
    if (foxxerCostEl) foxxerCostEl.innerHTML = `Cost: ${foxxerCost} Batarongs.<br>Gives 20 batarongs/sec<br>+8 Click Power`;

    const foxxerRateEl = document.getElementById("foxxerrate");
    if (foxxerRateEl) foxxerRateEl.innerHTML = `<span style="color:limegreen;">Income: +${foxxerbought * 20}/sec</span>`;

    const totalRateEl = document.getElementById("totalrate");
    if (totalRateEl) {
        const total = sopvbought + (medbought * 3) + (factorybought * 10) + (foxxerbought * 20);
        totalRateEl.textContent = `Total Income: +${total}/sec`;
    }
};
updateUI();

// === Click main button ===
document.getElementById("batarongbut").onclick = () => {
    batarongs += increment;
    localStorage.setItem("batarongs", batarongs);
    updateUI();
};

// === Upgrades ===

// YouTube (+1 click)
document.getElementById("bataytclick").onclick = () => {
    if (batarongs >= bataytCost) {
        batarongs -= bataytCost;
        increment += 1;
        ytbought++;
        bataytCost = Math.ceil(bataytCost * 1.2);
        saveAll();
        updateUI();
    }
};

// SOPV (+1/sec)
document.getElementById("sopvclick").onclick = () => {
    if (batarongs >= sopvCost) {
        batarongs -= sopvCost;
        sopvbought++;
        sopvCost = Math.ceil(sopvCost * 1.2);
        saveAll();
        startSopvInterval();
        updateUI();
    }
};

// MED (+3/sec & triples click power)
document.getElementById("medclick").onclick = () => {
    if (batarongs >= medCost) {
        batarongs -= medCost;
        medbought++;
        increment *= 3;
        medCost = Math.ceil(medCost * 1.25);
        saveAll();
        startMedInterval();
        updateUI();
    }
};

// Factory (+10/sec)
document.getElementById("factoryclick").onclick = () => {
    if (batarongs >= factoryCost) {
        batarongs -= factoryCost;
        factorybought++;
        factoryCost = Math.ceil(factoryCost * 1.75);
        saveAll();
        startFactoryInterval();
        updateUI();
    }
};

// Foxxer (+20/sec & +8 click power)
document.getElementById("foxxerclick").onclick = () => {
    if (batarongs >= foxxerCost) {
        batarongs -= foxxerCost;
        foxxerbought++;
        increment += 8;
        foxxerCost = Math.ceil(foxxerCost * 2.1);
        saveAll();
        startFoxxerInterval();
        updateUI();
    }
};

// === Save Function ===
function saveAll() {
    localStorage.setItem("batarongs", batarongs);
    localStorage.setItem("increment", increment);
    localStorage.setItem("ytbought", ytbought);
    localStorage.setItem("bataytCost", bataytCost);
    localStorage.setItem("sopvbought", sopvbought);
    localStorage.setItem("sopvCost", sopvCost);
    localStorage.setItem("medbought", medbought);
    localStorage.setItem("medCost", medCost);
    localStorage.setItem("factorybought", factorybought);
    localStorage.setItem("factoryCost", factoryCost);
    localStorage.setItem("foxxerbought", foxxerbought);
    localStorage.setItem("foxxerCost", foxxerCost);
}

// === Intervals ===
function startSopvInterval() {
    clearInterval(sopvInterval);
    sopvInterval = setInterval(() => {
        batarongs += sopvbought;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

function startMedInterval() {
    clearInterval(medInterval);
    medInterval = setInterval(() => {
        batarongs += medbought * 3;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

function startFactoryInterval() {
    clearInterval(factoryInterval);
    factoryInterval = setInterval(() => {
        batarongs += factorybought * 10;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

function startFoxxerInterval() {
    clearInterval(foxxerInterval);
    foxxerInterval = setInterval(() => {
        batarongs += foxxerbought * 20;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
    }, 1000);
}

// Resume intervals
if (sopvbought > 0) startSopvInterval();
if (medbought > 0) startMedInterval();
if (factorybought > 0) startFactoryInterval();
if (foxxerbought > 0) startFoxxerInterval();

// === Game Object ===
window.game = {
    Reset() {
        localStorage.clear();
        location.reload(); // simple full reset
    },

    Test() {
        batarongs = 99999999;
        localStorage.setItem("batarongs", batarongs);
        updateUI();
        console.log("✅ Test: player granted 99,999,999 Batarongs.");
    },

    Developer() {
        createDeveloperMenu();
    }
};

// === Developer Menu ===
function createDeveloperMenu() {
    if (document.querySelector(".developer-menu")) return;

    const devMenu = document.createElement("div");
    devMenu.className = "developer-menu";
    devMenu.innerHTML = `
        <div class="dev-header">
            <h2>Developer Menu</h2>
            <button id="dev-close">✖</button>
        </div>
        <div id="dev-content">
            <button id="dev-test">Test</button>
            <button id="dev-reset">Reset</button>
        </div>
    `;
    document.body.appendChild(devMenu);

    // draggable
    const header = devMenu.querySelector(".dev-header");
    let isDragging = false, offsetX, offsetY;
    header.addEventListener("mousedown", e => {
        isDragging = true;
        offsetX = e.clientX - devMenu.getBoundingClientRect().left;
        offsetY = e.clientY - devMenu.getBoundingClientRect().top;
    });
    document.addEventListener("mouseup", () => isDragging = false);
    document.addEventListener("mousemove", e => {
        if (!isDragging) return;
        devMenu.style.left = `${e.clientX - offsetX}px`;
        devMenu.style.top = `${e.clientY - offsetY}px`;
        devMenu.style.right = "auto";
        devMenu.style.transform = "none";
    });

    document.getElementById("dev-close").onclick = () => devMenu.remove();
    document.getElementById("dev-test").onclick = () => game.Test();
    document.getElementById("dev-reset").onclick = () => game.Reset();
}
