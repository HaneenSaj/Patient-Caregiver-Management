import React, { useState, useEffect } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // user or admin
  const [isLogin, setIsLogin] = useState(true); // toggle between login and register
  const [users, setUsers] = useState([]); // Store users data

  // Fetch users from the JSON file
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/src/data.json');
      const data = await response.json();
      setUsers(data.users); // Assuming your users are in the 'users' key of data.json
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Don’t have an account? Register here' : 'Already have an account? Login here'}</p>
    </div>
  );
};

export default Login;
