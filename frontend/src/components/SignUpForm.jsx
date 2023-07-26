import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import http from '../lib/http'
import './SignupForm.css';


const SignupForm = () => {
    const {register, handleSubmit} =  useForm()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [signup, setSignup] = useState(true)

   

    const onSubmitSignUp = async ({ firstName, lastName, email, password, role }) => {
        let user
        if(role) {
            user = 'professional'
        } else {
            user='user'
        }
        const payload = {
            firstName,
            lastName,
            email,
            password,
            roles: user
        }
        
        await http.post('/api/signup', {data: payload})
        // Perform form submission logic here
        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRoles('')
    };
    const onSubmitLogin = async ({email, password}) => {
        const payload = {
            email,
            password
        }
        console.log(payload);
        await http.post('/api/login', {data: payload})
        // Perform form submission logic here
        console.log('Form submitted:', { firstName, lastName, email, password });
        // Reset form fields
        setEmail('');
        setPassword('');
        
    };
    /* const handleFirstNameChange = (e) => {
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
    }; */
    const handleRolesChange = (e) => {
        if (role) {
            setRole('professional');
        }else {
            setRole('user') ;
        }
    };
    const toggle = () => {
        setSignup(prevState => !prevState)
    }
    const content = signup ? (
        <div>
            <form className="form" onSubmit={handleSubmit(onSubmitSignUp)}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <div className="flex">
                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            /* value={firstName} */
                            /* onChange={handleFirstNameChange} */
                            {...register('firstName')}
                        />
                        <span>Firstname</span>
                    </label>
                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            /* value={lastName} */
                            /* onChange={handleLastNameChange} */
                            {...register("lastName")}
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
                        /* value={email} */
                        /* onChange={handleEmailChange} */
                        {...register("email")}
                    />
                    <span>Email</span>
                </label>
                <label>
                    <input
                        required
                        placeholder=""
                        type="password"
                        className="input"
                        /* value={password} */
                        /* onChange={handlePasswordChange} */
                        {...register("password")}
                    />
                    <span>Password</span>
                </label>
                <label htmlFor="professional">
                    <input
                        type="checkbox"
                        name="professional"
                        id="professional"
                       /*  checked={role === 'professional'} */
                        onChange={handleRolesChange}
                        {...register("role")}
                        
                    />
                    <span className="professional">Are you a professional?</span>
                </label>
                <button type="submit" className="submit">
                    Submit
                </button>
                <p className="signin">
                    Already have an account? <span className='toggle' onClick={toggle}>Sign in</span>
                </p>
            </form>
        </div>
    ) : <form onSubmit={handleSubmit(onSubmitLogin)} className="form-login">
        <p className="title">Sign in to your account</p>
        <div className="login-input-container">
            <input 
            type="email" 
            /* value={email}  */
            name='email' 
            /* onChange={handleEmailChange}  */
            placeholder="Enter email"
            {...register("email")}
            />
            <span>
            </span>
        </div>
        <div className="login-input-container">
            <input 
            type="password" 
            /* value={password} */
             name='password'
            /* onChange={handlePasswordChange}  */
            placeholder="Enter password"
            {...register('password')}
             />
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