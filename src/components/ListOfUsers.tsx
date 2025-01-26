import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import default_pfp from '../assets/default_pfp.png'
import toast from 'react-hot-toast'
import { User } from '../interfaces/types'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'

function ListOfUsers() {
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [searchedUsers, setSearchedUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    //only fetch for user data when the array of all users decreases or increases in length
    useEffect(() => {
        axios.get(`/users`)
        .then(({data}) => {
            setAllUsers(data)
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error)
            toast.error(`There has been a critical error while retrieving the users. Please try again.`)
        })
    }, [allUsers.length])

    //show the users whose name or username match the search input
    function searchForUser(searchInput: string){
        if(searchInput){
            setSearchedUsers(allUsers?.filter(user => user.username.toLowerCase().includes(searchInput.toLowerCase()) || user.name.toLowerCase().includes(searchInput.toLowerCase()) ))
        } else {
            setSearchedUsers([])
        }
    }

  return (
    <>
    <div className="mt-6">
        <div className="flex flex-col items-center">
            {/* Title of page*/}
            <h1 className="text-[36pt] font-extrabold font-['Bitter']">List of Users</h1>

            {/* Search Bar */}
            <input type="text" placeholder="Search for a user..." className="bg-white px-2 py-3 xl:w-[40%] lg:w-[40%] md:w-[50%] sm:w-[60%] max-sm:w-[80%] soutline-none border-gray-300 border-2 focus:border-blue-300 rounded-lg" onChange={(e) => {searchForUser(e.target.value)}}/>
        </div>

        {/* Users Container */}
        {isLoading ? <div className='flex justify-center items-center mt-28'><TailSpin stroke='#050a30' className="w-24 h-24"/></div>:
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 space-x-3 space-y-6 px-4 py-6 mt-12">
            {(searchedUsers.length > 0 ? searchedUsers : allUsers).map((user) => (
                <>
                <Link to={`/profile/${user.username.toLowerCase()}`} className="flex space-x-10 bg-white border-gray-300 hover:border-blue-300 hover:shadow-xl border-2 shadow-blue-200 duration-300 hover:translate-y-[-10px] active:translate-y-1  p-2 rounded-xl cursor-pointer">
                    <div><img src={default_pfp} alt="user profile pic" className="w-20 h-20"  /></div>

                    <div className="space-y-3">
                        <div>
                            <p className="text-[16pt] font-['Bitter'] font-semibold">{user.name}</p>
                            <p className="text-[10pt] text-gray-500">@{user.username}</p>
                        </div>

                        <div className="border-[1.5px] border-blue-300 text-blue-700 px-3 py-0.5 rounded-xl bg-blue-100"><p className="text-[11pt]">Works at {user.company.name}</p></div>
                    </div>
                </Link>
                </>
            ))}
            </div>
        }
    </div>
    </>
  )
}

export default ListOfUsers