import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadDropZone = ({ onFilesSelected, isVisible }) => {
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

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-8
        bg-black/50 backdrop-blur-sm transition-all duration-300
        ${isDragOver ? 'bg-black/70' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`
          w-full max-w-2xl bg-card border-2 border-dashed rounded-lg p-12
          transition-all duration-300 text-center
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50'
          }
        `}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Upload Icon */}
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
            ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted'}
          `}>
            <Icon 
              name={isDragOver ? "Upload" : "CloudUpload"} 
              size={40} 
              color={isDragOver ? 'currentColor' : 'var(--color-primary)'}
            />
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">
              {isDragOver ? 'Drop files here' : 'Upload Files'}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {isDragOver 
                ? 'Release to upload your files to CloudVault' :'Drag and drop your files here, or click to browse and select files from your device'
              }
            </p>
          </div>

          {/* Action Buttons */}
          {!isDragOver && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={openFileDialog}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Browse Files
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={openFileDialog}
                iconName="Folder"
                iconPosition="left"
              >
                Upload Folder
              </Button>
            </div>
          )}

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept="*/*"
          />

          {/* Supported Formats */}
          <div className="text-xs text-muted-foreground">
            <p>Supported formats: Images, Documents, Videos, Audio, Archives</p>
            <p>Maximum file size: 100MB per file</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDropZone;