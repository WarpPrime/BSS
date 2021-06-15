window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

var Player = {
    field: "sunflower",
    coords: [0,0],
    bees: {},
    tool: "scooper",
    pollen: 0,
    honey: 0,
    storage: 250,
}

var tools = {
    scooper: {
        collects: [[0,0],[0,1]],
        pollen: 2,
        speed: 800,
        ability: null,
        cost: 0
    },
}

var fields = {
    sunflower: {
        color: "white",
        zone: 0,
        mobs: {},
        width: 20,
        height: 33,
        flowers: {
            single: {
                white: 0.65,
                red: 0.13,
                blue: 0.14
            },
            double: {
                white: 0.06,
                red: 0.01,
                blue: 0.01
            },
            triple: {
                white: 0,
                red: 0,
                blue: 0
            },
            big: {
                white: 0,
                red: 0,
                blue: 0
            },
            star: {
                white: 0,
                red: 0,
                blue: 0
            },
        },
    },
}

var LastMined = 0;

function init() {
    updatePollenBar();
    var a="";
    var b, img, field, pollenLevel;
    field="sunflower";
    for (i=0; i<fields[field].height; i++) {
        a += `<tr style="padding: 0px;">`;
        for (j=0; j<fields[field].width; j++) {
            b = Math.random();
            if (b < fields[field].flowers.single.white) {img = "white-single";}
            else if (b >= fields[field].flowers.single.white && b < fields[field].flowers.single.white+fields[field].flowers.single.red) {img = "red-single";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue) {img = "blue-single";}
            
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white) {img = "white-double";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red) {img = "red-double";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue) {img = "blue-double";}

            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white) {img = "white-triple";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red) {img = "red-triple";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue) {img = "blue-triple";}

            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white) {img = "white-big";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red) {img = "red-big";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red+fields[field].flowers.big.blue) {img = "blue-big";}

            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red+fields[field].flowers.big.blue && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red+fields[field].flowers.big.blue+fields[field].flowers.star.white) {img = "white-star";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red+fields[field].flowers.big.blue+fields[field].flowers.star.white && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red+fields[field].flowers.big.blue+fields[field].flowers.star.white+fields[field].flowers.star.red) {img = "red-star";}
            else if (b >= fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red+fields[field].flowers.big.blue+fields[field].flowers.star.white+fields[field].flowers.star.red && b < fields[field].flowers.single.white+fields[field].flowers.single.red+fields[field].flowers.single.blue+fields[field].flowers.double.white+fields[field].flowers.double.red+fields[field].flowers.double.blue+fields[field].flowers.triple.white+fields[field].flowers.triple.red+fields[field].flowers.triple.blue+fields[field].flowers.big.white+fields[field].flowers.big.red+fields[field].flowers.big.blue+fields[field].flowers.star.white+fields[field].flowers.star.red+fields[field].flowers.star.blue) {img = "blue-star";}

            if (img.includes("single")) {pollenLevel = 15;}
            else if (img.includes("double")) {pollenLevel = 30;}
            else if (img.includes("triple")) {pollenLevel = 60;}
            else if (img.includes("big")) {pollenLevel = 75;}
            else if (img.includes("star")) {pollenLevel = 90;}


            a += `<td id="${i}-${j}" style="padding: 0px; z-index: 0">
            <img src="icons/flower-bg.png" width=50 style="opacity: 1; padding: 0px;">
            <img data-pollen-level=${pollenLevel} data-max-pollen=${pollenLevel} data-flower-type="${img}" id="${i}-${j}-flower" src="icons/${img}.png" width=50 style="opacity: 1; padding: 0px; margin: -25px; position: relative; z-index: 999; top: -25; left: -30;"></td>`;
        }
        a += `</tr>`;
        document.getElementById("field").innerHTML += a;
        a = "";
    }
    document.getElementById(`${Player.coords[0]}-${Player.coords[1]}`).innerHTML += 
    `<img class="player" style="margin: -25px; position: relative; z-index: 999; top: -25; left: -30;" src="icons/player-nobg.png"></img>`
}

