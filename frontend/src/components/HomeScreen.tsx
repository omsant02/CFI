import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to CFI
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Crypto to Fiat Interface - Seamlessly pay in local currency using your crypto assets
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          {/* Foreigner Card */}
          <div 
            onClick={() => navigate('/user')}
            className="w-full md:w-1/2 bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3">I'm a Foreigner</h2>
              <p className="text-gray-400">
                Pay in local currency using your crypto assets
              </p>
            </div>
          </div>

          {/* Intent Solver Card */}
          <div 
            onClick={() => navigate('/solver')}
            className="w-full md:w-1/2 bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3">I'm an Intent Solver</h2>
              <p className="text-gray-400">
                Facilitate transactions and earn rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;