import { db } from "@/lib/firebase/client";
import {
  collection,
  query,
  where,
  addDoc,
  Timestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

export const listtenNotifications = ({ receiverId, callback }) => {
  const q = query(
    collection(db, "notifications"),
    where("receiverId", "==", receiverId),
    orderBy("createdAt", "desc")
  );
  const unsubscribe = onSnapshot(q, callback);
  return unsubscribe;
};

export const createNotification = async (receiverId, message) => {
  try {
    await addDoc(collection(db, "notifications"), {
      receiverId: receiverId,
      message: message,
      isSeen: false,
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
};
