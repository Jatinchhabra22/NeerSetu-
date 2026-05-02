import React, { useMemo, useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';

const users = [
  { id: 1, name: 'Admin User', role: 'Admin', village: 'All Villages', status: 'Active' },
  { id: 2, name: 'Health Official', role: 'Official', village: 'Village A', status: 'Active' },
  { id: 3, name: 'ASHA Worker', role: 'Field', village: 'Village B', status: 'Active' },
  { id: 4, name: 'Volunteer Team', role: 'Volunteer', village: 'Village C', status: 'Pending' },
];

const Users = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.role.toLowerCase().includes(query.toLowerCase()) ||
          u.village.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600">User and field workforce visibility</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-4">
          <UserGroupIcon className="h-5 w-5 text-blue-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users, role or village"
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900"
          />
        </div>
        <div className="space-y-3">
          {filtered.map((u) => (
            <div key={u.id} className="rounded-lg border border-gray-200 p-4 flex justify-between">
              <div>
                <p className="text-gray-900 font-semibold">{u.name}</p>
                <p className="text-gray-500 text-sm">
                  {u.role} - {u.village}
                </p>
              </div>
              <span className="text-sm text-blue-200 font-medium">{u.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
