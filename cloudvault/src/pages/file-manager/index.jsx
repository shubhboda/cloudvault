import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import UploadProgress from '../../components/ui/UploadProgress';
import BreadcrumbNav from './components/BreadcrumbNav';
import SearchAndSort from './components/SearchAndSort';
import FileGrid from './components/FileGrid';
import FileActions from './components/FileActions';
import FilePreviewModal from './components/FilePreviewModal';
import FolderSidebar from './components/FolderSidebar';
import UploadDropZone from './components/UploadDropZone';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FileManager = () => {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('list');
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploadDropVisible, setIsUploadDropVisible] = useState(false);

  // Mock files data
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      size: 0,
      modifiedAt: '2025-01-10T10:30:00Z',
      createdAt: '2025-01-05T14:20:00Z',
      path: '/Documents'
    },
    {
      id: '2',
      name: 'Images',
      type: 'folder',
      size: 0,
      modifiedAt: '2025-01-09T16:45:00Z',
      createdAt: '2025-01-03T09:15:00Z',
      path: '/Images'
    },
    {
      id: '3',
      name: 'presentation.pptx',
      type: 'presentation',
      size: 15728640,
      modifiedAt: '2025-01-11T09:15:00Z',
      createdAt: '2025-01-11T09:00:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
      url: '#'
    },
    {
      id: '4',
      name: 'vacation-photo.jpg',
      type: 'image',
      size: 2457600,
      modifiedAt: '2025-01-10T14:22:00Z',
      createdAt: '2025-01-10T14:22:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    {
      id: '5',
      name: 'project-report.pdf',
      type: 'pdf',
      size: 5242880,
      modifiedAt: '2025-01-09T11:30:00Z',
      createdAt: '2025-01-08T16:45:00Z',
      url: '#'
    },
    {
      id: '6',
      name: 'music-collection.zip',
      type: 'archive',
      size: 104857600,
      modifiedAt: '2025-01-08T20:15:00Z',
      createdAt: '2025-01-08T19:30:00Z',
      url: '#'
    },
    {
      id: '7',
      name: 'demo-video.mp4',
      type: 'video',
      size: 52428800,
      modifiedAt: '2025-01-07T13:45:00Z',
      createdAt: '2025-01-07T13:00:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=100&h=100&fit=crop',
      url: '#'
    },
    {
      id: '8',
      name: 'meeting-notes.docx',
      type: 'document',
      size: 1048576,
      modifiedAt: '2025-01-06T15:20:00Z',
      createdAt: '2025-01-06T14:30:00Z',
      url: '#'
    }
  ]);

  // Filter and sort files
  const filteredAndSortedFiles = React.useMemo(() => {
    let filtered = files.filter(file =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort files
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-desc':
          return new Date(b.modifiedAt) - new Date(a.modifiedAt);
        case 'date-asc':
          return new Date(a.modifiedAt) - new Date(b.modifiedAt);
        case 'size-desc':
          return b.size - a.size;
        case 'size-asc':
          return a.size - b.size;
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    // Folders first
    return filtered.sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return 0;
    });
  }, [files, searchQuery, sortBy]);

  // Handle file selection
  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  // Handle file actions
  const handleFileAction = (file, action) => {
    switch (action) {
      case 'preview':
        setPreviewFile(file);
        setIsPreviewOpen(true);
        break;
      case 'download':
        console.log('Downloading file:', file.name);
        break;
      case 'share':
        if (file.url && file.url !== '#') {
          const shareUrl = `${window.location.origin}/share/${file.id}`;
          navigator.clipboard.writeText(shareUrl).then(() => {
            alert(`Shareable URL copied to clipboard:\n${shareUrl}`);
          }).catch(() => {
            alert('Failed to copy shareable URL to clipboard');
          });
        } else {
          alert('This file cannot be shared');
        }
        break;
      case 'rename': console.log('Renaming file:', file.name);
        break;
      case 'delete':
        setFiles(prev => prev.filter(f => f.id !== file.id));
        break;
      case 'menu': console.log('Opening menu for:', file.name);
        break;
      default:
        break;
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    switch (action) {
      case 'download':
        console.log('Downloading selected files:', selectedFiles);
        break;
      case 'move': console.log('Moving selected files:', selectedFiles);
        break;
      case 'copy': console.log('Copying selected files:', selectedFiles);
        break;
      case 'share':
        const shareableFiles = selectedFiles.filter(id => {
          const file = files.find(f => f.id === id);
          return file && file.url && file.url !== '#';
        });
        if (shareableFiles.length > 0) {
          const shareUrls = shareableFiles.map(id => `${window.location.origin}/share/${id}`).join('\n');
          navigator.clipboard.writeText(shareUrls).then(() => {
            alert(`Shareable URLs copied to clipboard:\n${shareUrls}`);
          }).catch(() => {
            alert('Failed to copy shareable URLs to clipboard');
          });
        } else {
          alert('None of the selected files can be shared');
        }
        break;
      case 'delete':
        setFiles(prev => prev.filter(f => !selectedFiles.includes(f.id)));
        setSelectedFiles([]);
        break;
      default:
        break;
    }
  };

  // Handle navigation
  const handleNavigate = (path) => {
    setCurrentPath(path);
    setSelectedFiles([]);
  };

  // Handle file upload
  const handleFilesSelected = (uploadedFiles) => {
    console.log('Files selected for upload:', uploadedFiles);
    setIsUploadDropVisible(false);
    
    // Mock file upload - add to files list
    const newFiles = uploadedFiles.map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      size: file.size,
      modifiedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      url: URL.createObjectURL(file),
      thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    
    setFiles(prev => [...newFiles, ...prev]);
  };

  // Handle drag and drop
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      if (!e.relatedTarget || !document.body.contains(e.relatedTarget)) {
        setIsDragOver(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      setIsUploadDropVisible(true);
    };

    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Folder Sidebar */}
        <FolderSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentPath={currentPath}
          onNavigate={handleNavigate}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* File Actions Bar */}
          <FileActions
            selectedFiles={selectedFiles}
            onAction={handleBulkAction}
            onClearSelection={() => setSelectedFiles([])}
          />

          {/* Breadcrumb Navigation */}
          <BreadcrumbNav
            currentPath={currentPath}
            onNavigate={handleNavigate}
          />

          {/* Search and Sort Controls */}
          <SearchAndSort
            onSearch={setSearchQuery}
            onSort={setSortBy}
            onViewChange={setViewMode}
            currentView={viewMode}
            searchQuery={searchQuery}
          />

          {/* File Grid/List */}
          <div className="flex-1 p-4">
            {filteredAndSortedFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="FolderOpen" size={32} color="var(--color-muted-foreground)" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {searchQuery ? 'No files found' : 'This folder is empty'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery 
                      ? `No files match "${searchQuery}"`
                      : 'Upload files or create folders to get started'
                    }
                  </p>
                  <Button
                    variant="default"
                    onClick={() => navigate('/upload-files')}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Upload Files
                  </Button>
                </div>
              </div>
            ) : (
              <FileGrid
                files={filteredAndSortedFiles}
                selectedFiles={selectedFiles}
                onFileSelect={handleFileSelect}
                onFileAction={handleFileAction}
                viewMode={viewMode}
              />
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-6 right-6 z-30 lg:hidden">
        <div className="flex flex-col space-y-3">
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full shadow-pronounced"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Icon name="FolderTree" size={24} />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-14 w-14 rounded-full shadow-pronounced"
            onClick={() => navigate('/upload-files')}
          >
            <Icon name="Plus" size={24} />
          </Button>
        </div>
      </div>

      {/* File Preview Modal */}
      <FilePreviewModal
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewFile(null);
        }}
        onAction={handleFileAction}
      />

      {/* Upload Drop Zone */}
      <UploadDropZone
        isVisible={isUploadDropVisible || isDragOver}
        onFilesSelected={handleFilesSelected}
      />

      {/* Upload Progress */}
      <UploadProgress />

      {/* Drag Overlay */}
      {isDragOver && !isUploadDropVisible && (
        <div className="fixed inset-0 z-40 bg-primary/10 border-4 border-dashed border-primary pointer-events-none">
          <div className="flex items-center justify-center h-full">
            <div className="bg-card rounded-lg p-8 shadow-pronounced">
              <div className="flex flex-col items-center space-y-4">
                <Icon name="Upload" size={48} color="var(--color-primary)" />
                <p className="text-xl font-semibold text-foreground">Drop files to upload</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManager;