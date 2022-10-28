import { ACTIONS } from "../App";

const OperatorButton=({dispatch,operator})=>{
    return(
        
        <button onClick={()=>dispatch({type:ACTIONS.OPERATION,payload:{operator}})}>{operator}</button>
       
    )};

    export default OperatorButton