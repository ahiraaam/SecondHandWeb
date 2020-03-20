const express = require('express')
module.exports = function({accountManager}){
	const router = express.Router()
	const UN_ERROR = "You are unauthorized"

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
		try{
			accountManager.createAccount(account,function(errors, result){
				const model = {
					errors:errors
				}
				if(model.errors){
					response.render("accounts-sign-up.hbs", model)
				}else{
					request.session.isLoggedIn = true
					request.session.username = username
					request.session.uniqueId = result
					response.redirect("/")
				}
			})
		}catch{

		}
		
	})
	
	router.get("/sign-out", function(request,response){
		request.session.destroy()
		response.redirect("/")
	})
	
	router.get("/sign-in", function(request, response){
		const model = {
			answer: true
		}
		response.render("accounts-sign-in.hbs",model)
	})	
	router.post("/sign-in", function(request, response){
		const username = request.body.username
		const password = request.body.password
		accountManager.ValidateSignIn(username,password,function(errors, account){
			const model = {
				error: errors,
				account: account
			}
			console.log(model)
			console.log(model)
				if(model.account == null){
					response.render("accounts-sign-in.hbs")
				}else if(model.account!=null && model.error!=null){
					request.session.isLoggedIn = true
					request.session.username = username
					request.session.uniqueId = model.account.id
					response.redirect("/")
				}
		})
	})
	
	router.get('/:accountId', function(request, response){
		const accountId = request.params.accountId
		const myId = request.session.uniqueId
		const username = request.session.username
		const isLoggedIn = request.session.isLoggedIn
		if(isLoggedIn){
			if(accountId == myId){
				accountManager.getAccountById(accountId, function(errors, account){
					const model = {
						errors: errors,
						account: account,
						accountId: myId,
						isLoggedIn: isLoggedIn,
						username: username
					}
					if(account){
						response.render("accounts-show-one.hbs", model)
					}else{
						response.redirect("/")
					}
				})
			}else{
				const model = {
					error: UN_ERROR,
					username:username,
					accountId:myId,
					isLoggedIn:isLoggedIn
				}
				response.render("error.hbs",model)
			}
			
		}else{
			const model = {error: UN_ERROR}
			response.render("error.hbs",model)
		}
		
	})

	router.post("/delete-account",function(request,response){
		const accountId = request.session.uniqueId
		const myId = request.body.accountId
		const isLoggedIn = request.session.isLoggedIn
		if(isLoggedIn){
			if(accountId == myId){
				accountManager.deleteAccount(accountId, function(errors,res){
					request.session.destroy()
					response.redirect("/")
				})
			}else{
				const model = {error:UN_ERROR}
				response.render("error.hbs",model)
			}
		}else{
			response.render("error.hbs")
		}
	})
	return router
}
