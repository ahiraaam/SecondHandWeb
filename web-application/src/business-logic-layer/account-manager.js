module.exports = function({accountRepository,accountValidator}){
	return{
		
		getAllAccounts : function(callback){
			accountRepository.getAllAccounts(callback)
		},
		
		getAccountByUsername : function(username, callback){
			accountRepository.getAccountByUsername(username, callback)
		},
		
		ValidateSignIn : function(username ,password, callback){
			accountRepository.getAccountByUsername(username,function(errors, account){
				const model = {
					errors: errors,
					account: account
				}
				if(model.account == null){
					callback(null,null)
					return
				}else{
					if(model.account.password == password){
						callback(model.errors,model.account)
						return
					}else{
						callback(null,null)
						return
					}
				}
				
				
			})
		
		},
		
		createAccount : function(account, callback){
			
			// Validate the account.
			const errors = accountValidator.getErrorsNewAccount(account)
			
			if(0 < errors.length){
				callback(errors, null)
				return
			}
			
			accountRepository.createAccount(account, callback)
			
		}
		

	}
}



