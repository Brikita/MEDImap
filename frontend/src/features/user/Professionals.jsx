import React from 'react'
import { useGetUsersQuery } from './userApiSlice'
import User from './User'

const Professionals = () => {
    const {
        data: profs,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetUsersQuery()

    let content
    if (isLoading) content = <p>Loading...</p>
    if (isError) {
        content = <p>{error?.data?.message}`</p>
    }
    if (isSuccess) {
      
        const { ids } = profs

        content = ids?.length
            ? ids.map(prof => {
                return (
                    <User key={prof} profId={prof} />
                )
            })
            : <h2>No Professionals</h2>

    }

    const container = <div className='user-container'><h2 className='offscreen'>Seek Help From Professionals</h2>{content}</div>
    return container
  
}

export default Professionals