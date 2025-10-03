import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setJobs } from '../store/slices/jobsSlice';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FilterPanel from '../components/FilterPanel';
import Footer from '../components/Footer';
import { Job } from '../types';
import JobList from '../components/JobList';
import CallToAction from '../components/CallToAction';

// Моковые данные для демонстрации
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Разработка лендинга для стартапа',
    description: 'Нужен современный лендинг для IT-стартапа. Требования: адаптивный дизайн, быстрая загрузка, интеграция с CRM. Предпочтение React/Next.js.',
    category: 'IT и программирование',
    price: 50000,
    currency: 'KGS',
    deadline: '2024-02-15',
    location: 'Бишкек',
    urgency: 'high',
    status: 'open',
    clientId: 'client1',
    clientName: 'Акмат Акматов / Akmat Akmatov',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Дизайн логотипа для кафе',
    description: 'Создание логотипа для нового кафе в центре города. Стиль: современный, минималистичный. Цвета: зеленый и белый.',
    category: 'Дизайн',
    price: 15000,
    currency: 'KGS',
    deadline: '2024-02-20',
    location: 'Ош',
    urgency: 'medium',
    status: 'open',
    clientId: 'client2',
    clientName: 'Айгуль Токтосунова / Aigul Toktosunova',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'Написание статей для блога',
    description: 'Нужен копирайтер для написания 10 статей на тему "Здоровый образ жизни". Объем: 2000-3000 символов каждая.',
    category: 'Копирайтинг',
    price: 25000,
    currency: 'KGS',
    deadline: '2024-02-25',
    location: 'Удаленно',
    urgency: 'low',
    status: 'open',
    clientId: 'client3',
    clientName: 'Азамат Бакиров / Azamat Bakirov',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13'
  },
  {
    id: '4',
    title: 'Перевод документов с английского',
    description: 'Перевод технической документации с английского на русский язык. Объем: 50 страниц. Срок: 2 недели.',
    category: 'Переводы',
    price: 30000,
    currency: 'KGS',
    deadline: '2024-02-18',
    location: 'Удаленно',
    urgency: 'medium',
    status: 'open',
    clientId: 'client4',
    clientName: 'Айдана Абдырова / Aida Abdyrova',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: '5',
    title: 'Настройка рекламы в Google Ads',
    description: 'Настройка и запуск рекламной кампании в Google Ads для интернет-магазина одежды. Бюджет: 100,000 руб/месяц.',
    category: 'Маркетинг',
    price: 40000,
    currency: 'KGS',
    deadline: '2024-02-22',
    location: 'Москва',
    urgency: 'high',
    status: 'open',
    clientId: 'client5',
    clientName: 'Арсен Алиев / Arsen Aliev',
    createdAt: '2024-01-11',
    updatedAt: '2024-01-11'
  }
];

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    // Имитация загрузки данных
    // dispatch(setLoading(true)); // Удалено из jobsSlice
    
    setTimeout(() => {
      dispatch(setJobs(mockJobs));
      // dispatch(setLoading(false)); // Удалено из jobsSlice
    }, 1000);
  }, [dispatch]);

  const handleApply = (jobId: string) => {
    // Здесь будет логика отклика на задание
    console.log('Отклик на задание:', jobId);
    alert('Отклик отправлен! Мы свяжемся с вами в ближайшее время.');
  };



  return (
    <div className="home-page">
      <Navbar />
      <HeroSection />
      <FilterPanel />
      <JobList onApply={handleApply} />
      <CallToAction
        title="Присоединяйтесь к нашей платформе"
        description="Тысячи пользователей уже нашли работу или исполнителей благодаря WorkUp"
        primaryAction={{
          label: 'Создать задание',
          onClick: () => console.log('Create job clicked')
        }}
        secondaryAction={{
          label: 'Найти работу',
          onClick: () => console.log('Find job clicked')
        }}
        variant="primary"
      />
      <Footer />
    </div>
  );
};

export default HomePage;