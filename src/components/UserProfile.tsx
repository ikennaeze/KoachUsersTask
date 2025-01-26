import { User } from '../interfaces/types'
import default_pfp from '../assets/default_pfp.png'
import location_icon from '../assets/location_icon.png'
import work_icon from '../assets/work_icon.png'
import phone_icon from '../assets/phone_icon.png'
import website_icon from '../assets/website_icon.png'
import email_icon from '../assets/email_icon.png'

interface Props {
    user: User
}

function UserProfile({user}: Props) {
  return (
    <>
    <div className="xl:w-[30%] lg:w-[45%] md:w-[70%] sm:w-full max-sm:w-full bg-white rounded-xl shadow-xl border-gray-200 border-2 py-8 px-4">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center space-y-2">
              <img src={default_pfp} alt="user pfp" className="w-36 h-36" />
              <div>
                  <h1 className="text-[22pt] font-semibold font-['Bitter']">{user.name}</h1>
                  <p className="text-[12pt] text-gray-500 text-center">@{user.username}</p>
              </div>
          </div>

          <div className="flex items-center space-x-3 mt-8 ">
            <div className="flex items-center space-x-2 border-[1.5px] border-blue-300 text-blue-700 px-3 py-0.5 rounded-xl bg-blue-100"><img src={work_icon} alt="" className="w-7 h-7"  /><p className="">{user.company.name}</p></div>
            <p className="bg-blue-200 rounded-xl h-8 w-0.5"></p>
            <div className="flex items-center space-x-2 border-[1.5px] border-blue-300 text-blue-700 px-3 py-0.5 rounded-xl bg-blue-100"><img src={location_icon} alt="" className="w-7 h-7"  /><p className="">{user.address.city}</p></div>
          </div>

          <div className="flex flex-col items-center mt-12 space-y-7">
            <h1 className="font-['Bitter'] font-bold text-[16pt]">Contact Information</h1>

            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2"><img src={phone_icon} alt="phone" className="w-8 " /><p>{user.phone}</p></div>
              <div className="flex items-center space-x-3"><img src={email_icon} alt="phone" className="w-8" /><p>{user.email}</p></div>
              <div className="flex items-center space-x-2"><img src={website_icon} alt="phone" className="w-8" /><p>{user.website}</p></div>
            </div>
          </div>
        </div>

        
    </div> 
    </>
  )
}

export default UserProfile