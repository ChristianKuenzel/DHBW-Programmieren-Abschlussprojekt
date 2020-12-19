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
    name: "Standard",
    password: "Not set!",
    balance: 0,
    lastOnline: NaN,
    monthlyIn: [],
    monthlyOut: []
}

// ________________________________________________________________________________
// Listing of main functions:
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
    let testObject = user;
    testObject.name = "test"
    setValue(userStorage, "test", JSON.stringify(testObject));
    activeProfile = testObject;

    // Check if user exists.
    try {
        let testVar = getValue(userStorage, activeProfile.name);
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
    let testEntry = entry;
    let date = new Date();
    let char = "x";

    for (let i = 0; i < value; i++) {
        testEntry.date = date;
        testEntry.category = char; // Change more values ?
        testEntry.amount = i;
        testList.push(testEntry);
    }

    setValue(entryStorage, activeProfile.name, JSON.stringify(testList));


    // ...


    // End of test function.
    console.log("testMode: FINISH")
} // UNFINISHED

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

// Get the chosen profile/entry to work with.
function getValue (storage, key) {
    return storage.getItem(key)
}

// Create a new profile/entry to work with.
function setValue (storage, key, value) {
    storage.setItem(key, value);
}

// Set lastOnline to new Date today.
function setLastOnline() {
    let today = new Date();
    activeProfile.lastOnline = new Date(today.getTime());
    // Set profile object to save changes in monthlyIn/Out && balance.
    setValue(userStorage, activeProfile.name, JSON.stringify(activeProfile));
}

// Update %monthlyContributionList% and add elements to contribution %storage% per month from %lastOnline% until now.
function updateContributionList(monthlyContributionList, storage) {
    // activeProfile
    // monthlyIn monthlyOut
    // storage
    // calculateLastPeriod

} // Parameter ? // IMPLEMENTATION

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
        console.log(JSON.parse(getValue(userStorage, userStorage.key(i))).name);
    }
    console.log("");

    // Chose an existing profile. Else try again.
    while (true) {
        // User input.
        let userName = readlineSync.prompt();
        console.log("");

        // Check if input is correct.
        if (userName.length > 0) {
            // Back.
            if (userName === "!") {
                break
            }

            // Check if userProfile exists.
            let userObject = JSON.parse(getValue(userStorage, userName));

            if (userObject === null) {
                console.log("Your input: " + userName);
                console.log("This user doesnt exist!");
                console.log("");
            } else if (userObject.name === userName) {
                console.log("You have chosen " + userName + "'s profile!");
                activeProfile = userObject;
                break
            } else {
                console.log("Error! -> chooseProfile");
            }
        // If input is empty.
        } else {
            console.log("Your field is empty. Please enter at least one character!");
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

        // Check if input is correct.
        if (userName.length > 0) {
            // Back.
            if (userName === "!") {
                break
            }

            // Check if userProfile already exists.
            let userTest = JSON.parse(getValue(userStorage, userName));

            // If userProfile doesnt exist. Create a new one.
            if (userTest === null || userTest.name !== userName) {
                // Hint: Profile:Key -> userName; Value -> userName;
                let userObject = user;
                userObject.name = userName;

                // Set lastOnline to date of creation.
                let now = new Date();
                userObject.lastOnline = new Date(now.getTime());

                // Store profile.
                setValue(userStorage, userObject.name, JSON.stringify(userObject));

                // Already initialize storage files with empty array to prevent array[] = null.
                let emptyArray = [];
                setValue(entryStorage, userObject.name, JSON.stringify(emptyArray));
                setValue(incomeStorage, userObject.name, JSON.stringify(emptyArray));

                // Layout + userInfo.
                console.log("Your username: " + userName);
                console.log("");
                console.log("Userprofile successfully created!");
                console.log("");
                break

            } else {
                console.log("Your Input: " + userName);
                console.log("");
                console.log("Userprofile already exists! Please try another one ...");
                console.log("");
            }


        // If input is empty.
        } else {
            console.log("Your field is empty. Please enter at least one character!");
            console.log("");
        }
    }
}

// ________________________________________________________________________________
// Start menu functions and management functions.
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

        // User input.
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
                // Set profile object to save changes in monthlyIn/Out && balance.
                setValue(userStorage, activeProfile.name, JSON.stringify(activeProfile));
                // Quit application.
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

