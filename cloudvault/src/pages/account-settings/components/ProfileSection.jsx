import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });
  const [tempData, setTempData] = useState({ ...profileData });
  const [isEmailVerified, setIsEmailVerified] = useState(true);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
    // Mock save success
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerifyEmail = () => {
    // Mock email verification
    setIsEmailVerified(true);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
        </div>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={handleEdit} iconName="Edit" iconPosition="left">
            Edit Profile
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
              <img
                src={profileData.avatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Camera" size={14} color="white" />
              </button>
            )}
          </div>
          <div>
            <h4 className="font-medium text-foreground">{profileData.name}</h4>
            <p className="text-sm text-muted-foreground">CloudVault Member since Jan 2024</p>
            {isEditing && (
              <Button variant="ghost" size="sm" className="mt-1 h-8 px-2">
                <Icon name="Upload" size={14} className="mr-1" />
                Change Photo
              </Button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={isEditing ? tempData.name : profileData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />

          <div className="space-y-2">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={isEditing ? tempData.email : profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
            {!isEmailVerified && (
              <div className="flex items-center justify-between p-2 bg-warning/10 border border-warning/20 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
                  <span className="text-xs text-warning">Email not verified</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleVerifyEmail} className="h-6 text-xs">
                  Verify
                </Button>
              </div>
            )}
            {isEmailVerified && (
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                <span className="text-xs text-success">Email verified</span>
              </div>
            )}
          </div>

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={isEditing ? tempData.phone : profileData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Account Type</label>
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
              <Icon name="Crown" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">Premium Plan</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <Button variant="default" onClick={handleSave} iconName="Check" iconPosition="left">
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;