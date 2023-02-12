//on importe le module express dont on aura besoin et on le stocke dans une constante
const express = require("express");
//on importe également le module fs dont on aura besoin et on le stocke dans une constante
const fs = require("fs");

//on crée la methode get data pour récupérer les données, on lui donne pour argument (request et response) et on l'exporte directement pour pouvoir l'exploiter
exports.getDataHerbes = (request, response) => {
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
            response.status(200).json(JSON.parse(data).herbes)
        }
    })
}

exports.getDataByIdHerbes = (request, response) => {
    // lecture du fichier catalogue pour récupérer les données et les stocker dans data
        fs.readFile("./src/model/catalogue.json", (err, data) =>{
    // si on rencontre une erreur de lecture on transmet un message d'erreur avec un statut 500
            if (err) {
                response.status(500).json ({
                    message:"Erreur de lecture",
                    error :err
                });
                // si les données sont trouvées, on les stocke dans une constante qui contiendra les données en version Json
            } else {
                const manipData = JSON.parse(data)
                const dataById = manipData.herbes.find(
                // on recherche ensuite l'id dans la constante avec le nom du tableau précis dans lequel les datas seront manipulés via la methode find et on vérifie si l'id correspondant au paramètre dans la route existe
                    (obj) => obj.id === parseInt(request.params.id)
                )
            if (dataById) {
                response.status(200).json(dataById)
            } else {
                response.status(404).json ({
                    message:"Pas d'objet avec cet Id",
                    error:err
                })
            }
            } 
        })
    }
exports.getDataByNameHerbes = (request, response) => {
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
             dataByName = manipData.herbes.find(
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
// on met en place la methode postDataEntieres en même temps qu'on l'exporte directement, afin de pouvoir l'importer et l'utiliser
exports.createDataHerbes = (request, response) => {
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
                existingData.herbes.push(request.body);
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
exports.putDataHerbes = (request, response) => {
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
            const dataById = existingData.herbes.find(
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

exports.deleteDataHerbes = (request, response) => {
      // lecture du fichier
       fs.readFile("./src/model/catalogue.json", (err, data) =>{
            //condition erreur de lecture 500
            if (err) {
               response.status(500).json({
                     message:"Erreur du lecture du fichier",
                       error : err
                   })
                   // sinon lecture du fichier
                 } else {        
                    // stockage de la donnée existante
                    const existingData = JSON.parse(data);
                    // recherche dans le fichier l'id correpondante
                    const dataById = existingData.herbes.find(
                        (obj) => obj.id === parseInt(request.params.id)
                    );
                    if (!dataById) {
                        //si on ne trouve pas un objet avec cet id => erreur 404 avec message
                        response.status(404).json ({
                            message : "Aucun objet avec l'id correspondant",
                            error:err
                        })
                    } else { 
                        //On réassigne la donnée existante sans paramètres
                        existingData.herbes = existingData.herbes.filter(
                            // Il recrée le tableau avec la donnée filtrée qui n'y figure donc plus
                            (obj) => obj.id != parseInt(request.params.id));
        
                            fs.writeFile("./src/model/catalogue.json", JSON.stringify(existingData), (writeErr) =>{
                                if (writeErr) {
                                    response.status(500).json ({
                                        message: "Erreur lors de la suppresion",
                                        error :err
                                    })
                                }else {
                                    response.status(200).json ({
                                        message: "Donnée effacée avec succès"
                                    })
                                }
        
                            })
                        
                    }
                 }
            })
 }