// Management menu navigation and function calls.
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
                addContribution(entryStorage);
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
                // Set profile object to save changes in monthlyIn/Out && balance.
                setValue(userStorage, activeProfile.name, JSON.stringify(activeProfile));
                // Quit application.
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

// Management menu navigation and function calls.
// Expenditure management:
function expenditureManagement() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Expenditure Management: Choose your task!");
    console.log("----------------------------------------------------------------------"); // 70.

    // Run until user wants back or leave.
    while(true) {
        // Print user Interface.
        console.log("[1] - Add monthly expenditure.");

        console.log("[2] - Expenditure last days.");
        console.log("[3] - Expenditure last months.");
        console.log("[4] - Expenditure last years.");

        console.log("[5] - Average expenditure per day.");
        console.log("[6] - Average expenditure per month.");
        console.log("[7] - Average expenditure per year.");

        console.log("[8] - Forecast future expenditures.");

        console.log("[9] - Back.");
        console.log("[0] - Leave.");
        console.log("");

        // Read user input.
        let input = readlineSync.prompt();

        // Evaluate user input.
        switch (input) {
            // Add monthly expenditure to monthlyOut list.
            case "1":
                addMonthlyContribution(activeProfile.monthlyOut);
                break
            // Calculate expenditure of the last days.
            case "2":
                printLastPeriod("day", "expenditure", entryStorage);
                break
            // Calculate expenditure of the last months.
            case "3":
                printLastPeriod("month", "expenditure", entryStorage);
                break
            // Calculate expenditure of the last years.
            case "4":
                printLastPeriod("year", "expenditure", entryStorage);
                break
            // Calculate average expenditure of the last days.
            case "5":
                printAverageLastPeriod("day", "expenditure", entryStorage);
                break
            // Calculate average expenditure of the last months.
            case "6":
                printAverageLastPeriod("month", "expenditure", entryStorage);
                break
            // Calculate average expenditure of the last years.
            case "7":
                printAverageLastPeriod("year", "expenditure", entryStorage);
                break
            // Forecast expenditure of the following months.
            case "8":
                printForecast("expenditure", entryStorage);
                break
            // Back to main menu.
            case "9":
                break
            // Leave.
            case "0":
                // Set profile object to save changes in monthlyIn/Out && balance.
                setValue(userStorage, activeProfile.name, JSON.stringify(activeProfile));
                // Quit application.
                process.exit();
                break // -> Ignore IDEA warning
            // Wrong input.
            default:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
        }

        // Go back to main menu.
        if (input === "9") {
            break
        }
    }
}

// Management menu navigation and function calls.
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
        console.log("[3] - Income last months.");
        console.log("[4] - Income last years.");
        console.log("[5] - Forecast future incomes.");
        console.log("[6] - Back.");
        console.log("[7] - Leave.");
        console.log("");

        // Read user input.
        let input = readlineSync.prompt();

        // Evaluate user input.
        switch (input) {
            // Add income to incomeStorage
            case "1":
                addContribution(incomeStorage);
                break

            // Add monthly income to monthlyIn list.
            case "2":
                addMonthlyContribution(activeProfile.monthlyIn);
                break

            // Calculate income of the last months.
            case "3":
                printLastPeriod("month", "income", incomeStorage);
                break

            // Calculate income of the last years.
            case "4":
                printLastPeriod("year", "income", incomeStorage);
                break

            // Forecast expenditure of the following months.
            case "5":
                printForecast("income", incomeStorage);
                break

            // Back to main menu.
            case "6":
                break

            // Leave.
            case "7":
                // Set profile object to save changes in monthlyIn/Out && balance.
                setValue(userStorage, activeProfile.name, JSON.stringify(activeProfile));
                // Quit application.
                process.exit();
                break // -> Ignore IDEA warning

            // User input is not valid.
            default:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
        }

        // Go back to main menu.
        if (input === "6") {
            break
        }
    }
}

