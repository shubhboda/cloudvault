import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UploadProgress = () => {
  const [uploads, setUploads] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  // Mock upload data for demonstration
  useEffect(() => {
    const mockUploads = [
      {
        id: 1,
        name: 'presentation.pptx',
        size: '15.2 MB',
        progress: 75,
        status: 'uploading',
        speed: '2.1 MB/s'
      },
      {
        id: 2,
        name: 'project-files.zip',
        size: '45.8 MB',
        progress: 100,
        status: 'completed',
        speed: null
      }
    ];
    
    // Simulate active uploads
    if (mockUploads.some(upload => upload.status === 'uploading')) {
      setUploads(mockUploads);
    }
  }, []);

  const activeUploads = uploads.filter(upload => upload.status === 'uploading');
  const completedUploads = uploads.filter(upload => upload.status === 'completed');
  const hasActiveUploads = activeUploads.length > 0;

  const handlePauseUpload = (id) => {
    setUploads(prev => prev.map(upload => 
      upload.id === id 
        ? { ...upload, status: upload.status === 'uploading' ? 'paused' : 'uploading' }
        : upload
    ));
  };

  const handleCancelUpload = (id) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  const handleClearCompleted = () => {
    setUploads(prev => prev.filter(upload => upload.status !== 'completed'));
  };

  if (uploads.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-card border border-border rounded-lg shadow-pronounced overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
          <div className="flex items-center space-x-2">
            <Icon 
              name={hasActiveUploads ? "Upload" : "CheckCircle"} 
              size={16} 
              color={hasActiveUploads ? "var(--color-primary)" : "var(--color-success)"} 
            />
            <span className="text-sm font-medium text-foreground">
              {hasActiveUploads ? `Uploading ${activeUploads.length} file${activeUploads.length > 1 ? 's' : ''}` : 'Uploads Complete'}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Icon name={isMinimized ? "ChevronUp" : "ChevronDown"} size={14} />
            </Button>
            
            {!hasActiveUploads && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setUploads([])}
              >
                <Icon name="X" size={14} />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="max-h-80 overflow-y-auto">
            {/* Active Uploads */}
            {activeUploads.map((upload) => (
              <div key={upload.id} className="p-4 border-b border-border last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="File" size={16} className="text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground truncate">
                        {upload.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="font-mono">{upload.size}</span>
                      {upload.speed && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{upload.speed}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handlePauseUpload(upload.id)}
                    >
                      <Icon 
                        name={upload.status === 'uploading' ? "Pause" : "Play"} 
                        size={12} 
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={() => handleCancelUpload(upload.id)}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {upload.status === 'paused' ? 'Paused' : 'Uploading...'}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {upload.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        upload.status === 'paused' ? 'bg-warning' : 'bg-primary'
                      }`}
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Completed Uploads */}
            {completedUploads.length > 0 && (
              <>
                {activeUploads.length > 0 && <hr className="border-border" />}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">
                      Completed ({completedUploads.length})
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearCompleted}
                      className="text-xs h-6 px-2"
                    >
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {completedUploads.map((upload) => (
                      <div key={upload.id} className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                        <span className="text-sm text-foreground truncate flex-1">
                          {upload.name}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {upload.size}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Minimized State */}
        {isMinimized && hasActiveUploads && (
          <div className="p-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-primary rounded-full transition-all duration-300"
                    style={{ 
                      width: `${activeUploads.reduce((acc, upload) => acc + upload.progress, 0) / activeUploads.length}%` 
                    }}
                  />
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {Math.round(activeUploads.reduce((acc, upload) => acc + upload.progress, 0) / activeUploads.length)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProgress;