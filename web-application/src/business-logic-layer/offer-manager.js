module.exports = function({offerRepository}){
	return{
		
		getAllOffers : function(callback){
			offerRepository.getAllOffers(callback)
        },
        
		
		getOfferByPetition : function(petition_id, callback){
			offerRepository.getOfferByPetition(petition_id, callback)
		},
		
		createoffer : function(petition, callback){
			
			offerRepository.createOffer(offer, callback)
			
		}
		

	}
}