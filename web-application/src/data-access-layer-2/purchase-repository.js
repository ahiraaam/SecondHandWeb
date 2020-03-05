const { Sequelize , Model, DataTypes } = require('sequelize')
const database = require('./db')

module.exports = function({}){
    
    
    return{

        getPurchaseByAccount : function(accountID,callback){
            database.purchase.findAll({
                where : { accountID : accountID},
                raw: true
            })

            .then(function(allPurchases){callback([],allPurchases)})
            .catch(function(error){callback(['databaseError'], null)
            })

        },


        createPurchase : function(purchase,accounId,petitionId,offerId,callback){

            database.purchase.create({direction : purchase.direction,accountId : accounId,petitionId : petitionId,offerId : offerId})
            .then(function(createdPurchase){callback([],createPurchase.id)})
            .catch(function(error){callback(['databaseError'],null)})

        }

    }


}