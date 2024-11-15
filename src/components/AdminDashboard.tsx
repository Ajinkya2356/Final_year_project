import React, { useState } from 'react';
import WorkerCrud from './WorkerCrud';
import MeterCrud from './MeterCrud';
import AdminSideBar from './AdminSideBar';
import InspectionCrud from './InspectionCrud';
import RoutineCrud from './RoutineCrud';

const AdminDashboard: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('WorkerCrud');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'WorkerCrud':
        return <WorkerCrud tab={'get'} />;
      case 'MeterCrud':
        return <MeterCrud />;
      case 'WorkerCrud_add':
        return <WorkerCrud tab={'add'} />;
      case 'InspectionCrud':
        return <InspectionCrud tab={'get'} />;
      case 'RoutineCrud':
        return <RoutineCrud tab={'get'} />;
      default:
        return <WorkerCrud tab={'get'} />;
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <AdminSideBar selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} />

      <div className="flex-grow p-6 ml-60 scroll_none" >
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
