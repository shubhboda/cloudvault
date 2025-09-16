import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DestinationSelector = ({ selectedFolder, onFolderChange, isUploading }) => {
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Mock folder structure
  const folders = [
    { id: 'root', name: 'Root Directory', path: '/', icon: 'Home' },
    { id: 'documents', name: 'Documents', path: '/Documents', icon: 'FileText' },
    { id: 'images', name: 'Images', path: '/Images', icon: 'Image' },
    { id: 'videos', name: 'Videos', path: '/Videos', icon: 'Video' },
    { id: 'work', name: 'Work Files', path: '/Work', icon: 'Briefcase' },
    { id: 'personal', name: 'Personal', path: '/Personal', icon: 'User' },
    { id: 'backup', name: 'Backup', path: '/Backup', icon: 'Shield' }
  ];

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: `folder_${Date.now()}`,
        name: newFolderName.trim(),
        path: `/${newFolderName.trim()}`,
        icon: 'Folder'
      };
      
      // In a real app, this would make an API call
      console.log('Creating folder:', newFolder);
      
      // Reset form
      setNewFolderName('');
      setShowNewFolderInput(false);
      
      // Select the new folder
      onFolderChange(newFolder);
    }
  };

  const handleCancelNewFolder = () => {
    setNewFolderName('');
    setShowNewFolderInput(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Destination</h3>
        {!isUploading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNewFolderInput(true)}
            iconName="Plus"
            iconPosition="left"
            disabled={showNewFolderInput}
          >
            New Folder
          </Button>
        )}
      </div>

      {/* New Folder Input */}
      {showNewFolderInput && (
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <div className="space-y-3">
            <Input
              label="Folder Name"
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateFolder();
                } else if (e.key === 'Escape') {
                  handleCancelNewFolder();
                }
              }}
              autoFocus
            />
            
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
                iconName="Check"
                iconPosition="left"
              >
                Create
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelNewFolder}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Folder Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Select destination folder
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => onFolderChange(folder)}
              disabled={isUploading}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all text-left ${
                selectedFolder?.id === folder.id
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50 text-foreground'
              } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Icon 
                name={folder.icon} 
                size={20} 
                color={selectedFolder?.id === folder.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{folder.name}</p>
                <p className="text-xs text-muted-foreground truncate font-mono">
                  {folder.path}
                </p>
              </div>
              {selectedFolder?.id === folder.id && (
                <Icon name="Check" size={16} color="var(--color-primary)" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Folder Display */}
      {selectedFolder && (
        <div className="flex items-center space-x-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <Icon name="MapPin" size={16} color="var(--color-primary)" />
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">
              Files will be uploaded to:
            </p>
            <p className="text-sm font-mono text-primary/80">
              {selectedFolder.path}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationSelector;