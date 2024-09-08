import React, { useState } from 'react'; 
import axios from 'axios'; 
//import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import { 
    MDBContainer, 
    MDBInput, 
    MDBBtn, 
} from 'mdb-react-ui-kit'; 
  
function Login() { 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const history = useNavigate(); 
  
    const handleLogin = async () => { 
        try { 
            if (!username || !password) { 
                setError('Please enter both username and password.'); 
                return; 
            } 
            
            const response = await axios.post('http://localhost:3232/auth/login', { email: username, password });
            localStorage.setItem('username',username);
            localStorage.setItem('status',response.data.status);
            console.log('jwt::Login.js:-', response.data.jwt);  
            localStorage.setItem('jwt',response.data.jwt);
            console.log('Login successful:', response.data);  
            history('/app'); 
        } catch (error) { 
            console.error('Login failed:', error.response ? error.response.data : error.message); 
            setError('Invalid username or password.'); 
        } 
    }; 
  
    return ( 
        <div className="d-flex justify-content-center align-items-center vh-100"> 
            <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}> 
                <MDBContainer className="p-3"> 
                    <h2 className="mb-4 text-center">Login Page</h2> 
                    <MDBInput wrapperClass='mb-4' placeholder='Email address' id='email' value={username} type='email' onChange={(e) => setUsername(e.target.value)} /> 
                    <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} /> 
                    {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */} 
                    <div className="d-grid gap-2"><MDBBtn onClick={handleLogin}>Sign in</MDBBtn></div>
                    <div className="text-center"> 
                        <p>Not a member? <a href="/register" >Register</a></p> 
                    </div> 
                </MDBContainer> 
            </div> 
        </div> 
    ); 
} 
  
export default Login; 