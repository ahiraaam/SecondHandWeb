module.exports = function({petitionRepository}){
	return{
		
		getAllPetitions : function(callback){
			petitionRepository.getAllPetitions(callback)
        },
        
        getSomePetitions : function(search,callback){
			petitionRepository.getSomePetitions(search,callback)
		},
		
		getPetitionByUsername : function(account_id, callback){
			petitionRepository.getPetitionByUsername(username, callback)
		},
		
		createPetition : function(petition, accountId, callback){
			
			petitionRepository.createPetition(petition, accountId, callback)
			
		},

		deletePetition : function(petition_id, callback){

			petitionRepository.deletePetition(petition_id,callback)

		},

		updatePetition : function(petition,id, active,callback){

			petitionRepository.updatePetition(petition,id,active, callback)
		}

		

	}
}



