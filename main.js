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

// Check and validate profile menu option. Return given input.struct.
var activeProfile = struct.profileMenuOptions(userStorage);

// Menu functions.
struct.mainMenuOptions(entryStorage, activeProfile);

    // activeProfil = Ausgewähltes Profil des Nutzers
    // Noch unklar wie es zu verwerten ist.
    // Müsste: entryStorage -> storage; activeProfile -> key; entry -> value;

/*
@David :

Du kannst einfach die unter menus erstellen und/oder deren Funktionalität.
Schau die dir Funktion mainMenuOptions an.
Die startet die entsprechenden Funktionen, die sind allerdings noch leer.
EntryManagement: Hier soll der Benutzer alle Funktionen für Einträge auswählen
können. Die anderen Funktionen äquivlent/analog.


*/


// TESTBEREICH // Aus Local.Storage: getItem & setItem
const testStorage = require("process");
if (testStorage.argv[2] == '-test') {
    console.log(userStorage);
    console.log(userStorage);

    userStorage.setItem('userStorage', 'myFirstValue');
    console.log(userStorage.getItem('userStorage'));

    entryStorage.setItem('entryStorage', 'myFirstValue');
    console.log(entryStorage.getItem('entryStorage'));
}

// ### End of program. ###