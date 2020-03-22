import {login,logout,parseJwt} from './helperFunctions.js'
import {goToPage} from './navigation-handler.js'
export function loginSubmit(){
    document.querySelector("#login-page form").addEventListener("submit", function(event){
        event.preventDefault()
        const container = document.querySelector("#login-page")
        const loader = document.querySelector("#loader-page")
        loader.classList.add("current-page")
        container.classList.remove("current-page")
        const username = document.querySelector("#login-page #username").value
        const password = document.querySelector("#login-page #password").value
        const buttonSubmit = document.querySelector("#login-page #submit")
        document.querySelector("#login-page form").reset()
        
        fetch(
			"http://192.168.99.100:8080/api/tokens", {
				method: "POST",
				headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
				}, 
				body: "grant_type=password&username="+username+"&password="+password
			}
		).then(function(response){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
                if(response.status == 200){
                    console.log("ok")
                    return response.json().then(function(body){
                        // TODO: Read out information about the user account from the id_token.
                        login(body.access_token,body.id_token)
                        var jsonPayload = parseJwt(body.id_token)
                        var username = document.getElementById("nav-bar-username")
                        var anchorMyAccount = document.getElementById("a-my-account")
                        var anchorMyAccount = document.getElementById("a-my-account")
                        var anchorMyPetitions = document.getElementById("a-my-petitions")
                        var anchorMyOffers = document.getElementById("a-my-offers")
                        anchorMyAccount.setAttribute("href", '/account/'+jsonPayload.id)
                        anchorMyPetitions.setAttribute("href", '/account/'+jsonPayload.id+"/petitions")
                        anchorMyOffers.setAttribute("href", '/account/'+jsonPayload.id+"/offers")
                        anchorMyAccount.setAttribute("href", '/account/'+jsonPayload.id)
                        username.innerText = jsonPayload.username
                        goToPage("/")
                        console.log(body)
                })
                }else{
                    return response.json().then(function(error){
                        const text = document.getElementById("login-error-text")
                        text.innerText = error.error
                    })
                }
				
		}).catch(function(error){
			console.log(error)
		})
    })
}
export function createPetition(){
    document.querySelector("#create-petition-page form").addEventListener("submit", function(event){
        event.preventDefault()
        const container = document.querySelector("#create-petition-page")
        const loader = document.querySelector("#loader-page")
        loader.classList.add("current-page")
        container.classList.remove("current-page")
        const title = document.querySelector("#create-petition-page #title").value
        const author = document.querySelector("#create-petition-page #author").value
        const place = document.querySelector("#create-petition-page #place").value
        const state = document.querySelector("#create-petition-page #state").value
        const commentary = document.querySelector("#create-petition-page #commentary").value
        const photo = document.querySelector("#create-petition-page #photo").value
        const petition = {title,author,place,state,commentary,photo}
        document.getElementById("create-petition-form").reset()
        fetch(
			"http://192.168.99.100:8080/api/petitions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "User "+ localStorage.accessToken
				},
				body: JSON.stringify(petition)
			}
		).then(function(response){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
            if(response.status == 201){
                goToPage("/")
            }else{
                goToPage("/error") 
            }
        }).catch(function(error){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
            goToPage("/error")
        })
    })
}
export function createOffer(){
    document.querySelector("#create-offer-page form").addEventListener("submit", function(event){
        event.preventDefault()
        const container = document.querySelector("#create-offer-page")
        const loader = document.querySelector("#loader-page")
        loader.classList.add("current-page")
        container.classList.remove("current-page")
        const title = document.querySelector("#create-offer-page #title").value
        const author = document.querySelector("#create-offer-page #author").value
        const place = document.querySelector("#create-offer-page #place").value
        const state = document.querySelector("#create-offer-page #state").value
        const commentary = document.querySelector("#create-offer-page #commentary").value
        const price = document.querySelector("#create-offer-page #price").value
        const petitionId = document.querySelector("#create-offer-page #offer-petitionId").value
        const petition = {title,author,place,state,commentary,price,petitionId}

        document.getElementById("create-offer-form").reset()

        fetch(
			"http://192.168.99.100:8080/api/offer", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "User "+ localStorage.accessToken
				},
				body: JSON.stringify(petition)
			}
		).then(function(response){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
            if(response.status == 201){
                goToPage("/")
            }else{
                goToPage("/error") 
            }
        }).catch(function(error){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
            goToPage("/error")
        })
    })
}
export function signupSubmit(){
    document.querySelector("#signup-page form").addEventListener("submit",function(event){
        event.preventDefault()
        const container = document.querySelector("#signup-page")
        const loader = document.querySelector("#loader-page")
        loader.classList.add("current-page")
        container.classList.remove("current-page")
        const email = document.querySelector("#signup-page #email").value
        const username = document.querySelector("#signup-page #username").value
        const password = document.querySelector("#signup-page #password").value
        const passwordRepeated = document.querySelector("#signup-page #passwordRepeated").value

        const account = {email,username,password,passwordRepeated}

        document.querySelector("#signup-page form").reset()
        fetch(
			"http://192.168.99.100:8080/api/account", {
				method: "POST",
				headers: {
                    "Content-Type": "application/json"
				}, 
				body: JSON.stringify(account)
			}
		).then(function(response){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
            if(response.status == 200){
                console.log("ok")
                return response.json().then(function(body){
                    // TODO: Read out information about the user account from the id_token.
                    login(body.access_token,body.id_token)
                    var jsonPayload = parseJwt(body.id_token)
                    var username = document.getElementById("nav-bar-username")
                    var anchorMyAccount = document.getElementById("a-my-account")
                    var anchorMyPetitions = document.getElementById("a-my-petitions")
                    var anchorMyOffers = document.getElementById("a-my-offers")
                    anchorMyAccount.setAttribute("href", '/account/'+jsonPayload.id)
                    anchorMyPetitions.setAttribute("href", '/account/'+jsonPayload.id+"/petitions")
                    anchorMyOffers.setAttribute("href", '/account/'+jsonPayload.id+"/offers")
                    anchorMyAccount.setAttribute("href", '/account/'+jsonPayload.id)
                    username.innerText = jsonPayload.username
                    goToPage("/")
                    console.log(body)
                })
            }else{
                return response.json().then(function(error){
                    const errorText = document.getElementById("error-text")
                    errorText.innerText = error
                })
            }
				
		}).catch(function(error){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
            const errorText = document.getElementById("error-text")
            errorText.innerText = "Network error"
		})
    })
}
export function createPurchase(){
    document.querySelector("#create-purchase-page form").addEventListener("submit", function(event){
        event.preventDefault()
        const container = document.querySelector("#create-purchase-page")
        const loader = document.querySelector("#loader-page")
        loader.classList.add("current-page")
        container.classList.remove("current-page")
        const street = document.querySelector("#create-purchase-page #street").value
        const address2 = document.querySelector("#create-purchase-page #address2").value
        const city = document.querySelector("#create-purchase-page #city").value
        const region = document.querySelector("#create-purchase-page #region").value
        const zip = document.querySelector("#create-purchase-page #zip").value
        const country = document.querySelector("#create-purchase-page #country").value
        const petitionId = document.querySelector("#purchase-petitionId").value
        const offerId = document.querySelector("#purchase-offerId").value
        const purchase = {street,address2,city,region,zip,country,petitionId,offerId}

        document.getElementById("create-purchase-form").reset()

        fetch(
			"http://192.168.99.100:8080/api/purchase", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "User "+ localStorage.accessToken
				},
				body: JSON.stringify(purchase)
			}
		).then(function(response){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
            if(response.status == 200){
                goToPage("/")
            }else{
                console.log("jajajajja")
                console.log("jajajajja")
                goToPage("/error") 
            }
        }).catch(function(error){
            loader.classList.remove("current-page")
            container.classList.add("current-page")
            goToPage("/error")
        })
    })

}
export function deleteAccount(){
    document.querySelector("#delete-account").addEventListener("submit",function(event){
        event.preventDefault()
        var id = document.querySelector("#delete-account #accountId").value
        deleteAccountFunction(id)
    })
}
export function editPetition(){
    document.querySelector("#edit-petition-page form").addEventListener("submit",function(event){
        event.preventDefault()
        var id = document.querySelector("#edit-petition-page #editPetitionId").value
        editPetitionPut(id)
        goToPage("/")
    })
}
export function editOffer(){
    document.querySelector("#edit-offer-page form").addEventListener("submit",function(event){
        event.preventDefault()
        var id = document.querySelector("#edit-offer-page #edit-offerId").value
        editOfferPut(id)
        goToPage("/")
    })
}
function deleteAccountFunction(id){
    fetch(
        "http://192.168.99.100:8080/api/account/"+id,{
            method: "DELETE",
			headers: {
                "Authorization": "User "+ localStorage.accessToken
            },
        }
    ).then(function(response){
        if(response.status == 201){
            logout()
            goToPage("/")
        }else{
            goToPage("/error")
        }
    }).catch(function(error){
        goToPage("/error")
    })
}
function editPetitionPut(id){
    const title = document.querySelector("#form-update-petition #titleEdit").value
    const author = document.querySelector("#form-update-petition #authorEdit").value
    const place = document.querySelector("#form-update-petition #placeEdit").value
    const state = document.querySelector("#form-update-petition #stateEdit").value
    const commentary = document.querySelector("#form-update-petition #commentaryEdit").value
    const photo = document.querySelector("#form-update-petition #photoEdit").value
    const petition = {title,author,place,state,commentary,photo}
    const container = document.querySelector("#edit-petition-page")
    const loader = document.querySelector("#loader-page")
    loader.classList.add("current-page")
    container.classList.remove("current-page")
    document.getElementById("form-update-petition").reset()
    
fetch(
    "http://192.168.99.100:8080/api/petitions/"+id,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "User "+ localStorage.accessToken
        },
        body: JSON.stringify(petition)
    }
).then(function(response){
    loader.classList.remove("current-page")
    if(response.status == 201){
        goToPage("/")
    }else{
        goToPage("/error")
        console.log(response)
    }
}).catch(function(error){
    loader.classList.remove("current-page")
    goToPage("/error")
})
}
function editOfferPut(id){
    const title = document.querySelector("#form-update-offer #title").value
    const author = document.querySelector("#form-update-offer #author").value
    const place = document.querySelector("#form-update-offer #place").value
    const state = document.querySelector("#form-update-offer #state").value
    const commentary = document.querySelector("#form-update-offer #commentary").value
    const price = document.querySelector("#form-update-offer #price").value
    const offer = {title,author,place,state,commentary,price}
    const container = document.querySelector("#edit-offer-page")
    const loader = document.querySelector("#loader-page")
    loader.classList.add("current-page")
    container.classList.remove("current-page")
    document.getElementById("form-update-offer").reset()
    fetch(
        "http://192.168.99.100:8080/api/offer/"+id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "User "+ localStorage.accessToken
            },
            body: JSON.stringify(offer)
        }
    ).then(function(response){
        loader.classList.remove("current-page")
        container.classList.add("current-page")
        if(response.status == 200){
            goToPage("/")
        }else{
            goToPage("/error")
        }
    }).catch(function(error){
        loader.classList.remove("current-page")
        container.classList.add("current-page")
        goToPage("/error")
    })
}