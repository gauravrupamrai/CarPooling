import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    const handleRegisterCarClick = () => {
        navigate("/driver");
    };

    const handleBookCarClick = () => {
        navigate("/customer");
    };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-24">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Car Pooling web application developed by Group 5
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                RideTogether Inc.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Developed by Gaurav Sudarshan Rai(22222565), Ragul Kumar Kannan, Sanskriti Malhotra, Sourav Behera, and Yidan Zhang
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleBookCarClick}
            >
              Book a Car
            </button>
            <button
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={handleRegisterCarClick}
            >
              Register a car<span aria-hidden="true">→</span>
            </button>
            </div>
          </div>
        </div>
        </div>
    )
}

export default Home;