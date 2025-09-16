import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const SocialRegistration = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialRegister = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      const mockUser = {
        email: provider === 'google' ? 'user@gmail.com' : 'user@outlook.com',
        name: 'John Doe',
        provider: provider,
        registeredAt: new Date().toISOString()
      };
      
      localStorage.setItem('cloudvault_user', JSON.stringify(mockUser));
      navigate('/file-manager');
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        fullWidth
        loading={loadingProvider === 'google'}
        disabled={loadingProvider !== null}
        onClick={() => handleSocialRegister('google')}
        iconName="Mail"
        iconPosition="left"
      >
        Continue with Google
      </Button>
      
      <Button
        type="button"
        variant="outline"
        fullWidth
        loading={loadingProvider === 'microsoft'}
        disabled={loadingProvider !== null}
        onClick={() => handleSocialRegister('microsoft')}
        iconName="Building"
        iconPosition="left"
      >
        Continue with Microsoft
      </Button>
    </div>
  );
};

export default SocialRegistration;