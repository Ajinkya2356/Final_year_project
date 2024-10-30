import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import FinalStatus from './FinalStatus';
import { useNavigate } from 'react-router-dom';

const Checkpoints: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'pass' | 'fail' | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [serialNumber, setSerialNumber] = useState('');
    const webcamRef = useRef<Webcam>(null);
    const trueImageUrl = 'https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png';
    const navigate = useNavigate();
    const startLoadingTimer = () => {
        setLoading(true);
        setStatus(null);
        const timer = setTimeout(() => {
            const isPass = Math.random() > 0.5;
            setStatus(isPass ? 'pass' : 'fail');
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    };

    useEffect(() => {

    }, [activeStep, serialNumber, status]);

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setCapturedImage(imageSrc || null);
        if (serialNumber.length > 0) {
            startLoadingTimer();
        }
        else {
            alert('Please enter the serial number');
        }
    };

    const retry = () => {
        setActiveStep(0);
        setCapturedImage(null);
        setSerialNumber('');
        setStatus(null);
    };

    const handleNext = () => {
        setActiveStep(1);
    };

    const handleContinue = () => {
        setActiveStep(0);
        setCapturedImage(null);
        setSerialNumber('');
        setStatus(null);
    };


    if (activeStep == 1) {
        return (
            <FinalStatus
                meterDetails={`ID: ${serialNumber}`}
                meterImage={trueImageUrl}
                screenStatuses={[
                    {
                        name: "1",
                        status: "pass"
                    }
                ]}
                accuracy={Math.floor(Math.random() * 100)}
                onRetry={() => setActiveStep(0)}
                onNext={() => navigate('/list')}
            />
        );
    }

    return (
        <div className="p-4 text-center flex flex-col flex-1 w-full">
            <div className='flex justify-end items-center mb-5'>
                <div className="flex justify-end p-4">
                    <div className="flex items-center justify-between">
                        <img src="https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" alt="Multimeter" className="mr-2 h-10 w-10" />
                        <p className="text-base">ID: 12345</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-4">
                <div className='flex items-center justify-between flex-1'>
                    <div className="flex gap-20 w-full p-5 flex-1 bg-gray-800 rounded-md justify-between">
                        <div className="flex flex-col items-center">
                            <h4 className="text-lg mb-2">Preview Screen</h4>
                            {
                                capturedImage ? (
                                    <img src={capturedImage} alt="Captured Image" className="h-96 w-96 mb-4 border border-gray-300 rounded-lg" />
                                ) : (
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        className="h-96 w-96 mb-4 border border-gray-300 rounded-lg"
                                    />
                                )
                            }
                        </div>
                        <div className="flex flex-col items-center">
                            <h4 className="text-lg mb-2">True Image</h4>
                            <img src={trueImageUrl} alt="True Image" className="h-96 w-96 mb-4 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-20 pt-3 pb-3'>
                        <div className='flex flex-col gap-10 mx-5'>
                            {loading ? (
                                <div className="flex items-center justify-center p-5">
                                    <svg className="animate-spin h-20 w-20 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                </div>
                            ) : (

                                status &&
                                (<div className="flex flex-col items-center">
                                    {status === 'pass' ? (
                                        <div className="flex flex-col items-center">
                                            <svg className="h-20 w-20 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <p className="text-green-500 text-2xl mt-2">Pass</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <svg className="h-20 w-20 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <p className="text-red-500 text-2xl mt-2">Fail</p>
                                        </div>
                                    )}
                                </div>)
                            )}
                        </div>
                        <div className="flex flex-col gap-10 mx-5">
                            <div className='flex flex-col'>
                                <label htmlFor="serialNumber" className="text-white mb-2 text-lg">Serial Number</label>
                                <input
                                    id="serialNumber"
                                    type="text"
                                    value={serialNumber}
                                    onChange={(e) => setSerialNumber(e.target.value)}
                                    className="p-2 rounded-md bg-gray-900 text-white"
                                    placeholder="Enter Serial Number"
                                    required
                                />
                            </div>
                            <div className='flex gap-10 justify-between'>
                                <button
                                    onClick={retry}
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 h-1/2 w-1/2"
                                >
                                    Retry
                                </button>
                                <button
                                    onClick={capture}
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 h-1/2 w-1/2"
                                >
                                    Capture
                                </button>
                            </div>
                            <div className='flex gap-10 justify-between'>
                                <button
                                    onClick={handleContinue}
                                    disabled={loading}
                                    className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full`}
                                >
                                    Continue
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={loading}
                                    className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full`}
                                >
                                    Finish
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkpoints;