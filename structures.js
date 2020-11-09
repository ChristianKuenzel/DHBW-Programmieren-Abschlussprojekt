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
const { get } = require('prompt');

// ________________________________________________________________________________
// Listing of all variables.

// ________________________________________________________________________________
// Listing of all objects.
var entry = {
    date: NaN,
    category: NaN,
    amount: NaN
}

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

// declare userStorage as variable
let userStorage;

// Intialize storage containing user and entries.
// Check if storage files already exist, otherwise create them.
function initStorage () {
    // Check if storage file already exists, otherwise create one.
    if (typeof userStorage === "undefined" || userStorage === null) {
        // mit var ist userStorage nur in dieser Funktion bekannt
        // var userStorage = new LocalStorage('./userStorage');
        // so wird die Variable oben initialisiert und kann unten exportiert werden
        userStorage = new LocalStorage('./userStorage');
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
function profileMenuOptions (userStorage) {
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
        input = parseInt(input);

        // Layout
        console.log("------------------------------------------------------------" +
            "----------"); // 60 + 10 "-"

        // Evaluate user input.
        switch (input) {
            // Chose given profile.
            case 1:
                //activeProfile = chooseProfile(userStorage);userStorage //break
                return chooseProfile(userStorage);

            // Create a new user profile.userStorage
            case 2:
                createNewProfile();
                break

            // Leave.
            case 3:
                process.exit();
                break // -> Ignore IDEA warning

            // User input is not valid.
            case NaN:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break

            // Error.
            default:
                console.log("Error: Wrong value -> profileMenuInput");
                break
        }
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
// Start menu functions and entry based functions.
function mainMenuOptions(entryStorage, activeProfile) {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Main menu: What is you next task ?");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"

    // Repeat main menu until user leaves the program.
    while (true) {
        console.log("[1] - Entry management");
        console.log("[2] - Income management");
        console.log("[3] - Outcome management");
        console.log("[4] - Accounting");
        console.log("[5] - Creditability");
        console.log("[6] - Solvency");
        console.log("[7] - Leave");
        console.log("");

        // User input
        var input = readlineSync.prompt();
        input = parseInt(input);

        // Run function user chose.
        switch (input) {
            case 1:
                entryManagement(entryStorage, activeProfile);
                break
            case 2:
                incomeManagement();
                break
            case 3:
                outcomeManagement();
                break
            case 4:
                accounting();
                break
            case 5:
                creditability();
                break
            case 6:
                solvency();
                break
            case 7:
                process.exit();
                break // -> Ignore IDEA warning
            case NaN:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
            default:
                console.log("Error: Wrong value -> mainMenuOptions");
                break
        }
    }
}

// ________________________________________________________________________________
// Entry management: Add, show, search, delete entry or leave.
function entryManagement(entryStorage, activeProfile) {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Entry Management: Choose your task!");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"

    // Run until user wants back or leave.
    while(true) {
        // Print user Interface.
        console.log("[1] - Add entries.");
        console.log("[2] - Show all entries.");
        console.log("[3] - Search for a specific entry.");
        console.log("[4] - Delete a specific entry.");
        console.log("[5] - Back.");
        console.log("[6] - Leave.");
        console.log("");

        // Read user input.
        var input = readlineSync.prompt();
        input = parseInt(input);
        console.log("");

        // Evaluate user input.
        switch (input) {
            // Add entries.
            case 1:
                addEntries(entryStorage, activeProfile);
                break
            // Show all entries.
            case 2:
                showEntries(entryStorage);
                break
            // Search an entry.
            case 3:
                searchEntry(entryStorage);
                break
            // Delete an entry.
            case 4:
                deleteEntry(entryStorage);
                break
            // Back to main menu.
            case 5:
                break
            // Leave.
            case 6:
                process.exit();
                break // -> Ignore IDEA warning
            // Wrong input.
            case NaN:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
            // Error.
            default:
                console.log("Error: Wrong input -> entrymanagement");
                break
        }

        // Go back to main menu.
        if (input === 5) {
            break
        }
    }
}

// Add entries.
function addEntries(entryStorage, activeProfile) {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Task: Adding entry");

    // Repeat till "OK" / "DONE"
    while (true) {
        console.log("------------------------------------------------------------" +
            "----------"); // 60 + 10 "-"
        console.log("Please consider the following scheme: ");
        console.log("Date: year + month + day; Category: category; Money: 123,45€");
        console.log("DONE / BACK: Enter '!'.");
        console.log("");

        var date = readlineSync.question("Date: ");
        if (date === "!") {
            break
        }

        var category = readlineSync.question("Category: ");
        if (category === "!") {
            break
        }

        var money = readlineSync.question("Money: ");
        if (money === "!") {
            break
        }

        // money -> float ???

        // Evaluate Input.
        // date = int; category = string; money = int;
        // Add input.
        if (isNaN(parseInt(date)) === false && isNaN(parseInt(category)) === true
            && isNaN(parseInt(money)) === false && date.length === 8) {

            // Check if there is a number.
            if (money.length <= 0) {
                money = 0;
            }

            // Add object entry to storage
            let insertEntry = entry;
            insertEntry = {date: date, category: category, money:money};
            console.log("");
            console.log("Your entry", insertEntry, "got integrated!");
            console.log("");
            setValue(entryStorage, activeProfile, insertEntry); // Change obj to string.

        // Don't add
        } else {
            console.log("");
            console.log("Input not valid!");
            console.log("Your input: " + date + " " + category + " " + money);
            console.log("");
        }
    }
}

// Show all entries.
function showEntries(entryStorage) {

}

// Search a specific entry.
function searchEntry(entryStorage) {

}

// Delete an entry.
function deleteEntry(entryStorage) {

}

// ________________________________________________________________________________
// Income management:
function incomeManagement() {

}

// ________________________________________________________________________________
// Outcome management:
function outcomeManagement() {

}

// ________________________________________________________________________________
// Accounting:
function accounting() {

}

// ________________________________________________________________________________
// Creditability
function creditability() {

}

// ________________________________________________________________________________
// Solvency
function solvency() {

}









// ________________________________________________________________________________
// Exporting all functions as modules.
module.exports = {
    readCLA: readCLA,
    initStorage: initStorage,
    profileMenuOptions: profileMenuOptions,
    mainMenuOptions: mainMenuOptions,
    userStorage: userStorage,
}
