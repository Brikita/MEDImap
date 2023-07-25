import React, { useState } from 'react';
import './SignupForm.css';


const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setSignup] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        console.log('Form submitted:', { firstName, lastName, email, password });
        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const toggle = () => {
        setSignup(prevState => !prevState)
    }
    const content = signup ? (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <div className="flex">
                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        <span>Firstname</span>
                    </label>
                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                        <span>Lastname</span>
                    </label>
                </div>
                <label>
                    <input
                        required
                        placeholder=""
                        type="email"
                        className="input"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <span>Email</span>
                </label>
                <label>
                    <input
                        required
                        placeholder=""
                        type="password"
                        className="input"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span>Password</span>
                </label>
                <button type="submit" className="submit">
                    Submit
                </button>
                <p className="signin">
                    Already have an account? <span className='toggle' onClick={toggle}>Sign in</span>
                </p>
            </form>
        </div>
    ) : <form className="form-login">
        <p className="title">Sign in to your account</p>
        <div className="login-input-container">
            <input type="email" placeholder="Enter email" />
            <span>
            </span>
        </div>
        <div className="login-input-container">
            <input type="password" placeholder="Enter password" />
        </div>
        <button type="submit" className="login-submit">
            Sign in
        </button>

        <p className="signin">
            No account?
            <span className='toggle' onClick={toggle}>Sign up</span>
        </p>
    </form>

    return content
};
export default SignupForm;