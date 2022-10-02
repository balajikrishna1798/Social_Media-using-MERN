import React, { useEffect } from 'react'
import success from '../../assets/success.json'
import { useNavigate } from 'react-router-dom'

import Lottie from 'lottie-react'
const Success = () => {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/posts')
    }, 2500)
  }, [])

  return (
    <div>
<Lottie animationData={success} loop={false} style={{width:"50%",marginLeft:"auto",marginRight:"auto"}}/>

    </div>
  )
}

export default Success