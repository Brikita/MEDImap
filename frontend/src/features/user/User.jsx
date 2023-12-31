import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './User.css'

import { useSelector } from 'react-redux'
import { selectUsersById } from './userApiSlice'

const User = ({ profId }) => {
    const {id: userId} = useParams()
    const user = useSelector(state => selectUsersById(state, profId))
    const navigate = useNavigate()
    

    const handleNavigate = () => location.assign(`/dash/${userId}/view/${profId}`)

    return (
        <div className='prof-container'>
            <div className='prof-container-img'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQalZMFpdpTwvU21VFNoeOL1XnrMcwHJs8lgSXKL0pIQwtdsn4LmzTMIIg2Wg&s" alt="profile picture" width={80} />
            </div>
            <div className='prof-container-details'>
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>

            {<button onClick={handleNavigate}>View Profile</button>}
            </div>
        </div>
    )
}

export default User