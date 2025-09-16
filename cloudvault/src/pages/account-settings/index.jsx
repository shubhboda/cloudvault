import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import StoragePlanSection from './components/StoragePlanSection';
import NotificationSection from './components/NotificationSection';
import PrivacySection from './components/PrivacySection';
import DeviceSection from './components/DeviceSection';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const settingsTabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and account details'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password, 2FA, and security settings'
    },
    {
      id: 'storage',
      label: 'Storage & Plan',
      icon: 'HardDrive',
      description: 'Storage usage and subscription management'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email, push, and in-app notification preferences'
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Lock',
      description: 'Data sharing and privacy controls'
    },
    {
      id: 'devices',
      label: 'Devices',
      icon: 'Smartphone',
      description: 'Connected devices and sync settings'
    }
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'security':
        return <SecuritySection />;
      case 'storage':
        return <StoragePlanSection />;
      case 'notifications':
        return <NotificationSection />;
      case 'privacy':
        return <PrivacySection />;
      case 'devices':
        return <DeviceSection />;
      default:
        return <ProfileSection />;
    }
  };

  const currentTab = settingsTabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Settings" size={28} color="var(--color-primary)" />
            <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your account preferences, security settings, and privacy controls
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={18} 
                      color={activeTab === tab.id ? 'white' : 'currentColor'} 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{tab.label}</div>
                      <div className={`text-xs mt-0.5 ${
                        activeTab === tab.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Tab Selector */}
          <div className="lg:hidden col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between p-3 text-left"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={currentTab.icon} size={18} color="var(--color-primary)" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{currentTab.label}</div>
                    <div className="text-xs text-muted-foreground">{currentTab.description}</div>
                  </div>
                </div>
                <Icon 
                  name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </button>

              {isMobileMenuOpen && (
                <div className="mt-3 pt-3 border-t border-border space-y-1">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon 
                        name={tab.icon} 
                        size={16} 
                        color={activeTab === tab.id ? 'white' : 'currentColor'} 
                      />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center space-x-3 pb-4 border-b border-border">
                <Icon name={currentTab.icon} size={24} color="var(--color-primary)" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{currentTab.label}</h2>
                  <p className="text-sm text-muted-foreground">{currentTab.description}</p>
                </div>
              </div>

              {/* Active Section Content */}
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;