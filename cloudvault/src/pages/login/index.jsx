import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from './components/BrandHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('cloudvault_user');
    if (user) {
      navigate('/file-manager');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-700"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-md text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-8 backdrop-blur-sm">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-xl">
                  <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">
                Your Files, Everywhere
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Secure cloud backup with military-grade encryption. Access your files from any device, anywhere in the world.
              </p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-100">Automatic backup & sync</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-100">End-to-end encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-100">Cross-platform access</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Brand Header */}
            <div className="lg:hidden">
              <BrandHeader />
            </div>

            {/* Desktop Welcome */}
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground">
                Sign in to your CloudVault account
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-card p-8 rounded-xl shadow-subtle border border-border">
              <LoginForm />
            </div>

            {/* Security Badges */}
            <SecurityBadges />

            {/* Footer */}
            <div className="text-center mt-8 pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} CloudVault. All rights reserved.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                  Privacy Policy
                </button>
                <span className="text-xs text-border">•</span>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                  Terms of Service
                </button>
                <span className="text-xs text-border">•</span>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;