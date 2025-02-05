import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FollowerItem = ({showFollowers,follower,following}) => {
    const accountId = (showFollowers)?follower.followedBy._id : following.account._id ;
    const [followStatus,setFollowStatus] = useState(false) ;
    const [isYourAccount,setIsYourAccount] = useState(false) ;

    const checkFollowStatus = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response = await axios.get(`${BackendURL}/user/${accountId}/follow/status`,{withCredentials:true,});
            setFollowStatus(response.data.isFollowed) ;
            setIsYourAccount(response.data.isYou) ;
        } catch (error) {
            console.log("Error in checking Followe status -",error) ;
        }
    }

    useEffect(()=>{
        checkFollowStatus()
    },[]) ;

    const toggleFollowStatus = async ()=>{
        try {
            const BackendURL = import.meta.env.VITE_backendURL;
            const response = await axios.post(`${BackendURL}/user/${accountId}/follower`,{},{withCredentials:true,});
            checkFollowStatus();
        } catch (error) {
            console.log("Error in toggling FollowStatus -",error) ;
        }
    }

  return (
    <div className='w-full px-3 py-3 my-2 rounded-lg flex mb-2 hover:bg-gray-100 '>
        <Link to={`/${(showFollowers)?follower.followedBy.username : following.account.username}`} >
            <div className=' h-12 w-12 bg-green-500 rounded-full cursor-pointer '></div>
        </Link>
        <div className='w-full ml-4 flex '>
            <Link to={`/${(showFollowers)?follower.followedBy.username : following.account.username}`} className='w-full flex flex-col  '>
                <h1 className=' text-lg font-semibold hover:underline'>{(showFollowers)?follower.followedBy.username : following.account.username}</h1>
                <p className='break-words text-base'>this is my bio.</p>
            </Link>
            <div>
                <button onClick={toggleFollowStatus} className={`ml-4 ${followStatus?'bg-gray-100 hover:bg-gray-200 text-black border-2':
              'bg-green-500 hover:bg-green-600 text-white border-none'} z-10 rounded-xl px-3 py-1 font-semibold cursor-pointer
                 text-white text-[14px] ${isYourAccount?'hidden':'block'} `}>{(followStatus)?'Following':'Follow'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default FollowerItem