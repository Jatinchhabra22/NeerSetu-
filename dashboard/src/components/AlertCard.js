import React from 'react';
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const AlertCard = ({ alert, onAcknowledge, onResolve, onDismiss }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'emergency':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'risk_update':
        return <InformationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'awareness':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertColor = (type, priority) => {
    if (type === 'emergency' || priority === 'critical') return 'border-red-500/30 bg-red-500/10';
    if (priority === 'high') return 'border-orange-500/30 bg-orange-500/10';
    if (priority === 'medium') return 'border-yellow-500/30 bg-yellow-500/10';
    return 'border-blue-500/30 bg-blue-500/10';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'text-yellow-200 bg-yellow-500/20 border border-yellow-500/30';
      case 'delivered':
        return 'text-blue-200 bg-blue-500/20 border border-blue-500/30';
      case 'acknowledged':
        return 'text-green-200 bg-green-500/20 border border-green-500/30';
      case 'resolved':
        return 'text-slate-200 bg-slate-600/30 border border-slate-500/30';
      case 'escalated':
        return 'text-red-200 bg-red-500/20 border border-red-500/30';
      default:
        return 'text-slate-200 bg-slate-600/30 border border-slate-500/30';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className={`rounded-lg border p-4 ${getAlertColor(alert.type, alert.priority)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {getAlertIcon(alert.type)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-sm font-semibold text-slate-100">{alert.title}</h4>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                {alert.status}
              </span>
            </div>
            <p className="text-sm text-slate-200 mb-2">{alert.message}</p>
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span>Village: {alert.village}</span>
              <span>•</span>
              <span>{formatTime(alert.createdAt)}</span>
              {alert.riskIndex && (
                <>
                  <span>•</span>
                  <span>Risk: {alert.riskIndex}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {alert.status === 'sent' && (
            <button
              onClick={() => onAcknowledge(alert.id)}
            className="inline-flex items-center px-3 py-1 border border-blue-400/30 text-xs font-medium rounded-md text-blue-100 bg-blue-500/80 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              Acknowledge
            </button>
          )}
          
          {alert.status === 'acknowledged' && (
            <button
              onClick={() => onResolve(alert.id)}
            className="inline-flex items-center px-3 py-1 border border-green-400/30 text-xs font-medium rounded-md text-green-100 bg-green-500/80 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Resolve
            </button>
          )}
          
          <button
            onClick={() => onDismiss(alert.id)}
            className="text-slate-400 hover:text-slate-200"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {alert.escalationLevel > 1 && (
        <div className="mt-3 pt-3 border-t border-slate-700">
          <div className="flex items-center text-xs text-orange-300">
            <ClockIcon className="h-3 w-3 mr-1" />
            Escalated to Level {alert.escalationLevel}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertCard;
