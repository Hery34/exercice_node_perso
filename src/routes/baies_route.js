// on importe le module express dont on va avoir besoin et on le stocke dans une constante
const express = require ("express");
//On stocke dans une constante la fonction express.router dont on va avoir besoin pour créer des routes mais aussi de gérer les requêtes
const router = express.Router();
// on stocke dans une constante le chemin d'accès module poivres_controller où seront créees les différentes methodes requises par les routes
const baies_controller = require ("../controller/baies_controller");
// on crée ensuite les différentes routes par lesquelles on exécutera les différentes methodes
router.get("/baies", baies_controller.getDataBaies);
router.get("/baies/:id", baies_controller.getDataByIdBaies);
router.get("/baies//:name", baies_controller.getDataByNameBaies);
router.post("/baies", baies_controller.createDataBaies); 
router.put("/baies/:id", baies_controller.putDataBaies); 
router.delete("/baies/:id", baies_controller.deleteDataBaies); 


module.exports = router