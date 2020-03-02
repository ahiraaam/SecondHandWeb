const express = require('express')
module.exports = function({}){
  // Name all the dependencies in the curly brackets. 
  
 	const router = express.Router()
  
	router.get("/", function(request, response){
		response.render("petitions-account.hbs",{
			isLoggedIn: request.session.isLoggedIn,
			username: request.session.username
		})
	})

	router.get("/about", function(request, response){
		response.render("about.hbs")
	})

	router.get("/contact", function(request, response){
		response.render("contact.hbs")
	})
	
 	 return router
  
}
