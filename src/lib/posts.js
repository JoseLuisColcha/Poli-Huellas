import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getPostsByType = async (petType) => {
  try {
    const q = query(collection(db, "posts"), where("petType", "==", petType));
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
  try {
    const q = query(collection(db, "posts"), where("userID", "==", userId));
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
