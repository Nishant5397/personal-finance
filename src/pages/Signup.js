import React from 'react'
import Header from '../components/Header/Index'
import SignUp from '../components/SignUpSignIn'

function SignUpPage() {
  return (
    <div>
      <Header/>
      <div className='wrapper'>
        <SignUp/>
      </div>
    </div>
  )
}

export default SignUpPage