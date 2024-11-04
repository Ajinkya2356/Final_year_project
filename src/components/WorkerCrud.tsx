import React, { useState } from 'react';
import image from '../assets/image.png';

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

          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Photo</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Registration No</th>
                {/* <th className="border border-gray-300 px-4 py-2">Actions</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map(worker => (
                  <tr key={worker._id}>
                    <td className="border border-gray-300 px-4 py-2  flex justify-center"><img src={worker.photo} alt={worker.name} className="h-10 w-10 rounded-full" /></td>
                    <td className="border border-gray-300 px-4 py-2">{worker.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{worker.reg_no}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500" onClick={() => {
                        setFormData(worker);
                        setIsUpdating(true);
                      }}>Update</button>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500" onClick={() => handleDeleteWorker(worker.reg_no)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                    No workers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
