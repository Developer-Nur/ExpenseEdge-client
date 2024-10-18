import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from "../Firebase/Firebase.config"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from 'axios';


export const AuthInfo = createContext();
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null); // user state
    const [loader, setLoader] = useState(true);


    // console.log("the use is ", user);

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
        return signInWithPopup(auth, googleProvider)
    }


    // sing out 
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }

    // USER observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // console.log("for jwt", currentUser.email);
            if (currentUser) {
                // get token and store user
                const userEmail = { email: currentUser.email }
                axios.post(`${import.meta.env.VITE_SERVER_URL}/jwt`, userEmail)
                    .then(res => {
                        // console.log("token response", res.data.token)
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                        }
                    })
            }
            else {
                // to do remove user or logout
                // localStorage.removeItem("access-token")
            }
            setLoader(false)
        });
        return () => {
            return unsubscribe()
        }
    }, []);


    const variables = {
        createUser,
        user,
        loader,
        singinUser,
        googleSingin,
        logOut,
    }

    return (
        <AuthInfo.Provider value={variables}>
            {children}
        </AuthInfo.Provider>
    );
};

export default AuthProvider;