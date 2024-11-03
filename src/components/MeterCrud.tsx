import React, { useState } from 'react';
import image from '../assets/meter.jpg'

// Define a type for Meter
interface Meter {
  id: number;
  serial_no: string;
  model: string;
  description: string;
  photo: string;
}

// Initial data
const initialMeters: Meter[] = [
  { id: 1, serial_no: 'SN001', model: 'LM 1360', description: 'Digital Multimeter with basic functions.', photo: image },
  { id: 2, serial_no: 'SN002', model: 'LM 1375', description: 'Compact multimeter with advanced features.', photo: image },
  { id: 3, serial_no: 'SN003', model: 'LM 1382', description: 'High precision multimeter for professionals.', photo: image },
  { id: 4, serial_no: 'SN004', model: 'LM 1390', description: 'Multimeter with additional measuring modes.', photo: image },
  { id: 5, serial_no: 'SN005', model: 'LM 1405', description: 'Rugged multimeter suitable for outdoor use.', photo: image },
  { id: 6, serial_no: 'SN006', model: 'LM 1412', description: 'Smart multimeter with Bluetooth connectivity.', photo: image },
  { id: 7, serial_no: 'SN007', model: 'LM 1428', description: 'Versatile multimeter for various applications.', photo: image },
  { id: 8, serial_no: 'SN008', model: 'LM 1436', description: 'Professional-grade multimeter with data logging.', photo: image },
  { id: 9, serial_no: 'SN009', model: 'LM 1444', description: 'Compact and lightweight multimeter.', photo: image },
  { id: 10, serial_no: 'SN010', model: 'LM 1450', description: 'Multimeter with touchscreen interface.', photo: image },
];

const MeterCrud: React.FC = () => {
  const [meters, setMeters] = useState<Meter[]>(initialMeters);
  const [currentMeter, setCurrentMeter] = useState<Meter | null>(null);
  const [formData, setFormData] = useState<Omit<Meter, 'id'>>({
    serial_no: '',
    model: '',
    description: '',
    photo: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [meterToDelete, setMeterToDelete] = useState<Meter | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMeter = () => {
    const newMeter: Meter = {
      id: meters.length + 1,
      ...formData,
    };
    setMeters([...meters, newMeter]);
    closeModal();
  };

  const handleEditMeter = (meter: Meter) => {
    setCurrentMeter(meter);
    setFormData({ serial_no: meter.serial_no, model: meter.model, description: meter.description, photo: meter.photo });
    setIsModalOpen(true);
  };

  const handleUpdateMeter = () => {
    if (currentMeter) {
      const updatedMeters = meters.map(m => (m.id === currentMeter.id ? { ...currentMeter, ...formData } : m));
      setMeters(updatedMeters);
      setCurrentMeter(null);
    }
    closeModal();
  };

  const handleDeleteMeter = (id: number) => {
    setMeterToDelete(meters.find(m => m.id === id) || null);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (meterToDelete) {
      setMeters(meters.filter(m => m.id !== meterToDelete.id));
    }
    setIsDeleteConfirmOpen(false);
    setMeterToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setMeterToDelete(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMeter) {
      handleUpdateMeter();
    } else {
      handleAddMeter();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ serial_no: '', model: '', description: '', photo: '' });
  };

  // Filter meters based on the search term
  const filteredMeters = meters.filter(meter =>
    meter.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Multimeter CRUD</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Model Number"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded p-2 mb-2 w-1/3"
        />
        <button onClick={() => setIsModalOpen(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add Meter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMeters.length > 0 ? (
          filteredMeters.map(meter => (
            <div key={meter.id} className="flex border p-4 rounded">
              <img src={meter.photo} alt={meter.model} className="w-1/5 h-full object-cover" />
              <div className="flex-1 px-4">
                <h2 className="text-lg font-semibold">{meter.model}</h2>
                <p className="text-sm">{meter.description}</p>
              </div>
              <div className="flex flex-col mb-2 w-1/5">
                <button onClick={() => handleEditMeter(meter)} className="mb-2 px-2 py-1 bg-yellow-500 text-white rounded">
                  Edit
                </button>
                <button onClick={() => handleDeleteMeter(meter.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h4>No meters found</h4>
        )}
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">{currentMeter ? 'Update Meter' : 'Add Meter'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="serial_no"
                value={formData.serial_no}
                onChange={handleInputChange}
                placeholder="Serial Number"
                required
                className="border mb-2 p-2 w-full"
              />
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="Model"
                required
                className="border mb-2 p-2 w-full"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
                className="border mb-2 p-2 w-full"
              />
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
                placeholder="Photo URL"
                required
                className="border mb-2 p-2 w-full"
              />
              <div className="flex justify-end mt-4">
                <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  {currentMeter ? 'Update Meter' : 'Add Meter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-gray-500  text-lg mb-4">Are you sure you want to delete this meter?</h2>
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

export default MeterCrud;
