/*
Copyright 2020
DHBW Lörrach, Programmieren Abschlussprojekt: Hauswirtschaftsprogramm
David Schüler, Matr.Nr.: ?, <david.schueler97@gmail.com>, https://github.com/AranguZ
Christian Künzel, Matr.Nr.: 3889521, <kunibertgames@web.de>, https://github.com/ChristianKuenzel

Content undergoes the terms of chosen licenses. See GitHub for more:
https://github.com/ChristianKuenzel/DHBW-WebEngineering-Abschlussprojekt

Structure file

1) Const variables
2) Variables
3) Objects
4) Functions
5) Exports

*/
// ________________________________________________________________________________
// Listing of all const variables.
const process = require("process");
const LocalStorage = require('node-localstorage').LocalStorage;
const readlineSync = require('readline-sync');
const fs = require('fs');

// ________________________________________________________________________________
// Listing of all variables.
let userStorage;
let entryStorage;
let incomeStorage;

let activeProfile;

// ________________________________________________________________________________
// Listing of all objects.
var entry = {
    date: NaN,
    category: NaN,
    amount: NaN
}

var user = {
    name: NaN,
    password: NaN,
    balance: NaN,
    lastOnline: NaN,
    monthlyIn: NaN,
    monthlyOut: NaN
}

// ________________________________________________________________________________
// Listing of all functions:
// Reading command line arguments to secure program execution and check for -test mode.
function readCLA () {
    // Get commandLineArguments
    let cmdLineArgument = process.argv;

    // Check if argument number is correct && if test mode is used.
    if (cmdLineArgument.length === 3) {
        if (cmdLineArgument[2] === '-test') {
            console.log("readCLA testMode: STARTED");
            return true
        } else {
            console.log("readCLA program: FAILED");
            console.log("Error: cmdLineArg != -test");
            process.exit();
        }
    } else if (cmdLineArgument.length > 3 || cmdLineArgument.length < 2) {
        console.log("readCLA program: FAILED")
        console.log("Error: cmdLineArgument > 3 || < 2");
        process.exit();
    }

    if (cmdLineArgument[2] === '-test') {
        console.log("readCLA: FINISHED");
    }
}

// Test function. Inserting given values for examination.
function testMode (value) {
    // Begin of test function.
    console.log("testMode: STARTED");

    // Test: initStorage().
    // Check if folder exists.
    try {
        fs.statSync('./userStorage');
        console.log("initStorage check uStorage: OK");
    } catch (error) {
        console.log("initStorage check uStorage: FAILED");
        console.log("File doesnt exist! -> initStorage()");
    }

    // Check if folder exists.
    try {
        fs.statSync('./userStorage');
        console.log("initStorage check eStorage: OK");
    } catch (error) {
        console.log("initStorage check eStorage: FAILED");
        console.log("File doesnt exist! -> initStorage()");
    }

    // Check if folder exists.
    try {
        fs.statSync('./incomeStorage');
        console.log("initStorage check iStorage: OK");
    } catch (error) {
        console.log("initStorage check iStorage: FAILED");
        console.log("File doesnt exist! -> initStorage()");
    }

    // Check is finished.
    console.log("initStorage: FINISH");


    // Test: Profile settings.
    // Insert profile and chose profile.
    setValue(userStorage, "test", "test");
    activeProfile = "test";

    // Check if user exists.
    try {
        let testVar = getValue(userStorage, activeProfile);
        if (testVar !== "test") {
            throw false
        }
    } catch (error) {
        console.log("Check user: FAILED")
        console.log("User doesnt exist! -> activeProfile / userStorage / setValue()")
    }

    // ...

    // Test: ...

    // ...

    // Test: Preparation for functionality.
    // Fill list with entries.
    let testList = [];
    let testObj = entry;
    let date = new Date();
    let char = "x";

    for (let i = 0; i < value; i++) {
        testObj.date = date;
        testObj.category = char; // Change more values ?
        testObj.amount = i;
        testList.push(testObj);
    }

    setValue(entryStorage, activeProfile, JSON.stringify(testList));


    // ...


    // End of test function.
    console.log("testMode: FINISH")
}

