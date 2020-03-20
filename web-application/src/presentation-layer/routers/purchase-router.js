const express = require('express')
module.exports = function({purchaseManager,petitionManager,offerManager}){
  // Name all the dependencies in the curly brackets. 
  
 	const router = express.Router()
    

     //Enseñar datos de la compra por la peticion
    router.get("/petitions/:petitionId",function(request,response){
        const petitionId = request.params.petitionId
        const isLoggedIn= request.session.isLoggedIn
        const username= request.session.username
        const accountId= request.session.uniqueId
        var petition = null
        var offer = null
        var purchase = null
        purchaseManager.getPurchasesByPetition(petitionId,function(error,result){
            purchase = result
            offerManager.getOfferById(purchase.offer_id,function(error,result){
                offer = result
                petitionManager.getPetitionById(purchase.petition_id,function(error,result){
                    petition = result
                    const model = {
                        isLoggedIn:isLoggedIn,
                        username:username,
                        accountId:accountId,
                        petition:petition,
                        offer:offer,
                        purchase:purchase
                    }
                    console.log(model.purchase)
                    console.log(model.purchase)
                    response.render("purchase-show-one.hbs",model)  
                })
            })
        })

    })

    router.get("/offers/:offerId",function(request,response){
        const offerId = request.params.offerId
        const isLoggedIn= request.session.isLoggedIn
        const username= request.session.username
        const accountId= request.session.uniqueId
        var petition = null
        var offer = null
        var purchase = null
        purchaseManager.getPurchasesByOffer(offerId,function(error,result){
            purchase = result
            offerManager.getOfferById(purchase.offer_id,function(error,result){
                offer = result
                petitionManager.getPetitionById(purchase.petition_id,function(error,result){
                    petition = result
                    const model = {
                        isLoggedIn:isLoggedIn,
                        username:username,
                        accountId:accountId,
                        petition:petition,
                        offer:offer,
                        purchase:purchase
                    }
                    console.log(model.purchase)
                    console.log(model.purchase)
                    response.render("purchase-show-one.hbs",model)  
                })
            })
        })
    })


    //Obtener pagina de compra
	router.get("/:offerId/:petitionId", function(request, response){
        const offerId = request.params.offerId
        const model = {
            accountId: request.session.uniqueId,
            username: request.session.username,
            isLoggedIn: request.session.isLoggedIn,
            offer: null
        }
        offerManager.getOfferById(offerId,function(error,offer){
            model.offer = offer
            response.render("purchase-create.hbs", model)
        })
    })
    
    router.post("/:offerId/:petitionId", function(request,response){
        const offerId = request.params.offerId
        const petitionId = request.params.petitionId
        const accountId = request.session.uniqueId //TODO
        const username = request.session.username //TODO
        const isLoggedIn = request.session.isLoggedIn
        const street = request.body.street
        const city = request.body.city
        const zip = request.body.zip
        const country = request.body.country
        const model ={accountId,username,isLoggedIn}
        const purchase = { //TODO
            street: street,
            city: city,
            zip: zip,
            country: country
        }
        var offer = null
        var petition = null
    
        if(isLoggedIn){
            petitionManager.getPetitionById(petitionId,function(errors,result){
                petition =  result
                offerManager.getOfferById(offerId,function(errors,result){
                    offer = result
                    if(offer.active == 1 && petition.active == 1){
                        purchaseManager.createPurchase(purchase,accountId,petitionId,offerId,function(errors, purchase){
                            const model = {
                                errors: errors,
                                purchase: purchase,
                                isLoggedIn: isLoggedIn,
                                username: username,
                                accountId: accountId
                            }
                            petitionManager.updatePetitionStatus(petitionId,function(errors,result){
                
                            })
                            offerManager.updateOfferStatus(offerId,function(errors,result){
                
                            })
                            response.render("purchase-success.hbs",model)
                        })
                    }else{
                        response.render("accounts-list-all.hbs",model)  //TODO, enviar a página de no autorización
                    }
                })
                
            })    
            
        }else{
            //SEND TO ERROR PAGE
            response.redirect("/")
        }
       
    })
 	return router
  
}
