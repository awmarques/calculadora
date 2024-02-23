const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class calculator{
    constructor(previousOperationtext,currentOperationText){
        this.previousOperationText = previousOperationtext;
        this.currentOperation = currentOperation;
        this.currentOperation = "";
    }
}

const calc = new calculator (previousOperationText,currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === "."){
            console.log(value);
        } else {
            console.log("Op: " + value);
        }
    })
});

