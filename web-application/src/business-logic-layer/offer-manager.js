module.exports = function({offerRepository}){
	return{
		getAllOffers : function(callback){
			offerRepository.getAllOffers(callback)
        },
        getOfferByUsername: function(accountId, callback){
			offerRepository.getOfferByUsername(accountId, callback)
		},
		getActiveOffersByUsername: function(account_id,callback){
			offerRepository.getActiveOffersByUsername(account_id,callback)
		},
		getInactiveOffersByUsername: function(account_id,callback){
			offerRepository.getInactiveOffersByUsername(account_id,callback)
		},
		getOfferByPetition : function(petition_id, callback){
			offerRepository.getOfferByPetition(petition_id, callback)
		},
		getOfferById : function(offerId, callback){
			offerRepository.getOfferById(offerId, callback)
		},
		createOffer : function(offer, accountId, petitionId, callback){
			offerRepository.createOffer(offer, accountId, petitionId, callback)			
		},
		deleteOffer : function(offer_id, callback){
			offerRepository.deleteOffer(offer_id,callback)
		},
		updateOffer : function(offer,offer_id,callback){
			offerRepository.updateOffer(offer,offer_id,callback)
		},
		updateOfferStatus: function(id,callback){
			offerRepository.updateOfferStatus(id,callback)
		}
	}
}