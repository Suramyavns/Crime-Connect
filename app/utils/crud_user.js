import { db,dbID,storage,storageID } from "@/Appwrite";
import { ID } from "react-native-appwrite";

const avatarBucketId = storageID


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

export const uploadImageToBucket = async(userid,avatar) => {
    try{
        const response = await storage.createFile(avatarBucketId,ID.unique(),avatar);
        return response;
    }
    catch(e){
        console.error(e.message);
        return null
    }

}


export const downloadImageFromBucket = async(id)=>{
    try{
        const response = storage.getFileDownload(avatarBucketId,id);
        return response
    }
    catch(e){
        console.error(e);
        return null
    }
}