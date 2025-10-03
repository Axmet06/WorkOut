import React from 'react';
import Avatar from './Avatar';
import Badge from './Badge';
import './ProfileCard.css';

interface ProfileCardProps {
  name: string;
  title?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  location?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  role?: string;
  joinDate?: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
  actions?: React.ReactNode;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  name,
  title,
  avatar,
  email,
  phone,
  location,
  status,
  role,
  joinDate,
  stats = [],
  actions,
  className = ''
}) => {
  const classes = `profile-card ${className}`.trim();

  const getStatusBadge = () => {
    switch (status) {
      case 'online': return <Badge variant="success" size="small">Online</Badge>;
      case 'offline': return <Badge variant="secondary" size="small">Offline</Badge>;
      case 'busy': return <Badge variant="error" size="small">Busy</Badge>;
      case 'away': return <Badge variant="warning" size="small">Away</Badge>;
      default: return null;
    }
  };

  return (
    <div className={classes}>
      <div className="profile-card-header">
        <div className="profile-card-avatar">
          <Avatar 
            src={avatar} 
            name={name} 
            size="large" 
          />
          {status && (
            <div className={`profile-card-status profile-card-status-${status}`}>
              {getStatusBadge()}
            </div>
          )}
        </div>
        
        <div className="profile-card-info">
          <div className="profile-card-name">{name}</div>
          {title && <div className="profile-card-title">{title}</div>}
          {role && <div className="profile-card-role">{role}</div>}
        </div>
      </div>
      
      <div className="profile-card-details">
        {email && (
          <div className="profile-card-detail">
            <span className="profile-card-detail-label">Email:</span>
            <span className="profile-card-detail-value">{email}</span>
          </div>
        )}
        
        {phone && (
          <div className="profile-card-detail">
            <span className="profile-card-detail-label">Phone:</span>
            <span className="profile-card-detail-value">{phone}</span>
          </div>
        )}
        
        {location && (
          <div className="profile-card-detail">
            <span className="profile-card-detail-label">Location:</span>
            <span className="profile-card-detail-value">{location}</span>
          </div>
        )}
        
        {joinDate && (
          <div className="profile-card-detail">
            <span className="profile-card-detail-label">Joined:</span>
            <span className="profile-card-detail-value">{joinDate}</span>
          </div>
        )}
      </div>
      
      {stats.length > 0 && (
        <div className="profile-card-stats">
          {stats.map((stat, index) => (
            <div key={index} className="profile-card-stat">
              <div className="profile-card-stat-value">{stat.value}</div>
              <div className="profile-card-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      
      {actions && (
        <div className="profile-card-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;