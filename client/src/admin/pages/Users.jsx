import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, handleUserAccount } from '../../redux/admin/adminActions'
import Grid from '../components/Grid'
import { invalidate } from '../../redux/admin/adminSlice'

const Users = () => {
    const [selectedUser, setSelectedUser] = useState()
    const [show, setShow] = useState(false)
    return <>
        <Grid
            col1={<UserList setSelectedUser={setSelectedUser} />}
            col2={<UserDetails selectedUser={selectedUser} setShow={setShow} />}
            col3={show && <EditUser setShow={setShow} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />}
        />
    </>
}

const UserList = ({ setSelectedUser }) => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    if (loading) {
        return <div class="spinner-border text-primary"></div>
    }
    if (error) {
        return <div className="alert alert-danger">{error}</div>
    }

    const content = users && users.map(item => <li
        className='list-group-item d-flex justify-content-between align-items-center' key={item.id}>
        <span>{item.name}</span>
        <span>{item.email}</span>
        <button onClick={e => setSelectedUser(item)} type="button" class="btn btn-primary">details</button>
    </li>)
    const userList = <ul class="list-group"> {content} </ul>

    return <>
        {userList}
    </>
}
const UserDetails = ({ selectedUser, setShow }) => {
    if (!selectedUser) {
        return <p>Please select user</p>
    }
    return <>
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                {selectedUser.name}'s Profile
                <button onClick={e => setShow(true)} type="button" class="btn btn-warning">edit</button>
            </div>
            <div class="card-body">
                <h1>Name {selectedUser.name}</h1>
                <p>Email {selectedUser.email}</p>
                <p>Account {selectedUser.active ? "Active" : "In-Active"}</p>

            </div>
        </div>
    </>
}

const EditUser = ({ selectedUser, setSelectedUser, setShow }) => {
    const { userAccountUpdate } = useSelector(state => state.admin)

    const dispatch = useDispatch()
    useEffect(() => {
        if (userAccountUpdate) {
            dispatch(getUsers())
            setSelectedUser(null)
            setShow(false)
            setTimeout(() => {
                dispatch(invalidate())
            }, 2000);
        }
    }, [userAccountUpdate])
    return <>
        <div class="card border border-danger">
            <div class="card-header">Danger Zone</div>
            <div class="card-body">
                <div class="form-check form-switch">
                    <input
                        checked={selectedUser.active}
                        class="form-check-input"
                        onChange={e => dispatch(handleUserAccount({
                            id: selectedUser.id,
                            active: e.target.checked
                        }))}
                        type="checkbox" id="id" />
                    <label class="form-check-label" htmlFor="id">Account</label>
                </div>
            </div>
        </div>
    </>
}

export default Users