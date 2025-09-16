import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BackupScheduleSection from './components/BackupScheduleSection';
import FileSelectionSection from './components/FileSelectionSection';
import AdvancedOptionsSection from './components/AdvancedOptionsSection';
import VersioningSection from './components/VersioningSection';
import ConflictResolutionSection from './components/ConflictResolutionSection';
import NotificationSection from './components/NotificationSection';
import SecuritySection from './components/SecuritySection';
import BackupHistorySection from './components/BackupHistorySection';
import TestBackupSection from './components/TestBackupSection';

const BackupSettings = () => {
  const [expandedSections, setExpandedSections] = useState({
    schedule: true,
    fileSelection: false,
    advanced: false,
    versioning: false,
    conflicts: false,
    notifications: false,
    security: false,
    history: false
  });

  const [settings, setSettings] = useState({
    // Schedule settings
    frequency: 'daily',
    scheduledTime: '03:30',
    timezone: 'UTC-5',
    autoStart: true,
    
    // File selection settings
    includePaths: ['/Documents', '/Pictures', '/Desktop'],
    excludePaths: ['/Downloads/temp', '/Cache'],
    maxFileSize: '100',
    
    // Advanced settings
    bandwidthLimit: 'unlimited',
    networkPreference: 'wifi',
    batteryOptimization: true,
    pauseOnBattery: false,
    allowCellularData: false,
    cellularDataLimit: '500',
    
    // Versioning settings
    versioningEnabled: true,
    versionRetention: '10',
    autoCleanup: '90',
    compressVersions: true,
    
    // Conflict resolution settings
    conflictResolution: 'newer',
    showConflictNotifications: true,
    createBackupCopies: true,
    
    // Notification settings
    emailNotifications: true,
    inAppNotifications: true,
    notifyBackupComplete: true,
    notifyBackupErrors: true,
    notifyStorageWarnings: true,
    notifyQuotaAlerts: true,
    notificationEmail: 'user@example.com',
    
    // Security settings
    encryptionLevel: 'aes256',
    clientSideEncryption: true,
    verifyBackups: true,
    requireTwoFactor: false
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('cloudvault_backup_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage
      localStorage.setItem('cloudvault_backup_settings', JSON.stringify(settings));
      
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      frequency: 'daily',
      scheduledTime: '03:30',
      timezone: 'UTC-5',
      autoStart: true,
      includePaths: ['/Documents', '/Pictures', '/Desktop'],
      excludePaths: [],
      maxFileSize: '100',
      bandwidthLimit: 'unlimited',
      networkPreference: 'wifi',
      batteryOptimization: true,
      pauseOnBattery: false,
      allowCellularData: false,
      cellularDataLimit: '500',
      versioningEnabled: true,
      versionRetention: '10',
      autoCleanup: '90',
      compressVersions: true,
      conflictResolution: 'newer',
      showConflictNotifications: true,
      createBackupCopies: true,
      emailNotifications: true,
      inAppNotifications: true,
      notifyBackupComplete: true,
      notifyBackupErrors: true,
      notifyStorageWarnings: true,
      notifyQuotaAlerts: true,
      notificationEmail: 'user@example.com',
      encryptionLevel: 'aes256',
      clientSideEncryption: true,
      verifyBackups: true,
      requireTwoFactor: false
    };
    
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Settings" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Backup Settings</h1>
              <p className="text-sm text-muted-foreground">
                Configure automated backup schedules and preferences
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} color="var(--color-primary)" />
                <span className="text-sm text-muted-foreground">Next Backup</span>
              </div>
              <div className="text-lg font-semibold text-foreground mt-1">
                {settings.frequency === 'continuous' ? 'Continuous' : 'Today 3:30 AM'}
              </div>
            </div>
            
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="FolderOpen" size={16} color="var(--color-accent)" />
                <span className="text-sm text-muted-foreground">Folders</span>
              </div>
              <div className="text-lg font-semibold text-foreground mt-1">
                {settings.includePaths.length} included
              </div>
            </div>
            
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-sm text-muted-foreground">Security</span>
              </div>
              <div className="text-lg font-semibold text-foreground mt-1">
                {settings.encryptionLevel.toUpperCase()}
              </div>
            </div>
            
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="History" size={16} color="var(--color-secondary)" />
                <span className="text-sm text-muted-foreground">Versions</span>
              </div>
              <div className="text-lg font-semibold text-foreground mt-1">
                {settings.versioningEnabled ? settings.versionRetention : 'Disabled'}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          <BackupScheduleSection
            isExpanded={expandedSections.schedule}
            onToggle={() => toggleSection('schedule')}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          <FileSelectionSection
            isExpanded={expandedSections.fileSelection}
            onToggle={() => toggleSection('fileSelection')}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          <AdvancedOptionsSection
            isExpanded={expandedSections.advanced}
            onToggle={() => toggleSection('advanced')}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          <VersioningSection
            isExpanded={expandedSections.versioning}
            onToggle={() => toggleSection('versioning')}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          <ConflictResolutionSection
            isExpanded={expandedSections.conflicts}
            onToggle={() => toggleSection('conflicts')}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          <NotificationSection
            isExpanded={expandedSections.notifications}
            onToggle={() => toggleSection('notifications')}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          <SecuritySection
            isExpanded={expandedSections.security}
            onToggle={() => toggleSection('security')}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />

          <BackupHistorySection
            isExpanded={expandedSections.history}
            onToggle={() => toggleSection('history')}
          />

          {/* Test Backup Section */}
          <TestBackupSection settings={settings} />
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4 mt-8 -mx-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              {hasUnsavedChanges && (
                <>
                  <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
                  <span className="text-sm text-warning">You have unsaved changes</span>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleResetSettings}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset to Defaults
              </Button>
              
              <Button
                variant="default"
                onClick={handleSaveSettings}
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
                disabled={!hasUnsavedChanges}
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupSettings;