import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit'; 

const API_URL = 'http://localhost:3232/auth';

function SignupPage() { 
    const [fullName, setFullName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [role, setRole] = useState('ROLE_CUSTOMER'); 
    const [mobile, setMobileNumber] = useState(''); 
    const [error, setError] = useState(''); // State to manage error messages 
    const navigate = useNavigate(); // Get the navigate function for redirection 

    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isUsernameExist = async (email) => {
        try {
            const response = await axios.get(`${API_URL}/users/${email}`);

            // If the response returns a user object, the email exists
            return response.data && response.data.email === email; // Check if email matches
        } catch (error) {
            // If a 404 error or another error occurs, it means the email does not exist
            if (error.response && error.response.status === 404) {
                return false; // Email does not exist
            }
            console.error('Error checking if email exists:', error);
            return false; // Return false if there's another error
        }
    };

    const handleSignup = async () => { 
        setError('');  // Clear previous errors

        // Check for empty fields 
        if (!fullName || !email || !password || !confirmPassword || !mobile) { 
            setError('Please fill in all fields.'); 
            return; 
        }

        // Check if email is valid
        if (!isEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Check if email already exists in the system
        const emailExists = await isUsernameExist(email);
        if (emailExists) {
            setError('Email is already in use with another account. Please use a different email to register.');
            return; // Prevent further actions if the email already exists
        }

        // Check if passwords match
        if (password !== confirmPassword) { 
            setError("Passwords do not match");
            return;
        }

        try { 
            // Make API call to register the user
            const response = await axios.post(`${API_URL}/register`, { 
                fullName, email, password, role, mobile 
            });

            // Store JWT token in localStorage
            localStorage.setItem('jwt', response.data.jwt);

            // Redirect only if there is no error
            navigate('/'); // Redirect after successful signup
    
        } catch (error) { 
            console.error('Signup failed:', error.response ? error.response.data : error.message); 
            setError(error.response ? error.response.data : error.message); 
        }
    };
  
    return ( 
        <div className="d-flex justify-content-center align-items-center vh-100"> 
            {error && <p className="text-danger">{error}</p>}
            <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}> 
                <MDBContainer className="p-3"> 
                    <h2 className="mb-4 text-center">Sign Up</h2> 
                    <MDBInput wrapperClass='mb-3' id='fullName' placeholder={"Full Name"} value={fullName} type='text'
                              onChange={(e) => setFullName(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email'
                              onChange={(e) => setEmail(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} 
                              onChange={(e) => setPassword(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password'
                              value={confirmPassword} 
                              onChange={(e) => setConfirmPassword(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-2' placeholder='Mobile Number' id='mobileNumber' value={mobile} 
                              type='text'
                              onChange={(e) => setMobileNumber(e.target.value)}/> 
                    <label className="form-label mb-1">Role:</label> 
                    <select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}> 
                        <option value="ROLE_CUSTOMER">User</option> 
                        <option value="ROLE_ADMIN">Admin</option> 
                    </select> 
                    <div className="d-grid gap-2">
                        <MDBBtn onClick={handleSignup}>Sign Up</MDBBtn>
                    </div>
                    <div className="text-center"> 
                        <p>Already Registered? <a href="/">Login</a></p> 
                    </div> 
                </MDBContainer> 
            </div> 
        </div> 
    ); 
} 

export default SignupPage;