import React from 'react'
import VerifyResetForm from './VerifyResetForm'

const page = ({searchParams}:{searchParams: {token:string}}) => {
  return (
    <div className='p-2 bg-gradient-to-r via-[#fef0f0] from-[#fefbf0] to-[#e6fff2] h-screen'>
      <VerifyResetForm searchParams={searchParams}/>
    </div>
  )
}

export default page
