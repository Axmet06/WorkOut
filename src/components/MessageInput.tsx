import React, { useState, useRef } from 'react';
import './MessageInput.css';

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Напишите сообщение..." 
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Имитация индикатора "печатает"
    if (e.target.value.length > 0 && !isTyping) {
      setIsTyping(true);
    } else if (e.target.value.length === 0 && isTyping) {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments);
      setMessage('');
      setAttachments([]);
      setIsTyping(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
      
      if (file.size > maxSize) {
        alert(`Файл ${file.name} слишком большой. Максимальный размер: 10MB`);
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert(`Тип файла ${file.name} не поддерживается`);
        return false;
      }
      
      return true;
    });
    
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="message-input">
      {attachments.length > 0 && (
        <div className="attachments-preview">
          {attachments.map((file, index) => (
            <div key={index} className="attachment-item">
              <div className="attachment-info">
                <span className="attachment-name">{file.name}</span>
                <span className="attachment-size">{formatFileSize(file.size)}</span>
              </div>
              <button 
                className="remove-attachment"
                onClick={() => removeAttachment(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="input-container">
        <div className="input-actions">
          <button 
            type="button"
            className="attach-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            title="Прикрепить файл"
          >
            📎
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.txt"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
        
        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="message-textarea"
          rows={1}
        />
        
        <button 
          type="button"
          className="send-btn"
          onClick={handleSendMessage}
          disabled={disabled || (!message.trim() && attachments.length === 0)}
        >
          ➤
        </button>
      </div>
      
      {isTyping && (
        <div className="typing-indicator">
          <span>Печатает...</span>
        </div>
      )}
    </div>
  );
};

export default MessageInput;

