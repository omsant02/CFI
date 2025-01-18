import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, IndianRupee } from 'lucide-react';

const PaymentConfirm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { upiData, rawText } = location.state || {};
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const handleSubmit = () => {
    const paymentData = {
      upiData,
      rawText,
      amount: parseFloat(amount),
      note
    };
    console.log('Payment Data:', paymentData);
    // Backend integration will go here
  };

  if (!upiData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <p>No payment data available.</p>
        <button 
          onClick={() => navigate('/scan-qr')}
          className="mt-4 text-blue-400 hover:text-blue-300"
        >
          Go back to scanner
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed inset-0 flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-800">
          <button 
            onClick={() => navigate('/scan-qr')}
            className="text-white hover:text-gray-300"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white ml-4">
            Pay to merchant
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-md mx-auto p-4 space-y-6">
            {/* Merchant Info */}
            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{upiData.pn?.[0] || 'M'}</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{upiData.pn || 'Merchant'}</h2>
              <p className="text-gray-400 text-sm">{upiData.pa}</p>
            </div>

            {/* Amount Input */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center bg-gray-800 rounded-lg px-4 py-2">
                <span className="text-gray-400 text-lg mr-2">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-transparent text-white text-2xl font-semibold w-32 focus:outline-none text-center"
                />
              </div>
              {!amount && <p className="text-red-400 text-sm">* Please enter amount</p>}
            </div>

            {/* Payment Note */}
            <div className="bg-gray-800/50 rounded-xl p-4">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note"
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Currency Info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center">
                <IndianRupee className="h-5 w-5 text-blue-400 mr-2" />
                <p className="text-blue-400">Payment will be made in Indian Rupees (INR)</p>
              </div>
            </div>

            {/* Available Balance */}
            <div className="text-center">
              <p className="text-gray-400">Available Starknet Balance: XXX STRK</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pb-6">
              <button 
                onClick={handleSubmit}
                disabled={!amount}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors duration-200 ${
                  amount 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Pay ₹{amount || '0'}
              </button>
              <button 
                onClick={() => navigate('/scan-qr')}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirm;