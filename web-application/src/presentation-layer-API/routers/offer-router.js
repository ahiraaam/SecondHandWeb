const express = require('express')

module.exports = function({petitionManager,offerManager}){
    const router = express.Router()

    
    //Obtain information of one offer
    router.get("/petition/:id/offer/:id",function(request,response){

    })

    //Update an offer
    router.put("/petition/:id/offer/:id",function(request,response){

    })

    //Optain offers of an account
    router.get("/account/:id/offer",function(request,response){
        
    })
    
    //Create an offer
    router.post("/offer",function(request,response){

    })

    

    return router
}