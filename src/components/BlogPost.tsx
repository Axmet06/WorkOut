import React from 'react';
import Avatar from './Avatar';
import './BlogPost.css';

interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

interface BlogPostProps {
  title: string;
  excerpt?: string;
  content: string;
  author: Author;
  date: string;
  readTime?: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  className?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ 
  title,
  excerpt,
  content,
  author,
  date,
  readTime,
  tags = [],
  image,
  imageAlt = '',
  className = ''
}) => {
  const classes = `blog-post ${className}`.trim();

  return (
    <article className={classes}>
      <header className="blog-post-header">
        <h1 className="blog-post-title">{title}</h1>
        
        <div className="blog-post-meta">
          <div className="blog-post-author">
            <Avatar 
              src={author.avatar} 
              name={author.name} 
              size="small" 
            />
            <div className="blog-post-author-info">
              <div className="blog-post-author-name">{author.name}</div>
              <div className="blog-post-meta-info">
                <time dateTime={date}>{date}</time>
                {readTime && <span> • {readTime} read</span>}
              </div>
            </div>
          </div>
          
          {tags.length > 0 && (
            <div className="blog-post-tags">
              {tags.map((tag, index) => (
                <span key={index} className="blog-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      
      {image && (
        <div className="blog-post-image">
          <img src={image} alt={imageAlt} className="blog-post-image-element" />
        </div>
      )}
      
      {excerpt && (
        <p className="blog-post-excerpt">{excerpt}</p>
      )}
      
      <div 
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {author.bio && (
        <div className="blog-post-author-bio">
          <h3>About the Author</h3>
          <p>{author.bio}</p>
        </div>
      )}
    </article>
  );
};

export default BlogPost;