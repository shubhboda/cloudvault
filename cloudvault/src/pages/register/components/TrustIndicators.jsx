import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: 'AES-256 encryption protects your files'
    },
    {
      icon: 'Clock',
      title: '99.9% Uptime',
      description: 'Reliable access to your files anytime'
    },
    {
      icon: 'Users',
      title: 'Trusted by 50K+',
      description: 'Users worldwide trust CloudVault'
    }
  ];

  return (
    <div className="hidden lg:block">
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Why Choose CloudVault?
        </h3>
        
        <div className="space-y-4">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={feature.icon} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={14} color="var(--color-success)" />
              <span className="text-xs text-muted-foreground">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span className="text-xs text-muted-foreground">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;