import React from 'react';
import Avatar from './Avatar';
import './TeamMember.css';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface TeamMemberProps {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name,
  role,
  bio,
  avatar,
  socialLinks = [],
  className = ''
}) => {
  const classes = `team-member ${className}`.trim();

  return (
    <div className={classes}>
      <div className="team-member-avatar">
        <Avatar 
          src={avatar} 
          name={name} 
          size="xlarge" 
          shape="rounded"
        />
      </div>
      
      <div className="team-member-info">
        <h3 className="team-member-name">{name}</h3>
        <div className="team-member-role">{role}</div>
        
        {bio && (
          <p className="team-member-bio">{bio}</p>
        )}
        
        {socialLinks.length > 0 && (
          <div className="team-member-social">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="team-member-social-link"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;