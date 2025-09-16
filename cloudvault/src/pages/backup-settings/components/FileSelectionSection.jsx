import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FileSelectionSection = ({ isExpanded, onToggle, settings, onSettingsChange }) => {
  const [newIncludePath, setNewIncludePath] = useState('');
  const [newExcludePath, setNewExcludePath] = useState('');

  const fileTypeOptions = [
    { id: 'documents', label: 'Documents (.pdf, .doc, .txt)', checked: true },
    { id: 'images', label: 'Images (.jpg, .png, .gif)', checked: true },
    { id: 'videos', label: 'Videos (.mp4, .avi, .mov)', checked: false },
    { id: 'audio', label: 'Audio (.mp3, .wav, .flac)', checked: false },
    { id: 'archives', label: 'Archives (.zip, .rar, .7z)', checked: true }
  ];

  const handleAddIncludePath = () => {
    if (newIncludePath.trim()) {
      onSettingsChange({
        ...settings,
        includePaths: [...settings.includePaths, newIncludePath.trim()]
      });
      setNewIncludePath('');
    }
  };

  const handleAddExcludePath = () => {
    if (newExcludePath.trim()) {
      onSettingsChange({
        ...settings,
        excludePaths: [...settings.excludePaths, newExcludePath.trim()]
      });
      setNewExcludePath('');
    }
  };

  const handleRemovePath = (path, type) => {
    if (type === 'include') {
      onSettingsChange({
        ...settings,
        includePaths: settings.includePaths.filter(p => p !== path)
      });
    } else {
      onSettingsChange({
        ...settings,
        excludePaths: settings.excludePaths.filter(p => p !== path)
      });
    }
  };

  const handleMaxSizeChange = (e) => {
    onSettingsChange({
      ...settings,
      maxFileSize: e.target.value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg">
            <Icon name="FolderOpen" size={18} color="var(--color-accent)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">File Selection</h3>
            <p className="text-xs text-muted-foreground">
              {settings.includePaths.length} folders included, {settings.excludePaths.length} excluded
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-border space-y-6">
          {/* Include Paths */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Include Folders</h4>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter folder path (e.g., /Documents)"
                value={newIncludePath}
                onChange={(e) => setNewIncludePath(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddIncludePath}
                iconName="Plus"
                iconPosition="left"
              >
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.includePaths.map((path, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="Folder" size={16} color="var(--color-accent)" />
                    <span className="text-sm text-foreground font-mono">{path}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePath(path, 'include')}
                    className="h-6 w-6"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Exclude Paths */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Exclude Folders</h4>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter folder path to exclude"
                value={newExcludePath}
                onChange={(e) => setNewExcludePath(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddExcludePath}
                iconName="Plus"
                iconPosition="left"
              >
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.excludePaths.map((path, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-destructive/5 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="FolderX" size={16} color="var(--color-destructive)" />
                    <span className="text-sm text-foreground font-mono">{path}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePath(path, 'exclude')}
                    className="h-6 w-6"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* File Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">File Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fileTypeOptions.map((option) => (
                <Checkbox
                  key={option.id}
                  label={option.label}
                  checked={option.checked}
                  onChange={() => {}}
                />
              ))}
            </div>
          </div>

          {/* File Size Limit */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">File Size Limit</h4>
            <Input
              label="Maximum file size (MB)"
              type="number"
              placeholder="100"
              value={settings.maxFileSize}
              onChange={handleMaxSizeChange}
              description="Files larger than this will be skipped"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="HardDrive" size={16} color="var(--color-primary)" />
              <span className="text-sm text-foreground">Estimated backup size</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">~2.4 GB</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSelectionSection;