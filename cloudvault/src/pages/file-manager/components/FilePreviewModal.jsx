import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FilePreviewModal = ({ file, isOpen, onClose, onAction }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen || !file) return null;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPreview = () => {
    switch (file.type) {
      case 'image':
        return (
          <div className="flex items-center justify-center h-full bg-black/5 rounded-lg">
            <Image
              src={file.url || file.thumbnail}
              alt={file.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );
      
      case 'video':
        return (
          <div className="flex items-center justify-center h-full bg-black rounded-lg">
            <video
              controls
              className="max-w-full max-h-full"
              src={file.url}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      
      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Music" size={64} color="var(--color-primary)" />
            </div>
            <audio controls className="w-full max-w-md">
              <source src={file.url} />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      
      case 'document':
      case 'pdf':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={64} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-muted-foreground text-center">
              Preview not available for this file type.\nClick download to view the file.
            </p>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="File" size={64} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-muted-foreground text-center">
              Preview not available for this file type.
            </p>
          </div>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-card rounded-lg shadow-pronounced overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <Icon name="Eye" size={20} color="var(--color-primary)" />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-foreground truncate">
                {file.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(file.size)} • Modified {formatDate(file.modifiedAt)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAction(file, 'download')}
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAction(file, 'share')}
              iconName="Share2"
              iconPosition="left"
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-4 overflow-hidden">
          {renderPreview()}
        </div>

        {/* Footer with file details */}
        <div className="border-t border-border p-4 bg-muted/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <p className="font-medium text-foreground capitalize">{file.type}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Size:</span>
              <p className="font-medium text-foreground">{formatFileSize(file.size)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Created:</span>
              <p className="font-medium text-foreground">
                {new Date(file.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Modified:</span>
              <p className="font-medium text-foreground">
                {new Date(file.modifiedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;