document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowLeft": // left arrow
            if (Player.coords[1] > 0) {
                Player.coords[1] -= 1;
                updatePlayerPos();
            }
            break;
        case "ArrowUp": // up arrow;
            if (Player.coords[0] > 0) {
                Player.coords[0] -= 1;
                updatePlayerPos();
            }
            break;
        case "ArrowRight": // right arrow
            if (Player.coords[1] < fields[Player.field].width-1) {
                Player.coords[1] += 1;
                updatePlayerPos();
            }
            break;
        case "ArrowDown": // down arrow
            if (Player.coords[0] < fields[Player.field].height-1) {
                Player.coords[0] += 1;
                updatePlayerPos();
            }
            break;
        case " ":
            if (Date.now() - LastMined > tools[Player.tool].speed) {
                for (i in tools[Player.tool].collects) {
                    if (Number(document.getElementById(`${Player.coords[0]+tools[Player.tool].collects[i][0]}-${Player.coords[1]+tools[Player.tool].collects[i][1]}-flower`).dataset.pollenLevel > 0)) {
                        document.getElementById(`${Player.coords[0]+tools[Player.tool].collects[i][0]}-${Player.coords[1]+tools[Player.tool].collects[i][1]}-flower`).style.opacity -= tools[Player.tool].pollen/Number(document.getElementById(`${Player.coords[0]+tools[Player.tool].collects[i][0]}-${Player.coords[1]+tools[Player.tool].collects[i][1]}-flower`).dataset.maxPollen);

                        document.getElementById(`${Player.coords[0]+tools[Player.tool].collects[i][0]}-${Player.coords[1]+tools[Player.tool].collects[i][1]}-flower`).dataset.pollenLevel=
                        Number(document.getElementById(`${Player.coords[0]+tools[Player.tool].collects[i][0]}-${Player.coords[1]+tools[Player.tool].collects[i][1]}-flower`).dataset.pollenLevel)-tools[Player.tool].pollen;

                        Player.pollen += tools[Player.tool].pollen;

                        if (Number(document.getElementById(`${Player.coords[0]+tools[Player.tool].collects[i][0]}-${Player.coords[1]+tools[Player.tool].collects[i][1]}-flower`).dataset.pollenLevel < 0)) {
                            document.getElementById(`${Player.coords[0]+tools[Player.tool].collects[i][0]}-${Player.coords[1]+tools[Player.tool].collects[i][1]}-flower`).dataset.pollenLevel=0;
                            document.getElementById(`${Player.coords[0]+tools[Player.tool].collects[i][0]}-${Player.coords[1]+tools[Player.tool].collects[i][1]}-flower`).style.opacity = 0;
                        }
                    }
                }
                updatePollenBar();
                LastMined = Date.now();
            }
            break;
    }
};

function updatePlayerPos() {
    document.getElementsByClassName("player")[0].remove();
    document.getElementById(`${Player.coords[0]}-${Player.coords[1]}`).innerHTML += 
    `<img class="player" style="margin: -25px; position: relative; z-index: 999; top: -25; left: -30;" src="icons/player-nobg.png"></img>`
}

function updatePollenBar() {
    var a = document.getElementById("pollenSlider");
    if (Player.pollen >= Player.storage) {
        Player.pollen = Player.storage;
    }
    a.style.width = (100*Player.pollen / Player.storage) + "%";
    a.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;${Player.pollen}/${Player.storage}`;
}

function restoreFlowers() {
    var a;
    var field=Player.field;
    for (i=0; i<fields[field].height; i++) {
        for (j=0; j<fields[field].width; j++) {
            a = document.getElementById(`${i}-${j}-flower`);
            a.dataset.pollenLevel += a.dataset.maxPollen / 5;
            a.style.opacity += 0.2;
            if (a.dataset.pollenLevel >= a.dataset.maxPollen) {
                a.dataset.pollenLevel = a.dataset.maxPollen;
                a.style.opacity = 1;
            }
        }
    }
}

var intervals = [setInterval(restoreFlowers, 5000)];