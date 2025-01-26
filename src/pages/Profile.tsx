import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import axios from 'axios'
import UserActivities from '../components/UserActivities'
import toast from 'react-hot-toast'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import UserProfile from '../components/UserProfile'
import { User } from '../interfaces/types'


function Profile() {
    const {userUsername} = useParams<string>()
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        axios.get(`/users`)
        .then(({data}) => {
            setUser(data.filter((user: User) => user.username.toLowerCase() == userUsername)[0])
            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            toast.error(`There has been a critical error retrieving this user's profile. Please try again later.`)
        })
    }, [userUsername])

  return (
    <>
    <NavBar/>
    <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col sm:space-y-8 max-sm:flex-col max-sm:space-y-8 px-10 py-10 space-x-8">
        {/* Profile container */}
        {!isLoading ? (user && <UserProfile user={user}/>) : <div className="w-[30%] bg-white"><div className="flex justify-center mt-40"><TailSpin stroke='#050a30' className='w-24 h-24'/></div></div>}

        {/* Activities container */}
        {!isLoading ? (user && <UserActivities user={user}/>) : <div className="bg-blue-200 rounded-xl w-[70%] pt-10 border-gray-400"><div className="bg-blue-100 rounded-b-xl py-10 px-5 w-full"><div className="flex justify-center mt-40"><TailSpin stroke='#050a30' className='w-24 h-24'/></div></div></div>}
        
    </div>
    </>
  )
}

export default Profile