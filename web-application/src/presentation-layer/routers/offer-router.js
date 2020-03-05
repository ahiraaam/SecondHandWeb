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
                isMine: false
            }
            if(model.offer != null){
                const petitionId = model.offer.petition_id
                petitionManager.getAccountOfPetition(petitionId,function(errors,result){
                    if(model.accountId == result){
                        model.isMine = true
                    }
                    response.render("offer-show-one.hbs",model)
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
        const offerId = request.params.offerId
        const title = request.body.title
        const author = request.body.author
        const place = request.body.place
        const state = request.body.state
        const commentary = request.body.commentary
        const price = request.body.price
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
        const accountId = request.params.accountId
        const isLoggedIn = request.session.isLoggedIn
        const username = request.session.username
        offerManager.getOfferByUsername(accountId,function(errors,offers){
            const model = {
				errors: errors,
                offers: offers,
                isLoggedIn: isLoggedIn,
                username: username,
                accountId: accountId
            }
            
                response.render("offers-account.hbs",model)
        })
    })
    

    return router
}