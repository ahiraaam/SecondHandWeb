const express = require('express')
const bodyParser = require('body-parser')
//const jwt = require('jsonwebtoken')



module.exports = function({accountRouterAPI,petitionRouterAPI,offerRouterAPI,purchaseRouterAPI}){
	
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
	
	app.use("/api/", accountRouterAPI)
	app.use("/api/", petitionRouterAPI)
	app.use("/api/", offerRouterAPI)
	app.use("/api/", purchaseRouterAPI)

	return app
}