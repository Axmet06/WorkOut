import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addConversation, setCurrentConversation } from '../store/slices/chatSlice';
import { Conversation } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './ChatPreview.css';

interface ChatPreviewProps {
  jobId: string;
  clientId: string;
  clientName: string;
  onStartChat?: (conversationId: string) => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ jobId, clientId, clientName, onStartChat }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { conversations } = useSelector((state: RootState) => state.chat);
  const { formatName } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Ищем существующий разговор
  const existingConversation = conversations.find(
    conv => conv.jobId === jobId && 
    ((conv.clientId === clientId && conv.executorId === user?.id) ||
     (conv.clientId === user?.id && conv.executorId === clientId))
  );

  const handleStartChat = () => {
    if (existingConversation) {
      // Открываем существующий чат
      dispatch(setCurrentConversation(existingConversation));
      if (onStartChat) {
        onStartChat(existingConversation.id);
      } else {
        // Fallback навигация
        window.location.href = `/chat/${existingConversation.id}`;
      }
    } else {
      // Открываем модальное окно для начала нового разговора
      setIsModalOpen(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !user) return;

    setIsSending(true);

    // Имитация создания разговора и отправки сообщения
    setTimeout(() => {
      const newConversation: Conversation = {
        id: `conv_${Date.now()}`,
        jobId,
        clientId,
        executorId: user.id,
        clientName: formatName(clientName),
        executorName: user.name,
        unreadCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastMessage: {
          id: `msg_${Date.now()}`,
          senderId: user.id,
          senderName: user.name,
          content: message,
          timestamp: new Date().toISOString(),
          isRead: false
        }
      };

      dispatch(addConversation(newConversation));
      dispatch(setCurrentConversation(newConversation));
      
      if (onStartChat) {
        onStartChat(newConversation.id);
      } else {
        // Fallback навигация
        window.location.href = `/chat/${newConversation.id}`;
      }
      
      setIsSending(false);
      setIsModalOpen(false);
      setMessage('');
      
      console.log('Создан новый чат:', newConversation.id);
    }, 1000);
  };

  const getUnreadCount = () => {
    if (!existingConversation) return 0;
    return existingConversation.unreadCount;
  };

  const getLastMessagePreview = () => {
    if (!existingConversation?.lastMessage) return null;
    
    const lastMsg = existingConversation.lastMessage;
    const isFromCurrentUser = lastMsg.senderId === user?.id;
    const senderName = isFromCurrentUser ? 'Вы' : formatName(lastMsg.senderName);
    
    return {
      text: `${senderName}: ${lastMsg.content}`,
      time: new Date(lastMsg.timestamp).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const lastMessage = getLastMessagePreview();
  const unreadCount = getUnreadCount();

  return (
    <>
      <div className="chat-preview" onClick={handleStartChat}>
        <div className="chat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        
        <div className="chat-info">
          <div className="chat-title">
            {existingConversation ? 'Продолжить переписку' : 'Начать переписку'}
          </div>
          
          {lastMessage ? (
            <div className="last-message">
              <div className="message-text">{lastMessage.text}</div>
              <div className="message-time">{lastMessage.time}</div>
            </div>
          ) : (
            <div className="no-messages">
              Нажмите, чтобы начать общение с {formatName(clientName)}
            </div>
          )}
        </div>
        
        <div className="chat-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12,5 19,12 12,19" />
          </svg>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Написать сообщение</h2>
              <button 
                className="close-btn" 
                onClick={() => setIsModalOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="chat-info-header">
              <div className="contact-info">
                <div className="contact-name">{formatName(clientName)}</div>
                <div className="contact-role">Заказчик</div>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="message-form">
              <div className="form-group">
                <label htmlFor="message">Ваше сообщение</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напишите сообщение заказчику..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSending}
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="send-btn"
                  disabled={isSending || !message.trim()}
                >
                  {isSending ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPreview;