import React from 'react';

const Feedback = () => {
    return (
    <div id="FEEDBACK" className="bg-gray-700 text-center">
        <h2 className="py-10 font-bold tracking-normal text-3xl">Give us your feedback</h2>
        <form className="w-1/2 border border-yellow-600 shadow rounded p-6 m-auto">
            <div className="flex flex-wrap -mx-3 mb-2 justify-center">
                <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label className="block uppercase tracking-wide text-yellow-500 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Quang Ha" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-yellow-500 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Phone Number
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="+8412 345 678" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 pb-2">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-yellow-500 text-xs font-bold mb-2" htmlFor="grid-password">
                    Your Feedback
                </label>
                <textarea rows="7" className="border-red-500 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Some advices for us..." />
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                <p className="text-gray-600 text-xs italic">Help us improve and make more awesome update. Thank you.</p>
                </div>
            </div>

            <button type="submit" class="w-full bg-gray-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Submit
            </button>
            
            </form>

            <div className="pt-4">© UET-MusicalWeb Team 2020</div>
    </div>
    )
}

export default Feedback;