# Lambda Hirte

* Aufgabe: Lambda-Kalkül / Lemminge
* Chat: https://chat.mtv.tu-berlin.de/modysy-2020sose/channels/lambda-hirte
* Technologie: Phaser 3 + TypeScript
* Scrum-Master: @charzwin
* Product-Owner: @manneken
* Merge-Request-Manager/DevOps: @arsvivendi
* Team: @manneken, @charzwin, @ali, @arsvivendi, @kim_jana, @lennart

Lambda Hirte ist ein Puzzle-Spiel, wo der Spieler (Hirte) Schafe ins Ziel bringen muss. Der Spieler soll so selten wie möglich den Teleport-Knopf drücken. 
Der Spieler nutzt Teleporter, um die Schafe zu transportieren. Die Teleporter sind fertige Lambda-Terme, die eine Abbildung von Tiles zu Tiles darstellen. (Bsp.: Grass->Grass)
Es können Teleporter gestapelt werden (Also ein Lambda-Term als Eingabe von einem anderen Lambda-Term). Jedes Level kann mit einem Teleporter-Knop-druck gelöst werden.


Test:
`npm run test` triggers pretest, test and postest (see package.json scripts)

Start:
`sudo npm run start` (root permission needed for default port 80)

Server:
http://35.246.188.207/
