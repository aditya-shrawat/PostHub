import mongoose from "mongoose";


const likeSchema = mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
},{timestamps:true,});

const Like = mongoose.model("Like",likeSchema) ;

export default Like ;




