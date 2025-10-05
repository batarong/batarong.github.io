let batarongs = Number(localStorage.getItem("batarongs")) || 0;
let increment = Number(localStorage.getItem("increment")) || 1;
let ytbought = Number(localStorage.getItem("ytbought")) || 0;
let bataytCost = Number(localStorage.getItem("bataytCost")) || 10; // Add this line

document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
document.getElementById("bycount").textContent = ytbought; // Show ytbought
document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`; // Update cost display

document.getElementById("batarongbut").onclick = function() {
    batarongs = batarongs + increment;
    document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
    localStorage.setItem("batarongs", batarongs);
}

document.getElementById("bataytclick").onclick = function() {
    if (batarongs >= bataytCost) {
        batarongs = batarongs - bataytCost;
        increment = increment + 1;
        ytbought = ytbought + 1;
        bataytCost = Math.ceil(bataytCost * 1.2); // Increase cost by 20%
        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("increment", increment);
        localStorage.setItem("ytbought", ytbought);
        localStorage.setItem("bataytCost", bataytCost); // Save new cost
        document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
        document.getElementById("bycount").textContent = ytbought; // Show ytbought
        document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`; // Update cost display
    } else {
        console.log("not enough");
    }
}

// Also update the cost display on page load and reset:
document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`;

window.game = {
    Reset: function() {
        batarongs = 0;
        increment = 1;
        ytbought = 0;
        bataytCost = 10; // Reset cost
        localStorage.setItem("batarongs", batarongs);
        localStorage.setItem("increment", increment);
        localStorage.setItem("ytbought", ytbought);
        localStorage.setItem("bataytCost", bataytCost);
        document.getElementById("batarongsclicked").textContent = "Batarongs: " + batarongs;
        document.getElementById("bycount").textContent = ytbought; // Show ytbought
        document.getElementById("bytcost").innerHTML = `Cost: ${bataytCost} Batarongs.<br>Doubles click production`; // Update cost display
    }
};

