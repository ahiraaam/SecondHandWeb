module.exports = function({purchaseRepository}){
    return{

        getPurchasesByAccount : function(account_id,callback){
            purchaseRepository.getPurchasesByAccount(account_id,callback)
        },


        createPurchase : function(purchase,account_id,petition_id,offer_id,callback){
            purchaseRepository.createPurchase(purchase,account_id,petition_id,offer_id,callback)
        }

    }
}