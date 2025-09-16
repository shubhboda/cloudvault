import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedOptionsSection = ({ isExpanded, onToggle, settings, onSettingsChange }) => {
  const bandwidthOptions = [
    { value: 'unlimited', label: 'Unlimited' },
    { value: '1', label: '1 Mbps' },
    { value: '5', label: '5 Mbps' },
    { value: '10', label: '10 Mbps' },
    { value: '25', label: '25 Mbps' }
  ];

  const networkOptions = [
    { value: 'any', label: 'Any Network' },
    { value: 'wifi', label: 'WiFi Only' },
    { value: 'ethernet', label: 'Ethernet Only' }
  ];

  const handleBandwidthChange = (value) => {
    onSettingsChange({
      ...settings,
      bandwidthLimit: value
    });
  };

  const handleNetworkChange = (value) => {
    onSettingsChange({
      ...settings,
      networkPreference: value
    });
  };

  const handleBatteryOptimizationChange = (checked) => {
    onSettingsChange({
      ...settings,
      batteryOptimization: checked
    });
  };

  const handlePauseOnBatteryChange = (checked) => {
    onSettingsChange({
      ...settings,
      pauseOnBattery: checked
    });
  };

  const handleCellularDataChange = (checked) => {
    onSettingsChange({
      ...settings,
      allowCellularData: checked
    });
  };

  const handleDataLimitChange = (e) => {
    onSettingsChange({
      ...settings,
      cellularDataLimit: e.target.value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
            <Icon name="Settings" size={18} color="var(--color-warning)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">Advanced Options</h3>
            <p className="text-xs text-muted-foreground">
              Bandwidth, battery, and network settings
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
          {/* Bandwidth Settings */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Bandwidth Control</h4>
            <Select
              label="Upload Speed Limit"
              options={bandwidthOptions}
              value={settings.bandwidthLimit}
              onChange={handleBandwidthChange}
              description="Limit backup upload speed to preserve network performance"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="time"
                value="09:00"
                description="Begin throttling"
              />
              <Input
                label="End Time"
                type="time"
                value="17:00"
                description="End throttling"
              />
            </div>
          </div>

          {/* Network Preferences */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Network Preferences</h4>
            <Select
              label="Preferred Network"
              options={networkOptions}
              value={settings.networkPreference}
              onChange={handleNetworkChange}
              description="Choose which network types to use for backup"
            />

            <Checkbox
              label="Allow cellular data usage"
              description="Use mobile data when WiFi is unavailable"
              checked={settings.allowCellularData}
              onChange={(e) => handleCellularDataChange(e.target.checked)}
            />

            {settings.allowCellularData && (
              <Input
                label="Cellular Data Limit (MB/day)"
                type="number"
                placeholder="500"
                value={settings.cellularDataLimit}
                onChange={handleDataLimitChange}
                description="Daily limit for cellular data usage"
              />
            )}
          </div>

          {/* Battery Settings */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Battery Management</h4>
            <Checkbox
              label="Enable battery optimization"
              description="Reduce backup frequency when battery is low"
              checked={settings.batteryOptimization}
              onChange={(e) => handleBatteryOptimizationChange(e.target.checked)}
            />

            <Checkbox
              label="Pause backup when on battery"
              description="Only backup when device is plugged in"
              checked={settings.pauseOnBattery}
              onChange={(e) => handlePauseOnBatteryChange(e.target.checked)}
            />
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Wifi" size={16} color="var(--color-success)" />
                <span className="text-sm text-foreground">Network Status</span>
              </div>
              <span className="text-sm font-medium text-success">Connected</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Battery" size={16} color="var(--color-primary)" />
                <span className="text-sm text-foreground">Battery Level</span>
              </div>
              <span className="text-sm font-medium text-foreground">85%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptionsSection;