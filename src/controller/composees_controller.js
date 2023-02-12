//on importe le module express que l'on stocke dans une constante pour pouvoir l'utiliser
const express = require("express");
//on importe le module fs que l'on va devoir utiliser et on le stocke dans une constante
const fs = require("fs");
// on crée la methode getAllDataComposees en la déclarant avec ses 2 arguments (request et response) et on l'exporte directement pour pouvoir l'utiliser
exports.getAllDataComposees = (request, response) => {
    //on utilise la fonction readFile du module fs pour lire le fichier ciblé par sa source, on applique les 2 arguments possibles (err et data)
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        // si la lecture du fichier échoue, on renvoit un statut 500 avec un message d'erreur et on arrête le traitement,
        if (err) {
            response.status(500).json ({
                message: "La lecture du fichier a échoué!",
                error :err
            })
        } else {
            // si la lecture du fichier aboutit, on renvoit un statut 200 avec les données récupérées converties en format de tableau javascript par la methode parse en renseignant le tableau  
            response.status(200).json(JSON.parse(data).composees)
        }
    })  
} 
// on crée la methode pour récupére l'objet ciblé avec son id et on déclare ses 2 arguments request et response
exports.getDataByIdComposees = (request, response) => {
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
            const dataById = manipData.composees.find (
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
// on va créer la methode pour rechercher un objet par son nom et on va l'exporter pour pouvoir directement l'exploiter avec pour arguments, une réponse et une question
exports.getDataByNameComposees = (request, response) => {
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
            dataByName = manipData.composees.find(
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
// on crée la methode qui va servir a creer une donnée via post et on définit ses 2 arguments : request, response
exports.createDataComposees = (request, response) => {
//on procède à la lecture du fichier avec la methode readFile du module fs en indiquant le chemin du fichier source, avec pour arguments err data
    fs.readFile("./src/model/catalogue.json", (err, data)=> {
        // si il y a une erreur lors de la lecture du fichier, on renvoit un statut 500 avec un message d'information
        if (err) {
            response.status(500).json ({
                message:"Il y a eu une erreur lors de la lecture du fichier",
                error: err
            })
            //sinon, cela signifie que la lecture du fichier a réussi, on stocke alors les données du fichier dans un fichier que l'on va pouvoir manipuler sous format Javascript par la methode Parse
            } else {
                const existingData = JSON.parse(data);
                // on recupère les données saisies dans le champ body de thunder client via l'outil request du module bodyParser et on l'intègre dans le tableau visé à l'interieur de la constante créée auparavant, via la methode push
                existingData.composees.push(request.body);
                // on réécrit le fichier grâce à la methode writeFile du module fs en renseignant le chemin précis du fichier à écraser avec pour argument, le contenu de la constante existing data convertie en chaine de caractère et writeErr en cas d'erreur
                    fs.writeFile("./src/model/catalogue.json", JSON.stringify(existingData), (writeErr) => {
                        //si l'écriture du fichier a échoué, on renvoit un statut 500 avec un message d'erreur et on arrête le traitement
                        if (writeErr) {
                            response.status(500).json ({
                                message: "Erreur lors de l'ajout de vos données!",
                                error: err
                            })
                            //sinon, cela signifie que les données ont été rajoutées avec succès, on renvoie alors un statut 200 avec un message de confirmation
                        } else {
                            response.status(200).json ({
                                message: "Les données ont été rajoutées avec succès!"
                            })                             
                        }
                    })
            }
    })
}
// on crér la methode qui va nous permettre de mettre en place la methode put et on l'exporte pour pouvoir l'exploiter, on lui met 2 arguments (request et response)
exports.putDataComposees = (request, response) => {
    // on procède à la lecture du fichier visé en renseignant le chemin du fichier à lire à partir de la methode readFile du module fs, on définit 2 arguments, err et data
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        // si la lecture echoue, on lui applique l'argument err et en envoie en réponse un statut 500 avec un message d'erreur pour informer de l'erreur de lecture
        if (err) {
            response.status(500).json ({
                message: "Erreur lors de la lecture du fichier",
                error : err
            })
            // si la lecture aboutie, on stocke les données dans une constante que l'on convertit par la methode JSON.parse pour qu'on puisse la manipuler en javascript
        } else {
            const existingData = JSON.parse(data)
            // on utilise ensuite la methode find pour chercher précisemment l'id de l'objet que l'on veut modifier et on stocke l'éventuel résultat correspondant dans une constante
            const dataById = existingData.composees.find(
                //on cherche la correspondance entre la requete envoyée par la mmethode request.param que l'on convertit en nombre et l'id recherché
                (obj) => obj.id === parseInt(request.params.id)
            )
            // si l'id n'est pas trouvée, on envoie un statut 404 avec un message pour signaler la situation
            if(!dataById) {
                response.status(404).json ({
                    message :"Aucun objet correspondant à ced id n'a été trouvé!",
                    error : err
                })
                // si l'id est trouvée, on lui rajoute les nouvelles propriétés de l'objet id qui ont été saisies dans la console body de thunder client par la methode request.body du module BodyParsercet on stocke le resultat dans une constante
            } else {
                dataById.name = request.body.name
                //on réécrit ensuite le fichier avec la methode writeFile du module fs en renseignant le chemin précis du fichier et en convertissant la constante obtenue par la méthode stingify
                fs.writeFile("./src/model/catalogue.json", JSON.stringify(existingData), (writeErr) => {
                    // si la réécriture du fichier échoue, on renvoie en réponse un statut 500 avec un message pour spécifier l'erreur
                    if(writeErr) {
                        response.status(500).json ({
                            message:"Erreur lors de l'écriture du fichier",
                            error: err
                        })
                        // sinon, cela signifie que la lecture a réussi et on renvoie une réponse avec un statut 200 et un message d'information
                    } else {
                        response.status(200).json ({
                            message :"Le fichier  a été mis à jour avec succès!"
                        })
                    }
                })
            }
        }    
    })
}
//on crée la methode delete et on l'exporte directement, afin de pouvoir l'importer et l'exploiter, on lui met 2 arguments, response et request
exports.deleteDataComposees = (request, response) => {
//on lit le fichier en le ciblant avec son chemin précis par le biais de la fonction readFile du module fs et on lui joint les 2 arguments (data et err)
    fs.readFile("./src/model/catalogue.json", (err, data) => {
        //Si la lecture du fichier échoue(err), on renvoie en réponse un statut 500 et un message d'information
        if (err) {
            response.status(500).json ({
                message : "Erreur lors de la lecture du fichier",
                error: err
            })
            // si la lecture réussit, on stock les données (après conversion via la methode JSON.parse pour pouvoir les exploiter) dans une constante
        } else {
            existing_Data = JSON.parse(data)
            //On crée une constante qui va permettre de stocker les résultats de la methode find que l'on va appliquer au tableau précis que l'on vise dans les données
            dataById = existing_Data.composees.find(
                // On cherche une correspondance entre l'id de l'objet que l'on cible avec l'id récupéré dans la requete grace à request.params et on le convertit en nombre via la methode ParseInt
                (obj) => obj.id === parseInt(request.params.id)
            )
            if (!dataById) {
                response.status(404).json ({
                    message:"Aucun objet portant cet id n'a été trouvé!"
                })
                //si on trouve l'id, on récupère les propriétés de la 1ère constante où l'on a exporté les données et on la déclare égale à elle-même  mais avant on lui applique la methode filter en appliquant comme filtre l'id récupéré dans la requête
                // via la fonction request.params
            } else {
                existing_Data.composees = existing_Data.composees.filter(
                    (obj) => obj.id != parseInt(request.params.id)
                )
                // on réécrit le fichier via la methode writeFile de fs en suivant le chemin précis du fichier en lui donnant pour argument writeErr et les données converties au format chaine par la methode JSON.stringify
                fs.writeFile("./src/model/catalogue.json", JSON.stringify(existing_Data), (writeErr) => {
                    // si l'écriture échoue, on renvoie une reponse 500 avec un message d'erreur
                    if (writeErr) {
                        response.status(500).json ({
                            message : "La suppression a échoué",
                            error, err
                        })
                    }else {
                        // sinon, on renvoie en réponse le statut 200 et un message annoncant le succès de la suppression.
                        response.status(200).json ({
                            message :"La suppression a été effectuée"
                        })
                    }
                })
            }
        }
    })
}












