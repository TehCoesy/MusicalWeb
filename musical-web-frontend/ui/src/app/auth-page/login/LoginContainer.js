import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';
import {useToasts} from 'react-toast-notifications';

function LoginContainer(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {addToast} = useToasts()

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

        // props.history.push('/user');

        // setLoading(true);

        let data = {
            username: username,
            password: password
        };

        console.log(data);
        axios.post('http://127.0.0.1:3333/login', data)
          .then((response) => {
            
            let token = response.data.token;
            // let username = response.data.username;
            if(token) localStorage.setItem('token', token);
            // localStorage.setItem('username', username);
            // console.log(localStorage.getItem('token'));

            if(token) props.history.push('/user');

            setLoading(false);
            if(token) addToast('Successfully logged in.', { appearance : 'success'});
            else {
                addToast(response.data[0].message, { appearance : 'error'})
            }

            console.log(response.data)
    
            // return response.data.data;

            
          })
          .catch(function (error) {
            setLoading(false);
            
            console.log(error);
          })
          .then(function () {
            // setLoading(false);
            setLoading(false);
          });
    }

    var onRegisterSubmit = (event) => {

        event.preventDefault();

        let data = {
            email: registerEmail,
            username: registerUsername,
            password: registerPassword
        };

        console.log(data);


        // props.history.push('/user');

        // setLoading(true);

        axios.post('http://127.0.0.1:3333/register', data, {
            headers: {
                "Access-Control-Allow-Origin": "true"
            }
        })
          .then((response) => {
            console.log(response.data);

            if(response.data.id) {
                addToast('Successfully logged in.', { appearance : 'success'});
                showLogin();
            }
            else {
                addToast(response.data[0].message, { appearance : 'error'})
            }
            
          })
          .catch(function (error) {
            
            console.log(error);
          })
          .then(function () {
            // setLoading(false);
          });
    }

        return (
        <div className="form">
            
            <LoadingScreen
                loading={loading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                text='Please wait...'
            > 

            <div className={"login "} id="LOGIN_FORM">
                <div className="login-form w-full max-w-xs text-left">
                    <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={onFormSubmit}>
                    <h3 className='text-blue-700 font-bold mb-2 text-center tracking-wider uppercase'>LOGIN</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username" type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} autoFocus/>
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
                    <form className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={onRegisterSubmit}>
                    <h3 className='text-blue-700 font-bold mb-2 text-center tracking-wider uppercase'>Register</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email address
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username" type="email" placeholder="Enter email" onChange={(e) => setRegisterEmail(e.target.value)} autoFocus/>
                        </div>
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username" type="text" placeholder="Enter username" onChange={(e) => setRegisterUsername(e.target.value)}/>
                        </div>
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" type="password" placeholder="************" onChange={(e) => setRegisterPassword(e.target.value)} />
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
                
            </LoadingScreen>
  
            
        </div>
        );

    }



export default withRouter(LoginContainer);