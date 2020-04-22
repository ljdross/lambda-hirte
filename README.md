# Lambda Hirte

* Aufgabe: Lambda-Kalkül / Lemminge
* Chat: https://chat.mtv.tu-berlin.de/modysy-2020sose/channels/lambda-hirte
* Technologie: Phaser 3 + TypeScript
* Scrum-Master: @charzwin
* Product-Owner: @manneken
* Merge-Request-Manager/DevOps: @arsvivendi
* Team: @manneken, @charzwin, @ali, @arsvivendi, @kim_jana, @lennart

Lambda Hirte ist ein Puzzle-Spiel, wo der Spieler (Hirte) seine Schafe so schnell wie möglich ins Ziel bringen muss. 
Der Spieler nutzt Teleporter, welche aus Lambda Termen bestehen, zum Transport.
Das Berechnen (Teleportieren) wird über verschieden Ebenen dargestellt, wodurch die Verschachtelung der Lambda Terme veranschaulicht wird. Durch das Teleportieren könnten die Schafe z.B. vervielfacht werden.

Test:
`npm run test` triggers pretest, test and postest (see package.json scripts)

Start:
`sudo npm run start` (root permission needed for default port 80)

Server:
http://35.246.188.207/