// Initialize storage containing user and entries.
// Check if storage files already exist, otherwise create them.
function initStorage () {
    // Check if storage file already exists, otherwise create one.
    if (typeof userStorage === "undefined" || userStorage === null) {
        userStorage = new LocalStorage('./userStorage');
    }

    // Check if storage file already exists, otherwise create one.
    if (typeof entryStorage === "undefined" || entryStorage === null) {
        entryStorage = new LocalStorage('./entryStorage');
    }

    // Check if storage file already exists, otherwise create one.
    if (typeof incomeStorage === "undefined" || incomeStorage === null) {
        incomeStorage = new LocalStorage('./incomeStorage');
    }

    return [userStorage, entryStorage, incomeStorage];
}

// ________________________________________________________________________________
// Check and validate profile menu option:
function profileMenuOptions () {
    // Layout + Introduction
    console.log("----------------------------------------------------------------------"); // 70 "-"
    console.log("Welcome to your budget software to manage your households finances!");
    console.log("----------------------------------------------------------------------"); // 70 "-"

    // User information
    console.log("Please enter one of the following tasks by entering its number.");

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
        console.log("----------------------------------------------------------------------"); // 70 "-"

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
    console.log("----------------------------------------------------------------------"); // 70 "-"

    // Check if at least one profile exists.
    if (userStorage.length === 0) {
        console.log("");
        console.log("No profiles available. At first create a new one.");
        console.log("");
        return
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
        if (getValue(userStorage, userName) === userName) {
            console.log("");
            console.log("You have chosen " + userName + "'s profile!");
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
    console.log("----------------------------------------------------------------------"); // 70 "-"
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

// ________________________________________________________________________________
// Generalized functions:
// Get the chosen profile/entry to work with.
function getValue (storage, key) {
    return storage.getItem(key)
}

// Create a new profile/entry to work with.
function setValue (storage, key, value) {
    storage.setItem(key, value);
}

// Calculate the income of the last x months.
function calculateLastPeriod(time, period, storage) {
    // Get all entries from storage.
    let allElements = JSON.parse(getValue(storage, activeProfile));

    // Pre-Definition due to only single definitions in switch-case.
    let deadline;

    // Calculate date you are looking for.
    switch (period) {
        case "day":
            deadline = new Date();
            deadline.setDate(deadline.getDate() - time);
            break
        case "month":
            deadline = new Date();
            deadline.setMonth(deadline.getMonth() - time);
            break
        case "year":
            deadline = new Date();
            deadline.setFullYear(deadline.getFullYear() - time);
            break
    }

    // Sum up all entries within the date.
    let sum = 0;

    // Range over allElements from storage.
    for (let i = 0; i < allElements.length; i++) {
        // Convert date of element to date format.
        let temp = new Date(allElements[i].date);
        // Compare milliseconds. If higher, than it is within range of time.
        if (temp.getTime() >= deadline.getTime()) {
            sum += parseInt(allElements[i].amount);
        }
    }
    return sum
}

// Format for executing and calculating sum of elements in %contributionType% %storage% of the last %period%.
function printLastPeriod(period, contributionType, storage) {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Calculating your " + contributionType + " of the last " + period + "s.");
    console.log("----------------------------------------------------------------------"); // 70.

    // Read & check user input.
    let time = readlineSync.question("" + period + ": ");
    if (time === "!") {
        return
    } else if (isNaN(parseInt(time)) === true || time === undefined) {
        console.log("Input not valid! Only numbers allowed!");
        console.log("Your Input: " + time);
        return
    }

    // Calculate income of the last months.
    let sum = calculateLastPeriod(time, period, storage);

    // Layout + Print result.
    console.log("");
    console.log("The " + contributionType + " of the last " + time + " " + period + " are " + sum + " Euro.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// Update %monthlyContributionList% and add elements to contribution storage per month from lastOnline until now.
function updateContributionList(monthlyContributionList, storage) {
    // activeProfile
    // monthlyIn monthlyOut
    // storage
    // calculateLastPeriod

}

// ________________________________________________________________________________
// Start menu functions and entry based functions.
function mainMenuOptions() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70 "-"
    console.log("Main menu: What is your next task ?");
    console.log("----------------------------------------------------------------------"); // 70 "-"

    // Repeat main menu until user leaves the program.
    while (true) {
        console.log("[1] - Entry management");
        console.log("[2] - Expenditure management");
        console.log("[3] - Income management");
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
                expenditureManagement();
                break
            // Manage the expenditures of the user.
            case "3":
                incomeManagement();
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
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Entry Management: Choose your task!");
    console.log("----------------------------------------------------------------------"); // 70.

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
        let input = readlineSync.prompt();

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
    // Layout.
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Adding entry");

    // Repeat till "OK" / "DONE".
    while (true) {
        console.log("----------------------------------------------------------------------"); // 70.
        console.log("Please consider the following scheme: ");
        console.log("Date: 'day month year' or 'day-month-year'; Category: category; Money: '123,45€'");
        console.log("DONE / BACK: Enter '!'.");
        console.log("");

        // GET DATE:
        let date = readlineSync.question("Date: ");

        // Back.
        if (date === "!") {
            break
        }

        // Check length before converting.
        if (date.length !== 10) {
            console.log("The number of characters needs to be exactly 10: 'xx-xx-xxxx' or 'xx xx xxxx'");
            break
        }

        // Convert string into date object.
        date = Date.parse(date);
        let newDate = new Date(date);

        // Check if date is correct.
        if (isNaN(newDate.getDate()) === true || isNaN(newDate.getMonth()) === true || isNaN(newDate.getFullYear()) === true) {
            console.log("Your date is not valid: day month year; numbers only;");
            break
        }


        // GET CATEGORY:
        let category = readlineSync.question("Category: ");

        // Back.
        if (category === "!") {
            break

        // Check if category is correct and not larger than 15 letters.
        } else if (isNaN(parseInt(category)) === false || category.length > 15) {
            console.log("Your category is not valid: Letter's only; max. 15;");
            break
        }


        // GET PRICE:
        let money = readlineSync.question("Money: ");

        // Back.
        if (money === "!") {
            break

        // Check if money is correct.
        } else if (isNaN(parseInt(money)) === true || money === undefined) { // money -> float ???
            console.log("");
            console.log("Your value is not valid: Numbers only;");
            console.log("");
            break
        }

        // After input validation:
        // Create entry object containing info.
        let insertEntry = entry;
        insertEntry = {date: newDate, category: category, amount: money};

        // Layout + user info.
        let insertEntryPrintFormat = entry;
        insertEntryPrintFormat = {date: newDate.toLocaleString(), category: category, amount: money};
        console.log("");
        console.log("Your entry", insertEntryPrintFormat, "got integrated!");
        console.log("");

        // Adding by rewriting list of objects.
        let temp = [];
        if (activeProfile.length > 0) {
            temp = JSON.parse(getValue(entryStorage, activeProfile));
        }
        temp.push(insertEntry);
        setValue(entryStorage, activeProfile, JSON.stringify(temp));
    }
}

// Show entries. Select a filter.
function showEntries() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Entries: Choose one of the following specifier or all.");
    console.log("----------------------------------------------------------------------"); // 70.

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
        let input = readlineSync.prompt();
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
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Show all entries.");
    console.log("----------------------------------------------------------------------"); // 70.

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));

    // Print allEntries as a table.
    console.table(allEntries);

    // Layout.
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// Show all dates.
function showEntriesDate() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Show all dates.");
    console.log("----------------------------------------------------------------------"); // 70.

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));
    let showDate = [];
    for (let i = 0; i < allEntries.length; i++) {
        showDate.push(allEntries[i].date);
    }

    // Print showDate as a table.
    console.table(showDate);

    // Layout.
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// Show all categories.
function showEntriesCategory() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Show all categories.");
    console.log("----------------------------------------------------------------------"); // 70.

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
    console.log("----------------------------------------------------------------------"); // 70.
}

