import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../../firebase.config';
import axios from "axios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loggedUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, signedUser => {
            setUser(signedUser);
            // setLoading(false)
            if (signedUser && signedUser.email) {
                const loggedUser = {
                    email: signedUser.email
                }
                axios.post('http://localhost:5000/jwt', { email: signedUser.email })
                    .then(data => {
                        console.log(data.data.token)
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false);
                    }
                    )
                // console.log(loggedUser);

                // fetch('http://localhost:5000/jwt',
                //     {
                //         method: 'POST',
                //         headers: {
                //             'content-type': 'application/json'
                //         },
                //         body: JSON.stringify(loggedUser),

                //     })
                // .then(res => res.json())
                // .then(data => {
                //     console.log('jwt token', data)
                //     localStorage.setItem('token', data.token)
                // })

            }
            else {
                localStorage.removeItem('access-token')
            }
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = { user, createUser, loading, loggedUser, logOut }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;