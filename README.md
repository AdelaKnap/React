# DT210G Moment 3
I den här uppgiften har en webbplats skapats med React och Type Script.
Webbplatsen består av en startsida, en sida för att visa enskilda produkter, en inloggningssida, en sida för att skapa ny användare samt en sida för produkthantering.
Sidan för att hantera produkter är skyddad och kräver inloggning.

## Uppbyggnad
För att hantera autentisering används filen AuthContext med funktioner för att logga in, logga ut och kontrollera användarsessioner. AuthContext anävnds för att dela användarens autentiseringsinformationen mellan komponenter och där finns en Hook, useAuth-hook, för att få tillgång till dessa funktioner i hela applikationen.

På startsidan visas alla produkter som hämtas från ett API. Användaren kan söka efter produkter och resultaten filtreras dynamsikt och användaren kan klicka sig vidare på en produkt, och kommer då till en sida med information om bara den produkten.

På inloggningssida kan användaren logga in med användarnamn och lösenord. Om användaren redan är inloggad skickas man automatiskt till produktsidan. Vid lyckad inloggning navigeras användaren till produktsidan. Det finns också en länk för att skapa ett nytt användarkonto.

På registreringssidan används Yup för att validera användarnamn och lösenord innan de skickas till servern. Felmeddelanden från både validering och servern hanteras och visas för användaren.

På produktsidan hämtas produkter från servern och lagras i en state. Det finns funktioner för att redigera och radera produkter. Två komponenter används här:

  ProductForm - Används för att lägga till en ny produkt eller uppdatera en befintlig produkt. 

  ProductTable - Visar en tabell över alla produkter där man man kan välja att redigera eller radera. 

Utöver dessa komponenter finns även komponeter för header, footer och en komponent som sköter den skyddade sidan.

## Skapad av:
Adela Knap adkn2300@student.miun.se
