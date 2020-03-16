document.addEventListener("DOMContentLoaded",function() {
    var showChangePassword = document.getElementById('change_password')
    showChangePassword.addEventListener("click", function () {
        var element = document.getElementById("form_change_password")  
        //Change the style                                     
        if(element.style.display == "none"){
            element.style.display = "block"
        }else{
            element.style.display = "none"
        }
    })

})