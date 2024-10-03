import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import FinalStatus from './FinalStatus';
import { useNavigate } from 'react-router-dom';

const Checkpoints: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'pass' | 'fail' | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const trueImageUrl = 'https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png';
    const steps = ['S1', 'S2', 'S3', 'S4', 'S5'];
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
        startLoadingTimer();
    }, [activeStep]);

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setCapturedImage(imageSrc || null);
    };

    const retry = () => {
        setCapturedImage(null);
        startLoadingTimer();
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    if (activeStep == steps.length - 1) {
        return (
            <FinalStatus
                meterDetails="ID: 12345"
                meterImage={trueImageUrl}
                screenStatuses={steps.map((step, index) => ({ name: step, status: index < activeStep ? 'pass' : 'fail' }))}
                accuracy={Math.floor(Math.random() * 100)}
                onRetry={() => setActiveStep(0)}
                onNext={() => navigate('/list')}
            />
        );
    }

    return (
        <div className="p-4 text-center flex flex-col flex-1 w-full">
            <div className='flex justify-between items-center mb-5'>

                <div className='flex justify-center flex-1'>
                    <ol className="flex items-center w-full ">
                        {steps.map((label, index) => (
                            <li key={label} className={`flex w-full items-center ${index < steps.length - 1 ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-4' : ''} ${index <= activeStep ? 'text-blue-600 after:border-blue-100 dark:after:border-blue-800' : 'text-gray-500 after:border-gray-100 dark:after:border-gray-700'}`}>

                                <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-10 lg:w-10 ${index <= activeStep ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'} shrink-0`}>
                                    {index < activeStep ? (
                                        <svg className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                        </svg>
                                    ) : (
                                        <span className={`text-lg ${index === activeStep ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`}>{
                                            label}</span>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="flex justify-end p-4">
                    <div className="flex items-center justify-between">
                        <img src="https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png" alt="Multimeter" className="mr-2 h-10 w-10" />
                        <p className="text-base">ID: 12345</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-4">
                <>
                    <div className='flex items-center justify-between flex-1'>
                        <div className="flex gap-20 w-full p-5 flex-1 bg-gray-800 rounded-md
                            justify-between ">
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
                                    <div className="flex flex-col items-center">
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
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-10 mx-5 ">
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
                                        onClick={handleBack}
                                        disabled={activeStep === 0 || loading}
                                        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : ''} h-1/2 w-1/2`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={loading}
                                        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 h-1/2 w-1/2`}
                                    >
                                        {
                                            activeStep == steps.length - 1 ? "Finish" : "Next"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export default Checkpoints;