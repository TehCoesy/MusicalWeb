import React from 'react';
import logo from '../../../img/Google_Play_Music_icon-icons.com_75720.png';

const Navbar = () => {

    return (
        <nav className="flex items-center justify-between flex-wrap bg-pink-200 p-6">
        <div className="flex items-center flex-shrink-0 text-red-600 mr-6">
            <img src={logo} width={50} className="px-2"></img>
            <span className="font-semibold text-xl tracking-wider">Music4Life</span>
        </div>
        <div className="block lg:hidden">
            <button className="flex items-end px-3 py-2 border rounded text-red-400 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-end lg:w-auto">
            <div className="text-sm lg:flex-grow">
            <a href="#OUR_FEATURES" className="block mt-4 lg:inline-block lg:mt-0 text-red-400 hover:text-white mr-4">
                Our Features
            </a>
            <a href="#FEEDBACK" className="block mt-4 lg:inline-block lg:mt-0 text-red-400 hover:text-white">
                Feedback
            </a>
            </div>
            <div>
            <a href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-600 border-white hover:border-transparent hover:text-white hover:bg-blue-400 mt-4 lg:mt-0 mx-2 bg-white">Sign in</a>
            </div>
            <div>
            <a href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-600 border-white hover:border-transparent hover:text-white hover:bg-red-400 mt-4 lg:mt-0 mx-2 bg-white">Sign up now</a>
            </div>
        </div>
    </nav>
    )
}

export default Navbar
