"use strict"

let nameInput = document.getElementById("name")
let passwordInput = document.getElementById("password")

document.getElementById("loginBtt").addEventListener("click",ValidateData);

function ValidateData(){
    let name = nameInput.value;
    let password = passwordInput.value;

    if(name.length < 3){
        window.alert("Name must be more than 3 letters");
        resetUI();
        return;
    }

    for(let i = 0; i < name.length; i++){
        let charcode = name.charCodeAt(i);
        if(!((charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122))){
            window.alert("All characters must be letters");
            resetUI();
            return;
        }
    }


    if(password !== "password"){
        window.alert("Incorrect Password");
        resetUI();
        return;
     
    }

    localStorage.setItem("name",name);
    window.location.href="transaction.html";
}

function resetUI(){
    nameInput.value="";
    passwordInput.value="";
}


