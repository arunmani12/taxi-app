import {useReducer} from 'react'

const initialInputState = {
  value:'',
  isTouched:false
}

const inputStateReducer = (state,action) =>{
  if (action.type === 'ADD'){
      return {
        value : action.value ,isTouched:state.isTouched
      }
  }
  if (action.type === 'BLUR'){
    return {
     isTouched:true ,value :state.value
    }
  }
  if (action.type === 'RES'){
    return { isTouched:false ,value :'' }
  }
  return inputStateReducer
}

const useInput = (validateValue) =>{

    const [Inputstate, dispatch] = useReducer(inputStateReducer,initialInputState)
    const ValueisValid = validateValue(Inputstate.value)
    const hasError = !ValueisValid&& Inputstate.isTouched

    const valueChangeHandler = (event) =>{
      dispatch({type:'ADD',value:event.target.value})
    }

    const valueBlurHandler  = (event) =>{
      dispatch({type:'BLUR'})
    }

    const reset = () =>{
      dispatch({type:'RES'})
    }
    return {
      value:Inputstate.value,
      isValid:ValueisValid,
      hasError,
      valueChangeHandler,
      valueBlurHandler,
      reset
     }
} 

export default useInput