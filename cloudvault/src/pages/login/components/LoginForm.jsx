import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: "demo@cloudvault.com",
    password: "password123"
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Mock successful authentication
        localStorage.setItem('cloudvault_user', JSON.stringify({
          email: formData.email,
          name: formData.email.split('@')[0],
          loginTime: new Date().toISOString()
        }));
        
        if (formData.rememberMe) {
          localStorage.setItem('cloudvault_remember', 'true');
        }
        
        navigate('/file-manager');
      } else {
        setErrors({ 
          submit: `Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}` 
        });
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    localStorage.setItem('cloudvault_user', JSON.stringify({
      email: `user@${provider}.com`,
      name: `${provider} User`,
      loginTime: new Date().toISOString(),
      provider: provider
    }));
    navigate('/file-manager');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            name="rememberMe"
          />
          
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="flex items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <Icon name="AlertCircle" size={16} color="var(--color-destructive)" className="mt-0.5 flex-shrink-0" />
            <span className="text-sm text-destructive">{errors.submit}</span>
          </div>
        )}

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          className="h-12"
        >
          Sign In
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            iconName="Mail"
            iconPosition="left"
            className="h-11"
          >
            Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('microsoft')}
            iconName="Building"
            iconPosition="left"
            className="h-11"
          >
            Microsoft
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-primary hover:underline font-medium"
            >
              Create account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;