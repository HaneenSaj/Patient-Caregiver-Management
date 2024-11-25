import React, { useState } from 'react';
import AppointmentScheduling from './AppointmentScheduling';
import './styles.css';

const AdminDashboard = ({ patients, setPatients, caregivers, setCaregivers, onLogout }) => {
  const [newCaregiverName, setNewCaregiverName] = useState('');
  const [assignedCaregiver, setAssignedCaregiver] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Add a new caregiver
  const handleAddCaregiver = () => {
    if (newCaregiverName) {
      setCaregivers([...caregivers, { name: newCaregiverName }]);
      setNewCaregiverName('');
      alert('Caregiver added successfully!');
    } else {
      alert('Please enter a caregiver name!');
    }
  };

  // Assign caregiver to a patient
  const handleAssignCaregiver = () => {
    const updatedPatients = [...patients];
    const patientIndex = updatedPatients.findIndex(p => p.name === selectedPatient);
    if (patientIndex !== -1) {
      updatedPatients[patientIndex].caregiver = assignedCaregiver;
      setPatients(updatedPatients);
      alert(`Caregiver ${assignedCaregiver} assigned to ${selectedPatient}`);
    } else {
      alert('Patient not found!');
    }
  };

  // Open appointment scheduling modal
  const handleOpenAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="dashboard-container">
      <h2 className="header">Admin Dashboard</h2>
      <button className="logout-btn" onClick={onLogout}>Logout</button>

      <div className="card">
        <h3>Manage Patients</h3>
        <ul className="patient-list">
          {patients.map((patient, index) => (
            <li key={index} className="patient-item">
              {patient.name} - {patient.address}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Add Caregiver</h3>
        <input
          type="text"
          placeholder="Caregiver Name"
          className="input-field"
          value={newCaregiverName}
          onChange={(e) => setNewCaregiverName(e.target.value)}
        />
        <button className="btn" onClick={handleAddCaregiver}>Add Caregiver</button>
      </div>

      <div className="card">
        <h3>Assign Caregiver to Patient</h3>
        <div className="form-group">
          <select className="select-field" onChange={(e) => setSelectedPatient(e.target.value)} value={selectedPatient}>
            <option value="">Select a patient</option>
            {patients.map((patient, index) => (
              <option key={index} value={patient.name}>
                {patient.name}
              </option>
            ))}
          </select>

          <select className="select-field" onChange={(e) => setAssignedCaregiver(e.target.value)} value={assignedCaregiver}>
            <option value="">Select a caregiver</option>
            {caregivers.map((caregiver, index) => (
              <option key={index} value={caregiver.name}>
                {caregiver.name}
              </option>
            ))}
          </select>

          <button className="btn" onClick={handleAssignCaregiver}>Assign Caregiver</button>
        </div>
      </div>

      <div className="card">
        <h3>Caregiver List</h3>
        <ul className="caregiver-list">
          {caregivers.map((caregiver, index) => (
            <li key={index} className="caregiver-item">{caregiver.name}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Schedule Appointment</h3>
        <button className="btn" onClick={handleOpenAppointmentModal}>Schedule Appointment</button>
      </div>

      {/* Appointment Scheduling Modal */}
      {isAppointmentModalOpen && <AppointmentScheduling patients={patients} caregivers={caregivers} />}
    </div>
  );
};

export default AdminDashboard;
