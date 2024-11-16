import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import FinalStatus from './FinalStatus';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeters } from '../slices/inspectionSlice';

const Checkpoints: React.FC = () => {
    const dispatch = useDispatch();
    const { meters, loading } = useSelector((state) => state.inspection)
    const [activeStep, setActiveStep] = useState(0);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [serialNumber, setSerialNumber] = useState('');
    const webcamRef = useRef<Webcam>(null);
    const trueImageUrl = 'https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png';
    const navigate = useNavigate();
    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setCapturedImage(imageSrc || null);
        if (serialNumber.length < 0) {
            alert('Please enter the serial number');
        }
    };

    const retry = () => {
        setActiveStep(0);
        setCapturedImage(null);
        setSerialNumber('');
    };

    const handleNext = () => {
        setActiveStep(1);
    };

    const handleContinue = () => {
        setActiveStep(0);
        setCapturedImage(null);
        setSerialNumber('');
    };

    useEffect(() => {
        dispatch(getMeters());
    }, [dispatch])

    /* if (activeStep == 1) {
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
                onNext={() => navigate('/dashboard')}
            />
        );
    } */

    return (
        <div className="p-4 text-center flex flex-col flex-1 w-full">

            <div className='flex items-center justify-between w-full border'>
                <div className="flex gap-20 w-5/2 p-5 bg-gray-800 rounded-md justify-between border">
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
                        <h4 className="text-lg mb-2">Master Image</h4>
                        <img src={trueImageUrl} alt="True Image" className="h-96 w-96 mb-4 border border-gray-300 rounded-lg" />
                    </div>
                </div>
                <div className='flex flex-col gap-20 pt-3 pb-3 flex-1'>
                    <div className="flex flex-col gap-10 mx-5 ">
                        <div className='flex flex-col bg-gray-800 p-2 rounded-md gap-2'>
                            <label htmlFor="serialNumber" className="text-white text-lg">Serial Number</label>
                            <input
                                id="serialNumber"
                                type="text"
                                value={serialNumber}
                                onChange={(e) => setSerialNumber(e.target.value)}
                                className="p-2 rounded-md text-white"
                                placeholder="Enter Serial Number"
                                required
                            />
                            <label htmlFor="meterType" className="text-white text-lg">Meter</label>
                            <select
                                id="meterType"
                                className="p-2 rounded-md text-white "
                                onChange={(e) => console.log(e.target.value)}
                                disabled={loading}
                            >
                                <option value="" disabled selected>Select Meter Type</option>
                                {
                                    meters.map((meter) => {
                                        return (<option key={meter.id} value={meter.id}>{meter.model}</option>)
                                    })
                                }
                            </select>
                            <label htmlFor="client" className="text-white  text-lg">Client</label>
                            <input
                                id="client"
                                type="text"
                                value={""}
                                onChange={(e) => console.log(e.target.value)}
                                className="p-2 rounded-md text-white"
                                placeholder="Enter Client Name"
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
    );
};

export default Checkpoints;