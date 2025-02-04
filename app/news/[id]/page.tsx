'use client'
import React from 'react'
import ViewPage from './ViewPage'

const page = ({params: { id }}: { params: { id: string }}) => {
  return (
    <div>
      <ViewPage id= {id}/>
    </div>
  )
}

export default page
