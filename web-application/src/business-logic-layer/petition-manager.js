module.exports = function({petitionRepository}){
	return{
		
		getAllPetitions : function(callback){
			petitionRepository.getAllPetitions(callback)
        },
        
        getSomePetitions : function(search,callback){
			petitionRepository.getSomePetitions(search,callback)
		},
		
		getPetitionByUsername : function(account_id, callback){
			petitionRepository.getPetitionByUsername(account_id, callback)
		},
		getActivePetitionByUsername: function(account_id, callback){
			petitionRepository.getActivePetitionByUsername(account_id,callback)
		},
		getInactivePetitionByUsername: function(account_id, callback){
			petitionRepository.getInactivePetitionByUsername(account_id,callback)
		},
		getPetitionById : function(id, callback){
			petitionRepository.getPetitionById(id, callback)
		},
		getAccountOfPetition: function(id,callback){
			petitionRepository.getAccountOfPetition(id,callback)
		},
		createPetition : function(petition, accountId, callback){
			petitionRepository.createPetition(petition, accountId, callback)
		},

		deletePetition : function(petition_id, callback){
			petitionRepository.deletePetition(petition_id,callback)
		},

		updatePetition : function(petition,id,callback){

			petitionRepository.updatePetition(petition, id , callback)
		},

		updatePetitionStatus: function(id,callback){
			petitionRepository.updatePetitionStatus(id,callback)
		}

		

	}
}



