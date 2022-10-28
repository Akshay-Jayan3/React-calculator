import './button.css';
import { ACTIONS } from '../App';
export const Button=({dispatch,digit})=>{


    return (
        <button onClick={()=>dispatch({type:ACTIONS.ADD,payload:{digit}})}>{digit}</button>
    )
}