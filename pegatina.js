app.get("/pets", function(request, response){
	
	petHandler.getAllPets(function(errors, pets){
		if(0 < errors.length){
			response.status(500).end()
		}else{
			response.status(200).json(pets)
		}
	})
	
})

app.get("/pets/:id", function(request, response){
	
	const id = request.params.id
	
	petHandler.getPetById(id, function(errors, pet){
		if(0 < errors.length){
			response.status(500).end()
		}else if(!pet){
			response.status(404).end()
		}else{
			response.status(200).json(pet)
		}
	})
	
})

app.post("/pets", function(request, response){
	
	try {
		
		// TODO: Extracting the payload is better put in a function
		// (preferably a middleware function).
		const authorizationHeader = request.get('authorization')
		const accessToken = authorizationHeader.substr("Bearer ".length)
		
		// TODO: Better to use jwt.verify asynchronously.
		const payload = jwt.verify(accessToken, serverSecret)
		
		// Use payload to implement authorization...
		
	}catch(e){
		response.status(401).end()
		return
	}
	
	const name = request.body.name
	
	petHandler.createPet(name, function(errors, id){
		if(errors.includes("databaseError")){
			response.status(500).end()
		}else if(0 < errors.length){
			response.status(400).json(errors)
		}else{
			response.setHeader("Location", "/pets/"+id)
			response.status(201).end()
		}
	})
	
})

app.put("/pets/:id", function(request, response){
	
	try {
		
		// TODO: Extracting the payload is better put in a function
		// (preferably a middleware function).
		const authorizationHeader = request.get('authorization')
		const accessToken = authorizationHeader.substr("Bearer ".length)
		
		// TODO: Better to use jwt.verify asynchronously.
		const payload = jwt.verify(accessToken, serverSecret)
		
		// Use payload to implement authorization...
		
	}catch(e){
		response.status(401).end()
		return
	}
	
	const id = request.params.id
	const name = request.body.name
	
	petHandler.updatePetById(name, id, function(errors, petExists){
		if(errors.includes("databaseError")){
			response.status(500).end()
		}else if(0 < errors.length){
			response.status(400).json(errors)
		}else if(!petExists){
			response.status(404).end()
		}else{
			response.status(204).end()
		}
	})
	
})

app.delete("/pets/:id", function(request, response){
	
	try {
		
		// TODO: Extracting the payload is better put in a function
		// (preferably a middleware function).
		const authorizationHeader = request.get('authorization')
		const accessToken = authorizationHeader.substr("Bearer ".length)
		
		// TODO: Better to use jwt.verify asynchronously.
		const payload = jwt.verify(accessToken, serverSecret)
		
		// Use payload to implement authorization...
		
	}catch(e){
		response.status(401).end()
		return
	}
	
	const id = request.params.id
	
	petHandler.deletePetById(id, function(errors, petDidExist){
		if(0 < errors.length){
			response.status(500).end()
		}else if(!petDidExist){
			response.status(404).end()
		}else{
			response.status(204).end()
		}
	})
	
})
























const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')



module.exports = function({accountRouterAPI,variousRouter,petitionRouter,offerRouter}){
	
	const app = express()

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
	extended: false
	}))

	// TODO: Not a good idea to open up to entire world.
	// Better to only target the frontend application.
	app.use(function(request, response, next){
	response.setHeader("Access-Control-Allow-Origin", "*")
	response.setHeader("Access-Control-Allow-Methods", "*")
	response.setHeader("Access-Control-Allow-Headers", "*")
	response.setHeader("Access-Control-Expose-Headers", "*")
	next()
	})
	
	app.use("/api/account", accountRouterAPI)

	return app
}



app.listen(8080)









<div class="col-md-4 my-2">
                            <div class="card" style="height: 22em">
                                <img class="card-img-top image-card mt-3" src="{{photo}}" alt="">
                                <div class="card-body">
                                    <h4 class="card-title text-center">{{title}}</h4>
                                    <p class="card-text text-center">{{place}}</p>
                                    <a href="/petitions/{{id}}" class="btn btn-block primary-btn">See More</a>
                                </div>
                            </div>
                        </div> 