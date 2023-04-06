import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../redux/public/publicAction'

const ForgetPassword = () => {
    const dispatch = useDispatch()
    const { emailSend } = useSelector(state => state.public)
    const sendInstruction = () => {
        dispatch(forgetPassword({ email }))
    }
    const [email, setEmail] = useState("akashdhone01@gmail.com")
    if (emailSend) {
        return <div class="alert alert-success">Instruction Send , Please Check your Email</div>
    }
    return <div className="container">
        <div className="row">
            <div className="col-sm-6 offset-sm-3">
                <div class="card">
                    <div class="card-header">Forget Password</div>
                    <div class="card-body">
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className='form-control'
                            type="text"
                            placeholder='Enter Your Registered Email' /> <br />
                        <button
                            type="button"
                            onClick={sendInstruction}
                            className="btn  btn-lg w-100 btn-primary">
                            Verify Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ForgetPassword