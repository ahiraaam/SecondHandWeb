export function changeActivePetitions(){
    var active = document.getElementById('v-pills-active-tab')
    var done = document.getElementById('v-pills-done-tab')
    var elementActive = document.getElementById("tab-active-petitions")  
    var elementDone = document.getElementById("tab-done-petitions")  

    active.addEventListener("click", function () {
        active.classList.add("active")
        done.classList.remove("active")
        if(elementActive.style.display == "none"){
            elementActive.style.display = "block"
            elementDone.style.display = "none"
        }else{
            elementActive.style.display = "none"
        }
    })

    done.addEventListener("click", function () {
        done.classList.add("active")
        active.classList.remove("active")
        //Change the style                                     
        if(elementDone.style.display == "none"){
            elementDone.style.display = "block"
            elementActive.style.display = "none"
        }else{
            elementDone.style.display = "none"
        }
    })
}
export function changeActiveOffers(){
    var activeOffer = document.getElementById("v-pills-active-tab-offers")
    var doneOffer = document.getElementById("v-pills-done-tab-offers")

    var elementActiveOffer = document.getElementById("tab-active-offers")
    var elementDoneOffer = document.getElementById("tab-done-offers")

    activeOffer.addEventListener("click", function () {
        activeOffer.classList.add("active")
        doneOffer.classList.remove("active")
        if(elementActiveOffer.style.display == "none"){
            elementActiveOffer.style.display = "block"
            elementDoneOffer.style.display = "none"
        }else{
            elementActiveOffer.style.display = "none"
        }
    })

    doneOffer.addEventListener("click", function () {
        doneOffer.classList.add("active")
        activeOffer.classList.remove("active")
        //Change the style                                     
        if(elementDoneOffer.style.display == "none"){
            elementDoneOffer.style.display = "block"
            elementActiveOffer.style.display = "none"
        }else{
            elementDoneOffer.style.display = "none"
        }
    })
}
export function login(accessToken, idToken){
    localStorage.accessToken = accessToken
    localStorage.idToken = idToken
	document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
    
}
export function logout(){
    localStorage.clear()
	document.body.classList.remove("isLoggedIn")
    document.body.classList.add("isLoggedOut")
    document.getElementById("login-error-text").innerText = " "
    document.getElementById("error-text").innerText = ""
}
export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}