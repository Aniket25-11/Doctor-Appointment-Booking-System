import React from 'react'
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext'

function Login() {
  const {setAdminToken,backendUrl} = useState(AdminContext)
  return (
    <div className='bg-slate-900 text-3xl text-teal-600'>Login kro </div>
  )
}

export default Login