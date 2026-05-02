import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  MapIcon,
  ChartBarIcon,
  CpuChipIcon,
  BellIcon,
  DocumentTextIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Map View', href: '/map', icon: MapIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Simulator', href: '/simulator', icon: CpuChipIcon },
    { name: 'Alerts', href: '/alerts', icon: BellIcon },
    { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
    { name: 'Users', href: '/users', icon: UserGroupIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-52 bg-[#111827] border-r border-slate-700 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and User Profile */}
          <div className="px-4 py-5 border-b border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-sm">
                <img 
                  src="/logo.jpeg" 
                  alt="NeerSetu Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-100">NeerSetu</span>
                <p className="text-xs text-slate-400">Water Quality Monitor</p>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-300 font-semibold text-sm">AU</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-100 truncate">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@neersetu.com</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-500/20 text-blue-200 shadow-sm border border-blue-400/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100 hover:shadow-sm'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Emergency Alert Button */}
          <div className="p-4 border-t border-slate-700">
            <Link to="/alerts" onClick={onClose} className="w-full block">
            <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              Emergency Alert
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
