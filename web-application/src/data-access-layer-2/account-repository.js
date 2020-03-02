const { Sequelize , Model, DataTypes } = require('sequelize')
const database = require('./db')


  module.exports = function({}){
    return{
      /*
        Retrieves all accounts ordered by username.
        Possible errors: databaseError
        Success value: The fetched accounts in an array.
      */
      getAllAccounts : function(callback){
        const palabra = "Alice"
        database.account.findAll({
          where : { username :{ $like : '%Alice'  } },
          raw: true
        })
          .then(function(allAcounts){callback([],allAcounts)})
          .catch(function(error){callback(['databaseError'], null)
          })

        
      },
  
      /*
        Retrieves the account with the given username.
        Possible errors: databaseError
        Success value: The fetched account, or null if no account has that username.
      */
      getAccountByUsername : function(username, callback){

        database.account.findOne({
          where : {username : username},
          raw: true
        })
        .then(function(Account){callback([],Account)})
        .catch(function(error){callback(['databaseError'], null)})
        
      },

      
      /*
        Creates a new account.
        account: {username: "The username", password: "The password"}
        Possible errors: databaseError, usernameTaken
        Success value: The id of the new account.
      */
      createAccount : function(account, callback){
        
        database.account.create({email:account.email,username: account.username,password: account.password})
          .then(function(createdAccount){callback([],createdAccount.id)})
          .catch(function(error){callback(['databaseError'], null)})
        
      },

      deleteAccount : function(username,callback){
        
        database.account.destroy({
          where : {username : username}
        })
        .then(function(){callback([],null)})
        .catch(function(error){callback(['databaseError'], null)})

      }, 

      updateAccount : function(account, id ,callback){

        database.account.update({
          email : account.email,
          username : account.username,
          password : account.password
        },{
          where : {id : id}
        })
        .then(function(Account){callback([],Account.id)})
        .catch(function(error){callback(['databaseError'], null)})


      }
    
      
    }
  
  }