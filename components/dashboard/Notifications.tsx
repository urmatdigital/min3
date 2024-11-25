import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  created_at: string;
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">Уведомления</h3>
        <span className="text-sm text-gray-500">
          {notifications.filter((n) => !n.read).length} новых
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 p-3 rounded-lg ${
                !notification.read ? 'bg-gray-50' : ''
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="flex-shrink-0">{getIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
