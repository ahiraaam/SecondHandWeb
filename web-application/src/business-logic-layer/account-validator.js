module.exports = function({accountRepository}){
	const MIN_USERNAME_LENGTH = 3
	const MAX_USERNAME_LENGTH = 10
	const PASSWORD_MIN_LENGTH = 6
	const PASSWORD_MAX_LENGTH = 15

	return{
		getErrorsNewAccount : function(account){
			const errors = []
			// Validate username.
			if(!account.hasOwnProperty("username")){
				errors.push("Username is missing")
			}else if(MIN_USERNAME_LENGTH > account.username.length || account.username.length > MAX_USERNAME_LENGTH){
				errors.push("Username has to be between 3 and 10 characters")
			}
			if (!account.hasOwnProperty("email")) {
				errors.push("Email is missing.")
			} 
			if (!account.hasOwnProperty("password")) {
				errors.push("Password is missing.")
			} else if (!account.hasOwnProperty("passwordRepeated")) {
				errors.push("Repeated password is missing.")
			} else if (account.password != account.passwordRepeated) {
				errors.push("Passwords don't match.")
			} else if (PASSWORD_MIN_LENGTH > account.password.length || account.password.length > PASSWORD_MAX_LENGTH) {
				errors.push("Password has to be between 6 an 15 characters")
			}
			return errors
		}
	}

}





