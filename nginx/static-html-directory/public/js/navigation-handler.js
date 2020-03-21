
document.addEventListener("DOMContentLoaded",function() {
    changeToPage(location.pathname)
    if(localStorage.accessToken){
        login(localStorage.accessToken,localStorage.idToken)
        var jsonPayload = parseJwt(localStorage.idToken)
        var username = document.getElementById("nav-bar-username")
        var anchorMyAccount = document.getElementById("a-my-account")
        var anchorMyPetitions = document.getElementById("a-my-petitions")
        var anchorMyOffers = document.getElementById("a-my-offers")
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
    document.querySelector("#login-page form").addEventListener("submit", function(event){
        event.preventDefault()
        const username = document.querySelector("#login-page #username").value
        const password = document.querySelector("#login-page #password").value
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
                if(response.status == 200){
                    console.log("ok")
                    return response.json().then(function(body){
                        // TODO: Read out information about the user account from the id_token.
                        login(body.access_token,body.id_token)
                        var jsonPayload = parseJwt(body.id_token)
                        var username = document.getElementById("nav-bar-username")
                        var anchorMyAccount = document.getElementById("a-my-account")
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
    document.querySelector("#create-petition-page form").addEventListener("submit", function(event){
        event.preventDefault()
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
            if(response.status == 201){
                goToPage("/")
            }else{
                goToPage("/error") 
            }
        }).catch(function(error){
            goToPage("/error")
        })
    })
    
    document.querySelector("#create-offer-page form").addEventListener("submit", function(event){
        event.preventDefault()
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
            if(response.status == 201){
                goToPage("/")
            }else{
                goToPage("/error") 
            }
        }).catch(function(error){
            goToPage("/error")
        })
    })
    
    document.querySelector("#create-purchase-page form").addEventListener("submit", function(event){
        event.preventDefault()
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
            console.log(response)
            if(response.status == 200){
                goToPage("/")
            }else{
                console.log("jajajajja")
                console.log("jajajajja")
                goToPage("/error") 
            }
        }).catch(function(error){
            console.log(error)
            goToPage("/error")
        })
    })
    document.querySelector("#signup-page form").addEventListener("submit",function(event){
        event.preventDefault()
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
            if(response.status == 200){
                console.log("ok")
                return response.json().then(function(body){
                    // TODO: Read out information about the user account from the id_token.
                    login(body.access_token,body.id_token)
                    var jsonPayload = parseJwt(body.id_token)
                    var username = document.getElementById("nav-bar-username")
                    var anchorMyAccount = document.getElementById("a-my-account")
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
            const errorText = document.getElementById("error-text")
            errorText.innerText = "Network error"
		})
    })
    document.querySelector("#delete-account").addEventListener("submit",function(event){
        event.preventDefault()
        var id = document.querySelector("#delete-account #accountId").value
        deleteAccount(id)
    })

})

window.addEventListener("popstate", function(event){
	const url = location.pathname
	changeToPage(url)
})

function goToPage(url){
	changeToPage(url)
	history.pushState({}, "", url)
}
function fetchAllPetitions(){
    fetch(
        "http://192.168.99.100:8080/api/petitions"
    ).then(function(response){
        // TODO: Check status code to see if it succeeded. Display errors if it failed.
        if(response.ok){
            return response.json().then(function(petitions){
                const cont = document.querySelector("#petitions")
                cont.innerText = ""
                if(petitions.length != 0){
                    for(const petition of petitions){
                        const div = document.createElement("div")
                        div.setAttribute("class", "col-md-4 my-2");
                        const card = document.createElement("div")
                        card.setAttribute("class", "card"); 
                        card.setAttribute("style", "height 22em"); 
                        const img = document.createElement("img")
                        img.setAttribute("class", "card-img-top image-card mt-3");  
                        img.src = petition.photo
                        const cardBody = document.createElement("div")
                        cardBody.setAttribute("class", "card-body"); 
                        const title = document.createElement("h4")
                        title.setAttribute("class", "card-title text-center"); 
                        title.innerText = petition.title
                        const text = document.createElement("p")
                        text.setAttribute("class", "card-text text-center"); 
                        const button = document.createElement("a")
                        button.setAttribute("class", "btn btn-block primary-btn");
                        button.setAttribute("href", "/petitions/"+petition.id); 
                        button.innerText = "See more" 
                        text.innerText = petition.place
                        cardBody.appendChild(title)
                        cardBody.appendChild(text)
                        cardBody.appendChild(button)
                        card.appendChild(img)
                        card.appendChild(cardBody)
                        div.appendChild(card)
                        cont.append(div)
                    }
                }else{
                    const div = document.createElement("div")
                    div.setAttribute("class", "col-md-6 mx-auto text-center")
                    const title = document.createElement("h3")
                    title.setAttribute("class", "text-center"); 
                    title.innerText = "No petitions yet"
                    const subTitle = document.createElement("h4")
                    subTitle.setAttribute("class", "text-center"); 
                    subTitle.innerText = "Come back later"
                    const image = document.createElement("img")
                    image.setAttribute("class","image-card my-3")
                    image.src = "public/images/clock.svg"
                    cont.append(div)
                    div.appendChild(title)
                    div.appendChild(subTitle)
                    div.appendChild(image)
                }
            })
        }else{
            const cont = document.querySelector("#petitions")
            cont.innerText = ""
            const text = document.createElement("h1")
            text.setAttribute("class", "mx-auto my-auto text-center");
            text.innerText = "Something went wrong"
            cont.append(text)						
        }
    }).catch(function(error){
        const cont = document.querySelector("#petitions")
        cont.innerText = ""
        const text = document.createElement("h1")
        text.setAttribute("class", "mx-auto my-auto text-center");
        text.innerText = "Network Error"
        cont.append(text)			
    })
}
function fetchAccount(id){
    fetch(
        "http://192.168.99.100:8080/api/account/"+id,{
            method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "User "+ localStorage.accessToken
			}
        }
    ).then(function(response){
        if(response.status == 200){
            return response.json().then(function(model){
                var card = document.getElementById("card-account-page")
                var id = document.querySelector("#card-account-page #id-account")
                var username = document.querySelector("#card-account-page #username-account")
                id.innerText = "Id: " + model.account.id
                username.innerText = "Username: " + model.account.username
            })

        }else{
            goToPage("/error")
        }
    }).catch(function(error){
        goToPage("/error")
    })
}


function fetchPetition(id){
    fetch(
        "http://192.168.99.100:8080/api/petitions/"+id,{
            method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "User "+ localStorage.accessToken
			}
        }
    ).then(function(response){
        if(response.status == 200){
            return response.json().then(function(model){
                var title = document.getElementById("petition-title")
                title.innerText = model.petition.title
                var photo = document.querySelector("#petition-photo")
                photo.setAttribute("src",model.petition.photo)
                var author = document.getElementById("petition-author")
                author.innerText = "Author: "+model.petition.author
                var place = document.getElementById("petition-place")
                place.innerText = "Place: "+model.petition.place
                var state = document.getElementById("petition-state")
                state.innerText = "State: "+model.petition.state
                var commentary = document.getElementById("petition-commentary")
                commentary.innerText = "Commentary: "+model.petition.commentary
                var referenceOffer = document.querySelector("#offer-petitionId")
                referenceOffer.setAttribute("value",model.petition.id)
                var link = document.getElementById("petition-link")
                link.innerHTML = ""                
                if(model.isMine){ 

                }else{
                    const ref = document.createElement("a")
                    ref.setAttribute("href","/create-offer")
                    ref.setAttribute("class","showIfLoggedIn btn btn-block primary-btn")
                    ref.innerText = "Offer"
                    link.append(ref)
                }
                
                
                var offerlist = document.getElementById("list-group-offers") 
                offerlist.innerHTML = ""
                if(model.petitionActive){
                    if(model.offers.length == 0){
                        const noOffer = document.createElement("p")
                        noOffer.innerText = "No offers exist yet"
                        offerlist.append(noOffer)
                    }else{
                        for(const offer of model.offers){
                            const offerref = document.createElement("a")
                            offerref.setAttribute("class","list-group-item list-group-item-action")
                            offerref.setAttribute("href","/offers/"+offer.id)
                            offerref.innerText = offer.title+" - " +offer.price
                            
                           offerlist.append(offerref)
                        }
                    }
                }
                


            })

        }else{
            goToPage("/error")
        }
    }).catch(function(error){
        goToPage("/error")
    })
}
function fetchOffer(id){
    fetch(
        "http://192.168.99.100:8080/api/offer/"+id,{
            method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "User "+ localStorage.accessToken
			}
        }
    ).then(function(response){
        if(response.status == 200){
            return response.json().then(function(model){
                var title = document.getElementById("offer-title")
                title.innerText = model.offer.title
                var price =  document.getElementById("offer-price")
                price.innerText = "Price: "+model.offer.price
                var author = document.getElementById("offer-author")
                author.innerText = "Author: "+model.offer.author
                var place = document.getElementById("offer-place")
                place.innerText = "Place: "+model.offer.place
                var state = document.getElementById("offer-state")
                state.innerText = "State: "+model.offer.state
                var commentary = document.getElementById("offer-commentary")
                commentary.innerText = "Commentary: "+model.offer.commentary
                var link = document.getElementById("offer-link")
                link.innerHTML = ""  
                console.log(model.petitionIsMine)              
                if(model.petitionIsMine){ 
                    const ref = document.createElement("a")
                    ref.setAttribute("href","/purchase")
                    ref.setAttribute("class","btn btn-block primary-btn")
                    ref.innerText = "Accept"
                    link.append(ref)
                }else{
                   //nothing 
                }
                
                var title = document.getElementById("offer-petition-title")
                title.innerText ="Title: " +model.petition.title
                var photo = document.querySelector("#offer-petition-photo")
                photo.setAttribute("src",model.petition.photo)
                var author = document.getElementById("offer-petition-author")
                author.innerText = "Author: "+model.petition.author
                
                var title = document.getElementById("purchase-offer-title")
                title.innerText = model.offer.title
                var price =  document.getElementById("purchase-offer-price")
                price.innerText = "Price: "+model.offer.price
                var author = document.getElementById("purchase-offer-author")
                author.innerText = "Author: "+model.offer.author
                var state = document.getElementById("purchase-offer-state")
                state.innerText = "State: "+model.offer.state

                const petitionId = document.querySelector("#purchase-petitionId")
                petitionId.value = model.petition.id 
                const offerId = document.querySelector("#purchase-offerId")
                offerId.value =  model.offer.id
            })

        }else{
            goToPage("/error")
        }
    }).catch(function(error){
        console.log(error)
        goToPage("/error")
    })
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
    }else if(url == "/signupGoogle"){
        googleLog()
    }else if(new RegExp("/account/[0-9]+$").test(url)){
        document.getElementById("account-page").classList.add("current-page")
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
    }else if(new RegExp("/petitions/[0-9]+$").test(url)){
        document.getElementById("view-petition-page").classList.add("current-page")
        const id = url.split("/")[2]
		fetchPetition(id)
	}else if(new RegExp("/offers/[0-9]+$").test(url)){
        document.getElementById("view-offer-page").classList.add("current-page")
        const id = url.split("/")[2]
		fetchOffer(id)
	}else if(new RegExp("/account/[0-9]+/petitions").test(url)){
        document.getElementById("account-petitions-page").classList.add("current-page")
    }
    else if(url == "/error"){
        document.getElementById("error-page").classList.add("current-page")
    }
	
}
function login(accessToken, idToken){
    localStorage.accessToken = accessToken
    localStorage.idToken = idToken
	document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}
function logout(){
    localStorage.clear()
	document.body.classList.remove("isLoggedIn")
    document.body.classList.add("isLoggedOut")
    document.getElementById("login-error-text").innerText = " "
    document.getElementById("error-text").innerText = ""
}
function deleteAccount(id){
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
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function googleLog(){
    window.location = "https://accounts.google.com/o/oauth2/v2/auth?client_id=812092900216-18qomh890locgbr24kf9t0ron8mb3unh.apps.googleusercontent.com&redirect_uri=http://finbok.com&response_type=code&scope=openid";
}
;