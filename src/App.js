import OperatorButton from './components/operator';
import { useReducer } from 'react';
import './App.css';
import { Button } from './components/buttons';

export const ACTIONS={
  ADD:"add",
  OPERATION:"operation",
  CLEAR:"clear",
  DELETE:"delete",
  EVALUATE:"evaluate"
}
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operator: payload.operator,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operator: payload.operator,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operator: payload.operator,
        currentOperand: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operator == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operator:null,
        currentOperand: evaluate(state),
      }
    default:
      return state
  }
}


function evaluate({currentOperand,previousOperand,operator}){
  const previous=parseFloat(previousOperand)
  const current=parseFloat(currentOperand)
  if(isNaN(previous) || isNaN(current)){return ""}
  let computation=""
  switch(operator){
    case "+":
      computation=previous+current
      break
    case "-":
      computation=previous-current
      break
    case "*":
      computation=previous*current
      break
    case "/":
      computation=previous/current
      break
    default:
      computation=''
   
  }
  return computation.toString()
    

}



function App() {
 
  const [{currentOperand,previousOperand,operator},dispatch]=useReducer(reducer,{})
  
 

  
  
  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previousOperand'>{previousOperand}{operator}</div>
        <div className='currentOperand'>{currentOperand}</div>
      </div>

      <button className='span-two' onClick={()=>{dispatch({type:ACTIONS.CLEAR})}}>AC</button>
      <button onClick={()=>{dispatch({type:ACTIONS.DELETE})}}>DEL</button>
      <OperatorButton operator="/" dispatch={dispatch}/>
      <Button digit="1" dispatch={dispatch}/>
      <Button digit="2" dispatch={dispatch}/>
      <Button digit="3" dispatch={dispatch}/>
      <OperatorButton operator="*" dispatch={dispatch}/>
      <Button digit="4" dispatch={dispatch}/>
      <Button digit="5" dispatch={dispatch}/>
      <Button digit="6" dispatch={dispatch}/>
      <OperatorButton operator="+" dispatch={dispatch}/>
      <Button digit="7" dispatch={dispatch}/>
      <Button digit="8" dispatch={dispatch}/>
      <Button digit="9" dispatch={dispatch}/>
      <OperatorButton operator="-" dispatch={dispatch}/>
      <Button digit="." dispatch={dispatch}/>
      <Button digit="0" dispatch={dispatch}/>
      <button className="span-two " onClick={()=>{dispatch({type:ACTIONS.EVALUATE})}}>=</button>

    
      
      
    </div>
  );
}

export default App;
