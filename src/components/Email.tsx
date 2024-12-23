import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkers } from '../slices/adminSlice';

const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-cell': {
                        color: 'white', // Customize cell text color
                        backgroundColor: '#1F2937', // Customize cell background color
                        borderColor: "white",
                        borderWidth: 0.5,
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#111828', // Customize column header background color
                        color: 'black', // Customize column header text color
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#1F2937', // Customize footer background color
                        color: 'white', // Customize footer text color
                    },
                    '& .MuiCheckbox-root': {
                        color: 'white !important', // Customize checkbox color
                    },
                },
            },
        },
    },
});

const Email = () => {
    const dispatch = useDispatch();
    const { workers, loading, meta } = useSelector((state: any) => state.admin)
    const [receiveList, setreceiveList] = useState([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });
    useEffect(() => {
        dispatch(fetchWorkers({
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
            user_role: 'admin'
        }));
    }, [dispatch, paginationModel]);
    const columns = [
        { field: 'name', headerName: 'Admin Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 2 },
    ];
    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <Button variant="contained" color="primary">
                    Send
                </Button>
            </div>
            <div style={{ width: '100%' }}>
                <ThemeProvider theme={theme}>
                    <DataGrid
                        loading={loading}
                        rows={workers}
                        getRowId={(row) => row.id}
                        columns={columns}
                        rowCount={meta}
                        pagination
                        paginationMode='server'
                        pageSizeOptions={[
                            2, 5, 10, 20, 50, 100
                        ]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default Email;