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
    
    const [emailError, setEmailError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]); // Store password errors in an array
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('');
    
    const navigate = useNavigate(); 

    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isUsernameExist = async (email) => {
        try {
            const response = await axios.get(`${API_URL}/users/${email}`);
            return response.data && response.data.email === email;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return false;
            }
            console.error('Error checking if email exists:', error);
            return false;
        }
    };

    const validatePassword = (password) => {
        const errors = [];
    
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must include at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must include at least one lowercase letter.");
        }
        if (!/\d/.test(password)) {
            errors.push("Password must include at least one digit.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must include at least one special character.");
        }
        return errors;
    };

    const handleEmailChange = async (e) => {
        const email = e.target.value;
        setEmail(email);
        setEmailError(''); 

        if (!isEmail(email)) {
            setEmailError('Please enter a valid email address.');
        } else if (await isUsernameExist(email)) {
            setEmailError('Email is already in use with another account.');
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        setPasswordErrors([]); 

        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            setPasswordErrors(passwordErrors); // Set password errors as an array
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
        setConfirmPasswordError(''); 

        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match.');
        }
    };

    const handleMobileChange = (e) => {
        const mobile = e.target.value;
        setMobileNumber(mobile);
        setMobileError('');

        if (!/^\d{10}$/.test(mobile)) {
            setMobileError('Please enter a valid 10-digit mobile number.');
        }
    };

    const handleSignup = async () => { 
        if (!fullName || !email || !password || !confirmPassword || !mobile) { 
            setEmailError(!email ? 'Please enter your email.' : '');
            setPasswordErrors(!password ? ['Please enter your password.'] : []);
            setConfirmPasswordError(!confirmPassword ? 'Please confirm your password.' : '');
            setMobileError(!mobile ? 'Please enter your mobile number.' : '');
            return;
        }

        if (emailError || passwordErrors.length > 0 || confirmPasswordError || mobileError) {
            return; 
        }

        try { 
            const response = await axios.post(`${API_URL}/register`, { 
                fullName, email, password, role, mobile 
            });
            localStorage.setItem('jwt', response.data.jwt);
            navigate('/'); 
        } catch (error) { 
            console.error('Signup failed:', error.response ? error.response.data : error.message); 
        }
    };
  
    return ( 
        <div className="d-flex justify-content-center align-items-center vh-100"> 
            <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}> 
                <MDBContainer className="p-3"> 
                    <h2 className="mb-4 text-center">Sign Up</h2> 
                    
                    <MDBInput wrapperClass='mb-3' id='fullName' placeholder={"Full Name"} value={fullName} type='text'
                              onChange={(e) => setFullName(e.target.value)}/> 
                    
                    <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email'
                              onChange={handleEmailChange}/>
                    {emailError && <p className="text-danger">{emailError}</p>} 
                    
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} 
                              onChange={handlePasswordChange}/>
                    {passwordErrors.length > 0 && (
                        <ul className="text-danger">
                            {passwordErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )} 
                    
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password'
                              value={confirmPassword} 
                              onChange={handleConfirmPasswordChange}/> 
                    {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>} 

                    <MDBInput wrapperClass='mb-2' placeholder='Mobile Number' id='mobileNumber' value={mobile} 
                              type='text' onChange={handleMobileChange}/> 
                    {mobileError && <p className="text-danger">{mobileError}</p>}
                    
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