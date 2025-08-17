import React from 'react';
import { Users, UserPlus, Search, Filter } from 'lucide-react';

const UserManagement = () => {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@lms.edu', role: 'Student', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@lms.edu', role: 'Student', status: 'Active', joinDate: '2024-02-10' },
    { id: 3, name: 'Carol Davis', email: 'carol@lms.edu', role: 'Instructor', status: 'Active', joinDate: '2024-01-05' },
    { id: 4, name: 'David Wilson', email: 'david@lms.edu', role: 'Student', status: 'Inactive', joinDate: '2024-03-20' }
  ];

  return (
    <div className="space-y-6 fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">User Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage all platform users and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105">
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-slate-100">Name</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-slate-100">Email</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-slate-100">Role</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-slate-100">Status</th>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 text-slate-900 dark:text-slate-100">{user.name}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{user.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={'px-2 py-1 text-xs font-medium rounded-full ' + 
                      (user.status === 'Active' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300')
                    }>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                      Edit
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
};

export default UserManagement;