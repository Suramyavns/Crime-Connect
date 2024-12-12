import { db } from "@/FirebaseConfig";
import { collection,doc,setDoc,getDoc,updateDoc,deleteDoc } from "firebase/firestore"

export const getUserProfile = async(userid) =>{
    try{
        const docRef = doc(db,'users',userid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            return docSnap.data()
        }
        else{
            return null;
        }
    }
    catch(error){
        return error.message;
    }
}

export const createUserProfile = async(userid,data)=>{
    try{
        const docRef = doc(db,'users',userid);
        await setDoc(docRef,data);
    }
    catch(error){
        console.error(error)
    }
}