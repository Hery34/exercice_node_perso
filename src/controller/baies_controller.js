//on importe le module express dont on aura besoin et on le stocke dans une constante
const express = require("express");
//on importe également le module fs dont on aura besoin et on le stocke dans une constante
const fs = require("fs");

//on crée la methode get data pour récupérer les données, on lui donne pour argument (request et response) et on l'exporte directement pour pouvoir l'exploiter
exports.getDataBaies = (request, response) => {
    // on lit le fichier ciblé, via la methode readFile du module fs en ciblant le fichier où sont stockées les données en lui donnant 2 arguments (err, et data)
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        // si la lecture du fichier échoue, on envoie en réponse un statut 500 et un message signalant l'erreur de lecture
        if (err) {
            response.status(500).json ({
                message :"Il y a eu une erreur lors de la lecture du fichier",
                error : err
            })
        }// si la lecture du fichier réussit, on renvoie un statut 200 et le contenu du tableau ciblé en données Json via la methode parse
        else {
            response.status(200).json(JSON.parse(data).baies)
        }
    })
}

// on crée la methode pour récupére l'objet ciblé avec son id et on déclare ses 2 arguments request et response
exports.getDataByIdBaies = (request, response) => {
    // On procède à la lecture du fichier ciblé par son chemin avec la methode readfile du module fs avec 2 arguments
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        //Argument 1 la lecture du fichier a échoué, on renvoit un statut 500 avec un message d'erreur et on arrête le traitement
        if (err) {
            response.status(500).json ({
                message:"Erreur lors de la lecture du fichier!",
                error : err
            })
        } else {
            // argument 2, la lecture a réussi, on stocke les données récupérées et converties en format de tableau Javascript dans une constante pour pouvoir les manipuler
            const manipData = JSON.parse(data)
            //on va applique à cette constante la methode find et on va stocker le resultat éventuel dans une nouvelle constante
            const dataById = manipData.baies.find (
                //la methode find va rechercher une comparaison entre l'id ciblé et les informations contenues dans le requete qui contiennent l'id recherchee après avoir convertit les éléments chiffrés de la requête sous format Javascript, on utilisera l'attribu param.request et la methode ParseInt
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si la donnee databyId existe, on revoit un statut 200 avec les données 
            if (dataById) {
                response.status(200).json(dataById)
            }else {
                //sinon, cela signifie que la recherche n'a rien donné, on envoit un statut 404 avec un message mentionnant la recherche infructueuse
                response.status(404).json ({
                    message:"Aucun objet portant cet id n'a été trouvé!"
                })
            }

        }
    })
}

exports.getDataByNameBaies = (request, response) => {
    // on a procéder à la lecture du fichier ciblé par la methode readfile contenu dans le module fs avec pour arguments err et data
        fs.readFile("./src/model/catalogue.json", (err, data) => {
    //si la lecture echoue on renvoie un statut 500 avec un message d'erreur
            if (err) {
                response.status(200).json ({
                    message :" La lecture du fichier a échoue",
                    error: err
                })
                //si la lecture aboutie, on récupère les données converties en format java via la methode JSON parse et on la stocke dans une constante
            } else {
                manipData = JSON.parse(data)
                //On applique la methode find à la constante
                dataByName = manipData.baies.find(
                    // dans cette methode on va chercher une correspondance entre un nom et les données récupérées dans la requete html mais qui seront converties au format Java via la methode parse
                    obj => obj.name === request.params.name
                )
                    // si une correspondance est trouvée, on renvoit un status 200 avec les propriétés de l'objet converties
                    if(dataByName) {
                        response.status(200).json(dataByName)
                    } else {
                        // sinon, on renvoit un statut 404 avec un message d'erreur et on met fin au traitement
                        response.status(404).json ({
                            message:"Aucun produit avec ce nom n'a été trouvé"
                        })
                    }
            }
        })
    }


exports.createDataBaies = (request, response) => {
        // lecture du fichier
            fs.readFile("./src/model/catalogue.json", (err, data) => {
                if(err) {
                    response.status(500).json({
                        //erreur 500 si le fichier ne peut être lu
                        message :"Erreur de lecture du fichier",
                        error :err
                    })
                } else {
                    // sinon, on récupère les données et on les stock dans une variable et on la rend manipulable en json
                        const existingData = JSON.parse(data);
                    // on rajoute la donnée à partir de ce qu'on a écrit dans le body et dans le tableau que l'on vise
                        existingData.baies.push(request.body);
                    // on réécrit le fichier et on le transforme en chaîne de caractères
                        fs.writeFile("./src/model/catalogue.json", JSON.stringify(existingData),(writeErr)=>{
                            if (writeErr) {
                         // si il y a  une erreur on renvoit le statut 500 avec le message d'erreur       
                                response.status(500).json ({
                                    message :"Erreur d'écriture",
                                    error:err
                                })
                            } else {
                                //on revoit un statut 200 avec la réponse
                                response.status(200).json ({
                                    message: "La data a été rajoutée avec succès."
                                })
                            }
                        })
                }
            })
        }

exports.putDataBaies = (request, response) => {
        // lecture du fichier
         fs.readFile("./src/model/catalogue.json", (err,data) =>{
            if (err) {
                //condition erreur de lecture 500
                response.status(500).json ({
                    //afficher message et erreur
                    message:"Erreur de lecture du fichier",
                    error:err,
                })
            } else {
                //stocker le données existantes
                const existingData = JSON.parse(data);   
        // rechercher via l'id si le paramètre existe
                const dataById = existingData.baies.find(
                    (obj) => obj.id === parseInt(request.params.id)
                );
                // si on ne trouve pas l'onjet avec l'id, reponse 404 et message d'erreur
                if (!dataById) {
                    response.status(404).json({
                        message :"Aucun objet avec cet id",
                        error:err
                    })
                    // sinon on trouver l'id avec l'objet
                } else {
                     //La nouvelle donnée sera la requête exécutée dans thunder client
                    dataById.name=request.body.name;
                    // Réécriture de la donnée et sauvegarde
                    fs.writeFile("./src/model/catalogue.json", JSON.stringify(existingData),(writeErr) => {
                      // si erreur, statut 500 et message d'erreur
                      if (writeErr) {
                        response.status(500).json({
                            message: "Erreur lors de l'écriture du fichier",
                            error:err
                        })
                      } else {
                        response.status(200).json ({
                            message :"Écriture ajoutée avec succès"
                        })
                      }
                    }
         )}
            }
         })
}
// on met en place la methode deleteDataEntieres avec pour argument une requete et une reponse, on exporte directement cette methode pour pouvoir la récupérer dans un autre fichier
exports.deleteDataBaies = (request, response) => {
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
                const dataById = existingData.baies.find(
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
                        existingData.baies = existingData.baies.filter(
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
    