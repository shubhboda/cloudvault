import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadProgress = ({ 
  isUploading, 
  overallProgress, 
  currentFile, 
  uploadSpeed, 
  timeRemaining, 
  onPause, 
  onResume, 
  onCancel,
  isPaused 
}) => {
  const formatTime = (seconds) => {
    if (!seconds || seconds === Infinity) return '--:--';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatSpeed = (bytesPerSecond) => {
    if (!bytesPerSecond) return '0 B/s';
    
    const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
    let size = bytesPerSecond;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  if (!isUploading && !isPaused) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {isPaused ? 'Upload Paused' : 'Upload Progress'}
        </h3>
        <div className="flex items-center space-x-2">
          {isUploading && !isPaused && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPause}
              iconName="Pause"
              iconPosition="left"
            >
              Pause
            </Button>
          )}
          
          {isPaused && (
            <Button
              variant="default"
              size="sm"
              onClick={onResume}
              iconName="Play"
              iconPosition="left"
            >
              Resume
            </Button>
          )}
          
          <Button
            variant="destructive"
            size="sm"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-mono text-muted-foreground">
              {overallProgress}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                isPaused ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Zap" size={12} />
                <span className="font-mono">{formatSpeed(uploadSpeed)}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon 
                name={isPaused ? "Pause" : "Upload"} 
                size={12} 
                color={isPaused ? "var(--color-warning)" : "var(--color-primary)"}
                className={!isPaused ? "animate-pulse" : ""}
              />
              <span className={isPaused ? "text-warning" : "text-primary"}>
                {isPaused ? 'Paused' : 'Uploading'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Current File */}
      {currentFile && (
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="File" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Currently uploading:</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground truncate flex-1 mr-4">
                {currentFile.name}
              </span>
              <span className="text-sm font-mono text-muted-foreground">
                {currentFile.progress}%
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isPaused ? 'bg-warning' : 'bg-primary'
                }`}
                style={{ width: `${currentFile.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Upload Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-card border border-border rounded-lg text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {Math.floor(overallProgress / 10)}
          </span>
        </div>
        
        <div className="p-3 bg-card border border-border rounded-lg text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Upload" size={16} color="var(--color-primary)" />
            <span className="text-xs text-muted-foreground">Uploading</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {isPaused ? 0 : 1}
          </span>
        </div>
        
        <div className="p-3 bg-card border border-border rounded-lg text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {Math.max(0, 10 - Math.floor(overallProgress / 10) - (isPaused ? 0 : 1))}
          </span>
        </div>
        
        <div className="p-3 bg-card border border-border rounded-lg text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="AlertCircle" size={16} color="var(--color-destructive)" />
            <span className="text-xs text-muted-foreground">Failed</span>
          </div>
          <span className="text-lg font-semibold text-foreground">0</span>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;