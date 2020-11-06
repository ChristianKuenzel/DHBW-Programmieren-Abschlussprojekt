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

// Initialize storage files containing user and entries.
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
const readlineSync = require('readline-sync');





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