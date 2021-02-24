import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState } from 'react'

import {isAuth} from '../../actions/auth'
import Router from 'next/router'
import {startLogin, successLogin, failLogin, successSetCurrentUser} from '../../redux/user/user.actions'
import { useDispatch, useSelector } from 'react-redux'


import axios from 'axios'
import { authenticate } from '../../actions/auth';
import LoginGoogle from './LoginGoogle'

const LoginComponent = () => {
const router = useRouter()
   const currentUser = useSelector(state => state.currentUser)
   

       const [values, setValues] = useState({
        
            email: '',
            password: '',

  
    })

   const { email, password} = values
   
   const dispatch = useDispatch();

    

   const login = (email, password) =>async (dispatch)=> {
    
     
          
       dispatch(startLogin())
        
              
                var bodyFormData = new FormData();
                bodyFormData.append('email', email)
      
                bodyFormData.append('password', password)
           
                 axios({
                    method: 'post',
                    url: 'http://localhost:4000/signin',
                    data: bodyFormData,
                    headers: {'Content-Type': 'multipart/form-data' }
                 }).then((data) => {
                     if(data.error) return setValues({...values, error:data.error})
                    console.log(data)
                    dispatch(successLogin(data.data))
                    
                     dispatch(successSetCurrentUser({ email }))
                     console.log(data)
                     authenticate(data, () => {
                         if (isAuth && isAuth.role == 1) {Router.push('/admin')}
                         else {
                             Router.push('/')
                      }   
                     })
                   
                 }).catch(err=>console.log(err))
          
              
               
               
               
       
            
    }
      


   

    
 

     

   const submitHandler =  (e) => {
      e.preventDefault();
    
     dispatch(login(email, password))
     console.log('donso')
       
            
   } 

    const changeHandler = (name) => e => {
        setValues({ ...values, error: false, [name]: e.target.value})



        
    }
    const loginForm = () =>
     
        <form className="container__row" onSubmit={submitHandler}>
            
            <div className="form-component">
            <input className="input" onChange={changeHandler('email')}name="email" type="email" placeholder="Type your email..." />
            </div>
            <div className="form-component">
            <input className="input" onChange={changeHandler('password')} type="password" name="password" placeholder="Type your password..." />
            </div>
        <div className="form-component">
            <button className="Button" type="submit">Login</button>
            </div>
        </form>


    return<>
        <LoginGoogle/>
 {   loginForm()}
        

        <br />
        <div className="container">
        <Link href="auth/password/forgot">
        <a className="Button">Reset password</a>
            </Link>
            </div>
    </>
    
}


export default LoginComponent