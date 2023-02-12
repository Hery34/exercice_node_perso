const fs = require("fs");
const express = require("express");

exports.getAllDataEntieres = (request, response) =>{
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        if(err) {
            response.status(500).json ({
                message:"Erreur lors de la la lecture du fichier",
                error:err
            });
        } else {
            response.status(200).json(JSON.parse(data).entieres)
        }
    })
}
// on met en place la methode getdataby id, spécifique au tableau entier avec les  arguments request et response qu'on va directement exporter pour pouvoir l'utliser en import
exports.getDataByIdEntieres = (request, response) => {
// on procède à la lecture du fichier catalogue, en renseignant le chemin précis grâce à la methode readfile du module fs
// la lecture du fichier aboutira soit à une erreur, soit à une lecture réussit    
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        // si il y a une erreur, la requête renverra un status 500 et un message d'erreur relatif à la lecture du fichier
        if (err) {
            response.status(500).json ({
            message : "Erreur lors de la lecture du fichier"
        })
        } else {
            // si la lecture du fichier est réussi, les données sont récupérées et stockées dans une constante sous le format Json
               const manipData = JSON.parse(data);
            // on stocke ensuite les données du tableau "entieres" ciblé dans le fichier data dans une constante et on applique à cette constante la methode find
               const dataById = manipData.entieres.find (
                // si un objet avc l'id recherché est trouvé, on récupère les paramètres qu'on convertit en chaîne de caraatère grâce à la methode parseInt pour pouvoir être affichés dans la console 
                (obj) => obj.id === parseInt(request.params.id)
               )
            // si la constante dataById existe, cela signifie que la methode find lui a attribué une valeur par correspondace d'Id   
               if (dataById) {
                response.status(200).json(dataById);
               } else {
            // si la constante n'existe pas, c'est que la methode find n'a rien crée, on renvoit un statut 200 et un message correspondant
                response.status(500).json ({
                    message : "Aucune donnée portant cette id n'a été trouvée",
                    error:err
                })
               }
        }
    })
} 
// on met en place la methode postDataEntieres en même temps qu'on l'exporte directement, afin de pouvoir l'importer et l'utiliser
exports.createDataEntieres = (request, response) => {
// on commence par la lecture du fichier catalogue.json, par la methode readFile du module Fs qu'on atteint en renseignant précisément son chemin d'accès
    fs.readFile("./src/model/catalogue.json", (err, data) =>{
//si la lecture du fichier echoue, on renvoie un statut 500 avec un message spécifique d'erreur
        if (err) {
            response.status(500).json ({
                message: "Erreur lors de la lecture du fichier",
                error : err
            })
        }else {
            // si la lecture du fichier réussit, on stocke le fichier convertit en format Json dans une constante afin de pouvoir la manipuler  
            const existingData = JSON.parse(data);
            //Les données sont alors ajoutées à partir des données saisies dans le champ body de thunder client grace à l'outil request du module body.parser 
            existingData.entieres.push(request.body);
            //on réécrit le fichier (grâce à ma methode writefile du module fs)contenu dans la constante sous forme de chaines de caractères (son format originel)
            fs.writeFile("./src/model/catalogue.json", JSON.stringify(existingData), (writeErr) => {
                if (writeErr){
                    // si il y a une erreur, on renvoit le statut 500 avec le message d'erreur
                    response.status(500).json ({
                        message: "erreur lors de l'écriture du fichier",
                        error : err
                    })
                } else {
                    response.status(200).json ({
                        // sinon cela signifie que la réecriture a réussi, on affiche un message de confirmation
                        message: "la data a été rajoutée avec succès!"
                    })
                }
            })             
        }
    })
}

