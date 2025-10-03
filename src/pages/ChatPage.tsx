import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCurrentConversation, setConversations } from '../store/slices/chatSlice';
import Navbar from '../components/Navbar';
import ChatWindow from '../components/ChatWindow';
import ChatList from '../components/ChatList';
import Footer from '../components/Footer';
import { Conversation } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { conversations, currentConversation } = useSelector((state: RootState) => state.chat);
  const { t } = useI18n();

  // Моковые данные для чатов
  const mockConversations: Conversation[] = [
    {
      id: 'conv_1',
      jobId: '1',
      clientId: 'client1',
      executorId: 'executor1',
      clientName: 'Акмат Акматов / Akmat Akmatov',
      executorName: 'Айдар Нурматов / Aidar Nurmato',
      unreadCount: 2,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      lastMessage: {
        id: 'msg_1',
        senderId: 'client1',
        senderName: 'Акмат Акматов / Akmat Akmatov',
        content: 'Когда сможете начать работу?',
        timestamp: '2024-01-15T14:30:00Z',
        isRead: false
      }
    },
    {
      id: 'conv_2',
      jobId: '2',
      clientId: 'client2',
      executorId: 'executor1',
      clientName: 'Мария Сидорова / Maria Sidorova',
      executorName: 'Айдар Нурматов / Aidar Nurmato',
      unreadCount: 0,
      createdAt: '2024-01-14T15:00:00Z',
      updatedAt: '2024-01-14T16:45:00Z',
      lastMessage: {
        id: 'msg_2',
        senderId: 'executor1',
        senderName: 'Айдар Нурматов / Aidar Nurmato',
        content: 'Отлично! Приступаю к работе.',
        timestamp: '2024-01-14T16:45:00Z',
        isRead: true
      }
    },
    {
      id: 'conv_3',
      jobId: '3',
      clientId: 'client1',
      executorId: 'executor2',
      clientName: 'Акмат Акматов / Akmat Akmatov',
      executorName: 'Айдана Абдырова / Aida Abdyrova',
      unreadCount: 1,
      createdAt: '2024-01-13T09:00:00Z',
      updatedAt: '2024-01-15T11:20:00Z',
      lastMessage: {
        id: 'msg_3',
        senderId: 'executor2',
        senderName: 'Айдана Абдырова / Aida Abdyrova',
        content: 'Документы готовы, отправляю на проверку.',
        timestamp: '2024-01-15T11:20:00Z',
        isRead: false
      }
    }
  ];

  useEffect(() => {
    // Проверяем авторизацию
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Загружаем моковые данные чатов
    dispatch(setConversations(mockConversations));

    // Если передан ID чата, находим и устанавливаем его как текущий
    if (id) {
      const conversation = mockConversations.find(conv => conv.id === id);
      if (conversation) {
        dispatch(setCurrentConversation(conversation));
      } else {
        // Если чат не найден, перенаправляем на страницу чатов
        navigate('/chat');
      }
    }
  }, [id, isAuthenticated, navigate, dispatch]);

  const handleConversationSelect = (conversation: Conversation) => {
    navigate(`/chat/${conversation.id}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="chat-page">
        <Navbar />
        <div className="access-denied">
          <div className="access-denied-content">
            <h1>{t('chat.accessDenied')}</h1>
            <p>{t('chat.loginRequired')}</p>
            <button 
              className="login-btn"
              onClick={() => navigate('/login')}
            >
              {t('chat.login')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="chat-page">
      <Navbar />
      
      <div className="chat-container">
        <div className="chat-sidebar">
          <ChatList onConversationSelect={handleConversationSelect} />
        </div>
        
        <div className="chat-main">
          {id ? (
            <ChatWindow conversationId={id} />
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-icon">💬</div>
              <h2>{t('chat.selectConversation')}</h2>
              <p>{t('chat.selectConversationDesc')}</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatPage;