window.onload = function () {
    letöltés();
}

var kérdések;
var kérdésszám;

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        )
};

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(kérdésszám)
}

function kérdésMegjelenítés(kérdés) {
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kérdés].questionText;
    document.getElementById("válasz1").innerHTML = kérdések[kérdés].answer1;
    document.getElementById("válasz2").innerHTML = kérdések[kérdés].answer2;
    document.getElementById("válasz3").innerHTML = kérdések[kérdés].answer3;
    if (kérdések[kérdés].image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
    }
    else {
        document.getElementById("kép1").src = "";
    }
}
function Vissza() {
    if (kérdésszám == 0) {
        kérdésszám = kérdések.length - 1;
        letöltés();
        Clear()
    }
    else {
        kérdésszám--;
        letöltés();
        Clear()
    }
}
function Előre() {
    if (kérdésszám = kérdések.length - 1) {
        kérdésszám = 0;
        letöltés();
        Clear()
    }
    else {
        kérdésszám++;
        letöltés();
        Clear()
    }
}
function Válasz(n) {
    if (n == kérdések[kérdésszám].correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó");
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
    }
}
function Clear() {
    document.getElementById("válasz1").classList.remove("rossz");
    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("rossz");
    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("rossz");
    document.getElementById("válasz3").classList.remove("jó");
}
function elsőv() {
    Válasz(1);
}
function másodikv() {
    Válasz(2);
}
function harmadikv() {
    Válasz(3);
}