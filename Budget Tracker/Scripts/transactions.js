"use strict"


document.getElementById("name").textContent+= localStorage.getItem("name");
document.getElementById("graphBt").addEventListener("click", () =>{
    window.location.href="chart.html";
})


let income, expense,remainBalance,TransactionArray;



if(localStorage){
    income = localStorage.getItem("totalIncome") ?
    parseFloat(localStorage.getItem("totalIncome")) : 0;

    expense = localStorage.getItem("totalExpense") ?
    parseFloat(localStorage.getItem("totalExpense")) : 0;

    remainBalance = localStorage.getItem("RBalance") ?
    parseFloat(localStorage.getItem("RBalance")) : 0;

    TransactionArray = localStorage.getItem("TArray") ?
    JSON.parse(localStorage.getItem("TArray")) : [];
}

window.onload = () =>{
    Display();
    recalcTotal();
}

document.getElementById("ClearAllBtt").addEventListener("click",ClearAll);

document.querySelectorAll('input[name="filter"]').forEach(radio =>{
    radio.addEventListener('change',Display);
});
document.getElementById("AddTransactionBtt").addEventListener("click",AddTransaction);

function AddTransaction(){

    let select = document.getElementById("type").value;
    let date = document.getElementById("InputDate").value;
    let name = document.getElementById("InputName").value;
    let amount = document.getElementById("InputAmount").value;

    if(!ValidateData(select,date,name,amount)){
        return;
    };


    const transaction = {
        type: select,
        date: date,
        name: name,
        amount: parseFloat(amount)
    }

    TransactionArray.push(transaction);
    localStorage.setItem("TArray",JSON.stringify(TransactionArray));

    recalcTotal();
    Display();
    resetUI();


}  

function ValidateData(select,date,name,amount){
    if(select != "income" && select != "expense"){
        window.alert("Type must be selected");
        return false;
    }

    if(!date){
        window.alert("Date must be selected");
        return false;
    }

    if(!name){
        window.alert("Name must be entered");
        return false;
    }

   for(let i = 0; i < name.length; i++){
        let charcode = name.charCodeAt(i);
        if(!((charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122) || charcode === 32)){
            window.alert("Name: Characters must be letters & space");
            return false;
        }
    }

    if(!amount){
        window.alert("Amoumt must be entered");
        return false;
    }

    if(!parseFloat(amount)){
        window.alert("Amoumt must be a number");
        return false;
    }else{
        if(parseFloat(amount) < 0){
            window.alert("Amoumt must be a positive number");
            return false;
        }
    }

       if(select ==="expense"){
        if(amount > remainBalance){
            window.alert("Sorry Can not make transaction: Insuffcient funds");
            return false;
        }
    }


    return true;



}


function resetUI(){
    document.getElementById("type").selectedIndex = 0;
    document.getElementById("InputDate").value = "";
    document.getElementById("InputName").value = "";
    document.getElementById("InputAmount").value = "";
}


function Display(){
    let tableRef = document.getElementById("TableDisplayBody");

    tableRef.innerHTML = "";

    let filter = document.querySelector('input[name="filter"]:checked')?.value || "none";    

    TransactionArray.forEach((transaction,index) => {

        if(filter !=="none" && transaction.type !== filter){
            return;
        }
    
        let newRow = tableRef.insertRow(0);

        let Cell1 = newRow.insertCell(0);
        Cell1.textContent = transaction.type;

        let Cell2 = newRow.insertCell(1);
        Cell2.textContent = transaction.name;

        let Cell3 = newRow.insertCell(2);
        Cell3.textContent = transaction.date;

        let Cell4 = newRow.insertCell(3);
        Cell4.textContent = transaction.amount;

        let Cell5 = newRow.insertCell(4);

        let DeleteButton = document.createElement("input");
        DeleteButton.setAttribute("type","button");
        DeleteButton.setAttribute("value","delete");
        DeleteButton.setAttribute("button-index",index);
        DeleteButton.setAttribute('onclick','myDeleteSpecific(this)');

        Cell5.appendChild(DeleteButton);


    });
}

function myDeleteSpecific(WhichOne){
    const rowIndex = parseInt(WhichOne.getAttribute("button-index"));
    TransactionArray.splice(rowIndex,1);
    /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice*/
    localStorage.setItem("TArray",JSON.stringify(TransactionArray));
    Display();
    recalcTotal();
}


function recalcTotal(){

    income = 0;
    expense = 0;

    TransactionArray.forEach(t => {
        if(t.type === "income"){
            income += t.amount;
        }else{
            expense += t.amount;
        }
    })
    remainBalance = income - expense;

    localStorage.setItem("totalIncome",income);
    localStorage.setItem("totalExpense",expense);
    localStorage.setItem("RBalance",remainBalance);

    document.getElementById("tIncome").textContent =  "Income: € " + income;
    document.getElementById("tExpense").textContent = "Expense: € " + expense;
    document.getElementById("tRemain").textContent = "Remaining Balance: € " + remainBalance;
}


function ClearAll(){
    localStorage.removeItem("TArray");
    localStorage.removeItem("RBalance");
    localStorage.removeItem("totalExpense");
    localStorage.removeItem("totalIncome");
    TransactionArray = [];
    income = 0;
    expense = 0;
    remainBalance = 0;
    Display();
}








