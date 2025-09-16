import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import TrustIndicators from './components/TrustIndicators';
import EmailVerificationNotice from './components/EmailVerificationNotice';

const Register = () => {
  const navigate = useNavigate();
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleRegistrationSuccess = (email) => {
    setUserEmail(email);
    setShowEmailVerification(true);
  };

  const handleResendEmail = async () => {
    // Simulate resending verification email
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Show success message or handle resend logic
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Cloud" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">CloudVault</span>
            </Link>

            {/* Login Link */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <div className="space-y-8">
              {/* Page Header */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Create Your Account
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Start backing up your files securely in the cloud
                </p>
              </div>

              {/* Email Verification Notice */}
              <EmailVerificationNotice
                email={userEmail}
                onResendEmail={handleResendEmail}
                isVisible={showEmailVerification}
              />

              {!showEmailVerification && (
                <>
                  {/* Social Registration */}
                  <div className="space-y-4">
                    <SocialRegistration />
                    
                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with email
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Registration Form */}
                  <RegistrationForm onSuccess={handleRegistrationSuccess} />
                </>
              )}

              {/* Mobile Trust Indicators */}
              <div className="lg:hidden">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-1">
                      <Icon name="Shield" size={16} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={16} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">99.9% Uptime</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">50K+ Users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trust Indicators & Benefits */}
            <div className="space-y-8">
              <TrustIndicators />

              {/* Service Benefits */}
              <div className="hidden lg:block">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Everything you need to keep your files safe
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg flex-shrink-0">
                        <Icon name="Upload" size={16} color="var(--color-accent)" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          Easy File Upload
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop files or folders to backup instantly
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg flex-shrink-0">
                        <Icon name="Smartphone" size={16} color="var(--color-accent)" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          Access Anywhere
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Access your files from any device, anywhere in the world
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg flex-shrink-0">
                        <Icon name="Share2" size={16} color="var(--color-accent)" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          Secure Sharing
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Share files securely with password protection and expiry dates
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg flex-shrink-0">
                        <Icon name="History" size={16} color="var(--color-accent)" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          Version History
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Keep track of file changes with automatic versioning
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Storage Plans Preview */}
              <div className="hidden lg:block">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Start with 10GB Free
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Free Plan</span>
                      <span className="text-sm font-medium text-foreground">10GB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pro Plan</span>
                      <span className="text-sm font-medium text-foreground">1TB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Business Plan</span>
                      <span className="text-sm font-medium text-foreground">Unlimited</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="mt-4"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    View All Plans
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <button
                type="button"
                className="hover:text-foreground transition-micro"
                onClick={() => window.open('/terms', '_blank')}
              >
                Terms of Service
              </button>
              <button
                type="button"
                className="hover:text-foreground transition-micro"
                onClick={() => window.open('/privacy', '_blank')}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                className="hover:text-foreground transition-micro"
                onClick={() => window.open('/support', '_blank')}
              >
                Support
              </button>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CloudVault. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;