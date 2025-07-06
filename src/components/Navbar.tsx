import Image from 'next/image'
import React from 'react'
import { User } from 'lucide-react'
import { ThemeButton } from './ThemeButton'

const Navbar = () => {
  return (
    <div 
      className='fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 z-50 shadow-md flex justify-between items-center p-4'
      style={{
        backgroundColor: 'var(--secondary-bg)',
      }}
    >
      <div className='flex items-center justify-center gap-2'>
        <Image 
          src="/logo.png" 
          alt="logo" 
          width={40} 
          height={50} 
          style={{ filter: 'var(--logo-filter)' }}
        />


        <h2 
          className='italic text-xl md:text-2xl font-semibold bg-gradient-to-r from-green-500 to-black dark:from-white dark:to-green-500 bg-clip-text text-transparent'
          style={{
            backgroundImage: 'radial-gradient(circle, var(--gradient-start) 0%, var(--gradient-end) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          FlohSync
        </h2>
      </div>
      
      <div className='flex items-center gap-2 '>    
        <div className=' w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full'
          style={{
            backgroundColor: 'var(--accent)'
          }}>
          <button className='flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 w-full h-full'>
            <User 
              style={{ 
                color: 'black',
                width: '1.25rem',
                height: '1.25rem'
              }} 
            />
          </button>
        </div>
        <div className=' w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full'
          style={{
            backgroundColor: 'var(--secondary-bg)'
          }}>
              <ThemeButton/> 
        </div>
     
      </div>
    </div>
  )
}

export default Navbar