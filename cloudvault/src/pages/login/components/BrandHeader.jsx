import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-subtle">
            <Icon name="Cloud" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">CloudVault</h1>
            <p className="text-sm text-muted-foreground">Secure Cloud Backup</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to access your secure cloud storage and manage your files
        </p>
      </div>

      {/* Current Status Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-4 p-2 bg-success/10 rounded-lg">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-xs text-success font-medium">All systems operational</span>
      </div>
    </div>
  );
};

export default BrandHeader;