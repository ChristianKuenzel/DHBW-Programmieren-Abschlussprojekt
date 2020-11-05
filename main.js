/*

Copyright 2020
DHBW Lörrach, Programmieren Abschlussprojekt: Hauswirtschaftsprogramm
David Schüler <david.schueler97@gmail.com> & Christian Künzel <kunibertgames@web.de>
Matr.Nr.: & Matr.Nr.: 3889521

Main Datei

*/
// ________________________________________________________________________________
// Importing all structures as modules.
const struct = require('./structures');

// Initialize storage containing user and entries.
userStorage = struct.initStorage[0];
entryStorage = struct.initStorage[1];

// Reading command line arguments; Initialize test mode for examination.
let _ = struct.readCLA;





// Introduction
console.log("------------------------------------------------------------" +
    "----------"); // 60 + 10 "-"
console.log("Welcome to your budget software to manage your households finances!");
console.log("------------------------------------------------------------" +
    "----------"); // 60 + 10 "-"

// Choose User
const prompt = require('prompt');
prompt.start();

var controller = new Boolean("true");

while (controller == true) {
    var inputNumber

    console.log("Please choose one of the following by entering its number:");
    console.log("1 - Create a new profil.");
    console.log("2 - Choose an already existing profil.");
    console.log("");
    console.log("Input:");

    prompt.get(['input'], function (err, result) {
        inputNumber = parseInt(result.input);
        console.log(inputNumber);

        // if ()
    });
}


// Text
// User Input
// Validate Input
// if x -> repeat; y -> continue
// !Safe input!

// var = storage
// while
//// Text
//// User Input
//// if Input
//// x -> repeat
//// y -> var = input; break




// Show start menu.
    // @David

// Menu functions.


// Repeat.




// TESTBEREICH
const testStorage = require("process");
if (testStorage.argv[2] == '-test') {
    console.log(userStorage);
    console.log(entryStorage);

    userStorage.setItem('userStorage', 'myFirstValue');
    console.log(userStorage.getItem('userStorage'));

    entryStorage.setItem('entryStorage', 'myFirstValue');
    console.log(entryStorage.getItem('entryStorage'));
}




// ### End of program. ###