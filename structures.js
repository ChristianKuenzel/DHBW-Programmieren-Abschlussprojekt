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
    const process = require("process")
    let cmdLineArgument = process.argv

    // Check if argument number is correct && if test mode is used.
    if (cmdLineArgument.length == 3) {
        if (cmdLineArgument[2] == '-test') {
            console.log("Read CLA -test: OK");
            testMode();
        } else {
            console.log("Error: cmdLineArg != -test")
        }
    } else if (cmdLineArgument.length > 3 || cmdLineArgument.length < 2) {
        console.log("Error: cmdLineArgument > 3 || < 2")
    } else {
        console.log("ReadCLA: OK")
    }
    console.log(cmdLineArgument)
    console.log("readCLA: FINISH")
}

// Test function. Inserting given values for examination.
function testMode () {
    console.log("TestMode: EMPTY")
}

// Exporting all functions as modules.
module.exports = {readCLA}