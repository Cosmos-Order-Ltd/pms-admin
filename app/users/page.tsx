'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const users: User[] = [
    {
      id: 'user-001',
      name: 'Andreas Georgiou',
      email: 'andreas.georgiou@cosmos.order',
      role: 'System Administrator',
      department: 'IT',
      isActive: true,
      lastLogin: '2025-01-16 14:30',
      createdAt: '2024-11-01',
    },
    {
      id: 'user-002',
      name: 'Maria Constantinou',
      email: 'maria.constantinou@cosmos.order',
      role: 'Front Desk Manager',
      department: 'Front Office',
      isActive: true,
      lastLogin: '2025-01-16 13:45',
      createdAt: '2024-11-05',
    },
    {
      id: 'user-003',
      name: 'Elena Papadopoulos',
      email: 'elena.papadopoulos@cosmos.order',
      role: 'Revenue Manager',
      department: 'Revenue',
      isActive: true,
      lastLogin: '2025-01-16 12:15',
      createdAt: '2024-11-10',
    }
  ];

  const handleCreateUser = () => {
    toast.success('User creation form opened!');
    setShowCreateModal(true);
  };

  const handleEditUser = (user: User) => {
    toast.success(`Editing ${user.name}'s profile`);
  };

  const handleDeleteUser = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      toast.success(`${user.name} has been deleted`);
    }
  };

  const handleToggleStatus = (user: User) => {
    const action = user.isActive ? 'deactivated' : 'activated';
    toast.success(`${user.name} has been ${action}`);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'active') return matchesSearch && user.isActive;
    if (filter === 'inactive') return matchesSearch && !user.isActive;
    return matchesSearch;
  });

  const getRoleColor = (role: string) => {
    if (role.includes('Administrator')) return 'bg-red-100 text-red-800';
    if (role.includes('Manager')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className=\"p-6 space-y-6\">\n      {/* Header */}\n      <div className=\"flex justify-between items-center\">\n        <div>\n          <h1 className=\"text-2xl font-bold text-gray-900\">Users</h1>\n          <p className=\"text-gray-600 mt-1\">Manage system users and their permissions</p>\n        </div>\n        <button\n          onClick={handleCreateUser}\n          className=\"btn-primary flex items-center\"\n        >\n          <PlusIcon className=\"w-5 h-5 mr-2\" />\n          Add User\n        </button>\n      </div>\n\n      {/* Filters */}\n      <div className=\"bg-white rounded-lg shadow-sm border border-gray-200 p-4\">\n        <div className=\"flex flex-col sm:flex-row gap-4\">\n          <div className=\"flex-1 relative\">\n            <MagnifyingGlassIcon className=\"w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400\" />\n            <input\n              type=\"text\"\n              placeholder=\"Search users...\"\n              value={searchTerm}\n              onChange={(e) => setSearchTerm(e.target.value)}\n              className=\"w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500\"\n            />\n          </div>\n          <div className=\"flex items-center space-x-3\">\n            <AdjustmentsHorizontalIcon className=\"w-5 h-5 text-gray-500\" />\n            <select\n              value={filter}\n              onChange={(e) => setFilter(e.target.value)}\n              className=\"px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500\"\n            >\n              <option value=\"all\">All Users</option>\n              <option value=\"active\">Active Users</option>\n              <option value=\"inactive\">Inactive Users</option>\n            </select>\n          </div>\n        </div>\n      </div>\n\n      {/* Users Table */}\n      <div className=\"bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden\">\n        <div className=\"overflow-x-auto\">\n          <table className=\"min-w-full divide-y divide-gray-200\">\n            <thead className=\"bg-gray-50\">\n              <tr>\n                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">\n                  User\n                </th>\n                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">\n                  Role\n                </th>\n                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">\n                  Department\n                </th>\n                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">\n                  Last Login\n                </th>\n                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">\n                  Status\n                </th>\n                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">\n                  Actions\n                </th>\n              </tr>\n            </thead>\n            <tbody className=\"bg-white divide-y divide-gray-200\">\n              {filteredUsers.map((user) => (\n                <tr key={user.id} className=\"hover:bg-gray-50\">\n                  <td className=\"px-6 py-4 whitespace-nowrap\">\n                    <div className=\"flex items-center\">\n                      <div className=\"w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center\">\n                        <span className=\"text-sm font-medium text-gray-700\">\n                          {user.name.split(' ').map(n => n[0]).join('')}\n                        </span>\n                      </div>\n                      <div className=\"ml-4\">\n                        <div className=\"text-sm font-medium text-gray-900\">{user.name}</div>\n                        <div className=\"text-sm text-gray-500\">{user.email}</div>\n                      </div>\n                    </div>\n                  </td>\n                  <td className=\"px-6 py-4 whitespace-nowrap\">\n                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>\n                      {user.role}\n                    </span>\n                  </td>\n                  <td className=\"px-6 py-4 whitespace-nowrap text-sm text-gray-900\">\n                    {user.department}\n                  </td>\n                  <td className=\"px-6 py-4 whitespace-nowrap text-sm text-gray-500\">\n                    {user.lastLogin || 'Never'}\n                  </td>\n                  <td className=\"px-6 py-4 whitespace-nowrap\">\n                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${\n                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'\n                    }`}>\n                      {user.isActive ? 'Active' : 'Inactive'}\n                    </span>\n                  </td>\n                  <td className=\"px-6 py-4 whitespace-nowrap text-sm font-medium\">\n                    <div className=\"flex space-x-2\">\n                      <button\n                        onClick={() => handleEditUser(user)}\n                        className=\"text-blue-600 hover:text-blue-900\"\n                      >\n                        <PencilIcon className=\"w-4 h-4\" />\n                      </button>\n                      <button\n                        onClick={() => handleToggleStatus(user)}\n                        className={`${user.isActive ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}\n                      >\n                        {user.isActive ? '⏸️' : '▶️'}\n                      </button>\n                      <button\n                        onClick={() => handleDeleteUser(user)}\n                        className=\"text-red-600 hover:text-red-900\"\n                      >\n                        <TrashIcon className=\"w-4 h-4\" />\n                      </button>\n                    </div>\n                  </td>\n                </tr>\n              ))}\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      {filteredUsers.length === 0 && (\n        <div className=\"text-center py-12\">\n          <p className=\"text-gray-500\">No users found matching your criteria.</p>\n        </div>\n      )}\n    </div>\n  );\n}"