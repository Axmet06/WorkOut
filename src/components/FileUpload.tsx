import React, { useState, useRef, DragEvent } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onFileSelect?: (files: FileList | null) => void;
  onFileRemove?: (file: File) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  label?: string;
  description?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect,
  onFileRemove,
  multiple = false,
  accept,
  maxSize,
  maxFiles,
  label = 'Upload files',
  description = 'Drag and drop files here or click to browse',
  className = ''
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const classes = `file-upload ${isDragging ? 'file-upload-dragging' : ''} ${className}`.trim();

  const validateFile = (file: File): string | null => {
    // Check file type
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        } else if (type.includes('/')) {
          return file.type === type;
        } else {
          return file.type.startsWith(type);
        }
      });
      
      if (!isValidType) {
        return `Invalid file type: ${file.name}`;
      }
    }

    // Check file size
    if (maxSize && file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
      return `File too large: ${file.name} (${maxSizeMB}MB max)`;
    }

    return null;
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Check max files limit
    const totalFiles = files.length + selectedFiles.length;
    if (maxFiles && totalFiles > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      setErrors(newErrors);
      return;
    }

    // Validate each file
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const error = validateFile(file);
      
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : [validFiles[0]];
      setFiles(updatedFiles);
      if (onFileSelect) onFileSelect(multiple ? 
        new FileListWrapper(updatedFiles) : 
        new FileListWrapper([validFiles[0]])
      );
    }

    // Clear input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    const updatedFiles = files.filter(file => file !== fileToRemove);
    setFiles(updatedFiles);
    if (onFileRemove) onFileRemove(fileToRemove);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper class to simulate FileList from array
  class FileListWrapper implements FileList {
    [index: number]: File;
    length: number;

    constructor(files: File[]) {
      this.length = files.length;
      files.forEach((file, index) => {
        this[index] = file;
      });
    }

    item(index: number): File | null {
      return this[index] || null;
    }

    [Symbol.iterator](): IterableIterator<File> {
      let index = -1;
      const data = this;
      return {
        next(): IteratorResult<File> {
          index++;
          return {
            value: data[index],
            done: index >= data.length
          };
        }
      } as IterableIterator<File>;
    }
  }

  return (
    <div className={classes}>
      <div 
        className="file-upload-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="file-upload-input"
        />
        <div className="file-upload-content">
          <div className="file-upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
          </div>
          <h3 className="file-upload-label">{label}</h3>
          <p className="file-upload-description">{description}</p>
          {accept && (
            <p className="file-upload-info">
              Accepted formats: {accept}
            </p>
          )}
          {maxSize && (
            <p className="file-upload-info">
              Max file size: {formatFileSize(maxSize)}
            </p>
          )}
        </div>
      </div>
      
      {errors.length > 0 && (
        <div className="file-upload-errors">
          {errors.map((error, index) => (
            <div key={index} className="file-upload-error">
              {error}
            </div>
          ))}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="file-upload-list">
          {files.map((file, index) => (
            <div key={index} className="file-upload-item">
              <div className="file-upload-item-info">
                <div className="file-upload-item-name">{file.name}</div>
                <div className="file-upload-item-size">{formatFileSize(file.size)}</div>
              </div>
              <button 
                className="file-upload-item-remove"
                onClick={() => handleFileRemove(file)}
                aria-label="Remove file"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;