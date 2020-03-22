export function fetchAllPetitions(){
    const container = document.querySelector("#petitions")
    //const loader = document.querySelector("#loader-page")
    //loader.classList.add("current-page")
    container.innerText = ""
    container.classList.add("loader")
    container.classList.add("text-center")
    container.classList.add("mx-auto")
    fetch(
        "http://192.168.99.100:8080/api/petitions"
    ).then(function(response){
        //loader.classList.remove("current-page")
        // TODO: Check status code to see if it succeeded. Display errors if it failed.
        container.classList.remove("loader")
        container.classList.remove("text-center")
        container.classList.remove("mx-auto")
        if(response.ok){
            return response.json().then(function(petitions){
                container.innerText = ""
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
                        container.append(div)
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
                    container.append(div)
                    div.appendChild(title)
                    div.appendChild(subTitle)
                    div.appendChild(image)
                }
            })
        }else{
            container.innerText = ""
            const text = document.createElement("h1")
            text.setAttribute("class", "mx-auto my-auto text-center");
            text.innerText = "Something went wrong"
            container.append(text)						
        }
    }).catch(function(error){
        container.innerText = ""
        const text = document.createElement("h1")
        text.setAttribute("class", "mx-auto my-auto text-center");
        text.innerText = "Network Error"
        container.append(text)			
    })
}
export function fetchPetition(id){
    const loader = document.querySelector("#loader-page")
    const container = document.querySelector("#view-petition-page")
    loader.classList.add("current-page")
    fetch(
        "http://192.168.99.100:8080/api/petitions/"+id,{
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
export function fetchOffer(id){
    const loader = document.querySelector("#loader-page")
    const container = document.querySelector("#view-offer-page")
    loader.classList.add("current-page")
    
    fetch(
        "http://192.168.99.100:8080/api/offer/"+id,{
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
export function fetchPurchaseByPetition(id){
    const loader = document.querySelector("#loader-page")
    const container = document.querySelector("#view-purchase-page")
    loader.classList.add("current-page")
    fetch(
        "http://192.168.99.100:8080/api/purchase/petition/"+id,{
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
                console.log(model)
                var street = document.querySelector("#purchase-street")
                street.innerText = "Street: "+model.purchase.street
                var city = document.querySelector("#purchase-city")
                city.innerText = "City: "+ model.purchase.city
                var zip = document.querySelector("#purchase-zip")
                zip.innerText = "Zip Code: "+model.purchase.zip
                var country = document.querySelector("#purchase-country")
                country.innerText = "Country: "+ model.purchase.city

                var offerTitle = document.querySelector("#view-purchase-page #purchase-offer-title")
                offerTitle.innerText = "Title: "+ model.offer.title
                var offerAuthor = document.querySelector("#view-purchase-page #purchase-offer-author")
                offerAuthor.innerText = "Author: "+ model.offer.author
                var offerPrice = document.querySelector("#view-purchase-page #purchase-offer-price")
                offerPrice.innerText = "Price: $"+ model.offer.author

                var petitionTitle = document.querySelector("#view-purchase-page #purchase-petition-title")
                petitionTitle.innerText = "Title: "+model.petition.title
                var petitionAuthor = document.querySelector("#view-purchase-page #purchase-petition-author")
                petitionAuthor.innerText = "Title: "+model.petition.author
                var petitionImage = document.querySelector("#view-purchase-page #purchase-petition-image")
                petitionImage.setAttribute("src", model.petition.photo)
            })
        }else{
            goToPage("/error")
        }
    }).catch(function(error){
        console.log(error)
        goToPage("/error")
    })
}
export function fetchPurchaseByOffer(id){
    const loader = document.querySelector("#loader-page")
    const container = document.querySelector("#view-purchase-page")
    loader.classList.add("current-page")
    fetch(
        "http://192.168.99.100:8080/api/purchase/offer/"+id,{
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
                console.log(model)
                var street = document.querySelector("#purchase-street")
                street.innerText = "Street: "+model.purchase.street
                var city = document.querySelector("#purchase-city")
                city.innerText = "City: "+ model.purchase.city
                var zip = document.querySelector("#purchase-zip")
                zip.innerText = "Zip Code: "+model.purchase.zip
                var country = document.querySelector("#purchase-country")
                country.innerText = "Country: "+ model.purchase.city

                var offerTitle = document.querySelector("#view-purchase-page #purchase-offer-title")
                offerTitle.innerText = "Title: "+ model.offer.title
                var offerAuthor = document.querySelector("#view-purchase-page #purchase-offer-author")
                offerAuthor.innerText = "Author: "+ model.offer.author
                var offerPrice = document.querySelector("#view-purchase-page #purchase-offer-price")
                offerPrice.innerText = "Price: $"+ model.offer.author

                var petitionTitle = document.querySelector("#view-purchase-page #purchase-petition-title")
                petitionTitle.innerText = "Title: "+model.petition.title
                var petitionAuthor = document.querySelector("#view-purchase-page #purchase-petition-author")
                petitionAuthor.innerText = "Title: "+model.petition.author
                var petitionImage = document.querySelector("#view-purchase-page #purchase-petition-image")
                petitionImage.setAttribute("src", model.petition.photo)
            })
        }else{
            goToPage("/error")
        }
    }).catch(function(error){
        console.log(error)
        goToPage("/error")
    })
}
export function fetchEditPetition(id){
    const loader = document.querySelector("#loader-page")
    const container = document.querySelector("#edit-petition-page")
    loader.classList.add("current-page")
    fetch(
        "http://192.168.99.100:8080/api/petitions/"+id,{
            method: "GET",
			headers: {
                "Authorization": "User "+ localStorage.accessToken
            }
        }
    ).then(function(response){
        loader.classList.remove("current-page")
        container.classList.add("current-page")
        if(response.status==200){
            var title = document.querySelector("#edit-petition-page #titleEdit")
            var author = document.querySelector("#edit-petition-page #authorEdit")
            var place = document.querySelector("#edit-petition-page #placeEdit")
            var state = document.querySelector("#edit-petition-page #stateEdit")
            var commentary = document.querySelector("#edit-petition-page #commentaryEdit")
            var photo = document.querySelector("#edit-petition-page #photoEdit")
            var editPetitionId = document.querySelector("#editPetitionId")
            editPetitionId.value = id
            return response.json().then(function(result){
                title.value = result.petition.title
                author.value = result.petition.author
                place.value = result.petition.place
                state.value = result.petition.state
                commentary.value = result.petition.commentary
                photo.value = result.petition.photo
            })
        }else{
            console.log("noooo")
        }
    })
}
export function fetchEditOffer(id){
    const loader = document.querySelector("#loader-page")
    const container = document.querySelector("#edit-offer-page")
    loader.classList.add("current-page")
    fetch(
        "http://192.168.99.100:8080/api/offer/"+id,{
            method: "GET",
			headers: {
                "Authorization": "User "+ localStorage.accessToken
            }
        }
    ).then(function(response){
        loader.classList.remove("current-page")
        container.classList.add("current-page")
        if(response.status==200){
            var title = document.querySelector("#edit-offer-page #title")
            var author = document.querySelector("#edit-offer-page #author")
            var place = document.querySelector("#edit-offer-page #place")
            var state = document.querySelector("#edit-offer-page #state")
            var commentary = document.querySelector("#edit-offer-page #commentary")
            var price = document.querySelector("#edit-offer-page #price")
            var editOfferId = document.querySelector("#edit-offer-page #edit-offerId")
            editOfferId.value = id
            return response.json().then(function(result){
                title.value = result.offer.title
                author.value = result.offer.author
                place.value = result.offer.place
                state.value = result.offer.state
                commentary.value = result.offer.commentary
                price.value = result.offer.price
            })
        }else{
            console.log("noooo")
        }
    }).catch(function(error){
        console.log(error)
    })
}