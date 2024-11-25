import React, { useState } from 'react';
import './styles.css';

const AppointmentScheduling = ({ patients, caregivers }) => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedCaregiver, setSelectedCaregiver] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleScheduleAppointment = () => {
    if (selectedPatient && selectedCaregiver && appointmentDate) {
      alert(`Appointment scheduled for ${selectedPatient} with ${selectedCaregiver} on ${appointmentDate}`);
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="modal">
      <h3 className="modal-header">Schedule Appointment</h3>
      <div className="modal-content">
        <select className="select-field" onChange={(e) => setSelectedPatient(e.target.value)} value={selectedPatient}>
          <option value="">Select Patient</option>
          {patients.map((patient, index) => (
            <option key={index} value={patient.name}>
              {patient.name}
            </option>
          ))}
        </select>

        <select className="select-field" onChange={(e) => setSelectedCaregiver(e.target.value)} value={selectedCaregiver}>
          <option value="">Select Caregiver</option>
          {caregivers.map((caregiver, index) => (
            <option key={index} value={caregiver.name}>
              {caregiver.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="input-field"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />

        <button className="btn" onClick={handleScheduleAppointment}>Schedule</button>
      </div>
    </div>
  );
};

export default AppointmentScheduling;