// Show all expenditures.
function showEntriesMoney() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Show all expenditure.");
    console.log("----------------------------------------------------------------------"); // 70.

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));
    let showMoney = [];
    for (let i = 0; i < allEntries.length; i++) {
        showMoney.push(allEntries[i].amount);
    }

    // Print showMoney as a table.
    console.table(showMoney);

    // Layout.
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// Search a specific entry.
function searchEntry() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Search for a specific entry.");

    // Repeat till "OK" / "DONE"
    while (true) {
        console.log("----------------------------------------------------------------------"); // 70.
        console.log("Please consider the following scheme: ");
        console.log("Date: 'day month year' or 'day-month-year'; Category: category; Money: '123,45€'");
        console.log("DONE / BACK: Enter '!'.");
        console.log("");

        // GET DATE:
        let date = readlineSync.question("Date: ");
        var newDate;

        // Back.
        if (date === "!") {
            break
        }

        // If input is empty, dont search for date.
        if (date.length === 0) {
            newDate = NaN

        // If input got the correct amount of characters, start converting.
        } else if (date.length === 10) {
            // Convert string into date object.
            date = Date.parse(date);
            newDate = new Date(date);

            // Check if date is correct.
            if (isNaN(newDate.getDate()) === true || isNaN(newDate.getMonth()) === true || isNaN(newDate.getFullYear()) === true) {
                console.log("Your date is not valid: 'day month year' or 'day-month-year'; numbers only;");
                break
            }

        } else {
            console.log("Your date is not valid: NONE or 'day month year' or 'day-month-year'; numbers only;");
            break
        }


        // GET CATEGORY:
        let category = readlineSync.question("Category: ");

        // Back.
        if (category === "!") {
            break

        // Check if category is correct and not larger than 15 letters.
        } else if (isNaN(parseInt(category)) === false || category.length > 15) {
            console.log("Your category is not valid: Letter's only; max. 15;");
            break

        // If input is empty, dont search for category.
        } else if (category.length === 0) {
            category = NaN;
        }


        // GET PRICE:
        let money = readlineSync.question("Money: ");

        // Back.
        if (money === "!") {
            break

        // If input is empty, dont search for money.
        } else if (money.length === 0) {
            money = NaN;

        // Check if money is correct.
        } else if (isNaN(parseInt(money)) === true) { // money -> float ???
            console.log("");
            console.log("Your value is not valid: Numbers only;");
            console.log("");
            break
        }

        // After input validation:
        // Create entry object containing info.
        let insertEntry = entry;
        insertEntry = {date: newDate, category: category, amount: money};

        // Comparing searched entry to stored entries.
        // Temporary list, containing all entries from entryStorage.
        let temp = [];
        // Output list, containing all found entries to print.
        let output = [];
        // Check if there is an existing key file with entries.
        if (activeProfile.length > 0) {
            temp = JSON.parse(getValue(entryStorage, activeProfile));

            // Search through every element from entryStorage.
            for (let i = 0; i < temp.length; i++) {
                // Check if we use date as a Comparison factor.
                if (isNaN(newDate) === false) {
                    if (temp[i].date === insertEntry.date) {
                        output.push(temp[i]);
                    }
                }

                // Check if we use category as a Comparison factor.
                if (isNaN(category) === false) {
                    if (temp[i].category === insertEntry.category) {
                        output.push(temp[i]);
                    }
                }

                // Check if we use amount as a Comparison factor.
                if (isNaN(money) === false) {
                    if (temp[i].amount === insertEntry.amount) {
                        output.push(temp[i]);
                    }
                }

            }

            // Print all the compared fitting entries.
            console.table(output);

        } else {
            console.log("No entries available!")
        }
    }
}

