// je déclare la constante qui contiendra l'export du module express
const express = require ("express");
// Création de la constante app qui va lancer l'application express
const app = express();
// création de la constante app qui va lancer l'application bodyParser
const bodyParser = require ("body-parser");
//On permet à l'application app d'utiliser la constante bodyParser
const mouluesRoute = require ("./src/routes/moulues_route");
const entieresRoute = require ("./src/routes/entieres_route");
const composeesRoute = require ("./src/routes/composees_route");
const poivresRoute = require ("./src/routes/poivres_route");
const baiesRoute = require ("./src/routes/baies_route");
const herbesRoute = require ("./src/routes/herbes_route");
app.use(bodyParser.json())
//on crée une route pour tester si tout va bien à l'adresse http://localhost:3000/ 
app.get("/", (request, response) =>{  
    response.send("Tout va bien")
});
app.use(mouluesRoute)
// on stocke le chemin du fichier où est défini les routes par lesquelles seront envoyées les requêtes du fichier entieres_controller.js
//la methode app.use sera utilisée pour placer les focntions midelware dans un chemin spécifique. Cela signifie que le middleare ne sera excuté que si la base du chemin correspond au chemin défini
app.use(entieresRoute)
// on stocke le chemin du fichier où on a définit les différentes routes par lesquelles les requêtes des methodes définies dans composees_controller passeront
//on rattache la constante composeesRoute à l'application app, afin que cette dernière puisse exploiter les différentes routes qui y sont définies poour chaque methode
app.use(composeesRoute)
// on stocke le chemin du fichier où sont définies les différenrtes routes par lesquelles les requêtes des différentes méthodes définies dans le dossir poivre_controller vont passer
// on rattache la constante que l'on vient de créer à l'application app afin qu'elle puisse l'exploiter
app.use(poivresRoute)
app.use(baiesRoute)
app.use(herbesRoute)

module.exports = app;















// sinon, on renvoit une erreur 404 et un message d'erreur
