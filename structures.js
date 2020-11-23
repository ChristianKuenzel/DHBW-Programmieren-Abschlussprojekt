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
let userStorage;
let entryStorage;

let activeProfile;
        // activeProfil = Ausgewähltes Profil des Nutzers
        // Müsste: entryStorage -> storage; activeProfile -> key; entry -> value;

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
            process.exit();
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

// Initialize storage containing user and entries.
// Check if storage files already exist, otherwise create them.
function initStorage () {
    // Check if storage file already exists, otherwise create one.
    if (typeof userStorage === "undefined" || userStorage === null) {
        userStorage = new LocalStorage('./userStorage');
    }

    console.log("initStorage check uStorage: OK");

    // Check if file already exists, otherwise create one.
    if (typeof entryStorage === "undefined" || entryStorage === null) {
        entryStorage = new LocalStorage('./entryStorage');
    }
    console.log("initStorage check eStorage: OK");
    console.log("initStorage: FINISH");
    return [userStorage, entryStorage];
}

// ________________________________________________________________________________
// Check and validate profile menu option.
function profileMenuOptions () {
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
        var input = readlineSync.prompt();

        // Layout
        console.log("------------------------------------------------------------" +
            "----------"); // 60 + 10 "-"

        // Evaluate user input.
        switch (input) {
            // Chose given profile.
            case "1":
                chooseProfile();
                break
            // Create a new user profile.
            case "2":
                createNewProfile();
                break
            // Leave.
            case "3":
                process.exit();
                break // -> Ignore IDEA warning
            // User input is not valid.
            default:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
        }

        // Continue in program, if at least one profile exists and had been chosen.
        if (activeProfile !== undefined) {
            break
        }
    }
}

// Choose an already existing profile.
function chooseProfile() {
    console.log("Choose one of the following profiles:");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"

    // Check if at least one profile exists.
    if (userStorage.length === 0) {
        console.log("No profiles available. At first create a new one.");
        return false
    }

    // Layout.
    console.log("DONE / BACK: Enter '!'.");
    console.log("");

    // Show all existing profiles
    for (let i = 0; i < userStorage.length; i++) {
        console.log(getValue(userStorage, userStorage.key(i)));
    }
    console.log("");

    // Chose an existing profile. Else try again.
    while (true) {
        let userName = readlineSync.prompt();

        // Back.
        if (userName === "!") {
            break
        }

        // Validate input, check if user exists.
        if (getValue(userStorage, userName) == userName) {
            console.log("");
            console.log("You have chosen " + userName + "s profile!");
            activeProfile = userName;
            break

        } else {
            console.log("");
            console.log("Your input: " + userName);
            console.log("This user doesnt exist!");
            console.log("");
        }
    }
}

// Create a new user profile.
function createNewProfile () {
    // Layout.
    console.log("Creating a new profile:");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("DONE / BACK: Enter '!'.");
    console.log("");

    while (true) {
        // User enters userName.
        let userName = readlineSync.question('New username: ');
        console.log("");

        // Back.
        if (userName === "!") {
            break
        }

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
function mainMenuOptions() {
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
        let input = readlineSync.prompt();

        // Run function user chose.
        switch (input) {
            // Manage all entries.
            case "1":
                entryManagement();
                break
            // Manage the users income.
            case "2":
                incomeManagement();
                break
            // Manage the expenditures of the user.
            case "3":
                outcomeManagement();
                break
            // Calculate income and expenditures,
            case "4":
                accounting();
                break
            // Check creditability.
            case "5":
                creditability();
                break
            // Check solvency.
            case "6":
                solvency();
                break
            // Leave.
            case "7":
                process.exit();
                break // -> Ignore IDEA warning
            // User input is not valid.
            default:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
        }
    }
}

// ________________________________________________________________________________
// Entry management: Add, show, search, delete entry or leave.
function entryManagement() {
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

        // Evaluate user input.
        switch (input) {
            // Add entries.
            case "1":
                addEntries();
                break
            // Show all entries.
            case "2":
                showEntries();
                break
            // Search an entry.
            case "3":
                searchEntry();
                break
            // Delete an entry.
            case "4":
                deleteEntry();
                break
            // Back to main menu.
            case "5":
                break
            // Leave.
            case "6":
                process.exit();
                break // -> Ignore IDEA warning
            // User input is not valid.
            default:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
        }

        // Go back to main menu.
        if (input === "5") {
            break
        }
    }
}

// Add entries.
function addEntries() {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Task: Adding entry");

    // Repeat till "OK" / "DONE"
    while (true) {
        console.log("--------------------------------------------------------" +
            "--------------"); // 60 + 10 "-"
        console.log("Please consider the following scheme: ");
        console.log("Date: year + month + day; Category: category; Money: 123,45€");
        console.log("DONE / BACK: Enter '!'.");
        console.log("");

        // Get date.
        var date = readlineSync.question("Date: ");
        if (date === "!") {
            break
        }

        // Get category.
        var category = readlineSync.question("Category: ");
        if (category === "!") {
            break
        }

        // Get price.
        var money = readlineSync.question("Money: ");
        if (money === "!") {
            break
        }

        // money -> float ???

        // Evaluate Input: date = int; category = string; money = int;
        // Add input.
        if (isNaN(parseInt(date)) === false && isNaN(parseInt(category)) === true
            && isNaN(parseInt(money)) === false && date.length === 8) {

            // Create entry object containing info.
            let insertEntry = entry;
            insertEntry = {date: date, category: category, money: money};
            console.log("");
            console.log("Your entry", insertEntry, "got integrated!");
            console.log("");

            // Adding by rewriting list of objects
            let temp = [];
            if (activeProfile.length > 0) {
                temp = JSON.parse(getValue(entryStorage, activeProfile));
            }
            temp.push(insertEntry);
            setValue(entryStorage, activeProfile, JSON.stringify(temp));

        // Don't add.
        } else {
            console.log("");
            console.log("Input not valid!");
            console.log("Your input: " + date + " " + category + " " + money);
        }
    }
}

// Show entries. Select a filter.
function showEntries() {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Entries: Choose one of the following specifier or all.");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"

    // Run until user wants back or leave.
    while(true) {
        // Print user Interface.
        console.log("[1] - Date.");
        console.log("[2] - Category.");
        console.log("[3] - Money.");
        console.log("[4] - All.");
        console.log("[5] - Back.");
        console.log("");

        // Read user input.
        var input = readlineSync.prompt();
        console.log("");

        switch (input) {
            // Show entries filtered by a date.
            case "1":
                showEntriesDate();
                break
            // Show entries filtered by a category.
            case "2":
                showEntriesCategory();
                break
            // Show entries filtered by a value.
            case "3":
                showEntriesMoney();
                break
            // Show all entries.
            case "4":
                showEntriesAll();
                break
            // Back.
            case "5":
                break
            // User input is not valid.
            default:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
        }
        if (input === "5") {
            break
        }
    }
}

// Show all entries.
function showEntriesAll() {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Task: Show all entries.");
    console.log("----------------------------------------------------" +
        "------------------"); // 60 + 10 "-"

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));

    // Print allEntries as a table.
    console.table(allEntries);

    // Layout.
    console.log("");
    console.log("--------------------------------------------------------" +
        "--------------"); // 60 + 10 "-"
}

// Show all dates.
function showEntriesDate() {
    // Layout
    console.log("----------------------------------------------------" +
        "------------------"); // 60 + 10 "-"
    console.log("Task: Show all dates.");
    console.log("----------------------------------------------------" +
        "------------------"); // 60 + 10 "-"

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));
    let showDate = [];
    for (let i = 0; i < allEntries.length; i++) {
        showDate.push(allEntries[i].money);
    }

    // Print showDate as a table.
    console.table(showDate);

    // Layout.
    console.log("");
    console.log("--------------------------------------------------------" +
        "--------------"); // 60 + 10 "-"
}

// Show all categories.
function showEntriesCategory() {
    // Layout
    console.log("----------------------------------------------------" +
        "------------------"); // 60 + 10 "-"
    console.log("Task: Show all categories.");
    console.log("----------------------------------------------------" +
        "------------------"); // 60 + 10 "-"

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));
    let showCategory = [];
    for (let i = 0; i < allEntries.length; i++) {
        showCategory.push(allEntries[i].category);
    }

    // Print showCategory as a table.
    console.table(showCategory);

    // Layout.
    console.log("");
    console.log("--------------------------------------------------------" +
        "--------------"); // 60 + 10 "-"
}

// Show all expenditures.
function showEntriesMoney() {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Task: Show all expenditure.");
    console.log("----------------------------------------------------" +
        "------------------"); // 60 + 10 "-"

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));
    let showMoney = [];
    for (let i = 0; i < allEntries.length; i++) {
        showMoney.push(allEntries[i].money);
    }

    // Print showMoney as a table.
    console.table(showMoney);

    // Layout.
    console.log("");
    console.log("--------------------------------------------------------" +
        "--------------"); // 60 + 10 "-"
}

// Search a specific entry.
function searchEntry() {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Task: Search for a specific entry.");

    // Repeat till "OK" / "DONE"
    while (true) {
        console.log("--------------------------------------------------------" +
            "--------------"); // 60 + 10 "-"
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
        // Check input.
        if (isNaN(parseInt(date)) === false && isNaN(parseInt(category)) === true
            && isNaN(parseInt(money)) === false && date.length === 8) {

            // Create search object containing info.
            let insertEntry = entry;
            insertEntry = {date: date, category: category, money:money};

            // Comparing searched entry to stored entries.
            let temp = [];
            let output = [];
            if (activeProfile.length > 0) {
                temp = JSON.parse(getValue(entryStorage, activeProfile));

                for (let i = 0; i < temp.length; i++) {
                    if (temp[i] === insertEntry) {
                        output.push(temp[i]);
                    }
                }

                console.table(output);

            } else {
                console.log("No entries available!")
            }

            // Input not validated.
        } else {
            console.log("");
            console.log("Input not valid!");
            console.log("Your input: " + date + " " + category + " " + money);
        }
    }
}

// Delete an entry.
function deleteEntry() {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Task: Delete a specific entry.");

    // Repeat till "OK" / "DONE"
    while (true) {
        console.log("--------------------------------------------------------" +
            "--------------"); // 60 + 10 "-"
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
        // Check input.
        if (isNaN(parseInt(date)) === false && isNaN(parseInt(category)) === true
            && isNaN(parseInt(money)) === false && date.length === 8) {

            // Create search object containing info.
            let insertEntry = entry;
            insertEntry = {date: date, category: category, money:money};

            // Compare searched entry to stored entries to delete it.
            let temp = [];
            let newTemp = [];
            if (activeProfile.length > 0) {
                temp = JSON.parse(getValue(entryStorage, activeProfile));

                for (let i = 0; i < temp.length; i++) {
                    if (temp[i] !== insertEntry) {
                        newTemp.push(temp[i]);
                    }
                }

                setValue(entryStorage, activeProfile, JSON.stringify(newTemp));

            } else {
                console.log("No entries available!")
            }

            // Input not validated.
        } else {
            console.log("");
            console.log("Input not valid!");
            console.log("Your input: " + date + " " + category + " " + money);
        }
    }
}

// ________________________________________________________________________________
// Outcome management:
function outcomeManagement() {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Entry Management: Choose your task!");
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"

    // Run until user wants back or leave.
    while(true) {
        // Print user Interface.
        console.log("[1] - Expenditure last week.");
        console.log("[2] - Expenditure last month.");
        console.log("[3] - Expenditure last year.");
        console.log("[4] - Average expenditure last week.");
        console.log("[5] - Average expenditure last month.");
        console.log("[6] - Average expenditure last year.");
        console.log("[7] - Expenditure ?forecast?.");
        console.log("[8] - Back.");
        console.log("[9] - Leave.");
        console.log("");

        // Read user input.
        var input = readlineSync.prompt();
        input = parseInt(input);

        // Evaluate user input.
        switch (input) {
            // Last week.
            case 1:
                expenditureLastDays(7);
                break
            // Last month.
            case 2:
                expenditureLastDays(31);
                break
            // Last year.
            case 3:
                expenditureLastDays(365);
                break
            // Delete an entry.
            case 4:
                expenditureAverage(7);
                break
            // Delete an entry.
            case 5:
                expenditureAverage(31);
                break
            // Delete an entry.
            case 6:
                expenditureAverage(365);
                break
            // Back to main menu.
            case 7:
                expenditureForecast();
                break
            // Back to main menu.
            case 8:
                break
            // Leave.
            case 9:
                process.exit();
                break // -> Ignore IDEA warning
            // Wrong input.
            case NaN:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
            // Error.
            default:
                console.log("Error: Wrong input -> outcomeManagement");
                break
        }

        // Go back to main menu.
        if (input === 8) {
            break
        }
    }
}

// Calculate the expenditure of the last days n.
function expenditureLastDays(days) {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Task: Show all entries.");
    console.log("----------------------------------------------------" +
        "------------------"); // 60 + 10 "-"

    // Get date.
    let inputDate = readlineSync.question("Date: ");

    // Check date
    // > ....

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));

    // Sum up all entries within the date.
    let sum = 0;

    for (let i = 0; i < allEntries.length; i++) {
        if (allEntries[i].date >= inputDate - days) {
            sum += allEntries[i].money;
            console.log(allEntries[i]);
        }
    }

    console.log(sum);

    // Layout.
    console.log("");
    console.log("--------------------------------------------------------" +
        "--------------"); // 60 + 10 "-"
}

// Calculate the average expenditure.
function expenditureAverage(days) {
    // Layout
    console.log("------------------------------------------------------------" +
        "----------"); // 60 + 10 "-"
    console.log("Task: Show all entries.");
    console.log("----------------------------------------------------" +
        "------------------"); // 60 + 10 "-"

    // Get date.
    let inputDate = readlineSync.question("Date: ");

    // Check date
    // > ....

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));

    // Sum up all entries within the date.
    let sum = 0;
    let counter = 0;

    for (let i = 0; i < allEntries.length; i++) {
        if (allEntries[i].date >= inputDate - days) {
            sum += allEntries[i].money;
            counter++;
        }
    }

    let average = 0;
    if (counter > 0) {
        average = sum / counter;
    }

    console.log(average);

    // Layout.
    console.log("");
    console.log("--------------------------------------------------------" +
        "--------------"); // 60 + 10 "-"
}

// ...
function expenditureForecast() {
    let income = readlineSync.question("Monthly income: ");
    let average = expenditureAverage(365);

    let yearDifference = 12 * income - 12 * average;

    console.log(yearDifference);
}

// ________________________________________________________________________________
// Income management:
function incomeManagement() {

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
    entryStorage: entryStorage,
    activeProfile: activeProfile,
}