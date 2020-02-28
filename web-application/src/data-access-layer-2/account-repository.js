const { Sequelize , Model, DataTypes } = require('sequelize')
const Account = require('./db')


  module.exports = function({}){
    return{
      /*
        Retrieves all accounts ordered by username.
        Possible errors: databaseError
        Success value: The fetched accounts in an array.
      */
      getAllAccounts : function(callback){
        Account.findAll({raw: true})
          .then(function(allAcounts){callback([],allAcounts)})
          .catch(function(error){
            console.log(error)
            console.log("si")
            callback(['databaseError'], null)
          })

        
      },
  
      /*
        Retrieves the account with the given username.
        Possible errors: databaseError
        Success value: The fetched account, or null if no account has that username.
      */
      /*getAccountByUsername : function(username, callback){
        
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

      */
      /*
        Creates a new account.
        account: {username: "The username", password: "The password"}
        Possible errors: databaseError, usernameTaken
        Success value: The id of the new account.
      */
      createAccount : function(account, callback){
        
        Account.create({email:account.email,username: account.username,password: account.password})
          .then(function(createdAccount){callback([],createdAccount.id)})
          .catch(function(error){callback(['databaseError'], null)})
        
      }
    
      
    }
  
  }