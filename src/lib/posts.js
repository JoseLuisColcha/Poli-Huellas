import {db} from "@/lib/firebase/client";
import { collection, query, where, getDocs, getDoc, doc, addDoc, Timestamp, onSnapshot, orderBy} from "firebase/firestore";

export const getPosts = async (petType) => {
  try {
    const q = petType
      ? query(collection(db, "posts"), where("petType", "==", petType))
      : query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getMyPosts = async (userId) => {
    try{
        const q = query(collection(db, "posts"), where("userID", "==", userId));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        return data;
    }catch(e){
        console.log(e);
    }
}

export const getPost = async (postId) => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {...docSnap.data(), id: docSnap.id};
      } else {
        console.log("No such document!");
      }
}

export const getComments = async (postId) => {
    const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const comments=[];
        snapshot.forEach(doc => {
        comments.push({...doc.data(), id: doc.id});
        });
        return comments;
    });
    return unsubscribe;
}


export const postComment = async (comment, userId, postId) => {
    try{
        await addDoc(collection(db, "comments"), {
            comment: comment,
            userId: userId,
            postId: postId,
            createdAt: Timestamp.fromDate(new Date()),
        });
    }catch(e){
        console.log(e);
    }
}



