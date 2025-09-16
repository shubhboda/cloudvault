import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StoragePlanSection = () => {
  const [currentPlan, setCurrentPlan] = useState('premium');
  const [showUpgrade, setShowUpgrade] = useState(false);

  const storageUsage = {
    used: 2.4,
    total: 10,
    percentage: 24
  };

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      storage: '2 GB',
      price: '$0',
      period: 'forever',
      features: [
        'Basic file backup',
        'Web access only',
        'Email support',
        '30-day file history'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      storage: '10 GB',
      price: '$9.99',
      period: 'per month',
      features: [
        'Advanced file backup',
        'Multi-device sync',
        'Priority support',
        '90-day file history',
        'File sharing & collaboration',
        'Advanced security features'
      ],
      popular: true
    },
    {
      id: 'business',
      name: 'Business Plan',
      storage: '100 GB',
      price: '$29.99',
      period: 'per month',
      features: [
        'Enterprise file backup',
        'Unlimited devices',
        '24/7 phone support',
        '1-year file history',
        'Team collaboration tools',
        'Advanced admin controls',
        'API access',
        'Custom branding'
      ],
      popular: false
    }
  ];

  const usageBreakdown = [
    { type: 'Documents', size: 0.8, color: 'bg-blue-500' },
    { type: 'Images', size: 1.2, color: 'bg-green-500' },
    { type: 'Videos', size: 0.3, color: 'bg-purple-500' },
    { type: 'Other', size: 0.1, color: 'bg-gray-500' }
  ];

  const handlePlanChange = (planId) => {
    setCurrentPlan(planId);
    setShowUpgrade(false);
  };

  return (
    <div className="space-y-6">
      {/* Current Plan & Usage */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="HardDrive" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Storage & Plan</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Storage Usage */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Storage Used</span>
                <span className="text-sm font-mono text-muted-foreground">
                  {storageUsage.used} GB / {storageUsage.total} GB
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="h-3 bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${storageUsage.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">{storageUsage.percentage}% used</span>
                <span className="text-xs text-muted-foreground">
                  {storageUsage.total - storageUsage.used} GB remaining
                </span>
              </div>
            </div>

            {/* Usage Breakdown */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Storage Breakdown</h4>
              {usageBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-foreground">{item.type}</span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{item.size} GB</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Plan */}
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">Current Plan</h4>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Crown" size={16} color="var(--color-warning)" />
                  <span className="text-lg font-semibold text-foreground">Premium Plan</span>
                </div>
                <p className="text-sm text-muted-foreground">10 GB storage • $9.99/month</p>
                <p className="text-xs text-muted-foreground">Next billing: January 15, 2025</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="default" 
                onClick={() => setShowUpgrade(true)}
                iconName="ArrowUp"
                iconPosition="left"
              >
                Upgrade Plan
              </Button>
              <Button variant="outline" size="sm">
                Manage Billing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      {showUpgrade && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Choose Your Plan</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowUpgrade(false)}>
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative p-6 border rounded-lg transition-all ${
                  plan.id === currentPlan 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                } ${plan.popular ? 'ring-2 ring-primary/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h4>
                  <div className="text-2xl font-bold text-foreground">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.period}</div>
                  <div className="text-sm font-medium text-primary mt-1">{plan.storage} storage</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} color="var(--color-success)" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.id === currentPlan ? "outline" : "default"}
                  fullWidth
                  onClick={() => handlePlanChange(plan.id)}
                  disabled={plan.id === currentPlan}
                >
                  {plan.id === currentPlan ? 'Current Plan' : 'Select Plan'}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
              <div className="text-sm text-foreground">
                <p className="font-medium mb-1">Plan Change Information</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Upgrades take effect immediately</li>
                  <li>• Downgrades take effect at the next billing cycle</li>
                  <li>• Unused storage will be preserved for 30 days</li>
                  <li>• All plans include 99.9% uptime guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="CreditCard" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
        </div>

        <div className="space-y-3">
          {[
            { date: '2024-12-15', amount: '$9.99', status: 'Paid', invoice: 'INV-2024-12-001' },
            { date: '2024-11-15', amount: '$9.99', status: 'Paid', invoice: 'INV-2024-11-001' },
            { date: '2024-10-15', amount: '$9.99', status: 'Paid', invoice: 'INV-2024-10-001' }
          ].map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Receipt" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">{bill.invoice}</div>
                  <div className="text-xs text-muted-foreground">{bill.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground">{bill.amount}</span>
                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                  {bill.status}
                </span>
                <Button variant="ghost" size="sm" iconName="Download">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoragePlanSection;