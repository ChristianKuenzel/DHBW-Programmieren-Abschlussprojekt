/*

Copyright 2020
DHBW Lörrach, Programmieren Abschlussprojekt: Hauswirtschaftsprogramm
David Schüler <david.schueler97@gmail.com> & Christian Künzel <kunibertgames@web.de>
Matr.Nr.: & Matr.Nr.: 3889521

Eintragsverwaltung Datei

1) const variables
2) variables
3) objects
4) functions
5) exports

*/
// ________________________________________________________________________________
// Importing all structures as modules.
const struct = require('./structures');

// ________________________________________________________________________________
// Listing of all const variables.
const process = require("process");
const LocalStorage = require('node-localstorage').LocalStorage;
const readlineSync = require('readline-sync');

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
        input = parseInt(input);

        // Evaluate user input.
        switch (input) {
            // Add entries.
            case 1:
                addEntries();
                break
            // Show all entries.
            case 2:
                showEntries();
                break
            // Search an entry.
            case 3:
                searchEntry();
                break
            // Delete an entry.
            case 4:
                deleteEntry();
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
                console.log("Error: Wrong input -> entryManagement");
                break
        }

        // Go back to main menu.
        if (input === 5) {
            break
        }
    }
}

// ________________________________________________________________________________
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

            // Create entry object containing info.
            let insertEntry = struct.entry;
            insertEntry = {date: date, category: category, money:money};
            console.log("");
            console.log("Your entry", insertEntry, "got integrated!");
            console.log("");

            // Adding by rewriting list of objects
            let temp = [];
            if (struct.activeProfile.length > 0) {
                temp = JSON.parse(struct.getValue(struct.entryStorage, struct.activeProfile));
            }
            temp.push(insertEntry);
            struct.setValue(struct.entryStorage, struct.activeProfile, JSON.stringify(temp));

            // Don't add.
        } else {
            console.log("");
            console.log("Input not valid!");
            console.log("Your input: " + date + " " + category + " " + money);
        }
    }
}

// ________________________________________________________________________________
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
        input = parseInt(input);
        console.log("");

        switch (input) {
            // Show entries filtered by a date.
            case 1:
                showEntriesDate();
                break
            // Show entries filtered by a category.
            case 2:
                showEntriesCategory();
                break
            // Show entries filtered by a value.
            case 3:
                showEntriesMoney();
                break
            // Show all entries.
            case 4:
                showEntriesAll();
                break
            case 5:
                break
            // Wrong input.
            case NaN:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
            // Error.
            default:
                console.log("Error: Wrong input -> entryManagement");
                break
        }
        if (input === 5) {
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
    let allEntries = JSON.parse(struct.getValue(struct.entryStorage, struct.activeProfile));

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
    let allEntries = JSON.parse(struct.getValue(struct.entryStorage, struct.activeProfile));
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
    let allEntries = JSON.parse(struct.getValue(struct.entryStorage, struct.activeProfile));
    let showCategory = [];
    for (let i = 0; i < allEntries.length; i++) {
        showCategory.push(allEntries[i].money);
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
    let allEntries = JSON.parse(struct.getValue(struct.entryStorage, struct.activeProfile));
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

// ________________________________________________________________________________
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
            let insertEntry = struct.entry;
            insertEntry = {date: date, category: category, money:money};

            // Comparing searched entry to stored entries.
            let temp = [];
            let output = [];
            if (struct.activeProfile.length > 0) {
                temp = JSON.parse(struct.getValue(struct.entryStorage, struct.activeProfile));

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

// ________________________________________________________________________________
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
            let insertEntry = struct.entry;
            insertEntry = {date: date, category: category, money:money};

            // Compare searched entry to stored entries to delete it.
            let temp = [];
            let newTemp = [];
            if (struct.activeProfile.length > 0) {
                temp = JSON.parse(struct.getValue(struct.entryStorage, struct.activeProfile));

                for (let i = 0; i < temp.length; i++) {
                    if (temp[i] !== insertEntry) {
                        newTemp.push(temp[i]);
                    }
                }

                struct.setValue(struct.entryStorage, struct.activeProfile, JSON.stringify(newTemp));

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
module.exports = {
    entryManagement: entryManagement
}