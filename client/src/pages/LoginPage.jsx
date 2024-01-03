import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    
    
    async function loginUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post("/login", {
                email, 
                password,
            });
            if(response.data.message === "Login successful") {
                alert("Login successful");
                setUser(response.data.user.rows[0]);
                setRedirect(true);
            }else {
                alert("Login failed, Invalid credentials try again! ");
            }
        } catch (error) {
            alert("Login failed, Invalid credentials try again!")
            console.error(error);
        }

        emailInput.current.value = "";
        passwordInput.current.value = "";
    }

    if(redirect){
        return <Navigate to={"/"} />
    }
    return(
        <div className="flex items-center justify-center grow h-screen">
            <div className="-mt-32 p-4 sm:p-6 md:p-8"> 
                <h1 className="text-4xl text-center mb-4 sm:mb-6 md:mb-8">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginUser}>
                    <input  type="email" 
                    placeholder="your@email.com"
                    value={email}
                    ref={emailInput}
                    onChange={e => setEmail(e.target.value)} />
                    
                    <input  type="password" 
                    placeholder="password"
                    value={password}
                    ref={passwordInput}
                    onChange={e => setPassword(e.target.value)}/>
                    
                    <button className="primary">Login</button>
                    <div className="p-2 text-center">
                        Don&apos;t have an account yet ? <Link to="/register">
                        <span className="text-primary underline font-medium">Register now</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}