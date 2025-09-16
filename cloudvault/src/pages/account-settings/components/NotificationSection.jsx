import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSection = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    backupComplete: true,
    backupFailed: true,
    storageAlmost: true,
    securityAlerts: true,
    productUpdates: false,
    marketingEmails: false,
    weeklyReports: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    backupComplete: false,
    backupFailed: true,
    storageAlmost: true,
    securityAlerts: true,
    fileShared: true,
    systemMaintenance: true
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    backupStatus: true,
    fileActivity: true,
    systemMessages: true,
    tips: false
  });

  const handleEmailChange = (key, checked) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handlePushChange = (key, checked) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleInAppChange = (key, checked) => {
    setInAppNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const notificationCategories = [
    {
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: 'Mail',
      settings: emailNotifications,
      onChange: handleEmailChange,
      options: [
        { key: 'backupComplete', label: 'Backup Complete', description: 'When your files are successfully backed up' },
        { key: 'backupFailed', label: 'Backup Failed', description: 'When backup encounters an error' },
        { key: 'storageAlmost', label: 'Storage Almost Full', description: 'When you\'re running low on storage space' },
        { key: 'securityAlerts', label: 'Security Alerts', description: 'Important security notifications' },
        { key: 'productUpdates', label: 'Product Updates', description: 'New features and improvements' },
        { key: 'marketingEmails', label: 'Marketing Emails', description: 'Promotional content and offers' },
        { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary of your backup activity' }
      ]
    },
    {
      title: 'Push Notifications',
      description: 'Receive notifications on your devices',
      icon: 'Smartphone',
      settings: pushNotifications,
      onChange: handlePushChange,
      options: [
        { key: 'backupComplete', label: 'Backup Complete', description: 'When your files are successfully backed up' },
        { key: 'backupFailed', label: 'Backup Failed', description: 'When backup encounters an error' },
        { key: 'storageAlmost', label: 'Storage Almost Full', description: 'When you\'re running low on storage space' },
        { key: 'securityAlerts', label: 'Security Alerts', description: 'Important security notifications' },
        { key: 'fileShared', label: 'File Shared', description: 'When someone shares a file with you' },
        { key: 'systemMaintenance', label: 'System Maintenance', description: 'Scheduled maintenance notifications' }
      ]
    },
    {
      title: 'In-App Notifications',
      description: 'Notifications within the application',
      icon: 'Bell',
      settings: inAppNotifications,
      onChange: handleInAppChange,
      options: [
        { key: 'backupStatus', label: 'Backup Status', description: 'Real-time backup progress updates' },
        { key: 'fileActivity', label: 'File Activity', description: 'When files are added, modified, or deleted' },
        { key: 'systemMessages', label: 'System Messages', description: 'Important system announcements' },
        { key: 'tips', label: 'Tips & Suggestions', description: 'Helpful tips to optimize your experience' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {notificationCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name={category.icon} size={20} color="var(--color-primary)" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            {category.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                <Checkbox
                  checked={category.settings[option.key]}
                  onChange={(e) => category.onChange(option.key, e.target.checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{option.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-border">
            <button
              onClick={() => {
                const allEnabled = Object.fromEntries(
                  Object.keys(category.settings).map(key => [key, true])
                );
                if (category.title === 'Email Notifications') setEmailNotifications(allEnabled);
                else if (category.title === 'Push Notifications') setPushNotifications(allEnabled);
                else setInAppNotifications(allEnabled);
              }}
              className="text-xs text-primary hover:underline"
            >
              Enable All
            </button>
            <span className="text-xs text-muted-foreground">•</span>
            <button
              onClick={() => {
                const allDisabled = Object.fromEntries(
                  Object.keys(category.settings).map(key => [key, false])
                );
                if (category.title === 'Email Notifications') setEmailNotifications(allDisabled);
                else if (category.title === 'Push Notifications') setPushNotifications(allDisabled);
                else setInAppNotifications(allDisabled);
              }}
              className="text-xs text-primary hover:underline"
            >
              Disable All
            </button>
          </div>
        </div>
      ))}

      {/* Notification Schedule */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Clock" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Notification Schedule</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-foreground">Quiet Hours</span>
              <p className="text-xs text-muted-foreground">Disable non-critical notifications during these hours</p>
            </div>
            <Checkbox checked onChange={() => {}} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
            <div>
              <label className="text-sm font-medium text-foreground">From</label>
              <select className="mt-1 w-full p-2 border border-border rounded-md bg-background text-foreground">
                <option>10:00 PM</option>
                <option>11:00 PM</option>
                <option>12:00 AM</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">To</label>
              <select className="mt-1 w-full p-2 border border-border rounded-md bg-background text-foreground">
                <option>6:00 AM</option>
                <option>7:00 AM</option>
                <option>8:00 AM</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-foreground">Weekend Notifications</span>
              <p className="text-xs text-muted-foreground">Reduce notification frequency on weekends</p>
            </div>
            <Checkbox onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;