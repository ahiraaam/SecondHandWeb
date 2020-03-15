const db = require('./db')
module.exports = function({}){
	return{
		/*
			Retrieves all accounts ordered by username.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllAccounts : function(callback){
			
			const query = `SELECT * FROM accounts ORDER BY username`
			const values = []
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts)
				}
			})
			
		},

		/*
			Retrieves the account with the given username.
			Possible errors: databaseError
			Success value: The fetched account, or null if no account has that username.
		*/
		getAccountById : function(id, callback){
			
			const query = `SELECT * FROM accounts WHERE id = ? LIMIT 1`
			const values = [id]
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts[0])
				}
			})
			
		},
		getAccountByUsername : function(username, callback){
			
			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [username]
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts[0])
				}
			})
			
		},
		/*
			Creates a new account.
			account: {username: "The username", password: "The password"}
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createAccount : function(account, callback){

			const queryCheck = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const valuesCheck = [account.username]
			db.query(queryCheck, valuesCheck, function(errorCheck, resultsCheck){

				if(0 < resultsCheck.length){
					// TODO: Look for usernameUnique violation.
					callback(["Username already taken. Please choose another one"], null)

				}else if (0 == resultsCheck.length){

					const query = `INSERT INTO accounts (email,username, password) VALUES (?,?,?)`
					const values = [account.email, account.username, account.password]
					
					db.query(query, values, function(error, results){
						if(error){
							// TODO: Look for usernameUnique violation.
							callback(error, null)
						}else{
							callback([], results.insertId)
						}
					})					

				}else{
					callback(["Error with database1"], null)
				}
			})

			
			
		},

		deleteAccount : function(accountId,callback){
			
			const query = `DELETE FROM accounts WHERE id = ?`
			const values = [accountId]
			
			db.query(query, values, function(error, results){
				if(error){
					callback([error], null)
				}else{
					callback([], null)
				}
			})

		},

		updateAccount : function(account, id , callback){
			
			const query = `UPDATE accounts SET email= ? , username = ? , password = ? WHERE id = ?`
			const values = [account.email, account.username, account.password,id]
			
			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					callback(['databaseError'], null)
				}else{
					callback([], results.insertId)
				}
			})
			
		}
	
		
	}

}
