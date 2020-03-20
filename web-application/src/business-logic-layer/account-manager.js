module.exports = function({accountRepository,accountValidator}){
	return{
		
		getAllAccounts : function(callback){
			accountRepository.getAllAccounts(callback)
		},
		
		getAccountById : function(id, callback){
			accountRepository.getAccountById(id, callback)
		},
		
		ValidateSignIn : function(username,password, callback){
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
			const errors = accountValidator.getErrorsNewAccount(account)
			if(0 < errors.length){
				callback(errors, null)
				return
			}
			accountRepository.createAccount(account, function(error,results){
				if(0 < error.length){
					callback(error, null)
					return
				}else{
					callback(null, results)
					return
				}
			})
		},

		deleteAccount : function(username,callback){
			accountRepository.deleteAccount(username, callback)
		},
		
		updateAccount : function(account_id,callback){
			accountRepository.updateAccount(account_id,callback)
		}


	}
}