// Delete an entry.
function deleteEntry() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Delete a specific entry.");

    // Repeat till "OK" / "DONE"
    while (true) {
        console.log("----------------------------------------------------------------------"); // 70.
        console.log("Please consider the following scheme: ");
        console.log("Date: 'day month year' or 'day-month-year'; Category: category; Money: '123,45€'");
        console.log("DONE / BACK: Enter '!'.");
        console.log("");

        // Filter sign.
        let filterOffline = "$";

        // GET DATE:
        let date = readlineSync.question("Date: ");
        var newDate;

        // Back.
        if (date === "!") {
            break
        }

        // If input is empty, dont search for date.
        if (date.length === 0) {
            newDate = filterOffline;

        // If input got the correct amount of characters, start converting.
        } else if (date.length === 10) {
            // Convert string into date object.
            date = Date.parse(date);
            newDate = new Date(date);

            // Check if date is correct.
            if (isNaN(newDate.getDate()) === true || isNaN(newDate.getMonth()) === true || isNaN(newDate.getFullYear()) === true) {
                console.log("Your date is not valid: 'day month year' or 'day-month-year'; numbers only;");
                break
            }

        } else {
            console.log("Your date is not valid: NONE or 'day month year' or 'day-month-year'; numbers only;");
            break
        }


        // GET CATEGORY:
        let category = readlineSync.question("Category: ");

        // Back.
        if (category === "!") {
            break

        // Check if category is correct and not larger than 15 letters.
        } else if (isNaN(parseInt(category)) === false || category.length > 15) {
            console.log("Your category is not valid: Letter's only; max. 15;");
            break

        // If input is empty, dont search for category.
        } else if (category.length === 0) {
            category = filterOffline;
        }


        // GET PRICE:
        let money = readlineSync.question("Money: ");

        // Back.
        if (money === "!") {
            break

        // If input is empty, dont search for money.
        } else if (money.length === 0) {
            money = filterOffline;

        // Check if money is correct.
        } else if (isNaN(parseInt(money)) === true) { // money -> float ???
            console.log("");
            console.log("Your value is not valid: Numbers only;");
            console.log("");
            break
        }

        // After input validation:
        // Create entry object containing info.
        let insertEntry = entry;
        insertEntry = {date: newDate, category: category, amount: money};

        // Comparing searched entry to stored entries.
        // Temporary list, containing all entries from entryStorage.
        let temp = [];
        // Entry list, containing all left entries after delete function.
        let newEntries = [];
        // Entry list, containing all deleted entries.
        let deletedEntries = [];
        // Check if there is an existing key file with entries.
        if (activeProfile.length > 0) {
            temp = JSON.parse(getValue(entryStorage, activeProfile));

            // Search through every element from entryStorage.
            for (let i = 0; i < temp.length; i++) {
                // Check if we use date as a Comparison factor.
                if (newDate !== filterOffline) {
                    let tmp = new Date(temp[i].date);
                    if (tmp.getTime() !== newDate.getTime()) {
                        newEntries.push(temp[i]);
                    } else {
                        deletedEntries.push(temp[i]);
                    }

                // Check if we use category as a Comparison factor.
                } else if (category !== filterOffline) {
                    if (temp[i].category !== insertEntry.category) {
                        newEntries.push(temp[i]);
                    } else {
                        deletedEntries.push(temp[i]);
                    }

                // Check if we use amount as a Comparison factor.
                } else if (money !== filterOffline) {
                    if (temp[i].amount !== insertEntry.amount) {
                        newEntries.push(temp[i]);
                    } else {
                        deletedEntries.push(temp[i]);
                    }
                }
                // else mit "No filter selected!" ?
            }

            console.log(category);

            // Check if filters are all offline.
            if (newDate === filterOffline && category === filterOffline && money === filterOffline) {
                console.log("");
                console.log("No filter selected!");

            // Else reSet storage.
            } else {
                // Print all the deleted entries.
                console.log("");
                console.log(deletedEntries.length + " entry/entries have been deleted!");
                console.table(deletedEntries);

                // Set new storage: allEntries = newEntries.
                setValue(entryStorage, activeProfile, JSON.stringify(newEntries));
            }

        } else {
            console.log("No entries available!");
        }
    }
}

