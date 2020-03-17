const { Sequelize , Model, DataTypes } = require('sequelize')
const database = require('./db')

const { QueryTypes } = require('sequelize');

module.exports = function({}){
	return{
		/*
			Retrieves all offers ordered by title.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllPetitions : function(callback){
			
			database.petition.findAll({
                where : { active :true},
                raw: true
              })
          .then(function(allPetitions){callback([],allPetitions)})
          .catch(function(error){callback(['databaseError'], null)
            })
        },
        
    getSomePetitions : function(search, callback){

            
                database.petition.findAll({
                where : { title :search, active: true },
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
		getPetitionByUsername : function(account_id, callback){
            database.petition.findAll({
                where : { account_id : account_id},
                raw: true
              })
              .then(function(Petitions){callback([],Petitions)})
              .catch(function(error){callback(['databaseError'], null)})
			
        },
        getActivePetitionByUsername : function(account_id, callback){
            database.petition.findAll({
                where : {account_id : account_id, active : true},
                raw: true
              })
              .then(function(Petitions){callback([],Petitions)})
              .catch(function(error){callback(['databaseError'], null)})
			
        },
        getInactivePetitionByUsername : function(account_id, callback){
            database.petition.findAll({
                where : { account_id : account_id, active : false},
                raw: true
              })
              .then(function(Petitions){callback([],Petitions)})
              .catch(function(error){callback(['databaseError'], null)})
			
        },
        getPetitionById : function(id, callback){
            database.petition.findAll({
                where : { id : id},
                raw: true
              })
              .then(function(Petitions){callback([],Petitions[0])})
              .catch(function(error){callback(['databaseError'], null)})
			
        },
        getAccountOfPetition : function(id, callback){
            database.petition.findAll({
                where : { id : id},
                raw: true
              })
              .then(function(Petitions){callback([],Petitions.account_id)})
              .catch(function(error){callback(['databaseError'], null)})
			
        },
		/*
			Creates a new petition.
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createPetition : function(petition, account_id, callback){   
            database.petition.create({title : petition.title,author : petition.author,commentary : petition.commentary,place : petition.place, state : petition.state, photo : petition.photo, active : true, account_id : account_id})
            .then(function(createdPetition){callback([],createdPetition)})
            .catch(function(error){callback(['databaseError'], null)})

			
			
		},

		deletePetition : function (petition_id,callback){

			database.petition.destroy({
                where : {id : petition_id}
            })
            .then(function(){callback([],null)})
            .catch(function(error){callback(['databaseError'], null)})

		},


		updatePetition : function(petition,id, callback){
			
			database.petition.update({
                title: petition.title,
                author: petition.author,
                commentary: petition.commentary,
                place: petition.place,
                state: petition.state,
                photo : petition.photo,
            },{
                where : {id : id}
            })
            .then(function(Petition){callback([],Petition.id)})
            .catch(function(error){callback(['databaseError'], null)})
            
        },
        updatePetitionStatus : function(id, callback){
			
			database.petition.update({
                active: false
            },{
                where : {id : id}
            })
            .then(function(Petition){callback([],Petition)})
            .catch(function(error){callback(['databaseError'], null)})
            
        }

        


	
		
	}

}