// ________________________________________________________________________________
// Functions of entryManagement:
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
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile.name));

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
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile.name));
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
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile.name));
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
    let allEntries = JSON.parse(getValue(entryStorage, activeProfile.name));
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
        if (activeProfile.name.length > 0) {
            temp = JSON.parse(getValue(entryStorage, activeProfile.name));

            // Search through every element from entryStorage.
            for (let i = 0; i < temp.length; i++) {
                // Check if we use date as a Comparison factor.
                if (isNaN(newDate) === false) {
                    let dateObj = new Date(temp[i].date);
                    let inputDateObj = new Date(insertEntry.date);
                    if (dateObj.getDate() === inputDateObj.getDate() && dateObj.getMonth() === inputDateObj.getMonth() &&
                        dateObj.getFullYear() === inputDateObj.getFullYear()) {
                        output.push(temp[i]);
                    }
                }

                // Check if we use category as a Comparison factor.
                if (isNaN(category) === true) {
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
        if (activeProfile.name.length > 0) {
            temp = JSON.parse(getValue(entryStorage, activeProfile.name));

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
                setValue(entryStorage, activeProfile.name, JSON.stringify(newEntries));
            }

        } else {
            console.log("No entries available!");
        }
    }
}

// ________________________________________________________________________________
// Generalized management functions:
// Add Contributions.
function addContribution(storage) {
    // Layout.
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Adding contribution");

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
        console.log("");
        console.log("Your entry " + insertEntry.date.toLocaleString() + " " + insertEntry.category +
            " " + insertEntry.amount + " got integrated!");
        console.log("");

        // Adding by rewriting list of objects.
        let temp = [];
        if (activeProfile.name.length > 0) {
            temp = JSON.parse(getValue(storage, activeProfile.name));
        }
        temp.push(insertEntry);
        setValue(storage, activeProfile.name, JSON.stringify(temp));
    }
}

// Add monthly contributions.
function addMonthlyContribution(monthlyContributionList) {
    // Layout.
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Adding monthly contribution");

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
        console.log("");
        console.log("Your entry " + insertEntry.date.toLocaleString() + " " + insertEntry.category +
            " " + insertEntry.amount + " got integrated!");
        console.log("");

        // Adding by rewriting list of objects.
        monthlyContributionList.push(insertEntry);
    }
}

