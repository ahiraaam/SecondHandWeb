document.addEventListener("DOMContentLoaded",function() {
    var active = document.getElementById('v-pills-active-tab')
    var elementActive = document.getElementById("tab-active-petitions")  
    var elementDone = document.getElementById("tab-done-petitions")  

    active.addEventListener("click", function () {
        console.log("wii")
        if(elementActive.style.display == "none"){
            elementActive.style.display = "block"
            elementDone.style.display = "none"
        }else{
            elementActive.style.display = "none"
        }
    })

    var done = document.getElementById('v-pills-done-tab')
    done.addEventListener("click", function () {
        console.log("wuu")

        //Change the style                                     
        if(elementDone.style.display == "none"){
            elementDone.style.display = "block"
            elementActive.style.display = "none"
        }else{
            elementDone.style.display = "none"
        }
    })

    
    
})