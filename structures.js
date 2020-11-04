/*

Copyright 2020
DHBW Lörrach, Programmieren Abschlussprojekt: Hauswirtschaftsprogramm
David Schüler <david.schueler97@gmail.com> & Christian Künzel <kunibertgames@web.de>
Matr.Nr.: & Matr.Nr.: 3889521

Struktur Datei

1) const var
2) var
3) objects
4) functions

*/
// ________________________________________________________________________________
// Listing of all existing const variables.

// ________________________________________________________________________________
// Listing of all existing variables.

// ________________________________________________________________________________
// Listing of all existing objects.

// ________________________________________________________________________________
// Listing of all existing functions.
// Reading command line arguments to secure program execution and check for -test mode.
function readCLA () {
    // Get commandLineArguments
    const process = require("process");
    let cmdLineArgument = process.argv;

    // Check if argument number is correct && if test mode is used.
    if (cmdLineArgument.length == 3) {
        if (cmdLineArgument[2] == '-test') {
            console.log("Read CLA -test: OK");
            testMode();
        } else {
            console.log("Error: cmdLineArg != -test");
        }
    } else if (cmdLineArgument.length > 3 || cmdLineArgument.length < 2) {
        console.log("Error: cmdLineArgument > 3 || < 2");
    } else {
        console.log("ReadCLA: OK");
    }

    if (cmdLineArgument[2] == '-test') {
        console.log(cmdLineArgument);
    }
    console.log("readCLA: FINISH");
}

// Test function. Inserting given values for examination.
function testMode () {
    console.log("TestMode: EMPTY");
}

// Intialize storage containing user and entries.
// Check if files already exist, otherwise create them.
function initStorage () {
    // Import module node-localstorage for creating storage files.
    const LocalStorage = require('node-localstorage').LocalStorage;

    // Check if file already exists, otherwise create one.
    if (typeof userStorage === "undefined" || userStorage === null) {
        var userStorage = new LocalStorage('./userStorage');
    }
    console.log("initStorage check uStorage: OK");

    // Check if file already exists, otherwise create one.
    if (typeof entryStorage === "undefined" || entryStorage === null) {
        var entryStorage = new LocalStorage('./entryStorage');
    }
    console.log("initStorage check eStorage: OK");
    console.log("initStorage: FINISH");
    return [userStorage, entryStorage];
}

// Exporting all functions as modules.
module.exports = {
    readCLA: readCLA(),
    initStorage: initStorage(),
}

