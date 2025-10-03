import React from 'react';
import Avatar from './Avatar';
import './Comment.css';

interface CommentProps {
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes?: number;
  onLike?: () => void;
  liked?: boolean;
  replies?: CommentProps[];
  onReply?: () => void;
  className?: string;
}

const Comment: React.FC<CommentProps> = ({ 
  author,
  content,
  timestamp,
  likes = 0,
  onLike,
  liked = false,
  replies = [],
  onReply,
  className = ''
}) => {
  const classes = `comment ${className}`.trim();

  return (
    <div className={classes}>
      <div className="comment-header">
        <Avatar 
          src={author.avatar} 
          name={author.name} 
          size="small" 
        />
        <div className="comment-author-info">
          <div className="comment-author-name">{author.name}</div>
          <div className="comment-timestamp">{timestamp}</div>
        </div>
      </div>
      
      <div className="comment-content">
        {content}
      </div>
      
      <div className="comment-actions">
        <button 
          className={`comment-action comment-action-like ${liked ? 'comment-action-like-active' : ''}`}
          onClick={onLike}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {likes > 0 ? likes : ''}
        </button>
        <button 
          className="comment-action comment-action-reply"
          onClick={onReply}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Reply
        </button>
      </div>
      
      {replies.length > 0 && (
        <div className="comment-replies">
          {replies.map((reply, index) => (
            <Comment
              key={index}
              {...reply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;