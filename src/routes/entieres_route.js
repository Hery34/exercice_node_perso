//on définit les constantes des modules exportés dont on aura besoin pour faire tourner le routeur
//la constante express relative au module expres
const express = require ("express");
//la constante router relative à la fonction express.router(), cette fonction est utilisée quand on veut créer une nouvelle route pour gérer des requêtes
const router = express.Router();
// la constante entieres_controller qui va stocker l'export du chemin vers moulues_controller.js, le fichier js qui contient les app à exécuter
const entieres_controller = require ("../controller/entieres_controller");

// creation de la route qui va permettre d'accéder à la requête qui renvoit en réponse toutes les données du tableau entieres en rappelant le controller qui le gère et en renseigant le chemin du fichier
router.get("/entieres", entieres_controller.getAllDataEntieres);
router.get("/entieres/:id", entieres_controller.getDataByIdEntieres);
router.post("/entieres", entieres_controller.createDataEntieres);
router.put("/entieres/:id", entieres_controller.putDataEntieres); 
router.delete("/entieres/:id", entieres_controller.deleteDataEntieres);

//on exporte le module router afin qu'il puisse être rappelé dans le fichier app.js 
module.exports = router