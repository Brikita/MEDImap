import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import http from '../lib/http'
import './SignupForm.css';
import Spinner from './Spinner';


const SignupForm = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [signup, setSignup] = useState(true)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState('')



    const onSubmitSignUp = async ({ firstName, lastName, email, password, role }) => {
       setIsLoading(true)
        try {
          let user;
          if (role) {
            user = 'professional';
          } else {
            user = 'user';
          }
          const payload = {
            firstName,
            lastName,
            email,
            password,
            roles: user
          };
          const res = await http.post("/api/signup", {
            data: payload,
            credentials: 'include'
          });
          const data = res.data;
          console.log(data.newUser._id);
          // Display the response to the user
          alert("Sign up successful!");
          setIsLoading(false)
          navigate(`/dash/${data.newUser._id}`)
        } catch (error) {
            console.error(error);
            // Display an error message to the user
            setIsLoading(false)
            alert("Email already in use", error);
        }
      };
      const onSubmitLogin = async ({ email, password }) => {
        setIsLoading(true)
        try {
            const payload = {
                email,
                password
            };
            console.log(payload);
            const res = await http.post("/api/login", {
                data: payload,
                credentials: 'include'
            });
            console.log(res);
            const data = res.data
            setIsLoading(false)
            navigate(`/dash/${data.user._id}`)
            // Handle successful login response here
        } catch (error) {
            console.error(error);
            // Display the error message to the user
            let errorMessage = "Invalid credentals";
            
            setIsLoading(false)
          alert(errorMessage);
        }
      };
    const changePswd = async ({ newpassword }) => {
        const payload = {
            newpassword,
            token: localStorage.getItem('token')
        }

        const result = await http.post('/api/recover', { data: payload })
    }
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
        } else {
            setRole('user');
        }
    };
    const toggle = () => {
        setSignup(prevState => !prevState)
    }
    const content = signup ? (
        <div>
            <form className="form" onSubmit={handleSubmit(onSubmitSignUp)}>
                <p className="title">Register</p>
                <p>{error}</p>
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
            {isLoading && <Spinner />}
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
        {isLoading && <div><Spinner /> <h3>Please Wait a moment...</h3></div>}
    </form>

    return content
};
export default SignupForm;