const fs= require("fs");
const express = require("express");

exports.createDataMoulues = (request, response) => {
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
                    existingData.moulues.push(request.body);
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

exports.getAllDataMoulues = (request, response) => {
    //On utilise la methode readfile pour lire le fichier catalogue et on définit les 2 arguments
    fs.readFile("./src/model/catalogue.json", (err,data) => {
        // si erreur
        if(err) {
            //on renvoit une réponse statut 500 avec un message
            response.status(500).json ({
                message :"Erreur de lecture",
                error: err
            });
            //sinon, cela signiie que le fichier a bien été lu
        } else {
            // on renvoit un statut 200 et on transforme en format json, via la methode JSON.parse
            response.status(200).json(JSON.parse(data).moulues)
        }
    })
}

exports.getDataByIdMoulues = (request, response) => {
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
                const dataById = manipData.moulues.find(
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


exports.putDataMoulues = (request, response) => {
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
            const dataById = existingData.moulues.find(
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

exports.deleteDataMoulues = (request, response) => {
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
                    const dataById = existingData.moulues.find(
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
                        existingData.moulues = existingData.moulues.filter(
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