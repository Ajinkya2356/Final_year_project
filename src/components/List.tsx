import React, { useEffect, useState } from 'react';

interface Multimeter {
    id: number;
    image: string;
    title: string;
    description: string;
}

const multimeters: Multimeter[] = [
    {
        id: 1,
        image: 'https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png',
        title: 'Multimeter 1',
        description: 'Description for Multimeter 1',
    },
    {
        id: 2,
        image: 'https://rishabh.co.in/uploads/product/RISH_LM_1340_(1).png',
        title: 'Multimeter 2',
        description: 'Description for Multimeter 2',
    },
    // Add more multimeters as needed
];

const List: React.FC = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(multimeters);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filteredData = multimeters.filter((item) => {
            return item.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setData(filteredData);
    };
    useEffect(() => {
        setData(multimeters);
    }, [])
    return (
        <div className="flex flex-col gap-10 w-full p-10 flex-1">
            <div className="flex items-center gap-4 mb-6">
                <button className='bg-gray-900'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    className="flex-1 h-10 px-4 rounded-lg focus:outline-none bg-gray-800 text-white"
                />
            </div>
            <div className='flex flex-col gap-10'>
                {data.map((multimeter) => (
                    <div key={multimeter.id} className="flex flex-row bg-gray-800 p-6 justify-between rounded-lg">
                        <div className="flex flex-row flex-1 items-center gap-10">
                            <img src={multimeter.image} alt={multimeter.title} className="h-20 w-20 rounded-lg" />
                            <div className="p-2 text-left">
                                <h3 className="text-lg font-bold">{multimeter.title}</h3>
                                <p className="font-semibold text-sm">{multimeter.description}</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 justify-center items-center p-4 flex-1">
                            <button className="h-10 w-1/2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                                Analytics
                            </button>
                            <button className="h-10  w-1/2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                                Start
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;