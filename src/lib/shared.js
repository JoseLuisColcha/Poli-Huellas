import {storage, db} from "@/lib/firebase/client";
import {ref, uploadBytesResumable } from "firebase/storage";
import { doc,updateDoc} from "firebase/firestore";

export const uploadUserImage = (file, id) => {
    const imageRef = ref(storage, `images/${id}/userAvatar`);
    const task = uploadBytesResumable(imageRef, file);
    return task;
  };

export const updateUserImageURL = async (id, url) => {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, {
    photoURL: url,
  });
}