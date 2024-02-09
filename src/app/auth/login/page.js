import React from 'react';
import LoginContainer from '@/components/sections/LoginContainer';

const Login = () => {

  return (
    <div>
      <LoginContainer />
    </div>
  )
}

export default Login


export function generateViewport({ params }) {
  return {
    themeColor: '#09202D',
  }
}

