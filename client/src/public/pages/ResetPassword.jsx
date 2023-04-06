import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../redux/public/publicAction'

const ResetPassword = () => {
    const [password, setPassword] = useState("456")
    const { resetPass } = useSelector(state => state.public)
    const { userId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleResetPassword = () => {
        dispatch(resetPassword({ password, userId }))
    }
    useEffect(() => {
        if (resetPass) {
            navigate("/login")
        }
    }, [resetPass])
    return <div className='container'>
        <div className="row">
            <div className="col-sm-6 offset-sm-3">
                <div class="card">
                    <div class="card-header">Reset Password</div>
                    <div class="card-body">
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder='Enter Password'
                            className='form-control' /> <br />
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            className='form-control' /> <br />
                        <button
                            onClick={handleResetPassword}
                            type="button"
                            class="btn btn-primary">Reset Password</button>

                    </div>
                </div>
            </div>
        </div>

    </div>
}

export default ResetPassword