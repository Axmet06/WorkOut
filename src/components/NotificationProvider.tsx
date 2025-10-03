import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import Notification from './Notification';
import './NotificationProvider.css';

interface Notification {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

interface NotificationContextType {
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now().toString() }]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };
    default:
      return state;
  }
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { notifications: [] });

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification as Notification });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const contextValue: NotificationContextType = {
    addNotification,
    removeNotification,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <div className="notification-container">
        {state.notifications.map(notification => (
          <Notification
            key={notification.id}
            id={notification.id}
            title={notification.title}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={removeNotification}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};