import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from "../Firebase/Firebase.config"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";


export const AuthInfo = createContext();
const googleProvider = new GoogleAuthProvider();


const Authprovider = ({ children }) => {

    const [user, setUser] = useState(); // user state
    const [loader, setLoader] = useState(true);

    // CREATE USER
    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // singin user
    const singinUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // handle social sing in
    const googleSingin = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider )
    }


    const variables = {
        createUser,
        user,
        loader,
        singinUser,
        googleSingin
    }

    // USER observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
        });
        return () => {
            return unsubscribe()
        }
    }, []);

    return (
        <AuthInfo.Provider value={variables}>
            {children}
        </AuthInfo.Provider>
    );
};

export default Authprovider;