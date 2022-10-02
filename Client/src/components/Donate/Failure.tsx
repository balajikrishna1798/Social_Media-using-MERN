import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import failure from '../../assets/failure.json'

import Lottie from 'lottie-react'

const Failure = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
          navigate('/posts')
        }, 2500)
      }, [])
  return (
    <div>

<Lottie animationData={failure} loop={false} style={{width:"40%",marginLeft:"auto",marginRight:"auto"}}/>

    </div>
  )
}

export default Failure