import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: "Shield",
      title: "256-bit SSL Encryption",
      description: "Your data is protected with bank-level security"
    },
    {
      icon: "Lock",
      title: "Zero-Knowledge Architecture",
      description: "Only you can access your encrypted files"
    },
    {
      icon: "CheckCircle",
      title: "99.9% Uptime Guarantee",
      description: "Reliable access to your files anytime"
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Trusted by 50,000+ Users
        </h3>
        <p className="text-sm text-muted-foreground">
          Your files are protected with enterprise-grade security
        </p>
      </div>

      <div className="space-y-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full flex-shrink-0">
              <Icon name={feature.icon} size={16} color="var(--color-success)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">
                {feature.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} color="var(--color-warning)" />
          <span className="text-xs text-muted-foreground">SOC 2 Certified</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Globe" size={16} color="var(--color-primary)" />
          <span className="text-xs text-muted-foreground">GDPR Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;