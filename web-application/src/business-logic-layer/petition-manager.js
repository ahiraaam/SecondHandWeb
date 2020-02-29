module.exports = function({petitionRepository}){
	return{
		
		getAllPetitions : function(callback){
			petitionRepository.getAllPetitions(callback)
        },
        
        getSomePetitions : function(search,callback){
			petitionRepository.getSomePetitions(search,callback)
		},
		
		getPetitionByUsername : function(username, callback){
			petitionRepository.getPetitionByUsername(username, callback)
		},
		
		createPetition : function(petition, callback){
			
			petitionRepository.createPetition(petition, callback)
			
		}
		

	}
}



