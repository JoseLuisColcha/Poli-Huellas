import { db } from "@/lib/firebase/client";
import { collection, query, where, addDoc, Timestamp, onSnapshot, orderBy } from "firebase/firestore";

export const listtenComments = ({ postId, callback }) => {
  const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, callback);
  return unsubscribe;
}


export const addComment = async (comment, userId, postId) => {
  try {
    await addDoc(collection(db, "comments"), {
      comment: comment,
      userId: userId,
      postId: postId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
}