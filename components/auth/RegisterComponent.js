

import Router from 'next/router'

import React, { useState, useEffect } from 'react'


import axios from 'axios'

import {isAuth} from '../../actions/auth'
import { preSignup } from './../../actions/auth';
const RegisterComponent = () => {
    const [values, setValues] = useState({
        
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            error: '',
            loading: false,
            message: '',
            showForm:true
  
    })
    
 
const {email, name, password, confirmPassword, showForm, message, loading, error} = values
     
useEffect(() => {
        // isAuth() && Router.push('/')
    },[name, email, password] )
        const submitHandler =  (e) => {
            e.preventDefault();

            if (password !== confirmPassword) return
            setValues({ ...values, error: false })
            const user = { name, email, password };

            console.log('user39', user)
            preSignup(user).then(data => {
                if (data.error) {
                    console.log(data.error)
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    setValues({ ...values, name:'', email:'', password:'', error:'', loading:false, message:data.message, showForm:false });
                
                }
            })
            
            // try {
            //     var bodyFormData = new FormData();
            //     bodyFormData.append('email', email)
            //     bodyFormData.append('name', name)
            //     bodyFormData.append('password', password)
               
                
            //     await axios({
            //         method: 'post',
            //         url: 'http://localhost:4000/register',
            //         data: bodyFormData,
            //         headers: {'Content-Type': 'multipart/form-data' }
            //     })
            //     console.log('DONSO')
            // } catch (err) {
            //     console.log(err)
            // }
            
    }

    const changeHandler = (name) => e => {

        console.log('70', name)
        setValues({ ...values, error: false, [name]: e.target.value})



        
    }
    const registerForm = () =>
        <form className="container__column" onSubmit={submitHandler}>    
            <input className="input m-small"  onChange={changeHandler('email')} name="email" type="email" placeholder="Type your email..." />
            <input className="input m-small"onChange={changeHandler('name')} type="text" name="name" placeholder="Type your username..." />
            <input className="input m-small" onChange={changeHandler('password')} type="password" name="password" placeholder="Type your password..." />
            <input className="input m-small"  onChange={changeHandler('confirmPassword')}type="password" name="confirmPassword" placeholder="Confirm your password..." />
        
            <button className="Button" type="submit">Register</button>
        </form>


return registerForm()
    
    
}


export default RegisterComponent