import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FileGrid = ({ files, selectedFiles, onFileSelect, onFileAction, viewMode }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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

  const isSelected = (fileId) => selectedFiles.includes(fileId);

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className={`relative group bg-card border border-border rounded-lg p-3 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer ${
              isSelected(file.id) ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => onFileSelect(file.id)}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-2 left-2 z-10">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected(file.id)
                    ? 'bg-primary border-primary' :'border-border bg-background group-hover:border-primary/50'
                }`}
              >
                {isSelected(file.id) && (
                  <Icon name="Check" size={12} color="white" />
                )}
              </div>
            </div>

            {/* File Actions */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileAction(file, 'preview');
                }}
              >
                <Icon name="Eye" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileAction(file, 'share');
                }}
              >
                <Icon name="Share2" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileAction(file, 'menu');
                }}
              >
                <Icon name="MoreVertical" size={14} />
              </Button>
            </div>

            {/* File Preview */}
            <div className="flex flex-col items-center space-y-2 mt-4">
              {file.type === 'image' && file.thumbnail ? (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={file.thumbnail}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                  <Icon
                    name={getFileIcon(file.type)}
                    size={32}
                    color={file.type === 'folder' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                  />
                </div>
              )}

              {/* File Info */}
              <div className="text-center w-full">
                <p className="text-sm font-medium text-foreground truncate" title={file.name}>
                  {file.name}
                </p>
                {file.type !== 'folder' && (
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List View
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground">
        <div className="col-span-1"></div>
        <div className="col-span-5">Name</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Modified</div>
        <div className="col-span-2">Actions</div>
      </div>

      <div className="divide-y divide-border">
        {files.map((file) => (
          <div
            key={file.id}
            className={`grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
              isSelected(file.id) ? 'bg-primary/5' : ''
            }`}
            onClick={() => onFileSelect(file.id)}
          >
            {/* Selection Checkbox */}
            <div className="col-span-1 flex items-center">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected(file.id)
                    ? 'bg-primary border-primary' :'border-border hover:border-primary/50'
                }`}
              >
                {isSelected(file.id) && (
                  <Icon name="Check" size={12} color="white" />
                )}
              </div>
            </div>

            {/* File Info */}
            <div className="col-span-5 flex items-center space-x-3">
              {file.type === 'image' && file.thumbnail ? (
                <div className="w-8 h-8 rounded overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={file.thumbnail}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={getFileIcon(file.type)}
                    size={16}
                    color={file.type === 'folder' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground md:hidden">
                  {file.type !== 'folder' && formatFileSize(file.size)} • {formatDate(file.modifiedAt)}
                </p>
              </div>
            </div>

            {/* Size - Hidden on mobile */}
            <div className="col-span-2 hidden md:flex items-center">
              <span className="text-sm text-muted-foreground">
                {file.type === 'folder' ? '—' : formatFileSize(file.size)}
              </span>
            </div>

            {/* Modified Date - Hidden on mobile */}
            <div className="col-span-2 hidden md:flex items-center">
              <span className="text-sm text-muted-foreground">
                {formatDate(file.modifiedAt)}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-end space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileAction(file, 'preview');
                }}
              >
                <Icon name="Eye" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileAction(file, 'menu');
                }}
              >
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileGrid;