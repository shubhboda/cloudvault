import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const UploadSettings = ({ settings, onSettingsChange, isUploading }) => {
  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const duplicateOptions = [
    {
      value: 'replace',
      label: 'Replace existing files',
      description: 'Overwrite files with the same name',
      icon: 'RefreshCw'
    },
    {
      value: 'keep_both',
      label: 'Keep both files',
      description: 'Add number suffix to new files',
      icon: 'Copy'
    },
    {
      value: 'skip',
      label: 'Skip duplicate files',
      description: 'Don\'t upload files that already exist',
      icon: 'SkipForward'
    }
  ];

  const bandwidthOptions = [
    { value: 'unlimited', label: 'Unlimited', description: 'Use full bandwidth' },
    { value: 'high', label: 'High (10 MB/s)', description: 'Fast upload speed' },
    { value: 'medium', label: 'Medium (5 MB/s)', description: 'Balanced speed' },
    { value: 'low', label: 'Low (1 MB/s)', description: 'Conserve bandwidth' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Upload Settings</h3>

      {/* Duplicate Handling */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name="Files" size={16} className="text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">
            When duplicate files are found:
          </label>
        </div>
        
        <div className="space-y-2 ml-6">
          {duplicateOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                settings.duplicateHandling === option.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
              } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="radio"
                name="duplicateHandling"
                value={option.value}
                checked={settings.duplicateHandling === option.value}
                onChange={(e) => handleSettingChange('duplicateHandling', e.target.value)}
                disabled={isUploading}
                className="mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon name={option.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {option.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Bandwidth Control */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name="Gauge" size={16} className="text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">
            Upload Speed Limit:
          </label>
        </div>
        
        <div className="ml-6">
          <select
            value={settings.bandwidthLimit}
            onChange={(e) => handleSettingChange('bandwidthLimit', e.target.value)}
            disabled={isUploading}
            className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
          >
            {bandwidthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} - {option.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={16} className="text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">
            Additional Options:
          </label>
        </div>
        
        <div className="space-y-3 ml-6">
          <Checkbox
            label="Enable file versioning"
            description="Keep previous versions of replaced files"
            checked={settings.enableVersioning}
            onChange={(e) => handleSettingChange('enableVersioning', e.target.checked)}
            disabled={isUploading}
          />
          
          <Checkbox
            label="Verify file integrity"
            description="Check file checksums after upload"
            checked={settings.verifyIntegrity}
            onChange={(e) => handleSettingChange('verifyIntegrity', e.target.checked)}
            disabled={isUploading}
          />
          
          <Checkbox
            label="Auto-organize by file type"
            description="Automatically sort files into type-based folders"
            checked={settings.autoOrganize}
            onChange={(e) => handleSettingChange('autoOrganize', e.target.checked)}
            disabled={isUploading}
          />
          
          <Checkbox
            label="Compress large files"
            description="Automatically compress files larger than 50MB"
            checked={settings.compressLarge}
            onChange={(e) => handleSettingChange('compressLarge', e.target.checked)}
            disabled={isUploading}
          />
        </div>
      </div>

      {/* Settings Summary */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Settings Summary</span>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Duplicates: {duplicateOptions.find(opt => opt.value === settings.duplicateHandling)?.label}</p>
          <p>• Speed: {bandwidthOptions.find(opt => opt.value === settings.bandwidthLimit)?.label}</p>
          <p>• Versioning: {settings.enableVersioning ? 'Enabled' : 'Disabled'}</p>
          <p>• Integrity Check: {settings.verifyIntegrity ? 'Enabled' : 'Disabled'}</p>
        </div>
      </div>
    </div>
  );
};

export default UploadSettings;