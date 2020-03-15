const express = require('express')

module.exports = function({petitionManager, offerManager}){
    const router = express.Router()

    router.get("/create-petition", function(request,response){
        if(request.session.isLoggedIn){
            response.render("create-petition.hbs", {
                isLoggedIn: request.session.isLoggedIn,
                username: request.session.username,
                accountId: request.session.uniqueId
            })
        }else{
            response.redirect("/accounts/sign-in")
        }
        
    })
    router.post("/create-petition",function(request,response){
        const title = request.body.title
        const author = request.body.author
        const place = request.body.place
        const state = request.body.state
        const commentary = request.body.commentary
        const photo = request.body.photo
        const accountId = request.session.uniqueId
        const petition = {
            title: title,
            author: author,
            place: place,
            state: state,
            commentary: commentary,
            photo: photo
        }

        petitionManager.createPetition(petition, accountId, function(errors,result){
        })
        response.redirect("/")
    })

    router.get("/:id",function(request,response){
        const id = request.params.id
        const accountId = request.session.uniqueId
        petitionManager.getPetitionById(id,function(errors,petition){
            const model = {
				errors: errors,
                petition: petition,
                isLoggedIn: request.session.isLoggedIn,
                username: request.session.username,
                accountId: accountId,
                offers: null,
                isMine: false
            }
            offerManager.getOfferByPetition(id,function(errors,offers){
                if(request.session.uniqueId == model.petition.account_id){
                    model.isMine = true
                }
                
                model.offers = offers
                response.render("petition-show-one.hbs",model)
            })
           
        })
    })

    router.get("/user/:accountId",function(request,response){
        const accountId = request.params.accountId
        const isLoggedIn = request.session.isLoggedIn
        const username = request.session.username
        if(request.session.uniqueId == accountId){
            petitionManager.getActivePetitionByUsername(accountId,function(errors,activePetitions){
                const model = {
                    errors: errors,
                    activePetitions: activePetitions,
                    inactivePetitions: null,
                    isLoggedIn: isLoggedIn,
                    username: username,
                    accountId: accountId
                }
                petitionManager.getInactivePetitionByUsername(accountId,function(errors,inactivePetitions){
                    model.inactivePetitions = inactivePetitions
                    response.render("petition-account.hbs",model)
    
                })
            })
        }else{
            response.redirect("/")
        }
        
    })

    router.post("/search-petition", function(request,response){
        const searchedTitle = request.body.searchPetition
        if(searchedTitle == ""){  
            response.redirect("/")
        }else{
            petitionManager.getSomePetitions(searchedTitle,function(errors,petitions){
                const model = {
                    errors: errors,
                    petitions: petitions,
                    isLoggedIn: request.session.isLoggedIn,
                    username: request.session.username,
                    accountId: request.session.uniqueId
                }
                if(model.petitions != null){
                    response.render("petitions.hbs", model)
                }else{
                    response.render("accounts-list-all.hbs")
                }
            })            
        }

    })
    router.post("/delete-petition/:id",function(request,response){
        const petitionId = request.params.id
        const accountId = request.body.accountId
        //todo handle errors
        if(accountId == request.session.uniqueId){
            petitionManager.deletePetition(petitionId,function(errors,response){
                console.log("eliminada")
                console.log("eliminada")
            })
            response.redirect("../../../")
        }else{
            //Not your petition
            console.log("Could not delete petition")
        }    
    })

    router.get("/update-petition/:id",function(request,response){
        const petitionId = request.params.id
        petitionManager.getPetitionById(petitionId,function(errors,petition){
            const model = {
				errors: errors,
                petition: petition,
                isLoggedIn: request.session.isLoggedIn,
                username: request.session.username,
                accountId: request.session.accountId,
                isMine: false
            }
            response.render("petition-edit.hbs", model)
        })
    })

    router.post("/update-petition/:id",function(request,response){
        const petitionId = request.params.id
        const accountId = request.session.uniqueId
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
            
            petitionManager.getPetitionById(petitionId,function(errors,result){
                const model = {
                    errors: errors,
                    petition: petition,
                    isLoggedIn: request.session.isLoggedIn,
                    username: request.session.username,
                    accountId: accountId,
                    isMine: true
                }
                response.redirect("../user/" + model.accountId)
            })
        })    
    })
    return router
}