import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart,FaRegComment,FaRegBookmark  } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import axios from 'axios';

const PostItem = ({post}) => {
  const [likes,setLikes] = useState(0) ;
  const [comments,setComments] = useState(0) ;
  const [likeStatus,setLikeStatus] = useState(false) ;
  const [bookmarkStatus,setBookmarkStatus] = useState(false) ;

  const fetchCounts = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${post._id}/counts`,{withCredentials:true}) ;
      setLikes(response.data.likeCount) ;
      setComments(response.data.commentCount) ;
    } catch (error) {
      console.log("Error in calculating Counts - ",error);
    }
  }

  const isPostIsLiked = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${post._id}/like`,{withCredentials:true}) ;
      setLikeStatus(response.data.isLiked) ;
    } catch (error) {
      console.log("Error in fetching like -",error) ;
    }
  }

  useEffect(()=>{
    fetchCounts();
    isPostIsLiked();
    checkBookmarkStatus()
  },[])

  const checkBookmarkStatus = async ()=>{
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/post/${post._id}/check-bookmark`,{withCredentials:true,});
      setBookmarkStatus(response.data.bookmarked) ;
    } catch (error) {
      console.log("error in bookmark status -",error);
    }
  }

  return (
    <div className='my-3 h-auto w-full px-2 py-6 sm:py-8 flex flex-col border-b-[1px] '>
      {
        (post.createdBy.username)&&
        <div className='mb-3 flex items-center'>
          <div>
            <Link to={`/${post.createdBy.username}`}  className='block bg-green-500 h-7 w-7 rounded-full mr-3 cursor-pointer '></Link>
          </div>
          <div className='w-auto cursor-pointer '>
            <Link to={`/${post.createdBy.username}`} className='flex items-baseline'>
              <h1 className='text-lg font-semibold text-black hover:underline '>{post.createdBy.name}</h1>
              <h2 className='text-gray-500 text-base ml-2 ' >{`@${post.createdBy.username}`}</h2>
            </Link>
          </div>
        </div>
      }
      <Link to={`/post/${post._id}`} className='w-full cursor-pointer '>
        <div className='w-full h-40 flex justify-between items-center cursor-pointer ' >
          <div className='py-3 h-full w-[58%] sm:w-[70%]  flex flex-col justify-between '>
            <div className='w-full h-auto'>
              <h3 className='text-2xl font-bold mb-2 line-clamp-2 break-words'>{post.title}</h3>
              <p className=' line-clamp-1  break-words'>{post.body}</p>
            </div>
            <div className=' mt-3 w-full flex justify-between text-black ' >
              <div className=' flex items-center mr-8 cursor-pointer'><FaRegHeart className={`${(likeStatus)?`bg-red-600`:`bg-transparent`} mr-2 text-xl`} />{likes}</div>
              <div className=' flex items-center cursor-pointer'><FaRegComment className='mr-2 text-xl' />{comments}</div>
              <div className={`text-xl sm:block hidden cursor-pointer`}>
                {(bookmarkStatus)? <FaBookmark /> : <FaRegBookmark  /> }
              </div>
            </div>
          </div>
          <div className='ml-8 min-w-24 min-h-24 sm:w-32 sm:h-32 bg-green-500'>

          </div>
        </div>
      </Link> 
    </div>
  )
}

export default PostItem