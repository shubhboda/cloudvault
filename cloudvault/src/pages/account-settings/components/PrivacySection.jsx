import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySection = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    analyticsTracking: true,
    profileVisibility: 'private',
    activityTracking: true,
    thirdPartyIntegrations: false,
    marketingCommunications: false
  });

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataExport = () => {
    // Mock data export
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE') {
      // Mock account deletion
      console.log('Account deletion initiated...');
      setShowDeleteAccount(false);
      setDeleteConfirmation('');
    }
  };

  const privacyOptions = [
    {
      key: 'dataSharing',
      title: 'Data Sharing with Partners',
      description: 'Allow CloudVault to share anonymized usage data with trusted partners for service improvement',
      type: 'checkbox'
    },
    {
      key: 'analyticsTracking',
      title: 'Analytics & Performance Tracking',
      description: 'Help us improve CloudVault by sharing anonymous usage statistics and performance data',
      type: 'checkbox'
    },
    {
      key: 'profileVisibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      type: 'select',
      options: [
        { value: 'public', label: 'Public - Anyone can see your profile' },
        { value: 'private', label: 'Private - Only you can see your profile' },
        { value: 'contacts', label: 'Contacts Only - Only people you share files with' }
      ]
    },
    {
      key: 'activityTracking',
      title: 'Activity Tracking',
      description: 'Track your file access patterns to provide personalized recommendations',
      type: 'checkbox'
    },
    {
      key: 'thirdPartyIntegrations',
      title: 'Third-Party Integrations',
      description: 'Allow third-party applications to access your CloudVault data with your permission',
      type: 'checkbox'
    },
    {
      key: 'marketingCommunications',
      title: 'Marketing Communications',
      description: 'Receive personalized marketing communications based on your usage patterns',
      type: 'checkbox'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Privacy Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Shield" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Privacy Controls</h3>
            <p className="text-sm text-muted-foreground">Manage how your data is used and shared</p>
          </div>
        </div>

        <div className="space-y-6">
          {privacyOptions.map((option, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{option.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                </div>
                
                {option.type === 'checkbox' && (
                  <Checkbox
                    checked={privacySettings[option.key]}
                    onChange={(e) => handlePrivacyChange(option.key, e.target.checked)}
                    className="ml-4"
                  />
                )}
                
                {option.type === 'select' && (
                  <select
                    value={privacySettings[option.key]}
                    onChange={(e) => handlePrivacyChange(option.key, e.target.value)}
                    className="ml-4 p-2 border border-border rounded-md bg-background text-foreground text-sm min-w-48"
                  >
                    {option.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              
              {index < privacyOptions.length - 1 && (
                <hr className="border-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Database" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
            <p className="text-sm text-muted-foreground">Control your personal data and account</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Data Export */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Download" size={18} color="var(--color-primary)" />
              <div>
                <h4 className="text-sm font-medium text-foreground">Export Your Data</h4>
                <p className="text-xs text-muted-foreground">Download a copy of all your data in standard formats</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleDataExport} iconName="Download" iconPosition="left">
              Export Data
            </Button>
          </div>

          {/* Data Retention */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={18} color="var(--color-primary)" />
              <div>
                <h4 className="text-sm font-medium text-foreground">Data Retention</h4>
                <p className="text-xs text-muted-foreground">Your data is retained for 90 days after account deletion</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Learn More
            </Button>
          </div>

          {/* Account Deletion */}
          <div className="flex items-center justify-between p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Trash2" size={18} color="var(--color-destructive)" />
              <div>
                <h4 className="text-sm font-medium text-destructive">Delete Account</h4>
                <p className="text-xs text-muted-foreground">Permanently delete your account and all associated data</p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setShowDeleteAccount(true)}
              iconName="Trash2" 
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Account Deletion Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteAccount(false)} />
          
          <div className="relative w-full max-w-md bg-card rounded-lg shadow-pronounced p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} color="var(--color-destructive)" />
              <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-foreground">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
              
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="text-sm font-medium text-destructive mb-2">What will be deleted:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• All your files and backups</li>
                  <li>• Account settings and preferences</li>
                  <li>• Billing and subscription information</li>
                  <li>• File sharing links and permissions</li>
                </ul>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Type <span className="font-mono bg-muted px-1 rounded">DELETE</span> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="mt-1 w-full p-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Type DELETE to confirm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE'}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Account
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteAccount(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Info" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Privacy Information</h3>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Data Encryption</h4>
            <p>All your files are encrypted using AES-256 encryption both in transit and at rest. Your encryption keys are managed securely and never shared with third parties.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Data Location</h4>
            <p>Your data is stored in secure data centers located in the United States. We comply with all applicable data protection regulations including GDPR and CCPA.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Third-Party Access</h4>
            <p>We never sell your personal data to third parties. Any data sharing is done only with your explicit consent and for the purpose of providing our services.</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" iconName="FileText" iconPosition="left">
              Privacy Policy
            </Button>
            <Button variant="ghost" size="sm" iconName="FileText" iconPosition="left">
              Terms of Service
            </Button>
            <Button variant="ghost" size="sm" iconName="Mail" iconPosition="left">
              Contact Privacy Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;