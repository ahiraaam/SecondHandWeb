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
     getAccountById : function(id, callback){

      database.account.findOne({
        where : {id : id},
        raw: true
      })
      .then(function(Account){callback([],Account)})
      .catch(function(error){callback(['databaseError'], null)})
      
    },
      getAccountByUsername : function(username, callback){

        database.account.findOne({
          where : {username : username},
          raw: true
        })
        .then(function(Account){
          console.log(Account)
          callback([],Account)})
        .catch(function(error){callback(['databaseError'], null)})
        
      },

      
      /*
        Creates a new account.
        account: {username: "The username", password: "The password"}
        Possible errors: databaseError, usernameTaken
        Success value: The id of the new account.
      */
      createAccount : function(account, callback){
        console.log(account);
        database.account.findOne({
          where : {username : account.username},
          raw: true
           })
          .then(function(Accounts){
            
          if(null != Accounts){
            callback(["Username already taken. Please choose another one"], null)
          }else if ( null == Accounts){

          database.account.create({email:account.email,username: account.username,password: account.password})
          .then(function(createdAccount){callback([],createdAccount.id)})
          .catch(function(error){callback(['databaseError1'], null)})

          }else{
            callback(['databaseError2'], null)
          }
            
          })
          .catch(function(error){
            console.log(error)
            console.log(error)
            callback(['databaseError3'], null)})

        
        
      },

      deleteAccount : function(id,callback){
        
        database.account.destroy({
          where : {id: id}
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