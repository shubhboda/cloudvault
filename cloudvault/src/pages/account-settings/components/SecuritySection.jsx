import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecuritySection = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      location: "New York, NY",
      browser: "Chrome 119",
      lastActive: "2 minutes ago",
      current: true,
      ip: "192.168.1.100"
    },
    {
      id: 2,
      device: "iPhone 15",
      location: "New York, NY",
      browser: "Safari Mobile",
      lastActive: "1 hour ago",
      current: false,
      ip: "192.168.1.101"
    },
    {
      id: 3,
      device: "Windows PC",
      location: "Boston, MA",
      browser: "Edge 119",
      lastActive: "3 days ago",
      current: false,
      ip: "10.0.0.50"
    }
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Mock password change
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogoutSession = (sessionId) => {
    // Mock session logout
    console.log('Logging out session:', sessionId);
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShowTwoFactor(false);
  };

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Lock" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Password & Security</h3>
          </div>
          {!showPasswordForm && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowPasswordForm(true)}
              iconName="Key"
              iconPosition="left"
            >
              Change Password
            </Button>
          )}
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              description="Must be at least 8 characters with uppercase, lowercase, and numbers"
              required
            />
            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            <div className="flex items-center space-x-3">
              <Button type="submit" variant="default" iconName="Check" iconPosition="left">
                Update Password
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {!showPasswordForm && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm text-foreground">Password last changed 30 days ago</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Use a strong password that's at least 8 characters long and includes numbers, letters, and special characters.
            </p>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
          </div>
          <div className="flex items-center space-x-2">
            {twoFactorEnabled ? (
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-sm text-success font-medium">Enabled</span>
              </div>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setShowTwoFactor(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Enable 2FA
              </Button>
            )}
          </div>
        </div>

        {showTwoFactor && !twoFactorEnabled && (
          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <div className="w-32 h-32 bg-white border-2 border-border rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="text-xs text-muted-foreground">QR Code</div>
              </div>
              <p className="text-sm text-foreground mb-2">
                Scan this QR code with your authenticator app
              </p>
              <p className="text-xs font-mono bg-background px-2 py-1 rounded border">
                JBSWY3DPEHPK3PXP
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="default" onClick={handleEnable2FA} iconName="Check" iconPosition="left">
                Enable 2FA
              </Button>
              <Button variant="outline" onClick={() => setShowTwoFactor(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {twoFactorEnabled && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Smartphone" size={16} color="var(--color-success)" />
              <span className="text-sm text-foreground">Authenticator app configured</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your account is protected with two-factor authentication. You'll need your authenticator app to sign in.
            </p>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Download Backup Codes
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setTwoFactorEnabled(false)}>
                Disable 2FA
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Monitor" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
        </div>

        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon 
                    name={session.device.includes('iPhone') ? 'Smartphone' : session.device.includes('MacBook') ? 'Laptop' : 'Monitor'} 
                    size={18} 
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{session.device}</span>
                    {session.current && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {session.browser} • {session.location} • {session.lastActive}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    IP: {session.ip}
                  </div>
                </div>
              </div>
              {!session.current && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLogoutSession(session.id)}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Sign Out
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" iconName="LogOut" iconPosition="left">
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;