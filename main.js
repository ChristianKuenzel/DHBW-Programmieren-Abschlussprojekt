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
struct.userStorage = struct.initStorage()[0];
struct.entryStorage = struct.initStorage()[1];

// Reading command line arguments; Initialize test mode for examination.
struct.readCLA();

// Check and validate profile menu option. Return given input.
struct.profileMenuOptions();

// Menu functions.
struct.mainMenuOptions();

// ### End of program. ###


// ________________________________________________________________________________
// TESTBEREICH // Aus Local.Storage: getItem & setItem
const testStorage = require("process");
if (testStorage.argv[2] == '-test') {
    console.log(struct.userStorage);
    console.log(struct.entryStorage);

    struct.userStorage.setItem('userStorage', 'myFirstValue');
    console.log(struct.userStorage.getItem('userStorage'));

    struct.entryStorage.setItem('entryStorage', 'myFirstValue');
    console.log(struct.entryStorage.getItem('entryStorage'));
}