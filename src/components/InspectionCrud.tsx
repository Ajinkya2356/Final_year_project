import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInspection, getInspections } from '../slices/adminSlice';
import DeleteIcon from '@mui/icons-material/Delete';
const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-cell': {
                        color: 'white',
                        backgroundColor: '#1F2937',
                        borderColor: "white",
                        borderWidth: 0.5,
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#111828',
                        color: 'black',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#1F2937',
                        color: 'white',
                    },
                },
            },
        },
    },
});

interface InspectionCrudProps {
    tab: string;
}

const InspectionCrud: React.FC<InspectionCrudProps> = ({ tab }) => {
    const dispatch = useDispatch();
    const { loading, inspections, meta } = useSelector((state: any) => state.admin);
    const [activeTab, setActiveTab] = useState<string>(tab);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });
    const [filterType, setFilterType] = useState<string>('serial_no');
    const [dateFilter, setDateFilter] = useState<string>('all');
    const [resultFilter, setResultFilter] = useState<string>('all');
    const [customDateRange, setCustomDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' });
    const [searchSerialNo, setSearchSerialNo] = useState<string>('');
    const [searchClient, setSearchClient] = useState<string>('');

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(e.target.value);
    };

    const handleDateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDateFilter(e.target.value);
    };

    const handleResultFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setResultFilter(e.target.value);
    };

    useEffect(() => {
        let startDate: string | null = null;
        let endDate: string | null = null;
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        switch (dateFilter) {
            case 'today':
                startDate = new Date().toISOString().split('T')[0];
                endDate = new Date().toISOString().split('T')[0] + 'T23:59:59';
                break;
            case 'this_week':
                startDate = startOfWeek.toISOString().split('T')[0];
                endDate = new Date().toISOString().split('T')[0] + 'T23:59:59';
                break;
            case 'this_month':
                startDate = startOfMonth.toISOString().split('T')[0];
                endDate = new Date().toISOString().split('T')[0] + 'T23:59:59';
                break;
            case 'custom':
                if (!customDateRange.start || !customDateRange.end) {
                    console.log('Both start date and end date must be provided for custom date range.');
                    return;
                }
                startDate = customDateRange.start;
                endDate = customDateRange.end;
                break;
            default:
                startDate = null;
                endDate = null;
        }
        dispatch(getInspections({ startDate, endDate, serial_no: searchSerialNo, client: searchClient, result: resultFilter }));
    }, [dispatch, dateFilter, customDateRange, searchSerialNo, searchClient, resultFilter]);

    const handleDeleteInspection = (_id: string) => {
        setIsDeleteConfirmOpen(true);
        setSelectedRow(_id);
    };

    const confirmDelete = () => {
        dispatch(deleteInspection(selectedRow));
        setPaginationModel({
            page: 0,
            pageSize: 10,
        });
        setIsDeleteConfirmOpen(false);
        setSelectedRow(null);
    };

    const cancelDelete = () => {
        setIsDeleteConfirmOpen(false);
        setSelectedRow(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'serial_no') {
            setSearchSerialNo(value);
        } else if (name === 'client') {
            setSearchClient(value);
        } else if (name === 'start') {
            setCustomDateRange((prev) => ({ ...prev, start: value }));
        } else if (name === 'end') {
            setCustomDateRange((prev) => ({ ...prev, end: value }));
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'serial_no',
            headerName: 'Serial No',
            headerAlign: 'center',
            resizable: false,
            align: 'center',
        },
        { field: 'client', headerName: 'Client', flex: 1, resizable: false, headerAlign: 'center', align: 'center', },
        {
            field: 'date', headerName: 'Date', flex: 1, resizable: false, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <div className="flex justify-center">
                    <span>{new Date(params.row.date).toLocaleDateString('en-GB')}</span>
                </div>
            ),
        },
        {
            field: 'time', headerName: 'Time', flex: 1, resizable: false, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <div className="flex justify-center">
                    <span>{
                        new Date(params.row.date).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })
                    }</span>
                </div>
            ),
        },
        { field: 'meter_id', headerName: 'Meter ID', flex: 1, resizable: false, headerAlign: 'center', align: 'center' },
        { field: 'worker_id', headerName: 'Worker ID', flex: 1, resizable: false, headerAlign: 'center', align: 'center', },
        {
            field: 'status',
            headerName: 'Result',
            flex: 1,
            resizable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="flex justify-center">
                    <span className={`px-2 py-1 ${params.row.status === 'pass' ? 'text-green-500' : 'text-red-500'}`}>
                        {params.row.status.charAt(0).toUpperCase() + params.row.status.slice(1)}
                    </span>
                </div>
            ),
        },
        {
            field: '',
            headerName: '',
            flex: 1,
            resizable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <DeleteIcon onClick={() => {
                    handleDeleteInspection(params.row._id);
                }} color='error' className='cursor-pointer' />
            )
        }
    ];

    return (
        <div className="container">
            <h1 className="text-2xl font-bold text-center mb-6">Inspection Management</h1>

            {activeTab === 'get' && (
                <div className="tab-content">
                    <div className="flex flex-row justify-around mb-4 gap-5">
                        <select
                            className="border border-gray-300 rounded p-2 mb-2 w-full bg-gray-900 text-white"
                            value={filterType}
                            onChange={handleFilterChange}
                        >
                            <option value="serial_no">Serial No</option>
                            <option value="client">Client</option>
                            <option value="date">Date</option>
                            <option value="result">Result</option>
                        </select>

                        {filterType === 'date' && (
                            <select
                                className="border border-gray-300 rounded p-2 mb-2 w-full bg-gray-900 text-white"
                                value={dateFilter}
                                onChange={handleDateFilterChange}
                            >
                                <option value="all">All</option>
                                <option value="today">Today</option>
                                <option value="this_week">This Week</option>
                                <option value="this_month">This Month</option>
                                <option value="custom">Custom Date Range</option>
                            </select>
                        )}

                        {filterType === 'result' && (
                            <select
                                className="border border-gray-300 rounded p-2 mb-2 w-full bg-gray-900 text-white"
                                value={resultFilter}
                                onChange={handleResultFilterChange}
                            >
                                <option value="all">All</option>
                                <option value="pass">Pass</option>
                                <option value="fail">Fail</option>
                            </select>
                        )}
                        {(filterType === 'serial_no' || filterType === 'client') && (
                            <input
                                className="border border-gray-300 rounded p-2 mb-2 w-full"
                                style={{ backgroundColor: '#1F2937', color: 'white' }}
                                name={filterType}
                                placeholder={`Filter by ${filterType === 'serial_no' ? 'Serial No' : 'Client'}`}
                                value={filterType === 'serial_no' ? searchSerialNo : searchClient}
                                onChange={handleInputChange}
                            />
                        )}
                        {filterType === 'date' && dateFilter === 'custom' && (
                            <div className="flex flex-row gap-2">
                                <input
                                    className="border border-gray-300 rounded p-2 mb-2 w-full"
                                    style={{ backgroundColor: '#1F2937', color: 'white' }}
                                    type="date"
                                    name="start"
                                    value={customDateRange.start}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="border border-gray-300 rounded p-2 mb-2 w-full"
                                    style={{ backgroundColor: '#1F2937', color: 'white' }}
                                    type="date"
                                    name="end"
                                    value={customDateRange.end}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                    </div>
                    <ThemeProvider theme={theme}>
                        <DataGrid
                            loading={loading}
                            rows={inspections}
                            columns={columns}
                            getRowId={(row) => row._id}
                            paginationMode='server'
                            pagination
                            rowCount={meta.total}
                            pageSizeOptions={[2, 5, 10, 20, 50, 100]}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                        />
                    </ThemeProvider>
                </div>
            )}

            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-gray-500 text-lg mb-4">Are you sure you want to delete this Inspection?</h2>
                        <div className="flex justify-end">
                            <button onClick={confirmDelete} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">
                                Yes
                            </button>
                            <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 rounded">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InspectionCrud;