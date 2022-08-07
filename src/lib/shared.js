import {storage} from "@/lib/firebase/client";
import {ref, uploadBytesResumable } from "firebase/storage";

export const uploadUserImage = (file, id) => {
    const imageRef = ref(storage, `images/${id}/userAvatar`);
    const task = uploadBytesResumable(imageRef, file);
    return task;
  };