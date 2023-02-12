//on importe le module express dont on aura besoin et on le stocke dans une constante
const express = require("express");
//on importe également le module fs dont on aura besoin et on le stocke dans une constante
const fs = require("fs");

//on crée la methode get data pour récupérer les données, on lui donne pour argument (request et response) et on l'exporte directement pour pouvoir l'exploiter
exports.getDataPoivres = (request, response) => {
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
            response.status(200).json(JSON.parse(data).poivres)
        }
    })
}

//On crée la methode qui permettre d'exécuter notre requête getdataByid et on lui donne comme arguments response et request, on l'exporte directement pur pouvoir l'utliser dans d'autres fichiers
exports.getDataByIdPoivres = (request, response) => {
//On procède à la lacture des fichiers via la methode readfile du module fs que nous avons préalablement importé, nous lui attribuons 2 arguments (err, et data)
    fs.readFile ("./src/model/catalogue.json", (err, data) => {
        //si la lecture du fichier échoue, on renoit un statut 500 et un message pour informer de l'échec
        if (err) {
            response.status(500).json ({
                message : "La lecture du fichier a échoué!",
                error : err
            })
            // si il n'y a pas d'erreur, cela signifie que la lecture a réussi, on récupère les données et on les converti via la methode JSON.parse et on la stocke dans une constante
        } else {
            const tableau = JSON.parse(data) 
            // crée une nouvelle constante qui contiendra le résultat de la méthode find appliquée à la constante précédente avec comme degré de précision le nom du tableau ciblé dans la recherche
            const dataById = tableau.poivres.find (
                // on cherche la correpondansce entre les id dans les données du tableau et celles récupérées dans la requête du client via request.param.id qu'on converti par la fonction parseINt pour pouvoir la manipuler
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si on trouve la donnée, on renvoit en reponse un statut 200 avec les données
            if (dataById) {
                response.status(200).json(dataById)
                // sinon, on renvoie en réponse un statut 404 avec un message d'information
            } else {
                response.status(404).json ({
                    message :"Aucune donnée portant cet Id n'a été trouvée"
                })
            }
        }
    })
}
// On crée la methode pour récupérer les données par leur nom et avec pour argument (request et response) et on l'exporte pour pouvoir l'exploiter plus tard
exports.getDataByNamePoivres = (request, response) => {
// on procède à la lecture du fichier via la methode readFilde de fs, on renseigne le chemin précis du fichier visé et on passe en argument err et data
    fs.readFile("./src/model/catalogue.json", (err, data) => {        
// si la lecture du fichier échoue, on renvoi en réponse un statut 500 et un message d'erreur
        if (err) {
            response.status(500).json ({
                message : "Une erreur est survenue lors de la lecture du fichier",
                error : err
            })
            // si la lecture du fichier réussit, on récupère les données en les convertissant au format Java pour pouvoir les manipuler et on les stocke dans une constante
        } else {
            const tableau = JSON.parse(data)
            // on applique la methode find aux données récupérées en visant spécifiquement le tableau où l'on veut faire les recherches et on stocke le résultat éventuel dans une constante
            dataByName = tableau.poivres.find(
                // on compare le nom recherché avec le nom que l'on récupère de la requête via request.params
                (obj) => obj.name === request.params.name
            )
            // si on trouve le nom correspondant on renvoit un statut 200 en réponse avec la constante 
        } if (dataByName) {
            response.status(200).json(dataByName)
            // si on ne trouve rien, on renvoit un statut 404 en réponse avec un message d'information
        } else {
            response.status(404)
        }

    })
}

// on met en place la methode postDataEntieres en même temps qu'on l'exporte directement, afin de pouvoir l'importer et l'utiliser
exports.createDataPoivres = (request, response) => {
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
                existingData.poivres.push(request.body);
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

exports.putDataPoivres = (request, response) => {
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
                const dataById = existingData.poivres.find(
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
exports.deleteDataPoivres = (request, response) => {
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
                  const dataById = existingData.poivres.find(
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
                      existingData.poivres = existingData.poivres.filter(
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
















