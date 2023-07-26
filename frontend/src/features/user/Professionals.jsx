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
     if(isLoading) content = <p>Loading...</p>
     if(isError) {
        content = <p>{error?.data?.message}`</p>
     }
     if(isSuccess) {
        console.log(profs);
        const {ids} = profs

        content = ids?.length
        ? ids.map(prof => {
            return (
                <User key={prof} userId={prof}/>
            )
        })
        : <h2>No Professionals</h2> 

     }
  return content
}

export default Professionals