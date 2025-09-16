import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConflictResolutionSection = ({ isExpanded, onToggle, settings, onSettingsChange }) => {
  const conflictOptions = [
    { value: 'ask', label: 'Always ask me' },
    { value: 'newer', label: 'Keep newer version' },
    { value: 'larger', label: 'Keep larger file' },
    { value: 'local', label: 'Prefer local version' },
    { value: 'remote', label: 'Prefer cloud version' }
  ];

  const handleConflictResolutionChange = (value) => {
    onSettingsChange({
      ...settings,
      conflictResolution: value
    });
  };

  const handleShowConflictNotificationsChange = (checked) => {
    onSettingsChange({
      ...settings,
      showConflictNotifications: checked
    });
  };

  const handleCreateBackupCopiesChange = (checked) => {
    onSettingsChange({
      ...settings,
      createBackupCopies: checked
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
            <Icon name="AlertTriangle" size={18} color="var(--color-warning)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">Conflict Resolution</h3>
            <p className="text-xs text-muted-foreground">
              How to handle file conflicts between devices
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
          <Select
            label="Default Conflict Resolution"
            options={conflictOptions}
            value={settings.conflictResolution}
            onChange={handleConflictResolutionChange}
            description="Choose how to automatically resolve file conflicts"
          />

          <div className="space-y-3">
            <Checkbox
              label="Show conflict notifications"
              description="Display alerts when file conflicts are detected"
              checked={settings.showConflictNotifications}
              onChange={(e) => handleShowConflictNotificationsChange(e.target.checked)}
            />

            <Checkbox
              label="Create backup copies of conflicted files"
              description="Save both versions with different names when conflicts occur"
              checked={settings.createBackupCopies}
              onChange={(e) => handleCreateBackupCopiesChange(e.target.checked)}
            />
          </div>

          {/* Conflict Examples */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">How Conflicts Are Resolved</h4>
            <div className="space-y-2">
              <div className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="FileText" size={16} color="var(--color-primary)" className="mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">document.docx</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Modified on Device A: Jan 10, 2025 at 2:30 PM\n
                      Modified on Device B: Jan 10, 2025 at 3:15 PM
                    </div>
                    <div className="text-xs text-success mt-1">
                      Resolution: {settings.conflictResolution === 'newer' ? 'Keep Device B version (newer)' : 
                                 settings.conflictResolution === 'ask'? 'Ask user to choose' : 'Apply selected rule'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Conflicts */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Recent Conflicts</h4>
            <div className="space-y-2">
              {[
                { file: 'budget-2024.xlsx', resolved: 'Kept newer version', time: '2 hours ago' },
                { file: 'meeting-notes.txt', resolved: 'User chose local', time: '1 day ago' },
                { file: 'project-plan.pdf', resolved: 'Kept larger file', time: '3 days ago' }
              ].map((conflict, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={14} color="var(--color-warning)" />
                    <div>
                      <div className="text-sm text-foreground">{conflict.file}</div>
                      <div className="text-xs text-muted-foreground">{conflict.resolved}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{conflict.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm text-foreground">Conflicts resolved</span>
            </div>
            <span className="text-sm font-medium text-success">12 this month</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConflictResolutionSection;