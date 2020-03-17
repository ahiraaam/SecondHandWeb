module.exports = function({purchaseRepository}){
    return{

        getPurchasesByAccount : function(account_id,callback){
            purchaseRepository.getPurchasesByAccount(account_id,callback)
        },

        getPurchasesByPetition : function(petition_id,callback){
            purchaseRepository.getPurchasesByPetition(petition_id,callback)
        },

        getPurchasesByOffer : function(offer_id,callback){
            purchaseRepository.getPurchasesByOffer(offer_id,callback)
        },
        createPurchase : function(purchase,account_id,petition_id,offer_id,callback){
            purchaseRepository.createPurchase(purchase,account_id,petition_id,offer_id,callback)
        }

    }
}