import React from 'react';
import { Message } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './MessageItem.css';

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isOwn, showAvatar = true }) => {
  const { formatName } = useI18n();

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return messageDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
      });
    }
  };

  return (
    <div className={`message-item ${isOwn ? 'own' : 'other'}`}>
      {!isOwn && showAvatar && (
        <div className="message-avatar">
          {formatName(message.senderName).charAt(0).toUpperCase()}
        </div>
      )}
      
      <div className="message-content">
        {!isOwn && (
          <div className="message-sender">
            {formatName(message.senderName)}
          </div>
        )}
        
        <div className="message-bubble">
          <div className="message-text">
            {message.content}
          </div>
          
          <div className="message-meta">
            <span className="message-time">
              {formatTime(message.timestamp)}
            </span>
            {isOwn && (
              <span className={`message-status ${message.isRead ? 'read' : 'sent'}`}>
                {message.isRead ? '✓✓' : '✓'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;