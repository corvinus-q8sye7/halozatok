window.onload = function () {
   /* letöltés(); */
}

var kérdések;
var kérdésszám;

/*function letöltés() {*/
//fetch('/questions.json')
//    .then(response => response.json())
//    .then(data => letöltésBefejeződött(data)
//);


//fetch('/questions/4')
//    .then(response => response.json())
//    .then(data => console.log(data)
//);

fetch('/questions/1')
    .then(response => response.json())
    .then(data => kérdésMegjelenítés(data)
);

//function letöltésBefejeződött(d) {
   // console.log("Sikeres letöltés")
   // console.log(d)
    //kérdések = d;
    //kérdésMegjelenítés(kérdésszám)
//}

//function kérdésMegjelenítés(kérdés) {
    //document.getElementById("kérdés_szöveg").innerHTML = kérdések[kérdés].questionText;
    //document.getElementById("válasz1").innerHTML = kérdések[kérdés].answer1;
    //document.getElementById("válasz2").innerHTML = kérdések[kérdés].answer2;
    //document.getElementById("válasz3").innerHTML = kérdések[kérdés].answer3;
    //if (kérdések[kérdés].image != "") {
     //   document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
    //}
    //else {
        //document.getElementById("kép1").src = "";
   // }
//}
function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}  
function válaszfeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}



function kérdésMegjelenítés(kérdés) {
    aktKérdés = kérdés;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;

    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;

    }
    else {
        document.getElementById("kép1").src = "";
    }


}
    function Vissza() {
        if (kérdésszám == 0) {
            kérdésszám = kérdések.length - 1;
            kérdésBetöltés(kérdésszám);
            //letöltés();
            Clear()
        }
        else {
            kérdésszám--;
            kérdésBetöltés(kérdésszám);
            //letöltés();
            Clear()
        }
    }
    function Előre() {
        if (kérdésszám = kérdések.length - 1) {
            kérdésszám = 0;
            kérdésBetöltés(kérdésszám);
            //letöltés();
            Clear()
        }
        else {
            kérdésszám++;
            kérdésBetöltés(kérdésszám)
            //letöltés();
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