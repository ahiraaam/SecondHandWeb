const express = require('express')
//const jwt = require('jsonwebtoken')

module.exports = function({accountManager}){
	const router = express.Router()
    const serverSecret = "sdfkjdslkfjslkfd"

    //Create Token after validating that the user and password are correct
    router.post("/tokens", function(request, response){
	
        const grantType = request.body.grant_type
        const username = request.body.username
        const password = request.body.password
        
    
        if(grantType != "password"){
            response.status(400).json({error: "unsupported_grant_type"})
            return
        }
        
        accountManager.ValidateSignIn(username,password,function(errors, account){
			const model = {
				errors: errors,
				account: account
			}
			
			
			
			if(model.account == null){
				
                
                response.status(400).json({error: "invalid_grant"})


			}else{

            // TODO: Put user authorization info in the access token.
                const payload = {id: model.account.id}
                // TODO: Better to use jwt.sign asynchronously.
                const accessToken = jwt.sign(payload, serverSecret)
                
                // TODO: Put user info in the id token.
                // Try to use the standard claims:
                // https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
                const idToken = jwt.sign(
                    {sub: model.account.id, username: model.account.username},
                    "lkjlkjlkjljlk"
                )
                
                response.status(200).json({
                    access_token: accessToken,
                    id_token: idToken
                })
			}
			
		})
        
    }),

    //Create a new account 

    router.post("/account",function(request,response){
        const email = request.body.email
		const username = request.body.username
		const password = request.body.password
	
		const account = {
			email : email,
			username : username,
			password : password
		}
	
		accountManager.createAccount(account,function(errors, result){
        
            if(errors.includes("databaseError")){
                response.status(500).end()
            }else if(0 < errors.length){
                response.status(400).json(errors)
            }else{
                response.setHeader("Location", "/")
                response.status(201).end()
            }

		})
		
		
    })

    //Obtain data for the account profile page
    router.get("/account/:id",function(request,response){
        const id = request.params.id
        try {
		
            const authorizationHeader = request.get('authorization')
            const accessToken = authorizationHeader.substr("Account ".length)
            

            const payload = jwt.verify(accessToken, serverSecret)
            
            if(payload.id != id){
                response.status(401).end()
                return
            }
        }catch(e){
            response.status(401).end()
            return
        }
        
        //Get account by Id
		accountManager.getAccountById(Id, function(errors, account){
            const model = {
                errors: errors,
                account: account,
            }
            if(0 < errors.length){
                response.status(500).end()
            }else{
                response.status(200).json(model)
            }
        })
    }),

    function AccesTokenInformation(authorizationHeader){

		const accessToken = authorizationHeader.substr("User".length)
		
		// TODO: Better to use jwt.verify asynchronously.
		const payload = jwt.verify(accessToken, serverSecret)
        console.log(payload.id)
        const id = payload.id
       
        return id
    }






    return router

}

