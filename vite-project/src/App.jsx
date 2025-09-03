import React, { useEffect, useState } from "react"
import axios from "axios";

const formatAppName = (appName) => {
  // Remove timestamp suffix if present (anything after and including _)
  return appName.split('_')[0];
};

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ appName: "", email: "", password: "" });
  const [showPasswords, setShowPasswords] = useState({});
  const [sortDirection, setSortDirection] = useState('asc');
  const API_URL = "http://localhost:8081/api/users";

  useEffect(() => { fetchUsers(); }, []);
  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  }
  const checkExistingUser = async (form) => {
    try {
      const res = await axios.get(API_URL);
      const users = res.data;
      
      // Check for exact duplicate (all fields match)
      const exactDuplicate = users.find(user => 
        user.appName.toLowerCase() === form.appName.toLowerCase() &&
        user.email.toLowerCase() === form.email.toLowerCase() &&
        user.password === form.password
      );
      
      if (exactDuplicate) {
        return { isDuplicate: true, type: 'exact' };
      }

      // Check for username/appName match
      const appNameMatch = users.find(user => 
        user.appName.toLowerCase() === form.appName.toLowerCase()
      );

      if (appNameMatch) {
        return { isDuplicate: false, type: 'duplicate_name' };
      }

      return { isDuplicate: false, type: 'none' };
    } catch (error) {
      console.error("Error checking existing user:", error);
      return { isDuplicate: false, type: 'error' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const check = await checkExistingUser(form);

      if (check.type === 'exact') {
        alert("Cannot add: An identical entry already exists!");
        return;
      }

      if (check.type === 'duplicate_name') {
        const proceed = window.confirm(
          `An entry with the name "${form.appName}" already exists. Do you want to keep both entries?`
        );
        if (!proceed) return;
      }

      // Generate a unique appName by adding a timestamp
      const timestamp = new Date().getTime();
      const modifiedForm = {
        ...form,
        appName: check.type === 'duplicate_name' ? `${form.appName}_${timestamp}` : form.appName
      };

      await axios.post(API_URL, modifiedForm);
      setForm({ appName: "", email: "", password: "" });
      fetchUsers();
      
    } catch (error) {
      console.error("Error adding entry:", error);
      alert("Failed to add entry. Please try again.");
    }
  }
  const handleDelete = async (appName) => {
    try {
      const confirmDelete = window.confirm(`Are you sure you want to delete "${appName}"?`);
      if (confirmDelete) {
        await axios.delete(`${API_URL}/${appName}`);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete entry. Please try again.");
    }
  }
  const togglePassword = (appName) => {
    setShowPasswords(prev => ({
      ...prev,
      [appName]: !prev[appName]
    }));
  };

  const sortedUsers = [...users].sort((a, b) => {
    const compareAppName = (a.appName || '').toLowerCase().localeCompare((b.appName || '').toLowerCase());
    return sortDirection === 'asc' ? compareAppName : -compareAppName;
  });

  return (
    <div className="min-h-screen bg-[#ffffffb3] p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Form Section */}
        <div className="w-full bg-[#831638] rounded-lg p-6 shadow-xl">
          <h1 className="text-3xl font-extrabold text-white mb-4 nova-mono-regular">Entry</h1>
          <p className="text-xl text-white mb-6 nova-mono-regular">Your sentry for secure password management.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username or AppName" required
              value={form.appName}
              onChange={(e) => setForm({ ...form, appName: e.target.value })}
              className="w-full p-3 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#9e1c3f] nova-mono-regular"
            />
            <input
              type="text"
              placeholder="Email or UserId" required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#9e1c3f] nova-mono-regular"
            />
            <input
              type="text"
              placeholder="Password" required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#9e1c3f] nova-mono-regular"
            />
            <button
              type="submit"
              className="w-full bg-[#ee7d18] text-white py-3 rounded-md nova-mono-regular"
            >
              ADD
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="w-full bg-[#9e1c3f] rounded-lg p-6 shadow-xl overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white nova-mono-regular">Saved Passwords</h2>
            <button
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="bg-[#ee7d18] text-white px-4 py-2 rounded-md nova-mono-regular flex items-center gap-2"
            >
              Sort {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <table className="w-full min-w-full">
            <thead>
              <tr className="text-white border-b border-white/20" >
                <th className="text-left p-3 w-1/3">App Name / Username</th>
                <th className="text-left p-3 w-1/4">Email / UserId</th>
                <th className="text-left p-3 w-1/3">Password</th>
                <th className="text-left p-3 w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((u) => (
                <tr key={u.appName} className="border-b border-white/10 bg-white/85">
                  <td className="p-3 font-semibold text-[#3b4a4f]">
                    {formatAppName(u.appName) || 'null'}
                  </td>
                  <td className="p-3 text-gray-600">
                    {u.email || 'null'}
                  </td>
                  <td className="p-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-32 inline-block">
                        {showPasswords[u.appName] ? (u.password || 'null') : '••••••••'}
                      </span>
                      <button
                        onClick={() => togglePassword(u.appName)}
                        className="min-w-[60px] px-2 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        {showPasswords[u.appName] ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(u.appName)}
                      className="bg-[#ee7d18] text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;