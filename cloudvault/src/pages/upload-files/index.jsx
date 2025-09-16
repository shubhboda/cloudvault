import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import UploadZone from './components/UploadZone';
import FileQueue from './components/FileQueue';
import DestinationSelector from './components/DestinationSelector';
import UploadSettings from './components/UploadSettings';
import UploadProgress from './components/UploadProgress';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UploadFiles = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({
    id: 'root',
    name: 'Root Directory',
    path: '/',
    icon: 'Home'
  });
  const [uploadSettings, setUploadSettings] = useState({
    duplicateHandling: 'keep_both',
    bandwidthLimit: 'unlimited',
    enableVersioning: true,
    verifyIntegrity: true,
    autoOrganize: false,
    compressLarge: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Check authentication
  useEffect(() => {
    const user = localStorage.getItem('cloudvault_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const generateFileId = () => {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleFilesSelected = (selectedFiles) => {
    const newFiles = selectedFiles.map(file => ({
      id: generateFileId(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      status: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleClearAll = () => {
    if (!isUploading) {
      setFiles([]);
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setOverallProgress(0);
    
    const pendingFiles = files.filter(f => f.status === 'pending');
    let completedCount = 0;
    
    for (let i = 0; i < pendingFiles.length; i++) {
      if (isPaused) break;
      
      const file = pendingFiles[i];
      setCurrentFile(file);
      
      // Update file status to uploading
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'uploading' } : f
      ));
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 5) {
        if (isPaused) break;
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Update file progress
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress } : f
        ));
        
        // Update overall progress
        const newOverallProgress = ((completedCount + (progress / 100)) / pendingFiles.length) * 100;
        setOverallProgress(newOverallProgress);
        
        // Simulate upload speed and time remaining
        setUploadSpeed(Math.random() * 5000000 + 1000000); // 1-5 MB/s
        setTimeRemaining((pendingFiles.length - completedCount - (progress / 100)) * 10);
      }
      
      if (!isPaused) {
        // Mark file as completed
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'completed', progress: 100 } : f
        ));
        
        completedCount++;
      }
    }
    
    if (!isPaused) {
      setIsUploading(false);
      setCurrentFile(null);
      setOverallProgress(100);
      
      // Show completion notification
      setTimeout(() => {
        navigate('/file-manager');
      }, 2000);
    }
  };

  const handleStartUpload = () => {
    if (files.length === 0) return;
    simulateUpload();
  };

  const handlePauseUpload = () => {
    setIsPaused(true);
    setIsUploading(false);
  };

  const handleResumeUpload = () => {
    setIsPaused(false);
    simulateUpload();
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setIsPaused(false);
    setOverallProgress(0);
    setCurrentFile(null);
    
    // Reset all file statuses
    setFiles(prev => prev.map(file => ({
      ...file,
      status: 'pending',
      progress: 0
    })));
  };

  const canStartUpload = files.length > 0 && !isUploading && !isPaused;
  const hasCompletedFiles = files.some(f => f.status === 'completed');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Upload" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Upload Files</h1>
              <p className="text-muted-foreground">
                Upload and organize your files with advanced settings and progress tracking
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center space-x-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Files" size={16} />
              <span>{files.length} files selected</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="HardDrive" size={16} />
              <span>
                {files.reduce((acc, file) => acc + file.size, 0) > 0 
                  ? `${(files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(1)} MB total`
                  : '0 MB total'
                }
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>Destination: {selectedFolder.path}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Zone & Queue */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Zone */}
            <div className="bg-card border border-border rounded-lg p-6">
              <UploadZone
                onFilesSelected={handleFilesSelected}
                isUploading={isUploading || isPaused}
              />
            </div>

            {/* File Queue */}
            <div className="bg-card border border-border rounded-lg p-6">
              <FileQueue
                files={files}
                onRemoveFile={handleRemoveFile}
                onClearAll={handleClearAll}
                isUploading={isUploading || isPaused}
              />
            </div>

            {/* Upload Progress */}
            {(isUploading || isPaused || hasCompletedFiles) && (
              <div className="bg-card border border-border rounded-lg p-6">
                <UploadProgress
                  isUploading={isUploading}
                  isPaused={isPaused}
                  overallProgress={overallProgress}
                  currentFile={currentFile}
                  uploadSpeed={uploadSpeed}
                  timeRemaining={timeRemaining}
                  onPause={handlePauseUpload}
                  onResume={handleResumeUpload}
                  onCancel={handleCancelUpload}
                />
              </div>
            )}
          </div>

          {/* Right Column - Settings & Controls */}
          <div className="space-y-6">
            {/* Destination Selector */}
            <div className="bg-card border border-border rounded-lg p-6">
              <DestinationSelector
                selectedFolder={selectedFolder}
                onFolderChange={setSelectedFolder}
                isUploading={isUploading || isPaused}
              />
            </div>

            {/* Upload Settings */}
            <div className="bg-card border border-border rounded-lg p-6">
              <UploadSettings
                settings={uploadSettings}
                onSettingsChange={setUploadSettings}
                isUploading={isUploading || isPaused}
              />
            </div>

            {/* Upload Controls */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Upload Controls</h3>
                
                <div className="space-y-3">
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handleStartUpload}
                    disabled={!canStartUpload}
                    iconName="Upload"
                    iconPosition="left"
                    className="h-12"
                  >
                    {files.length === 0 
                      ? 'Select Files to Upload'
                      : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`
                    }
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/file-manager')}
                    iconName="FolderOpen"
                    iconPosition="left"
                  >
                    View File Manager
                  </Button>
                </div>

                {/* Upload Summary */}
                {files.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Total files:</span>
                        <span className="font-mono">{files.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total size:</span>
                        <span className="font-mono">
                          {(files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(1)} MB
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Destination:</span>
                        <span className="font-mono truncate ml-2">{selectedFolder.path}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;