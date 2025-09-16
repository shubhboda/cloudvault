import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

import { Checkbox } from '../../../components/ui/Checkbox';

const VersioningSection = ({ isExpanded, onToggle, settings, onSettingsChange }) => {
  const retentionOptions = [
    { value: '5', label: 'Keep 5 versions' },
    { value: '10', label: 'Keep 10 versions' },
    { value: '25', label: 'Keep 25 versions' },
    { value: '50', label: 'Keep 50 versions' },
    { value: 'unlimited', label: 'Keep all versions' }
  ];

  const cleanupOptions = [
    { value: '30', label: 'After 30 days' },
    { value: '90', label: 'After 90 days' },
    { value: '180', label: 'After 6 months' },
    { value: '365', label: 'After 1 year' },
    { value: 'never', label: 'Never delete' }
  ];

  const handleRetentionChange = (value) => {
    onSettingsChange({
      ...settings,
      versionRetention: value
    });
  };

  const handleCleanupChange = (value) => {
    onSettingsChange({
      ...settings,
      autoCleanup: value
    });
  };

  const handleVersioningEnabledChange = (checked) => {
    onSettingsChange({
      ...settings,
      versioningEnabled: checked
    });
  };

  const handleCompressVersionsChange = (checked) => {
    onSettingsChange({
      ...settings,
      compressVersions: checked
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg">
            <Icon name="History" size={18} color="var(--color-secondary)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">File Versioning</h3>
            <p className="text-xs text-muted-foreground">
              {settings.versioningEnabled ? `Keep ${settings.versionRetention} versions` : 'Versioning disabled'}
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
          <Checkbox
            label="Enable file versioning"
            description="Keep multiple versions of files when they change"
            checked={settings.versioningEnabled}
            onChange={(e) => handleVersioningEnabledChange(e.target.checked)}
          />

          {settings.versioningEnabled && (
            <>
              <div className="space-y-4">
                <Select
                  label="Version Retention"
                  options={retentionOptions}
                  value={settings.versionRetention}
                  onChange={handleRetentionChange}
                  description="How many versions of each file to keep"
                />

                <Select
                  label="Automatic Cleanup"
                  options={cleanupOptions}
                  value={settings.autoCleanup}
                  onChange={handleCleanupChange}
                  description="When to automatically delete old versions"
                />

                <Checkbox
                  label="Compress old versions"
                  description="Reduce storage space by compressing older file versions"
                  checked={settings.compressVersions}
                  onChange={(e) => handleCompressVersionsChange(e.target.checked)}
                />
              </div>

              {/* Version Statistics */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Version Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-semibold text-foreground">1,247</div>
                    <div className="text-xs text-muted-foreground">Total Versions</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-semibold text-foreground">892 MB</div>
                    <div className="text-xs text-muted-foreground">Storage Used</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-semibold text-foreground">45</div>
                    <div className="text-xs text-muted-foreground">Files with Versions</div>
                  </div>
                </div>
              </div>

              {/* Recent Versions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Recent Versions</h4>
                <div className="space-y-2">
                  {[
                    { file: 'project-proposal.docx', versions: 3, lastModified: '2 hours ago' },
                    { file: 'budget-2024.xlsx', versions: 7, lastModified: '1 day ago' },
                    { file: 'presentation.pptx', versions: 2, lastModified: '3 days ago' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Icon name="FileText" size={16} color="var(--color-primary)" />
                        <div>
                          <div className="text-sm text-foreground">{item.file}</div>
                          <div className="text-xs text-muted-foreground">{item.lastModified}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.versions} versions
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VersioningSection;