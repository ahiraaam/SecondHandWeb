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
		const passwordRepeated = request.body.passwordRepeated
	
		const account = {
			email : email,
			username : username,
			password : password,
			passwordRepeated: passwordRepeated
		}
		accountManager.createAccount(account,function(errors, result){
			const model = {
				errors:errors
			}
			console.log(model)
			console.log(model)
			if(model.errors){
				response.render("accounts-sign-up.hbs", model)
			}else{
				request.session.isLoggedIn = true
				request.session.username = username
				request.session.uniqueId = result
				response.redirect("/")
			}
		})
		
	})
	
	router.get("/sign-out", function(request,response){
		request.session.destroy()
		response.redirect("/")

	})
	
	router.get("/sign-in", function(request, response){
		response.render("accounts-sign-in.hbs")
	})	
	router.post("/sign-in", function(request, response){
		const username = request.body.username
		const password = request.body.password
		accountManager.ValidateSignIn(username,password,function(errors, account){
			const model = {
				errors: errors,
				account: account
			}
			if(model.account == null){
				response.render("accounts-sign-in.hbs")
			}else{
				request.session.isLoggedIn = true
				request.session.username = username
				request.session.uniqueId = model.account.id
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
	
	router.get('/:accountId', function(request, response){
		const username = request.session.username
		const accountId = request.session.uniqueId
		const isLoggedIn = request.session.isLoggedIn

		accountManager.getAccountById(accountId, function(errors, account){
			const model = {
				errors: errors,
				account: account,
				accountId: accountId,
				isLoggedIn: isLoggedIn,
				username: username
			}
			response.render("accounts-show-one.hbs", model)
		})
		
	})

	router.post("/delete-account",function(request,response){
		const accountId = request.session.uniqueId
		const isLoggedIn = request.session.isLoggedIn
		accountManager.deleteAccount(accountId, function(errors,res){
			request.session.destroy()
			response.redirect("/")
		})
	})

	return router

}
