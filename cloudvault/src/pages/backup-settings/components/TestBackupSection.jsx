import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestBackupSection = ({ settings }) => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const runTestBackup = async () => {
    setIsTestRunning(true);
    setTestResults(null);

    // Simulate test backup process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock test results
      setTestResults({
        success: true,
        filesScanned: 1247,
        estimatedSize: '2.4 GB',
        estimatedTime: '4m 32s',
        warnings: [
          '3 files exceed size limit and will be skipped',
          'Network speed may affect backup duration'
        ],
        recommendations: [
          'Consider increasing bandwidth limit for faster backups',
          'Enable compression to reduce backup size'
        ]
      });
    } catch (error) {
      setTestResults({
        success: false,
        error: 'Test backup failed: Network connection timeout'
      });
    } finally {
      setIsTestRunning(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
          <Icon name="Play" size={18} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Test Backup Configuration</h3>
          <p className="text-xs text-muted-foreground">
            Validate your settings before applying changes
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-muted/20 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Current Configuration</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>• Frequency: {settings.frequency}</div>
            <div>• Include paths: {settings.includePaths.length} folders</div>
            <div>• Exclude paths: {settings.excludePaths.length} folders</div>
            <div>• Max file size: {settings.maxFileSize || 'Unlimited'} MB</div>
            <div>• Encryption: {settings.encryptionLevel}</div>
            <div>• Versioning: {settings.versioningEnabled ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>

        <Button
          variant="default"
          onClick={runTestBackup}
          loading={isTestRunning}
          iconName="Play"
          iconPosition="left"
          fullWidth
        >
          {isTestRunning ? 'Running Test...' : 'Run Test Backup'}
        </Button>

        {testResults && (
          <div className="space-y-3">
            {testResults.success ? (
              <>
                <div className="flex items-center space-x-2 p-3 bg-success/10 rounded-lg">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-success">Test Backup Successful</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-semibold text-foreground">{testResults.filesScanned}</div>
                    <div className="text-xs text-muted-foreground">Files Scanned</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-semibold text-foreground">{testResults.estimatedSize}</div>
                    <div className="text-xs text-muted-foreground">Estimated Size</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-lg font-semibold text-foreground">{testResults.estimatedTime}</div>
                    <div className="text-xs text-muted-foreground">Estimated Time</div>
                  </div>
                </div>

                {testResults.warnings.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">Warnings</h5>
                    {testResults.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-warning/10 rounded-md">
                        <Icon name="AlertTriangle" size={14} color="var(--color-warning)" className="mt-0.5" />
                        <span className="text-xs text-foreground">{warning}</span>
                      </div>
                    ))}
                  </div>
                )}

                {testResults.recommendations.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">Recommendations</h5>
                    {testResults.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-primary/10 rounded-md">
                        <Icon name="Lightbulb" size={14} color="var(--color-primary)" className="mt-0.5" />
                        <span className="text-xs text-foreground">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-2 p-3 bg-destructive/10 rounded-lg">
                <Icon name="XCircle" size={16} color="var(--color-destructive)" />
                <div>
                  <div className="text-sm font-medium text-destructive">Test Failed</div>
                  <div className="text-xs text-muted-foreground">{testResults.error}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestBackupSection;