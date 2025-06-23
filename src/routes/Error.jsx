import React from 'react'
import { Link } from "react-router-dom";
import CTAButton from '../ui/CTAButton';

export const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-black">404</h1>
            <p className="text-lg text-gray-600 mt-2">Oops! Page not found!</p>
            <p className="text-sm text-gray-500 mb-5">
                The page you requested was not found.
            </p>
            <Link to="/">
                <CTAButton 
                text='Back to home'
                className="py-2 px-4 text-white bg-black rounded-[10px]"
                />
            </Link>
            `</div>
    )
}
