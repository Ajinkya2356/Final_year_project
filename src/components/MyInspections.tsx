import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

const columns: GridColDef[] = [
    { field: 'serial_no', headerName: 'Serial No', width: 150 },
    { field: 'client', headerName: 'Client', width: 150 },
    { field: 'meter_model', headerName: 'Meter Model', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
];

const rows = [
    { id: 1, serial_no: '001', client: 'Client A', meter_model: 'Model X', status: 'Active', date: '2023-01-01' },
    { id: 2, serial_no: '002', client: 'Client B', meter_model: 'Model Y', status: 'Inactive', date: '2023-01-02' },
    // Add more rows as needed
];

const MyInspections: React.FC = () => {
    const [searchModel, setSearchModel] = useState('');
    const [searchSerialNo, setSearchSerialNo] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [searchDate, setSearchDate] = useState('');

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchModel(event.target.value);
    };

    const handleSerialNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchSerialNo(event.target.value);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStatus(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchDate(event.target.value);
    };

    const filteredRows = rows.filter((row) => {
        return (
            row.meter_model.toLowerCase().includes(searchModel.toLowerCase()) &&
            row.serial_no.toLowerCase().includes(searchSerialNo.toLowerCase()) &&
            row.status.toLowerCase().includes(searchStatus.toLowerCase()) &&
            row.date.includes(searchDate)
        );
    });

    return (
        <div className='container w-8/10'>
            <DataGrid rows={filteredRows} columns={columns} pageSize={5} checkboxSelection
                className='w-full text-white' />

        </div>
    );
};
export default MyInspections;