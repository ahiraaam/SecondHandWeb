export function fetchAccount(id){
    const container = document.querySelector("#account-page")
    const loader = document.querySelector("#loader-page")
    loader.classList.add("current-page")
    fetch(
        "http://192.168.99.100:8080/api/account/"+id,{
            method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "User "+ localStorage.accessToken
			}
        }
    ).then(function(response){
        loader.classList.remove("current-page")
        container.classList.add("current-page")
        if(response.status == 200){
            return response.json().then(function(model){
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
export function fetchAccountPetitions(id){
    const loader = document.querySelector("#loader-page")
    const container = document.querySelector("#account-petitions-page")
    loader.classList.add("current-page")
    fetch(
        "http://192.168.99.100:8080/api/account/"+id+"/petitions",{
            method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "User "+ localStorage.accessToken
			}
        }
    ).then(function(response){
        loader.classList.remove("current-page")
        container.classList.add("current-page")
        if(response.status == 200){
            return response.json().then(function(model){
                if(model.activePetitions.length != 0){
                    const row = document.querySelector("#tab-active-petitions")
                    row.innerText = ""
                    for(const activePetition of model.activePetitions){
                        const card = document.createElement("div")
                        card.setAttribute("class", "card mb-3 text-center")
                        const img = document.createElement("img")
                        img.setAttribute("src", activePetition.photo)
                        img.setAttribute("class", "card-img-top mt-2 image-card")
                        const title = document.createElement("h4")
                        title.innerText = activePetition.title
                        const author = document.createElement("p")
                        author.innerText = activePetition.author
                        const insideRow = document.createElement("div")
                        insideRow.setAttribute("class", "row")

                        const divButtons = document.createElement("div")
                        divButtons.setAttribute("class", "col-md-6 btn-block-md-6 text-center")
                        const details = document.createElement("a")
                        details.innerText = "See details"
                        details.setAttribute("class", "btn btn-block primary-btn")
                        details.setAttribute("href", "/petitions/"+activePetition.id)

                        const divEdit = document.createElement("div")
                        divEdit.setAttribute("class", "col-md-6 btn-block-md-6 text-center")
                        const edit = document.createElement("a")
                        edit.innerText = "Edit"
                        edit.setAttribute("class", "btn btn-block primary-btn")
                        edit.setAttribute("href", "/edit-petition/"+activePetition.id)

                        const rowDelete = document.createElement("div")
                        rowDelete.setAttribute("class", "row mt-3")
                        const form = document.createElement("form")
                        form.setAttribute("id" ,"form-delete-petition")
                        form.setAttribute("type","DELETE")
                        const idPetition = document.createElement("input")
                        idPetition.setAttribute("type", "hidden")
                        idPetition.setAttribute("id", "idPetition")
                        idPetition.setAttribute("value", activePetition.id)
                        const buttonDelete = document.createElement("button")
                        buttonDelete.setAttribute("type", "submit")
                        buttonDelete.setAttribute("id" , "buttonDeletePetition")
                        buttonDelete.setAttribute("class","btn delete-btn")
                        buttonDelete.innerText = "Delete"

                        row.append(card)
                        card.appendChild(img)
                        card.appendChild(title)
                        card.appendChild(author)
                        card.append(insideRow)
                        insideRow.appendChild(divButtons)
                        divButtons.appendChild(details)
                        insideRow.appendChild(divEdit)
                        divEdit.appendChild(edit)
                        card.append(form)
                        form.appendChild(buttonDelete)
                        form.appendChild(idPetition)
                        //card.append(rowDelete)
                        //rowDelete.appendChild(divDelete)
                        //divDelete.appendChild(aDelete)

                    }
                    
                }else{
                    const row = document.querySelector("#tab-active-petitions")
                    row.innerText = ""
                    const p = document.createElement("h2")
                    p.innerText = "No active petitions yet"
                    row.appendChild(p)
                }
                if(model.inactivePetitions.length !=0){
                    const row = document.querySelector("#tab-done-petitions")
                    row.innerText = ""
                    for(const inactivePetition of model.inactivePetitions){
                        const card = document.createElement("div")
                        card.setAttribute("class", "card mb-3 text-center")
                        const img = document.createElement("img")
                        img.setAttribute("src", inactivePetition.photo)
                        img.setAttribute("class", "card-img-top mt-2 image-card")
                        const title = document.createElement("h4")
                        title.innerText = inactivePetition.title
                        const author = document.createElement("p")
                        author.innerText = inactivePetition.author
                        const insideRow = document.createElement("div")
                        insideRow.setAttribute("class", "row")

                        const divButtons = document.createElement("div")
                        divButtons.setAttribute("class", "col-md-6 btn-block-md-6 text-center")
                        const details = document.createElement("a")
                        details.innerText = "See details"
                        details.setAttribute("class", "btn btn-block primary-btn")
                        details.setAttribute("href", "/petitions/"+inactivePetition.id)

                        const divPurchase = document.createElement("div")
                        divPurchase.setAttribute("class", "col-md-6 btn-block-md-6 text-center")
                        const purchase = document.createElement("a")
                        purchase.innerText = "See Purchase"
                        purchase.setAttribute("class", "btn btn-block primary-btn")
                        purchase.setAttribute("href", "/purchase/petition/"+inactivePetition.id)

                        row.append(card)
                        card.appendChild(img)
                        card.appendChild(title)
                        card.appendChild(author)
                        card.append(insideRow)
                        insideRow.appendChild(divButtons)
                        divButtons.appendChild(details)
                        insideRow.appendChild(divPurchase)
                        divPurchase.appendChild(purchase)

                    }
                }else{
                    const row = document.querySelector("#tab-done-petitions")
                    row.innerText = ""
                    const p = document.createElement("h2")
                    p.innerText = "No done petitions yet"
                    row.appendChild(p)
                }
            })
        }else{
            goToPage("/error")
        }
    }).catch(function(error){
        console.log(error)
        console.log(error)
    })
}
export function fetchAccountOffers(id){
    const loader = document.querySelector("#loader-page")
    const container = document.querySelector("#account-offers-page")
    loader.classList.add("current-page")
    fetch(
        "http://192.168.99.100:8080/api/offers/account/"+id,{
            method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "User "+ localStorage.accessToken
			}
        }
    ).then(function(response){
        loader.classList.remove("current-page")
        container.classList.add("current-page")
        if(response.status == 200){
            return response.json().then(function(model){

                if(model.activeOffers.length != 0){
                    const row = document.querySelector("#account-offers-page #tab-active-offers")
                    row.innerText = ""
                    for(const activeOffer of model.activeOffers){
                        const card = document.createElement("div")
                        card.setAttribute("class", "card mb-3 text-center")
                    
                        const title = document.createElement("h4")
                        title.innerText = activeOffer.title
                        const author = document.createElement("p")
                        author.innerText = activeOffer.author
                        const insideRow = document.createElement("div")
                        insideRow.setAttribute("class", "row")

                        const divButtons = document.createElement("div")
                        divButtons.setAttribute("class", "col-md-6 btn-block-md-6 text-center")
                        const details = document.createElement("a")
                        details.innerText = "See details"
                        details.setAttribute("class", "btn btn-block primary-btn")
                        details.setAttribute("href", "/offers/"+activeOffer.id)

                        const divEdit = document.createElement("div")
                        divEdit.setAttribute("class", "col-md-6 btn-block-md-6 text-center")
                        const edit = document.createElement("a")
                        edit.innerText = "Edit"
                        edit.setAttribute("class", "btn btn-block primary-btn")
                        edit.setAttribute("href", "/edit-offer/"+activeOffer.id)

                        const rowDelete = document.createElement("div")
                        rowDelete.setAttribute("class", "row mt-3")
                        const form = document.createElement("form")
                        form.setAttribute("id" ,"form-delete-offer")
                        form.setAttribute("type","DELETE")
                        const idOffer = document.createElement("input")
                        idOffer.setAttribute("type", "hidden")
                        idOffer.setAttribute("id", "idOffer")
                        idOffer.setAttribute("value", activeOffer.id)
                        const buttonDelete = document.createElement("button")
                        buttonDelete.setAttribute("type", "submit")
                        buttonDelete.setAttribute("id" , "buttonDeleteOffer")
                        buttonDelete.setAttribute("class","btn delete-btn")
                        buttonDelete.innerText = "Delete"

                        row.append(card)
                        card.appendChild(title)
                        card.appendChild(author)
                        card.append(insideRow)
                        insideRow.appendChild(divButtons)
                        divButtons.appendChild(details)
                        insideRow.appendChild(divEdit)
                        divEdit.appendChild(edit)
                        card.append(form)
                        form.appendChild(buttonDelete)
                        form.appendChild(idOffer)
                        //card.append(rowDelete)
                        //rowDelete.appendChild(divDelete)
                        //divDelete.appendChild(aDelete)

                    }
                    
                }else{
                    const row = document.querySelector("#account-offers-page #tab-active-offers")
                    row.innerText = ""
                    const p = document.createElement("h2")
                    p.innerText = "No active offers yet"
                    row.appendChild(p)
                }
                
                if(model.inactiveOffers.length !=0){
                    const row = document.querySelector("#account-offers-page #tab-done-offers")
                    row.innerText = ""
                    for(const inactiveOffer of model.inactiveOffers){
                        console.log(inactiveOffer)
                        const card = document.createElement("div")
                        card.setAttribute("class", "card mb-3 text-center")
                      
                        const title = document.createElement("h4")
                        title.innerText = inactiveOffer.title
                        const author = document.createElement("p")
                        author.innerText = inactiveOffer.author
                        const insideRow = document.createElement("div")
                        insideRow.setAttribute("class", "row")

                        const divButtons = document.createElement("div")
                        divButtons.setAttribute("class", "col-md-6 btn-block-md-6 text-center")
                        const details = document.createElement("a")
                        details.innerText = "See details"
                        details.setAttribute("class", "btn btn-block primary-btn")
                        details.setAttribute("href", "/offers/"+inactiveOffer.id)

                        const divPurchase = document.createElement("div")
                        divPurchase.setAttribute("class", "col-md-6 btn-block-md-6 text-center")
                        const purchase = document.createElement("a")
                        purchase.innerText = "See Purchase"
                        purchase.setAttribute("class", "btn btn-block primary-btn")
                        purchase.setAttribute("href", "/purchase/offer/"+inactiveOffer.id)

                        row.append(card)
                        card.appendChild(title)
                        card.appendChild(author)
                        card.append(insideRow)
                        insideRow.appendChild(divButtons)
                        divButtons.appendChild(details)
                        insideRow.appendChild(divPurchase)
                        divPurchase.appendChild(purchase)
                        
                    }
                }else{
                    const row = document.querySelector("#account-offers-page #tab-done-offers")
                    row.innerText = ""
                    const p = document.createElement("h2")
                    p.innerText = "No done offers yet"
                    row.appendChild(p)
                }
            })
        }else{
            console.log("Error 1")
            goToPage("/error")
        }
    }).catch(function(error){
        console.log(error)
        goToPage("/error")
    })
}