import React from 'react'
import { useContext, useState } from "react";
import './LogReg.css'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase-config"
import {AuthContext} from "../context/AuthContext"

const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const {dispatch} = useContext(AuthContext);
    const handleLogin = (e)=> {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({type:"LOGIN", payload:user})
            navigate("/")
        })
        .catch((error) => {
            // Ajoutez cette ligne pour afficher l'erreur
            setError(true);
        });
    }

    return (
        
        <div className="auth">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type='email' placeholder='Email' onChange={e=>setEmail(e.target.value)} />
                <input type='password' placeholder='Password' onChange={e=>setPassword(e.target.value)} />
                <button type='submit'>Login</button>
                {error && <p>This is an error!</p>}
            </form>
        </div>
       
    )
}

export default Login