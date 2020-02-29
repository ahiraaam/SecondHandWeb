const db = require('./db')
module.exports = function({}){
	return{
		/*
			Retrieves all petitions ordered by autor.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllPetitions : function(callback){
			
			const query = `SELECT * FROM petitions ORDER BY title`
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
			
			const query = `SELECT * FROM petitions WHERE title LIKE %?%`
			const values = [search]
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback(['databaseError'], null)
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
		getPetitionByUsername : function(username, callback){
			
			const query = `SELECT * FROM petitions WHERE autor = ?`
			const values = [username]
			
			db.query(query, values, function(error, petitions){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], petitions)
				}
			})
			
		},
		/*
			Creates a new petition.
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createPetition : function(petition, callback){
			
			const query = `INSERT INTO petitions (title,author,commentary, place, state, photo, active, account_id) VALUES (?,?,?,?,?,?,?,?)`
			const values = [petition.title,petition.author,petition.commentary, petition.place, petition.state, petition.photo, petition.active, petition.account_id]
			
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
