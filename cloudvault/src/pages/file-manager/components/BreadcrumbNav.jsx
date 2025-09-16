import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BreadcrumbNav = ({ currentPath, onNavigate }) => {
  const pathSegments = currentPath.split('/').filter(segment => segment !== '');
  
  const breadcrumbs = [
    { name: 'My Files', path: '/' },
    ...pathSegments.map((segment, index) => ({
      name: segment,
      path: '/' + pathSegments.slice(0, index + 1).join('/')
    }))
  ];

  return (
    <nav className="flex items-center space-x-1 p-4 bg-card border-b border-border overflow-x-auto">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
          )}
          <Button
            variant={index === breadcrumbs.length - 1 ? "default" : "ghost"}
            size="sm"
            onClick={() => onNavigate(breadcrumb.path)}
            className={`flex-shrink-0 ${index === breadcrumbs.length - 1 ? 'pointer-events-none' : ''}`}
          >
            {index === 0 && <Icon name="Home" size={16} className="mr-1" />}
            {breadcrumb.name}
          </Button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;