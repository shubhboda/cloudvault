import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndSort = ({ onSearch, onSort, onViewChange, currentView, searchQuery }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'date-desc', label: 'Modified (Newest)' },
    { value: 'date-asc', label: 'Modified (Oldest)' },
    { value: 'size-desc', label: 'Size (Largest)' },
    { value: 'size-asc', label: 'Size (Smallest)' },
    { value: 'type', label: 'Type' }
  ];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon 
              name={isSearchFocused || searchQuery ? "Search" : "Search"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </div>
          <Input
            type="search"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-10 pr-4"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => onSearch('')}
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Sort Dropdown */}
          <Select
            options={sortOptions}
            value="name-asc"
            onChange={(value) => onSort(value)}
            placeholder="Sort by"
            className="w-40"
          />

          {/* View Toggle - Desktop Only */}
          <div className="hidden md:flex items-center border border-border rounded-lg p-1">
            <Button
              variant={currentView === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('list')}
              className="h-8 w-8 p-0"
            >
              <Icon name="List" size={16} />
            </Button>
            <Button
              variant={currentView === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('grid')}
              className="h-8 w-8 p-0"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;