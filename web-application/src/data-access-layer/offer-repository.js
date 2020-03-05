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

		getOfferById : function(offerId, callback){
			
			const query = `SELECT * FROM offer WHERE id = ? LIMIT 1`
			const values = [offerId]
			
			db.query(query, values, function(error, offers){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], offers[0])
				}
			})
			
		},
		getOfferByUsername : function(account_id, callback){
			const query = `SELECT * FROM offer WHERE account_id = ?`
			const values = [account_id]
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
		createOffer : function(offer, accountId, petitionId, callback){
			const active = true
			const query = `INSERT INTO offer (title,author,commentary, place, state, photo,account_id, petition_id, active, price) VALUES (?,?,?,?,?,?,?,?,?,?)`
			const values = [offer.title,offer.author,offer.commentary, offer.place, offer.state, null ,accountId, petitionId, active, offer.price]
			
			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					callback(error, null)
				}else{
					callback([], results.insertId)
				}
			})
			
		},

		deleteOffer : function (offer_id,callback){

			const query = `DELETE FROM offer WHERE id = ?`
			const values = [offer_id]

			db.query(query, values, function(error,results){
				if(error){
					callback([`databaseError`],null)
				}else{
					callback([], null)
				}
			})

		},


		updateOffer : function(offer,id, active, callback){
			
			const query = `UPDATE offer SET title = ?,author = ?,commentary = ?, place = ?, state = ?, photo = ?, active = ?, price = ? WHERE id = ?`
			const values = [offer.title,offer.author,offer.commentary, offer.place, offer.state, null,active, offer.price,id]
			
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
