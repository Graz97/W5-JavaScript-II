let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
let arrayComparison = [];
var iconsFind = [];
document.body.onload = startGame();

function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
var interval;

function startTimer() {
    var s = 0,
        m = 0,
        h = 0,
        hc = 0;
    interval = setInterval(function() {
        timer.innerHTML = 'Tempo: ' + m + " min " + s + " sec";
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }
        if (m == 60) {
            h++;
            m = 0;
            hc = 1;
        }
        if (hc == 1) {
            timer.innerHTML = 'Tempo: ' + m + " ore " + +m + " min " + s + " sec";
        }
    }, 1000);
}

function startGame() {
    var arrayShuffle = shuffle(arrayAnimali);
    var lista = document.getElementById('griglia');
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.firstChild);
    }
    for (var i = 0; i < 24; i++) {
        var cont = document.createElement('div');
        var fig = document.createElement('div');
        fig.className = 'icon';
        document.getElementById('griglia').appendChild(cont).appendChild(fig);
        fig.innerHTML = arrayShuffle[i];
    }
    startTimer();
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", displayIcon);
    }
}

function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    this.classList.add("show", "disabled");
    this.classList.remove("icon");
    arrayComparison.push(this);
    var len = arrayComparison.length;
    if (len === 2) {
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            iconsFind.push(arrayComparison[0]);
            iconsFind.push(arrayComparison[1]);
            arrayComparison = [];
            if (iconsFind.length == 24) {
                openModal();
            }
        } else {
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            setTimeout(function() {
                arrayComparison[0].classList.remove("show", "disabled");
                arrayComparison[1].classList.remove("show", "disabled");
                arrayComparison[0].classList.add("icon");
                arrayComparison[1].classList.add("icon");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

var modal = document.getElementById("modal");
var timer = document.querySelector(".timer");

function openModal() {
    clearInterval(interval);
    modal.classList.add("active");
    document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
}

function playAgain() {
    modal.classList.remove("active");
    startGame();
}