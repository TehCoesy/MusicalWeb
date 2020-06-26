import React from 'react';
import './landing-page.css';
import Navbar from './components/navbar';
import Features from './components/features';
import Feedback from './components/feedback';


const LandingPage = () => {

    return (
        <div>
            <div className="bg-local w-full h-screen">
                <div className='relative w-full h-full z-10 bg-gray-100 bg-opacity-25'>
                    <Navbar />

                    <div className="w-full rounded mt-64">
                        <div className="text-large green-text font-bold">Sign up for free</div>
                        <div className="text-3xl green-text font-bold text-green-500 pt-4">Enjoy endless ad-free music. Customize your music.</div>
                        <a href="/login">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4">
                            TRY IT NOW <i className="ion-radio-waves"></i>
                            </button>
                        </a>
                        
                    </div>
                </div>
                
            </div>   

            <Features />
            
            <Feedback />
                
        </div>
            
        
    )
}

export default LandingPage
