import Header from '@/components/layouts/Header'
import AsideWithLogo from '@/components/sections/AsideWithLogo'
import React from 'react'

const Register = () => {
  return (
    <div className='xl:container mx-auto lg:ps-16 gap-5'>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className=' col-span-7'>
        hello
        <Header />
      </div>
      <div className='col-span-5 hidden relative lg:flex lg:px-0 px-3 items-stretch'>
          <AsideWithLogo />
      </div>
    </div>
  </div>
  )
}

export default Register