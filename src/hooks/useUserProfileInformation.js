import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";

export const useUserProfileInformation = ({ userId }) => {
  const [userDataProfile, setUserDataProfile] = useState(null);
  const {listenUser} = useAuth();

  useEffect(() => {
    const callback = (doc) => {
      const data = doc.data();
      setUserDataProfile({ ...data, uid: doc.id });
    };
    let unsub;
    if (userId) {
      unsub = listenUser(callback, userId);
    }
    return () => unsub && unsub();
  }, [userId, listenUser])

  return { userDataProfile }
}