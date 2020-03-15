const db = require('./db')
module.exports = function({}){
	return{
		/*
			Retrieves all petitions ordered by autor.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllPetitions : function(callback){
			
			const query = `SELECT * FROM petitions WHERE active = true ORDER BY title `
			const values = []
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], petitions)
				}
			})
			
		},

		getSomePetitions : function(search, callback){
			
			const query = `SELECT * FROM petitions WHERE title LIKE ? and active = true`
			const values = [search]
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback("Something went wrong", null)
				}else{
					callback([], petitions)
				}
			})
			
		},


		/*
			Retrieves the petitions with the given username as the author.
			Possible errors: databaseError
			Success value: The fetched petitions, or null if no petition has that autor.
		*/
		getPetitionByUsername : function(account_id, callback){
			
			const query = `SELECT * FROM petitions WHERE account_id = ?`
			const values = [account_id]
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], petitions)
				}
			})
			
		},
		getActivePetitionByUsername : function(account_id, callback){
			
			const query = `SELECT * FROM petitions WHERE account_id = ? AND active = true` 
			const values = [account_id]
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], petitions)
				}
			})
			
		},
		getInactivePetitionByUsername : function(account_id, callback){
			
			const query = `SELECT * FROM petitions WHERE account_id = ? AND active = false` 
			const values = [account_id]
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], petitions)
				}
			})
			
		},
		getPetitionById : function(id, callback){
			const query = `SELECT * FROM petitions WHERE id = ? LIMIT 1`
			const values = [id]
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], petitions[0])
				}
			})
			
		},
		getAccountOfPetition : function(id, callback){
			const query = `SELECT * FROM petitions WHERE id = ? LIMIT 1`
			const values = [id]
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], petitions[0].account_id)
				}
			})
			
		},
		/*
			Creates a new petition.
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createPetition : function(petition, accountId , callback){
			
			const active = true
			const query = `INSERT INTO petitions (title,author,commentary, place, state, photo, active, account_id) VALUES (?,?,?,?,?,?,?,?)`
			const values = [petition.title,petition.author,petition.commentary, petition.place, petition.state, petition.photo, active, accountId]
			
			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					callback(['databaseError'], null)
				}else{
					callback([], results)
				}
			})
			
		},

		deletePetition : function(petition_id,callback){
			const query = `DELETE FROM petitions WHERE id = ?`
			const values = [petition_id]
			
			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					callback([error], null)
				}else{
					callback([], null)
				}
			})

		},

		updatePetition : function(petition, id, callback){
			const query = `UPDATE petitions SET title = ?,author = ?,commentary = ?, place = ?, state = ?, photo = ? WHERE id = ?`
			const values = [petition.title,petition.author,petition.commentary, petition.place, petition.state, petition.photo, id]
			
			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					callback([error], null)
				}else{
					callback([], results)
				}
			})
		},

		updatePetitionStatus : function(id,callback){
			const query = `UPDATE petitions SET active = false WHERE id = ?`
			const values = [id]
			db.query(query,values,function(error,results){
				if(error){
					callback([error],null)
				}else{
					callback([],results)
				}
			})

		}
	
	}

}
