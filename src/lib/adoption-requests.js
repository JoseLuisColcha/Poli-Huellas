import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export const createAdoptionRequest = async ({ postId, userId, formData }) => {
  await addDoc(collection(db, "adoptionRequests"), {
    postId,
    userId,
    formData,
    createdAt: Timestamp.fromDate(new Date()),
  });
};

export const getAdoptionRequestsByPostId = async ({ postId }) => {
  const q = query(
    collection(db, "adoptionRequests"),
    where("postId", "==", postId)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data;
};

export const getUserAdoptionRequestsByPostId = async ({ postId, userId }) => {
  const q = query(
    collection(db, "adoptionRequests"),
    where("postId", "==", postId),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data[0];
};

export const updateAdoptionRequestStatus = async ({status, id}) => {
  const adoptionRequestRef = doc(db, `adoptionRequests/${id}`);
  await updateDoc(adoptionRequestRef, {status});
}
