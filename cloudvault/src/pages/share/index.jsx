import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';

const Share = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock file data - in real app, fetch from API
  const mockFiles = [
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
  ];

  useEffect(() => {
    // Simulate API call
    const foundFile = mockFiles.find(f => f.id === fileId);
    if (foundFile) {
      setFile(foundFile);
    }
    setLoading(false);
  }, [fileId]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    const iconMap = {
      'image': 'Image',
      'video': 'Video',
      'audio': 'Music',
      'document': 'FileText',
      'pdf': 'FileText',
      'spreadsheet': 'FileSpreadsheet',
      'presentation': 'Presentation',
      'archive': 'Archive',
      'folder': 'Folder'
    };
    return iconMap[type] || 'File';
  };

  const handleDownload = () => {
    if (file && file.url && file.url !== '#') {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Download not available for this file');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading shared file...</p>
        </div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center space-y-4">
            <Icon name="FileX" size={64} color="var(--color-muted-foreground)" />
            <h1 className="text-2xl font-bold text-foreground">File Not Found</h1>
            <p className="text-muted-foreground">The shared file you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/')}>Go to File Manager</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 shadow-subtle">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Shared File</h1>
              <p className="text-muted-foreground">This file has been shared with you</p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              {/* File Preview */}
              <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center">
                {file.type === 'image' && file.thumbnail ? (
                  <Image
                    src={file.thumbnail}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Icon
                    name={getFileIcon(file.type)}
                    size={64}
                    color={file.type === 'folder' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                  />
                )}
              </div>

              {/* File Info */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-foreground">{file.name}</h2>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <span>Size: {formatFileSize(file.size)}</span>
                  <span>Modified: {new Date(file.modifiedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <Button
                  onClick={handleDownload}
                  iconName="Download"
                  iconPosition="left"
                  disabled={file.url === '#'}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Files
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
