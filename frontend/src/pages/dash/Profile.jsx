import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Professionals from '../../features/user/Professionals'
import http from '../../lib/http'
import Chat from '../../components/Chat'


const profile = () => {
  const { id: userId } = useParams()
  const { profId: profId } = useParams()
  const [user, setUser] = useState('')
  useEffect(() => {
    const fetchProf = async () => {
      const response = await http.get(`/api/users/user/${profId}`)
      setUser(response.data);
    }
    fetchProf()
  }, [user, profId])

  return (
    <div className='profile'>
      <div className='profile-prof'>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQalZMFpdpTwvU21VFNoeOL1XnrMcwHJs8lgSXKL0pIQwtdsn4LmzTMIIg2Wg&s" alt="profile picture" width={80} />

          <h1>{user && user.firstName} {user && user.lastName}</h1>

          <h2>{user && user.email}</h2>

          <h3>Institution: </h3>
        </div>
        <div>
          <Chat />
        </div>
      </div>

      <Professionals />

    </div>

  )
}

export default profile