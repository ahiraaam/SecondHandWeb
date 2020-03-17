
const express = require('express')
const bodyParser = require('body-parser')
//const jwt = require('jsonwebtoken')

module.exports = function({appAPI,appNormal}){
	
    
    const appRoutes = appNormal
    const restApiRoutes = appAPI

    const app = express()

    app.use(restApiRoutes)
    app.use(appRoutes)

	return app
}