// ________________________________________________________________________________
// Outcome management:
function expenditureManagement() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Expenditure Management: Choose your task!");
    console.log("----------------------------------------------------------------------"); // 70.

    // Run until user wants back or leave.
    while(true) {
        // Print user Interface.
        console.log("[1] - Expenditure last days.");
        console.log("[2] - Expenditure last months.");
        console.log("[3] - Expenditure last years.");

        console.log("[4] - Average expenditure last week.");
        console.log("[5] - Average expenditure last month.");
        console.log("[6] - Average expenditure last year.");
        console.log("[7] - Expenditure ?forecast?.");
        console.log("[8] - Back.");
        console.log("[9] - Leave.");
        console.log("");

        // Read user input.
        let input = readlineSync.prompt();

        // Evaluate user input.
        switch (input) {
            // Last week.
            case "1":
                // Calculate expenditure of the last days.
                printLastPeriod("day", "expenditure", entryStorage);
                break
            // Last month.
            case "2":
                // Calculate expenditure of the last months.
                printLastPeriod("month", "expenditure", entryStorage);
                break
            // Last year.
            case "3":
                // Calculate expenditure of the last years.
                printLastPeriod("year", "expenditure", entryStorage);
                break
            // Delete an entry.
            case "4":
                expenditureAverage(7);
                break
            // Delete an entry.
            case "5":
                expenditureAverage(31);
                break
            // Delete an entry.
            case "6":
                expenditureAverage(365);
                break
            // Back to main menu.
            case "7":
                expenditureForecast();
                break
            // Back to main menu.
            case "8":
                break
            // Leave.
            case "9":
                process.exit();
                break // -> Ignore IDEA warning
            // Wrong input.
            default:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
        }

        // Go back to main menu.
        if (input === "8") {
            break
        }
    }
}

