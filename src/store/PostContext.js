import { createContext, useState } from "react";

const PostContext=createContext(null)

export function Post({children}){
const [postDetail,setPostDetail]=useState()
    return(

        <PostContext.Provider value={{postDetail,setPostDetail}}>
            {children}
        </PostContext.Provider>
    )
}

export default Post