// Calculate the income of the last x months.
function calculateLastPeriod(time, period, storage) {
    // Get all entries from storage.
    let allElements = JSON.parse(getValue(storage, activeProfile.name));

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

    // Sum up all contributions within the date.
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

    // Calculate sum of contributions in the last x days.
    let sum = calculateLastPeriod(time, period, storage);

    // Layout + Print result.
    console.log("");
    console.log("The " + contributionType + " of the last " + time + " " + period + "'s are " + sum + " Euro.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// Calculate the average expenditure.
function printAverageLastPeriod(period, contributionType, storage) {
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

    // Calculate sum of contributions in the last x days.
    let sum = calculateLastPeriod(time, period, storage);

    // Calculating average contribution per period.
    let averagePerPeriod = sum / time;

    // Layout + Print result.
    console.log("");
    console.log("The average " + contributionType + " of the last " + time + " " + period + "'s are " + averagePerPeriod + " Euro.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// Prognosticate average contributions over the next months based on your average spending.
function printForecast(contributionType, storage) {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Calculating your " + contributionType + " for the following months.");
    console.log("----------------------------------------------------------------------"); // 70.

    // Read & check user input.
    let dataTime = readlineSync.question("Collect months of Data: ");
    if (dataTime === "!") {
        return
    } else if (isNaN(parseInt(dataTime)) === true || dataTime === undefined) {
        console.log("Input not valid! Only numbers allowed!");
        console.log("Your Input: " + dataTime);
        return
    }

    // Read & check user input.
    let forecastTime = readlineSync.question("Forecast months: ");
    if (forecastTime === "!") {
        return
    } else if (isNaN(parseInt(forecastTime)) === true || forecastTime === undefined) {
        console.log("Input not valid! Only numbers allowed!");
        console.log("Your Input: " + forecastTime);
        return
    }

    // Ask for contribution per month.
    let sum = calculateLastPeriod(dataTime, "month", storage);

    // Calculating average contribution per period.
    let averagePerPeriod = sum / dataTime;

    // Calculate difference over a year.
    let forecastPerPeriod = averagePerPeriod * forecastTime;

    // Layout + Print result.
    console.log("");
    console.log("Considering your average " + contributionType +"'s over the last " + dataTime +
        " months, we predict a change in " + contributionType + " of " + forecastPerPeriod +
        " within the next " + forecastTime + " months.");
    console.log("Considering your average " + contributionType +"'s over the last " + dataTime +
        " months, we predict an average " + contributionType + " of " + averagePerPeriod +
        " per month.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// ________________________________________________________________________________
// Accounting:
function accounting() {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Accounting: Choose your task!");
    console.log("----------------------------------------------------------------------"); // 70.

    // Run until user wants back or leave.
    while(true) {
        // Print user Interface.
        console.log("[1] - Balance last months.");
        console.log("[2] - Balance of monthly contributions.");
        console.log("[3] - Forecast balance of the following months.");
        console.log("[4] - Procentual proportion of monthly contributions related to single contributions.")
        console.log("[5] - Balances procentual in-/decrease in the last months.")
        console.log("[6] - Back.");
        console.log("[7] - Leave.");
        console.log("");

        // Read user input.
        let input = readlineSync.prompt();

        // Evaluate user input.
        switch (input) {
            //
            case "1":
                balanceLastMonths("month", "balance");
                break
            //
            case "2":
                balanceMonthlyContributions();
                break
            //
            case "3":
                balanceForecast("balance");
                break
            //
            case "4":
                balanceProcentualMonthlyToSingle("month", "balance");
                break
            //
            case "5":
                balanceProcentualChange("month", "balance");
                break
            // Back to main menu.
            case "6":
                break
            // Leave.
            case "7":
                // Set profile object to save changes in monthlyIn/Out && balance.
                setValue(userStorage, activeProfile.name, JSON.stringify(activeProfile));
                // Quit application.
                process.exit();
                break // -> Ignore IDEA warning
            // User input is not valid.
            default:
                console.log("Input not valid! Only numbers allowed!");
                console.log("Your Input: " + input);
                break
        }

        // Go back to main menu.
        if (input === "6") {
            break
        }
    }
}

// Calculate the balance of the last x months.
function balanceLastMonths(period, contributionType) {
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

    // Calculate sum of contributions in the last x months.
    let sumExpenditure = calculateLastPeriod(time, period, entryStorage);
    let sumIncome = calculateLastPeriod(time, period, incomeStorage);

    // Calculate balance.
    let balance = sumIncome - sumExpenditure;

    // Layout + Print result.
    console.log("");
    console.log("The " + contributionType + " of the last " + time + " " + period + "'s are " + balance + " Euro.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// Calculate monthly income - monthly expenditures and return difference.
function balanceMonthlyContributions() {
    // Initialize sum of monthlyIn/monthlyOut.
    let sumIn = 0;
    let sumOut = 0;

    // Calculate sum of all monthly income contributions.
    for (let i = 0; i < activeProfile.monthlyIn.length; i++) {
        sumIn += parseInt(activeProfile.monthlyIn[i].amount);
    }

    // Calculate sum of all monthly expenditure contributions.
    for (let i = 0; i < activeProfile.monthlyOut.length; i++) {
        sumOut += parseInt(activeProfile.monthlyOut[i].amount);
    }

    // Calculate difference = balance per month.
    let dif = sumIn - sumOut;

    // User info.
    console.log("");
    console.log("Your monthly income: " + sumIn + " Euro.");
    console.log("Your monthly income: " + sumOut + " Euro.");
    console.log("The balance of your monthly contributions is " + dif + " Euro.");
}

// Prognosticate average balance over the next months based on your average spending & earning.
function balanceForecast(contributionType) {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Calculating your " + contributionType + " for the following months.");
    console.log("----------------------------------------------------------------------"); // 70.

    // Read & check user input.
    let dataTime = readlineSync.question("Collect months of Data: ");
    if (dataTime === "!") {
        return
    } else if (isNaN(parseInt(dataTime)) === true || dataTime === undefined) {
        console.log("Input not valid! Only numbers allowed!");
        console.log("Your Input: " + dataTime);
        return
    }

    // Read & check user input.
    let forecastTime = readlineSync.question("Forecast months: ");
    if (forecastTime === "!") {
        return
    } else if (isNaN(parseInt(forecastTime)) === true || forecastTime === undefined) {
        console.log("Input not valid! Only numbers allowed!");
        console.log("Your Input: " + forecastTime);
        return
    }

    // Ask for contribution per month.
    let sumExpenditure = calculateLastPeriod(dataTime, "month", entryStorage);
    let sumIncome = calculateLastPeriod(dataTime, "month", incomeStorage);

    let sumBalance = sumIncome - sumExpenditure;

    // Calculating average contribution per period.
    let averagePerPeriodBalance = sumBalance / dataTime;

    // Calculate difference over a year.
    let forecastPerPeriodBalance = averagePerPeriodBalance * forecastTime;

    // Layout + Print result.
    console.log("");
    console.log("Considering your average " + contributionType +"'s over the last " + dataTime +
        " months, we predict a change in " + contributionType + " of " + forecastPerPeriodBalance +
        " within the next " + forecastTime + " months.");
    console.log("Considering your average " + contributionType +"'s over the last " + dataTime +
        " months, we predict an average " + contributionType + " of " + averagePerPeriodBalance +
        " per month.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

//
function balanceProcentualMonthlyToSingle(period, contributionType) {
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

    // Calculate sum of contributions in the last x months.
    let sumAllExpenditure = calculateLastPeriod(time, period, entryStorage);
    let sumAllIncome = calculateLastPeriod(time, period, incomeStorage);

    // Calculate balance of all contributions.
    let balanceAll = sumAllIncome - sumAllExpenditure;

    // Initialize sum of monthlyIn/monthlyOut.
    let sumMonthlyIncome = 0;
    let sumMonthlyExpenditure = 0;

    // Calculate sum of all monthly income contributions.
    for (let i = 0; i < activeProfile.monthlyIn.length; i++) {
        sumMonthlyIncome += parseInt(activeProfile.monthlyIn[i].amount);
    }

    // Calculate sum of all monthly expenditure contributions.
    for (let i = 0; i < activeProfile.monthlyOut.length; i++) {
        sumMonthlyExpenditure += parseInt(activeProfile.monthlyOut[i].amount);
    }

    // Calculate balance of all monthly contributions.
    let balanceMonthly = (sumMonthlyIncome * time) - (sumMonthlyExpenditure * time);

    // Calculate the percentage of monthly contributions to single contributions.
    let factorMonthlyToSingle = (balanceAll - balanceMonthly) / balanceMonthly * 100;

    // Calculate the percentage of monthly contributions to all contributions.
    let factorMonthlyToAll = balanceAll / balanceMonthly * 100;

    // Layout + Print result.
    console.log("");
    console.log("The percentage of monthly contributions related to single contributions is about " + factorMonthlyToSingle + " percent.");
    console.log("The percentage of monthly contributions related to all contributions is about " + factorMonthlyToAll + " percent.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.
}

// Calculate procentual change in balance.
//
// Von -> Bis, Bis < Heute, input = "$" -> until = 0
function balanceProcentualChange(period, contributionType) {
    // Layout
    console.log("----------------------------------------------------------------------"); // 70.
    console.log("Task: Calculating your procentual change in " + contributionType + " of the last " + period + "s.");
    console.log("----------------------------------------------------------------------"); // 70.

    // Read & check user input.
    let from = readlineSync.question("From: ");
    if (from === "!") {
        return
    } else if (isNaN(parseInt(from)) === true || from === undefined) {
        console.log("Input not valid! Only numbers allowed!");
        console.log("Your Input: " + from);
        return
    }

    // Read & check user input.
    let until = readlineSync.question("Until: ");
    if (until === "!") {
        return
    } else if (isNaN(parseInt(until)) === true || until === undefined) {
        console.log("Input not valid! Only numbers allowed!");
        console.log("Your Input: " + until);
        return
    }

    // Calculate sum of contributions in the last x months.
    let sumExpenditureFrom = calculateLastPeriod(from, period, entryStorage);
    let sumExpenditureUntil = calculateLastPeriod(until, period, entryStorage);

    let sumIncomeFrom = calculateLastPeriod(from, period, incomeStorage);
    let sumIncomeUntil = calculateLastPeriod(until, period, incomeStorage);

    // Calculate balance.
    let balanceFrom = sumIncomeFrom - sumExpenditureFrom;
    let balanceUntil = sumIncomeUntil - sumExpenditureUntil;

    // Percentual difference.
    let balanceFactor = balanceUntil / balanceFrom * 100;

    // Layout + Print result.
    console.log("");
    console.log("The percentual change in " + contributionType + " between from the last " + from + " " + period +
        " and until the last " + until + " " + period + " is about " + balanceFactor + " percent.");
    console.log("");
    console.log("----------------------------------------------------------------------"); // 70.

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
    setLastOnline: setLastOnline,
    updateContributionList: updateContributionList,
    userStorage: userStorage,
    entryStorage: entryStorage,
    incomeStorage: incomeStorage,
}