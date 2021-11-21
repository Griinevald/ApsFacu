import React, { createContext, useState, useEffect } from "react";

import '../services/firebase'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as signOutFireBase,
    onAuthStateChanged
} from 'firebase/auth'
const auth = getAuth()

const UsuarioContext = createContext({});

const UsuarioProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        return onAuthStateChanged(auth, async (useState) => {
            setUser(useState);
            setLoading(false);
        })
    }, [])

    const signIn = async (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then(ress => {
            console.log(ress)
        }).catch(err =>
            console.log(err))
    }
    const signOut = async () => {
        signOutFireBase(auth).then(ress => {
            console.log("Usuario Deslogado")
        }).catch(err =>
            console.log(err))
    }
    const signUp = async (email, password) => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            return ('true')
        }).catch(err => {
            return ('err')

        })
    }


    return (
        <UsuarioContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export { UsuarioContext, UsuarioProvider }