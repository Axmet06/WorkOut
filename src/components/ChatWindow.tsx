import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
// import { addMessage } from '../store/slices/chatSlice'; // Удалено из chatSlice
import { Message } from '../types';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import { useI18n } from '../contexts/I18nContext';
import './ChatWindow.css';

interface ChatWindowProps {
  conversationId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId }) => {
  const dispatch = useDispatch();
  const { currentConversation } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const { formatName } = useI18n();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Моковые сообщения для демонстрации
  const mockMessages: Message[] = [
    {
      id: 'msg_1',
      senderId: 'client1',
      senderName: 'Акмат Акматов / Akmat Akmatov',
      content: 'Здравствуйте! Интересует ваше предложение по разработке лендинга.',
      timestamp: '2024-01-15T10:00:00Z',
      isRead: true
    },
    {
      id: 'msg_2',
      senderId: 'executor1',
      senderName: 'Айдар Нурматов / Aidar Nurmato',
      content: 'Привет! Да, я готов взяться за ваш проект. Расскажите подробнее о требованиях.',
      timestamp: '2024-01-15T10:05:00Z',
      isRead: true
    },
    {
      id: 'msg_3',
      senderId: 'client1',
      senderName: 'Акмат Акматов / Akmat Akmatov',
      content: 'Нужен современный лендинг для IT-стартапа. Требования: адаптивный дизайн, быстрая загрузка, интеграция с CRM.',
      timestamp: '2024-01-15T10:10:00Z',
      isRead: true
    },
    {
      id: 'msg_4',
      senderId: 'executor1',
      senderName: 'Айдар Нурматов / Aidar Nurmato',
      content: 'Понял. Какой у вас бюджет и сроки?',
      timestamp: '2024-01-15T10:15:00Z',
      isRead: false
    }
  ];

  useEffect(() => {
    // Загружаем сообщения для текущего разговора
    if (conversationId) {
      // В реальном приложении здесь будет запрос к API
      // dispatch(setMessages(mockMessages));
    }
  }, [conversationId, dispatch]);

  useEffect(() => {
    // Прокручиваем к последнему сообщению
    scrollToBottom();
  }, [mockMessages]);

  useEffect(() => {
    // Помечаем сообщения как прочитанные при открытии чата
    if (currentConversation && user) {
      // dispatch(markMessagesAsRead(currentConversation.id)); // Удалено из chatSlice
    }
  }, [currentConversation, user, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string, attachments?: File[]) => {
    if (!user || !currentConversation) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    // dispatch(addMessage(newMessage)); // Удалено из chatSlice

    // Имитация ответа от собеседника через 2-3 секунды
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const replyMessage: Message = {
          id: `msg_${Date.now()}_reply`,
          senderId: currentConversation.clientId === user.id ? currentConversation.executorId : currentConversation.clientId,
          senderName: formatName(currentConversation.clientId === user.id ? currentConversation.executorName : currentConversation.clientName),
          content: 'Спасибо за сообщение! Я отвечу в ближайшее время.',
          timestamp: new Date().toISOString(),
          isRead: false
        };
        // dispatch(addMessage(replyMessage)); // Удалено из chatSlice
      }, 2000 + Math.random() * 1000);
    }
  };

  const getOtherParticipant = () => {
    if (!currentConversation || !user) return null;
    
    return {
      id: currentConversation.clientId === user.id ? currentConversation.executorId : currentConversation.clientId,
      name: formatName(currentConversation.clientId === user.id ? currentConversation.executorName : currentConversation.clientName)
    };
  };

  const otherParticipant = getOtherParticipant();

  if (!currentConversation) {
    return (
      <div className="chat-window">
        <div className="no-conversation">
          <div className="no-conversation-icon">💬</div>
          <h3>Выберите разговор</h3>
          <p>Выберите диалог из списка, чтобы начать общение</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-participant">
          <div className="participant-avatar">
            {otherParticipant?.name.charAt(0).toUpperCase()}
          </div>
          <div className="participant-info">
            <h3 className="participant-name">{otherParticipant?.name}</h3>
            <span className="participant-status">в сети</span>
          </div>
        </div>
        
        <div className="chat-actions">
          <button className="action-btn" title="Информация">
            ℹ️
          </button>
          <button className="action-btn" title="Настройки">
            ⚙️
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {mockMessages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">📝</div>
            <p>Начните общение с {otherParticipant?.name}</p>
          </div>
        ) : (
          mockMessages.map((message, index) => {
            const isOwn = message.senderId === user?.id;
            const showAvatar = index === 0 || mockMessages[index - 1].senderId !== message.senderId;
            
            return (
              <MessageItem
                key={message.id}
                message={message}
                isOwn={isOwn}
                showAvatar={showAvatar}
              />
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        onSendMessage={handleSendMessage}
        placeholder={`Написать ${otherParticipant?.name}...`}
      />
    </div>
  );
};

export default ChatWindow;