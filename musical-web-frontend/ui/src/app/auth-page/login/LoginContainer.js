import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function LoginContainer(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const showLogin = () => {
        document.getElementById("REGISTER_FORM").style.display = "none";
        document.getElementById("LOGIN_FORM").style.display = "flex"
    }

    const showRegister = () => {
        document.getElementById("REGISTER_FORM").style.display = "flex";
        document.getElementById("LOGIN_FORM").style.display = "none"
    }

    var onFormSubmit = (event) => {

        event.preventDefault();

        props.history.push('/home');

        // setLoading(true);

    //     axios.post('https://api.gii.gl/auth/login', {
    //         email: email,
    //         password: password
    //     })
    //       .then((response) => {
    //         let token = response.data.token;
    //         let username = response.data.username;
    //         localStorage.setItem('token', token);
    //         localStorage.setItem('username', username);
    //         console.log(localStorage.getItem('token'));

    //         props.history.push('/dashboard');
    
    //         return response.data.data;

            
    //       })
    //       .catch(function (error) {
            
    //         console.log(error);
    //       })
    //       .then(function () {
    //         setLoading(false);
    //       });
    }

        return (
        <div className="form">
            <div className={"login "} id="LOGIN_FORM">
                <div className="login-form w-full max-w-xs text-left">
                    <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={onFormSubmit}>
                    <h3 className='text-blue-700 font-bold mb-2 text-center tracking-wider uppercase'>LOGIN</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email address
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} autoFocus/>
                        </div>
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" type="password" placeholder="************" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="text-right italic mb-4">
                            or <strong onClick={() => showRegister()} className="cursor-pointer underline hover:text-blue-500">Register</strong>
                        </div>
                        <div className="flex justify-center">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        ©2020 MusicalWeb Team. All rights reserved.
                    </p>
                    </div>

            </div>

            <div className={"register "} id="REGISTER_FORM">
                <div className="login-form w-full max-w-xs text-left" >
                    <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={onFormSubmit}>
                    <h3 className='text-blue-700 font-bold mb-2 text-center tracking-wider uppercase'>Register</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email address
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} autoFocus/>
                        </div>
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" type="password" placeholder="************" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Confirm Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" type="password" placeholder="************" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="text-right italic mb-4">
                            Back to <strong onClick={() => showLogin()} className="cursor-pointer underline hover:text-blue-500">Login</strong>
                        </div>
                        <div className="flex justify-center">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Register now
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        ©2020 MusicalWeb Team. All rights reserved.
                    </p>
                    </div>

            </div>
        </div>
        );

    }



export default withRouter(LoginContainer);