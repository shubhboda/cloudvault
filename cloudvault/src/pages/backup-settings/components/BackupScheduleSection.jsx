import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const BackupScheduleSection = ({ isExpanded, onToggle, settings, onSettingsChange }) => {
  const frequencyOptions = [
    { value: 'continuous', label: 'Continuous (Real-time)' },
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' }
  ];

  const timezoneOptions = [
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC+0', label: 'UTC (GMT)' },
    { value: 'UTC+5:30', label: 'India Standard Time (UTC+5:30)' }
  ];

  const handleFrequencyChange = (value) => {
    onSettingsChange({
      ...settings,
      frequency: value
    });
  };

  const handleTimeChange = (e) => {
    onSettingsChange({
      ...settings,
      scheduledTime: e.target.value
    });
  };

  const handleTimezoneChange = (value) => {
    onSettingsChange({
      ...settings,
      timezone: value
    });
  };

  const handleAutoStartChange = (checked) => {
    onSettingsChange({
      ...settings,
      autoStart: checked
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Icon name="Clock" size={18} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">Backup Schedule</h3>
            <p className="text-xs text-muted-foreground">
              {settings.frequency === 'continuous' ? 'Real-time backup enabled' : `Scheduled ${settings.frequency}`}
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
        <div className="p-4 border-t border-border space-y-4">
          <Select
            label="Backup Frequency"
            options={frequencyOptions}
            value={settings.frequency}
            onChange={handleFrequencyChange}
            description="Choose how often your files should be backed up"
          />

          {settings.frequency !== 'continuous' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Scheduled Time"
                type="time"
                value={settings.scheduledTime}
                onChange={handleTimeChange}
                description="Time when backup should start"
              />

              <Select
                label="Timezone"
                options={timezoneOptions}
                value={settings.timezone}
                onChange={handleTimezoneChange}
                description="Your local timezone"
              />
            </div>
          )}

          <Checkbox
            label="Auto-start backup on system startup"
            description="Automatically begin backup process when your device starts"
            checked={settings.autoStart}
            onChange={(e) => handleAutoStartChange(e.target.checked)}
          />

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} color="var(--color-primary)" />
              <span className="text-sm text-foreground">Next backup scheduled</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              {settings.frequency === 'continuous' ? 'Continuous' : 'Today at 2:00 PM'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupScheduleSection;