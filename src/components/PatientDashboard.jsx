import React, { useState } from 'react';

const PatientDashboard = ({ user, patients, setPatients, onLogout }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [medicalRecords, setMedicalRecords] = useState('');

  const handleAddPatient = () => {
    const newPatient = { name, address, medicalRecords };
    setPatients([...patients, newPatient]);
    alert('Patient added successfully!');
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}</h2>
      <button onClick={onLogout}>Logout</button>

      <h3>Patient Dashboard</h3>
      <div>
        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <textarea
          placeholder="Medical Records"
          value={medicalRecords}
          onChange={(e) => setMedicalRecords(e.target.value)}
        />
        <button onClick={handleAddPatient}>Add Patient</button>
      </div>
      <h3>Existing Patients</h3>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>
            {patient.name} - {patient.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
