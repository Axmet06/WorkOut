import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCurrentConversation } from '../store/slices/chatSlice';
import { Conversation } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './ChatList.css';

interface ChatListProps {
  onConversationSelect?: (conversation: Conversation) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onConversationSelect }) => {
  const dispatch = useDispatch();
  const { conversations, currentConversation } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const { formatName } = useI18n();

  const handleConversationClick = (conversation: Conversation) => {
    dispatch(setCurrentConversation(conversation));
    if (onConversationSelect) {
      onConversationSelect(conversation);
    }
  };

  const getOtherParticipant = (conversation: Conversation) => {
    if (!user) return null;
    
    return {
      id: conversation.clientId === user.id ? conversation.executorId : conversation.clientId,
      name: formatName(conversation.clientId === user.id ? conversation.executorName : conversation.clientName)
    };
  };

  const formatLastMessageTime = (timestamp: string) => {
    const messageTime = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'только что';
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 48) {
      return 'вчера';
    } else {
      return messageTime.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
      });
    }
  };

  const truncateMessage = (message: string, maxLength: number = 50) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (conversations.length === 0) {
    return (
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Сообщения</h2>
        </div>
        <div className="no-conversations">
          <div className="no-conversations-icon">💬</div>
          <h3>Нет сообщений</h3>
          <p>У вас пока нет активных диалогов</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Сообщения</h2>
        <span className="conversations-count">{conversations.length}</span>
      </div>

      <div className="conversations-list">
        {conversations.map(conversation => {
          const otherParticipant = getOtherParticipant(conversation);
          const isActive = currentConversation?.id === conversation.id;
          const hasUnread = conversation.unreadCount > 0;

          return (
            <div
              key={conversation.id}
              className={`conversation-item ${isActive ? 'active' : ''} ${hasUnread ? 'unread' : ''}`}
              onClick={() => handleConversationClick(conversation)}
            >
              <div className="conversation-avatar">
                {otherParticipant?.name.charAt(0).toUpperCase()}
              </div>

              <div className="conversation-content">
                <div className="conversation-header">
                  <h3 className="conversation-name">{otherParticipant?.name}</h3>
                  {conversation.lastMessage && (
                    <span className="conversation-time">
                      {formatLastMessageTime(conversation.lastMessage.timestamp)}
                    </span>
                  )}
                </div>

                <div className="conversation-preview">
                  {conversation.lastMessage ? (
                    <p className="last-message">
                      {truncateMessage(conversation.lastMessage.content)}
                    </p>
                  ) : (
                    <p className="no-messages">Нет сообщений</p>
                  )}
                  
                  {hasUnread && (
                    <span className="unread-badge">
                      {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;