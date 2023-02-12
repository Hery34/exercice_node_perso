// on importe le module express dont on va avoir besoin et on le stocke dans une constante
const express = require ("express");
//On stocke dans une constante la fonction express.router dont on va avoir besoin pour créer des routes mais aussi de gérer les requêtes
const router = express.Router();
// on stocke dans une constante le chemin d'accès module poivres_controller où seront créees les différentes methodes requises par les routes
const poivres_controller = require ("../controller/poivres_controller");
// on crée ensuite les différentes routes par lesquelles on exécutera les différentes methodes
router.get("/poivres", poivres_controller.getDataPoivres);
router.get("/poivres/:id", poivres_controller.getDataByIdPoivres);
router.get("/poivres//:name",poivres_controller.getDataByNamePoivres);
router.post("/poivres/", poivres_controller.createDataPoivres);
router.put("/poivres/:id", poivres_controller.putDataPoivres);
router.delete("/poivres/:id", poivres_controller.deleteDataPoivres); 








//on exporte le module router, afin de pouvoir l'importer ailleurs
module.exports = router