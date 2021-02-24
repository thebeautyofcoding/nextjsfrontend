import axios from 'axios'
import { API } from './../config';
import { handleResponse } from './auth';


export const userPublicProfile = async(username) => {
    const response = await axios.get(`${API}/user/${username}`).catch(err => console.log(err))
    console.log(response)
    return response
}



export const profile = async token => {
    const response = await axios.get(`${API}/user/profile`, {
        headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${token}`
        }
    }).catch(err => console.log(err))
console.log(response)
    return response;
}

export const update = async (token, user) => {
    
    try {
           const response = await axios.put(`${API}/user/update`, user, {
        headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${token}`
               }
               
           })
        handleResponse(response)

    
    return response;
        
    } catch(err) {
       return err.response.data
    }
    

        
       
        
  


    
}