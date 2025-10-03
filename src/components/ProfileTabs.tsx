import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import UserJobsTab from './UserJobsTab';
import EarningsHistoryTab from './EarningsHistoryTab';
import ProfileSettingsTab from './ProfileSettingsTab';
import './ProfileTabs.css';

type TabType = 'jobs' | 'earnings' | 'settings';

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const { user } = useSelector((state: RootState) => state.auth);

  const tabs = [
    {
      id: 'jobs' as TabType,
      label: 'Мои задания',
      icon: '📋',
      count: 0 // Будет подсчитано в компоненте
    },
    {
      id: 'earnings' as TabType,
      label: 'История заработка',
      icon: '💰',
      count: 0
    },
    {
      id: 'settings' as TabType,
      label: 'Настройки',
      icon: '⚙️',
      count: 0
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'jobs':
        return <UserJobsTab />;
      case 'earnings':
        return <EarningsHistoryTab />;
      case 'settings':
        return <ProfileSettingsTab />;
      default:
        return <UserJobsTab />;
    }
  };

  return (
    <div className="profile-tabs">
      <div className="tabs-header">
        <div className="tabs-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {tab.count > 0 && (
                <span className="tab-count">{tab.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfileTabs;

