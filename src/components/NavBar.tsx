import React from 'react'
import { Link } from 'react-router-dom'
import koach_logo from "../assets/Koach_logo.png"

function NavBar() {
  return (
    <>
    <div className="flex items-center bg-[#050a30] py-2.5">
        <Link to={"/"} className="">
            <img src={koach_logo} alt="Koach logo" className='w-10 h-10 mx-4' />
        </Link>
    </div>
    </>
  )
}

export default NavBar