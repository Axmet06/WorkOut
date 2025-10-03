import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedJob } from '../store/slices/jobsSlice';
import { setConversations } from '../store/slices/chatSlice';
import Navbar from '../components/Navbar';
import JobDetail from '../components/JobDetail';
import ApplyButton from '../components/ApplyButton';
import ChatPreview from '../components/ChatPreview';
import SimilarJobs from '../components/SimilarJobs';
import Footer from '../components/Footer';
import { Job, Conversation } from '../types';
import { useI18n } from '../contexts/I18nContext';
import './JobDetailPage.css';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedJob, list } = useSelector((state: RootState) => state.jobs);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useI18n();

  // Моковые данные для чатов
  const mockConversations: Conversation[] = [
    {
      id: 'conv_1',
      jobId: '1',
      clientId: 'client1',
      executorId: 'executor1',
      clientName: 'Алексей Петров',
      executorName: 'Иван Иванов',
      unreadCount: 2,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      lastMessage: {
        id: 'msg_1',
        senderId: 'client1',
        senderName: 'Алексей Петров',
        content: 'Когда сможете начать работу?',
        timestamp: '2024-01-15T14:30:00Z',
        isRead: false
      }
    }
  ];

  const mockJob = {
    id: '1',
    title: 'Разработка веб-сайта для малого бизнеса',
    description: 'Нам нужен современный и отзывчивый веб-сайт для нашего нового ресторана. Сайт должен включать в себя меню, галерею, контактную информацию и онлайн-бронирование столиков. Предпочтение отдается чистому и элегантному дизайну, который отражает атмосферу нашего заведения.',
    category: 'IT и программирование',
    price: 45000,
    currency: 'RUB',
    deadline: '2024-03-15',
    location: 'Бишкек',
    urgency: 'medium' as const,
    status: 'open' as const,
    clientId: 'client123',
    clientName: 'Айдар Мырзакматов',
    executorId: 'executor456',
    executorName: 'Ахмет Толонов',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    applications: [
      {
        id: 'app1',
        jobId: '1',
        executorId: 'executor456',
        executorName: 'Иван Иванов',
        message: 'У меня есть большой опыт в разработке веб-сайтов для ресторанов. Могу создать современный и функциональный сайт в срок.',
        price: 42000,
        createdAt: '2024-01-11'
      },
      {
        id: 'app2',
        jobId: '1',
        executorId: 'executor789',
        executorName: 'Мария Иванова',
        message: 'Я фрилансер с 5-летним опытом. Могу выполнить проект качественно и в установленные сроки.',
        price: 40000,
        createdAt: '2024-01-12'
      }
    ]
  };

  useEffect(() => {
    if (id) {
      // Ищем задание в списке
      const job = list.find(j => j.id === id);
      
      if (job) {
        dispatch(setSelectedJob(job));
      } else {
        // Если задание не найдено, перенаправляем на главную
        navigate('/');
      }
    }

    // Загружаем моковые данные чатов
    dispatch(setConversations(mockConversations));
  }, [id, list, dispatch, navigate]);

  const handleApply = (jobId: string, applicationData: any) => {
    console.log(`${t('jobList.apply')} на задание:`, jobId, applicationData);
    alert(`${t('jobList.apply')} успешно отправлен! Заказчик получит уведомление.`);
  };

  const handleJobClick = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  const handleStartChat = (conversationId: string) => {
    navigate(`/chat/${conversationId}`);
  };

  if (!selectedJob) {
    return (
      <div className="job-detail-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('jobList.loading')}...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <Navbar />
      
      <div className="job-detail-container">
        <div className="job-detail-main">
          <JobDetail job={selectedJob} />
          
          {isAuthenticated && user?.role === 'executor' && selectedJob.status === 'open' && (
            <div className="apply-section">
              <ApplyButton 
                jobId={selectedJob.id} 
                onApply={handleApply}
              />
            </div>
          )}

          {isAuthenticated && (
            <ChatPreview
              jobId={selectedJob.id}
              clientId={selectedJob.clientId}
              clientName={selectedJob.clientName}
              onStartChat={handleStartChat}
            />
          )}
        </div>

        <div className="job-detail-sidebar">
          <SimilarJobs 
            currentJob={selectedJob}
            onJobClick={handleJobClick}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetailPage;