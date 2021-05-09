var hotlist = [];    // kerdesek listaja (ez array lesz)
var questionInHotList = 3;  // mennyi kerdes
var displayQuestion;     // ez a kerdes van eppen
var numberofQuestions;   // kerdesek szama
var nextQuestion = 1;    //  kovetkezo kerdes
var timerHandler;

document.addEventListener("DOMContentLoaded", () => {

    for (let i = 0; i < questionInHotList; i++) {
        hotlist[i] = {
            question: {},
            goodA: 0
        }
    }




    // kerdesek szama

    fetch("/questions/counnt")
        .then(result => result.text())
        .then(n => { numberofQuestions = parseInt(n) })

    // elore/hatra 

    document.getElementById("gomb elore").addEventListener("click", elore);
    document.getElementById("gomb vissza").addEventListener("click", vissza);

    // mnetett allapot

    if (localStorage.getItem("hotList")) {
        hotlist = JSON.parse(localStorage.getItem("hotlist"));
    }

    if (localStorage.getItem("displayQuestion")) {
        displayQuestion = parseInt(localStorage.getItem("displayQuestion"))

    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"))

    }
    if (hotlist.length === 0) {
        for (let i = 0; i < questionInHotList; i++) {   // kezdo kerdesek
            kerdesbe(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        kerdesmegjelen();
    }


});

function kerdesbe(questionNum, destination) {
    fetch('/questions/${questionNum}')
        .then(result => {
            if (!result.ok) {
                console.error('Hibas letoltes: $(result.status)');
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotlist[destination].question = q;
            hotlist[destination].goodA = 0;
            console.log('A $(questionNum}. kerdes letoltesre kerult a hotlist ${destination}. helyére')
            if (displayQuestion === undefined && destination === 0) {

                displayQuestion = 0;
                kerdesmegjelen();

            };
        })

}

function kerdesmegjelen() {

    let kerdes = hotlist[displayQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kerdes.questionText;
    document.getElementById("válasz1").innerText = kerdes.answer1;
    document.getElementById("válasz1").innerText = kerdes.answer2;
    document.getElementById("válasz1").innerText = kerdes.answer3;

    if (kerdes.image) {

        document.getElementById("kép").src = kerdes.image;
        document.getElementById("kép").style.display = "block";

    }
    else {
        document.getElementById("kép").style.display = "none";
    }

    for (var i = 1; i < 3; i++) {

        document.getElementById("válasz1" + n).classList.remove("jo", "rossz")
        document.getElementById("valaszok").style.pointerEvents = "auto";
    }

}

function elore() {
    clearTimeout(timerHandler)
    displayQuestion++;
    if (displayQuestion === questionInHotList) displayQuestion = 0;
    kerdesmegjelen();


}

function vissza() {
    displayQuestion--;
    if (displayQuestion < 0) displayQuestion = questionInHotList - 1;
    kerdesmegjelen();
}

function valasztas(n) {
    let kerdes = hotlist[displayQuestion].question;
    if (n === kerdes.correctAnswer) {
        document.getElementById("válasz1" + n).classList.add("jo")
        hotlist[displayQuestion].goodA++;
        if (hotlist[displayQuestion].goodA === 3) {
            kerdesbe(nextQuestion, displayQuestion);
            nextQuestion++;
            //todo: kereslista vege
        }
    }
    else {
        document.getElementById("válasz1" + n).classList.add("rossz")
        document.getElementById("válasz1" + kerdes.correctAnswer).classList.add("jo")
        hotlist[displayQuestion].goodA = 0;
    }

    document.getElementById("valaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(elore, 300);

    localStorage.setItem("hotList", JSON.stringify(hotlist));
    localStorage.setItem("displayQuestion", displayQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
} 

   