exports.putDataEntieres = (request, response) =>{
//On lit le fichier par la methode readfile du module fs en suivant le chemin source du fichier
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        if (err) {
            response.status(500) ({
                // si la lecture du fichier echoue, un message renvoyant le statut 500 avec un message d'erreur apparaît
                message :"Erreur lors de la lecture du fichier"
            })
            // sinon, les données issues de la lecture du fichier cible sont stockées dans une constante après avoir été converties au format JSON par la methode Parse pour pouvoir être manipulées
         } else {
            const existing_data = JSON.parse(data)
            //on cherche l'id de l'item dont on veut modifier les propriétés par la methode find, le resultat éventuel de la rechecher sera directement stockée dans une constante 
            const dataById = existing_data.entieres.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //Si aucun id correpondant n'est trouvé, un statut 404 avec un message informant de l'impossibilité de trouver l'id apparaît
                if(!dataById) {
                    response.status(404).json ({
                        message : "Aucun objet trouvé avec l'Id correspondant",
                        error :err
                    })
                } else { 
                    // sinon, l'id trouvé est stocké dans une constante avec ses propriétés
                    // les nouveaux paramètres saisis dans le thunder client sont récupérés via la methode request.body du module body parser et stockés dans une nouvelle constante
                    dataById.name = request.body.name
                    //On procède ensuite à la réécriture du fichier 
                    fs.writeFile("./src/model/catalogue.json", JSON.stringify(existing_data), (writeErr) => {
                        //Si l'écriture du fichier échoue, on renvoie une erreur 500 et un message correspondant
                        if(writeErr) {
                            response.status(500).json ({
                                message :"La réécriture du fichier a échoué",
                                error : err
                            })
                        } else {
                            //Sinon, cela signifie que le fichier a bien été réecrit avec les modifications, un message dans ce sens est envoyé.
                            response.status(200).json ({
                                message: "La réécriture du fichier a bien été effectuée",
                            })
                        }
                    })
                } 
            
         }
    })
}
// on met en place la methode deleteDataEntieres avec pour argument une requete et une reponse, on exporte directement cette methode pour pouvoir la récupérer dans un autre fichier
exports.deleteDataEntieres = (request, response) => {
//lecture du fichier ciblé via la methode fs du module readFile: on spécifie le chemin exact du fichier à lire et on déclare les 2 arguments de la fonction, err et data
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        //option 1: la lecture du fichier échoue => on envoit un statut 500 avec un message d'erreur de lecture et fin du traitement
        if (err) {
            response.status(500).json ({
                message : "La lecture du fichier a échoué !",
                error : err
            })
        } else {
            //option 2: la lecture est réussi on envoit un statut 200 et les données récupérées sont converties en tableau javascript(ils sont au format tableau car c'était leur format d'origine en Json) (pour pouvoir être manipulées) et stockées dans une constante
            const existingData = JSON.parse(data);
            //on cherche via la methode find la correspondance entre l'id que l'on cible dans la constante que l'on vient de créer en précisant le tableau "entieres" où on le cherche
            const dataById = existingData.entieres.find(
                //On récupère ensuite dans la route spécifiée lors de la requête, le numéro de l'id que l'on souhaite comparer et on le convertit en nombre entier pour qu'il soit lisible en javascript
                (obj) => obj.id === parseInt(request.params.id)
            )
                //option 1:  on ne trouve pas l'objet avec une idée correspondante: on renvoit un statut 404 et un message signalant la recherche infructueuse => fin du traitement
                if (!dataById) {
                    response.status(404).json ({
                        message:"Aucune donnée avec cet id n'a été trouvé!"
                    })
                    //option 2: on trouve l'id et l'id et ses propriétés sont stockées dans une constante avec comme nouvelle valeur le tableau d'origine auquel on aura appliqué la methode filter. le call back de cette methode sera l'exclusion de l'objet Json portant l'Id que l'on a ciblé
                } else {
                    existingData.entieres = existingData.entieres.filter(
                        (obj) => obj.id != parseInt(request.params.id)
                    );
                    //On écrit le tableau via la methode writeFile du module fs en spécifiant le chemin cible du fichier à écraser et après avoir convertie la constante en chaine de caractères, via la methode stringify
                    fs.writeFile("./src/model/catalogue.json", JSON.stringify(existingData), (writeErr) => {
                        // si l'écriture a échoué, on renvoit un statut 500 avec un message d'erreur et on met fin au traitement
                        if (writeErr) {
                            response.status(500).json ({
                                message:"La suppresion n'a pas aboutie!",
                                error: err
                            })
                        }else {
                            // si l'écriture a réussi, on renvoit un message 200 avec un message de réussite.
                            response.status(200).json ({
                                message : "La suppression a été effectuée!"
                            })
                        }
                    })
                }
        }
    })
}























