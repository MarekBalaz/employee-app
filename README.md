Employee-List App

Opis aplikacie:
Employee-List applikacia umoznuje prezerat a pridavat zamestnancov do urceneho listu. Zaroven umoznuje si precitat o firme alebo ju kontaktovat

Endpointy:
- / - Na domovskom endpointe sa nachadza zakladna funkcia aplikcaie, ktorou je prezeranie a pridavanie zamestnancou
- /aboutus - Na aboutus endpointe sa nachadza kratky uvod o firme a aplikacii
- /contact - Na contact endpointe sa nachadza kontaktovaci formular na moznu komunikaciu

Dependencies:
- Bootstrap 5.0
- Angular 17.0.1

Pouzite moduly na DI:
- HttpClientModule
- RouterModule

Instalacia aplikacie:
- git clone {repoUrl}
- npm install -g @angular/cli
- ng serve
aplikacia bude dostupna na https://localhost:4200 

API SERVER KOMPLIKACIA
Kvoli proxy nastaveniu servera je mozne vykonat iba cca 2-3 http requesty za jednu minutu. Toto vie vytvorit komplikacie pri rychlom slede akcii t.j.
nacitanie listu zamestnancov a naslednom kliknuti na detail zamestnanca v rozmedzi par sekund
