import {fetchAllPetitions, 
    fetchPetition, 
    fetchOffer,
    fetchPurchaseByPetition,
    fetchPurchaseByOffer,
    fetchEditPetition,
    fetchEditOffer
} from './loaderFunctions.js'
import {
    fetchAccount,
    fetchAccountOffers,
    fetchAccountPetitions,
} from './loadAccountFunctions.js'
import {changeActivePetitions,
    changeActiveOffers,
    login,
    logout,
    parseJwt} from './helperFunctions.js'

import {
    loginSubmit, 
    signupSubmit, 
    createOffer, 
    createPetition, 
    createPurchase,
    deleteAccount,
    editPetition,
    editOffer} from './submitFunctions.js'

document.addEventListener("DOMContentLoaded",function() {
    changeActivePetitions()
    changeActiveOffers()
    changeToPage(location.pathname)
    if(localStorage.accessToken){
        const jsonPayload = parseJwt(localStorage.idToken)
        const username = document.getElementById("nav-bar-username")
        const anchorMyAccount = document.getElementById("a-my-account")
        const anchorMyPetitions = document.getElementById("a-my-petitions")
        const anchorMyOffers = document.getElementById("a-my-offers")
        login(localStorage.accessToken,localStorage.idToken)
        
        anchorMyAccount.setAttribute("href", '/account/'+jsonPayload.id)
        anchorMyPetitions.setAttribute("href", '/account/'+jsonPayload.id+"/petitions")
        anchorMyOffers.setAttribute("href", '/account/'+jsonPayload.id+"/offers")

        username.innerText = jsonPayload.username
	}else{
		logout()
    }
    document.body.addEventListener("click", function(event){
        if(event.target.tagName == "A"){
                event.preventDefault()
                const url = event.target.getAttribute("href")
                console.log(url)
                goToPage(url)
        }
    })

    loginSubmit()
    signupSubmit()
    createOffer()
    createPetition()
    createPurchase()
    deleteAccount()
    editPetition()
    editOffer()
   
})
document.addEventListener("submit",function(e){
    if(e.target && e.target.id=="form-delete-petition"){
        e.preventDefault()
        var id = document.querySelector("#account-petitions-page #idPetition").value
        deletePetition(id)
    }
    if(e.target && e.target.id=="form-delete-offer"){
        e.preventDefault()
        var id = document.querySelector("#account-offers-page #idOffer").value
        deleteOffer(id)
    }
})
window.addEventListener("popstate", function(event){
	const url = location.pathname
	changeToPage(url)
})
export function goToPage(url){
	changeToPage(url)
	history.pushState({}, "", url)
}
function changeToPage(url){
    const currentPageDiv = document.getElementsByClassName("current-page")[0]
	if(currentPageDiv){
		currentPageDiv.classList.remove("current-page")
	}
	if(url == "/"){
        document.getElementById("petitions-page").classList.add("current-page")
        fetchAllPetitions()
    }else if(url == "/login"){
		document.getElementById("login-page").classList.add("current-page")
    }else if(url == "/signup"){
        document.getElementById("signup-page").classList.add("current-page")
    }else if(new RegExp("/account/[0-9]+$").test(url)){
        const id = url.split("/")[2]
        var accountId = document.querySelector("#delete-account #accountId")
        accountId.value = id
		fetchAccount(id)
	}else if(url == "/logout"){
        logout()
        goToPage("/")
	}else if(url == "/create-petition"){
        document.getElementById("create-petition-page").classList.add("current-page")
    }else if(url == "/create-offer"){
        document.getElementById("create-offer-page").classList.add("current-page")
    }else if(url == "/purchase"){
        document.getElementById("create-purchase-page").classList.add("current-page")
    }else if(new RegExp("/purchase/petition/[0-9]+$").test(url)){
        const id = url.split("/")[3]
        console.log(id)
        fetchPurchaseByPetition(id)
	}else if(new RegExp("/purchase/offer/[0-9]+$").test(url)){
        const id = url.split("/")[3]
        console.log(id)
        fetchPurchaseByOffer(id)
	}else if(new RegExp("/petitions/[0-9]+$").test(url)){
        const id = url.split("/")[2]
		fetchPetition(id)
	}else if(new RegExp("/offers/[0-9]+$").test(url)){
        const id = url.split("/")[2]
		fetchOffer(id)
	}else if(new RegExp("/account/[0-9]+/petitions").test(url)){
        const id = url.split("/")[2]
        fetchAccountPetitions(id)
    }else if(new RegExp("/account/[0-9]+/offers").test(url)){
        const id = url.split("/")[2]
        fetchAccountOffers(id)
    }else if(new RegExp("/edit-petition/[0-9]+$").test(url)){
        const id = url.split("/")[2]
        fetchEditPetition(id)
    }else if(new RegExp("/edit-offer/[0-9]+$").test(url)){
        const id = url.split("/")[2]
        fetchEditOffer(id)
    }else if(url == "/error"){
        document.getElementById("error-page").classList.add("current-page")
    }
}
function deletePetition(id){
    fetch(
        "http://192.168.99.100:8080/api/petitions/"+id,{
            method: "DELETE",
			headers: {
                "Authorization": "User "+ localStorage.accessToken
            }
        }
    ).then(function(response){
        if(response.status == 201){
            console.log("SE ELIMINOOO")
            goToPage("/")
        }else{
            console.log("ERROROOR")
            goToPage("/error")
        }
    }).catch(function(error){
        console.log(error)
        goToPage("/error")
    })
}
function deleteOffer(id){
    fetch(
        "http://192.168.99.100:8080/api/offer/"+id,{
            method: "DELETE",
			headers: {
                "Authorization": "User "+ localStorage.accessToken
            }
        }
    ).then(function(response){
        if(response.status == 204){
            goToPage("/")
        }else{
            console.log(response)
            goToPage("/error")
        }
    }).catch(function(error){
        console.log(error)
        goToPage("/error")
    })
}

