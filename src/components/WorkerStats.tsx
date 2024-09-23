import { useState } from "react";

export const Stats = () => {
    const stats = {
        totalMeters: 100,
        correctMeters: 65,
        incorrectMeters: 10,
        avgTime: "5m 30s",
        metersChecked: 75,
        metersUnchecked: 25,
    };
    const [meterType, setMeterType] = useState('');
    const [status, setStatus] = useState('');
    const [dateRange, setDateRange] = useState('');
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
                        <label htmlFor="status" className="text-white mb-2 text-lg">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="p-2 rounded-md bg-gray-900 text-white"
                        >
                            <option value="">Select Status</option>
                            <option value="checked">Checked</option>
                            <option value="unchecked">Unchecked</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="dateRange" className="text-white mb-2 text-lg">Date Range</label>
                        <select
                            id="dateRange"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="p-2 rounded-md bg-gray-900 text-white"
                        >
                            <option value="">Select Date Range</option>
                            <option value="lastWeek">Last Week</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="lastYear">Last Year</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Meters */}
                <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center">
                    <p className="text-white">Total Meters</p>
                    <h2 className="text-4xl font-semibold">{stats.totalMeters}</h2>
                </div>

                {/* Meters Checked */}
                <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center">
                    <p className="text-white">Meters Checked</p>
                    <h2 className="text-4xl font-semibold">{stats.metersChecked}</h2>
                </div>

                {/* Meters Unchecked */}
                <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center">
                    <p className="text-white">Meters Unchecked</p>
                    <h2 className="text-4xl font-semibold">{stats.metersUnchecked}</h2>
                </div>

                {/* Correct Meters */}
                <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center">
                    <p className="text-white">Correct Meters</p>
                    <h2 className="text-4xl font-semibold text-green-500">{stats.correctMeters}</h2>
                </div>

                {/* Incorrect Meters */}
                <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center">
                    <p className="text-white">Incorrect Meters</p>
                    <h2 className="text-4xl font-semibold text-red-500">{stats.incorrectMeters}</h2>
                </div>

                {/* Average Time */}
                <div className="bg-gray-800 p-6 shadow-lg rounded-md flex flex-col items-center justify-center">
                    <p className="text-white">Average Time</p>
                    <h2 className="text-4xl font-semibold">{stats.avgTime}</h2>
                </div>

            </div>
        </>
    );
};