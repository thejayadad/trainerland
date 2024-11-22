'use client'
import {useFormStatus} from "react-dom"

const GoogleButton = () => {
    const {pending} = useFormStatus()
  return (
    <>
        {pending ? (
            <button disabled className="flex items-center space-x-1 w-full">
                <span className="loading loading-dots loading-md"></span>
                One Moment...
            </button>
        ) :
        (
            <button className="btn btn-wide">SignIn With Google</button>
        )
    
    }
    </>
  )
}

export default GoogleButton