import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  Timestamp,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  collection,
} from "firebase/firestore";
import { auth, db } from "./firebase/client";
import { useAlert } from "./alert";

import translateMessage from "../constants/messages";
export const SESSION_STATE = {
  NO_KNOWN: undefined,
  NO_LOGGED: null,
};

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
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addAlert } = useAlert();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setSession(addRoleToFirebaseUser(firebaseUser));
      setLoading(false);
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

  useEffect(() => {
    const callback = (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      setUsers(users);
    };
    const unsub = listenUsers(callback);
    return () => unsub && unsub();
  }, []);

  const listenUser = (callback, uid) => {
    const userRef = doc(db, `users/${uid}`);
    const unsub = onSnapshot(userRef, callback);
    return unsub;
  };

  const listenUsers = (callback) => {
    const usersRef = collection(db, "users");
    const unsub = onSnapshot(usersRef, callback);
    return unsub;
  };

  const addRoleToFirebaseUser = (firebaseUser) => {
    if (!firebaseUser) return null;
    const { email } = firebaseUser;
    const role = email.startsWith("admin") ? "admin" : "user";
    return { ...firebaseUser, role };
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
        name,
        displayName: `${name} ${lastName}`,
      });
      addAlert({
        text: "Usuario registrado con éxito",
        severity: "success",
        duration: 6000,
      });
    } catch (error) {
      addAlert({
        text: "Error al registrar un usuario",
        severity: "error",
        duration: 6000,
      });
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
        name: user.name,
        photoURL: user.photoURL,
        displayName: user.displayName,
        role: "user",
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
  }

  async function login({ email, password }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      addAlert({
        text: "Inicio de sesión exitoso",
        severity: "success",
        duration: 6000,
      });
    } catch (error) {
      console.log("signin error", { error });
      addAlert({
        text: translateMessage(error.code),
        severity: "error",
        duration: 6000,
      });
      //alert(translateMessage(error.code));
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(SESSION_STATE.NO_LOGGED);
      addAlert({
        text: "Cierre de sesión exitoso",
        severity: "success",
        duration: 6000,
      });
    } catch (error) {
      addAlert({
        text: "Error al cerrar sesión",
        severity: "error",
        duration: 6000,
      });
      console.log("signout error", error);
    }
  }

  async function updateUser(data) {
    const userRef = doc(db, `users/${data.uid}`);
    try {
      await updateDoc(userRef, data);
      addAlert({
        text: "Usuario actualizado con éxito",
        severity: "success",
        duration: 6000,
      });
    } catch (error) {
      addAlert({
        text: "Error al actualizar usuario",
        severity: "error",
        duration: 6000,
      });
      console.log("update user error", error);
    }
  }

  async function resetPassword({ email }) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      addAlert({
        text: "Error al enviar correo electrónico",
        severity: "error",
        duration: 6000,
      });
      console.log("reset password error", { error });
    }
  }
  return {
    session,
    currentUser,
    isAuthenticated: !!session,
    loading,
    resetPassword,
    singup,
    login,
    logout,
    updateUser,
    listenUser,
    users,
  };
}
