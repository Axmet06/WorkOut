import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/PageTemplate.css';
import './ReviewsPage.css';

const ReviewsPage: React.FC = () => {
  const { t } = useI18n();

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      name: 'Александр Петров',
      role: 'Веб-разработчик',
      rating: 5,
      date: '2024-01-15',
      content: 'Отличная платформа для поиска работы! За месяц нашел 3 проекта на общую сумму 150,000 рублей. Все заказчики были вежливыми и профессиональными.',
      project: 'Разработка корпоративного сайта'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      role: 'Дизайнер',
      rating: 5,
      date: '2024-01-10',
      content: 'Работаю через WorkUp уже полгода. Платформа помогла мне вырасти как специалисту и найти постоянных клиентов. Система отзывов очень удобна.',
      project: 'Дизайн мобильного приложения'
    },
    {
      id: 3,
      name: 'Дмитрий Сидоров',
      role: 'Бизнесмен',
      rating: 4,
      date: '2024-01-05',
      content: 'Нашел отличных исполнителей для своего бизнеса. Экономлю до 40% бюджета на аутсорсинге. Единственное замечание - иногда сложно найти специалистов высокого уровня.',
      project: 'Маркетинговая кампания'
    },
    {
      id: 4,
      name: 'Елена Козлова',
      role: 'Копирайтер',
      rating: 5,
      date: '2023-12-28',
      content: 'Платформа спасла меня во время пандемии. Могу работать из дома и выбирать проекты, которые мне интересны. Оплата всегда вовремя.',
      project: 'Написание статей для блога'
    },
    {
      id: 5,
      name: 'Андрей Морозов',
      role: 'Маркетолог',
      rating: 4,
      date: '2023-12-20',
      content: 'Хорошая платформа для поиска фрилансеров. Интерфейс понятный, система безопасности на высоте. Хотелось бы больше способов оплаты.',
      project: 'SEO-оптимизация сайта'
    },
    {
      id: 6,
      name: 'Ольга Николаева',
      role: 'Переводчик',
      rating: 5,
      date: '2023-12-15',
      content: 'Работаю через WorkUp больше года. Платформа помогла мне выйти на международных клиентов. Служба поддержки всегда отзывчива.',
      project: 'Перевод технической документации'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star-filled' : 'star-empty'}>
        ★
      </span>
    ));
  };

  return (
    <div className="page-template">
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Отзывы пользователей</h1>
          <p className="page-subtitle">Что говорят наши клиенты и исполнители</p>
        </div>
        
        <div className="page-body">
          <div className="reviews-summary">
            <div className="rating-overview">
              <div className="rating-score">
                <span className="score">4.7</span>
                <div className="rating-stars">
                  {renderStars(5)}
                </div>
                <p className="rating-count">На основе 128 отзывов</p>
              </div>
            </div>
            
            <div className="rating-stats">
              <div className="stat-item">
                <span className="stat-label">5 звезд</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: '70%' }}></div>
                </div>
                <span className="stat-value">70%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">4 звезды</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: '20%' }}></div>
                </div>
                <span className="stat-value">20%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">3 звезды</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: '7%' }}></div>
                </div>
                <span className="stat-value">7%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">2 звезды</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: '2%' }}></div>
                </div>
                <span className="stat-value">2%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">1 звезда</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: '1%' }}></div>
                </div>
                <span className="stat-value">1%</span>
              </div>
            </div>
          </div>
          
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h3 className="reviewer-name">{review.name}</h3>
                    <p className="reviewer-role">{review.role}</p>
                  </div>
                  <div className="review-rating">
                    <div className="stars">
                      {renderStars(review.rating)}
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="review-content">
                  <h4 className="project-title">Проект: {review.project}</h4>
                  <p className="review-text">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="reviews-cta">
            <h2>Поделитесь своим опытом</h2>
            <p>Ваш отзыв поможет другим пользователям сделать правильный выбор</p>
            <button className="cta-button">Оставить отзыв</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsPage;