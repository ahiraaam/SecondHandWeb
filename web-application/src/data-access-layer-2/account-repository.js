const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./db')


  const Account  = sequelize.define('accounts',{
    email: Sequelize.TEXT,
    username: Sequelize.TEXT,
    password : Sequelize.TEXT

  })
  
  const Petition = sequelize.define('petitions',{
    title: Sequelize.TEXT,
    autor: Sequelize.TEXT,
    comentary : Sequelize.TEXT,
    place: Sequelize.TEXT,
    state: Sequelize.TEXT,
    photo : Sequelize.TEXT,
    active: Sequelize.BOOLEAN
  })

  const Offer = sequelize.define('offer',{
    title: Sequelize.TEXT,
    autor: Sequelize.TEXT,
    comentary : Sequelize.TEXT,
    place: Sequelize.TEXT,
    state: Sequelize.TEXT,
    photo : Sequelize.TEXT,
    active: Sequelize.TEXT,
    price: Sequelize.INTEGER
  })



  Account.hasMany(Petition)
  Account.hasMany(Offer)
  Petition.hasMany(Offer)

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