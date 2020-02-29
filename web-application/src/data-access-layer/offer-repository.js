const db = require('./db')
module.exports = function({}){
	return{
		/*
			Retrieves all offers ordered by title.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllOffers : function(callback){
			
			const query = `SELECT * FROM offer`
			const values = []
			
			db.query(query, values, function(error, offers){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], offers)
				}
			})
			
		},

		/*
			Retrieves the petitions with the given username as the author.
			Possible errors: databaseError
			Success value: The fetched petitions, or null if no petition has that autor.
		*/
		getOfferByPetition : function(petitionId, callback){
			
			const query = `SELECT * FROM offer WHERE petition_id = ?`
			const values = [petitionId]
			
			db.query(query, values, function(error, offers){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], offers)
				}
			})
			
		},
		/*
			Creates a new petition.
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createOffer : function(offer, callback){
			
			const query = `INSERT INTO offer (title,author,commentary, place, state, photo,account_id, petition_id, active, price) VALUES (?,?,?,?,?,?,?,?,?,?)`
			const values = [offer.title,offer.author,offer.commentary, offer.place, offer.state, offer.photo,offer.account_id, offer.petition_id, offer.active, offer.price]
			
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
