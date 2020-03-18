const express = require('express')

module.exports = function({petitionManager, offerManager}){
    const router = express.Router()



    //Obtain all the petitions
    router.get("/", function(request,response){
        
        petitionManager.getAllPetitions(function(errors,petitions){
			if(0 < errors.length){
                response.status(500).end()
            }else{
                response.status(200).json(petitions)
            }
        })
        
    })

    //Obtain information of one petition and its offers
    router.post("/:id",function(request,response){
        const id = request.params.id
        
        


        
        petitionManager.getPetitionById(id, function(errors, petition){
            if(0 < errors.length){
                response.status(500).end()
            }else if(!pet){
                response.status(404).end()
            }else{
                const model = {
                   petition : petition,
                   offers: null
                }
                offerManager.getOfferByPetition(id,function(errors,offers){
                    if(0 < errors.length){
                        response.status(500).end()
                    }else{
                        model.offers = offers
                        response.status(200).json(model)
                    }
                })
            }
        })
    })

    //Create a petition
    router.post("/",function(request,response){

        const title = request.body.title
        const author = request.body.author
        const place = request.body.place
        const state = request.body.state
        const commentary = request.body.commentary
        const photo = request.body.photo
        const accountId = request.params.id
        const petition = {
            title: title,
            author: author,
            place: place,
            state: state,
            commentary: commentary,
            photo: photo
        }
	
        petitionManager.createPetition(petition, accountId, function(errors, id){
            if(errors.includes("databaseError")){
                response.status(500).end()
            }else if(0 < errors.length){
                response.status(400).json(errors)
            }else{
                response.setHeader("Location", "/petitions/"+id)
                response.status(201).end()
            }
        })
    
    })


    //Update a petition
    router.put("/petitions/:id",function(request,response){

    })


    //Obtain petitions of an account
    router.get("/account/:id/petitions",function(request,response){
        petitionManager.getPetitionById(id, function(errors, petition){
            if(0 < errors.length){
                response.status(500).end()
            }else if(!pet){
                response.status(404).end()
            }else{
                response.status(200).json(petition)
            }
        })
    })


    router.delete("/:id",function (request,response){
        const id = request.params.id
        
        petitionManager.deletePetition(petitionId,function(errors,response){
            console.log("eliminada")
            console.log("eliminada")
        })

    })

    return router
}