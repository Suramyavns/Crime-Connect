import { db,dbID } from "@/Appwrite";

export const getUserProfile = async(userid) =>{
    try{
        const response = await db.getDocument(dbID,'users',userid)
        return response;
    }
    catch(error){
        console.log(error)
        return null;
    }
}

export const createUserProfile = async(userid,data)=>{
    try{
        const response = await db.createDocument(dbID,'users',userid,data);
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}