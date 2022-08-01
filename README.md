# Lambda Hirte
Lambda Hirte is a cute HTML5 game for your browser. It was developed with the Phaser 3 game framework in TypeScript.

It was a university project to practice Scrum and CI/CD. The focus of this project was not on game design even though we learned a lot during the process.

## Install
### Dependencies
You'll need to have `node` and `npm` installed on your machine. If you're using `snap`, you can install it with the following command:
```bash
sudo snap install node --classic
```
Otherwise, refer to [npm Docs on how to install `node` and `npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
### Install
```bash
git clone https://github.com/ljdross/lambda-hirte.git
cd lambda-hirte
npm install
```

## Run
```bash
sudo npm run start # without sudo on PowerShell
```
Your terminal will produce a lot of output so you might have to scroll up to find a line saying: `ℹ ｢wds｣: Project is running at http://127.0.0.1:8080/`. Open this IP address either by typing it into the address bar of your (local) browser or by clicking on it.

## Play
The goal is to bring all sheep home.

To achieve this, you need to use teleporters:

Choose a teleporter from the right side of the screen by clicking on it or by pressing the corresponding number on your keyboard (`1` for the first, `2` for the second, etc.). Then, place it on the map by clicking on the desired tile of the map. You can also stack teleporters on top of each other. Sheep will automatically stop once they encountered a teleporter.

Then, press `Enter` or the teleporter button on the right to activate all teleporters simultaneously. (Sheep will only get teleported if teleporters get activated while they're standing on them.)

All levels can be solved by activating the teleporters only once! Can you do that?

---

Below is the original README:
# Lambda Hirte

* Aufgabe: Lambda-Kalkül / Lemminge
* Chat: https://chat.mtv.tu-berlin.de/modysy-2020sose/channels/lambda-hirte
* Technologie: Phaser 3 + TypeScript
* Scrum-Master: @charzwin
* Product-Owner: @manneken
* Merge-Request-Manager/DevOps: @arsvivendi
* Team: @manneken, @charzwin, @ali, @arsvivendi, @kim_jana, @lennart

Lambda Hirte ist ein Puzzle-Spiel, wo der Spieler (Hirte) Schafe ins Ziel bringen muss. 
Der Spieler nutzt Teleporter, um die Schafe zu transportieren. Die Teleporter sind fertige Lambda-Terme, die eine Abbildung von Tiles zu Tiles darstellen. (Bsp.: Grass->Grass)  
Der Spieler soll so selten wie möglich den Teleport-Knopf drücken.
Es können Teleporter gestapelt werden (Also ein Lambda-Term als Eingabe von einem anderen Lambda-Term). Jedes Level kann mit einem Teleporter-Knop-druck gelöst werden.


Test:
`npm run test` triggers pretest, test and postest (see package.json scripts)

Start:
`sudo npm run start` (root permission needed for default port 80)

Server:
http://35.246.188.207/

Credits:

Simon, Daniel für Texturen

Musik: Polka aus Spool von Bio Unit/Metre


Lizenz: https://creativecommons.org/licenses/by-nc-sa/4.0/

