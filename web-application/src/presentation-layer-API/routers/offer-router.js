const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({accountRouterAPI,petitionManager,offerManager}){
    const router = express.Router()
    const serverSecret = "sdfkjdslkfjslkfd"

    
    //Obtain information of one offer
    router.get("/offer/:id",function(request,response){
        var accountId =  0
        try {
            const authorizationHeader = request.get('authorization')
            const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            accountId = payload.id
            
        }catch(e){
            console.log("Not Logged In ")
        }
        const offerId = request.params.id
        offerManager.getOfferById(offerId, function(errors,offer){
            const model = {
				errors: errors,
                offer: offer,
                petitionIsMine: false,
                offerIsMine: false,
                petition: null,
                accountId: accountId
            }
            if(0 == model.errors.length){
                if(model.offer != null){
                    const petitionId = model.offer.petition_id
                    if(model.offer.account_id == model.accountId){
                        model.offerIsMine = true
                    }
                    petitionManager.getPetitionById(petitionId,function(errors,result){
                        if(result){
                            if(model.accountId == result.account_id){
                                model.petitionIsMine = true
                            }
                            model.petition = result
                            response.status(200).json(model)
                        }else{
                            response.status(500).end()
                        }
                       
                    })
                }else{

                    response.status(500).end()
                }  
            }else{
                response.status(500).end()
            }
             
        })
    })

    //Create an offer
    router.post("/offer",function(request,response){
        var accountId = ""
        try {
            const authorizationHeader = request.get('authorization')
		    const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            accountId = payload.id
        }catch(e){
            response.status(401).end()
            return
        }

        const {title,author,place,state,commentary,price,petitionId } = request.body
        //const petitionId  = request.params.petitionId
        const offer = {
            title: title,
            author: author,
            place: place,
            state: state,
            commentary: commentary,
            price: price
        }
        
        offerManager.createOffer(offer, accountId, petitionId, function(errors,result){
            const model={
                accountId: accountId,
            }
            if(result){
                response.status(201).end()
            }else{
                response.status(500).end()

            }
        })

    })

    //Update an offer
    router.put("/offer/:id",function(request,response){
        var accountId = ""
        try {
            const authorizationHeader = request.get('authorization')
		    const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            accountId = payload.id
        }catch(e){
            response.status(401).end()
            return
        }

        const offerId = request.params.id
        const title = request.body.title
        const author = request.body.author
        const place = request.body.place
        const state = request.body.state
        const commentary = request.body.commentary
        const price = request.body.price

        const offer = {
            title: title,
            author: author,
            commentary: commentary,
            place: place,
            state: state,
            price:price
        }
        offerManager.updateOffer(offer, offerId,function(errors,offer){
            if(0 < errors.length){
                response.status(500).end()
                console.log("Error 1")
            }else{
                offerManager.getOfferById(offerId,function(errors,result){
                    
                    if(0 < errors.length){
                        response.status(500).end()
                        console.log("Error 2")
                    }else{
                        const model = {
                            errors: errors,
                            offer: offer,
                            accountId: accountId,
                            isMine: true
                        }
                        response.status(200).json(model)
                    }
                    
                    
                })
                
            } 
            
            
        }) 
    })

    //Optain offers of an account
    router.get("/offers/account/:id",function(request,response){
        const accountId =  request.params.id
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

        offerManager.getActiveOffersByUsername(accountId,function(errors,activeOffers){
            const model = {
                errors: errors,
                activeOffers: activeOffers,
                inactiveOffers: null,
                accountId: accountId
            }
            if(0 < errors.length){
                response.status(500).end()
            }else{
                offerManager.getInactiveOffersByUsername(accountId,function(errors,inactiveOffers){
                    model.inactiveOffers = inactiveOffers
                     
                    if(0 < errors.length){
                        response.status(500).end()
                    }else{
                        response.status(200).json(model)
                    }
                })
            }
            
        })
    })
    


    //Delete Offer
    router.delete("/offer/:id",function(request,response){
        const offerId = request.params.id
        try {
            const authorizationHeader = request.get('authorization')
		    const accessToken = authorizationHeader.substr("User ".length)
            const payload = jwt.verify(accessToken, serverSecret)
            var accountIdPayload = payload.id
            
        }catch(e){
            response.status(401).end()
            return
        }
        //todo handle errors
            offerManager.deleteOffer(offerId,function(errors,res){
                if(0 < errors.length){
                    response.status(500).end()
                }else{
                    response.status(204).end()
                }
            })
    })
    
    

    return router
}