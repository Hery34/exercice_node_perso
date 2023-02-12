// on importe le module express dont on va avoir besoin et on le stocke dans une constante
const express = require ("express");
//On stocke dans une constante la fonction express.router dont on va avoir besoin pour créer des routes mais aussi de gérer les requêtes
const router = express.Router();
// on stocke dans une constante le chemin d'accès module poivres_controller où seront créees les différentes methodes requises par les routes
const herbes_controller = require ("../controller/herbes_controller");
// on crée ensuite les différentes routes par lesquelles on exécutera les différentes methodes
router.get("/herbes", herbes_controller.getDataHerbes);
router.get("/herbes/:id", herbes_controller.getDataByIdHerbes);
router.get("/herbes//:name", herbes_controller.getDataByNameHerbes);
router.post("/herbes", herbes_controller.createDataHerbes); 
router.put("/herbes/:id", herbes_controller.putDataHerbes);
router.delete("/herbes/:id", herbes_controller.deleteDataHerbes); 






module.exports = router