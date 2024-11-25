import React, { useState, useEffect } from 'react';
import './components/styles.css';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import AdminDashboard from './components/AdminDashboard';
import CaregiverDashboard from './components/CaregiverDashboard';
import AppointmentScheduling from './components/AppointmentScheduling';

function App() {
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    // Fetch data from the json file
    const fetchData = async () => {
      const response = await fetch('/src/data.json');
      const data = await response.json();
      setPatients(data.patients);
      setCaregivers(data.caregivers);
    };
    fetchData();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : user.role === 'user' ? (
        <PatientDashboard user={user} patients={patients} setPatients={setPatients} onLogout={handleLogout} />
      ) : user.role === 'admin' ? (
        <AdminDashboard patients={patients} setPatients={setPatients} caregivers={caregivers} setCaregivers={setCaregivers} onLogout={handleLogout} />
      ) : (
        <CaregiverDashboard caregivers={caregivers} setCaregivers={setCaregivers} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
