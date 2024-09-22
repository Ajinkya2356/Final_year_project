export const Stats = () => {
    const stats = {
        totalMeters: 100,
        correctMeters: 65,
        incorrectMeters: 10,
        avgTime: "5m 30s",
        metersChecked: 75,
        metersUnchecked: 25,
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
    );
};