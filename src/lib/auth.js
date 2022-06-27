import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Timestamp, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase/client";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log({ currentUser });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setSession(firebaseUser);
        setLoading(false);
      } catch (e) {
        console.log("auth error", e);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const callback = (doc) => {
      const data = doc.data();
      setCurrentUser({ ...data, uid: doc.id });
    };
    let unsub;
    if (session) {
      unsub = listenUser(callback, session.uid);
    }
    return () => unsub && unsub();
  }, [session]);

  const listenUser = (callback, uid) => {
    const userRef = doc(db, `users/${uid}`);
    const unsub = onSnapshot(userRef, callback);
    return unsub;
  };

  async function singup({ email, password, name, lastName }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserDocument({
        ...userCredential.user,
        lastName,
        displayName: name,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function createUserDocument(user) {
    const userRef = doc(db, `users/${user.uid}`);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        lastName: user.lastName,
        photoURL: user.photoURL,
        displayName: user.displayName,
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
  }

  async function login({email, password}) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log('signin error', error);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.log("signout error", error);
    }
  }

  return {
    session,
    currentUser,
    isAuthenticated: !!session,
    loading,
    singup,
    login,
    logout,
  };
}
