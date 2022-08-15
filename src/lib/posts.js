import { db } from "@/lib/firebase/client";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  orderBy,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";

export const getPosts = async (petType, status) => {
  const constraints = [
    petType && where("petType", "==", petType),
    status && where("status", "==", status),
    orderBy("createdAt", "desc"),
  ].filter((c) => c);

  try {
    const q = query(collection(db, "posts"), ...constraints);
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

export const getMyPosts = ({userId, callback}) => {
  const q = query(collection(db, "posts"), where("userId", "==", userId), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, callback);
  return unsubscribe;
};

export const getPost = async (postId) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  } else {
    console.log("No such document!");
  }
};

export const updatePost = async ({ data, id }) => {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, data);
};

export const deletePost = async (id) => {
  const docRef = doc(db, "posts", id);
  await deleteDoc(docRef);
}