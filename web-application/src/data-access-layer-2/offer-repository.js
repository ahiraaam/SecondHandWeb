const { Sequelize , Model, DataTypes } = require('sequelize')
const database = require('./db')


module.exports = function({}){
	return{
		/*
			Retrieves all offers ordered by title.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllOffers : function(callback){
			
			database.offer.findAll({raw: true})
          .then(function(allOffers){callback([],allOffers)})
          .catch(function(error){callback(['databaseError'], null)
            })
		},

		/*
			Retrieves the petitions with the given username as the author.
			Possible errors: databaseError
			Success value: The fetched petitions, or null if no petition has that autor.
		*/
		getOfferByPetition : function(petition_id, callback){
			
            database.offer.findAll({
                where : { petition_id : petition_id},
                raw: true
              })
              .then(function(Offers){callback([],Offers)})
              .catch(function(error){callback(['databaseError'], null)})
			
		},

		getOfferById : function(offer_id, callback){
			
            database.offer.findAll({
                where : { id : offer_id},
                raw: true
              })
              .then(function(Offers){callback([],Offers[0])})
              .catch(function(error){callback(['databaseError'], null)})
			
		},
		getOfferByUsernme : function(account_id, callback){
			
            database.offer.findAll({
                where : { account_id : account_id},
                raw: true
              })
              .then(function(Offers){callback([],Offers)})
              .catch(function(error){callback(['databaseError'], null)})
			
		},
		getActiveOffersByUsername : function(account_id, callback){
			
            database.offer.findAll({
                where : { account_id : account_id, active : true},
                raw: true
              })
              .then(function(Offers){callback([],Offers)})
              .catch(function(error){callback(['databaseError'], null)})
			
		},
		getInactiveOffersByUsername : function(account_id, callback){
			
            database.offer.findAll({
                where : { account_id : account_id, active : false},
                raw: true
              })
              .then(function(Offers){callback([],Offers)})
              .catch(function(error){callback(['databaseError'], null)})
			
		},
		/*
			Creates a new petition.
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createOffer : function(offer, account_id, petition_id, callback){
            
            database.offer.create({title : offer.title,author : offer.author,comentary : offer.commentary,place : offer.place, state : offer.state, photo : offer.photo, active : true, price : offer.price, account_id : account_id, petition_id : petition_id})
            .then(function(createdOffer){callback([],createdOffer.id)})
            .catch(function(error){callback(['databaseError'], null)})

			
			
		},

		deleteOffer : function (offer_id,callback){

			database.offer.destroy({
                where : {id : offer_id}
            })
            .then(function(){callback([],null)})
            .catch(function(error){callback(['databaseError'], null)})

		},


		updateOffer : function(offer,id, callback){
			
		database.offer.update({
                title: offer.title,
                author: offer.author,
                commentary:offer.commentary,
                place: offer.place,
                state: offer.state,
                photo : offer.photo,
                price: offer.price            },{
                where : {id : id}
            })
            .then(function(Offer){callback([],Offer.id)})
            .catch(function(error){callback(['databaseError'], null)})
			
            },
            updateOfferStatus : function(id, callback){
			
			database.offer.update({
                active: false
            },{
                where : {id : id}
            })
            .then(function(Petition){callback([],Petition)})
            .catch(function(error){callback(['databaseError'], null)})
            
        }

	
		
	}

}
