// Aufrufbares Menü, das dem USer erlaubt auf weitere Funktionen zuzugreifen
function menu() {
    console.log("Was möchten Sie machen"); // später vielleicht egnauer nachfragen 
    console.log("1. Finanzen überblicken");
    console.log("2. Rechnung hinzufügen");
    console.log("3. Rechnungen anzeigen");
    console.log("4. Rechnung ändern");
    console.log("5. Rechnung löschen");
    console.log("0. Haushaltsbuch schließen");

    let userinput = Number(prompt("Ihre Auswahl: "));
    if(!isNaN(userinput)) {
      if(userinput === 1){
        console.log("Hier ist Ihr Finanzüberblick.");
      }
      else if(userinput === 2){
        console.log("Fügen Sie Ihre Rechnung hinzu.");
      }
      else if(userinput === 3){
        console.log("Hier sind alle Ihre Rechnungen.");
      }
      else if(userinput === 4){
        console.log("Welche Rechnung möchten Sie ändern?");
      }
      else if(userinput === 5){
        console.log("Welche Rechnung möchten Sie entfernen?");
      }
      else if(userinput === 0){
        return;
      }
      else {
        console.log("Bitte 2gültige Eingabe.");
      }
    }
    else {
      console.log("Bitte 1gültige Eingabe.");
      
    }
    menu();

}

