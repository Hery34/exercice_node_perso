// On importe le module express que l'on va utiliser et on le stocke dans une constante
const express = require ("express");
//ensuite on stocke, dans une constante, la fonction expressRouter, qui va nous permettre de générer de créer de nouvelles routes et aussi les requêtes
const router = express.Router();
// on crée ensuite la constante composees_controller qui va stocker le chemin d'accès au fichier controller ou seront créees les différentes methodes de gestion de requêtes créees
const composees_controller = require ("../controller/composees_controller");
//création de la route qui va renvoyer en reponse à la requete toutes les données du tableau composees
router.get("/composees", composees_controller.getAllDataComposees);
router.get("/composees/:id", composees_controller.getDataByIdComposees);
router.get("/composees//:name", composees_controller.getDataByNameComposees);
router.post("/composees", composees_controller.createDataComposees);
router.put("/composees/:id", composees_controller.putDataComposees);
router.delete("/composees/:id", composees_controller.deleteDataComposees);

module.exports = router