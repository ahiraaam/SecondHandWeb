module.exports = function({offerRepository}){
	return{
		
		getAllOffers : function(callback){
			offerRepository.getAllOffers(callback)
        },
        
		
		getOfferByPetition : function(petition_id, callback){
			offerRepository.getOfferByPetition(petition_id, callback)
		},
		
		createOffer : function(offer, accountId, petitionId, callback){
			
			offerRepository.createOffer(offer, accountId, petitionId, callback)
			
		},

		deleteOffer : function(offer_id, callback){

			offerRepository.deleteOffer(offer_id,callback)
		},

		updateOffer : function(offer,active, callback){
			
			offerRepository.updateOffer(offer,id,active,callback)
			
		},

		

	}
}