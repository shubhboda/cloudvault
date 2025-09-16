import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Files',
      items: [
        { label: 'File Manager', path: '/file-manager', icon: 'FolderOpen' },
        { label: 'Upload Files', path: '/upload-files', icon: 'Upload' }
      ]
    },
    {
      label: 'Settings',
      items: [
        { label: 'Backup Settings', path: '/backup-settings', icon: 'Settings' },
        { label: 'Account Settings', path: '/account-settings', icon: 'User' }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-subtle">
        <div className="flex h-16 items-center px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Cloud" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">CloudVault</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-8">
            {navigationItems.map((section) => (
              <div key={section.label} className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-micro">
                  <span>{section.label}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-pronounced opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {section.items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-micro ${
                          isActivePath(item.path) 
                            ? 'text-primary bg-muted' :'text-popover-foreground'
                        }`}
                      >
                        <Icon name={item.icon} size={16} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center space-x-4">
            {/* Upload Progress Indicator (placeholder) */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
              <Icon name="HardDrive" size={16} color="var(--color-success)" />
              <span className="text-xs font-mono text-muted-foreground">2.4GB / 10GB</span>
            </div>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-micro">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              </button>
              
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-pronounced opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleNavigation('/account-settings')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => handleNavigation('/login')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-pronounced z-50 md:hidden animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Cloud" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-foreground">CloudVault</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <nav className="p-4 space-y-6">
              {navigationItems.map((section) => (
                <div key={section.label} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {section.label}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-micro ${
                          isActivePath(item.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-card-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item.icon} size={18} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Mobile Storage Info */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Icon name="HardDrive" size={18} color="var(--color-success)" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Storage Used</div>
                    <div className="text-xs font-mono text-muted-foreground">2.4GB / 10GB</div>
                  </div>
                </div>
              </div>
              
              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-border space-y-1">
                <button
                  onClick={() => handleNavigation('/account-settings')}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-card-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="Settings" size={18} />
                  <span>Account Settings</span>
                </button>
                <button
                  onClick={() => handleNavigation('/login')}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-micro"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;