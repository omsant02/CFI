import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { useZxing } from 'react-zxing';

interface UPIData {
  pa?: string;    // payee address
  pn?: string;    // payee name
  am?: string;    // amount
  tn?: string;    // transaction note
  tr?: string;    // transaction reference
  cu?: string;    // currency code
}

const QRScanner: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseUPIString = (text: string): UPIData | null => {
    try {
      if (!text.toLowerCase().startsWith('upi://')) {
        setError('Not a valid UPI QR code');
        return null;
      }

      const url = new URL(text);
      const params = new URLSearchParams(url.search);
      
      const data: UPIData = {
        pa: params.get('pa') || undefined,
        pn: params.get('pn') || undefined,
        am: params.get('am') || undefined,
        tn: params.get('tn') || undefined,
        tr: params.get('tr') || undefined,
        cu: params.get('cu') || 'INR'
      };

      if (!data.pa) {
        setError('Invalid UPI QR: Missing payee address');
        return null;
      }

      return data;
    } catch (err) {
      setError('Invalid QR code format');
      return null;
    }
  };

  const { ref } = useZxing({
    paused: !isScanning,
    onResult(result) {
      const text = result.getText();
      console.log("QR Code detected:", text);
      
      const upiData = parseUPIString(text);
      if (upiData) {
        setIsScanning(false);
        setError(null);
        navigate('/payment-confirm', { 
          state: { 
            upiData,
            rawText: text
          } 
        });
      }
    },
    onError(error) {
      console.warn("QR Scan error:", error);
      setError('Failed to scan QR code');
    },
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed inset-0 flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center bg-gray-900/80 backdrop-blur-sm z-10">
          <button 
            onClick={() => {
              setIsScanning(false);
              navigate('/user');
            }}
            className="text-white hover:text-gray-300"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-white ml-4">
            Scan QR Code
          </h1>
        </div>

        {/* Scanner */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md relative">
            <div className="aspect-square w-full relative rounded-2xl overflow-hidden bg-black">
              <video 
                ref={ref}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {isScanning && (
                <>
                  <div className="absolute inset-0 border-2 border-white/30 rounded-2xl">
                    <div className="absolute inset-12 border-2 border-white/50 rounded-xl"></div>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-purple-500/50 animate-scan"></div>
                </>
              )}
              
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-16 w-16 text-gray-600" />
                </div>
              )}
            </div>
            
            <div className="mt-6 space-y-4 px-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
              
              <button
                onClick={() => setIsScanning(!isScanning)}
                className="w-full bg-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200 text-lg"
              >
                {isScanning ? 'Stop Scanning' : 'Start Scanning'}
              </button>
              
              <p className="text-gray-400 text-center">
                {isScanning 
                  ? 'Position the UPI QR code within the frame to scan' 
                  : 'Click to start scanning UPI QR code'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;