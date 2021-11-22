import React, { useContext, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const auth = getAuth();

export const useProvideAuth = () => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState();

  function signup(email, username, password) {
    const signup = createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        // Signed in
        setCurrentUser(response.user);
        setDoc(doc(db, "users", response.user.uid), {
          email,
          name: username,
          isAdmin: false,
          id: response.user.uid,
        });
        return (response = updateProfile(auth.currentUser, {
          displayName: username,
        }));
      }
    );

    return signup;
  }

  function updateDisplayName(username) {
    return updateProfile(auth.currentUser, {
      displayName: username,
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [currentUser]);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setCurrentUser(response.user);
        return response.user;
      }
    );
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email).then((response) => {
      console.log(response);
    });
  }

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password).then((response) => {
      console.log(response);
    });
  }

  function logout() {
    return signOut(auth).then(() => {
      setCurrentUser(false);
    });
  }

  return {
    currentUser,
    signup,
    login,
    updateDisplayName,
    logout,
    loading,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };
};

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
