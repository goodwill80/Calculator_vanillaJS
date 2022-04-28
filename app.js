const upperDisplay = document.querySelector(".upper-display");
const lowerDisplay = document.querySelector(".lower-display");
const numbers = document.querySelectorAll(".buttons .num");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

class Calculator {
  constructor(upperDisplay, lowerDisplay) {
    this.upperDisplay = upperDisplay;
    this.lowerDisplay = lowerDisplay;
    this.clear();
  }

  clear() {
    this.upperOperand = '';
    this.lowerOperand = '';
    this.operator = undefined;
  }

  delete() {
    this.lowerOperand = this.lowerOperand.toString().slice(0, -1);
  }

  appendNumber(num) {
    if(num ==='.' && this.lowerOperand.includes('.')) return;
    this.lowerOperand = this.lowerOperand.toString() + num.toString();
  }

  chooseOperator(action) {
    if(this.lowerOperand === '') return;
    if(this.upperOperand !== '') {
      this.compute();
    }
    this.operator = action;
    this.upperOperand = this.lowerOperand;
    this.lowerOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.upperOperand);
    const current = parseFloat(this.lowerOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operator){
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.lowerOperand = computation;
    this.upperOperand = '';
    this.operator = undefined;
  }

  getDisplayNumber(numFromOperand) {
    const numPriorDecimal = parseFloat(numFromOperand.toString().split('.')[0]);
    const numAfterDecimal = numFromOperand.toString().split('.')[1];
    let finalDisplay = ''
    if(isNaN(numPriorDecimal)) {
        finalDisplay= '';
    } else {
        finalDisplay = numPriorDecimal.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if ( numAfterDecimal != null) {
      return `${finalDisplay}.${numAfterDecimal}`
    } else {
      return finalDisplay;
    }
  }

  display() {
    this.lowerDisplay.innerText = this.getDisplayNumber(this.lowerOperand);
    if(this.operator != null) {
        this.upperDisplay.innerText = `${this.getDisplayNumber(this.upperOperand)} ${this.operator}`;
    } else {
        this.upperDisplay.innerText = '';
    }

  }

}

const myCalculator = new Calculator(upperDisplay, lowerDisplay);

numbers.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    myCalculator.appendNumber(btn.innerText);
    myCalculator.display();
  })
})

operators.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    myCalculator.chooseOperator(btn.innerText);
    myCalculator.display();
  })
})

equal.addEventListener('click', ()=>{
  myCalculator.compute();
  myCalculator.display();
})

clear.addEventListener('click', ()=>{
  myCalculator.clear();
  myCalculator.display();
})

deleteBtn.addEventListener('click', ()=>{
  myCalculator.delete();
  myCalculator.display();
})
