const express = require('express')

module.exports = function({accountRouterAPI,petitionManager,offerManager}){
    const router = express.Router()

    
    //Obtain information of one offer
    router.get("/offer/:id",function(request,response){
        const accountId =  0
        try {
		
            const authorizationHeader = request.get('authorization')
            accountId=accountRouterAPI.AccesTokenInformation(authorizationHeader)

            
        }catch(e){
            console.log("Not Logged In ")
        }
        const offerId = request.params.offerId
        offerManager.getOfferById(offerId, function(errors,offer){
            const model = {
				errors: errors,
                offer: offer,
                petitionIsMine: false,
                offerIsMine: false,
                petition: null,
                accountId: accountId
            }
            if(model.errors != null){
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
        const accountId =  0
        try {
		
            const authorizationHeader = request.get('authorization')
            accountId=accountRouterAPI.AccesTokenInformation(authorizationHeader)

            
        }catch(e){
            response.status(401).end()
            return
        }

        const {title,author,place,state,commentary,price} = request.body
        const petitionId = request.params.petitionId
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
                response.setHeader("Location", "/offers/"+id)
                response.status(201).end()
            }else{
                response.status(500).end()

            }
        })

    })

    //Update an offer
    router.put("/offer/:id",function(request,response){
        const accountId =  0
        try {
		
            const authorizationHeader = request.get('authorization')
            accountId=accountRouterAPI.AccesTokenInformation(authorizationHeader)

            
        }catch(e){
            response.status(401).end()
            return
        }

        const offerId = request.params.id
        const accountId = request.body.id
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
            }else{
                offerManager.getOfferById(offerId,function(errors,result){
                    
                    if(0 < errors.length){
                        response.status(500).end()
                    }else{
                        const model = {
                            errors: errors,
                            offer: offer,
                            isLoggedIn: request.session.isLoggedIn,
                            username: request.session.username,
                            accountId: accountId,
                            isMine: true
                        }
                        response.status(200).json(model)
                    }
                    
                    
                })
                //TODO ERRORRR
                
            } 
            
            
        }) 
    })

    //Optain offers of an account
    router.get("offer/account/:id",function(request,response){
        const accountId =  0
        try {
		
            const authorizationHeader = request.get('authorization')
            accountId=accountRouterAPI.AccesTokenInformation(authorizationHeader)
            
            
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
    


    //Delete Offer]
    router.get("/offer/:id",function(request,response){
        const offerId = request.params.id
        const accountId =  0
        try {
		
            const authorizationHeader = request.get('authorization')
            accountId=accountRouterAPI.AccesTokenInformation(authorizationHeader)

            
        }catch(e){
            response.status(401).end()
            return
        }
        
        const offerId = request.params.id
        //todo handle errors
        if(accountId == request.session.uniqueId){
            offerManager.deleteOffer(offerId,function(errors,response){
                if(0 < errors.length){
                    response.status(500).end()
                }else{
                    response.status(204).end()
                }
            })

        }else{
            response.status(500).end()
        } 
    })
    
    

    return router
}