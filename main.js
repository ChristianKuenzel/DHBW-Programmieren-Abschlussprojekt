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
var userStorage = struct.initStorage()[0];
var entryStorage = struct.initStorage()[1];

// Reading command line arguments; Initialize test mode for examination.
struct.readCLA();

// Check and validate profile menu option. Return given input.
var activeProfile = struct.profileMenuOptions(userStorage);

console.log("Test activeProfile"); // Delete later
console.log(activeProfile);

struct.mainMenuOptions();

// Show entry start menu.
    // @David
    // activeProfil = Ausgewähltes Profil des Nutzers
    // Noch unklar wie es zu verwerten ist.
    // Müsste: entryStorage -> storage; activeProfile -> key; entry -> value;

// Menu functions.


// Repeat.




// TESTBEREICH // Aus Local.Storage: getItem & setItem
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