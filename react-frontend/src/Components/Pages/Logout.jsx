import React from 'react'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../../Store/AuthSlice'
import { useHistory } from 'react-router-dom'

function Logout() {

    const dispatch = useDispatch()
    const history = useHistory()

    dispatch(AuthActions.logout())
    localStorage.removeItem('token')
    history.replace('/home')

    return (
        <div>

        </div>
    )
}

export default Logout
