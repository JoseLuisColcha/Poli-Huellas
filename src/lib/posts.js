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
  onSnapshot,
} from "firebase/firestore";

export const getPosts = ({ petType, status, petSex, petSize, callback }) => {
  const constraints = [
    petType && where("petType", "==", petType),
    status && where("status", "==", status),
    petSex && where("petSex", "==", petSex),
    petSize && where("petSize", "==", petSize),
    orderBy("createdAt", "desc"),
  ].filter((c) => c);
  const q = query(collection(db, "posts"), ...constraints);
  const unsubscribe = onSnapshot(q, callback);
  return unsubscribe;
};

export const getMyPosts = ({ userId, status, callback }) => {
  const q = query(
    collection(db, "posts"),
    where("userId", "==", userId),
    where("status", "==", status),
    orderBy("createdAt", "desc")
  );
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
};

export const updatePostInformation = async (
  id,
  petName,
  petSex,
  petSize,
  petAge,
  description
) => {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, { petName, petSex, petSize, petAge, description });
};

export const updatePostImage = async (id, image) => {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, { image });
};
export const deleteComment = async (id) => {
  const docRef = doc(db, "comments", id);
  await deleteDoc(docRef);
};
