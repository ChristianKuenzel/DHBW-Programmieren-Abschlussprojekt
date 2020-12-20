/*
Copyright 2020
DHBW Lörrach, Programmieren Abschlussprojekt: Hauswirtschaftsprogramm
David Schüler, Matr.Nr.: ?, <david.schueler97@gmail.com>, https://github.com/AranguZ
Christian Künzel, Matr.Nr.: 3889521, <kunibertgames@web.de>, https://github.com/ChristianKuenzel

Content undergoes the terms of chosen licenses. See GitHub for more:
https://github.com/ChristianKuenzel/DHBW-Programmieren-Abschlussprojekt

Main File

1) Const variables
2) Functions
3) End of Program

*/
// ________________________________________________________________________________
// Importing all structures as modules.
const struct = require('./structures');

// Initialize storage files containing user and entries.
struct.userStorage = struct.initStorage()[0];
struct.entryStorage = struct.initStorage()[1];
struct.incomeStorage = struct.initStorage()[2];

// Reading command line arguments. Initialize test mode for examination.
if (struct.readCLA() === true) {
    // Run test function. Test some basic functions. Initialize values / user / entries.
    struct.testMode(100);
} else {
    // Start main profile menu.
    struct.profileMenuOptions();
}

// Update contribution storage by adding monthly contributions.
struct.updateContributionList();

// After update: Set profile login time to lastOnline.
struct.setLastOnline();

// Start main navigation menu.
struct.mainMenuOptions();

// Save profile changes.
struct.setProfile();

// Close application.
process.exit();

// ### End of program. ###