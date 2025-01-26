import jwt from 'jsonwebtoken'
import {verifyToken}  from '../services/authentication.js';



export const checkTokenAuthentication = (req,res,next)=>{
    const token = req.cookies['token'] ;
    if(!token){
        return res.status(400).json({message:"token is not present or expired"}) ;
    }

    try {
        const payload = verifyToken(token) ;
        req.user = payload ;
        next();
    } catch (error) {
        return res.status(500).json({error:`someting went wrong - ${error}`})
    }
}



