import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyInspections } from '../slices/inspectionSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, startOfWeek, startOfMonth, endOfWeek, endOfMonth, format } from 'date-fns';
import useErrorNotifier from '../hooks/useErrorNotifier';

const columns: GridColDef[] = [
    { field: 'serial_no', headerName: 'Serial No', width: 150, 'headerAlign': 'center', align: 'center' },
    { field: 'client', headerName: 'Client', flex: 1, 'headerAlign': 'center', align: 'center' },
    {
        field: 'date', headerName: 'Date', width: 150, 'headerAlign': 'center', align: 'center',
        renderCell: (params) => {
            return (
                <p className='text-center'>
                    {format(new Date(params.value), 'dd/MM/yyyy')}
                </p>
            )
        }
    },
    { field: 'model', headerName: 'Model', flex: 1, 'headerAlign': 'center', align: 'center' },
    {
        field: 'status', headerName: 'Status', width: 150, 'headerAlign': 'center', align: 'center', renderCell: (params) => {
            return (
                <p className={`text-${params.value === 'fail' ? 'red' : 'green'}-500 p-1 rounded-md`}>
                    {params.value.toUpperCase()}
                </p>
            )
        }
    },
];

const MyInspections: React.FC = () => {
    const dispatch = useDispatch();
    const { inspections, inspectionsLoading } = useSelector((state) => state.inspection);
    const [searchField, setSearchField] = useState('serial_no');
    const [searchValue, setSearchValue] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useErrorNotifier({ stateName: 'inspection' });

    const handleSearchFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchField(event.target.value);
    };

    const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleDateFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setDateFilter(value);

        const today = new Date();
        if (value === 'today') {
            setStartDate(today);
            setEndDate(today);
        } else if (value === 'this_week') {
            setStartDate(startOfWeek(today));
            setEndDate(endOfWeek(today));
        } else if (value === 'this_month') {
            setStartDate(startOfMonth(today));
            setEndDate(endOfMonth(today));
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    React.useEffect(() => {
        const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : null;
        const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') + 'T23:59:59' : null;
        dispatch(getMyInspections({ key: searchField, value: searchValue, startDate: formattedStartDate, endDate: formattedEndDate }));
    }, [dispatch, searchField, searchValue, startDate, endDate]);

    return (
        <div className='container mx-auto p-4 w-3/4'>
            <div className='flex justify-between items-center mb-4 gap-5 p-2'>
                <input
                    type='text'
                    value={searchValue}
                    onChange={handleSearchValueChange}
                    placeholder={`Search by ${searchField.replace('_', ' ')}`}
                    className='p-2 rounded-md flex-1 bg-gray-800 text-white ml-2'
                />
                <select
                    value={searchField}
                    onChange={handleSearchFieldChange}
                    className='p-2 rounded-md bg-gray-800 text-white'
                >
                    <option value='serial_no'>Serial No</option>
                    <option value='client'>Client</option>
                </select>
            </div>

            <div className='flex gap-2 justify-around items-center px-4'>
                <select
                    value={dateFilter}
                    onChange={handleDateFilterChange}
                    className='p-2 rounded-md bg-gray-800 text-white'
                >
                    <option value='all'  >All</option>
                    <option value='today'>Today</option>
                    <option value='this_week'>This Week</option>
                    <option value='this_month'>This Month</option>
                    <option value='custom'>Custom</option>
                </select>
                {
                    dateFilter === 'custom' && (
                        <>
                            <div className="flex gap-2 items-center">
                                <label htmlFor='startDate' className='text-white'>Start Date</label>
                                <DatePicker
                                    name="startDate"
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    className='p-2 rounded-md bg-gray-800 text-white'
                                    placeholderText='Start Date'
                                    dateFormat='dd/MM/yyyy'
                                />
                            </div>
                            <div className="flex gap-2 items-center">
                                <label htmlFor='endDate' className='text-white'>End Date</label>
                                <DatePicker
                                    name="endDate"
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    className='p-2 rounded-md bg-gray-800 text-white'
                                    placeholderText='End Date'
                                    dateFormat='dd/MM/yyyy'
                                />
                            </div>
                        </>
                    )
                }
            </div>

            <div className='bg-gray-900 p-4 rounded-md'>
                <DataGrid
                    getRowId={(row) => row._id}
                    loading={inspectionsLoading}
                    rows={inspections}
                    columns={columns}
                    className='w-full text-white'
                    sx={{
                        '& .MuiDataGrid-cell': {
                            color: 'white',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#1F2937',
                            color: 'black',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#1F2937',
                            color: 'white',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default MyInspections;