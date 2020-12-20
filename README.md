/*
Copyright 2020
DHBW Lörrach, Programmieren Abschlussprojekt: Hauswirtschaftsprogramm
David Schüler, Matr.Nr.: ?, <david.schueler97@gmail.com>, https://github.com/AranguZ
Christian Künzel, Matr.Nr.: 3889521, <kunibertgames@web.de>, https://github.com/ChristianKuenzel

Content undergoes the terms of chosen licenses. See GitHub for more:
https://github.com/ChristianKuenzel/DHBW-WebEngineering-Abschlussprojekt

README Datei

*/
// ______________________________________________________________________________________________
# DHBW Lörrach, Programmieren Abschlussprojekt: Hauswirtschaftsprogramm

#Anleitung:

Das Programm ist lokal mit node js auszuführen: "node main.js".
Es bietet die Möglichkeit den Testmodus zu verwenden, dieser schließt jedoch die Nutzung der
Profilfunktionen aus und ist eher für das interne Testen gedacht: "node main.js -test".

Zu Beginn haben sie die Möglichkeit ein Profil anzulegen oder, falls bereits vorhanden, eines auszuwählen.
Nach der Profilerstellung muss das Profil zusätzlich ausgewählt werden.
Weitere Instruktion zum Verlassen oder bedienen des Programms werden erläutert.

Im Anschluss an die Profilauswahl haben sie zugriff auf alle Funktionalitäten und Möglichkeiten des
Haushaltstagebuchs. Diese sind in verschiedene Management-Abschnitte aufgeteilt, in denen Sie die verschiedenen
Bereiche und Beiträge verwalten können.

Das Programm kann vom Hauptmenü aus verlassen werden. Eine Navigation durch das Menü erfolgt durch Eingabe.

Die meisten Funktionen sind selbsterklärend, dennoch finden sie im Abschnitt Funktionsumfang eine entsprechende
Auflistung.

#Struktur:

Importieren der Funktionen in die Main file.
Initialisieren und bei Bedarf erstellen der Speicher (Benutzer, Einträge/Ausgaben, Einkommen).
Prüfen des Programmaufrufs: Test-Modus / Normal-Modus.
Aufruf des Profilmenüs. Erstellen oder auswählen eines Profils.
Update der Speichereinträge. Einfügen der Daueraufträge in den Speicher bei Bedarf (Datum).
Start des Hauptmenüs. Auswahl aller Managementbereiche und Funktionen über das Navigationsmenü via Eingabe.
Ausführen der Funktionalitäten nach Bedarf.
Beenden der Verwaltung durch Verlassen des Programms über das Hauptmenü.
Speichern der veränderten Daueraufträge und des Zeitpunkts des letzten Logins.
Programmende.

#Funktionsumfang:

MUST-HAVE:

Persistente Datenspeicherung aller Profile und Einträge.

Profilerstellung und Profilauswahl.

Navigationsmenü zur Ausführung einzelner Funktionen.

Eintragverwaltung durch das Hinzufügen, Anzeigen, Suchen und Löschen von Einträgen.

Berechnung der Ausgaben der letzten n Tage, Monate, Jahre.
Berechnung der durchschnittlichen Ausgaben der letzten n Tage, Monate, Jahre.


NICE-TO-HAVE:

Programmaufruf im Testmodus für Entwicklungszwecke.

Persistente Datenspeicherung aller Daueraufträge und dem Zeitpunkt des letzten Logins.

Einzigartigkeit der Profile gewährleistet.
Auflistung aller verfügbaren Profile.

Ausführen von Daueraufträgen mithilfe des Updates von Speichereinträgen. 
Datumsberechnung um korrekten Eintrag trotz fehlender Online-Funktionalität gewährleisten zu können.

Navigationsmenü mit mehreren Ebenen und verschiedenen Verwaltungsbereichen.
Managementfunktionen zur Ausführung einzelner Funktionen.

Eintragverwaltung durch das Anzeigen mit verschiedenen Filtern.

Hinzufügen von einzelnen Einnahmen, sowie Daueraufträgen in Form monatlicher Einnahmen und Ausgaben.

Berechnung des Einkommens der letzten n Tage, Monate, Jahre.
Berechnung des durchschnittlichen Einkommens der letzten n Tage, Monate, Jahre.
Prognose zukünftiger Ausgaben und Einnahmen anhand der bisher zu berücksichtigen Finanzen.

Berechnung der Bilanzen der letzten n Monate.
Berechnung der Bilanzen der monatlichen Einnahmen und Ausgaben.
Prognose zukünftiger Bilanzen anhand der bisher zu berücksichtigen Finanzen.
Berechnung des Anteils monatlicher Einnahmen und Ausgaben zu den Gesamt-, wie auch Einzeleinnahmen/-ausgaben.
Berechnung der prozentualen Veränderung der Bilanzen hinsichtlich der vergangenen n Monate.

#Ende