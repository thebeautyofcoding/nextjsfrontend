import { getCookie, updateUser } from "../../actions/auth"
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { profile, update } from '../../actions/user'
import {successUserUpdate} from '../../redux/user/user.actions'
import { Router } from 'next/router';



const ProfileUpdate = () => {


  
    

    const [values, setValues] = useState({
        username: '',
        usernameForPhoto: '',
        name: '',
        email: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: process.browser && new FormData(),
        about: ''
    })
    const dispatch = useDispatch()
    const { username, name, email, error, success, loading, photo, userData, about, usernameForPhoto } = values
    const token = getCookie('token')
    const initProfile = () => {
        profile(token).then(data => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, username: data.data.username, name: data.data.name, email: data.data.email, about: data.data.about, usernameForPhoto: data.data.username })
                userData.set('username', data.data.username)
             
                userData.set('email', data.data.email)
                userData.set('name', data.data.name)
            }
        })
    }

    useEffect(() => {
        initProfile()
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, loading: true })
        
        update(token, userData).then(data => {
          console.log(data)
            if (data.error) {
                
                setValues({ ...values, error:data.error, success: false, loading: false })
            }
            
            updateUser(data, () => {
                setValues({ ...values, username: data.data.username, name: data.data.name, email: data.data.email, about: data.data.about, usernameForPhoto: data.data.username, success: true, loading: false })

                dispatch(successUserUpdate(data.data))
                Router.replace('/user')
            })
    
        }).catch(err => {
                console.log(err.message)
                
            })
             
        }

        
    

console.log(username, name, email)
    useEffect(() => {
        initProfile()
    }, [])
    

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        userData.set(name, value)
        setValues({...values, [name]:value, userData, error:false, success:false})
    }



    const profileUpdateForm = () => {
        
        return <form className="container__column mt-big" onSubmit={handleSubmit}>
               <div className="m-medium">
                <label className="Button"> Update profile photo
                <input className="input m-small" onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                    </label>
            </div>
            <div className="form-group">
                <label className="">Username:</label>
                    <input className="input m-small" onChange={handleChange('username')} type="text" value={username} required/>
               
            </div>
            <div className="form-group">
                <label>Name:</label>
                <input className="input m-small"onChange={handleChange('name')} type="text" value={name} required/>
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input className="input m-small"onChange={handleChange('email')} type="email"value={email} required/>
            </div>
     
    
         
              <div>
                <button className="Button"type="submit"  >Submit</button>
            </div>
        </form>
    }

    const showError = () => {
        return <div style={{ display:error? '':'none' }}>
            {error}
        </div>
    }
        const showSuccess = () => {
        return <div style={{ display:success? '':'none' }}>
            {success}
        </div>
    }

    
    const showLoading = () => {
        return <div  style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    }


    return (
        <>
          
                <h1 className="container mt-big">Update your profile</h1>
            
                {profileUpdateForm()}
                
                <div className="success " style={{ display: success ? 'flex' : 'none' }}><p>{success && 'Profile successfully updated' }</p></div>    
                <div className="error"style={{display: error ? 'flex' : 'none'}}><p>{error && error} </p></div>
            
           
        
        </>
    )

}

export default ProfileUpdate

