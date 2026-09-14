"use strict"

/*------Timer----------*/


    let seconds = 0;
    let minutes = 0;
    let intervalId = null;

setTimer()

function setTimer(){

    return intervalId = setInterval(() =>{
        seconds++
        if(seconds === 60){
            minutes++
            seconds = 0;
        }

        document.getElementById("displayTime").textContent = "Session Time: " + minutes + ":" + seconds;

    },1000)
}











