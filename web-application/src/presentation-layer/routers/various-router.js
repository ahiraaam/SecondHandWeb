const express = require('express')
module.exports = function({petitionManager}){
  // Name all the dependencies in the curly brackets. 
  
 	const router = express.Router()
  
	router.get("/", function(request, response){
		petitionManager.getAllPetitions(function(errors,petitions){
			const model = {
				errors: errors,
				petitions: petitions,
				isLoggedIn: request.session.isLoggedIn,
				username: request.session.username,
				accountId: request.session.uniqueId
			}
			response.render("petitions.hbs", model)
        })
	})

 	 return router
  
}
