import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
} from "firebase/auth";
import {
  Timestamp,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase/client";
import { useAlert } from "./alert";

export const SESSION_STATE = {
  NO_KNOWN: undefined,
  NO_LOGGED: null,
};

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
  const [session, setSession] = useState(SESSION_STATE.NO_KNOWN);
  const [currentUser, setCurrentUser] = useState(SESSION_STATE.NO_KNOWN);
  const [loading, setLoading] = useState(true);
  const {addAlert} = useAlert();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setSession(addRoleToFirebaseUser(firebaseUser));
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

  const addRoleToFirebaseUser = (firebaseUser) => {
    if (!firebaseUser) return null
    const {email} = firebaseUser;
    const role = email.startsWith('admin') ? 'admin' : 'user';
    return {...firebaseUser, role};
  }

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
        name,
        displayName: `${name} ${lastName}`,
      });
    } catch (error) {
      console.log("create user error", error);
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

  async function login({ email, password }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("signin error", {error});
      addAlert('error al iniciar sesión')
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(SESSION_STATE.NO_LOGGED);
    } catch (error) {
      console.log("signout error", error);
    }
  }

  async function updateUser(data) {
    const userRef = doc(db, `users/${data.uid}`);
    try{
      await updateDoc(userRef, data);
    } catch (error) {
      console.log("update user error", error);
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
    updateUser,
  };
}
