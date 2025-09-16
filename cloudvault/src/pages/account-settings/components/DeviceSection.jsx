import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeviceSection = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "MacBook Pro",
      type: "laptop",
      os: "macOS 14.2",
      lastSync: "2 minutes ago",
      status: "online",
      location: "New York, NY",
      ip: "192.168.1.100",
      filesCount: 1247,
      lastBackup: "2025-01-11T05:37:00Z",
      current: true
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      type: "mobile",
      os: "iOS 17.2",
      lastSync: "15 minutes ago",
      status: "online",
      location: "New York, NY",
      ip: "192.168.1.101",
      filesCount: 892,
      lastBackup: "2025-01-11T05:22:00Z",
      current: false
    },
    {
      id: 3,
      name: "Work Desktop",
      type: "desktop",
      os: "Windows 11",
      lastSync: "2 hours ago",
      status: "offline",
      location: "Boston, MA",
      ip: "10.0.0.50",
      filesCount: 2156,
      lastBackup: "2025-01-11T03:30:00Z",
      current: false
    },
    {
      id: 4,
      name: "iPad Air",
      type: "tablet",
      os: "iPadOS 17.2",
      lastSync: "1 day ago",
      status: "offline",
      location: "New York, NY",
      ip: "192.168.1.102",
      filesCount: 345,
      lastBackup: "2025-01-10T18:45:00Z",
      current: false
    }
  ]);

  const [showRemoveDevice, setShowRemoveDevice] = useState(null);

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'laptop': return 'Laptop';
      case 'mobile': return 'Smartphone';
      case 'desktop': return 'Monitor';
      case 'tablet': return 'Tablet';
      default: return 'HardDrive';
    }
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'var(--color-success)' : 'var(--color-muted-foreground)';
  };

  const handleRemoveDevice = (deviceId) => {
    setDevices(prev => prev.filter(device => device.id !== deviceId));
    setShowRemoveDevice(null);
  };

  const handleWipeDevice = (deviceId) => {
    // Mock remote wipe
    console.log('Initiating remote wipe for device:', deviceId);
  };

  const formatLastBackup = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Connected Devices */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Smartphone" size={20} color="var(--color-primary)" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Connected Devices</h3>
              <p className="text-sm text-muted-foreground">Manage devices that have access to your CloudVault account</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">{devices.length} devices</span>
          </div>
        </div>

        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={getDeviceIcon(device.type)} size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-foreground">{device.name}</h4>
                      {device.current && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          Current Device
                        </span>
                      )}
                      <div className="flex items-center space-x-1">
                        <div 
                          className={`w-2 h-2 rounded-full`}
                          style={{ backgroundColor: getStatusColor(device.status) }}
                        />
                        <span className="text-xs text-muted-foreground capitalize">{device.status}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Monitor" size={12} />
                        <span>{device.os}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{device.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>Last sync: {device.lastSync}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Files" size={12} />
                        <span>{device.filesCount.toLocaleString()} files</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      <span>Last backup: {formatLastBackup(device.lastBackup)}</span>
                      <span className="mx-2">•</span>
                      <span className="font-mono">IP: {device.ip}</span>
                    </div>
                  </div>
                </div>

                {/* Device Actions */}
                <div className="flex items-center space-x-2">
                  {device.status === 'online' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Sync Now
                    </Button>
                  )}
                  
                  {!device.current && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWipeDevice(device.id)}
                        iconName="Trash2"
                        iconPosition="left"
                      >
                        Remote Wipe
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowRemoveDevice(device.id)}
                        iconName="X"
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Backup Status */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">Backup Status</span>
                  <div className="flex items-center space-x-2">
                    {device.status === 'online' ? (
                      <>
                        <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                        <span className="text-xs text-success">Up to date</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Clock" size={14} color="var(--color-warning)" />
                        <span className="text-xs text-warning">Pending sync</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      device.status === 'online' ? 'bg-success' : 'bg-warning'
                    }`}
                    style={{ width: device.status === 'online' ? '100%' : '75%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Device */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors">
            <div className="flex items-center space-x-3">
              <Icon name="Plus" size={20} color="var(--color-primary)" />
              <div>
                <h4 className="text-sm font-medium text-foreground">Add New Device</h4>
                <p className="text-xs text-muted-foreground">Connect another device to sync your files</p>
              </div>
            </div>
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Add Device
            </Button>
          </div>
        </div>
      </div>

      {/* Device Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Settings" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Device Settings</h3>
            <p className="text-sm text-muted-foreground">Configure how devices interact with your account</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-foreground">Auto-sync new devices</span>
              <p className="text-xs text-muted-foreground">Automatically start syncing when a new device is added</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-foreground">Require device approval</span>
              <p className="text-xs text-muted-foreground">Manually approve new devices before they can access your files</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-foreground">Sync over cellular</span>
              <p className="text-xs text-muted-foreground">Allow mobile devices to sync using cellular data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-foreground">Device notifications</span>
              <p className="text-xs text-muted-foreground">Send notifications when devices go online/offline</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Remove Device Confirmation */}
      {showRemoveDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowRemoveDevice(null)} />
          
          <div className="relative w-full max-w-md bg-card rounded-lg shadow-pronounced p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} color="var(--color-warning)" />
              <h3 className="text-lg font-semibold text-foreground">Remove Device</h3>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-foreground">
                Are you sure you want to remove this device? The device will no longer be able to sync with your CloudVault account.
              </p>
              
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="text-sm font-medium text-warning mb-2">This will:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Stop syncing files to this device</li>
                  <li>• Remove the device from your account</li>
                  <li>• Require re-authentication to reconnect</li>
                  <li>• Keep existing files on the device</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="destructive"
                onClick={() => handleRemoveDevice(showRemoveDevice)}
                iconName="Trash2"
                iconPosition="left"
              >
                Remove Device
              </Button>
              <Button variant="outline" onClick={() => setShowRemoveDevice(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceSection;