
document.addEventListener("DOMContentLoaded",function() {
    changeToPage(location.pathname)
    if(localStorage.accessToken){
        login(localStorage.accessToken,localStorage.idToken)
        var jsonPayload = parseJwt(localStorage.idToken)
        var username = document.getElementById("nav-bar-username")
        var anchorMyAccount = document.getElementById("a-my-account")
        anchorMyAccount.setAttribute("href", '/account/'+jsonPayload.id)
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
                console.log("unaithorized")
                console.log("unaithorized")
                goToPage("/error")
               
            }
        }).catch(function(error){
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
                        text.innerText = petition.place
                        cardBody.appendChild(text)
                        cardBody.appendChild(title)
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
            console.log(response)
            console.log(response)
        }
       
    }).catch(function(error){
        console.log(error)
        console.log(error)
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
    }else if(new RegExp("/account/[0-9]+$").test(url)){
        document.getElementById("account-page").classList.add("current-page")
		const id = url.split("/")[2]
		fetchAccount(id)
	}else if(url == "/create-pet"){
		document.getElementById("create-pet-page").classList.add("current-page")
	}else if(url == "/logout"){
        logout()
        goToPage("/")
	}else if(url == "/create-petition"){
        document.getElementById("create-petition-page").classList.add("current-page")
    }else if(url== "/error"){
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
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};