// Add monthly expenditures.
function addMonthlyExpenditure() {

}

// Calculate the expenditure of the last days n.
/*function expenditureLastDays(days) {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Your expenditures of the last " + days + " " + "days.");
    console.log("----------------------------------------------------------------------"); // 70.

    // Get all entries from storage.
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile));

    // Calculate date you are looking for.
    let deadline = new Date();
    deadline.setDate(deadline.getDate() - days);

    // Sum up all entries within the date.
    let sum = 0;

    // Range over allEntries from storage.
    for (let i = 0; i < allEntries.length; i++) {
        // Convert date of entry to date format.
        let temp = new Date(allEntries[i].date);
        // Compare milliseconds. If higher, than it is within range of x days.
        if (temp.getTime() >= deadline.getTime()) {
            sum += parseInt(allEntries[i].amount);
        }
    }

    // Layout + Print result.
    console.log("");
    console.log("The expenditures of the last " + days + "days are " + sum + "Euro.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.

    return sum
}*/

// Calculate the average expenditure.
function expenditureAverage(days) {
    // Calculate sum of expenditures in the last x days.
    let sum = expenditureLastDays(days);

    // Calculating average expenditure.
    let result = sum / days;

    // User info: Week
    if (days === 7) {
        // Layout + Print result.
        console.log("");
        console.log("The average expenditures per day of the last week is about " + result + " " + "Euro.");
        console.log("");
        console.log("----------------------------------------------------------------------"); // 70.

    // User info: Month
    } else if (days === 31) {
        // Layout + Print result.
        console.log("");
        console.log("The average expenditures per day of the last month is about " + result + " " + "Euro.");
        console.log("");
        console.log("----------------------------------------------------------------------"); // 70.

    // User info: Year
    } else if (days === 365) {
        // Layout + Print result.
        console.log("");
        console.log("The average expenditures per day of the last year is about " + result + " " + "Euro.");
        console.log("");
        console.log("----------------------------------------------------------------------"); // 70.

    } else {
        console.log("Error! No fitting user info found.");
        console.log("Result: " + result);
        console.log("");
        console.log("----------------------------------------------------------------------"); // 70.
    }
}

// ...
function expenditureForecast() {
    // ASk for monthly income
    let income = readlineSync.question("Monthly income: ");

    // Calculate average expenditure per month by evaluating expenditures per year
    let averageMonthByYear = expenditureLastDays(365) / 12;
    let averageMonthByMonth = expenditureLastDays(31);

    // Calculate difference over a year.
    let resultMonthByYear = 12 * income - 12 * averageMonthByYear;
    let resultMonthByMonth = 12 * income - 12 * averageMonthByMonth;

    console.log("Considering your average expenditures over the last year, we predict a change in balance by "
    + resultMonthByYear + " " + "over the next year.");
    console.log("Considering your expenditures last month, we predict a change in balance by "
    + resultMonthByMonth + " " + "over the next year.");
}

