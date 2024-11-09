import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getAnalytics } from "../slices/inspectionSlice";
import { RootState } from "../store";

const WorkerStats: React.FC = () => {
    const dispatch = useDispatch();
    const [meterType, setMeterType] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const { analytics, analyticsLoading, error } = useSelector((state: RootState) => state.inspection);

    useEffect(() => {
        if (startDate && endDate) {
            dispatch(getAnalytics({ meterType, startDate, endDate }));
        }
    }, [dispatch, meterType, startDate, endDate]);

    return (
        <>
            <div className="">
                <div className="flex flex-col sm:flex-row gap-10 p-6 justify-between items-center bg-gray-800 mb-5 rounded">
                    <div className="flex flex-col">
                        <label htmlFor="meterType" className="text-white mb-2 text-lg">Meter Type</label>
                        <select
                            id="meterType"
                            value={meterType}
                            onChange={(e) => setMeterType(e.target.value)}
                            className="p-2 rounded-md bg-gray-900 text-white"
                        >
                            <option value="">Select Meter Type</option>
                            <option value="type1">Type 1</option>
                            <option value="type2">Type 2</option>
                            <option value="type3">Type 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-white mb-2 text-lg">Start Date</label>
                        <DatePicker
                            id="startDate"
                            selected={startDate}
                            onChange={(date: Date | null) => setStartDate(date)}
                            className="p-2 rounded-md bg-gray-900 text-white text-center placeholder-center"
                            placeholderText="Select Start Date"
                            dateFormat={"dd/MM/yyyy"}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-white mb-2 text-lg">End Date</label>
                        <DatePicker
                            id="endDate"
                            selected={endDate}
                            onChange={(date: Date | null) => setEndDate(date)}
                            className="p-2 rounded-md bg-gray-900 text-white text-center placeholder-center"
                            placeholderText="Select End Date"
                            dateFormat={"dd/MM/yyyy"}
                        />
                    </div>
                </div>
            </div>
            {error ? (
                <div className="text-red-500 text-center">Error: {error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Total Meters */}
                    <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center cursor-pointer">
                        <p className="text-white">Total Meters</p>
                        <h2 className="text-4xl font-semibold">{analyticsLoading ? 'Loading...' : analytics?.total ?? 0}</h2>
                    </div>

                    {/* Correct Meters */}
                    <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center cursor-pointer">
                        <p className="text-white">Correct Meters</p>
                        <h2 className="text-4xl font-semibold text-green-500">{analyticsLoading ? 'Loading...' : analytics?.correct ?? 0}</h2>
                    </div>

                    {/* Incorrect Meters */}
                    <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center cursor-pointer">
                        <p className="text-white">Incorrect Meters</p>
                        <h2 className="text-4xl font-semibold text-red-500">{analyticsLoading ? 'Loading...' : analytics?.incorrect ?? 0}</h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default WorkerStats;