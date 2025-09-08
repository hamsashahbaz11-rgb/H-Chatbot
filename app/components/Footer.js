import Link from 'next/link'
import React from 'react'
import { FaEnvelope, FaGithub } from 'react-icons/fa'

const Footer = () => {

  return (
    <div className='flex flex-col sm:flex-row justify-center items-center py-2 sm:py-3 relative bottom-0 bg-black text-white rounded-md w-full hover:bg-slate-950 text-xs sm:text-sm'>
            
           <div className='flex flex-wrap justify-center items-center gap-2 sm:gap-4'>
          
              <Link href="/" className="hover:text-blue-400 transition px-2 sm:px-4">
                Home
              </Link>
              <Link
                href="https://github.com/AliAsadullahShahbaz"
                target="_blank"
                className="flex items-center gap-1 hover:text-gray-400 transition px-2 sm:px-4"
              >
                <FaGithub size={16} className="w-3 h-3 sm:w-4 sm:h-4" />   GitHub
              </Link>
              <Link
                href="mailto:hamsashahbaz11@gmail.com"
                className="flex items-center gap-1 hover:text-red-400 transition px-2 sm:px-4"
              >
                <FaEnvelope size={16} className="w-3 h-3 sm:w-4 sm:h-4" /> Email
              </Link> 
                
           </div> 
    </div>
  )
}

export default Footer
