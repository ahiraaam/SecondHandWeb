const express = require('express')

module.exports = function({accountManager}){
	const router = express.Router()

	router.get("/sign-up", function(request, response){
		response.render("accounts-sign-up.hbs")
	})
	
	router.post("/sign-up",function(request,response){
	
		const email = request.body.email
		const username = request.body.username
		const password = request.body.password
	
		console.log(username,password)
		console.log("bienvenidos")	
		const account = {
			email : email,
			username : username,
			password : password
		}
	
		accountManager.createAccount(account,function(errors, result){
			console.log(result)
			console.log(errors)
		})
		
		response.render("accounts-sign-up.hbs")
	})
	
	router.get("/sign-out", function(request,response){
		request.session.destroy()
		response.redirect("/")

	})
	
	router.get("/sign-in", function(request, response){
		const exist = {
			answer :true
		}
		response.render("accounts-sign-in.hbs", exist)
	})	
	
	router.post("/sign-in", function(request, response){
		const username = request.body.username
		const password = request.body.password
		accountManager.ValidateSignIn(username,password,function(errors, account){
			const model = {
				errors: errors,
				account: account
			}
			
			const exist = {
				answer : true
			}
			
			if(model.account == null){
				exist.answer = false
				response.render("accounts-sign-in.hbs", exist)
			}else{
				request.session.isLoggedIn = true
				request.session.username = username
				response.redirect("/")
			}
			
		})
	})
	
	router.get("/", function(request, response){
		accountManager.getAllAccounts(function(errors, accounts){
			console.log(errors, accounts)
			const model = {
				errors: errors,
				accounts: accounts
			}
			response.render("accounts-list-all.hbs", model)
		})
	})
	
	router.get('/:username', function(request, response){
		
		const username = request.params.username
		
		accountManager.getAccountByUsername(username, function(errors, account){
			const model = {
				errors: errors,
				account: account
			}
			response.render("accounts-show-one.hbs", model)
		})
		
	})

	return router

}
