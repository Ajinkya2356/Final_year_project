import React, { useState } from 'react';
import image from '../assets/image.png';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

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
  _id: string;
  name: string;
  reg_no: string;
  password: string;
  photo: string;
  created_at: string;
  updated_at: string;
}

interface WorkerCrudProps {
  tab: string;
}

const WorkerCrud: React.FC<WorkerCrudProps> = ({ tab }) => {
  const [workers, setWorkers] = useState<Worker[]>([
    {
      _id: '1',
      name: 'Aarav Singh',
      reg_no: 'REG001',
      password: 'password123',
      photo: image,
      created_at: new Date('2023-02-15').toISOString(),
      updated_at: new Date('2023-02-15').toISOString(),
    },
    {
      _id: '2',
      name: 'Vivaan Patel',
      reg_no: 'REG002',
      password: 'password123',
      photo: image,
      created_at: new Date('2023-05-10').toISOString(),
      updated_at: new Date('2023-05-10').toISOString(),
    },
    {
      _id: '3',
      name: 'Aditya Sharma',
      reg_no: 'REG003',
      password: 'password123',
      photo: image,
      created_at: new Date('2023-08-20').toISOString(),
      updated_at: new Date('2023-08-20').toISOString(),
    },
    {
      _id: '4',
      name: 'Vihaan Gupta',
      reg_no: 'REG004',
      password: 'password123',
      photo: image,
      created_at: new Date('2024-01-05').toISOString(),
      updated_at: new Date('2024-01-05').toISOString(),
    },
    {
      _id: '5',
      name: 'Reyansh Verma',
      reg_no: 'REG005',
      password: 'password123',
      photo: image,
      created_at: new Date('2024-03-18').toISOString(),
      updated_at: new Date('2024-03-18').toISOString(),
    },
    {
      _id: '6',
      name: 'Ishaan Rao',
      reg_no: 'REG006',
      password: 'password123',
      photo: image,
      created_at: new Date('2024-04-22').toISOString(),
      updated_at: new Date('2024-04-22').toISOString(),
    },
    {
      _id: '7',
      name: 'Krishna Yadav',
      reg_no: 'REG007',
      password: 'password123',
      photo: image,
      created_at: new Date('2023-11-12').toISOString(),
      updated_at: new Date('2023-11-12').toISOString(),
    },
    {
      _id: '8',
      name: 'Anaya Sinha',
      reg_no: 'REG008',
      password: 'password123',
      photo: image,
      created_at: new Date('2023-09-30').toISOString(),
      updated_at: new Date('2023-09-30').toISOString(),
    },
    {
      _id: '9',
      name: 'Kabir Mehta',
      reg_no: 'REG009',
      password: 'password123',
      photo: image,
      created_at: new Date('2023-03-25').toISOString(),
      updated_at: new Date('2023-03-25').toISOString(),
    },
    {
      _id: '10',
      name: 'Lakshay Choudhary',
      reg_no: 'REG010',
      password: 'password123',
      photo: image,
      created_at: new Date('2024-02-10').toISOString(),
      updated_at: new Date('2024-02-10').toISOString(),
    }
  ]);

  const [formData, setFormData] = useState<Worker>({
    _id: '',
    name: '',
    reg_no: '',
    password: '',
    photo: '',
    created_at: '',
    updated_at: ''
  });

  const [activeTab, setActiveTab] = useState<string>(tab);
  const [searchRegNo, setSearchRegNo] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);


  const [filterType, setFilterType] = useState('Name');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [workerToDelete, setWorkerToDelete] = useState<Worker | null>(null);

  /* const [loading, setLoading] = useState(false); */
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const onChangePage = (page: number) => {
    setPagination({ ...pagination, page });
  }
  const onChangeLimit = (limit: number) => {
    setPagination({ ...pagination, limit });
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as 'Name' | 'Reg. No.' | 'Filter by Date');
    setSearchName('');
    setSearchRegNo('');
    setStartDate('');
    setEndDate('');
  };

  const filteredWorkers = workers.filter(worker => {
    const lowerCaseName = worker.name.toLowerCase();
    const lowerCaseRegNo = worker.reg_no.toLowerCase();

    if (filterType === 'Name') {
      return lowerCaseName.startsWith(searchName.toLowerCase());
    } else if (filterType === 'Reg. No.') {
      return lowerCaseRegNo.startsWith(searchRegNo.toLowerCase());
    } else if (filterType === 'Filter by Date') {
      const workerDate = new Date(worker.created_at).toISOString().split('T')[0];
      if (startDate && endDate) {
        return workerDate >= startDate && workerDate <= endDate;
      } else if (startDate) {
        return workerDate === startDate;
      } else if (endDate) {
        return workerDate === endDate;
      }
      return true;
    }
    return true;
  });

  const addWorker = () => {
    const newWorker: Worker = {
      ...formData,
      _id: (workers.length + 1).toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setWorkers([...workers, newWorker]);
    resetForm();
  };

  const updateWorker = () => {
    const updatedWorkers = workers.map(worker =>
      worker._id === formData._id ? { ...worker, ...formData, updated_at: new Date().toISOString() } : worker
    );
    setWorkers(updatedWorkers);
    setIsUpdating(false);
    resetForm();
  };

  // const deleteWorker = (id: string) => {
  //   setWorkers(workers.filter(worker => worker._id !== id));
  //   setIsDeleteConfirmOpen(true);
  // };

  const handleDeleteWorker = (reg_no: string) => {
    setWorkerToDelete(workers.find(w => w.reg_no === reg_no) || null);
    setIsDeleteConfirmOpen(true);
  };


  const confirmDelete = () => {
    if (workerToDelete) {
      setWorkers(workers.filter(w => w.reg_no !== workerToDelete.reg_no));
    }
    setIsDeleteConfirmOpen(false);
    setWorkerToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setWorkerToDelete(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      _id: '',
      name: '',
      reg_no: '',
      password: '',
      photo: '',
      created_at: '',
      updated_at: ''
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
            }}
          > Update
          </button>
          <button
            className="bg-red-600 text-white text-sm my-4 py-1 px-3 rounded hover:bg-red-700 transition duration-300 ease-in-out h-7 w-1/2"
            onClick={() => handleDeleteWorker(params.row.reg_no)}
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
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleInputChange} required />
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
            <input className="border border-gray-300 rounded p-2 mb-2 w-full" style={{ backgroundColor: '#1F2937', color: 'white' }} name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleInputChange} required />
            <button className="bg-teal-600 text-white py-2 rounded hover:bg-teal-500" onClick={updateWorker}>Update Worker</button>
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
              rows={filteredWorkers}
              columns={columns}
              getRowId={(row) => row._id}
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