// ________________________________________________________________________________
// Income management:
function incomeManagement() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Income Management: Choose your task!");
    console.log("----------------------------------------------------------------------"); // 70.

    // Run until user wants back or leave.
    while(true) {
        // Print user Interface.
        console.log("[1] - Add income.");
        console.log("[2] - Add monthly income.");
        console.log("[3] - Income of the last months.");
        console.log("[4] - Forecast income next months.");
        console.log("[5] - Back.");
        console.log("[6] - Leave.");
        console.log("");

        // Read user input.
        let input = readlineSync.prompt();

        // Evaluate user input.
        switch (input) {
            // Add income to incomeStorage
            case "1":
                addIncome();
                break

            // Add monthly income to monthlyIn list.
            case "2":
                addMonthlyIncome();
                break

            // Calculate income of the last months.
            case "3":
                printLastPeriod("month", "income", incomeStorage);
                break

            // Prognosticate income of the following months.
            case "4":
                incomeForecast();
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

// Add single incomes to income Storage.
function addIncome() {
    // Layout.
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Adding income");

    // Repeat till "OK" / "DONE".
    while (true) {
        console.log("----------------------------------------------------------------------"); // 70.
        console.log("Please consider the following scheme: ");
        console.log("Date: 'day month year' or 'day-month-year'; Category: category; Money: '123,45€'");
        console.log("DONE / BACK: Enter '!'.");
        console.log("");

        // GET DATE:
        let date = readlineSync.question("Date: ");

        // Back.
        if (date === "!") {
            break
        }

        // Check length before converting.
        if (date.length !== 10) {
            console.log("The number of characters needs to be exactly 10: 'xx-xx-xxxx' or 'xx xx xxxx'");
            break
        }

        // Convert string into date object.
        date = Date.parse(date);
        let newDate = new Date(date);

        // Check if date is correct.
        if (isNaN(newDate.getDate()) === true || isNaN(newDate.getMonth()) === true || isNaN(newDate.getFullYear()) === true) {
            console.log("Your date is not valid: day month year; numbers only;");
            break
        }


        // GET CATEGORY:
        let category = readlineSync.question("Category: ");

        // Back.
        if (category === "!") {
            break

            // Check if category is correct and not larger than 15 letters.
        } else if (isNaN(parseInt(category)) === false || category.length > 15) {
            console.log("Your category is not valid: Letter's only; max. 15;");
            break
        }


        // GET PRICE:
        let money = readlineSync.question("Money: ");

        // Back.
        if (money === "!") {
            break

            // Check if money is correct.
        } else if (isNaN(parseInt(money)) === true || money === undefined) { // money -> float ???
            console.log("");
            console.log("Your value is not valid: Numbers only;");
            console.log("");
            break
        }

        // After input validation:
        // Create entry object containing info.
        let insertEntry = entry;
        insertEntry = {date: newDate, category: category, amount: money};

        // Layout + user info.
        let insertEntryPrintFormat = entry;
        insertEntryPrintFormat = {date: newDate.toLocaleString(), category: category, amount: money};
        console.log("");
        console.log("Your entry", insertEntryPrintFormat, "got integrated!");
        console.log("");

        // Adding by rewriting list of objects.
        let temp = [];
        if (activeProfile.length > 0) {
            temp = JSON.parse(getValue(incomeStorage, activeProfile));
        }
        temp.push(insertEntry);
        setValue(incomeStorage, activeProfile, JSON.stringify(temp));
    }

}

// Add Monthly incomes to list user.monthlyIn.
function addMonthlyIncome() {
    // Layout.
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Adding monthly income.");

    // Repeat till "OK" / "DONE".
    while (true) {
        console.log("----------------------------------------------------------------------"); // 70.
        console.log("DONE / BACK: Enter '!'.");
        console.log("");

        // GET NAME:
        let name = readlineSync.question("Name: ");

        // Back.
        // Back.
        if (name === "!") {
            break
        } else if (isNaN(parseInt(name)) === false || name === undefined) {
            console.log("");
            console.log("Your name is not valid: characters only;");
            console.log("");
            break
        }

        // GET PRICE:
        let money = readlineSync.question("Money: ");

        // Back.
        if (money === "!") {
            break

        // Check if money is correct.
        } else if (isNaN(parseInt(money)) === true || money === undefined) { // money -> float ???
            console.log("");
            console.log("Your value is not valid: Numbers only;");
            console.log("");
            break
        }

        // After input validation:
        // Create income object containing info.
        let income = income;
        income = {name: name, amount: money};

        // Layout + user info.
        console.log("");
        console.log("Your entry", income, "got integrated!");
        console.log("");

        // Adding by rewriting list of objects.
        let temp = [];
        if (activeProfile.length > 0) {
            temp = JSON.parse(getValue(incomeStorage, activeProfile));
        }
        temp.push(income);
        setValue(incomeStorage, activeProfile, JSON.stringify(temp));
    }
}

// Forecast expected income based on monthly income (additional average income of each month last year?).
function incomeForecast(months) {

}

// ________________________________________________________________________________
// Accounting:
function accounting() {

}

//
function balanceLastMonths(months) {
    
}

// Calculate monthly income - monthly expenditures and return difference.
function balanceOfMonthlyContributions(months) { // months?
    
}

//
function balanceForecast() {
    
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
    testMode: testMode,
    userStorage: userStorage,
    entryStorage: entryStorage,
    incomeStorage: incomeStorage
}