import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileQueue = ({ files, onRemoveFile, onClearAll, isUploading }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'jpg': case'jpeg': case'png': case'gif': case'webp':
        return 'Image';
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'xls': case'xlsx':
        return 'FileSpreadsheet';
      case 'ppt': case'pptx':
        return 'Presentation';
      case 'zip': case'rar': case'7z':
        return 'Archive';
      case 'mp4': case'avi': case'mov': case'mkv':
        return 'Video';
      case 'mp3': case'wav': case'flac':
        return 'Music';
      default:
        return 'File';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'uploading':
        return 'var(--color-primary)';
      case 'error':
        return 'var(--color-destructive)';
      case 'paused':
        return 'var(--color-warning)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'uploading':
        return 'Loader2';
      case 'error':
        return 'AlertCircle';
      case 'paused':
        return 'Pause';
      default:
        return 'Clock';
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No files selected</p>
        <p className="text-sm text-muted-foreground mt-1">
          Files you select will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Upload Queue ({files.length} file{files.length !== 1 ? 's' : ''})
        </h3>
        {!isUploading && files.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            iconName="Trash2"
            iconPosition="left"
            className="text-destructive hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* File List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg hover:shadow-subtle transition-shadow"
          >
            {/* File Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon 
                  name={getFileIcon(file.name)} 
                  size={20} 
                  className="text-muted-foreground"
                />
              </div>
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </p>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getStatusIcon(file.status)} 
                    size={14} 
                    color={getStatusColor(file.status)}
                    className={file.status === 'uploading' ? 'animate-spin' : ''}
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {file.status || 'pending'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs font-mono text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
                
                {file.progress !== undefined && (
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-10">
                      {file.progress}%
                    </span>
                  </div>
                )}
                
                {file.speed && (
                  <span className="text-xs font-mono text-muted-foreground">
                    {file.speed}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0">
              {!isUploading && file.status !== 'completed' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFile(file.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
              
              {file.status === 'uploading' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Icon name="Pause" size={16} />
                </Button>
              )}
              
              {file.status === 'error' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                >
                  <Icon name="RotateCcw" size={16} />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {files.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-sm">
          <span className="text-muted-foreground">
            Total size: {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
          </span>
          
          {isUploading && (
            <div className="flex items-center space-x-2">
              <Icon name="Upload" size={14} className="text-primary" />
              <span className="text-foreground font-medium">
                Uploading {files.filter(f => f.status === 'uploading').length} of {files.length}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileQueue;