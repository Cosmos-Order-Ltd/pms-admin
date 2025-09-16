'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  UsersIcon, 
  BuildingOfficeIcon, 
  ShieldCheckIcon, 
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProperties: number;
  activeProperties: number;
  totalRoles: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

interface RecentActivity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'login';
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);

  const stats: DashboardStats = {
    totalUsers: 156,
    activeUsers: 134,
    totalProperties: 12,
    activeProperties: 11,
    totalRoles: 7,
    systemHealth: 'healthy'
  };

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      user: 'Maria Constantinou',
      action: 'Created new user account for John Smith',
      timestamp: '2 minutes ago',
      type: 'create'
    },
    {
      id: '2',
      user: 'Andreas Georgiou',
      action: 'Updated property settings for Cyprus Grand Resort',
      timestamp: '15 minutes ago',
      type: 'update'
    },
    {
      id: '3',
      user: 'Elena Papadopoulos',
      action: 'Logged into admin dashboard',
      timestamp: '1 hour ago',
      type: 'login'
    },
    {
      id: '4',
      user: 'Dimitris Ioannou',
      action: 'Deleted maintenance role',
      timestamp: '2 hours ago',
      type: 'delete'
    }
  ];

  const handleQuickAction = (action: string) => {
    setIsLoading(true);
    toast.loading(`Processing ${action}...`);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.dismiss();
      toast.success(`${action} completed successfully!`);
    }, 1500);
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'create':
        return <PlusIcon className="w-4 h-4 text-green-600" />;
      case 'update':
        return <PencilIcon className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <TrashIcon className="w-4 h-4 text-red-600" />;
      case 'login':
        return <EyeIcon className="w-4 h-4 text-gray-600" />;
      default:
        return <EyeIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'login':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back to PMS Admin</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleQuickAction('System refresh')}
            disabled={isLoading}
            className="btn-secondary"
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => handleQuickAction('Export report')}
            disabled={isLoading}
            className="btn-primary"
          >
            📊 Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              <p className="text-xs text-green-600 mt-1">
                {stats.activeUsers} active
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Properties</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              <p className="text-xs text-green-600 mt-1">
                {stats.activeProperties} active
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BuildingOfficeIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">User Roles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRoles}</p>
              <p className="text-xs text-gray-600 mt-1">
                Configured
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-green-600">Healthy</p>
              <p className="text-xs text-gray-600 mt-1">
                All systems operational
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getActivityColor(activity.type)
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => handleQuickAction('Add new user')}
                disabled={isLoading}
                className="w-full btn-primary text-left"
              >
                <UsersIcon className="w-5 h-5 mr-2 inline" />
                Add New User
              </button>
              <button
                onClick={() => handleQuickAction('Add new property')}
                disabled={isLoading}
                className="w-full btn-success text-left"
              >
                <BuildingOfficeIcon className="w-5 h-5 mr-2 inline" />
                Add New Property
              </button>
              <button
                onClick={() => handleQuickAction('Generate system report')}
                disabled={isLoading}
                className="w-full btn-secondary text-left"
              >
                <ChartBarIcon className="w-5 h-5 mr-2 inline" />
                Generate Report
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="status-active">Healthy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Services</span>
                  <span className="status-active">Running</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cache</span>
                  <span className="status-active">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <span className="status-warning">Slow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}