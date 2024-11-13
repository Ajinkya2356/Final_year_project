import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkers, addWorker as addWorkerAction, deleteWorker, updateWorker } from '../slices/adminSlice';


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
        },
      },
    },
  },
});

interface Worker {
  name: string;
  reg_no: string;
  password: string;
  photo: File | null;
}

interface WorkerCrudProps {
  tab: string;
}

const WorkerCrud: React.FC<WorkerCrudProps> = ({ tab }) => {
  const dispatch = useDispatch();
  const { loading, workers } = useSelector((state: any) => state.admin);



  const [formData, setFormData] = useState<Worker>({
    name: '',
    reg_no: '',
    password: '',
    photo: null,
  });

  const [activeTab, setActiveTab] = useState<string>(tab);
  const [searchRegNo, setSearchRegNo] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [filterType, setFilterType] = useState('Name');
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    dispatch(fetchWorkers(searchName, searchRegNo));
  }, [dispatch, searchName, searchRegNo]);

  const onChangePage = (page: number) => {
    setPagination({ ...pagination, page });
  }
  const onChangeLimit = (limit: number) => {
    setPagination({ ...pagination, limit });
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as 'Name' | 'Reg. No.');
    setSearchName('');
    setSearchRegNo('');
  };

  const addWorker = () => {
    const newWorker: Worker = {
      ...formData
    };
    dispatch(addWorkerAction(newWorker));
    resetForm();
  };

  const handleUpdateWorker = () => {
    dispatch(updateWorker({ id: selectedRow, worker: formData }));
    setSelectedRow(null);
    setIsUpdating(false);
    resetForm();
  };

  const handleDeleteWorker = (_id: string) => {
    setIsDeleteConfirmOpen(true);
    setSelectedRow(_id);
  };

  const confirmDelete = () => {
    dispatch(deleteWorker(selectedRow));
    setIsDeleteConfirmOpen(false);
    setSelectedRow(null)
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedRow(null)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files) {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      reg_no: '',
      password: '',
      photo: null,
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'photo',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-full h-full">
          <img src={params.value} alt={params.row.name} className="h-10 w-10 rounded-full" />
        </div>
      ),
      headerAlign: 'center',
      resizable: false,
    },
    { field: 'name', headerName: 'Name', flex: 1, resizable: false, headerAlign: 'center', },
    { field: 'reg_no', headerName: 'Registration No', flex: 1, resizable: false, headerAlign: 'center', },
    {
      field: 'actions',
      flex: 1,
      headerName: 'Actions',
      headerAlign: 'center',
      resizable: false,
      renderCell: (params) => (
        <div className="flex space-x-2 justify-between items-center h-full">
          <button
            className="bg-blue-600 text-white text-sm my-4 py-1 px-3 rounded hover:bg-blue-700 transition duration-300 ease-in-out h-7 w-1/2"
            onClick={() => {
              setFormData(params.row);
              setIsUpdating(true);
              setSelectedRow(params.row.id);
            }}
          > Update
          </button>
          <button
            className="bg-red-600 text-white text-sm my-4 py-1 px-3 rounded hover:bg-red-700 transition duration-300 ease-in-out h-7 w-1/2"
            onClick={() => {
              handleDeleteWorker(params.row.id);

            }
            }
          > Delete
          </button>

        </div>
      ),
    },
  ];

  return (
    <div className="container" >
      <h1 className="text-2xl font-bold text-center mb-6">Worker Management</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-500"
          onClick={() => setActiveTab(prevTab => (prevTab === 'add' ? 'get' : 'add'))}
        >
          {activeTab === 'add' ? 'Show All' : 'Add'}
        </button>
      </div>

      {activeTab === 'add' && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-1/3">
            <button
              className="absolute bg-white top-2 right-2 text-gray-700 hover:text-gray-500"
              onClick={() => setActiveTab('get')}
            >
              ✕
            </button>
            <h2 className="text-xl text-gray-700 font-semibold mb-4">Add Worker</h2>
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="reg_no" placeholder="Registration No" value={formData.reg_no} onChange={handleInputChange} required />
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="photo" type="file" accept="image/*" onChange={handleInputChange} required />
            <button className="bg-teal-600 text-white py-2 rounded hover:bg-teal-500" onClick={addWorker}>Add Worker</button>
          </div>
        </div>
      )}

      {isUpdating && ( // Update Overlay
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-1/3">
            <button
              className="absolute bg-white top-2 right-2 text-gray-700 hover:text-gray-500"
              onClick={() => setIsUpdating(false)}
            >
              ✕
            </button>
            <h2 className="text-xl text-gray-700 font-semibold mb-4">Update Worker</h2>
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="reg_no" placeholder="Registration No" value={formData.reg_no} onChange={handleInputChange} required />
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />

            <span className='flex justify-center m-3'><img src={formData.photo} alt={`user {formData.reg_no}`} height={100} width={150} /></span>
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="photo" type="file" accept="image/*" onChange={handleInputChange} required />

            <button className="bg-teal-600 text-white py-2 rounded hover:bg-teal-500" onClick={handleUpdateWorker}>Update Worker</button>
          </div>
        </div>
      )}

      {activeTab === 'get' && (
        <div className="tab-content">
          <div className="flex flex-row justify-around mb-4 gap-5">

            {filterType !== 'Filter by Date' ? (
              <input
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                style={{ backgroundColor: '#1F2937', color: 'white' }}
                name={filterType === 'Name' ? 'name' : 'reg_no'}
                placeholder={`Filter by ${filterType}`}
                value={filterType === 'Name' ? searchName : searchRegNo}
                onChange={filterType === 'Name' ? (e) => setSearchName(e.target.value) : (e) => setSearchRegNo(e.target.value)}
              />
            ) : (
              <div className="flex flex-row w-3/5 justify-between">
                <label htmlFor="startDate" className="text-white mb-1">Start Date (dd/mm/yyyy)</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded p-2 mb-2 w-2/5"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="endDate" className="text-white mb-1">End Date (dd/mm/yyyy)</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded p-2 mb-2 w-2/5 ml-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            )}
            <div className="w-60">
              <select className="border border-gray-300 rounded p-2 mb-2 w-full" value={filterType} onChange={handleFilterChange}>
                <option>Name</option>
                <option>Reg. No.</option>
                <option>Filter by Date</option>
              </select>
            </div>
          </div>
          <ThemeProvider theme={theme}>
            <DataGrid
              loading={loading}
              rows={workers}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: pagination.limit, page: pagination.page },
                },
              }}
              rowCount={10}
              onPaginationModelChange={(params) => {
                onChangePage(params.page);
                onChangeLimit(params.pageSize);
              }}
              paginationMode='server'
              pagination
            />
          </ThemeProvider>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-gray-500  text-lg mb-4">Are you sure you want to delete this Worker ?</h2>
            <div className="flex justify-end">
              <button onClick={confirmDelete} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">
                Yes
              </button>
              <button onClick={cancelDelete} className=" px-4 py-2 bg-gray-300 rounded">
                No
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerCrud;
