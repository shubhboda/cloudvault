import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFilesSelected, isUploading, acceptedTypes = "*" }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : isUploading
            ? 'border-muted bg-muted/50' :'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full transition-colors ${
            isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon 
              name={isDragOver ? "Upload" : "Cloud"} 
              size={48} 
              color={isDragOver ? "white" : "var(--color-muted-foreground)"}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isDragOver ? 'Drop files here' : 'Upload your files'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {isDragOver 
                ? 'Release to upload these files' :'Drag and drop files here, or click browse to select files from your device'
              }
            </p>
          </div>

          {!isUploading && (
            <Button
              variant="outline"
              onClick={handleBrowseClick}
              iconName="FolderOpen"
              iconPosition="left"
              className="mt-4"
            >
              Browse Files
            </Button>
          )}

          {isUploading && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Upload in progress...</span>
            </div>
          )}
        </div>

        {/* File type restrictions */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Supported formats: Images (JPG, PNG, GIF), Documents (PDF, DOC, DOCX, TXT), 
            Archives (ZIP, RAR), Videos (MP4, AVI, MOV), and more
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Maximum file size: 100MB per file
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;