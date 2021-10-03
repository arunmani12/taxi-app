import classes from './login.module.css'
import login from './login.svg'
import useInput from '../../hooks/use-input'
import cookie from 'js-cookie'
import { useState } from 'react'
import ReactLoading from 'react-loading';
import {Redirect} from 'react-router-dom'

export default function Loginindex() {
  const [isLogged, setIsLogged] = useState(false)
    const { value:enteredName,
        hasError:nameHasError,
        isValid:nameIsValid,
        valueChangeHandler:nameChangeHandler,
        valueBlurHandler:nameBlurHandler,
        reset:restName
      } =  useInput(value => value.trim() !== '' && value.length>5) 
    
      const { value:enteredpw ,
        hasError:pwhaserror,
        isValid:pwisvaild,
        valueChangeHandler:enteredPwChangeHandler,
        valueBlurHandler:enterPwBlurHandler,
        reset:restpw
      } =  useInput(value => value.length>=6 ) 
    
     
      let formIsValid = false;
      const [formLoading, setFormLoading] = useState(false);
      const [error, seterror] = useState(null)
    
        if(nameIsValid && pwisvaild){
          formIsValid = true
        }
    
    
      const formSubmitHandler = async(event) =>{
          event.preventDefault();
          if(!nameIsValid || !pwisvaild){
            return
          }
          let user = {username:enteredName,password:enteredpw}
          console.log(user)
          const data = await fetch('http://localhost:1337/login', { 
            method: 'POST' ,
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
         }).then((t) => {
             if(t.ok){
            setIsLogged(true)
             return t.json()
              }
              else{
                console.log('unAuthorized')
              }
         })
         if(data){
         console.log(data)
         cookie.set("token", data);
          restName()
          restpw()
         }
      }
     
      
  const nameInputClasses = nameHasError ? `${classes.formcontrol} ${classes.invalid}` : `${classes.formcontrol}`
  const emailInputClasses = pwhaserror  ?`${classes.formcontrol} ${classes.invalid}` : `${classes.formcontrol}`

    return (
        <>
        {isLogged && <Redirect to="/admin" />}
        {formLoading && <div className={classes.modal} >
<ReactLoading type={'bubbles'}  color={'#fff'} height={'10px'} width={'20%'} className={classes.loading} />
  </div>}
        <div className={classes.loginP}>
            <div className={classes.namediv}>
                <img src={login}/>
            </div>
            <div className={classes.loginDiv}>
    <form onSubmit={formSubmitHandler}>
    {error &&<h2 className={classes.er}>{error}</h2>}
        <h3 className={classes.Lp}>Login</h3>
      <div className={nameInputClasses}>
        <label htmlFor='text'>Name</label>
        <input 
        type='text' id='text' 
        value={enteredName}
        onBlur={nameBlurHandler}
         onChange={nameChangeHandler}
          />
      {nameHasError &&  <p className={classes.errortext}>Enter a valid name</p> }
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='password'>Your password</label>
        <input 
        type='password' id='password' 
        value={enteredpw}
        onBlur={enterPwBlurHandler}
         onChange={enteredPwChangeHandler}
          />
      {pwhaserror &&  <p  className={classes.errortext}>Password must not be empty</p> }
      </div>
      <div className={classes.formactions}>
        <button disabled={!formIsValid} type='submit'>Login</button>
      </div>
    </form>
    <hr/>
    </div>
        </div>
        </>
    )
}
