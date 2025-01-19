import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import AmountInput from './AmountInput';
import { QrCode } from 'lucide-react';

const QRScanner: React.FC = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [showAmountInput, setShowAmountInput] = useState(false);

  const handleScan = (result: any) => {
    if (result) {
      setQrData(result?.text);
      setShowAmountInput(true);
    }
  };

  const handleSubmit = (amount: number) => {
    console.log('QR Data:', qrData);
    console.log('Amount:', amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!showAmountInput ? (
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <QrCode className="w-6 h-6 text-indigo-400" />
              <h1 className="text-2xl font-bold text-white">Scan UPI QR Code</h1>
            </div>
            <div className="relative">
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-indigo-400 rounded-lg animate-pulse" />
                </div>
              </div>
              <QrReader
                onResult={handleScan}
                constraints={{ facingMode: 'environment' }}
                className="rounded-lg overflow-hidden"
                containerStyle={{ borderRadius: '0.5rem' }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-300 text-sm">
                Position the QR code within the frame to scan
              </p>
            </div>
          </div>
        ) : (
          <AmountInput onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default QRScanner;