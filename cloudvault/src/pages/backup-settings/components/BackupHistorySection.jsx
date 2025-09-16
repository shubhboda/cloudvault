import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BackupHistorySection = ({ isExpanded, onToggle }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const periodOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' }
  ];

  const backupHistory = [
    {
      id: 1,
      date: '2025-01-11',
      time: '03:30 AM',
      status: 'success',
      filesBackedUp: 247,
      dataSize: '1.2 GB',
      duration: '4m 32s',
      type: 'Scheduled'
    },
    {
      id: 2,
      date: '2025-01-10',
      time: '03:30 AM',
      status: 'success',
      filesBackedUp: 189,
      dataSize: '892 MB',
      duration: '3m 18s',
      type: 'Scheduled'
    },
    {
      id: 3,
      date: '2025-01-09',
      time: '03:30 AM',
      status: 'partial',
      filesBackedUp: 156,
      dataSize: '654 MB',
      duration: '2m 45s',
      type: 'Scheduled',
      error: '3 files skipped due to size limit'
    },
    {
      id: 4,
      date: '2025-01-08',
      time: '11:45 AM',
      status: 'success',
      filesBackedUp: 45,
      dataSize: '234 MB',
      duration: '1m 12s',
      type: 'Manual'
    },
    {
      id: 5,
      date: '2025-01-07',
      time: '03:30 AM',
      status: 'failed',
      filesBackedUp: 0,
      dataSize: '0 MB',
      duration: '0m 15s',
      type: 'Scheduled',
      error: 'Network connection timeout'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return { name: 'CheckCircle', color: 'var(--color-success)' };
      case 'partial':
        return { name: 'AlertTriangle', color: 'var(--color-warning)' };
      case 'failed':
        return { name: 'XCircle', color: 'var(--color-destructive)' };
      default:
        return { name: 'Clock', color: 'var(--color-muted-foreground)' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Completed';
      case 'partial':
        return 'Partial';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={18} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground">Backup History</h3>
            <p className="text-xs text-muted-foreground">
              Recent backup activity and logs
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
          {/* Filter Controls */}
          <div className="flex items-center justify-between">
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              className="w-48"
            />
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export Log
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-success/10 rounded-lg text-center">
              <div className="text-lg font-semibold text-success">4</div>
              <div className="text-xs text-muted-foreground">Successful</div>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg text-center">
              <div className="text-lg font-semibold text-warning">1</div>
              <div className="text-xs text-muted-foreground">Partial</div>
            </div>
            <div className="p-3 bg-destructive/10 rounded-lg text-center">
              <div className="text-lg font-semibold text-destructive">1</div>
              <div className="text-xs text-muted-foreground">Failed</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg text-center">
              <div className="text-lg font-semibold text-foreground">3.0 GB</div>
              <div className="text-xs text-muted-foreground">Total Data</div>
            </div>
          </div>

          {/* Backup History List */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Recent Backups</h4>
            <div className="space-y-2">
              {backupHistory.map((backup) => {
                const statusIcon = getStatusIcon(backup.status);
                return (
                  <div key={backup.id} className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={statusIcon.name} 
                          size={18} 
                          color={statusIcon.color} 
                          className="mt-0.5" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-foreground">
                              {getStatusText(backup.status)} Backup
                            </span>
                            <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                              {backup.type}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>{backup.date} at {backup.time}</div>
                            {backup.status !== 'failed' && (
                              <div>
                                {backup.filesBackedUp} files • {backup.dataSize} • {backup.duration}
                              </div>
                            )}
                            {backup.error && (
                              <div className="text-destructive">{backup.error}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Icon name="MoreHorizontal" size={14} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronDown"
              iconPosition="left"
            >
              Load More History
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupHistorySection;