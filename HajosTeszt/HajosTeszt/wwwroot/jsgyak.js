window.onload = function () {

    console.log("kezdés");

    let hova = document.getElementById("ide");

    hova.classList.add("sor");

    for (var s = 0; s < 10; s++) {

        let szám = document.createElement("div");
        szám.classList.add("elem");
        szám.innerText = s;
        szám.style.color = "white";
        szám.style.background = `rgb(0,${255 - s * 20},0)`;
        hova.appendChild(szám);

    }


    //megcsinalom a faktoriálist

    var faktorialis = function (n) {
        let er = 1;
        for (let i = 2; i <= n; i++) {
            er = er * i;

        }
        return er;
    }

    // haromszog létrehozása

    let pharomszog = document.getElementById("Pascal");

    for (var s = 0; s < 10; s++) {

        let sr = document.createElement("div");

        sr.classList.add("sor");

        pharomszog.appendChild(sr);

        for (var oszlop = 0; oszlop <= s; oszlop++) {

            let o = document.createElement("div");

            o.classList.add("elem");

            o.innerText = faktorialis(s) / (faktorialis(oszlop) * faktorialis(s - oszlop));
            o.style.background = "rgb(170,140,101)";
            

            sr.appendChild(o);
        }
    }
}