const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

const updateFlag = (element) => {
    console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    console.log(amount.value);

    let amountval=amount.value;

    if(amountval === "" || amountval < 0){
        amountval=1;
        amount.value=amountval;
    }

    console.log(fromCurr.value,toCurr.value);


    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    console.log(URL);

    const response = await fetch(URL);

    const data = await response.json();
    const rate = data[toCurr.value.toLowerCase()];

    const finalAmount = amountval*rate;

    console.log(finalAmount);

    msg.innerText = `${amountval}  ${fromCurr.value} = ${finalAmount.toFixed(2)}  ${toCurr.value}`;

});

