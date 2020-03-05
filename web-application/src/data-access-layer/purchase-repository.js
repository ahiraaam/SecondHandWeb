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
                    callback([],purchases)
                }
            })

        },


        createPurchase : function(purchase,account_id,petition_id,offer_id,callback){

            const query = `INSERT INTO purchases (direction,account_id,petition_id, offer_id) VALUES (?,?,?,?)`
            const values = [purchase.direction,account_id,petition_id,offer_id]

            db.query(query,values,function(error, results){
                if(error){
                    callback(['databaseError'],null)
                }else{
                    callback([],results.insertId)
                }
            })


        }


    }
}