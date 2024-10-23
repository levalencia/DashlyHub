import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SidebarItem {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  label: string;
  active?: boolean;
  subItems?: { id: string; label: string }[];
}

const sidebarItems: SidebarItem[] = [
  { 
    id: '1', 
    icon: 'home', 
    label: 'Dashboard'
  },
  { 
    id: '2', 
    icon: 'calendar', 
    label: 'Content Calendar',
    subItems: [
      { id: '2.1', label: 'Schedule Posts' },
      { id: '2.2', label: 'Recurring Posts' }
    ]
  },
  { 
    id: '3', 
    icon: 'edit', 
    label: 'Content Creation',
    subItems: [
      { id: '3.1', label: 'AI Copy Generator' },
      { id: '3.2', label: 'AI Image Generator' }
    ]
  },
  { 
    id: '4', 
    icon: 'bar-chart-2', 
    label: 'Analytics',
    subItems: [
      { id: '4.1', label: 'Performance Reports' },
      { id: '4.2', label: 'AI Insights' }
    ]
  },
  { 
    id: '5', 
    icon: 'grid', 
    label: 'Social Networks',
    subItems: [
      { id: '5.1', label: 'Connected Accounts' },
      { id: '5.2', label: 'Platform Settings' }
    ]
  },
  { 
    id: '6', 
    icon: 'users', 
    label: 'Team',
    subItems: [
      { id: '6.1', label: 'Members' },
      { id: '6.2', label: 'Roles & Permissions' }
    ]
  },
  { 
    id: '7', 
    icon: 'briefcase', 
    label: 'Client Management'
  },
  { 
    id: '8', 
    icon: 'bell', 
    label: 'Notifications'
  },
  { 
    id: '9', 
    icon: 'settings', 
    label: 'Settings'
  },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width] = useState(new Animated.Value(300));
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleSidebar = () => {
    Animated.timing(width, {
      toValue: isCollapsed ? 300 : 68,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsCollapsed(!isCollapsed);
    setExpandedItem(null);
  };

  const toggleSubItems = (itemId: string) => {
    if (!isCollapsed) {
      setExpandedItem(expandedItem === itemId ? null : itemId);
    }
  };

  return (
    <Animated.View style={[styles.sidebar, { width }]}>
      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={toggleSidebar}
      >
        <Feather 
          name={isCollapsed ? 'chevron-right' : 'chevron-left'} 
          size={20} 
          color="#8899A6" 
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Feather name="share-2" size={24} color="#1DA1F2" />
        {!isCollapsed && <Text style={styles.logoText}>Social Manager</Text>}
      </View>
      
      <View style={styles.nav}>
        {sidebarItems.map((item) => (
          <View key={item.id}>
            <TouchableOpacity
              style={[
                styles.navItem,
                item.active && styles.activeNavItem,
                isCollapsed && styles.collapsedNavItem
              ]}
              onPress={() => toggleSubItems(item.id)}
            >
              <Feather 
                name={item.icon} 
                size={20} 
                color={item.active ? "#1DA1F2" : "#8899A6"} 
              />
              {!isCollapsed && (
                <View style={styles.navItemContent}>
                  <Text style={[
                    styles.navText,
                    item.active && styles.activeNavText
                  ]}>
                    {item.label}
                  </Text>
                  {item.subItems && (
                    <Feather 
                      name={expandedItem === item.id ? 'chevron-down' : 'chevron-right'} 
                      size={16} 
                      color="#8899A6" 
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
            
            {!isCollapsed && item.subItems && expandedItem === item.id && (
              <View style={styles.subItems}>
                {item.subItems.map((subItem) => (
                  <TouchableOpacity
                    key={subItem.id}
                    style={styles.subItem}
                  >
                    <Text style={styles.subItemText}>{subItem.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {!isCollapsed && (
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Post</Text>
        </TouchableOpacity>
      )}
      {isCollapsed && (
        <TouchableOpacity style={styles.collapsedCreateButton}>
          <Feather name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#15202B',
    borderRightWidth: 1,
    borderRightColor: '#38444D',
    height: '100%',
  },
  toggleButton: {
    position: 'absolute',
    right: -12,
    top: 20,
    backgroundColor: '#192734',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#38444D',
  },
  logoContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#38444D',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  nav: {
    flex: 1,
    paddingTop: 10,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  navItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collapsedNavItem: {
    justifyContent: 'center',
    padding: 12,
  },
  activeNavItem: {
    backgroundColor: '#162D40',
  },
  navText: {
    color: '#8899A6',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#1DA1F2',
  },
  subItems: {
    marginLeft: 54,
    marginTop: 5,
    marginBottom: 5,
  },
  subItem: {
    padding: 8,
    borderRadius: 6,
  },
  subItemText: {
    color: '#8899A6',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#1DA1F2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  collapsedCreateButton: {
    backgroundColor: '#1DA1F2',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Sidebar;