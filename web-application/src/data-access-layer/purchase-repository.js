const db = require('./db')
module.exports = function({}){
    return{

        getPurchasesByAccount : function(account_id, callback){

            const query = `SELECT * FROM purchases WHERE account_id = ? `
            const values = [account_id]

            db.query(query,values,function(error, purchases){
                if(error){
                    callback(['databaseError'],null)
                }else{
                    callback([],purchases[0])
                }
            })

        },

        getPurchasesByPetition : function(petition_id, callback){
            const query = `SELECT * FROM purchases WHERE petition_id = ? `
            const values = [petition_id]

            db.query(query,values,function(error, purchases){
                if(error){
                    callback(['databaseError'],null)
                }else{
                    callback([],purchases[0])
                }
            })
        },
        getPurchasesByOffer : function(offer_id, callback){

            const query = `SELECT * FROM purchases WHERE offer_id = ? `
            const values = [offer_id]

            db.query(query,values,function(error, purchases){
                if(error){
                    callback(['databaseError'],null)
                }else{
                    callback([],purchases[0])
                }
            })

        },

        createPurchase : function(purchase,account_id,petition_id,offer_id,callback){

            const query2 = `INSERT INTO purchases (street,city,zip,country,offer_id,petition_id,account_id) VALUES (?,?,?,?,?,?,?)`
            const values2 = [purchase.street,purchase.city,purchase.zip,purchase.country,offer_id,petition_id,account_id]

            db.query(query2,values2,function(error, results){
                if(error){
                    callback([error],null)
                }else{
                    callback([],results)
                }
            })
        },

    }
}