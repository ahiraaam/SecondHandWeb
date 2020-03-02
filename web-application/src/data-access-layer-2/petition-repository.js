const { Sequelize , Model, DataTypes } = require('sequelize')
const db = require('./db')


module.exports = function({}){
	return{
		/*
			Retrieves all offers ordered by title.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllPetitions : function(callback){
			
			database.petition.findAll({raw: true})
          .then(function(allPetitions){callback([],allPetitions)})
          .catch(function(error){callback(['databaseError'], null)
            })
        },
        
        getSomePetitions : function(search, callback){
			
			database.petition.findAll({
                where : { title :{ $like : '%'+search+'%'  } },
                raw: true
              })
              .then(function(Petitions){callback([],Petitions)})
              .catch(function(error){callback(['databaseError'], null)})
			
		},

		/*
			Retrieves the petitions with the given username as the author.
			Possible errors: databaseError
			Success value: The fetched petitions, or null if no petition has that autor.
		*/
		getPetitionByUsername : function(accountId, callback){
			
            database.petition.findAll({
                where : { accountId : accountId},
                raw: true
              })
              .then(function(Petitions){callback([],Petitions)})
              .catch(function(error){callback(['databaseError'], null)})
			
		},
		/*
			Creates a new petition.
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createPetition : function(offer, accountId, callback){
            
            database.account.create({title : offer.title,author : offer.author,comentary : offer.commentary,place : offer.place, state : offer.state, photo : offer.photo, active : true, price : offer.price, accountId : accountId})
            .then(function(createdPetition){callback([],createdPetition.id)})
            .catch(function(error){callback(['databaseError'], null)})

			
			
		},

		deletePetition : function (petition_id,callback){

			database.petition.destroy({
                where : {id : petition_id}
            })
            .then(function(){callback([],null)})
            .catch(function(error){callback(['databaseError'], null)})

		},


		updatePetition : function(petition,id,active, callback){
			
			database.petition.update({
                title: petition.title,
                author: petition.author,
                commentary: petition.commentary,
                place: petition.place,
                state: petition.state,
                photo : petition.photo,
                active: active
            },{
                where : {id : id}
            })
            .then(function(Petition){callback([],Petition.id)})
            .catch(function(error){callback(['databaseError'], null)})
            
		}

	
		
	}

}