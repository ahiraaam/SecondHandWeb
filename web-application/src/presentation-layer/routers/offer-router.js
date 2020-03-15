const express = require('express')

module.exports = function({petitionManager,offerManager}){
    const router = express.Router()

    router.get("/:offerId", function(request,response){
        const offerId = request.params.offerId
        offerManager.getOfferById(offerId, function(errors,offer){
            const model = {
				errors: errors,
                offer: offer,
                isLoggedIn: request.session.isLoggedIn,
                username: request.session.username,
                accountId: request.session.uniqueId,
                petitionIsMine: false,
                offerIsMine: false,
                petition: null
            }
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
                        response.render("offer-show-one.hbs",model)
                    }else{
                        //TODO
                    }
                   
                })
            }else{
                response.render("home.hbs")
            }   
        })
    })
    router.get("/create-offer/:offerId", function(request,response){
        if(request.session.isLoggedIn){
            response.render("offer-create-offer.hbs", {
                isLoggedIn: request.session.isLoggedIn,
                username: request.session.username,
                accountId: request.session.uniqueId
            })
        }else{
            response.redirect("/accounts/sign-in")
        }
    })
    router.post("/create-offer/:offerId",function(request,response){
        const {title,author,place,state,commentary,price} = request.body
        const offerId = request.params.offerId
        const accountId = request.session.uniqueId
        const offer = {
            title: title,
            author: author,
            place: place,
            state: state,
            commentary: commentary,
            price: price
        }
        offerManager.createOffer(offer, accountId, offerId, function(errors,result){
        })
        response.redirect("/")
    })

    router.get("/user/:accountId",function(request,response){
        const isLoggedIn = request.session.isLoggedIn
        const username = request.session.username
        const accountId = request.params.accountId
        

        if(request.session.uniqueId == accountId){
            offerManager.getActiveOffersByUsername(accountId,function(errors,activeOffers){
                const model = {
                    errors: errors,
                    activeOffers: activeOffers,
                    inactiveOffers: null,
                    isLoggedIn: isLoggedIn,
                    username: username,
                    accountId: accountId
                }
                offerManager.getInactiveOffersByUsername(accountId,function(errors,inactiveOffers){
                    model.inactiveOffers = inactiveOffers
                    response.render("offers-account.hbs",model)
                })
            })
        }else{
            response.redirect("/")
        }
    }),

    router.get("/update-offer/:id",function(request,response){
        const offerId = request.params.id
        const accountId = request.session.uniqueId
        offerManager.getOfferById(offerId,function(errors,offer){
            const model = {
				errors: errors,
                offer: offer,
                isLoggedIn: request.session.isLoggedIn,
                username: request.session.username,
                isMine: false
            }
            if(model.offer.account_id == accountId){
                response.render("offer-edit.hbs", model)
            }else{
                //REND ERROR PAGE TODO
                response.render("petitions.hbs",model)
            }
        })
    })
    router.post("/update-offer/:id",function(request,response){
        const offerId = request.params.id
        const accountId = request.session.uniqueId
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
            offerManager.getOfferById(offerId,function(errors,result){
                const model = {
                    errors: errors,
                    offer: offer,
                    isLoggedIn: request.session.isLoggedIn,
                    username: request.session.username,
                    accountId: accountId,
                    isMine: true
                }
                response.redirect("../user/" + model.accountId)
            })
            //TODO ERRORRR
            
        })    
    })
    router.post("/delete-offer/:id",function(request,response){
        const offerId = request.params.id
        const accountId = request.body.accountId
        //todo handle errors
        if(accountId == request.session.uniqueId){
            offerManager.deleteOffer(offerId,function(errors,response){})
            response.redirect("../../../")
        }else{
            //Not your petition
            console.log("Could not delete offer")
        }    
    })
    
    return router
}