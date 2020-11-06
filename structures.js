/*

Copyright 2020
DHBW Lörrach, Programmieren Abschlussprojekt: Hauswirtschaftsprogramm
David Schüler <david.schueler97@gmail.com> & Christian Künzel <kunibertgames@web.de>
Matr.Nr.: & Matr.Nr.: 3889521

Struktur Datei

1) const variables
2) variables
3) objects
4) functions
5) exports

*/
// ________________________________________________________________________________
// Listing of all const variables.
const process = require("process");
const LocalStorage = require('node-localstorage').LocalStorage;
const readlineSync = require('readline-sync');

// ________________________________________________________________________________
// Listing of all variables.
// activeProfile
// module.exports.activeProfile = activeProfile

// ________________________________________________________________________________
// Listing of all objects.

// ________________________________________________________________________________
// Listing of all functions.
// Reading command line arguments to secure program execution and check for -test mode.
function readCLA () {
    // Get commandLineArguments
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
// Check if storage files already exist, otherwise create them.
function initStorage () {
    // Check if storage file already exists, otherwise create one.
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

// ________________________________________________________________________________
// Check and validate profile menu option.
function profileMenuOption () {
    // Layout + Introduction
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Welcome to your budget software to manage your households finances!");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"

    // User information
    console.log("Please enter one of the following tasks by " +
        "entering its number.");

    // Check until input is correct!
    while (true) {
        // Print menu options
        console.log("[1] - Choose an already existing profile.");
        console.log("[2] - Create a new profile.");
        console.log("[3] - Leave.");
        console.log(""); // Empty line

        // Read user input
        //var input = readlineSync.keyIn("Input: ");
        var input = readlineSync.prompt();

        // Check which option was chosen. Move on, leave or repeat.
        if (input == "1" || input == "2") {
            return parseInt(input);

        } else if (input == "3") {
            process.exit();

        } else {
            console.log("Input not valid! Only numbers allowed!");
            console.log("Your Input: " + input);
        }
    }
}

// Evaluate user input und run function.
function profileMenuFunctions (profileMenuInput, userStorage) {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"

    // Evaluate user input.
    switch (profileMenuInput) {
        // Chose given profile.
        case 1:
            //activeProfile = chooseProfile(userStorage);
            //break
            return chooseProfile(userStorage);

        // Create a new user profile.
        case 2:
            createNewProfile(userStorage);
            break

        // Error.
        default:
            console.log("Error: Wrong value -> profileMenuInput");
            break
    }
}

// Choose an already existing profile.
function chooseProfile(userStorage) {
    console.log("Choose one of the following profiles:");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"

    // Show all existing profiles
    for (let i = 0; i < userStorage.length; i++) {
        console.log(getValue(userStorage, userStorage.key(i)));
    }
    console.log("");

    // Chose an existing profile. Else try again.
    while (true) {
        let userName = readlineSync.question("Your profile: ");
        if (getValue(userStorage, userName) == userName) {
            console.log("");
            console.log("You have chosen " + userName + "s profile!");
            return userName
            //break
        } else {
            console.log("Your input: " + userName);
            console.log("");
            console.log("This user doesnt exist!");
            console.log("");
        }
    }
}

// Create a new user profile.
function createNewProfile (userStorage) {
    console.log("Creating a new profile:");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    while (true) {
        // User enters userName.
        let userName = readlineSync.question('New username: ');

        // Check if userProfile already exists.
        if (getValue(userStorage, userName) == userName) {
            console.log("Your Input: " + userName);
            console.log("");
            console.log("Userprofile already exists! Please try another one ...");
            console.log("");

            // If userProfile doesnt exist. Create a new one.
        } else {
            // Profile:Key -> userName; Value -> userName;
            setValue(userStorage, userName, userName);
            console.log("Your username: " + userName);
            console.log("");
            console.log("Userprofile successfully created!");
            console.log("");
            break
        }
    }
}

// Get the chosen profile/entry to work with.
function getValue (storage, key) {
    return storage.getItem(key)
}

// Create a new profile/entry to work with.
function setValue (storage, key, value) {
    storage.setItem(key, value);
}

// ________________________________________________________________________________
// Entry Menu
// ...











// ________________________________________________________________________________
// Exporting all functions as modules.
module.exports = {
    readCLA: readCLA,
    initStorage: initStorage,
    profileMenuOption: profileMenuOption,
    profileMenuFunctions: profileMenuFunctions,
}