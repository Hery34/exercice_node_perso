const app = require("./app");

const port = 3000
// On demande à Express d'exposer tout son contenue enregistré sur le port 3000 du serveur qui accueil l'application
app.listen(port, () => {
    console.log("l'application tourne bien au port 3000")
})