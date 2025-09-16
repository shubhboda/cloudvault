import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileActions = ({ selectedFiles, onAction, onClearSelection }) => {
  const selectedCount = selectedFiles.length;

  if (selectedCount === 0) return null;

  const actions = [
    { id: 'download', label: 'Download', icon: 'Download' },
    { id: 'move', label: 'Move', icon: 'FolderOpen' },
    { id: 'copy', label: 'Copy', icon: 'Copy' },
    { id: 'share', label: 'Share', icon: 'Share2' },
    { id: 'delete', label: 'Delete', icon: 'Trash2', variant: 'destructive' }
  ];

  return (
    <div className="sticky top-16 z-30 bg-primary text-primary-foreground shadow-pronounced">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="X" size={20} />
          </Button>
          <span className="font-medium">
            {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant === 'destructive' ? 'destructive' : 'ghost'}
              size="sm"
              onClick={() => onAction(action.id)}
              className={action.variant !== 'destructive' ? 'text-primary-foreground hover:bg-primary-foreground/10' : ''}
            >
              <Icon name={action.icon} size={16} className="mr-1" />
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileActions;