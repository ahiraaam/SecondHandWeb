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
    router.post("/petitions/:id",function(request,response){

    })

    //Create a petition
    router.post("/petitions",function(request,response){

    })


    //Update a petition
    router.put("/petitions/:id",function(request,response){

    })


    //Obtain petitions of an account
    router.get("/account/:id/petitions",function(request,response){

    })

    

    return router
}