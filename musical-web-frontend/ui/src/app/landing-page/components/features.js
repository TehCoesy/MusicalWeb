import React from 'react'

const Features = () => {
    return (
        <div id="OUR_FEATURES" className="py-20 bg-gray-200 px-12">
                <h2 className="font-bold text-5xl text-red-500 tracking-wider uppercase">Our features</h2>
            
                <div class="flex">
                    <div class="flex-1 text-gray-700 text-center bg-gray-100 border px-4 py-2 m-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <div><i className='icon ion-music-note text-purple-500 text-4xl'></i></div>
                        <label className="font-bold text-blue-500 text-2xl my-8">Generate music</label>
                        <p className="text-yellow-700 px-5 mt-2">Push your file and take your life! Piece of cake!!!</p>
                    </div>
                    <div class="flex-1 text-gray-700 text-center bg-gray-100 border px-4 py-2 m-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <div><i className='icon ion-play text-purple-500 text-4xl'></i></div>
                        <label className="font-bold text-blue-500 text-2xl my-8">Play</label>
                        <p className="text-yellow-700 px-5 mt-2">Listen your music, Listen your heart!</p>
                    </div>
                    <div class="flex-1 text-gray-700 text-center bg-gray-100 border px-4 py-2 m-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <div><i className='icon ion-checkmark-circled text-purple-500 text-4xl'></i></div>
                        <label className="font-bold text-blue-500 text-2xl my-8">Autosave your list</label>
                        <p className="text-yellow-700 px-5 mt-2">Keep your list whenever you back</p>
                    </div>
                </div>
            </div>
    )
}

export default Features