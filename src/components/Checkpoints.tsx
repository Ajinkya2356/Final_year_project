import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const Checkpoints: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'pass' | 'fail' | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);

    useEffect(() => {
        setTimeout(() => {
            setStatus('pass');
            setLoading(false);
        }, 2000);
    }, []);

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setCapturedImage(imageSrc || null);
    };

    const retry = () => {
        setCapturedImage(null);
    };

    return (
        <div className="p-4 text-center flex flex-col flex-1 border w-full">
            <div className="flex justify-between items-center mb-4">
                <h6 className="text-lg font-semibold">Digital Display Check</h6>
                <div className="flex items-center justify-between">
                    <img src="https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" alt="Multimeter" className="mr-2 h-10 w-10" />
                    <p className="text-base">ID: 12345</p>
                </div>
            </div>

            <div className="flex justify-center items-center h-72 border border-gray-300 mb-4">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div>
                ) : (
                    <h4 className={`text-4xl ${status === 'pass' ? 'text-green-500' : 'text-red-500'}`}>
                        {status === 'pass' ? 'Pass' : 'Fail'}
                    </h4>
                )}
            </div>

            <div className="flex flex-col items-center mb-4">
                {capturedImage ? (
                    <img src={capturedImage} alt="Captured" className="h-72 w-72 mb-4 border border-gray-300" />
                ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="h-72 w-72 mb-4 border border-gray-300"
                    />
                )}
                <div className="flex justify-between w-full mt-4">
                    <button
                        onClick={retry}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                    >
                        Retry
                    </button>
                    <button
                        onClick={capture}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    >
                        Capture
                    </button>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Previous</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Next</button>
            </div>
        </div>
    );
};

export default Checkpoints;