import React, { createContext, useContext, useState, useCallback } from 'react';
import Notification from './Notification';
import './NotificationProvider.css';

interface NotificationData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

interface NotificationContextType {
  notifications: NotificationData[];
  addNotification: (notification: Omit<NotificationData, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
  maxNotifications?: number;
  defaultPosition?: NotificationData['position'];
  defaultDuration?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  maxNotifications = 5,
  defaultPosition = 'top-right',
  defaultDuration = 5000
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationData, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newNotification: NotificationData = {
      ...notification,
      id,
      position: notification.position || defaultPosition,
      duration: notification.duration !== undefined ? notification.duration : defaultDuration
    };

    setNotifications(prev => {
      const updated = [...prev, newNotification];
      // Remove oldest notifications if we exceed the limit
      if (updated.length > maxNotifications) {
        return updated.slice(-maxNotifications);
      }
      return updated;
    });

    return id;
  }, [maxNotifications, defaultPosition, defaultDuration]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="notification-container">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={removeNotification}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
