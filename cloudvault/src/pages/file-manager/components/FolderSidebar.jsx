import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FolderSidebar = ({ isOpen, onClose, currentPath, onNavigate }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['/']));

  // Mock folder structure
  const folderStructure = [
    {
      id: '1',
      name: 'My Files',
      path: '/',
      children: [
        {
          id: '2',
          name: 'Documents',
          path: '/Documents',
          children: [
            { id: '3', name: 'Work', path: '/Documents/Work', children: [] },
            { id: '4', name: 'Personal', path: '/Documents/Personal', children: [] }
          ]
        },
        {
          id: '5',
          name: 'Images',
          path: '/Images',
          children: [
            { id: '6', name: 'Photos', path: '/Images/Photos', children: [] },
            { id: '7', name: 'Screenshots', path: '/Images/Screenshots', children: [] }
          ]
        },
        {
          id: '8',
          name: 'Videos',
          path: '/Videos',
          children: []
        },
        {
          id: '9',
          name: 'Music',
          path: '/Music',
          children: []
        },
        {
          id: '10',
          name: 'Downloads',
          path: '/Downloads',
          children: []
        }
      ]
    }
  ];

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFolderTree = (folders, level = 0) => {
    return folders.map((folder) => {
      const isExpanded = expandedFolders.has(folder.path);
      const isActive = currentPath === folder.path;
      const hasChildren = folder.children && folder.children.length > 0;

      return (
        <div key={folder.id}>
          <div
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
              isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => onNavigate(folder.path)}
          >
            {hasChildren && (
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(folder.path);
                }}
              >
                <Icon
                  name={isExpanded ? "ChevronDown" : "ChevronRight"}
                  size={12}
                />
              </Button>
            )}
            {!hasChildren && <div className="w-4" />}
            
            <Icon
              name="Folder"
              size={16}
              color={isActive ? 'currentColor' : 'var(--color-primary)'}
            />
            <span className="text-sm font-medium truncate">{folder.name}</span>
          </div>

          {hasChildren && isExpanded && (
            <div>
              {renderFolderTree(folder.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isOpen ? 'lg:block' : 'hidden lg:block'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="FolderTree" size={20} color="var(--color-primary)" />
              <h2 className="text-lg font-semibold text-foreground">Folders</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Folder Tree */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {renderFolderTree(folderStructure)}
            </div>
          </div>

          {/* Storage Info */}
          <div className="p-4 border-t border-border">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Storage Used</span>
                <span className="text-sm font-mono text-muted-foreground">2.4GB / 10GB</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: '24%' }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                76% available
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FolderSidebar;