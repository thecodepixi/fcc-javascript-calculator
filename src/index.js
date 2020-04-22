import React from 'react';
import ReactDOM from 'react-dom'

const DisplayArea = props => {
  
  return (
    <div id="display-area">
      <p id="previous-operator">{props.previousOperator}</p><p id='display'>{props.display}</p>
    </div>
  )
}

const NumberButtons = props => {
  
  const handleNumberClick = e => {
    e.target.innerText !== '.' ? props.updateDisplay(parseInt(e.target.innerText)) : props.updateDisplay(e.target.innerText)
  }
  
  return (
    <div id="numbers">
      <button id="one" onClick={handleNumberClick}>1</button>
      <button id="two" onClick={handleNumberClick}>2</button>
      <button id="three" onClick={handleNumberClick}>3</button>
      <button id="four" onClick={handleNumberClick}>4</button>
      <button id="five" onClick={handleNumberClick}>5</button>
      <button id="six" onClick={handleNumberClick}>6</button>
      <button id="seven" onClick={handleNumberClick}>7</button>
      <button id="eight" onClick={handleNumberClick}>8</button>
      <button id="nine" onClick={handleNumberClick}>9</button>
      <button id="zero" onClick={handleNumberClick}>0</button>
      <button id="decimal" onClick={handleNumberClick}>.</button>
    </div>
  )
}

const OperatorButtons = props => {
  
  const updateCurrentOperation = e => {
    props.updateCurrentOperation(e.target.innerText)
  }
  
  return (
    <div id="operators">
      <button id="add" onClick={updateCurrentOperation}>+</button>
      <button id="subtract"onClick={updateCurrentOperation}>-</button>
      <button id="multiply"onClick={updateCurrentOperation}>*</button>
      <button id="divide"onClick={updateCurrentOperation}>/</button>
      <button id="equals" onClick={props.performCalculation}>=</button>
      <button id="clear" onClick={props.clearCalculation}>C</button>
    </div>
  )
}

class Calculator extends React.Component {
  
  state = {
    display: [0],
    previousOperator: '',
    currentOperation: []
  }

  updateDisplay = num => {
    if (this.state.display.length === 1 && this.state.display[0] === 0 && num === 0){
      return null
    } else if (this.state.display.length === 1 && this.state.display[0] === 0) {
      this.setState(prevState => ({
        ...prevState,
        display: prevState.display = [num]
      }))         
    } else if (num === '.' && this.state.display.find( num => num === '.')) {
      return null          
    } else {
      this.setState(prevState => ({
        ...prevState,
        display: prevState.display.concat(num)
      }))
    }
  }
  
  updateCurrentOperation = operator => {
    if ( operator === "-" && this.state.display.length === 1 && this.state.display[0] === 0 ){
       this.setState( prevState => ({
        ...prevState,
        previousOperator: operator,
        currentOperation: prevState.currentOperation.concat(operator),
        display: [0],
      }))         
    } else if ( this.state.display.length === 1 && this.state.display[0] === 0 ) {
      let operators = ["+","-","*","/"]
      let operatorsRemoved = this.state.currentOperation
      for (let i = operatorsRemoved.length-1; i > -1; i--) {
        if( operators.includes(operatorsRemoved[i]) ) {
          operatorsRemoved.splice(i, 1)
        }  else {
          break
        }
      }
      console.log("operatores removed:",operatorsRemoved)
      this.setState( prevState => ({
         ...prevState,
         previousOperator: operator,
         currentOperation: operatorsRemoved.concat(operator),
         display: [0],
      }))
    } else {
       this.setState( prevState => ({
        ...prevState,
        previousOperator: operator,
        currentOperation: prevState.currentOperation.concat(prevState.display, operator),
        display: [0],
      }))
    }
  }
  
  performCalculation = () => {
    this.setState( prevState => ({
      ...prevState,
      // eslint-disable-next-line
      display: [eval( prevState.currentOperation.concat(prevState.display).join('') )],
      previousOperator: "=",
      currentOperation: []
    }))
  }

  
  clearCalculation = () => {
    this.setState({
      display: [0],
      previousOperator: '',
      currentOperation: []
    })
  }
  
  render() {
    console.log("display:", this.state.display)
    console.log("currentOperation:",this.state.currentOperation)
    return (
      <div id="calculator">
        <DisplayArea display={this.state.display.join('')} previousOperator={this.state.previousOperator}/>
        <div id="buttons">
          <NumberButtons updateDisplay={this.updateDisplay} />
          <OperatorButtons updateCurrentOperation={this.updateCurrentOperation} clearCalculation={this.clearCalculation} performCalculation={this.performCalculation}/>
        </div>  
      </div>
    )
  }
}

ReactDOM.render( <Calculator />, document.getElementById("root") )