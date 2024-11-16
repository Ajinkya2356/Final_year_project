import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import FinalStatus from './FinalStatus';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkMeter, createInspection, getMeters, resetInspectionStatus } from '../slices/inspectionSlice';

enum InspectionStatus {
    pass = 'pass',
    fail = 'fail'
}
interface inspection {
    serial_no: string;
    status: InspectionStatus | string;
    meter_id: string;
    client: string;
}

const Checkpoints: React.FC = () => {
    const dispatch = useDispatch();
    const { meters, loading, checkLoading, inspectionStatus } = useSelector((state) => state.inspection)
    const [activeStep, setActiveStep] = useState(0);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [retryPressed, setRetryPressed] = useState<boolean>(false);
    const [submitPressed, setSubmitPressed] = useState<boolean>(false);
    const [inspectionForm, setInspectionForm] = useState<inspection>({
        serial_no: '',
        status: '',
        meter_id: '',
        client: ''
    })
    const webcamRef = useRef<Webcam>(null);
    const [masterImage, setMasterImage] = useState('')
    const navigate = useNavigate();
    const convertUrlToFile = (imageSrc) => {
        const byteString = atob(imageSrc.split(',')[1]);
        const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // Create a File from the Blob
        const file = new File([blob], 'captured_image.jpg', { type: mimeString });
        return file;
    }
    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();

        if (imageSrc && masterImage) {
            const file1 = convertUrlToFile(imageSrc);
            const file2 = convertUrlToFile(masterImage);
            dispatch(checkMeter({ "image": file1, "master": file2 }))
        }
        setCapturedImage(imageSrc)
        setRetryPressed(false);
    };

    const retry = () => {
        setCapturedImage(null);
        setRetryPressed(true);
        setInspectionForm({
            serial_no: '',
            status: '',
            meter_id: '',
            client: ''
        });
        setMasterImage('')
        dispatch(resetInspectionStatus())
    };

    const handleNext = () => {
        setCapturedImage(null);
        dispatch(createInspection(inspectionForm))
        setSubmitPressed(true)
        setInspectionForm({
            serial_no: '',
            status: '',
            meter_id: '',
            client: ''
        });
        setMasterImage('')
        dispatch(resetInspectionStatus())
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name == "meter_id") {
            const selectedMeter = meters.find((meter: any) => meter.id === value);
            if (selectedMeter) { setMasterImage(selectedMeter.image) }
        }
        setInspectionForm({
            ...inspectionForm,
            [name]: value,
        });
    };

    useEffect(() => {
        dispatch(getMeters());
    }, [dispatch])

    useEffect(() => {
        if (inspectionStatus) {
            setInspectionForm((prevForm) => ({
                ...prevForm,
                status: inspectionStatus == 'Pass' ? InspectionStatus.pass : InspectionStatus.fail,
            }));
        }
    }, [inspectionStatus]);
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
        <div className="p-4 text-center flex flex-col flex-1 w-full mt-20">

            <div className='flex items-center justify-between w-full '>
                <div className="flex gap-20 w-5/2 p-5 bg-gray-800 rounded-md justify-between ">
                    <div className="flex flex-col items-center w-1/2">
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
                    <div className="flex flex-col items-center w-1/2">
                        <h4 className="text-lg mb-2">Master Image</h4>
                        <img src={masterImage} alt="Master Image" className="h-96 w-96 mb-4 border border-gray-300 rounded-lg" />
                    </div>
                </div>
                <div className='flex flex-col gap-20 pt-3 pb-3 flex-1'>
                    <div className="flex flex-col gap-10 mx-5 ">
                        <div className='flex flex-col bg-gray-800 p-2 rounded-md gap-2'>
                            {inspectionStatus ? (
                                <div className={`flex justify-center rounded-md ${inspectionStatus === 'Pass' ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}>
                                    <p className={`text-semibold text-xl`}>{inspectionStatus.toUpperCase()}</p>
                                </div>
                            ) : checkLoading ? (<p>Loading...</p>) : null
                            }
                            <label htmlFor="serialNumber" className="flex justify-start text-white text-md">Serial Number</label>
                            <input
                                id="serialNumber"
                                type="text"
                                name="serial_no"
                                value={inspectionForm.serial_no}
                                onChange={handleInputChange}
                                className="p-2 rounded-md text-white"
                                placeholder="Enter Serial Number"
                                required
                            />
                            <label htmlFor="meterType" className="flex justify-start text-white text-md">Meter</label>
                            <select
                                id="meterType"
                                name="meter_id"
                                className="p-2 rounded-md text-white "
                                onChange={handleInputChange}
                                disabled={loading}
                                value={inspectionForm.meter_id}
                            >
                                <option value="" disabled selected>Select Meter Type</option>
                                {
                                    meters.map((meter) => {
                                        return (<option key={meter.id} value={meter.id}>{meter.model}</option>)
                                    })
                                }
                            </select>
                            <label htmlFor="client" className="flex justify-start text-white  text-md">Client</label>
                            <input
                                id="client"
                                type="text"
                                name="client"
                                value={inspectionForm.client}
                                onChange={handleInputChange}
                                className="p-2 rounded-md text-white"
                                placeholder="Enter Client Name"
                                required
                            />

                        </div>
                        <div className='flex gap-10 justify-between'>
                            <button
                                onClick={retry}
                                disabled={!capturedImage}
                                className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 h-1/2 w-1/2 ${!capturedImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Retry
                            </button>
                            <button
                                disabled={masterImage === ''}
                                onClick={capture}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 h-1/2 w-1/2"
                            >
                                Capture
                            </button>
                        </div>
                        <div className='flex justify-between'>
                            <button
                                onClick={handleNext}
                                disabled={retryPressed || !capturedImage || !inspectionStatus}
                                className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full ${retryPressed || !capturedImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Submit
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Checkpoints;