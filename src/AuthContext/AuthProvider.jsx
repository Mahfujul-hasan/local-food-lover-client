import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);

    
    // google sign in
    const loginWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const createUser= (email, password)=>{
        return createUserWithEmailAndPassword(auth,email, password);
    }

    const signInUser= (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update user
    const updateUserProfile=(profile)=>{
        return updateProfile(auth.currentUser, profile)
    }

    // signout 
    const logOut = ()=>{
         return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        })
        return()=>{
            unsubscribe()
        }
    
    },[]);


    const authInfo = {
        loginWithGoogle,
        createUser,
        signInUser,
        updateUserProfile,
        logOut,
        setUser,
        user,
        loading,


    }
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;