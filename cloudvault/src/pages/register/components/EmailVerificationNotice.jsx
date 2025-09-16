import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmailVerificationNotice = ({ email, onResendEmail, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
      <div className="flex items-start space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
          <Icon name="Mail" size={16} color="var(--color-primary)" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-foreground">
            Verify Your Email Address
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            We've sent a verification link to{' '}
            <span className="font-medium text-foreground">{email}</span>.
            Please check your inbox and click the link to activate your account.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onResendEmail}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Resend Email
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open('https://gmail.com', '_blank')}
          iconName="ExternalLink"
          iconPosition="left"
        >
          Open Gmail
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        <p>
          <strong>Didn't receive the email?</strong> Check your spam folder or{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={onResendEmail}
          >
            request a new one
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationNotice;