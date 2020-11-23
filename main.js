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
if (struct.readCLA() === true) {
    struct.testMode(1000);
    struct.mainMenuOptions();
    process.exit();
}

// Check and validate profile menu option. Return given input.
struct.profileMenuOptions();

// Menu main functions.
struct.mainMenuOptions();

// ### End of program. ###