const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
//const variousRouter = require('./routers/various-router')
//const accountRouter = require('./routers/account-router')
const bodyParser = require('body-parser')


const redis = require('redis')

const sessions = require('express-session')

let RedisStore = require('connect-redis')(sessions)
let RedisClient = redis.createClient(6379,"redis")

module.exports = function({accountRouter,variousRouter}){

	const app = express()
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended:true}))
	app.use(sessions({
		store: new RedisStore({client : RedisClient}),
		secret: 'ponga aqui algo seguro',
		resave: true,
		saveUninitialized: true
	}))

	// Setup express-handlebars.
	app.set('views', path.join(__dirname, 'views'))

	app.engine('hbs', expressHandlebars({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: path.join(__dirname, 'layouts')
	}))

	// Handle static files in the public folder.
	app.use(express.static(path.join(__dirname, '/public')))

	// Attach all routers.
	app.use('/', variousRouter)
	app.use('/accounts', accountRouter)

	// Start listening for incoming HTTP requests!
	
	return app
}