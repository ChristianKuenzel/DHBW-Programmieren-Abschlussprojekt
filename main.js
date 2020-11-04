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

// Choose User
    // Implement pw ?

// Show start menu.
    // @David

// Menu functions.


// Repeat.




// TESTBEREICH
const testStorage = require("process");
if (testStorage.argv[2] == "-test") {
    console.log(userStorage)
    console.log(entryStorage)

    userStorage.setItem('userStorage', 'myFirstValue');
    console.log(userStorage.getItem('userStorage'));

    entryStorage.setItem('entryStorage', 'myFirstValue');
    console.log(entryStorage.getItem('entryStorage'));
}




// ### End of program. ###