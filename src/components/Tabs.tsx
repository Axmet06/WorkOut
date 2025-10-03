import React, { useState } from 'react';
import './Tabs.css';

interface TabProps {
  label: string;
  value: string;
  children: React.ReactNode;
}

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
  variant?: 'default' | 'boxed';
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};

const Tabs: React.FC<TabsProps> & {
  Tab: React.FC<TabProps>;
} = ({ 
  children, 
  defaultValue,
  className = '',
  variant = 'default'
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || '');
  
  // Get tab labels and values from children
  const tabs: TabItem[] = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child) => {
      if (React.isValidElement(child)) {
        const { label, value, children: content } = child.props as TabProps;
        return { label, value, content };
      }
      return null;
    })
    .filter((tab): tab is TabItem => tab !== null);

  // Set initial active tab if not set
  React.useEffect(() => {
    if (!activeTab && tabs.length > 0) {
      setActiveTab(tabs[0].value);
    }
  }, [tabs, activeTab]);

  const variantClass = `tabs-${variant}`;
  const classes = `tabs ${variantClass} ${className}`.trim();

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  const activeTabContent = tabs.find(tab => tab.value === activeTab)?.content;

  return (
    <div className={classes}>
      <div className="tabs-list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab-button ${activeTab === tab.value ? 'tab-button-active' : ''}`}
            onClick={() => handleTabClick(tab.value)}
            role="tab"
            aria-selected={activeTab === tab.value}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {activeTabContent}
      </div>
    </div>
  );
};

Tabs.Tab = Tab;

export default Tabs;