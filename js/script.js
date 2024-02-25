const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class calculator{
    constructor(previousOperationtext,currentOperationText){
        this.previousOperationText = previousOperationtext;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    //add digit to calculator screen
    addDigit(digit){
        //check if current operation alredy has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }
    // process all calcular operations
    processOperation(operation){
        //check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C"){
            //Change operation
            if (this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }
        //get current and previuous value
        let operationValeu;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValeu = previous + current;
                this.updateScreen(operationValeu, operation, current,previous);
                break;
            case "-":
                operationValeu = previous - current;
                this.updateScreen(operationValeu, operation, current,previous);
                break;
            case "*":
                operationValeu = previous * current;
                this.updateScreen(operationValeu, operation, current,previous);
                break;
            case "/":
                operationValeu = previous / current;
                this.updateScreen(operationValeu, operation, current,previous);
                break;        
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processCEOperator();
                break; 
            case "C":
                this.processCOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;     
            
            default:
                return;                            
        }
    }
    //change values of calculator screen
    updateScreen(
        operationValue = null,
        operation=null,
        current=null, 
        previous=null
        ){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current;
            }
            //add current value to previous
            this.previousOperationText.innerText = operationValue + " " + operation;
            this.currentOperationText.innerText = "";
        }
        
    }

    //change math operation
    changeOperation(operation){
        const mathOperations = ["*","/","+","-"];
        if(!mathOperations.includes(operation)){
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1);
    }
    processCEOperator(){
        this.currentOperationText.innerText = "";
    }
    processCOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new calculator (previousOperationText,currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === "."){
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
});

