import axios from "axios";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const AccountInfo = ({setEdit,userDetails}) => {

  return (
    <div className="w-full dark:bg-black ">
        <div className="w-full font-plex dark:text-white dark:bg-black">
            <div className='w-full px-2 mb-5 '>
                <h1 className='text-xl font-bold '>Account information</h1>
            </div>       
            <div className="w-full h-full flex flex-col gap-3 ">
                <div className="w-full flex justify-between p-2 ">
                    <p className="font-semibold inline-block ">Email address</p>
                    {(userDetails) && 
                    <p className="text-gray-500 line-clamp-1 break-words">
                    {userDetails.email}
                    </p>}
                </div>
                <div className="w-full flex justify-between p-2 ">
                    <p className="font-semibold inline-block">Username</p>
                    {(userDetails) &&  
                    <p className="text-gray-500 line-clamp-1 break-words">
                    {userDetails.username}
                    </p>}
                </div>
                <div className="w-full flex justify-between p-2 ">
                    <p className="font-semibold inline-block">Name</p>
                    {(userDetails) && 
                    <p className="text-gray-500 line-clamp-1 break-words">
                    {userDetails.name}
                    </p>}
                </div>
                <div onClick={()=>setEdit(true)} className="w-full flex items-center justify-between mt-4 p-2 rounded-lg border-[1px] dark:border-gray-500 cursor-pointer ">
                    <div className="w-full flex flex-col">
                        <p className="font-semibold">Edit profile information</p>
                        <p className="text-gray-500 text-base">
                        Edit your photo, name and bio.
                        </p>
                    </div>
                    <div><IoIosArrowForward /></div>
                </div> 
            </div>
        </div>
    </div>
  );
};

export default AccountInfo;
