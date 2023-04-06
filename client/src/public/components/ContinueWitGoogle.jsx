import { gapi } from 'gapi-script'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { continueWithGoogle } from '../../redux/user/userActions'
import GoogleLogin from 'react-google-login'

const ContinueWitGoogle = () => {
    const dispath = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        gapi.load("client:auth2", e => {
            // gapi.auth2.init({
            gapi.client.init({
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                scope: ""
            })
        })
    }, [])
    const handleSuccess = response => dispath(continueWithGoogle(response.tokenId))

    const handleFail = err => console.log(err)
    return <>
        <GoogleLogin
            className='w-100 mb-5 p-3 fs-5'
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            buttonText='Continue With Google'
            onSuccess={handleSuccess}
            onFailure={handleFail}
        />
    </>
}

export default ContinueWitGoogle