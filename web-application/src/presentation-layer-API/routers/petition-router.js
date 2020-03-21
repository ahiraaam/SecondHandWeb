const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({accountRouterAPI,petitionManager, offerManager}){
    const router = express.Router()
    const serverSecret = "sdfkjdslkfjslkfd"
    
    //Obtain all the petitions
    router.get("/petitions", function(request,response){
        petitionManager.getAllPetitions(function(errors,petitions){
			if(0 < errors.length){
                console.log(errors)
                response.status(500).end()
            }else{
                response.status(200).json(petitions)
            }
        })
        
    })

    //Obtain some petitions
    router.get("/petitions?title=:search", function(request,response){
        const search = request.params.id
        petitionManager.getSomePetitions(search,function(errors,petitions){
			if(0 < errors.length){
                response.status(500).end()
            }else{
                response.status(200).json(petitions)
            }
        })
        
    })


    //Obtain information of one petition and its offers
    router.get("/petitions/:id",function(request,response){
        const accountId =  0
        try {
            
            const authorizationHeader = request.get('authorization')
		    const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            console.log(accountId)
            
        }catch(e){
            console.log("Not Logged In ")
        }

        const id = request.params.id

        petitionManager.getPetitionById(id, function(errors, petition){
            if(0 < errors.length){
                response.status(500).end()
            }else{
                const model = {
                    errors: errors,
                    petition: petition,
                    petitionActive: null,
                    accountId: accountId,
                    offers: null,
                    isMine: false
                }
                if(model.petition.active == true){
                    model.petitionActive = true
                }
                if(accountId == model.petition.account_id){
                    model.isMine = true
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
    router.post("/petitions",function(request,response){

        var accountId = ""
        try {
            //const authorizationHeader = request.get('authorization')
           // accountId = accountRouterAPI.AccesTokenInformation(authorizationHeader)
            const authorizationHeader = request.get('authorization')
		    const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            accountId = payload.id
        }catch(e){
            response.status(401).end()
            return
        }

        const title = request.body.title
        const author = request.body.author
        const place = request.body.place
        const state = request.body.state
        const commentary = request.body.commentary
        const photo = request.body.photo
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
                console.log(errors)
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
        
        var accountId =  0
        try {
            const authorizationHeader = request.get('authorization')
		    const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            accountId = payload.id
        }catch(e){
            response.status(401).end()
            return
        }

        const petitionId = request.params.id
        const title = request.body.title
        const author = request.body.author
        const place = request.body.place
        const state = request.body.state
        const commentary = request.body.commentary
        const photo = request.body.photo
        const petition = {
            title: title,
            author: author,
            place: place,
            state: state,
            commentary: commentary,
            photo: photo
        }

        petitionManager.updatePetition(petition, petitionId,function(errors,petition){
            const model = {
				errors: errors,
                petition: petition,
            }
            if(0 < errors.length){

                response.status(500).end()
            }else{
                response.status(201).end()
            }
        })
    })
    //Obtain petitions of an account
    router.get("/account/:id/petitions",function(request,response){
        var accountId = request.params.id
        try {
            const authorizationHeader = request.get('authorization')
		    const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            var accountIdPayload = payload.id
            if(!accountId==accountIdPayload){
                response.status(402).end()
                return
            }
            
        }catch(e){
            response.status(401).end()
            return
        }
        
        //const id = request.params.id
        petitionManager.getActivePetitionByUsername(accountId,function(errors,activePetitions){
            if(0 < errors.length){
                response.status(500).end()
            }else{
                const model = {
                    errors: errors,
                    activePetitions: activePetitions,
                    inactivePetitions: null,
                    accountId: accountId
                }
                petitionManager.getInactivePetitionByUsername(accountId,function(errors,inactivePetitions){
                    if(0 < errors.length){
                        response.status(500).end()
                    }else{
                        model.inactivePetitions = inactivePetitions
                        response.status(200).json(model)
                    }
                })
            }
        })
    })
    //Delete petition
    router.delete("/petitions/:id",function (request,response){
        const petitionId = request.params.id
        try {
            const authorizationHeader = request.get('authorization')
            const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            
        }catch(e){
            response.status(401).end()
            return
        }
                
        petitionManager.deletePetition(petitionId,function(errors,res){
            console.log("Peticion eliminada")
            console.log("Peticion eliminada")
            if(0 < errors.length){
                response.status(500).end()
            }else{
                response.status(201).end()
            }
        })

    })

    return router
}


