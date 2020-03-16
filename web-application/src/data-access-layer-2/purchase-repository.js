const { Sequelize , Model, DataTypes } = require('sequelize')
const database = require('./db')

module.exports = function({}){
    
    
    return{

        getPurchaseByAccount : function(account_id,callback){
            database.purchase.findAll({
                where : { account_id : account_id},
                raw: true
            })

            .then(function(allPurchases){callback([],allPurchases)})
            .catch(function(error){callback(['databaseError'], null)
            })

        },
        getPurchasesByPetition : function(petition_id,callback){
            database.purchase.findAll({
                where : { petition_id : petition_id},
                raw: true
            })

            .then(function(allPurchases){callback([],allPurchases[0])})
            .catch(function(error){callback(['databaseError'], null)
            })

        },
        getPurchasesByOffer : function(offer_id,callback){
            database.purchase.findAll({
                where : { offer_id : offer_id},
                raw: true
            })

            .then(function(allPurchases){callback([],allPurchases[0])})
            .catch(function(error){callback(['databaseError'], null)
            })

        },


        createPurchase : function(purchase,account_id,petition_id,offer_id,callback){

            database.purchase.create({
                street : purchase.street,
                city : purchase.city,
                zip : purchase.zip,
                country : purchase.country,
                account_id : account_id,
                petition_id : petition_id,
                offer_id : offer_id})
            .then(function(createdPurchase){callback([],createPurchase)})
            .catch(function(error){callback(['databaseError'],null)})

        }

    }


}