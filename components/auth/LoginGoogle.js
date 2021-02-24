import Router from 'next/router'
import {GOOGLE_CLIENT_ID} from '../../config'
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth'
import GoogleLogin from 'react-google-login'

const LoginGoogle = () => {


    const responseGoogle = (response) => {

        console.log(response)
        const tokenId = response.tokenId
        const user = { tokenId }
        console.log(user)

        loginWithGoogle(user).then(data => {
            console.log(data)
            if (data.data.error) {
                console.log(data.error)
            } else {
                authenticate(data, () => {
                    console.log('456')
                    // if (isAuth() && isAuth().role === 1) {
                    //     Router.push('/admin')
                    // } else {
                    //     Router.push('/user')
                    // }
                    Router.push('/')
                })
            }
        })
        }


    


    return <>
        <div className="container mt-big">
        <GoogleLogin
            clientId={`${GOOGLE_CLIENT_ID}`}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme="dark"
            cookiePolicy={'single_host_origin'}
            />
            </div>
    </>
}


export default LoginGoogle