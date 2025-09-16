import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const SecuritySection = ({ isExpanded, onToggle, settings, onSettingsChange }) => {
  const encryptionOptions = [
    { value: 'aes256', label: 'AES-256 (Recommended)' },
    { value: 'aes128', label: 'AES-128 (Faster)' },
    { value: 'none', label: 'No Encryption (Not Recommended)' }
  ];

  const handleEncryptionChange = (value) => {
    onSettingsChange({
      ...settings,
      encryptionLevel: value
    });
  };

  const handleClientSideEncryptionChange = (checked) => {
    onSettingsChange({
      ...settings,
      clientSideEncryption: checked
    });
  };

  const handleVerifyBackupsChange = (checked) => {
    onSettingsChange({
      ...settings,
      verifyBackups: checked
    });
  };

  const handleTwoFactorChange = (checked) => {
    onSettingsChange({
      ...settings,
      requireTwoFactor: checked
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
            <Icon name="Shield" size={18} color="var(--color-success)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">Security & Encryption</h3>
            <p className="text-xs text-muted-foreground">
              {settings.encryptionLevel === 'aes256' ? 'AES-256 encryption enabled' : 'Security settings'}
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
          {/* Encryption Settings */}
          <div className="space-y-4">
            <Select
              label="Encryption Level"
              options={encryptionOptions}
              value={settings.encryptionLevel}
              onChange={handleEncryptionChange}
              description="Choose encryption strength for your backup data"
            />

            <Checkbox
              label="Client-side encryption"
              description="Encrypt files on your device before uploading (recommended)"
              checked={settings.clientSideEncryption}
              onChange={(e) => handleClientSideEncryptionChange(e.target.checked)}
            />

            <Checkbox
              label="Verify backup integrity"
              description="Automatically verify that backed up files are not corrupted"
              checked={settings.verifyBackups}
              onChange={(e) => handleVerifyBackupsChange(e.target.checked)}
            />

            <Checkbox
              label="Require two-factor authentication"
              description="Require 2FA for accessing backup settings and data"
              checked={settings.requireTwoFactor}
              onChange={(e) => handleTwoFactorChange(e.target.checked)}
            />
          </div>

          {/* Security Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Security Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} color="var(--color-success)" />
                  <span className="text-sm text-foreground">Encryption Status</span>
                </div>
                <span className="text-sm font-medium text-success">Active</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  <span className="text-sm text-foreground">Last Verification</span>
                </div>
                <span className="text-sm font-medium text-success">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Key" size={16} color="var(--color-primary)" />
                  <span className="text-sm text-foreground">Encryption Key</span>
                </div>
                <span className="text-sm font-medium text-foreground">Secure</span>
              </div>
            </div>
          </div>

          {/* Security Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Security Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                fullWidth
              >
                Export Encryption Key
              </Button>

              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                fullWidth
              >
                Regenerate Key
              </Button>

              <Button
                variant="outline"
                size="sm"
                iconName="Shield"
                iconPosition="left"
                fullWidth
              >
                Run Security Scan
              </Button>

              <Button
                variant="outline"
                size="sm"
                iconName="FileText"
                iconPosition="left"
                fullWidth
              >
                View Audit Log
              </Button>
            </div>
          </div>

          {/* Security Recommendations */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Security Recommendations</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Enable Two-Factor Authentication</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Regular Key Rotation</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Consider rotating your encryption key every 6 months
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;