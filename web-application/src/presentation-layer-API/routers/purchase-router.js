const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({purchaseManager,accountManager,offerManager,petitionManager}){
    const router = express.Router()
    const serverSecret = "sdfkjdslkfjslkfd"
    
    //Get purchase through petition
    router.get("/purchase/petition/:id",function(request,response){
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
        const petitionId = request.params.id
        var petition = null
        var offer = null
        var purchase = null
        purchaseManager.getPurchasesByPetition(petitionId,function(errors,result){
            console.log(result)
            console.log(result)
            if(0 < errors.length){
                response.status(500).end()
            }else{
                purchase = result
                offerManager.getOfferById(purchase.offer_id,function(error,result){
                    if(0 < errors.length){
                        response.status(500).end()
                    }else{
                        offer = result
                    petitionManager.getPetitionById(purchase.petition_id,function(error,result){
                        
                        if(0 < errors.length){
                            response.status(500).end()
                        }else{
                            petition = result
                            const model = {
                                accountId:accountId,
                                petition:petition,
                                offer:offer,
                                purchase:purchase
                            }

                            response.status(200).json(model)
                        }
                       
                    })
                    }
                })
            }
            
        })
    }),
    

    //Get purchase through offer
    router.get("/purchase/offer/:id",function(request,response){
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
        var petition = null
        var offer = null
        var purchase = null
        purchaseManager.getPurchasesByOffer(offerId,function(errors,result){
            if(0 < errors.length){
                response.status(500).end()
            }else{
                purchase = result
            offerManager.getOfferById(purchase.offer_id,function(errors,result){
                if(0 < errors.length){
                    response.status(500).end()
                }else{
                    offer = result
                    petitionManager.getPetitionById(purchase.petition_id,function(errors,result){
                        if(0 < errors.length){
                            response.status(500).end()
                        }else{
                            petition = result
                            const model = {
                                accountId:accountId,
                                petition:petition,
                                offer:offer,
                                purchase:purchase
                            }
                            console.log(model.purchase)
                            console.log(model.purchase)
                            response.status(200).json(model)
                        }

                    })
                }
                
            })
            }
            
        })
    }),


    //Create Pruchase
    router.post("/purchase",function(request,response){

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

        const offerId = request.body.offerId
        const petitionId = request.body.petitionId
        const street = request.body.street
        const city = request.body.city
        const zip = request.body.zip
        const country = request.body.country
        const purchase = { //TODO
            street: street,
            city: city,
            zip: zip,
            country: country
        }
        var offer = null
        var petition = null
    

        petitionManager.getPetitionById(petitionId,function(errors,result){
            
            if(0 < errors.length){

                response.status(500).end()
            }else{
                petition =  result
                offerManager.getOfferById(offerId,function(errors,result){
                    if(0 < errors.length){

                        response.status(500).end()
                    }else{
                        offer = result
                        if(offer.active == 1 && petition.active == 1){
                            purchaseManager.createPurchase(purchase,accountId,petitionId,offerId,function(errors, purchase){
                                console.log(errors)
                                if(0 < errors.length){

                                    response.status(500).end()
                                }else{
                                    const model = {
                                        errors: errors,
                                        purchase: purchase,
                                        accountId: accountId
                                    }
                                    petitionManager.updatePetitionStatus(petitionId,function(errors,result){
                                        if(0 < errors.length){

                                            response.status(500).end()
                                        }
                                    })
                                    offerManager.updateOfferStatus(offerId,function(errors,result){
                                        if(0 < errors.length){

                                            response.status(500).end()
                                        }
                                    })
                                    response.status(200).json(model)
                                }
                            })
                        }else{
                            if(0 < errors.length){

                                response.status(500).end()
                            }
                        }
                    }
                    
                })
            }
           
            
        })    
            

    })

    return router
}