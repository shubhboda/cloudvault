import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const NotificationSection = ({ isExpanded, onToggle, settings, onSettingsChange }) => {
  const handleEmailNotificationsChange = (checked) => {
    onSettingsChange({
      ...settings,
      emailNotifications: checked
    });
  };

  const handleInAppNotificationsChange = (checked) => {
    onSettingsChange({
      ...settings,
      inAppNotifications: checked
    });
  };

  const handleBackupCompleteChange = (checked) => {
    onSettingsChange({
      ...settings,
      notifyBackupComplete: checked
    });
  };

  const handleBackupErrorsChange = (checked) => {
    onSettingsChange({
      ...settings,
      notifyBackupErrors: checked
    });
  };

  const handleStorageWarningsChange = (checked) => {
    onSettingsChange({
      ...settings,
      notifyStorageWarnings: checked
    });
  };

  const handleQuotaAlertsChange = (checked) => {
    onSettingsChange({
      ...settings,
      notifyQuotaAlerts: checked
    });
  };

  const handleEmailChange = (e) => {
    onSettingsChange({
      ...settings,
      notificationEmail: e.target.value
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
            <Icon name="Bell" size={18} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">Notifications</h3>
            <p className="text-xs text-muted-foreground">
              {settings.emailNotifications || settings.inAppNotifications ? 'Notifications enabled' : 'Notifications disabled'}
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
          {/* Notification Methods */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Notification Methods</h4>
            <div className="space-y-2">
              <Checkbox
                label="Email notifications"
                description="Receive notifications via email"
                checked={settings.emailNotifications}
                onChange={(e) => handleEmailNotificationsChange(e.target.checked)}
              />

              <Checkbox
                label="In-app notifications"
                description="Show notifications within the application"
                checked={settings.inAppNotifications}
                onChange={(e) => handleInAppNotificationsChange(e.target.checked)}
              />
            </div>

            {settings.emailNotifications && (
              <Input
                label="Notification Email"
                type="email"
                placeholder="your-email@example.com"
                value={settings.notificationEmail}
                onChange={handleEmailChange}
                description="Email address for backup notifications"
              />
            )}
          </div>

          {/* Notification Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Notification Types</h4>
            <div className="space-y-2">
              <Checkbox
                label="Backup completion"
                description="Notify when backup operations complete successfully"
                checked={settings.notifyBackupComplete}
                onChange={(e) => handleBackupCompleteChange(e.target.checked)}
              />

              <Checkbox
                label="Backup errors"
                description="Alert when backup operations fail or encounter errors"
                checked={settings.notifyBackupErrors}
                onChange={(e) => handleBackupErrorsChange(e.target.checked)}
              />

              <Checkbox
                label="Storage warnings"
                description="Warn when storage space is running low"
                checked={settings.notifyStorageWarnings}
                onChange={(e) => handleStorageWarningsChange(e.target.checked)}
              />

              <Checkbox
                label="Quota alerts"
                description="Alert when approaching storage quota limits"
                checked={settings.notifyQuotaAlerts}
                onChange={(e) => handleQuotaAlertsChange(e.target.checked)}
              />
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Recent Notifications</h4>
            <div className="space-y-2">
              {[
                { 
                  type: 'success', 
                  message: 'Daily backup completed successfully', 
                  time: '2 hours ago',
                  icon: 'CheckCircle',
                  color: 'var(--color-success)'
                },
                { 
                  type: 'warning', 
                  message: 'Storage 80% full - consider upgrading', 
                  time: '1 day ago',
                  icon: 'AlertTriangle',
                  color: 'var(--color-warning)'
                },
                { 
                  type: 'info', 
                  message: 'New device connected: iPhone 15', 
                  time: '3 days ago',
                  icon: 'Smartphone',
                  color: 'var(--color-primary)'
                }
              ].map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                  <Icon name={notification.icon} size={16} color={notification.color} className="mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-foreground">{notification.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} color="var(--color-primary)" />
                <span className="text-sm text-foreground">Email Sent</span>
              </div>
              <span className="text-sm font-medium text-foreground">24 this month</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Bell" size={16} color="var(--color-accent)" />
                <span className="text-sm text-foreground">In-App Alerts</span>
              </div>
              <span className="text-sm font-medium text-foreground">12 unread</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSection;